-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: mlw_system
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES (1,'Ghomala','Language spoken in Bafoussam',NULL),(2,'Yemba','Language spoken in Dschang',NULL),(3,'Medumba','Language spoken in Bangangte',NULL),(4,'Fe\'fe\'','Language spoken in Bafang',NULL),(5,'Nda\'nda\'','Language spoken in Bangangte',NULL),(6,'Ngombale','Language spoken in Mbouda',NULL),(7,'Bamun','Language spoken in Foumban',NULL),(8,'Bamiléké','Major cultural language group',NULL),(9,'English','Language spoken in the USA','');
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lessons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `language_id` int DEFAULT NULL,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `is_pro` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `order_number` int DEFAULT '1',
  `points` int DEFAULT '10',
  PRIMARY KEY (`id`),
  KEY `language_id` (`language_id`),
  CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lessons`
--

LOCK TABLES `lessons` WRITE;
/*!40000 ALTER TABLE `lessons` DISABLE KEYS */;
INSERT INTO `lessons` VALUES (1,1,'Greetings in Ghomala','Hello = Meka. Welcome = Meka me.',0,'2026-03-13 22:27:31',1,10),(2,1,'Introducing Yourself','My name is = Ndzi ...',0,'2026-03-13 22:27:31',2,10),(3,1,'Advanced Greetings','Formal greetings used with elders.',1,'2026-03-13 22:27:31',3,10),(4,2,'Greetings in Yemba','Hello = Ndzié. Good morning = Ndzié ndzi.',0,'2026-03-13 22:27:31',1,10),(5,2,'Basic Conversation','How are you? = Ndzié ya?',0,'2026-03-13 22:27:31',2,10),(6,3,'Medumba Introduction','Welcome = Nda Medumba.',0,'2026-03-13 22:27:31',1,10),(7,3,'Family Vocabulary','Father = Ta. Mother = Ma.',0,'2026-03-13 22:27:31',2,10),(8,4,'Fe\'fe\' Greetings','Basic greetings in Fe\'fe\'.',0,'2026-03-13 22:27:31',1,10),(9,5,'Nda\'nda\' Basics','Introduction to Nda\'nda\' language.',0,'2026-03-13 22:27:31',1,10),(10,6,'Ngombale Words','Common Ngombale expressions.',0,'2026-03-13 22:27:31',1,10),(11,7,'Bamun Introduction','Basic Bamun phrases.',0,'2026-03-13 22:27:31',1,10),(12,8,'Bamiléké Culture','Language and cultural expressions.',0,'2026-03-13 22:27:31',1,10),(13,9,'Comment écrire','How to write in french',1,'2026-03-24 09:19:35',1,10),(14,9,'comment ecrire','salut = Hello\nhow are you = comment vas tu',0,'2026-03-24 09:22:20',1,10),(15,9,'comment ecrire','Introduction:\nThis lesson introduces basic greetings.\n\nVocabulary:\nSalut = Hello\nBonjour = Good morning\nComment vas-tu ? = How are you?\n\nExamples:\nSalut, mon ami.\nBonjour Madame.\n\nNote:\nUse \"Bonjour\" in formal contexts.',0,'2026-03-24 10:37:29',1,10),(16,1,'Words in Ghomala','Introduction:\nlearn the letters of the alphabet in Ghomala\n\nVocabulary:\nbunnte\'te = Tres Saint\nsi be bunnte\'te  = Dieu est tres saint',0,'2026-03-24 13:17:22',2,10);
/*!40000 ALTER TABLE `lessons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `progress`
--

DROP TABLE IF EXISTS `progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `progress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `lesson_id` int DEFAULT NULL,
  `completed` tinyint(1) DEFAULT '0',
  `completed_at` timestamp NULL DEFAULT NULL,
  `points` int DEFAULT '0',
  `progress_percent` int DEFAULT '0',
  `points_awarded` tinyint(1) DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_lesson` (`user_id`,`lesson_id`),
  KEY `lesson_id` (`lesson_id`),
  CONSTRAINT `progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `progress_ibfk_2` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `progress`
--

LOCK TABLES `progress` WRITE;
/*!40000 ALTER TABLE `progress` DISABLE KEYS */;
INSERT INTO `progress` VALUES (1,1,1,1,'2026-03-13 22:43:19',0,0,0,'2026-03-17 06:12:31'),(3,1,5,1,'2026-03-14 13:21:33',0,0,0,'2026-03-17 06:12:31'),(4,3,1,1,'2026-03-14 14:08:16',0,0,0,'2026-03-17 06:12:31'),(7,1,2,1,'2026-03-24 01:39:54',10,100,1,'2026-03-24 01:39:54'),(8,1,4,1,'2026-03-24 02:20:40',10,100,1,'2026-03-24 02:20:40'),(9,1,6,1,'2026-03-24 03:01:30',10,100,1,'2026-03-24 03:01:30'),(10,1,8,1,'2026-03-24 03:33:04',10,100,1,'2026-03-24 03:33:04'),(11,1,3,1,'2026-03-24 03:49:00',10,100,1,'2026-03-24 03:49:00'),(12,3,2,1,'2026-03-24 04:01:50',10,100,1,'2026-03-24 04:01:50'),(13,3,3,1,'2026-03-24 04:01:57',10,100,1,'2026-03-24 04:01:57'),(14,1,16,1,'2026-03-24 13:20:08',10,100,1,'2026-03-24 13:20:08');
/*!40000 ALTER TABLE `progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_unicode_ci DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `plan` enum('free','pro') COLLATE utf8mb4_unicode_ci DEFAULT 'free',
  `current_streak` int DEFAULT '0',
  `longest_streak` int DEFAULT '0',
  `last_activity` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Test User','test@gmail.com','$2b$10$0SiN7Lpce.znXyYtHYbvjOy8ozMQ6fqg.TeSHepFAyU0Ibnj5nJgO','user','2026-03-13 22:02:35','free',0,0,NULL),(2,'Ndong Ghislain Che','ghislainche2007@gmail.com','$2b$10$809Wqbly9.g5Cf4cij7fJOx44FbV2q0sYns/iQv96GG.wwn74.4K6','user','2026-03-14 11:32:58','free',0,0,NULL),(3,'ANONYMOUS CHE','anonymousche@gmail.com','$2b$10$fClmOOVNhGNeUz6V9cF5n.3Mx4iF1E1s04nJY3avDnwlNeaaRuErS','user','2026-03-14 14:06:27','free',0,0,NULL),(4,'Azamo Oceane ','admin@mlw.com','$2b$10$XzF.TndKR3SCxEgKVZgBiOqWSwfNX.oos6a29OdF0jwMBxQQ96uCm','admin','2026-03-24 08:47:12','free',0,0,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-05 23:34:44
