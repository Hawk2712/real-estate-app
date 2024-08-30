/*
SQLyog Community v13.1.8 (64 bit)
MySQL - 8.0.36 : Database - real_estate_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`real_estate_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `real_estate_db`;

/*Table structure for table `bookings` */

DROP TABLE IF EXISTS `bookings`;

CREATE TABLE `bookings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `owner_id` bigint unsigned DEFAULT NULL,
  `property_id` bigint unsigned DEFAULT NULL,
  `booking_cost` double DEFAULT NULL,
  `description` text,
  `status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `User` (`user_id`),
  KEY `Property` (`property_id`),
  KEY `Owner` (`owner_id`),
  CONSTRAINT `Owner` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Property` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `User` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `bookings` */

insert  into `bookings`(`id`,`user_id`,`owner_id`,`property_id`,`booking_cost`,`description`,`status`,`created_at`,`updated_at`) values 
(1,3,2,2,600000,'werrtherttrhrt','Rejected','2024-08-01 15:08:37','2024-08-02 15:29:01'),
(7,5,2,2,4000000,'weryhrtyhwr rthwrthrthn rthrthrth','Approved','2024-08-02 15:28:07','2024-08-02 15:29:01'),
(8,5,3,10,231523652346,'werhwerhwthwth','Pending','2024-08-02 15:32:17',NULL),
(9,5,3,3,231523652346,'65767878769788787878','Pending','2024-08-05 14:16:56',NULL);

/*Table structure for table `onsite_view` */

DROP TABLE IF EXISTS `onsite_view`;

CREATE TABLE `onsite_view` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `property_id` bigint unsigned DEFAULT NULL,
  `owner_id` bigint unsigned DEFAULT NULL,
  `date` date DEFAULT NULL,
  `description` text,
  `status` varchar(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `User to visit property` (`user_id`),
  KEY `Property to visit` (`property_id`),
  KEY `Property owner to contatc` (`owner_id`),
  CONSTRAINT `Property owner to contatc` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Property to visit` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `User to visit property` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `onsite_view` */

insert  into `onsite_view`(`id`,`user_id`,`property_id`,`owner_id`,`date`,`description`,`status`,`created_at`,`updated_at`) values 
(4,5,10,3,'2024-08-23','weryrthrtyhyth','Pending','2024-08-02 15:32:12','2024-08-03 11:19:29'),
(6,5,9,3,'2024-08-05','wserthrthtryhtyhth','Pending','2024-08-05 11:35:46',NULL);

/*Table structure for table `property` */

DROP TABLE IF EXISTS `property`;

CREATE TABLE `property` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `owner_id` bigint unsigned DEFAULT NULL,
  `name` varchar(200) NOT NULL,
  `type` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `sq_ft` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `area` text NOT NULL,
  `landmark` text NOT NULL,
  `address` text NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `map` text NOT NULL,
  `image` text NOT NULL,
  `description` text,
  `status` varchar(15) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Property owner` (`owner_id`),
  CONSTRAINT `Owner of the property` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `property` */

insert  into `property`(`id`,`owner_id`,`name`,`type`,`price`,`sq_ft`,`state`,`area`,`landmark`,`address`,`pincode`,`map`,`image`,`description`,`status`,`created_at`,`updated_at`) values 
(2,2,'Shanti Nivasa','Commercial',4000000,'3000','Karnataka','Banglore area','Near to the majestic circle','nearest to the bustand','574122','<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124414.0852007371!2d77.49044214361872!3d12.975679034868692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16056f420465%3A0xa95f996d1d0f8d92!2sNadaprabhu%20Kempegowda%20Metro%20Station%2C%20Majestic!5e0!3m2!1sen!2sin!4v1722315524981!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','uploads\\Property\\1722318689888.jpg','While the Majestic metro station name is the most commonly used by the people of Bangalore, the official name of this station is Nadaprabhu Kempegowda Station. This is the junction interchange between the Purple Line and the Green Line of the Namma or Bangalore Metro.','Sold','2024-07-30 11:21:29','2024-08-02 15:29:01'),
(3,3,'Dharma','Commercial',231523652346,'235235','CA','Manglore','Kadri park','1600 Amphitheatre Parkway\r\nApartment 1','94043','<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.014412849529!2d74.92858290000001!3d12.939594350000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba3564e175b9e09%3A0x480d14f5392a322d!2sGurupura%20Pete%2C%20Karnataka%20574145!5e0!3m2!1sen!2sin!4v1722399927522!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','uploads\\uploaded\\1722402658705.jpg','<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.014412849529!2d74.92858290000001!3d12.939594350000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba3564e175b9e09%3A0x480d14f5392a322d!2sGurupura%20Pete%2C%20Karnataka%20574145!5e0!3m2!1sen!2sin!4v1722399927522!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','Active','2024-07-31 10:40:58','2024-08-02 15:23:40'),
(4,3,'Dharma','Commercial',231523652346,'235235','CA','Manglore','Kadri park','1600 Amphitheatre Parkway\r\nApartment 1','94043','<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.014412849529!2d74.92858290000001!3d12.939594350000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba3564e175b9e09%3A0x480d14f5392a322d!2sGurupura%20Pete%2C%20Karnataka%20574145!5e0!3m2!1sen!2sin!4v1722399927522!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','uploads\\uploaded\\1722402852008.jpg','<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.014412849529!2d74.92858290000001!3d12.939594350000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba3564e175b9e09%3A0x480d14f5392a322d!2sGurupura%20Pete%2C%20Karnataka%20574145!5e0!3m2!1sen!2sin!4v1722399927522!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','Active','2024-07-31 10:44:12',NULL),
(5,3,'Dharma','Commercial',231523652346,'235235','CA','Manglore','Kadri park','1600 Amphitheatre Parkway\r\nApartment 1','94043','<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.014412849529!2d74.92858290000001!3d12.939594350000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba3564e175b9e09%3A0x480d14f5392a322d!2sGurupura%20Pete%2C%20Karnataka%20574145!5e0!3m2!1sen!2sin!4v1722399927522!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','uploads\\uploaded\\1722402893661.jpg','sdfhgthrtrthrth','Active','2024-07-31 10:44:53',NULL),
(6,3,'Karthik','Commercial',231523652346,'235235','CA','Manglore','Manglore landmark','1600 Amphitheatre Parkway\r\nApartment 1','94043','<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.014412849529!2d74.92858290000001!3d12.939594350000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba3564e175b9e09%3A0x480d14f5392a322d!2sGurupura%20Pete%2C%20Karnataka%20574145!5e0!3m2!1sen!2sin!4v1722399927522!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','uploads\\Property\\1722402948997.jpg','<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.014412849529!2d74.92858290000001!3d12.939594350000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba3564e175b9e09%3A0x480d14f5392a322d!2sGurupura%20Pete%2C%20Karnataka%20574145!5e0!3m2!1sen!2sin!4v1722399927522!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','Active','2024-07-31 10:45:49',NULL),
(7,3,'segr sfg','Agriculture',231523652346,'235345','CA','Manglore','Manglore landmark','1600 Amphitheatre Parkway\r\nApartment 1','94043','<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.014412849529!2d74.92858290000001!3d12.939594350000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba3564e175b9e09%3A0x480d14f5392a322d!2sGurupura%20Pete%2C%20Karnataka%20574145!5e0!3m2!1sen!2sin!4v1722399927522!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','uploads\\Property\\1722403233725.jpg','<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.014412849529!2d74.92858290000001!3d12.939594350000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba3564e175b9e09%3A0x480d14f5392a322d!2sGurupura%20Pete%2C%20Karnataka%20574145!5e0!3m2!1sen!2sin!4v1722399927522!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','Active','2024-07-31 10:50:33',NULL),
(8,3,'Karthik','Commercial',231523652346,'235345','Gujarat','Manglore','Manglore landmark','asfg errgerg','345646','<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.014412849529!2d74.92858290000001!3d12.939594350000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba3564e175b9e09%3A0x480d14f5392a322d!2sGurupura%20Pete%2C%20Karnataka%20574145!5e0!3m2!1sen!2sin!4v1722399927522!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','uploads\\Property\\1722403452314.jpg','sa<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.014412849529!2d74.92858290000001!3d12.939594350000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba3564e175b9e09%3A0x480d14f5392a322d!2sGurupura%20Pete%2C%20Karnataka%20574145!5e0!3m2!1sen!2sin!4v1722399927522!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','Active','2024-07-31 10:54:12',NULL),
(9,3,'Commerda bor','Commercial',231523652346,'235345','Goa','Manglore','Kadri park','weryrety','94043','<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.014412849529!2d74.92858290000001!3d12.939594350000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba3564e175b9e09%3A0x480d14f5392a322d!2sGurupura%20Pete%2C%20Karnataka%20574145!5e0!3m2!1sen!2sin!4v1722399927522!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','uploads\\Property\\1722405047890.jpg','<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.014412849529!2d74.92858290000001!3d12.939594350000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba3564e175b9e09%3A0x480d14f5392a322d!2sGurupura%20Pete%2C%20Karnataka%20574145!5e0!3m2!1sen!2sin!4v1722399927522!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','Active','2024-07-31 11:20:47',NULL),
(10,3,'Dharma','Agriculture',231523652346,'235345','Chhattisgarh','asdfgvsdjoj kakgokeok kokfboek','Manglore landmark','sdkfgkjjrgjokrjho owerpojthojrtherht','34534','<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15554.014412849529!2d74.92858290000001!3d12.939594350000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba3564e175b9e09%3A0x480d14f5392a322d!2sGurupura%20Pete%2C%20Karnataka%20574145!5e0!3m2!1sen!2sin!4v1722399927522!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','uploads\\Property\\1722412696246.jpg','In the scene object properties dialog, click the Dummy button to display the dummy dialog (the Dummy button only appears if the last selection is a dummy). The dialog displays the settings and parameters of the last selected dummy. If more than one dummy is selected, then some parameters can be copied from the last selected dummy to the other selected dummies (Apply to selection-buttons):','Active','2024-07-31 13:28:16','2024-08-05 13:35:35'),
(11,5,'segr sfg','Commercial',231523652346,'235345','Haryana','ewfwefwe','Kadri park','sdfjhytjtyjtyujtyu','34534','<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11850.796020112337!2d74.83901575!3d12.87605215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a4ff3c01221%3A0xd6b4fb11a43b29bc!2sMachali!5e1!3m2!1sen!2sin!4v1722665731663!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','uploads\\Property\\1722679058646.png','ergergwehtrwhrthrewhtyeeryjneytjytjetyjtyjty','Active','2024-08-03 11:46:51','2024-08-05 11:37:38'),
(12,2,'Smitha','Agriculture',231523652346,'46546','Gujarat','asdfgvsdjoj kakgokeok kokfboek','45yu65u56','34y254y43y655635u5u654u56u5u656u5u','353453','<iframe src=\"https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d189658.07931183727!2d74.81512538948158!3d12.815975743778187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x3ba4af1bbfeaad77%3A0x3cd11134f77a8b8!2sVamadapadavu%2C%20Karnataka!3m2!1d12.961082099999999!2d75.0947217!4m5!1s0x3ba361120b0924e1%3A0xcc720e914f83bf6e!2sUppala%2C%20Kerala!3m2!1d12.675956099999999!2d74.9062622!5e1!3m2!1sen!2sin!4v1722848233571!5m2!1sen!2sin\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>','uploads\\Property\\1722848252962.jpg','asgewrowgueroipuhowptpowruth[[rh','Active','2024-08-05 14:27:32',NULL);

/*Table structure for table `property_review` */

DROP TABLE IF EXISTS `property_review`;

CREATE TABLE `property_review` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `property_id` bigint unsigned DEFAULT NULL,
  `review_message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Reviewd User` (`user_id`),
  KEY `Reviewd Property` (`property_id`),
  CONSTRAINT `Reviewd Property` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Reviewd User` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `property_review` */

insert  into `property_review`(`id`,`user_id`,`property_id`,`review_message`,`created_at`,`updated_at`) values 
(1,5,2,'asoiegoirewopgioerigoierogioeirogier','2024-08-05 15:17:02',NULL),
(2,5,2,'iufuyfdyfyufyufuyfiufyi','2024-08-05 16:03:21',NULL);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_type` varchar(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `contact` varchar(12) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `image` text,
  `password` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`user_type`,`name`,`contact`,`email`,`address`,`image`,`password`,`is_active`,`created_at`,`updated_at`) values 
(1,'ADMIN','admin','1234567890','admin@example.com','admin address','uploads\\Users\\1722842275163.jpg','$2a$10$YHtZ/2Uy.8OqWLwHhHYOqe9Y0J.38R9IrU4Hfn8Snnq2z.JAdbAmy',1,'2024-07-29 17:27:32','2024-08-05 12:47:55'),
(2,'USER','Karan Sharma','7338357932','karan@gmail.com','karan address',NULL,'$2b$10$utp.l0A.k/ZBOWrUhN5V4O.mpFxgiUDOam6r1jRQ8b81/A31k91Ki',1,'2024-07-29 17:44:24','2024-08-05 12:46:35'),
(3,'USER','Karthik','7338357926','karthik@gmail.com','Karthik Address',NULL,'$2b$10$hjDOC1fEf49q26587DBU2.HAPLumB0VSlO4sIepbmzGVxv7ujesTG',1,'2024-07-30 15:06:04','2024-08-05 12:45:31'),
(4,'USER','Karthik','7338357925','karthikf@gmail.com','Karthik Address',NULL,'$2b$10$FZQQAU7TBFt2SifZOoi.0ODeJ4KZJAo4WT2KzJXBeVWcI2d7xPuC6',1,'2024-07-30 15:08:19','2024-08-05 12:45:28'),
(5,'USER','Smitha','9535063437','harsha@gmail.com','Aa;fgpoewrjgoj kweoprkghopwtkrh','uploads\\Users\\1722837925390.jpg','$2b$10$fJhMNedSVv46lmWEwf/shOa8Ev2El3BE6de1iSfU1Gu6utg2iWF2K',1,'2024-08-02 15:26:54','2024-08-05 14:15:41');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
