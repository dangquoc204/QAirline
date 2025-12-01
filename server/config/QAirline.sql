CREATE DATABASE  IF NOT EXISTS `qairline` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `qairline`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 34.31.41.238    Database: qairline
-- ------------------------------------------------------
-- Server version	8.0.40-google

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'd306c686-3dd5-11f0-ae33-42010a400002:1-731';

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permissions` text,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,3,'[\"manage_users\", \"manage_flights\"]','admin@example.com','Tyvabin1',NULL,NULL),(2,11,'[\"manage_users\", \"manage_flights\"]','admin1@example.com','$2b$10$6The6dXQhlsDqT9mcZuLQuJkkoSQl1MTU6doZ6m60xNFvqvlBB0ga','2025-06-05 11:47:33','2025-06-05 11:47:33');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `airplanes`
--

DROP TABLE IF EXISTS `airplanes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airplanes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `model` varchar(255) NOT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `seat_count` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airplanes`
--

LOCK TABLES `airplanes` WRITE;
/*!40000 ALTER TABLE `airplanes` DISABLE KEYS */;
INSERT INTO `airplanes` VALUES (1,'Boeing 737-800','Boeing',189,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(2,'Airbus A321','Airbus',200,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(3,'Boeing 787-9','Boeing',290,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(4,'Airbus A330-300','Airbus',277,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(5,'Boeing 737 MAX 8','Boeing',178,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(6,'Airbus A320neo','Airbus',180,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(7,'Boeing 777-300ER','Boeing',396,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(8,'Airbus A350-900','Airbus',325,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(9,'Boeing 737-700','Boeing',149,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(10,'Airbus A319','Airbus',144,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(11,'Boeing 767-300','Boeing',261,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(12,'Airbus A220-300','Airbus',137,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(13,'Boeing 747-8','Boeing',410,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(14,'Airbus A380-800','Airbus',525,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(15,'Boeing 737-900','Boeing',178,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(16,'Airbus A321neo','Airbus',240,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(17,'Boeing 787-8','Boeing',242,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(18,'Airbus A330-200','Airbus',247,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(19,'Boeing 737 MAX 9','Boeing',193,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(20,'Airbus A320-200','Airbus',180,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(21,'Boeing 777-200','Boeing',317,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(22,'Airbus A350-1000','Airbus',410,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(23,'Boeing 737-600','Boeing',132,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(24,'Airbus A318','Airbus',132,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(25,'Boeing 767-400','Boeing',296,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(26,'Airbus A220-100','Airbus',120,'2025-06-03 20:30:00','2025-06-06 20:00:45'),(27,'Boeing 747-400','Boeing',416,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(28,'Airbus A340-600','Airbus',380,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(29,'Boeing 737-800','Boeing',189,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(30,'Airbus A321-200','Airbus',200,'2025-06-03 20:30:00','2025-06-03 20:30:00');
/*!40000 ALTER TABLE `airplanes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `departure_time` datetime DEFAULT NULL,
  `return_time` datetime DEFAULT NULL,
  `booking_date` datetime NOT NULL,
  `status` enum('Confirmed','Cancelled','Pending') NOT NULL,
  `passengers` int NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `payment_status` enum('Pending','Paid','Failed') NOT NULL DEFAULT 'Pending',
  `payment_method` enum('Credit Card','Debit Card','Bank Transfer','PayPal','Cash') NOT NULL,
  `cardholder_name` varchar(255) DEFAULT NULL,
  `card_number` varchar(255) DEFAULT NULL,
  `expiry_date` varchar(255) DEFAULT NULL,
  `cvv` varchar(255) DEFAULT NULL,
  `outbound_seat_id` int DEFAULT NULL,
  `return_seat_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `outbound_flight_id` int DEFAULT NULL,
  `return_flight_id` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `booking_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `outbound_seat_id` (`outbound_seat_id`),
  KEY `return_seat_id` (`return_seat_id`),
  KEY `outbound_flight_id` (`outbound_flight_id`),
  KEY `return_flight_id` (`return_flight_id`),
  KEY `bookings_ibfk_5` (`customer_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`return_seat_id`) REFERENCES `seats` (`id`) ON DELETE SET NULL,
  CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL,
  CONSTRAINT `bookings_ibfk_4` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `bookings_ibfk_5` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (32,'2025-06-06 10:00:00',NULL,'2025-06-05 19:25:43','Confirmed',1,105.00,'Paid','Credit Card','Dinh Duc','4000 0000 0000 0000','12/27','123',121,NULL,7,13,NULL,'2025-06-05 19:25:43','2025-06-05 19:25:43','LRR47I'),(33,'2025-06-27 12:00:00',NULL,'2025-06-05 19:27:18','Cancelled',1,150.00,'Paid','Credit Card','Dinh Duc','4000 0000 0000 0000','12/27','123',231,NULL,7,24,NULL,'2025-06-05 19:27:18','2025-06-05 19:48:15','BSDQOQ'),(34,'2025-06-04 09:00:00','2025-06-10 12:00:00','2025-06-05 19:31:10','Confirmed',1,400.00,'Paid','Credit Card','Trần Lương Minh Đức','4231 2412 5234 2313','06/28','456',2,187,7,1,19,'2025-06-05 19:31:10','2025-06-05 19:31:10','9B7XD7'),(35,'2025-06-13 08:00:00',NULL,'2025-06-05 19:33:24','Confirmed',1,210.00,'Paid','Credit Card','Đặng Quốc Anh','4125 6345 8324 8721','04/26','422',97,NULL,7,10,NULL,'2025-06-05 19:33:24','2025-06-05 19:33:24','Z8N9TV'),(36,'2025-06-25 10:00:00',NULL,'2025-06-05 19:35:33','Cancelled',1,150.00,'Paid','Credit Card','Trần Thị Hoa Mai','4123 5124 6252 6647','12/27','897',211,NULL,7,22,NULL,'2025-06-05 19:35:33','2025-06-06 17:44:28','NI92E6'),(37,'2025-06-09 11:00:00',NULL,'2025-06-05 19:55:30','Confirmed',1,105.00,'Paid','Credit Card','Đinh Ngọc Tài','4232 5234 6224 7575','12/27','678',51,NULL,NULL,6,NULL,'2025-06-05 19:55:30','2025-06-05 19:55:30','PSEJPP'),(38,'2025-06-06 10:00:00',NULL,'2025-06-06 14:24:57','Confirmed',1,210.00,'Paid','Credit Card','Lê Văn A','4235 6234 7457 2341','12/27','546',127,NULL,NULL,13,NULL,'2025-06-06 14:24:57','2025-06-06 14:24:57','FWNAPL'),(39,'2025-06-04 09:00:00',NULL,'2025-06-06 14:33:30','Confirmed',1,200.00,'Paid','Credit Card','Tran Luong Minh Duc','09109849124','07/26','923',7,NULL,NULL,1,NULL,'2025-06-06 14:33:30','2025-06-06 14:33:30','XY1IFS'),(40,'2025-06-04 09:00:00',NULL,'2025-06-06 14:43:26','Confirmed',1,100.00,'Paid','Credit Card','Trần Minh Đức','1042901249041','04/27','231',3,NULL,NULL,1,NULL,'2025-06-06 14:43:26','2025-06-06 14:43:26','QXPTCG'),(41,'2025-06-04 09:00:00',NULL,'2025-06-06 14:47:46','Confirmed',1,100.00,'Paid','Credit Card','Tran Luong Minh Duc','2401892442141','12/27','928',4,NULL,NULL,1,NULL,'2025-06-06 14:47:46','2025-06-06 14:47:46','KTE8S9'),(42,'2025-06-05 14:00:00','2025-06-10 12:00:00','2025-06-06 14:49:24','Confirmed',1,360.00,'Paid','Credit Card','Tran Minh Duc','24901894209814','24/27','948',77,181,NULL,8,19,'2025-06-06 14:49:24','2025-06-06 14:49:24','194WSD'),(43,'2025-06-09 11:00:00',NULL,'2025-06-06 15:14:32','Confirmed',1,210.00,'Paid','Credit Card','Mai Văn B','4124 5234 6346 7346','12/28','478',57,NULL,NULL,6,NULL,'2025-06-06 15:14:32','2025-06-06 15:14:32','ROR2DI'),(44,'2025-06-08 07:00:00',NULL,'2025-06-06 15:21:38','Confirmed',1,105.00,'Paid','Credit Card','Vũ Văn C','4512 2419 4124 5121','05/29','412',41,NULL,NULL,5,NULL,'2025-06-06 15:21:38','2025-06-06 15:21:38','9J5ZGE'),(45,'2025-06-08 07:00:00',NULL,'2025-06-06 15:31:38','Confirmed',1,210.00,'Paid','Credit Card','Phan Tấn Trung','4242 5425 7466 5925','06/25','422',47,NULL,12,5,NULL,'2025-06-06 15:31:38','2025-06-06 15:31:38','8HZY7E'),(46,'2025-06-27 12:00:00',NULL,'2025-06-06 16:29:44','Confirmed',1,300.00,'Paid','Credit Card','Trần Thị E','4523 5124 6262 7474','12/28','564',237,NULL,12,24,NULL,'2025-06-06 16:29:44','2025-06-06 16:29:44','6CGS9W'),(47,'2025-06-08 07:00:00',NULL,'2025-06-06 16:46:29','Cancelled',1,105.00,'Paid','Credit Card','Trần Thị Hoa Mai','4123 5152 6235 3123','12/27','123',42,NULL,NULL,5,NULL,'2025-06-06 16:46:29','2025-06-06 17:17:46','8GSF2L'),(48,'2025-07-03 12:00:00',NULL,'2025-06-06 17:41:04','Cancelled',1,150.00,'Paid','Credit Card','Nguyễn Trọng Hiếu','4132 5141 6264 7575','12/26','546',291,NULL,NULL,30,NULL,'2025-06-06 17:41:04','2025-06-06 17:41:54','E4ZZ1R'),(49,'2025-06-04 09:00:00','2025-06-09 07:00:00','2025-06-06 18:11:05','Cancelled',1,305.00,'Paid','Credit Card','Đinh Đức','4324 5242 5242 5452','12/26','123',8,141,NULL,1,15,'2025-06-06 18:11:05','2025-06-06 18:13:06','QJ80K4'),(50,'2025-06-04 09:00:00','2025-06-09 07:00:00','2025-06-06 18:29:54','Cancelled',1,305.00,'Paid','Credit Card','Đinh Đức','4325 6252 7958 2324','12/27','324',9,142,NULL,1,15,'2025-06-06 18:29:54','2025-06-06 18:31:43','M8J28B'),(51,'2025-06-13 08:00:00',NULL,'2025-06-06 18:36:27','Confirmed',1,210.00,'Paid','Credit Card','Đinh Đức','4234 5235 5235 2352','12/27','123',98,NULL,14,10,NULL,'2025-06-06 18:36:27','2025-06-06 18:36:27','KHOOLE'),(52,'2025-06-04 09:00:00','2025-06-09 07:00:00','2025-06-06 19:47:07','Cancelled',1,305.00,'Paid','Credit Card','Đinh Đức','4232 5325 6346 2424','12/27','123',10,143,NULL,1,15,'2025-06-06 19:47:07','2025-06-06 19:48:22','0ME3F5'),(53,'2025-06-13 08:00:00',NULL,'2025-06-06 19:55:42','Confirmed',1,105.00,'Paid','Credit Card','Đinh Đức','4323 6345 6346 3543','12/27','123',91,NULL,16,10,NULL,'2025-06-06 19:55:42','2025-06-06 19:55:42','4U5J8H'),(54,'2025-06-05 14:00:00','2025-06-09 07:00:00','2025-06-06 20:16:51','Cancelled',1,315.00,'Paid','Credit Card','Đinh Đức','4324 5234 5234 6346','12/27','123',78,144,NULL,8,15,'2025-06-06 20:16:51','2025-06-06 20:18:05','J9IP7M'),(55,'2025-06-13 08:00:00',NULL,'2025-06-06 20:25:30','Confirmed',1,105.00,'Paid','Credit Card','Đinh Đức','4324 5235 4324 5235','12/27','`12',92,NULL,17,10,NULL,'2025-06-06 20:25:30','2025-06-06 20:25:30','THPA8I');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `country_name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `country_code` int DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `promo_code` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,1,'123 Đường Láng, Hà Nội','Vietnam','Nguyễn Văn ',84,'Văn','','Nguyễn','1985-06-15T00:00:00.000Z','male','SUMMER2025',NULL,'2025-06-02 16:36:44'),(2,4,'456 Nguyễn Huệ, TP.HCM','Vietnam','Ms',84,'Thị','Minh','Trần','1990-03-22','female',NULL,NULL,NULL),(3,5,'789 Hai Bà Trưng, Đà Nẵng','Vietnam','Mr',84,'Quang',NULL,'Lê','1978-11-10','male','FLYNV2025',NULL,NULL),(4,5,'123 Trần Phú, Đà Nẵng','Vietnam','Mr',84,'Hoàng',NULL,'Nam','1995-08-20','male','SUMMER2025','2025-05-30 00:22:51',NULL),(5,6,'456 Nguyễn Huệ, Huế','Vietnam','Mr',84,'Ngọc',NULL,'Đức','1992-04-15','male',NULL,'2025-05-30 00:22:51',NULL),(6,7,'789 Lê Lợi, TP.HCM','Vietnam','Ms',84,'Lam','Anh','Phạm','1988-12-01','female','FLYNV2025','2025-05-30 00:22:51',NULL),(7,8,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-04 04:18:51','2025-06-04 04:18:51'),(8,9,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-04 15:26:26','2025-06-04 15:26:26'),(9,10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-04 16:54:10','2025-06-04 16:54:10'),(11,13,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-05 19:51:50','2025-06-05 19:51:50'),(12,14,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-06 14:17:23','2025-06-06 14:17:23'),(13,15,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-06 14:30:39','2025-06-06 14:30:39'),(14,16,NULL,NULL,NULL,NULL,'Đinh','Ngọc','Đức','2025-06-07T00:00:00.000Z',NULL,NULL,'2025-06-06 18:34:25','2025-06-06 18:47:36'),(15,17,'Hà Nội',NULL,NULL,84,'Đinh',NULL,'Đức','2025-06-07T00:00:00.000Z','male',NULL,'2025-06-06 19:33:12','2025-06-06 19:34:31'),(16,18,'Hà Nội',NULL,NULL,84,'Đinh',NULL,'Đức','2025-06-07T00:00:00.000Z','male',NULL,'2025-06-06 19:51:30','2025-06-06 19:54:01'),(17,19,'Hà Nội',NULL,NULL,84,'Đinh',NULL,'Đức','2025-06-07T00:00:00.000Z','male',NULL,'2025-06-06 20:21:18','2025-06-06 20:24:00');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flights`
--

DROP TABLE IF EXISTS `flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flights` (
  `id` int NOT NULL AUTO_INCREMENT,
  `flight_number` varchar(10) NOT NULL,
  `origin` varchar(100) DEFAULT NULL,
  `destination` varchar(100) DEFAULT NULL,
  `departure_time` datetime DEFAULT NULL,
  `arrival_time` datetime DEFAULT NULL,
  `duration` varchar(10) DEFAULT NULL,
  `status` enum('Đã lên lịch','Delayed','Hủy') DEFAULT 'Đã lên lịch',
  `airplane_id` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `airplane_id` (`airplane_id`),
  CONSTRAINT `flights_ibfk_1` FOREIGN KEY (`airplane_id`) REFERENCES `airplanes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flights`
--

LOCK TABLES `flights` WRITE;
/*!40000 ALTER TABLE `flights` DISABLE KEYS */;
INSERT INTO `flights` VALUES (1,'FL6001','Hà Nội','Thành phố Hồ Chí Minh','2025-06-04 09:00:00','2025-06-04 11:00:00','2h','Đã lên lịch',1,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(2,'FL6002','Đà Nẵng','Hà Nội','2025-06-05 10:00:00','2025-06-05 11:30:00','1h30m','Đã lên lịch',2,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(3,'FL6003','Thành phố Hồ Chí Minh','Đà Lạt','2025-06-06 08:00:00','2025-06-06 09:00:00','1h','Đã lên lịch',3,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(4,'FL6004','Nha Trang','Hà Nội','2025-06-07 12:00:00','2025-06-07 14:00:00','2h','Đã lên lịch',4,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(5,'FL6005','Phú Quốc','Thành phố Hồ Chí Minh','2025-06-08 07:00:00','2025-06-08 08:00:00','1h','Đã lên lịch',5,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(6,'FL6006','Cần Thơ','Đà Nẵng','2025-06-09 11:00:00','2025-06-09 13:00:00','2h','Đã lên lịch',6,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(7,'FL6007','Hải Phòng','Thành phố Hồ Chí Minh','2025-06-05 09:00:00','2025-06-05 11:00:00','2h','Đã lên lịch',7,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(8,'FL6008','Hà Nội','Thành phố Hồ Chí Minh','2025-06-05 14:00:00','2025-06-05 16:00:00','2h','Đã lên lịch',8,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(9,'FL6009','Thành phố Hồ Chí Minh','Đà Lạt','2025-06-12 10:00:00','2025-06-12 11:00:00','1h','Đã lên lịch',9,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(10,'FL6010','Hà Nội','Nha Trang','2025-06-13 08:00:00','2025-06-13 10:00:00','2h','Đã lên lịch',10,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(11,'FL6011','Thành phố Hồ Chí Minh','Phú Quốc','2025-06-14 12:00:00','2025-06-14 13:00:00','1h','Đã lên lịch',11,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(12,'FL6012','Đà Nẵng','Cần Thơ','2025-06-12 09:00:00','2025-06-12 11:00:00','2h','Đã lên lịch',12,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(13,'FL6013','Hà Nội','Thành phố Hồ Chí Minh','2025-06-06 10:00:00','2025-06-06 12:00:00','2h0m','Đã lên lịch',13,'2025-06-03 20:30:00','2025-06-05 18:19:10'),(14,'FL6014','Thành phố Hồ Chí Minh','Huế','2025-06-17 08:00:00','2025-06-17 10:00:00','2h','Đã lên lịch',14,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(15,'FL6015','Thành phố Hồ Chí Minh','Hà Nội','2025-06-09 07:00:00','2025-06-09 09:00:00','2h','Đã lên lịch',15,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(16,'FL6016','Nha Trang','Đà Nẵng','2025-06-19 11:00:00','2025-06-19 12:00:00','1h','Đã lên lịch',16,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(17,'FL6017','Phú Quốc','Hà Nội','2025-06-20 14:00:00','2025-06-20 16:00:00','2h','Đã lên lịch',17,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(18,'FL6018','Cần Thơ','Thành phố Hồ Chí Minh','2025-06-21 09:00:00','2025-06-21 10:00:00','1h','Đã lên lịch',18,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(19,'FL6019','Thành phố Hồ Chí Minh','Hà Nội','2025-06-10 12:00:00','2025-06-10 14:00:00','2h','Đã lên lịch',19,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(20,'FL6020','Quy Nhơn','Thành phố Hồ Chí Minh','2025-06-23 08:00:00','2025-06-23 10:00:00','2h','Đã lên lịch',20,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(21,'FL6021','Huế','Hà Nội','2025-06-24 07:00:00','2025-06-24 09:00:00','2h','Đã lên lịch',21,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(22,'FL6022','Hà Nội','Đà Lạt','2025-06-25 10:00:00','2025-06-25 12:00:00','2h','Đã lên lịch',22,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(23,'FL6023','Thành phố Hồ Chí Minh','Nha Trang','2025-06-26 09:00:00','2025-06-26 10:00:00','1h','Đã lên lịch',23,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(24,'FL6024','Đà Nẵng','Phú Quốc','2025-06-27 12:00:00','2025-06-27 13:30:00','1h30m','Đã lên lịch',24,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(25,'FL6025','Đà Nẵng','Cần Thơ','2025-06-28 08:00:00','2025-06-28 09:00:00','1h','Đã lên lịch',25,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(26,'FL6026','Thành phố Hồ Chí Minh','Hải Phòng','2025-06-29 11:00:00','2025-06-29 13:00:00','2h','Đã lên lịch',26,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(27,'FL6027','Nha Trang','Thành phố Hồ Chí Minh','2025-06-11 07:00:00','2025-06-11 08:30:00','1h30m','Đã lên lịch',27,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(28,'FL6028','Thành phố Hồ Chí Minh','Hà Nội','2025-06-11 09:00:00','2025-06-11 11:00:00','2h0m','Đã lên lịch',28,'2025-06-03 20:30:00','2025-06-05 18:05:21'),(29,'FL6029','Phú Quốc','Hà Nội','2025-07-02 10:00:00','2025-07-02 12:00:00','2h','Đã lên lịch',29,'2025-06-03 20:30:00','2025-06-03 20:30:00'),(30,'FL6030','Cần Thơ','Đà Nẵng','2025-07-03 12:00:00','2025-07-03 14:00:00','2h','Đã lên lịch',30,'2025-06-03 20:30:00','2025-06-03 20:30:00');
/*!40000 ALTER TABLE `flights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passengers`
--

DROP TABLE IF EXISTS `passengers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passengers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `booking_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  CONSTRAINT `passengers_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passengers`
--

LOCK TABLES `passengers` WRITE;
/*!40000 ALTER TABLE `passengers` DISABLE KEYS */;
INSERT INTO `passengers` VALUES (32,'Dinh','Duc','djnhngocduc@gmail.com','0327439997',32,'2025-06-05 19:25:44','2025-06-05 19:25:44'),(33,'Dinh','Duc','djnhngocduc@gmail.com','0327439997',33,'2025-06-05 19:27:20','2025-06-05 19:27:20'),(34,'Trần Lương','Minh Đức','minhductran024@gmail.com','0912345678',34,'2025-06-05 19:31:12','2025-06-05 19:31:12'),(35,'Đặng Quốc','Anh','22028064@vnu.edu.vn','0366258999',35,'2025-06-05 19:33:25','2025-06-05 19:33:25'),(36,'Trần Thị Hoa','Mai','hoamai1509@gmail.com','0378831509',36,'2025-06-05 19:35:35','2025-06-05 19:35:35'),(37,'Đinh Ngọc','Tài','nduclilsant@gmail.com','0964132123',37,'2025-06-05 19:55:31','2025-06-05 19:55:31'),(38,'Lê Văn','A','dinhngocduc1311@gmail.com','0987654321',38,'2025-06-06 14:24:58','2025-06-06 14:24:58'),(39,'Tran ','Minh Duc','tranluongminhduc123@gmail.com','0988502851',39,'2025-06-06 14:33:32','2025-06-06 14:33:32'),(40,'Trần ','Minh Đức','minhductran042@gmail.com','0988508251',40,'2025-06-06 14:43:28','2025-06-06 14:43:28'),(41,'Tran','Duc','tranluongminhduc123@gmail.com','204910492142',41,'2025-06-06 14:47:47','2025-06-06 14:47:47'),(42,'Tran ','Duc','minhductran042@gmail.com','294810294124',42,'2025-06-06 14:49:26','2025-06-06 14:49:26'),(43,'Mai Văn','B','dinhngocduc1311@gmail.com','0912674568',43,'2025-06-06 15:14:33','2025-06-06 15:14:33'),(44,'Vũ Văn','C','dinhngocduc1311@gmail.com','0978512423',44,'2025-06-06 15:21:39','2025-06-06 15:21:39'),(45,'Phan Tấn','Trung','dinhngocduc1311@gmail.com','0954212424',45,'2025-06-06 15:31:39','2025-06-06 15:31:39'),(46,'Trần Thị','E','dinhngocduc1311@gmail.com','0975123641',46,'2025-06-06 16:29:45','2025-06-06 16:29:45'),(47,'Trần Thị Hoa','Mai','hoamai1509@gmail.com','0378831509',47,'2025-06-06 16:46:30','2025-06-06 16:46:30'),(48,'Nguyễn Trọng','Hiếu','tronghieu123@gmail.com','0382104616',48,'2025-06-06 17:41:05','2025-06-06 17:41:05'),(49,'Đinh ','Đức','djnhngocduc@gmail.com','0327439997',49,'2025-06-06 18:11:06','2025-06-06 18:11:06'),(50,'Đinh','Đức','djnhngocduc@gmail.com','0327439997',50,'2025-06-06 18:29:56','2025-06-06 18:29:56'),(51,'Đinh','Đức','nduc@gmail.com','0327439997',51,'2025-06-06 18:36:28','2025-06-06 18:36:28'),(52,'Đinh','Đức','djnhngocduc@gmail.com','0327439997',52,'2025-06-06 19:47:08','2025-06-06 19:47:08'),(53,'Đinh','Đức','nduc123@gmail.com','0327439997',53,'2025-06-06 19:55:43','2025-06-06 19:55:43'),(54,'Đinh','Đức','djnhngocduc@gmail.com','0327439997',54,'2025-06-06 20:16:52','2025-06-06 20:16:52'),(55,'Đinh','Đức','nduc1234@gmail.com','0327439997',55,'2025-06-06 20:25:31','2025-06-06 20:25:31');
/*!40000 ALTER TABLE `passengers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `cta` varchar(100) DEFAULT NULL,
  `post_type` enum('promotion','news','event') DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `is_published` tinyint(1) DEFAULT '1',
  `admin_id` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (2,'https://cdn-img.upanhlaylink.com/img/image_20250601a044f151b70362f3b1875359d7c3f593.jpg','Ưu đãi cực cool tuần','Mua vé cực cool tuần giảm 15%','Đặt vé','promotion','2025-06-07 00:00:00','2025-06-08 23:59:59',1,1,NULL,NULL),(4,'https://cdn-img.upanhlaylink.com/img/image_202506019ace164455fb4fd08952f37220d5e591.jpg','Sự kiện tri ân khách hàng','Tham gia sự kiện nhận quà hấp dẫn','Tham gia ngay','event','2025-07-01 00:00:00','2025-07-15 23:59:59',1,1,NULL,NULL),(5,'https://cdn-img.upanhlaylink.com/img/image_2025060147c5ccbbc0463959f2dfd27dcac77fba.jpg','Combo vé máy bay + Khách sạn','Tiết kiệm đến 30% khi đặt combo','Đặt combo','promotion','2025-06-15 00:00:00','2025-09-15 23:59:59',1,1,NULL,NULL),(6,'https://cdn-img.upanhlaylink.com/img/image_202506012ae14fdde113c87c92784281849ad362.jpg','Thông báo lịch','Website sẽ bảo trì từ 0h - 4h ngày 20/6','Xem thông báo','news','2025-06-19 00:00:00','2025-06-20 04:00:00',1,1,NULL,NULL),(7,'https://cdn-img.upanhlaylink.com/img/image_20250601e307e171476d7e04387f5715a0ae8446.jpg','Khuyến mãi 2025','Giảm 30% cho các chuyến bay nội địa','Đặt ngay','promotion','2025-09-15 00:00:00','2025-10-15 00:00:00',0,1,'2025-05-30 07:54:21','2025-05-30 07:54:21'),(13,'link','Khuyến mãi 2026','Giảm 25% tất cả các chuyến bay','Đặt ngay','promotion','2025-06-07 00:00:00','2025-06-12 00:00:00',0,2,'2025-06-06 20:28:21','2025-06-06 20:28:47');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seats`
--

DROP TABLE IF EXISTS `seats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seat_type` enum('Economy','Premium') DEFAULT NULL,
  `seat_number` varchar(10) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT '1',
  `price` decimal(10,2) DEFAULT NULL,
  `flight_id` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `seats_ibfk_1` (`flight_id`),
  CONSTRAINT `seats_ibfk_1` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seats`
--

LOCK TABLES `seats` WRITE;
/*!40000 ALTER TABLE `seats` DISABLE KEYS */;
INSERT INTO `seats` VALUES (1,'Economy','C1',0,100.00,1,'2025-06-03 21:18:00','2025-06-05 18:43:15'),(2,'Economy','C2',0,100.00,1,'2025-06-03 21:18:00','2025-06-05 19:31:11'),(3,'Economy','C3',0,100.00,1,'2025-06-03 21:18:00','2025-06-06 14:43:28'),(4,'Economy','C4',0,100.00,1,'2025-06-03 21:18:00','2025-06-06 14:47:47'),(5,'Economy','C5',1,100.00,1,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(6,'Economy','C6',1,100.00,1,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(7,'Premium','D1',0,200.00,1,'2025-06-03 21:18:00','2025-06-06 14:33:31'),(8,'Premium','D2',0,200.00,1,'2025-06-03 21:18:00','2025-06-06 18:11:05'),(9,'Premium','D3',0,200.00,1,'2025-06-03 21:18:00','2025-06-06 18:29:55'),(10,'Premium','D4',0,200.00,1,'2025-06-03 21:18:00','2025-06-06 19:47:07'),(11,'Economy','C1',1,105.00,2,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(12,'Economy','C2',1,105.00,2,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(13,'Economy','C3',1,105.00,2,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(14,'Economy','C4',1,105.00,2,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(15,'Economy','C5',1,105.00,2,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(16,'Economy','C6',1,105.00,2,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(17,'Premium','D1',1,210.00,2,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(18,'Premium','D2',1,210.00,2,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(19,'Premium','D3',1,210.00,2,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(20,'Premium','D4',1,210.00,2,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(21,'Economy','C1',1,105.00,3,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(22,'Economy','C2',1,105.00,3,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(23,'Economy','C3',1,105.00,3,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(24,'Economy','C4',1,105.00,3,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(25,'Economy','C5',1,105.00,3,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(26,'Economy','C6',1,105.00,3,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(27,'Premium','D1',1,210.00,3,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(28,'Premium','D2',1,210.00,3,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(29,'Premium','D3',1,210.00,3,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(30,'Premium','D4',1,210.00,3,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(31,'Economy','C1',1,105.00,4,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(32,'Economy','C2',1,105.00,4,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(33,'Economy','C3',1,105.00,4,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(34,'Economy','C4',1,105.00,4,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(35,'Economy','C5',1,105.00,4,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(36,'Economy','C6',1,105.00,4,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(37,'Premium','D1',1,210.00,4,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(38,'Premium','D2',1,210.00,4,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(39,'Premium','D3',1,210.00,4,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(40,'Premium','D4',1,210.00,4,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(41,'Economy','C1',0,105.00,5,'2025-06-03 21:18:00','2025-06-06 15:21:39'),(42,'Economy','C2',0,105.00,5,'2025-06-03 21:18:00','2025-06-06 16:46:29'),(43,'Economy','C3',1,105.00,5,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(44,'Economy','C4',1,105.00,5,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(45,'Economy','C5',1,105.00,5,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(46,'Economy','C6',1,105.00,5,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(47,'Premium','D1',0,210.00,5,'2025-06-03 21:18:00','2025-06-06 15:31:39'),(48,'Premium','D2',1,210.00,5,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(49,'Premium','D3',1,210.00,5,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(50,'Premium','D4',1,210.00,5,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(51,'Economy','C1',0,105.00,6,'2025-06-03 21:18:00','2025-06-05 19:55:30'),(52,'Economy','C2',1,105.00,6,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(53,'Economy','C3',1,105.00,6,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(54,'Economy','C4',1,105.00,6,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(55,'Economy','C5',1,105.00,6,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(56,'Economy','C6',1,105.00,6,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(57,'Premium','D1',0,210.00,6,'2025-06-03 21:18:00','2025-06-06 15:14:32'),(58,'Premium','D2',1,210.00,6,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(59,'Premium','D3',1,210.00,6,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(60,'Premium','D4',1,210.00,6,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(61,'Economy','C1',1,105.00,7,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(62,'Economy','C2',1,105.00,7,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(63,'Economy','C3',1,105.00,7,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(64,'Economy','C4',1,105.00,7,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(65,'Economy','C5',1,105.00,7,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(66,'Economy','C6',1,105.00,7,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(67,'Premium','D1',1,210.00,7,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(68,'Premium','D2',1,210.00,7,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(69,'Premium','D3',1,210.00,7,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(70,'Premium','D4',1,210.00,7,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(71,'Economy','C1',1,105.00,8,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(72,'Economy','C2',1,105.00,8,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(73,'Economy','C3',1,105.00,8,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(74,'Economy','C4',1,105.00,8,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(75,'Economy','C5',1,105.00,8,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(76,'Economy','C6',1,105.00,8,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(77,'Premium','D1',0,210.00,8,'2025-06-03 21:18:00','2025-06-06 14:49:25'),(78,'Premium','D2',0,210.00,8,'2025-06-03 21:18:00','2025-06-06 20:16:51'),(79,'Premium','D3',1,210.00,8,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(80,'Premium','D4',1,210.00,8,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(81,'Economy','C1',1,105.00,9,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(82,'Economy','C2',1,105.00,9,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(83,'Economy','C3',1,105.00,9,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(84,'Economy','C4',1,105.00,9,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(85,'Economy','C5',1,105.00,9,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(86,'Economy','C6',1,105.00,9,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(87,'Premium','D1',1,210.00,9,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(88,'Premium','D2',1,210.00,9,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(89,'Premium','D3',1,210.00,9,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(90,'Premium','D4',1,210.00,9,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(91,'Economy','C1',0,105.00,10,'2025-06-03 21:18:00','2025-06-06 19:55:42'),(92,'Economy','C2',0,105.00,10,'2025-06-03 21:18:00','2025-06-06 20:25:31'),(93,'Economy','C3',1,105.00,10,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(94,'Economy','C4',1,105.00,10,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(95,'Economy','C5',1,105.00,10,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(96,'Economy','C6',1,105.00,10,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(97,'Premium','D1',0,210.00,10,'2025-06-03 21:18:00','2025-06-05 19:33:25'),(98,'Premium','D2',0,210.00,10,'2025-06-03 21:18:00','2025-06-06 18:36:28'),(99,'Premium','D3',1,210.00,10,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(100,'Premium','D4',1,210.00,10,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(101,'Economy','C1',1,105.00,11,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(102,'Economy','C2',1,105.00,11,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(103,'Economy','C3',1,105.00,11,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(104,'Economy','C4',1,105.00,11,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(105,'Economy','C5',1,105.00,11,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(106,'Economy','C6',1,105.00,11,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(107,'Premium','D1',1,210.00,11,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(108,'Premium','D2',1,210.00,11,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(109,'Premium','D3',1,210.00,11,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(110,'Premium','D4',1,210.00,11,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(111,'Economy','C1',1,105.00,12,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(112,'Economy','C2',1,105.00,12,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(113,'Economy','C3',1,105.00,12,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(114,'Economy','C4',1,105.00,12,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(115,'Economy','C5',1,105.00,12,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(116,'Economy','C6',1,105.00,12,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(117,'Premium','D1',1,210.00,12,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(118,'Premium','D2',1,210.00,12,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(119,'Premium','D3',1,210.00,12,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(120,'Premium','D4',1,210.00,12,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(121,'Economy','C1',0,105.00,13,'2025-06-03 21:18:00','2025-06-05 19:25:44'),(122,'Economy','C2',1,105.00,13,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(123,'Economy','C3',1,105.00,13,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(124,'Economy','C4',1,105.00,13,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(125,'Economy','C5',1,105.00,13,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(126,'Economy','C6',1,105.00,13,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(127,'Premium','D1',0,210.00,13,'2025-06-03 21:18:00','2025-06-06 14:24:58'),(128,'Premium','D2',1,210.00,13,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(129,'Premium','D3',1,210.00,13,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(130,'Premium','D4',1,210.00,13,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(131,'Economy','C1',1,105.00,14,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(132,'Economy','C2',1,105.00,14,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(133,'Economy','C3',1,105.00,14,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(134,'Economy','C4',1,105.00,14,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(135,'Economy','C5',1,105.00,14,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(136,'Economy','C6',1,105.00,14,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(137,'Premium','D1',1,210.00,14,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(138,'Premium','D2',1,210.00,14,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(139,'Premium','D3',1,210.00,14,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(140,'Premium','D4',1,210.00,14,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(141,'Economy','C1',0,105.00,15,'2025-06-03 21:18:00','2025-06-06 18:11:06'),(142,'Economy','C2',0,105.00,15,'2025-06-03 21:18:00','2025-06-06 18:29:55'),(143,'Economy','C3',0,105.00,15,'2025-06-03 21:18:00','2025-06-06 19:47:08'),(144,'Economy','C4',0,105.00,15,'2025-06-03 21:18:00','2025-06-06 20:16:52'),(145,'Economy','C5',1,105.00,15,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(146,'Economy','C6',1,105.00,15,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(147,'Premium','D1',0,210.00,15,'2025-06-03 21:18:00','2025-06-05 18:43:15'),(148,'Premium','D2',1,210.00,15,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(149,'Premium','D3',1,210.00,15,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(150,'Premium','D4',1,210.00,15,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(151,'Economy','C1',1,105.00,16,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(152,'Economy','C2',1,105.00,16,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(153,'Economy','C3',1,105.00,16,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(154,'Economy','C4',1,105.00,16,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(155,'Economy','C5',1,105.00,16,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(156,'Economy','C6',1,105.00,16,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(157,'Premium','D1',1,210.00,16,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(158,'Premium','D2',1,210.00,16,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(159,'Premium','D3',1,210.00,16,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(160,'Premium','D4',1,210.00,16,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(161,'Economy','C1',1,150.00,17,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(162,'Economy','C2',1,150.00,17,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(163,'Economy','C3',1,150.00,17,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(164,'Economy','C4',1,150.00,17,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(165,'Economy','C5',1,150.00,17,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(166,'Economy','C6',1,150.00,17,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(167,'Premium','D1',1,300.00,17,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(168,'Premium','D2',1,300.00,17,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(169,'Premium','D3',1,300.00,17,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(170,'Premium','D4',1,300.00,17,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(171,'Economy','C1',1,150.00,18,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(172,'Economy','C2',1,150.00,18,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(173,'Economy','C3',1,150.00,18,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(174,'Economy','C4',1,150.00,18,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(175,'Economy','C5',1,150.00,18,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(176,'Economy','C6',1,150.00,18,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(177,'Premium','D1',1,300.00,18,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(178,'Premium','D2',1,300.00,18,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(179,'Premium','D3',1,300.00,18,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(180,'Premium','D4',1,300.00,18,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(181,'Economy','C1',0,150.00,19,'2025-06-03 21:18:00','2025-06-06 14:49:25'),(182,'Economy','C2',1,150.00,19,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(183,'Economy','C3',1,150.00,19,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(184,'Economy','C4',1,150.00,19,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(185,'Economy','C5',1,150.00,19,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(186,'Economy','C6',1,150.00,19,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(187,'Premium','D1',0,300.00,19,'2025-06-03 21:18:00','2025-06-05 19:31:12'),(188,'Premium','D2',1,300.00,19,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(189,'Premium','D3',1,300.00,19,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(190,'Premium','D4',1,300.00,19,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(191,'Economy','C1',1,150.00,20,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(192,'Economy','C2',1,150.00,20,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(193,'Economy','C3',1,150.00,20,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(194,'Economy','C4',1,150.00,20,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(195,'Economy','C5',1,150.00,20,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(196,'Economy','C6',1,150.00,20,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(197,'Premium','D1',1,300.00,20,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(198,'Premium','D2',1,300.00,20,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(199,'Premium','D3',1,300.00,20,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(200,'Premium','D4',1,300.00,20,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(201,'Economy','C1',1,150.00,21,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(202,'Economy','C2',1,150.00,21,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(203,'Economy','C3',1,150.00,21,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(204,'Economy','C4',1,150.00,21,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(205,'Economy','C5',1,150.00,21,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(206,'Economy','C6',1,150.00,21,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(207,'Premium','D1',1,300.00,21,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(208,'Premium','D2',1,300.00,21,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(209,'Premium','D3',1,300.00,21,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(210,'Premium','D4',1,300.00,21,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(211,'Economy','C1',0,150.00,22,'2025-06-03 21:18:00','2025-06-05 19:35:34'),(212,'Economy','C2',1,150.00,22,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(213,'Economy','C3',1,150.00,22,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(214,'Economy','C4',1,150.00,22,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(215,'Economy','C5',1,150.00,22,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(216,'Economy','C6',1,150.00,22,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(217,'Premium','D1',1,300.00,22,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(218,'Premium','D2',1,300.00,22,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(219,'Premium','D3',1,300.00,22,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(220,'Premium','D4',1,300.00,22,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(221,'Economy','C1',1,150.00,23,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(222,'Economy','C2',1,150.00,23,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(223,'Economy','C3',1,150.00,23,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(224,'Economy','C4',1,150.00,23,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(225,'Economy','C5',1,150.00,23,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(226,'Economy','C6',1,150.00,23,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(227,'Premium','D1',1,300.00,23,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(228,'Premium','D2',1,300.00,23,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(229,'Premium','D3',1,300.00,23,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(230,'Premium','D4',1,300.00,23,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(231,'Economy','C1',0,150.00,24,'2025-06-03 21:18:00','2025-06-05 19:27:19'),(232,'Economy','C2',1,150.00,24,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(233,'Economy','C3',1,150.00,24,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(234,'Economy','C4',1,150.00,24,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(235,'Economy','C5',1,150.00,24,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(236,'Economy','C6',1,150.00,24,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(237,'Premium','D1',0,300.00,24,'2025-06-03 21:18:00','2025-06-06 16:29:45'),(238,'Premium','D2',1,300.00,24,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(239,'Premium','D3',1,300.00,24,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(240,'Premium','D4',1,300.00,24,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(241,'Economy','C1',1,150.00,25,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(242,'Economy','C2',1,150.00,25,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(243,'Economy','C3',1,150.00,25,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(244,'Economy','C4',1,150.00,25,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(245,'Economy','C5',1,150.00,25,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(246,'Economy','C6',1,150.00,25,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(247,'Premium','D1',1,300.00,25,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(248,'Premium','D2',1,300.00,25,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(249,'Premium','D3',1,300.00,25,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(250,'Premium','D4',1,300.00,25,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(251,'Economy','C1',1,150.00,26,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(252,'Economy','C2',1,150.00,26,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(253,'Economy','C3',1,150.00,26,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(254,'Economy','C4',1,150.00,26,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(255,'Economy','C5',1,150.00,26,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(256,'Economy','C6',1,150.00,26,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(257,'Premium','D1',1,300.00,26,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(258,'Premium','D2',1,300.00,26,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(259,'Premium','D3',1,300.00,26,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(260,'Premium','D4',1,300.00,26,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(261,'Economy','C1',1,150.00,27,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(262,'Economy','C2',1,150.00,27,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(263,'Economy','C3',1,150.00,27,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(264,'Economy','C4',1,150.00,27,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(265,'Economy','C5',1,150.00,27,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(266,'Economy','C6',1,150.00,27,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(267,'Premium','D1',1,300.00,27,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(268,'Premium','D2',1,300.00,27,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(269,'Premium','D3',1,300.00,27,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(270,'Premium','D4',1,300.00,27,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(271,'Economy','C1',1,150.00,28,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(272,'Economy','C2',1,150.00,28,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(273,'Economy','C3',1,150.00,28,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(274,'Economy','C4',1,150.00,28,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(275,'Economy','C5',1,150.00,28,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(276,'Economy','C6',1,150.00,28,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(277,'Premium','D1',1,300.00,28,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(278,'Premium','D2',1,300.00,28,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(279,'Premium','D3',1,300.00,28,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(280,'Premium','D4',1,300.00,28,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(281,'Economy','C1',1,150.00,29,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(282,'Economy','C2',1,150.00,29,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(283,'Economy','C3',1,150.00,29,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(284,'Economy','C4',1,150.00,29,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(285,'Economy','C5',1,150.00,29,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(286,'Economy','C6',1,150.00,29,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(287,'Premium','D1',1,300.00,29,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(288,'Premium','D2',1,300.00,29,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(289,'Premium','D3',1,300.00,29,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(290,'Premium','D4',1,300.00,29,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(291,'Economy','C1',0,150.00,30,'2025-06-03 21:18:00','2025-06-06 17:41:04'),(292,'Economy','C2',1,150.00,30,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(293,'Economy','C3',1,150.00,30,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(294,'Economy','C4',1,150.00,30,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(295,'Economy','C5',1,150.00,30,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(296,'Economy','C6',1,150.00,30,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(297,'Premium','D1',1,300.00,30,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(298,'Premium','D2',1,300.00,30,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(299,'Premium','D3',1,300.00,30,'2025-06-03 21:18:00','2025-06-03 21:18:00'),(300,'Premium','D4',1,300.00,30,'2025-06-03 21:18:00','2025-06-03 21:18:00');
/*!40000 ALTER TABLE `seats` ENABLE KEYS */;
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
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('customer','admin') NOT NULL,
  `status` enum('active','disabled') NOT NULL DEFAULT 'active',
  `profilePicture` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'nguyen.van@gmail.com','0901234567','hashed_password1','customer','active','https://wallpapers.com/images/file/cute-profile-picture-diw8fgkjdz6fq6k7.jpg',NULL,'2025-06-02 16:32:43'),(2,'tran.thi@gmail.com','0912345678','hashed_password2','customer','active',NULL,NULL,NULL),(3,'admin@example.com','0923456789','Tyvabin1','admin','active','admin',NULL,NULL),(4,'le.quang@gmail.com','0934567890','hashed_password4','customer','active',NULL,NULL,NULL),(5,'hoang.nam@gmail.com','0945678901','hashed_password5','customer','active',NULL,'2025-05-30 00:20:00',NULL),(6,'dinhngocduc@gmail.com','0945678902','hashed_password6','customer','active',NULL,'2025-05-30 00:20:00',NULL),(7,'lan.anh@gmail.com','0945678903','hashed_password7','customer','active',NULL,'2025-05-30 00:20:00',NULL),(8,'djnhngocduc@gmail.com',NULL,'$2b$10$CWV.dJz3mg04ekU8SUtIMenEp54cbSTfQr1B4YsKE9fdl8wOH0cae','customer','active',NULL,'2025-06-04 04:18:51','2025-06-04 04:18:51'),(9,'minhductran042@gmail.com',NULL,'$2b$10$/RHELr.1ywle/aCPrmz1G.YS4SrDN6psjEFKvKmqgbFQjpDVeRKcW','customer','active',NULL,'2025-06-04 15:26:25','2025-06-04 15:26:25'),(10,'dqa2412@gmail.com',NULL,'$2b$10$6ysIK3AiDNb/JRhbAANYT.QTRxwuxSI.ZR/TSBO79iekw/ou3eHbi','customer','active',NULL,'2025-06-04 16:54:10','2025-06-04 16:54:10'),(11,'admin1@example.com',NULL,'$2b$10$6The6dXQhlsDqT9mcZuLQuJkkoSQl1MTU6doZ6m60xNFvqvlBB0ga','admin','active',NULL,'2025-06-05 11:47:33','2025-06-05 11:47:33'),(13,'nduclilsant@gmail.com',NULL,'$2b$10$8MFeoz6HdaHHI1Xi/kbphupTUtdZy2sxqFPf4B6abtfuHSJCRupYK','customer','active',NULL,'2025-06-05 19:51:50','2025-06-05 19:51:50'),(14,'dinhngocduc1311@gmail.com',NULL,'$2b$10$iZYKbB3c3SHM9gKUdRaJl.jd.cOTfw1CR.9PaLwGZSeoE1m1zWuyu','customer','active',NULL,'2025-06-06 14:17:22','2025-06-06 14:17:22'),(15,'tranluongminhduc123@gmail.com',NULL,'$2b$10$hJkt5g.w1l2HCLc1V9eaZeXQYPeqYiO6Io2JlJ.YT45FSipRb9dcW','customer','active',NULL,'2025-06-06 14:30:39','2025-06-06 14:30:39'),(16,'nduc@gmail.com',NULL,'$2b$10$EHptD5ln74q4xPiXqiKV4.yajY/8tznM7A9FdBfWphIRxDe70eJxG','customer','active',NULL,'2025-06-06 18:34:25','2025-06-06 18:34:25'),(17,'nduc1@example.com','0327439997','$2b$10$Lo1snUq.MPSnIjhQxF4oLu8HRmxeZpOyPr6W7KQ33nJD5./saIf42','customer','active',NULL,'2025-06-06 19:33:11','2025-06-06 19:34:30'),(18,'nduc123@gmail.com','0327439997','$2b$10$M4Bi9BlzW2yQiBu8vB79HOUSumIu4YvgdEgoMVzfqyCZDQ7Bi6xLC','customer','active',NULL,'2025-06-06 19:51:30','2025-06-06 19:54:00'),(19,'nduc1234@gmail.com','0327439997','$2b$10$gJ0PD/593bNbKo.ewuzAT.JsksAYGt6V.qgW8YCwEYNlIaxjXet5y','customer','active',NULL,'2025-06-06 20:21:18','2025-06-06 20:23:59');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-07  9:33:21
