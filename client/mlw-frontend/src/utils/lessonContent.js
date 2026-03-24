const SECTION_LABELS = ['Introduction', 'Vocabulary', 'Examples', 'Note'];

export function parseLessonContent(content = '') {
  const normalized = String(content).replace(/\r\n/g, '\n').trim();

  if (!normalized) {
    return {};
  }

  const matches = [...normalized.matchAll(/^(Introduction|Vocabulary|Examples|Note):\s*$/gim)];

  if (!matches.length) {
    const fallbackLines = normalized
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    return fallbackLines.length
      ? {
          Introduction: fallbackLines,
        }
      : {};
  }

  const sections = {};

  matches.forEach((match, index) => {
    const heading = match[1];
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : normalized.length;

    const lines = normalized
      .slice(start, end)
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length) {
      sections[heading] = lines;
    }
  });

  return sections;
}

export function buildLessonContentPreview(content = '') {
  const sections = parseLessonContent(content);

  const vocabularyPreview = sections.Vocabulary?.[0];
  if (vocabularyPreview) return vocabularyPreview;

  const introPreview = sections.Introduction?.[0];
  if (introPreview) return introPreview;

  const examplesPreview = sections.Examples?.[0];
  if (examplesPreview) return examplesPreview;

  const notePreview = sections.Note?.[0];
  if (notePreview) return notePreview;

  return 'No lesson content yet.';
}

export function getStructuredLessonTemplate() {
  return {
    introduction: 'Start with a short overview of the lesson topic.',
    vocabulary: ['word = meaning', 'word = meaning'].join('\n'),
    examples: ['First example sentence.', 'Second example sentence.'].join('\n'),
    note: 'Add a short cultural or usage note.',
  };
}

export function parseLessonContentForForm(content = '') {
  const parsed = parseLessonContent(content);
  const hasStructuredHeadings = Object.keys(parsed).some((key) => SECTION_LABELS.includes(key));

  if (!hasStructuredHeadings) {
    return {
      introduction: String(content || '').trim(),
      vocabulary: '',
      examples: '',
      note: '',
      isFallback: true,
    };
  }

  return {
    introduction: (parsed.Introduction || []).join('\n'),
    vocabulary: (parsed.Vocabulary || []).join('\n'),
    examples: (parsed.Examples || []).join('\n'),
    note: (parsed.Note || []).join('\n'),
    isFallback: false,
  };
}

export function buildStructuredLessonContent({
  introduction = '',
  vocabulary = '',
  examples = '',
  note = '',
}) {
  const sections = [
    ['Introduction', introduction],
    ['Vocabulary', vocabulary],
    ['Examples', examples],
    ['Note', note],
  ]
    .map(([label, value]) => [label, String(value || '').trim()])
    .filter(([, value]) => value);

  if (!sections.length) {
    return '';
  }

  return sections
    .map(([label, value]) => `${label}:\n${value}`)
    .join('\n\n');
}

export function getOrderedLessonSections(parsedContent) {
  return SECTION_LABELS.filter((label) => Array.isArray(parsedContent[label]) && parsedContent[label].length)
    .map((label) => ({
      label,
      items: parsedContent[label],
    }));
}
