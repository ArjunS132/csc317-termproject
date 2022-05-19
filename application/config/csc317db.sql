-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` mediumtext NOT NULL,
  `fk_postId` int NOT NULL,
  `fk_authorId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `comment_author_idx` (`fk_authorId`),
  KEY `comment_belongsTo_idx` (`fk_postId`),
  CONSTRAINT `comment_author` FOREIGN KEY (`fk_authorId`) REFERENCES `users` (`id`),
  CONSTRAINT `comment_belongsTo` FOREIGN KEY (`fk_postId`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (7,'wow, this looks really nice.',9,11,'2022-05-18 23:16:18'),(8,'I love cats, but dogs are also cool',8,11,'2022-05-18 23:34:25'),(9,'wow that looks really cool.',3,11,'2022-05-18 23:35:52'),(10,'I want to get a pet husky eventually',2,11,'2022-05-18 23:36:31'),(11,'asdfads',6,11,'2022-05-18 23:37:37'),(12,'asdfads',6,11,'2022-05-18 23:37:38'),(13,'asdfads',6,11,'2022-05-18 23:37:39');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` mediumtext NOT NULL,
  `photopath` varchar(2048) NOT NULL,
  `thumbnailpath` varchar(2048) NOT NULL,
  `createdAt` datetime NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `fk_userId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `post_author_idx` (`fk_userId`),
  CONSTRAINT `post_author` FOREIGN KEY (`fk_userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Cute white cat','this is a picture of a cute cat from adobe stock photos','public/images/uploads/295242366ceb97dd4d36fe8e5b6c0ced68ad44ca06d4.jpeg','public/images/uploads/thumbnail-295242366ceb97dd4d36fe8e5b6c0ced68ad44ca06d4.jpeg','2022-05-16 17:55:08',1,11),(2,'Husky','Picture of a husky behind a grey background','public/images/uploads/5d39953065ba451e182794f7de18087534fd25757c73.jpeg','public/images/uploads/thumbnail-5d39953065ba451e182794f7de18087534fd25757c73.jpeg','2022-05-16 17:59:21',1,12),(3,'Earth and moon','A picture of earth and the moon','public/images/uploads/e99f23afa156a4c67deba56f1b69be069b71a63a5526.jpeg','public/images/uploads/thumbnail-e99f23afa156a4c67deba56f1b69be069b71a63a5526.jpeg','2022-05-16 18:03:31',1,13),(4,'Hanzo Cat','A picture of a cat that looks like hanzo, my friend\'s cat','public/images/uploads/54671d1a2641172fc3968d8d1b0c687efbd16610153c.jpeg','public/images/uploads/thumbnail-54671d1a2641172fc3968d8d1b0c687efbd16610153c.jpeg','2022-05-16 18:04:23',1,11),(5,'golden retriever','A golden retriever sitting in the grass and looking at the camera','public/images/uploads/09c3550b756cd681743b33325610d1e3a17c26449176.jpeg','public/images/uploads/thumbnail-09c3550b756cd681743b33325610d1e3a17c26449176.jpeg','2022-05-16 18:05:32',1,12),(6,'moon\'s stages','picture that shows different stages of the moon in space','public/images/uploads/02ba7da1dbe476a4b3b26062f543bcbb414abf5bde57.jpeg','public/images/uploads/thumbnail-02ba7da1dbe476a4b3b26062f543bcbb414abf5bde57.jpeg','2022-05-16 18:06:38',1,13),(7,'cute grey kitten','A cute kitten looking straight the camera','public/images/uploads/64b3078c28a8e7e03f38725c699977c2326d05525c80.jpeg','public/images/uploads/thumbnail-64b3078c28a8e7e03f38725c699977c2326d05525c80.jpeg','2022-05-16 18:08:21',1,11),(8,'Cute Puppy','A cute white puppy laying on the floor','public/images/uploads/92938fddbd4e88336dcce28702870d8be411c6aaf835.jpeg','public/images/uploads/thumbnail-92938fddbd4e88336dcce28702870d8be411c6aaf835.jpeg','2022-05-16 18:09:24',1,12),(9,'Aurora Borealis','a picture of an aurora borealis taken above a lake','public/images/uploads/f687cff5ca3b2bae5fbd1559be77a194b685945c49e7.jpeg','public/images/uploads/thumbnail-f687cff5ca3b2bae5fbd1559be77a194b685945c49e7.jpeg','2022-05-17 17:50:01',1,13);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `username` varchar(128) NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'test2@mail.com','$2b$10$X.9PaUrC8hoGASzdzf9oFufd.O8o2ZZgiq1ZOA03M3c/i2qCYq4KG','2022-04-28 13:36:54','test2',1),(5,'test1@mail.com','$2b$10$jdkOgTreeFClPi5cduokA.7RGGtkLaDj./L7/HKZ/m7UPrzWLcRCm','2022-04-28 13:45:26','testuser1',1),(6,'flash@mail.com','$2b$10$d/5uyzr0KS7XBdUJ6aseyOvAkSWh3KVqybHzzslTDYj6rIP.YntFu','2022-04-28 21:07:11','testingFlash',1),(7,'test5@test.com','$2b$10$HTH84g9OHsZtz/lmCpSknupTxeoyFAIHOSJOdUfQWp25wll/xEuG.','2022-05-11 18:30:17','test5',1),(8,'test6@test.com','$2b$10$W/9Yp2.uct1y8tlh76WQweIMd4J2q6Ce4iVEMeLSgYYX0SZ7OsWUO','2022-05-11 20:14:19','test6',1),(9,'test7@mail.com','$2b$10$/SDoqocx.R9rC4qpQyNshekNKjx0xyh0L1Y/tLkK8Ecs7eM.hKd6.','2022-05-11 20:15:15','test7',1),(10,'testuser1@mail.com','$2b$10$XNvWbNQiaMUoVyEMIEJI9u1uUrRe/e4cMwfbDgOu.VDb.NlgYrT6m','2022-05-13 08:42:15','arjun132',1),(11,'cats@gmail.com','$2b$10$exQN/i8U06wekoLymWyoL.wT5yNHsgWWu5/ah3DpktcRQs575VTrm','2022-05-16 17:52:55','CatLover',1),(12,'dog@gmail.com','$2b$10$SbOKgshEQPB9XUsjbuQJRuK1rSqwozQTtUp3qSV4BHaRpw3S/YuKy','2022-05-16 17:56:02','DogLover',1),(13,'space@mail.com','$2b$10$lu1tJyn09/qlBstr1IsMW.Vv..53jfJrrW/I/V0wCxlF./rtRJiIu','2022-05-16 18:02:03','SpaceLover',1),(14,'refactored@test.com','$2b$10$lwSAqhbW5mb72P7btQbc..r621t7yaxp6IwyrqUUJBOWWIj6GMHZ6','2022-05-17 01:38:22','refactoredTest1',1),(15,'refactored2@test.com','$2b$10$uLjMkS4DAXR8UbEyFshLROIyat8OsFIKaDE6XLm37CYTeiefm78JO','2022-05-17 01:58:37','refactoredTest2',1);
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

-- Dump completed on 2022-05-18 23:43:14
