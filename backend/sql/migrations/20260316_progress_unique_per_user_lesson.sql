-- MLW progress table normalization
-- Goal:
-- 1. One progress row per user/lesson pair
-- 2. Add progress_percent, points_awarded, updated_at
-- 3. Enforce UNIQUE(user_id, lesson_id)
--
-- Notes:
-- - This migration keeps the most recently updated/completed row per user/lesson pair.
-- - It does not drop legacy columns such as `points`, because existing backend code may still rely on them.

START TRANSACTION;

ALTER TABLE progress
  ADD COLUMN progress_percent INT NOT NULL DEFAULT 0 AFTER lesson_id,
  ADD COLUMN points_awarded TINYINT(1) NOT NULL DEFAULT 0 AFTER completed,
  ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER completed_at;

-- Backfill the new columns from current completion state.
UPDATE progress
SET
  progress_percent = CASE
    WHEN completed = 1 THEN 100
    ELSE GREATEST(COALESCE(progress_percent, 0), 0)
  END,
  points_awarded = CASE
    WHEN completed = 1 THEN 1
    ELSE COALESCE(points_awarded, 0)
  END;

-- Remove duplicates first so the unique constraint can be created.
-- Keep the most recently active row, with a deterministic tie-breaker on id.
DELETE p1
FROM progress p1
JOIN progress p2
  ON p1.user_id = p2.user_id
 AND p1.lesson_id = p2.lesson_id
 AND (
      COALESCE(p1.updated_at, p1.completed_at, '1970-01-01') < COALESCE(p2.updated_at, p2.completed_at, '1970-01-01')
      OR (
        COALESCE(p1.updated_at, p1.completed_at, '1970-01-01') = COALESCE(p2.updated_at, p2.completed_at, '1970-01-01')
        AND p1.id < p2.id
      )
    );

ALTER TABLE progress
  ADD CONSTRAINT uq_progress_user_lesson UNIQUE (user_id, lesson_id);

COMMIT;
