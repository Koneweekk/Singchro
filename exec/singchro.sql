-- MariaDB dump 10.19-11.1.2-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: singchro
-- ------------------------------------------------------
-- Server version	11.1.2-MariaDB-1:11.1.2+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `singchro`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `singchro` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `singchro`;

--
-- Table structure for table `account_emailaddress`
--

DROP TABLE IF EXISTS `account_emailaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_emailaddress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(254) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `primary` tinyint(1) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_emailaddress_user_id_email_987c8728_uniq` (`user_id`,`email`),
  CONSTRAINT `account_emailaddress_user_id_2c513194_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailaddress`
--

LOCK TABLES `account_emailaddress` WRITE;
/*!40000 ALTER TABLE `account_emailaddress` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_emailaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_emailconfirmation`
--

DROP TABLE IF EXISTS `account_emailconfirmation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_emailconfirmation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `sent` datetime(6) DEFAULT NULL,
  `key` varchar(64) NOT NULL,
  `email_address_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  KEY `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` (`email_address_id`),
  CONSTRAINT `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` FOREIGN KEY (`email_address_id`) REFERENCES `account_emailaddress` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailconfirmation`
--

LOCK TABLES `account_emailconfirmation` WRITE;
/*!40000 ALTER TABLE `account_emailconfirmation` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_emailconfirmation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_user`
--

DROP TABLE IF EXISTS `accounts_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `email` varchar(254) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `imgPath` varchar(100) DEFAULT NULL,
  `alarmToken` longtext DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_email_confirmed` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `nickname` (`nickname`),
  UNIQUE KEY `alarmToken` (`alarmToken`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_user`
--

LOCK TABLES `accounts_user` WRITE;
/*!40000 ALTER TABLE `accounts_user` DISABLE KEYS */;
INSERT INTO `accounts_user` VALUES
(1,'pbkdf2_sha256$600000$FcJ4cGDujA7x6pgiQGvrRj$3QZpguuvT04RORU+5GuJsYnSsnmBM2hVJzzuRUuLxCk=','2023-10-04 04:58:19.083264',1,'ssafy@naver.com','','',1,'2023-10-04 04:01:58.027192','ssafy@naver.com','ssafy','',NULL,'2023-10-04 04:01:58.524559',1,0),
(2,'pbkdf2_sha256$600000$Nz1Lu2MacnCghwBfe1eFTm$x+F6j/gocx01IBPcbje9N89sT8EzK081X9Up76SikL0=','2023-10-04 08:30:21.950044',0,'rlagkswn37@naver.com','','',1,'2023-10-04 04:02:58.657731','rlagkswn37@naver.com','한주','','fnuEYkMNSFiLJ99ilfzjm5:APA91bEE1ID0RPVC8-MHj0qRijPFE7-1gNqt-BUbYfTnuH8mDx7sMUAirFLTDSpLjoVctCqcgWPTWLS9-BOef5g0sPuiMF39RX1K7YHAU2dpAXlyBoMs1IERtvet8tsSHtU6cVwhehLC','2023-10-04 04:02:59.154256',0,0),
(3,'pbkdf2_sha256$600000$wKpmeYj7NVe3Ga82p5A9jb$JTomOf2G6vH4TbCGk9U+ba/c94hqd+4VVdYN50U67oo=','2023-10-04 08:56:56.366834',0,'moonheee0@gmail.com','','',1,'2023-10-04 05:23:57.383623','moonheee0@gmail.com','hee','','cml3olDiRyeRBBRxc3dpHM:APA91bFl_5cwW7Ng91eupumwW9h_H-PY-ZA05vvq7prTM9UjTWZZK6yMhwgj72M_-uIZsWxPe8QXdz2osFDPZy88AvvbMpltdUrFzlggcgx4_5QmThKcY8Pk-QZAaqShrxf3oyZDn2YV','2023-10-04 05:23:57.882194',0,0),
(4,'pbkdf2_sha256$600000$Mz3D1BsKGv4DtTRfIzsOIh$YO7BeHBunFRmefbSAwfQj6Ht0wift8zSNas1ElrJukw=','2023-10-04 06:51:02.639871',0,'bmformail@naver.com','','',1,'2023-10-04 06:50:47.916405','bmformail@naver.com','오늘밤바라본','','cwDlPeUNS8yGaYvST2x8Vh:APA91bFZoiWp9h3mSa9M5T-d4FJGqWOmEVOkPUhrq8xoWeNABVjDHTS8RZiM_LUw1pGUG35kZejBtUq9Is_BFKxfurooUWYy1uUTWyWNyB4YbEZ9EnDbtJu6PObymyijN4LlBDd97rpr','2023-10-04 06:50:48.413670',0,0),
(5,'pbkdf2_sha256$600000$MMudxjjDTSlusLFj4rW5r6$nnNp8F9ndIZinzfhypBPOxuPymg2vtkF4fBdf0aMeX0=','2023-10-04 08:01:56.752738',0,'seyi607@gmail.com','','',1,'2023-10-04 08:01:41.302881','seyi607@gmail.com','seyi','','f9vbh1enSfykvG8x0WeoSn:APA91bHF8zmZh0fEwBp4KeiGeWC0NBAWaJowQs3t1JpIxSFeZ6Jl2jaH7WK4Myy1qdRU-ULO5Dn8I2VSCiGtHf2cPk6nuEVO5QtNdfnLHfNcwBHLj7zfVr-SsDU_o9rT1IgW-wjhtzmp','2023-10-04 08:01:41.798779',0,0),
(6,'pbkdf2_sha256$600000$e03hqxsUi76DUfNrTNYcXR$HoN6CLWPh6xkqsLEVxyox5z6PA0cam5v2ExKCgNGxDI=','2023-10-04 13:12:37.895248',0,'panzer1209@naver.com','','',1,'2023-10-04 13:11:15.834620','panzer1209@naver.com','PANZER','','d0r0GaOeQqG4GjE_FwORgx:APA91bEqOeFp-mBoHQl3scnHgOm0kddXlCBdCocpW9os9W_8Wh2kXBUpCdJRaLXHMyfUp2eqDgkkIRL1LvHtu8xAF2ElvCZisFkIljK8P4Yo2HyFcw7hwUVObFWO1FtZMZ6EtjiqT6Rn','2023-10-04 13:11:16.333589',0,0);
/*!40000 ALTER TABLE `accounts_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_user_groups`
--

DROP TABLE IF EXISTS `accounts_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_user_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accounts_user_groups_user_id_group_id_59c0b32f_uniq` (`user_id`,`group_id`),
  KEY `accounts_user_groups_group_id_bd11a704_fk_auth_group_id` (`group_id`),
  CONSTRAINT `accounts_user_groups_group_id_bd11a704_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `accounts_user_groups_user_id_52b62117_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_user_groups`
--

LOCK TABLES `accounts_user_groups` WRITE;
/*!40000 ALTER TABLE `accounts_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_user_user_permissions`
--

DROP TABLE IF EXISTS `accounts_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts_user_user_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accounts_user_user_permi_user_id_permission_id_2ab516c2_uniq` (`user_id`,`permission_id`),
  KEY `accounts_user_user_p_permission_id_113bb443_fk_auth_perm` (`permission_id`),
  CONSTRAINT `accounts_user_user_p_permission_id_113bb443_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `accounts_user_user_p_user_id_e4f0a161_fk_accounts_` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_user_user_permissions`
--

LOCK TABLES `accounts_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `accounts_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES
(1,'Can add cover song',1,'add_coversong'),
(2,'Can change cover song',1,'change_coversong'),
(3,'Can delete cover song',1,'delete_coversong'),
(4,'Can view cover song',1,'view_coversong'),
(5,'Can add voice model',2,'add_voicemodel'),
(6,'Can change voice model',2,'change_voicemodel'),
(7,'Can delete voice model',2,'delete_voicemodel'),
(8,'Can view voice model',2,'view_voicemodel'),
(9,'Can add song like',3,'add_songlike'),
(10,'Can change song like',3,'change_songlike'),
(11,'Can delete song like',3,'delete_songlike'),
(12,'Can view song like',3,'view_songlike'),
(13,'Can add origin song',4,'add_originsong'),
(14,'Can change origin song',4,'change_originsong'),
(15,'Can delete origin song',4,'delete_originsong'),
(16,'Can view origin song',4,'view_originsong'),
(17,'Can add cover request',5,'add_coverrequest'),
(18,'Can change cover request',5,'change_coverrequest'),
(19,'Can delete cover request',5,'delete_coverrequest'),
(20,'Can view cover request',5,'view_coverrequest'),
(21,'Can add user',6,'add_user'),
(22,'Can change user',6,'change_user'),
(23,'Can delete user',6,'delete_user'),
(24,'Can view user',6,'view_user'),
(25,'Can add Token',7,'add_token'),
(26,'Can change Token',7,'change_token'),
(27,'Can delete Token',7,'delete_token'),
(28,'Can view Token',7,'view_token'),
(29,'Can add token',8,'add_tokenproxy'),
(30,'Can change token',8,'change_tokenproxy'),
(31,'Can delete token',8,'delete_tokenproxy'),
(32,'Can view token',8,'view_tokenproxy'),
(33,'Can add log entry',9,'add_logentry'),
(34,'Can change log entry',9,'change_logentry'),
(35,'Can delete log entry',9,'delete_logentry'),
(36,'Can view log entry',9,'view_logentry'),
(37,'Can add permission',10,'add_permission'),
(38,'Can change permission',10,'change_permission'),
(39,'Can delete permission',10,'delete_permission'),
(40,'Can view permission',10,'view_permission'),
(41,'Can add group',11,'add_group'),
(42,'Can change group',11,'change_group'),
(43,'Can delete group',11,'delete_group'),
(44,'Can view group',11,'view_group'),
(45,'Can add content type',12,'add_contenttype'),
(46,'Can change content type',12,'change_contenttype'),
(47,'Can delete content type',12,'delete_contenttype'),
(48,'Can view content type',12,'view_contenttype'),
(49,'Can add session',13,'add_session'),
(50,'Can change session',13,'change_session'),
(51,'Can delete session',13,'delete_session'),
(52,'Can view session',13,'view_session'),
(53,'Can add site',14,'add_site'),
(54,'Can change site',14,'change_site'),
(55,'Can delete site',14,'delete_site'),
(56,'Can view site',14,'view_site'),
(57,'Can add email address',15,'add_emailaddress'),
(58,'Can change email address',15,'change_emailaddress'),
(59,'Can delete email address',15,'delete_emailaddress'),
(60,'Can view email address',15,'view_emailaddress'),
(61,'Can add email confirmation',16,'add_emailconfirmation'),
(62,'Can change email confirmation',16,'change_emailconfirmation'),
(63,'Can delete email confirmation',16,'delete_emailconfirmation'),
(64,'Can view email confirmation',16,'view_emailconfirmation'),
(65,'Can add social account',17,'add_socialaccount'),
(66,'Can change social account',17,'change_socialaccount'),
(67,'Can delete social account',17,'delete_socialaccount'),
(68,'Can view social account',17,'view_socialaccount'),
(69,'Can add social application',18,'add_socialapp'),
(70,'Can change social application',18,'change_socialapp'),
(71,'Can delete social application',18,'delete_socialapp'),
(72,'Can view social application',18,'view_socialapp'),
(73,'Can add social application token',19,'add_socialtoken'),
(74,'Can change social application token',19,'change_socialtoken'),
(75,'Can delete social application token',19,'delete_socialtoken'),
(76,'Can view social application token',19,'view_socialtoken');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
INSERT INTO `authtoken_token` VALUES
('0905eb831d4e2c3b9bf7529ba490af152083016a','2023-10-04 08:01:56.748553',5),
('17774b82346f06939f375fc05632b88d08498f48','2023-10-04 05:24:13.176925',3),
('316df23c3938b1b472533aa1b4906cbf0b119768','2023-10-04 08:30:21.942981',2),
('79d23957884d74cb6414693f7ca39b29615c0d3c','2023-10-04 06:51:02.632969',4),
('bcef21fff5b73b9fcc18bd2997e5a186eda58e64','2023-10-04 13:12:37.890800',6);
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES
(1,'2023-10-04 04:08:16.966671','1','OriginSong object (1)',3,'',4,1),
(2,'2023-10-04 04:44:41.996258','2','CoverSong object (2)',3,'',1,1),
(3,'2023-10-04 04:44:54.214350','2','OriginSong object (2)',3,'',4,1),
(4,'2023-10-04 04:45:06.111565','1','VoiceModel object (1)',3,'',2,1),
(5,'2023-10-04 09:00:49.448047','5','VoiceModel object (5)',3,'',2,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES
(15,'account','emailaddress'),
(16,'account','emailconfirmation'),
(6,'accounts','user'),
(9,'admin','logentry'),
(11,'auth','group'),
(10,'auth','permission'),
(7,'authtoken','token'),
(8,'authtoken','tokenproxy'),
(12,'contenttypes','contenttype'),
(5,'restapi','coverrequest'),
(1,'restapi','coversong'),
(4,'restapi','originsong'),
(3,'restapi','songlike'),
(2,'restapi','voicemodel'),
(13,'sessions','session'),
(14,'sites','site'),
(17,'socialaccount','socialaccount'),
(18,'socialaccount','socialapp'),
(19,'socialaccount','socialtoken');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES
(1,'contenttypes','0001_initial','2023-10-04 04:01:30.585701'),
(2,'contenttypes','0002_remove_content_type_name','2023-10-04 04:01:30.622731'),
(3,'auth','0001_initial','2023-10-04 04:01:30.762984'),
(4,'auth','0002_alter_permission_name_max_length','2023-10-04 04:01:30.794177'),
(5,'auth','0003_alter_user_email_max_length','2023-10-04 04:01:30.799721'),
(6,'auth','0004_alter_user_username_opts','2023-10-04 04:01:30.804919'),
(7,'auth','0005_alter_user_last_login_null','2023-10-04 04:01:30.810183'),
(8,'auth','0006_require_contenttypes_0002','2023-10-04 04:01:30.812120'),
(9,'auth','0007_alter_validators_add_error_messages','2023-10-04 04:01:30.817144'),
(10,'auth','0008_alter_user_username_max_length','2023-10-04 04:01:30.822071'),
(11,'auth','0009_alter_user_last_name_max_length','2023-10-04 04:01:30.827174'),
(12,'auth','0010_alter_group_name_max_length','2023-10-04 04:01:30.847063'),
(13,'auth','0011_update_proxy_permissions','2023-10-04 04:01:30.853236'),
(14,'auth','0012_alter_user_first_name_max_length','2023-10-04 04:01:30.858671'),
(15,'accounts','0001_initial','2023-10-04 04:01:31.058962'),
(16,'account','0001_initial','2023-10-04 04:01:31.144521'),
(17,'account','0002_email_max_length','2023-10-04 04:01:31.165542'),
(18,'account','0003_alter_emailaddress_create_unique_verified_email','2023-10-04 04:01:31.195166'),
(19,'account','0004_alter_emailaddress_drop_unique_email','2023-10-04 04:01:31.302602'),
(20,'admin','0001_initial','2023-10-04 04:01:31.382202'),
(21,'admin','0002_logentry_remove_auto_add','2023-10-04 04:01:31.390389'),
(22,'admin','0003_logentry_add_action_flag_choices','2023-10-04 04:01:31.398229'),
(23,'authtoken','0001_initial','2023-10-04 04:01:31.440697'),
(24,'authtoken','0002_auto_20160226_1747','2023-10-04 04:01:31.468169'),
(25,'authtoken','0003_tokenproxy','2023-10-04 04:01:31.470475'),
(26,'restapi','0001_initial','2023-10-04 04:01:31.790104'),
(27,'sessions','0001_initial','2023-10-04 04:01:31.816934'),
(28,'sites','0001_initial','2023-10-04 04:01:31.838370'),
(29,'sites','0002_alter_domain_unique','2023-10-04 04:01:31.855328'),
(30,'socialaccount','0001_initial','2023-10-04 04:01:32.123101'),
(31,'socialaccount','0002_token_max_lengths','2023-10-04 04:01:32.176453'),
(32,'socialaccount','0003_extra_data_default_dict','2023-10-04 04:01:32.188354'),
(33,'socialaccount','0004_app_provider_id_settings','2023-10-04 04:01:32.257561');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES
('7fsm31xbzczr0x4t6a382n8akda6u1ps','.eJxVjMsOwiAQAP-FsyE8WgoevfcbyLLLStXQpLQn478bkh70OjOZt4hw7CUeLW9xIXEVWlx-WQJ85toFPaDeV4lr3bclyZ7I0zY5r5Rft7P9GxRopW-ZQI-W2dHkBp98ZmUQ2RAZldmxs6iHMMGI3mlrAYPywBTQkc3kxecLBJI40A:1qntxj:JzP2KJYAxwLwDPcvnsx1Hd53zpVGoiYBSM_pdrnI7PM','2023-10-18 04:58:19.086614'),
('9e3xw45fg51zgsf64g73twe5ta3kpc4y','.eJxVjDsOwjAQBe_iGlnrX4wp6XMGa9dr4wBypDipEHeHSCmgfTPzXiLitta49bzEicVFGHH63QjTI7cd8B3bbZZpbusykdwVedAux5nz83q4fwcVe_3WRTtHAQHyAE4bXRAJDIFmlzX7HKwHsAOjt1YVH5ApnMEbBQpT8Uq8P9PlN1Q:1qnxge:4TG5ZuXaLos72xhHofSi6FTm51cMwb8HgmsxDdUQi10','2023-10-18 08:56:56.370252'),
('9ja6mtjkcfjri0wosrkx3pqhrlvgwfdf','.eJxVjDsOwjAQBe_iGlnrX4wp6XMGa9dr4wBypDipEHeHSCmgfTPzXiLitta49bzEicVFGHH63QjTI7cd8B3bbZZpbusykdwVedAux5nz83q4fwcVe_3WRTtHAQHyAE4bXRAJDIFmlzX7HKwHsAOjt1YVH5ApnMEbBQpT8Uq8P9PlN1Q:1qnuMn:wRWKwzTP83IEies32tX3agEaZEpAq_HqwOSPrq92CgU','2023-10-18 05:24:13.185404'),
('g7amwd6igdpdn214qoyursaxzjvxqty9','.eJxVjM0OwiAQhN-FsyFQXKAevfcZml12kaqBpD8n47trkx70Npnvm3mpEbe1jNsi8zixuihQp9-OMD2k7oDvWG9Np1bXeSK9K_qgix4ay_N6uH8HBZfyXXchMYYkVnKImaPvxDow5M-0J0fYixFvCRgdQG-MNQw5OxsJULJ6fwD5fjhU:1qnwpQ:S82DhE1ZLpAvotyGUYzIhG_snTOcI9ZutWmUrbDg970','2023-10-18 08:01:56.758593'),
('jiyornte6c1wx7zh1ahnijw2ps0nav24','.eJxVjMsOwiAQAP-FsyE8WgoevfcbyLLLStXQpLQn478bkh70OjOZt4hw7CUeLW9xIXEVWlx-WQJ85toFPaDeV4lr3bclyZ7I0zY5r5Rft7P9GxRopW-ZQI-W2dHkBp98ZmUQ2RAZldmxs6iHMMGI3mlrAYPywBTQkc3kxecLBJI40A:1qnt5T:uqez8ZNBord3Y72lj-UIlZuvJrJ_LGgwWckgDSBg-hw','2023-10-18 04:02:15.684112'),
('juwndxgff9u5ayjflzmvni7opg32e4ie','.eJxVjMsOwiAUBf-FtSFA4UJduvcbmvtopWogKe3K-O_apAvdnpk5LzXgtuZha-MyzKLOyqnT70bIj7HsQO5YblVzLesyk94VfdCmr1XG5-Vw_w4ytvytjePUk2eGLjgLRBbESLASIAlyIugT2BgN-64Dmyb0kR2GKMQ0OaPeH9CoN5g:1qnxGv:PKjLpChdJiJmRwp8Re368Fh2FbPuNaEhQeIyjOdvgh8','2023-10-18 08:30:21.954539'),
('otdps4ensno8nfz376km80mgllefy6p8','.eJxVjMsOwiAQAP-FsyE8WgoevfcbyLLLStXQpLQn478bkh70OjOZt4hw7CUeLW9xIXEVWlx-WQJ85toFPaDeV4lr3bclyZ7I0zY5r5Rft7P9GxRopW-ZQI-W2dHkBp98ZmUQ2RAZldmxs6iHMMGI3mlrAYPywBTQkc3kxecLBJI40A:1qntS5:O04ld7OKjlEcP46K7DYhyzbtPUJCQO_9nQCWxWBpDY4','2023-10-18 04:25:37.130707'),
('sjtwk1h9zznk97iudbfapgq2vh7j6dkl','.eJxVjDsOwjAQBe_iGlmJvzElPWewdtdeHEC2FCcV4u4QKQW0b2beS0TY1hK3npc4J3EWRpx-NwR65LqDdId6a5JaXZcZ5a7Ig3Z5bSk_L4f7d1Cgl289qARIedRDguDB6gCWJmYg8jR6O6FiB06x0dlk9EyGiZ0JSKgxgXh_ABWsOaw:1qnvio:ZiovIXpiPBFk3W74xul97peBzmMYF458sS7unxcP1h8','2023-10-18 06:51:02.643328'),
('yl0m46qahf2m4dcsbo8js0egnydz0s6s','.eJxVjMsOwiAQRf-FtSEBysule7-BzAyDVA0kpV0Z_12bdKHbe865L5FgW2vaBi9pzuIsnDj9bgj04LaDfId265J6W5cZ5a7Igw557Zmfl8P9O6gw6reGwD5MqC3EEsnypLX2CF4Z0FQ8OmVIO4_Ezqho1KRKQBMz-sxkLYv3B-VnOAw:1qo1g5:ny_09ln-kmfNvkgkdoHjcdyUHT9L-kfjYDOcxcBNj9c','2023-10-18 13:12:37.898698');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_site`
--

DROP TABLE IF EXISTS `django_site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_site` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_site_domain_a2e37b91_uniq` (`domain`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_site`
--

LOCK TABLES `django_site` WRITE;
/*!40000 ALTER TABLE `django_site` DISABLE KEYS */;
INSERT INTO `django_site` VALUES
(1,'example.com','example.com');
/*!40000 ALTER TABLE `django_site` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restapi_coverrequest`
--

DROP TABLE IF EXISTS `restapi_coverrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restapi_coverrequest` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `message` longtext DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL,
  `isChecked` tinyint(1) NOT NULL,
  `isAccepted` tinyint(1) DEFAULT NULL,
  `originSongId_id` bigint(20) NOT NULL,
  `requestUser_id` bigint(20) NOT NULL,
  `useModel_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `restapi_coverrequest_originSongId_id_56827eb5_fk_restapi_o` (`originSongId_id`),
  KEY `restapi_coverrequest_requestUser_id_9cc9bdd4_fk_accounts_user_id` (`requestUser_id`),
  KEY `restapi_coverrequest_useModel_id_242a4580_fk_restapi_v` (`useModel_id`),
  CONSTRAINT `restapi_coverrequest_originSongId_id_56827eb5_fk_restapi_o` FOREIGN KEY (`originSongId_id`) REFERENCES `restapi_originsong` (`id`),
  CONSTRAINT `restapi_coverrequest_requestUser_id_9cc9bdd4_fk_accounts_user_id` FOREIGN KEY (`requestUser_id`) REFERENCES `accounts_user` (`id`),
  CONSTRAINT `restapi_coverrequest_useModel_id_242a4580_fk_restapi_v` FOREIGN KEY (`useModel_id`) REFERENCES `restapi_voicemodel` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restapi_coverrequest`
--

LOCK TABLES `restapi_coverrequest` WRITE;
/*!40000 ALTER TABLE `restapi_coverrequest` DISABLE KEYS */;
INSERT INTO `restapi_coverrequest` VALUES
(1,NULL,'2023-10-04 05:34:23.220543',1,0,4,3,2),
(2,NULL,'2023-10-04 05:54:35.056087',1,0,5,3,2),
(3,NULL,'2023-10-04 06:03:17.189698',1,0,5,3,2),
(4,NULL,'2023-10-04 06:10:28.342794',1,0,5,3,2),
(5,NULL,'2023-10-04 06:13:42.059259',1,1,5,3,2),
(6,NULL,'2023-10-04 06:16:15.198410',1,1,5,3,3),
(7,NULL,'2023-10-04 07:14:57.466391',1,1,6,3,3),
(8,NULL,'2023-10-04 07:49:42.381773',1,1,8,3,3),
(9,NULL,'2023-10-04 08:00:04.984329',1,1,9,3,4),
(10,NULL,'2023-10-04 08:34:40.720253',1,0,9,3,3),
(11,NULL,'2023-10-04 08:35:40.630492',1,0,9,3,3),
(12,NULL,'2023-10-05 03:22:47.515751',0,0,12,6,3);
/*!40000 ALTER TABLE `restapi_coverrequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restapi_coversong`
--

DROP TABLE IF EXISTS `restapi_coversong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restapi_coversong` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `voicePath` varchar(100) DEFAULT NULL,
  `coverPath` varchar(100) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL,
  `originalId_id` bigint(20) NOT NULL,
  `voiceId_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `restapi_coversong_originalId_id_8585a9b7_fk_restapi_o` (`originalId_id`),
  KEY `restapi_coversong_voiceId_id_299dff7f_fk_restapi_voicemodel_id` (`voiceId_id`),
  CONSTRAINT `restapi_coversong_originalId_id_8585a9b7_fk_restapi_o` FOREIGN KEY (`originalId_id`) REFERENCES `restapi_originsong` (`id`),
  CONSTRAINT `restapi_coversong_voiceId_id_299dff7f_fk_restapi_voicemodel_id` FOREIGN KEY (`voiceId_id`) REFERENCES `restapi_voicemodel` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restapi_coversong`
--

LOCK TABLES `restapi_coversong` WRITE;
/*!40000 ALTER TABLE `restapi_coversong` DISABLE KEYS */;
INSERT INTO `restapi_coversong` VALUES
(3,'without-MR/3.wav','cover-song/3.mp3','2023-10-04 04:51:15.995445',3,2),
(7,'without-MR/7.wav','cover-song/7.mp3','2023-10-04 07:15:03.621572',6,3),
(8,'without-MR/8.wav','cover-song/8.mp3','2023-10-04 07:48:40.294757',7,4),
(9,'without-MR/9.wav','cover-song/9.mp3','2023-10-04 07:49:56.399855',8,3),
(10,'without-MR/10.wav','cover-song/10.mp3','2023-10-04 08:01:13.773415',9,4),
(11,'without-MR/11.wav','cover-song/11.mp3','2023-10-05 00:38:28.000259',10,3),
(12,'without-MR/에픽_하이-04-One_Feat._지선.mp3','cover-song/에픽_하이-16-우산_Feat._윤하.mp3','2023-10-05 00:39:14.297083',11,3);
/*!40000 ALTER TABLE `restapi_coversong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restapi_originsong`
--

DROP TABLE IF EXISTS `restapi_originsong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restapi_originsong` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` longtext NOT NULL,
  `path` varchar(100) NOT NULL,
  `userId_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`) USING HASH,
  KEY `restapi_originsong_userId_id_824d0f5c_fk_accounts_user_id` (`userId_id`),
  CONSTRAINT `restapi_originsong_userId_id_824d0f5c_fk_accounts_user_id` FOREIGN KEY (`userId_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restapi_originsong`
--

LOCK TABLES `restapi_originsong` WRITE;
/*!40000 ALTER TABLE `restapi_originsong` DISABLE KEYS */;
INSERT INTO `restapi_originsong` VALUES
(3,'에픽 하이-16-우산 (Feat. 윤하)','origin/2/2023_10_04T045111.mp3',2),
(4,'윤하-03-비밀번호 486-6crq74hdkbbwudk6f4x3uyji5w','origin/3/2023_10_04T053420.mp3',3),
(5,'태연-11','origin/3/2023_10_04T055432.mp3',3),
(6,'시작_가호 (Gaho)','origin/3/2023_10_04T071454.mp3',3),
(7,'별보러가자','origin/4/2023_10_04T074835',4),
(8,'출발_김동률','origin/3/2023_10_04T074937.mp3',3),
(9,'윤하-비밀번호486','origin/3/2023_10_04T080001.mp3',3),
(10,'야행성_숀 (SHAUN)','origin/2/2023_10_05T003825.mp3',2),
(11,'엠씨더맥스-02-어디에도-pathos-192','origin/2/2023_10_05T003911.mp3',2),
(12,'낭만 고양이','origin/6/2023_10_05T032244.mp3',6);
/*!40000 ALTER TABLE `restapi_originsong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restapi_songlike`
--

DROP TABLE IF EXISTS `restapi_songlike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restapi_songlike` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `coverSongId_id` bigint(20) NOT NULL,
  `userId_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `restapi_songlike_coverSongId_id_435909ba_fk_restapi_coversong_id` (`coverSongId_id`),
  KEY `restapi_songlike_userId_id_48950312_fk_accounts_user_id` (`userId_id`),
  CONSTRAINT `restapi_songlike_coverSongId_id_435909ba_fk_restapi_coversong_id` FOREIGN KEY (`coverSongId_id`) REFERENCES `restapi_coversong` (`id`),
  CONSTRAINT `restapi_songlike_userId_id_48950312_fk_accounts_user_id` FOREIGN KEY (`userId_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restapi_songlike`
--

LOCK TABLES `restapi_songlike` WRITE;
/*!40000 ALTER TABLE `restapi_songlike` DISABLE KEYS */;
INSERT INTO `restapi_songlike` VALUES
(3,3,3),
(5,3,2),
(7,7,4),
(9,10,3),
(10,8,2),
(11,7,2),
(15,3,6),
(16,10,6);
/*!40000 ALTER TABLE `restapi_songlike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restapi_voicemodel`
--

DROP TABLE IF EXISTS `restapi_voicemodel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restapi_voicemodel` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `voicePath` varchar(100) DEFAULT NULL,
  `modelPath` varchar(100) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL,
  `activated` tinyint(1) NOT NULL,
  `userId_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `restapi_voicemodel_userId_id_22a85e37_fk_accounts_user_id` (`userId_id`),
  CONSTRAINT `restapi_voicemodel_userId_id_22a85e37_fk_accounts_user_id` FOREIGN KEY (`userId_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restapi_voicemodel`
--

LOCK TABLES `restapi_voicemodel` WRITE;
/*!40000 ALTER TABLE `restapi_voicemodel` DISABLE KEYS */;
INSERT INTO `restapi_voicemodel` VALUES
(2,'','model/2.tar.gz','2023-10-04 04:47:15.365227',1,2),
(3,'voice/2/2023_10_04T060952.mp4','model/3.tar.gz','2023-10-04 06:09:54.426025',1,2),
(4,'voice/4/2023_10_04T074322.mp4','model/4.tar.gz','2023-10-04 07:43:24.417536',1,4),
(6,'voice/2/2023_10_04T112644.mp4','','2023-10-04 11:26:46.671609',0,2),
(7,'voice/6/2023_10_04T135016.mp4','','2023-10-04 13:50:20.675377',0,6),
(8,'voice/3/2023_10_04T162218.mp4','','2023-10-04 16:22:23.320038',0,3);
/*!40000 ALTER TABLE `restapi_voicemodel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialaccount`
--

DROP TABLE IF EXISTS `socialaccount_socialaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `socialaccount_socialaccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider` varchar(200) NOT NULL,
  `uid` varchar(191) NOT NULL,
  `last_login` datetime(6) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `extra_data` longtext NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialaccount_provider_uid_fc810c6e_uniq` (`provider`,`uid`),
  KEY `socialaccount_socialaccount_user_id_8146e70c_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `socialaccount_socialaccount_user_id_8146e70c_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialaccount`
--

LOCK TABLES `socialaccount_socialaccount` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialaccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialapp`
--

DROP TABLE IF EXISTS `socialaccount_socialapp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `socialaccount_socialapp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) NOT NULL,
  `name` varchar(40) NOT NULL,
  `client_id` varchar(191) NOT NULL,
  `secret` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  `provider_id` varchar(200) NOT NULL,
  `settings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`settings`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialapp`
--

LOCK TABLES `socialaccount_socialapp` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialapp_sites`
--

DROP TABLE IF EXISTS `socialaccount_socialapp_sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `socialaccount_socialapp_sites` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `socialapp_id` int(11) NOT NULL,
  `site_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialapp_sites_socialapp_id_site_id_71a9a768_uniq` (`socialapp_id`,`site_id`),
  KEY `socialaccount_socialapp_sites_site_id_2579dee5_fk_django_site_id` (`site_id`),
  CONSTRAINT `socialaccount_social_socialapp_id_97fb6e7d_fk_socialacc` FOREIGN KEY (`socialapp_id`) REFERENCES `socialaccount_socialapp` (`id`),
  CONSTRAINT `socialaccount_socialapp_sites_site_id_2579dee5_fk_django_site_id` FOREIGN KEY (`site_id`) REFERENCES `django_site` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialapp_sites`
--

LOCK TABLES `socialaccount_socialapp_sites` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialtoken`
--

DROP TABLE IF EXISTS `socialaccount_socialtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `socialaccount_socialtoken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `token_secret` longtext NOT NULL,
  `expires_at` datetime(6) DEFAULT NULL,
  `account_id` int(11) NOT NULL,
  `app_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialtoken_app_id_account_id_fca4e0ac_uniq` (`app_id`,`account_id`),
  KEY `socialaccount_social_account_id_951f210e_fk_socialacc` (`account_id`),
  CONSTRAINT `socialaccount_social_account_id_951f210e_fk_socialacc` FOREIGN KEY (`account_id`) REFERENCES `socialaccount_socialaccount` (`id`),
  CONSTRAINT `socialaccount_social_app_id_636a42d7_fk_socialacc` FOREIGN KEY (`app_id`) REFERENCES `socialaccount_socialapp` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialtoken`
--

LOCK TABLES `socialaccount_socialtoken` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialtoken` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-05  4:41:10
