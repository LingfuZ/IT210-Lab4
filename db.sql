CREATE DATABASE  IF NOT EXISTS `it210b` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `it210b`;
-- MySQL dump 10.13  Distrib 5.5.16, for Win32 (x86)
--
-- Host: 192.168.1.50    Database: it210b
-- ------------------------------------------------------
-- Server version	5.5.31-0ubuntu0.12.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `logged_in` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'user','user@user.com','12dea96fec20593566ab75692c9949596833adc9',0,'2013-08-21 10:22:16','2013-08-21 10:22:16'),(2,'admin','admin@admin.com','d033e22ae348aeb5660fc2140aec35850c4da997',0,'2013-08-21 10:22:16','2013-08-21 10:22:16'),(3,'jed','test@gmail.com','123456789',1,'2013-08-21 10:22:16','2013-08-21 10:22:16'),(4,'tester','tester@test.com','0987654321',0,'2013-08-21 10:22:16','2013-08-21 10:22:16'),(5,'Jed','montgomery.jed@gmail.com','98765432109876543210987654321',1,'2013-08-23 15:57:01','2013-08-26 16:24:57'),(6,'Derek','shakmatt@gmail.com','98765432109876543210987654321',1,'2013-08-23 19:04:59','2013-08-23 19:19:47');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `image_id` int(11) NOT NULL AUTO_INCREMENT,
  `image_path` varchar(255) DEFAULT NULL,
  `image_approved` varchar(255) DEFAULT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `numLikes` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'/images/image1.jpg','1','testing1',4,46,'0000-00-00 00:00:00','2013-08-26 15:45:52'),(2,'/images/image1.jpg','1','testing1',3,18,'2013-08-21 10:22:16','2013-08-26 15:45:55'),(3,'/images/image2.jpg','0','testing2',4,16,'2013-08-21 10:22:39','2013-08-23 19:03:24'),(4,'/images/image3.jpg','0','testing3',3,12,'2013-08-21 10:22:50','2013-08-22 19:04:28'),(5,'/images/image5.jpg','1','testing5',3,13,'2013-08-21 10:24:59','2013-08-22 22:33:05'),(6,'/images/image6.jpg','1','testing6',4,12,'2013-08-21 10:25:09','2013-08-22 22:33:08'),(7,'/images/image7.jpg','1','testing7',3,10,'2013-08-21 10:25:16','2013-08-22 19:04:31'),(8,'/images/image8.jpg','1','testing8',2,5,'2013-08-22 12:49:37','2013-08-22 22:33:09'),(9,'/images/image9.jpg','1','testing9',3,10,'2013-08-22 13:24:42','2013-08-22 22:33:14'),(10,'/images/image10.jpg','1','testing10',3,10,'2013-08-22 15:03:03','2013-08-22 22:33:12'),(11,'/images/image11.jpg','1','testing11',4,6,'2013-08-22 15:03:29','2013-08-22 15:03:29'),(12,'/images/image12.jpg','1','testing12',3,7,'2013-08-23 13:34:20','2013-08-23 13:34:20'),(13,'/images/image13.jpg','1','testing13',3,5,'2013-08-26 09:48:56','2013-08-26 15:49:10');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'it210b'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-09-09 14:37:08
