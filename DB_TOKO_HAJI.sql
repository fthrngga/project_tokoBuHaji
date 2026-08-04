-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.4.3 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for toko_haji_db
CREATE DATABASE IF NOT EXISTS `toko_haji_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `toko_haji_db`;

-- Dumping structure for table toko_haji_db.addresses
CREATE TABLE IF NOT EXISTS `addresses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `recipient_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `province` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `village` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_detail` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_primary` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `addresses_user_id_foreign` (`user_id`),
  CONSTRAINT `addresses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.addresses: ~8 rows (approximately)
INSERT INTO `addresses` (`id`, `user_id`, `label`, `recipient_name`, `phone_number`, `province`, `city`, `district`, `village`, `address_detail`, `postal_code`, `is_primary`, `created_at`, `updated_at`) VALUES
	(1, 12, 'Rumah', 'Jeni', '082345678976', 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'LANGKAT', 'Bagan Jaya', '28771', 0, '2026-06-26 05:31:03', '2026-06-26 05:31:03'),
	(2, 62, 'Rumah', 'INO', '082345367765', 'RIAU', 'KABUPATEN S I A K', 'SABAK AUH', 'REMPAK', 'Desa Rempak, Jalan Raja Kecik', '28685', 0, '2026-07-16 07:58:32', '2026-07-16 07:58:32'),
	(3, 64, 'Rumah', 'Marlis', '082345675432', 'RIAU', 'KABUPATEN S I A K', 'SABAK AUH', 'BANDAR SUNGAI', 'Pasar Bandar Sungai', '28664', 0, '2026-07-20 04:52:04', '2026-07-20 04:52:04'),
	(4, 15, 'Rumah', 'Irma', '087761370104', 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'SEPOTONG', 'Ngacceh, Parit 5', '28771', 0, '2026-07-20 07:31:20', '2026-07-20 07:31:20'),
	(5, 13, 'Rumah', 'Juwita', '081356213451', 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'MUARA DUA', 'Desa Muara 2', '28771', 0, '2026-07-20 08:28:35', '2026-07-20 08:28:35'),
	(6, 17, 'Rumah', 'Yati', '082327658970', 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'SEPOTONG', 'Ngacceh', '28771', 0, '2026-07-20 09:02:57', '2026-07-20 09:02:57'),
	(7, 18, 'Rumah', 'Adi Ketua', '082344356789', 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'LANGKAT', 'bagan jaya, Desa Langkat', '28771', 0, '2026-07-21 05:58:50', '2026-07-21 05:58:50'),
	(8, 19, 'Rumah', 'Wiji', '082260739943', 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'SEPOTONG', 'Parit 4', '28771', 0, '2026-07-21 06:12:09', '2026-07-21 06:12:09'),
	(9, 20, 'Rumah', 'Sukardi', '082237684567', 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'SEPOTONG', 'Ngacceh', '28771', 0, '2026-07-21 08:21:24', '2026-07-21 08:21:24'),
	(10, 29, 'Rumah', 'Mistar', '082397543328', 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'SUMBER JAYA', 'Jl. ATR, Parit Baru', '28771', 0, '2026-07-21 09:05:28', '2026-07-21 09:05:28'),
	(11, 28, 'Rumah', 'Radi', '082399823678', 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'TANJUNG DAMAI', 'Absen', '28771', 0, '2026-07-21 09:43:43', '2026-07-21 09:43:43'),
	(12, 27, 'Rumah', 'Santi Maris', '081378043457', 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'TANJUNG DAMAI', 'Absen', '28771', 0, '2026-07-22 06:03:13', '2026-07-22 06:03:13'),
	(13, 25, 'Rumah', 'Rika', '082290210211', 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'LUBUK GAUNG', 'Sungai Manggis', '28771', 0, '2026-07-22 06:24:40', '2026-07-22 06:24:40'),
	(14, 26, 'Rumah', 'Wartiningsi', '081324567345', 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'SUMBER JAYA', 'Siak 4', '28771', 0, '2026-07-22 07:21:42', '2026-07-22 07:21:42'),
	(15, 24, 'Rumah', 'Hadiono', '081378043457', 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'TANJUNG DAMAI', 'Absen Laut', '28771', 0, '2026-07-23 11:15:46', '2026-07-23 11:15:46');

-- Dumping structure for table toko_haji_db.cache
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.cache: ~0 rows (approximately)

-- Dumping structure for table toko_haji_db.cache_locks
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.cache_locks: ~0 rows (approximately)

-- Dumping structure for table toko_haji_db.carts
CREATE TABLE IF NOT EXISTS `carts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `carts_user_id_foreign` (`user_id`),
  CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.carts: ~14 rows (approximately)
INSERT INTO `carts` (`id`, `user_id`, `created_at`, `updated_at`) VALUES
	(1, 12, '2026-06-26 05:29:19', '2026-06-26 05:29:19'),
	(2, 62, '2026-07-16 07:57:15', '2026-07-16 07:57:15'),
	(3, 64, '2026-07-20 04:50:17', '2026-07-20 04:50:17'),
	(4, 15, '2026-07-20 07:29:49', '2026-07-20 07:29:49'),
	(5, 13, '2026-07-20 08:27:13', '2026-07-20 08:27:13'),
	(6, 17, '2026-07-20 09:01:55', '2026-07-20 09:01:55'),
	(7, 18, '2026-07-21 05:51:43', '2026-07-21 05:51:43'),
	(8, 19, '2026-07-21 06:10:53', '2026-07-21 06:10:53'),
	(9, 20, '2026-07-21 08:23:02', '2026-07-21 08:23:02'),
	(10, 29, '2026-07-21 09:02:37', '2026-07-21 09:02:37'),
	(11, 28, '2026-07-21 09:42:29', '2026-07-21 09:42:29'),
	(12, 27, '2026-07-22 06:05:40', '2026-07-22 06:05:40'),
	(13, 25, '2026-07-22 06:25:25', '2026-07-22 06:25:25'),
	(14, 26, '2026-07-22 06:55:53', '2026-07-22 06:55:53'),
	(15, 24, '2026-07-23 12:28:56', '2026-07-23 12:28:56');

-- Dumping structure for table toko_haji_db.cart_items
CREATE TABLE IF NOT EXISTS `cart_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `product_variant_id` bigint unsigned DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `selected_options` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cart_items_cart_id_product_id_unique` (`cart_id`,`product_id`),
  KEY `cart_items_product_id_foreign` (`product_id`),
  KEY `cart_items_product_variant_id_foreign` (`product_variant_id`),
  CONSTRAINT `cart_items_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_product_variant_id_foreign` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.cart_items: ~0 rows (approximately)

-- Dumping structure for table toko_haji_db.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`),
  KEY `categories_parent_id_foreign` (`parent_id`),
  CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.categories: ~6 rows (approximately)
INSERT INTO `categories` (`id`, `parent_id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
	(1, NULL, 'Elektronik', 'elektronik', '2026-06-23 01:44:08', '2026-06-23 01:44:08'),
	(2, NULL, 'Mebel', 'mebel', '2026-06-23 01:44:08', '2026-06-23 01:44:08'),
	(3, 1, 'Peralatan Dapur', 'peralatan-dapur', '2026-06-23 01:44:08', '2026-06-23 01:44:08'),
	(4, 1, 'Lampu & Pencahayaan', 'lampu-pencahayaan', '2026-06-23 01:44:08', '2026-06-23 01:44:08'),
	(5, 2, 'Dekorasi Rumah', 'dekorasi-rumah', '2026-06-23 01:44:08', '2026-06-23 01:44:08'),
	(6, 2, 'Furnitur Ruang Tamu', 'furnitur-ruang-tamu', '2026-06-23 01:44:08', '2026-06-23 01:44:08');

-- Dumping structure for table toko_haji_db.customers
CREATE TABLE IF NOT EXISTS `customers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `province` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customers_user_id_foreign` (`user_id`),
  CONSTRAINT `customers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.customers: ~45 rows (approximately)
INSERT INTO `customers` (`id`, `user_id`, `phone_number`, `address`, `city`, `province`, `created_at`, `updated_at`) VALUES
	(1, 12, NULL, 'Bagan Jaya, Desan Langkat, SIak Kecil', 'Bengkalis', 'Riau', '2026-06-22 23:11:10', '2026-06-22 23:11:10'),
	(2, 13, NULL, 'Desa Muara Dua', 'Bengkalis', 'Riau', '2026-06-22 23:14:20', '2026-06-22 23:14:20'),
	(3, 14, NULL, 'Absen, Desa Tanjung Damai', 'Bengkalis', 'Riau', '2026-06-22 23:16:06', '2026-06-22 23:16:06'),
	(4, 15, NULL, 'Ngacceh Parit 5, Desa Sepotong', 'Bengkalis', 'Riau', '2026-06-22 23:17:18', '2026-06-22 23:17:18'),
	(5, 16, NULL, 'Lubuk Bangku, Desa Langkat', NULL, 'Riau', '2026-06-22 23:18:33', '2026-06-22 23:18:33'),
	(6, 17, NULL, 'Ngacceh Parit 5, Desa Sepotong', 'Bengkalis', 'Riau', '2026-06-22 23:20:15', '2026-06-22 23:20:15'),
	(7, 18, NULL, 'Desa Langkat', 'Bengkalis', 'Riau', '2026-06-22 23:21:29', '2026-06-22 23:21:29'),
	(8, 19, NULL, 'Parit 4, Desa Sepotong', 'Bengkalis', 'Riau', '2026-06-22 23:22:20', '2026-06-22 23:22:20'),
	(9, 20, NULL, 'Ngacceh, Desa Sepotong', 'Bengkalis', 'Riau', '2026-06-22 23:24:06', '2026-06-22 23:24:06'),
	(10, 21, NULL, 'Absen, Desa Tanjung Damai', 'Bengkalis', 'Riau', '2026-06-22 23:27:09', '2026-06-22 23:27:09'),
	(11, 22, NULL, 'Absen, Desa Tanjung Damai', 'Bengkalis', 'Riau', '2026-06-22 23:29:06', '2026-06-22 23:29:06'),
	(12, 23, NULL, 'Parit Baru', NULL, NULL, '2026-06-22 23:33:30', '2026-06-22 23:33:30'),
	(13, 24, NULL, 'Absen Laut, Desa Tanjung Damai', 'Bengkalis', 'Riau', '2026-06-22 23:34:35', '2026-06-22 23:34:35'),
	(14, 25, NULL, 'Desa Sungai Manggis', 'Bengkalis', 'Riau', '2026-06-22 23:35:18', '2026-06-22 23:35:18'),
	(15, 26, NULL, NULL, 'Bengkalis', 'Riau', '2026-06-22 23:37:16', '2026-06-22 23:37:16'),
	(16, 27, NULL, 'Absen, Desa Tanjung Damai', 'Bengkalis', 'Riau', '2026-06-22 23:38:25', '2026-06-22 23:38:25'),
	(17, 28, NULL, 'Absen, Desa Tanjung Damai', 'Bengkalis', 'Riau', '2026-06-22 23:39:45', '2026-06-22 23:39:45'),
	(18, 29, NULL, 'Parit Baru', 'Bengkalis', 'Riau', '2026-06-22 23:41:22', '2026-06-22 23:41:22'),
	(19, 30, NULL, 'Absen Desa Tanjung Damai', 'Bengkalis', 'Riau', '2026-06-22 23:47:42', '2026-06-22 23:47:42'),
	(20, 31, NULL, 'Absen, Desa Tanjung Damai', 'Bengkalis', 'Riau', '2026-06-22 23:48:34', '2026-06-22 23:48:34'),
	(21, 32, '082298582763', NULL, 'Bengkalis', 'Riau', '2026-06-22 23:50:21', '2026-06-22 23:50:21'),
	(22, 33, NULL, 'Absen, Desa Tanjung Damai', 'Bengkalis', 'Riau', '2026-06-22 23:52:09', '2026-06-22 23:52:09'),
	(23, 34, NULL, 'Absen, Desa Tanjung Damai', 'Bengkalis', 'Riau', '2026-06-22 23:53:26', '2026-06-22 23:53:26'),
	(24, 35, NULL, 'Km 17, Desa Lubuk Garam', 'Bengkalis', 'Riau', '2026-06-22 23:54:16', '2026-06-22 23:54:16'),
	(25, 36, NULL, 'Parit Baru', 'Bengkalis', 'Riau', '2026-06-22 23:55:28', '2026-06-22 23:55:28'),
	(26, 37, NULL, 'Parit Baru', 'Bengkalis', 'Riau', '2026-06-22 23:56:37', '2026-06-22 23:56:37'),
	(27, 38, NULL, 'Absen, Desa Tanjung Damai', 'Bengkalis', 'Riau', '2026-06-22 23:58:41', '2026-06-22 23:58:41'),
	(28, 39, NULL, 'Km 17, Desa Lubuk Garam', 'Bengkalis', 'Riau', '2026-06-22 23:59:41', '2026-06-22 23:59:41'),
	(29, 40, NULL, 'Km 16, Desa Lubuk Garam', 'Bengkalis', 'Riau', '2026-06-23 00:00:41', '2026-06-23 00:00:41'),
	(30, 41, NULL, 'Jl. Suka Rejo, Desa Koto Raja', 'Bengkalis', 'Riau', '2026-06-23 00:03:11', '2026-06-23 00:03:11'),
	(31, 42, NULL, NULL, 'Bengkalis', 'Riau', '2026-06-23 00:03:56', '2026-06-23 00:03:56'),
	(32, 43, NULL, 'Parit 1 Dalam, Desa Koto Raja', 'Bengkalis', 'Riau', '2026-06-23 00:05:23', '2026-06-23 00:05:23'),
	(33, 44, NULL, 'Desa Lubuk Garam', 'Bengkalis', 'Riau', '2026-06-23 00:06:09', '2026-06-23 00:06:09'),
	(34, 45, NULL, 'Parit 2, Desa Koto Raja', 'Bengkalis', 'Riau', '2026-06-23 01:08:39', '2026-06-23 01:08:39'),
	(35, 46, NULL, 'Parit 2, Desa Koto Raja', 'Bengkalis', 'Riau', '2026-06-23 01:09:24', '2026-06-23 01:09:24'),
	(36, 47, NULL, 'Jl. Suka Rejo, Desa Koto Raja', 'Bengkalis', 'Riau', '2026-06-23 01:12:57', '2026-06-23 01:12:57'),
	(37, 48, NULL, 'Kelurahan Sungai Pakning, Kecamatan Bukit Batu', 'Bengkalis', 'Riau', '2026-06-23 01:14:58', '2026-06-23 01:14:58'),
	(38, 49, NULL, 'Desa Sungai Siput', 'Bengkalis', 'Riau', '2026-06-23 01:15:56', '2026-06-23 01:15:56'),
	(39, 50, NULL, 'Desa Sungai Manggis', 'Bengkalis', 'Riau', '2026-06-23 01:21:05', '2026-06-23 01:21:05'),
	(40, 51, NULL, 'Desa Lubuk Gaung', 'Bengkalis', 'Riau', '2026-06-23 01:22:21', '2026-06-23 01:22:21'),
	(41, 52, NULL, 'Desa Sungai Manggis', 'Bengkalis', 'Riau', '2026-06-23 01:26:05', '2026-06-23 01:26:05'),
	(42, 53, '082285965029', 'Lubuk Gaung', 'Bengkalis', 'Riau', '2026-06-23 01:27:11', '2026-06-23 01:27:11'),
	(43, 54, '082218460609', 'Desa Sungai Manggis', 'Bengkalis', 'Riau', '2026-06-23 01:28:07', '2026-06-23 01:28:07'),
	(44, 55, '085361183620', 'Desa Sungai Manggis', 'Bengkalis', 'Riau', '2026-06-23 01:31:00', '2026-06-23 01:31:00'),
	(45, 56, NULL, 'Desa Lubuk Gaung', 'Bengkalis', 'Riau', '2026-06-23 01:31:51', '2026-06-23 01:31:51'),
	(46, 57, NULL, 'Desa Sungai Manggis', 'Bengkalis', 'Riau', '2026-06-23 01:32:56', '2026-06-23 01:32:56'),
	(47, 58, NULL, 'Desa Sungai Manggis', 'Bengkalis', 'Riau', '2026-06-23 01:33:33', '2026-06-23 01:33:33'),
	(48, 59, NULL, 'Desa Sungai Manggis', 'Bengkalis', 'Riau', '2026-06-23 01:34:23', '2026-06-23 01:34:23'),
	(49, 60, NULL, 'Desa Sungai Manggis', 'Bengkalis', 'Riau', '2026-06-23 01:35:09', '2026-06-23 01:35:09'),
	(50, 61, '087780271997', 'Desa Sungai Manggis', 'Bengkalis', 'Riau', '2026-06-23 01:36:40', '2026-06-23 01:36:40'),
	(51, 62, NULL, 'Desa Rempak', 'Siak', 'Riau', '2026-07-16 07:32:10', '2026-07-16 07:32:10'),
	(52, 63, NULL, 'Sungai Bayam, Desa Laksamana', 'Siak', 'Riau', '2026-07-16 10:48:43', '2026-07-16 10:48:43'),
	(53, 64, NULL, NULL, NULL, NULL, '2026-07-20 04:50:00', '2026-07-20 04:50:00'),
	(54, 65, '082173696540', 'Paket K, Desa Bandar Jaya', 'Bengkalis', 'Riau', '2025-11-12 06:48:21', '2025-11-12 06:48:21');

-- Dumping structure for table toko_haji_db.defective_products
CREATE TABLE IF NOT EXISTS `defective_products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `product_variant_id` bigint unsigned DEFAULT NULL,
  `source_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source_id` bigint unsigned DEFAULT NULL,
  `quantity` int NOT NULL,
  `status` enum('in_warehouse','sent_to_agent','repaired','written_off','sold') COLLATE utf8mb4_unicode_ci DEFAULT 'in_warehouse',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `defective_products_product_id_foreign` (`product_id`),
  KEY `defective_products_product_variant_id_foreign` (`product_variant_id`),
  KEY `defective_products_source_type_source_id_index` (`source_type`,`source_id`),
  CONSTRAINT `defective_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `defective_products_product_variant_id_foreign` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.defective_products: ~0 rows (approximately)

-- Dumping structure for table toko_haji_db.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.failed_jobs: ~0 rows (approximately)

-- Dumping structure for table toko_haji_db.financial_transactions
CREATE TABLE IF NOT EXISTS `financial_transactions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `transaction_date` date NOT NULL,
  `type` enum('income','expense') COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` enum('cash_sale','down_payment','installment','restock','operational','salary','other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `payment_method` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `related_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `related_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `financial_transactions_related_type_related_id_index` (`related_type`,`related_id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.financial_transactions: ~112 rows (approximately)
INSERT INTO `financial_transactions` (`id`, `transaction_date`, `type`, `category`, `amount`, `description`, `payment_method`, `related_type`, `related_id`, `created_at`, `updated_at`) VALUES
	(1, '2026-03-10', 'expense', 'restock', 2340000.00, 'Biaya Restock untuk 1 unit Mesin Cuci - Sharp  - 90', 'transfer', 'App\\Models\\RestockRequest', 1, '2026-03-10 05:27:45', '2026-06-26 05:27:45'),
	(2, '2026-03-18', 'income', 'installment', 386100.00, 'Pembayaran Angsuran ke-1 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 1, '2026-03-18 05:33:04', '2026-06-26 05:33:04'),
	(3, '2026-04-18', 'income', 'installment', 386100.00, 'Pembayaran Angsuran ke-2 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 2, '2026-04-18 05:46:40', '2026-06-26 05:46:40'),
	(4, '2026-05-18', 'income', 'installment', 386100.00, 'Pembayaran Angsuran ke-3 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 3, '2026-05-18 05:47:05', '2026-06-26 05:47:05'),
	(5, '2026-03-16', 'expense', 'restock', 3100000.00, 'Biaya Restock untuk 1 unit Kulkas Sharp (Varian: 237 Mg)', 'transfer', 'App\\Models\\RestockRequest', 2, '2026-07-01 00:44:04', '2026-07-01 00:44:04'),
	(6, '2026-03-17', 'expense', 'restock', 2050000.00, 'Biaya Restock untuk 1 unit Kulkas Sharp (Varian: 187 Mg)', 'transfer', 'App\\Models\\RestockRequest', 3, '2026-07-01 00:50:53', '2026-07-01 00:50:53'),
	(7, '2026-03-17', 'expense', 'restock', 3000000.00, 'Biaya Restock untuk 1 unit Kulkas Sharp (Varian: 236 Nm)', 'transfer', 'App\\Models\\RestockRequest', 4, '2026-07-01 00:53:37', '2026-07-01 00:53:37'),
	(8, '2026-03-19', 'expense', 'restock', 1750000.00, 'Biaya Restock untuk 1 unit Kulkas Sharp (Varian: 167 Mg)', 'transfer', 'App\\Models\\RestockRequest', 5, '2026-07-01 00:54:52', '2026-07-01 00:54:52'),
	(9, '2026-03-29', 'expense', 'restock', 2100000.00, 'Biaya Restock untuk 1 unit Kulkas Sharp (Varian: 197 Mg)', 'transfer', 'App\\Models\\RestockRequest', 6, '2026-07-01 00:55:39', '2026-07-01 00:55:39'),
	(10, '2026-04-02', 'expense', 'restock', 3100000.00, 'Biaya Restock untuk 1 unit Kulkas Sharp (Varian: 237 Mg)', 'transfer', 'App\\Models\\RestockRequest', 7, '2026-07-01 00:58:02', '2026-07-01 00:58:02'),
	(11, '2026-04-02', 'expense', 'restock', 2050000.00, 'Biaya Restock untuk 1 unit Kulkas Sharp (Varian: 185 Mg)', 'transfer', 'App\\Models\\RestockRequest', 8, '2026-07-01 00:58:50', '2026-07-01 00:58:50'),
	(12, '2026-04-05', 'expense', 'restock', 4244000.00, 'Biaya Restock untuk 2 unit Kulkas Sharp (Varian: 187 Mg)', 'transfer', 'App\\Models\\RestockRequest', 9, '2026-07-01 00:59:54', '2026-07-01 00:59:54'),
	(13, '2026-03-01', 'expense', 'salary', 3500000.00, 'Gaji Ider Bulan 2', 'transfer', NULL, NULL, '2026-03-01 14:09:35', '2026-03-01 14:09:35'),
	(14, '2025-10-15', 'expense', 'restock', 2910000.00, 'Biaya Restock untuk 1 unit Lemari Kain Plat Besi', 'transfer', 'App\\Models\\RestockRequest', 11, '2025-10-15 07:54:27', '2025-10-15 07:54:27'),
	(15, '2025-10-30', 'income', 'installment', 480150.00, 'Pembayaran Angsuran ke-1 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 5, '2026-07-16 08:00:20', '2026-07-16 08:00:20'),
	(16, '2025-11-30', 'income', 'installment', 480150.00, 'Pembayaran Angsuran ke-2 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 6, '2026-07-16 08:11:17', '2026-07-16 08:11:17'),
	(17, '2025-12-30', 'income', 'installment', 480150.00, 'Pembayaran Angsuran Manual (Order #2) - Pembayaran Angsuran ke-3', 'tunai', 'App\\Models\\PaymentLog', 7, '2026-07-16 08:11:50', '2026-07-16 08:11:50'),
	(18, '2026-01-30', 'income', 'installment', 480150.00, 'Pembayaran Angsuran Manual (Order #2) - Pembayaran Angsuran ke-4', 'tunai', 'App\\Models\\PaymentLog', 8, '2026-07-16 08:11:55', '2026-07-16 08:11:55'),
	(19, '2026-02-28', 'income', 'installment', 480150.00, 'Pembayaran Angsuran Manual (Order #2) - Pembayaran Angsuran ke-5', 'tunai', 'App\\Models\\PaymentLog', 9, '2026-07-16 08:12:03', '2026-07-16 08:12:03'),
	(20, '2026-03-30', 'income', 'installment', 480150.00, 'Pembayaran Angsuran Manual (Order #2) - Pembayaran Angsuran ke-6', 'tunai', 'App\\Models\\PaymentLog', 10, '2026-07-16 08:12:15', '2026-07-16 08:12:15'),
	(21, '2026-04-29', 'income', 'installment', 480150.00, 'Pembayaran Angsuran Manual (Order #2) - Pembayaran Angsuran ke-7', 'tunai', 'App\\Models\\PaymentLog', 11, '2026-07-16 08:12:22', '2026-07-16 08:12:22'),
	(22, '2026-06-30', 'income', 'installment', 480150.00, 'Pembayaran Angsuran Manual (Order #2) - Pembayaran Angsuran ke-8', 'tunai', 'App\\Models\\PaymentLog', 12, '2026-07-16 08:12:28', '2026-07-16 08:12:28'),
	(23, '2026-07-16', 'income', 'installment', 386100.00, 'Pembayaran Angsuran Manual (Order #1) - Pembayaran Angsuran ke-4', 'tunai', 'App\\Models\\PaymentLog', 13, '2026-07-16 10:45:43', '2026-07-16 10:45:43'),
	(24, '2025-10-10', 'expense', 'restock', 2500000.00, 'Biaya Restock untuk 1 unit Smart Phone Realme C55', 'transfer', 'App\\Models\\RestockRequest', 12, '2025-10-10 10:53:51', '2025-10-10 10:53:51'),
	(25, '2025-10-10', 'income', 'installment', 412500.00, 'Pembayaran Angsuran Manual (Order #3) - Pembayaran Angsuran ke-1', 'tunai', 'App\\Models\\PaymentLog', 14, '2026-07-16 10:58:28', '2026-07-16 10:58:28'),
	(26, '2025-11-10', 'income', 'installment', 412500.00, 'Pembayaran Angsuran Manual (Order #3) - Pembayaran Angsuran ke-2', 'tunai', 'App\\Models\\PaymentLog', 15, '2026-07-16 10:58:32', '2026-07-16 10:58:32'),
	(27, '2025-12-10', 'income', 'installment', 412500.00, 'Pembayaran Angsuran Manual (Order #3) - Pembayaran Angsuran ke-3', 'tunai', 'App\\Models\\PaymentLog', 16, '2026-07-16 10:58:37', '2026-07-16 10:58:37'),
	(28, '2026-01-10', 'income', 'installment', 412500.00, 'Pembayaran Angsuran Manual (Order #3) - Pembayaran Angsuran ke-4', 'tunai', 'App\\Models\\PaymentLog', 17, '2026-07-16 10:58:41', '2026-07-16 10:58:41'),
	(29, '2026-02-10', 'income', 'installment', 412500.00, 'Pembayaran Angsuran Manual (Order #3) - Pembayaran Angsuran ke-5', 'tunai', 'App\\Models\\PaymentLog', 18, '2026-07-16 10:58:45', '2026-07-16 10:58:45'),
	(30, '2026-03-10', 'income', 'installment', 412500.00, 'Pembayaran Angsuran Manual (Order #3) - Pembayaran Angsuran ke-6', 'tunai', 'App\\Models\\PaymentLog', 19, '2026-07-16 10:58:50', '2026-07-16 10:58:50'),
	(31, '2026-04-10', 'income', 'installment', 412500.00, 'Pembayaran Angsuran Manual (Order #3) - Pembayaran Angsuran ke-7', 'tunai', 'App\\Models\\PaymentLog', 20, '2026-07-16 10:59:13', '2026-07-16 10:59:13'),
	(32, '2026-05-10', 'income', 'installment', 412500.00, 'Pembayaran Angsuran ke-8 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 21, '2026-05-10 11:06:23', '2026-07-16 11:06:23'),
	(33, '2026-06-10', 'income', 'installment', 412500.00, 'Pembayaran Angsuran ke-9 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 22, '2026-06-10 11:07:06', '2026-07-16 11:07:06'),
	(34, '2026-07-10', 'income', 'installment', 412500.00, 'Pembayaran Angsuran ke-10 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 23, '2026-07-10 11:07:36', '2026-07-16 11:07:36'),
	(35, '2025-10-20', 'expense', 'restock', 2550000.00, 'Biaya Restock untuk 1 unit Lemari Sudut', 'transfer', 'App\\Models\\RestockRequest', 13, '2025-10-20 04:45:54', '2026-07-20 04:45:54'),
	(36, '2025-01-15', 'expense', 'restock', 5455000.00, 'Biaya Restock untuk 1 unit Lemari Hias Singapur', 'transfer', 'App\\Models\\RestockRequest', 15, '2025-10-15 04:46:19', '2026-07-20 04:46:19'),
	(37, '2025-11-30', 'income', 'installment', 1320900.00, 'Pembayaran Angsuran ke-1 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 24, '2025-11-30 04:53:54', '2025-10-30 04:53:54'),
	(38, '2025-12-30', 'income', 'installment', 1320900.00, 'Pembayaran Angsuran Manual (Order #4) - Pembayaran Angsuran ke-2', 'tunai', 'App\\Models\\PaymentLog', 25, '2025-12-30 04:59:03', '2025-11-30 04:59:03'),
	(39, '2026-01-30', 'income', 'installment', 1320900.00, 'Pembayaran Angsuran Manual (Order #4) - Pembayaran Angsuran ke-3', 'tunai', 'App\\Models\\PaymentLog', 26, '2026-01-30 04:59:11', '2025-12-30 04:59:11'),
	(40, '2026-02-28', 'income', 'installment', 1320900.00, 'Pembayaran Angsuran Manual (Order #4) - Pembayaran Angsuran ke-4', 'tunai', 'App\\Models\\PaymentLog', 27, '2026-02-28 05:06:24', '2026-07-20 05:06:24'),
	(41, '2026-03-30', 'income', 'installment', 1320900.00, 'Pembayaran Angsuran ke-5 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 28, '2026-03-30 05:09:26', '2026-07-20 05:09:26'),
	(42, '2026-04-30', 'income', 'installment', 1320900.00, 'Pembayaran Angsuran ke-6 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 29, '2026-04-30 05:09:54', '2026-07-20 05:09:54'),
	(43, '2026-05-30', 'income', 'installment', 1320900.00, 'Pembayaran Angsuran ke-7 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 30, '2026-05-30 05:10:26', '2026-07-20 05:10:26'),
	(44, '2026-06-30', 'income', 'installment', 1320900.00, 'Pembayaran Angsuran ke-8 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 31, '2026-06-30 05:12:00', '2026-07-20 05:12:00'),
	(45, '2025-10-26', 'expense', 'restock', 2305000.00, 'Biaya Restock untuk 1 unit Lemari Kain Plat Besi 1.2', 'transfer', 'App\\Models\\RestockRequest', 16, '2026-07-20 06:37:26', '2026-07-20 06:37:26'),
	(46, '2025-10-23', 'expense', 'restock', 1760000.00, 'Biaya Restock untuk 1 unit Matras Kangoroo Chiko (Varian: 180x200 - Union)', 'transfer', 'App\\Models\\RestockRequest', 17, '2026-07-20 06:37:30', '2026-07-20 06:37:30'),
	(47, '2025-11-12', 'income', 'installment', 670800.00, 'Pembayaran Angsuran Manual (Order #5) - Pembayaran Angsuran ke-1', 'tunai', 'App\\Models\\PaymentLog', 32, '2025-11-12 06:53:35', '2025-11-12 06:53:35'),
	(48, '2025-12-12', 'income', 'installment', 670800.00, 'Pembayaran Angsuran Manual (Order #5) - Pembayaran Angsuran ke-2', 'tunai', 'App\\Models\\PaymentLog', 33, '2026-07-20 06:59:27', '2026-07-20 06:59:27'),
	(49, '2026-01-12', 'income', 'installment', 670800.00, 'Pembayaran Angsuran Manual (Order #5) - Pembayaran Angsuran ke-3', 'tunai', 'App\\Models\\PaymentLog', 34, '2026-07-20 06:59:32', '2026-07-20 06:59:32'),
	(50, '2026-02-12', 'income', 'installment', 670800.00, 'Pembayaran Angsuran Manual (Order #5) - Pembayaran Angsuran ke-4', 'tunai', 'App\\Models\\PaymentLog', 35, '2026-07-20 06:59:44', '2026-07-20 06:59:44'),
	(51, '2026-03-12', 'income', 'installment', 670800.00, 'Pembayaran Angsuran Manual (Order #5) - Pembayaran Angsuran ke-5', 'transfer', 'App\\Models\\PaymentLog', 36, '2026-07-20 07:00:04', '2026-07-20 07:00:04'),
	(52, '2026-04-13', 'income', 'installment', 670800.00, 'Pembayaran Angsuran Manual (Order #5) - Pembayaran Angsuran ke-6', 'transfer', 'App\\Models\\PaymentLog', 37, '2026-07-20 07:00:11', '2026-07-20 07:00:11'),
	(53, '2026-05-12', 'income', 'installment', 670800.00, 'Pembayaran Angsuran Manual (Order #5) - Pembayaran Angsuran ke-7', 'transfer', 'App\\Models\\PaymentLog', 38, '2026-05-12 08:21:33', '2026-02-15 08:21:33'),
	(54, '2026-06-12', 'income', 'installment', 670800.00, 'Pembayaran Angsuran ke-8 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 39, '2026-07-20 07:05:07', '2026-07-20 07:05:07'),
	(55, '2026-07-12', 'income', 'installment', 670800.00, 'Pembayaran Angsuran ke-9 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 40, '2026-07-20 07:06:00', '2026-07-20 07:06:00'),
	(56, '2026-04-20', 'expense', 'restock', 2730000.00, 'Biaya Restock untuk 1 unit Mesin Cuci - LG - 905', 'transfer', 'App\\Models\\RestockRequest', 10, '2026-07-20 07:26:07', '2026-07-20 07:26:07'),
	(57, '2026-05-02', 'income', 'installment', 450450.00, 'Pembayaran Angsuran ke-1 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 41, '2026-07-20 07:41:03', '2026-07-20 07:41:03'),
	(58, '2026-06-02', 'income', 'installment', 450450.00, 'Pembayaran Angsuran ke-2 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 42, '2026-07-20 07:53:12', '2026-07-20 07:53:12'),
	(59, '2026-07-02', 'income', 'installment', 450450.00, 'Pembayaran Angsuran ke-3 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 43, '2026-07-20 07:54:17', '2026-07-20 07:54:17'),
	(60, '2026-02-15', 'expense', 'restock', 2680000.00, 'Biaya Restock untuk 1 unit Lemari Kaca Piring 4 Pintu 1.5', 'transfer', 'App\\Models\\RestockRequest', 18, '2026-02-15 08:21:33', '2026-02-15 08:21:33'),
	(61, '2026-04-10', 'income', 'installment', 442500.00, 'Pembayaran Angsuran ke-1 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 44, '2026-04-10 08:47:25', '2026-04-10 08:47:25'),
	(62, '2026-05-10', 'income', 'installment', 442500.00, 'Pembayaran Angsuran ke-2 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 45, '2026-07-20 08:50:56', '2026-07-20 08:50:56'),
	(63, '2026-06-10', 'income', 'installment', 442500.00, 'Pembayaran Angsuran ke-3 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 46, '2026-07-20 08:51:26', '2026-07-20 08:51:26'),
	(64, '2026-07-20', 'income', 'installment', 442500.00, 'Pembayaran Angsuran ke-4 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 47, '2026-07-20 08:53:13', '2026-07-20 08:53:13'),
	(65, '2026-02-20', 'expense', 'restock', 1760000.00, 'Biaya Restock untuk 1 unit Matras Kangoroo Chiko (Varian: 180x200 - Union)', 'transfer', 'App\\Models\\RestockRequest', 19, '2026-07-20 08:55:50', '2026-07-20 08:55:50'),
	(66, '2026-04-28', 'income', 'installment', 290400.00, 'Pembayaran Angsuran ke-1 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 48, '2026-04-28 09:04:30', '2026-04-28 09:04:30'),
	(67, '2026-05-28', 'income', 'installment', 290400.00, 'Pembayaran Angsuran ke-2 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 49, '2026-05-28 09:05:29', '2026-05-28 09:05:29'),
	(68, '2026-06-28', 'income', 'installment', 290400.00, 'Pembayaran Angsuran ke-3 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 50, '2026-06-28 09:05:49', '2026-06-28 09:05:49'),
	(69, '2026-03-20', 'expense', 'restock', 2425000.00, 'Biaya Restock untuk 1 unit Lemari TV Olympic', 'transfer', 'App\\Models\\RestockRequest', 20, '2026-03-20 05:50:07', '2026-03-20 05:50:07'),
	(70, '2026-06-14', 'income', 'installment', 400200.00, 'Pembayaran Angsuran ke-1 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 51, '2026-06-14 05:58:59', '2026-06-14 05:58:59'),
	(71, '2026-05-29', 'income', 'installment', 288750.00, 'Pembayaran Angsuran ke-1 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 52, '2026-05-29 06:13:39', '2026-05-29 06:13:39'),
	(72, '2026-06-29', 'income', 'installment', 288750.00, 'Pembayaran Angsuran ke-2 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 53, '2026-06-29 06:48:07', '2026-06-29 06:48:07'),
	(73, '2026-05-15', 'expense', 'restock', 1200182.00, 'Biaya Restock untuk 2 unit Dipan Spring Bed (Varian: 120x200)', 'transfer', 'App\\Models\\RestockRequest', 23, '2026-05-15 07:05:17', '2026-05-15 07:05:17'),
	(74, '2026-05-15', 'expense', 'restock', 4545455.00, 'Biaya Restock untuk 5 unit Dipan Spring Bed (Varian: 180x200)', 'transfer', 'App\\Models\\RestockRequest', 22, '2026-05-15 07:05:17', '2026-05-15 07:05:17'),
	(75, '2026-05-15', 'expense', 'restock', 2727273.00, 'Biaya Restock untuk 3 unit Dipan Spring Bed (Varian: 160x200)', 'transfer', 'App\\Models\\RestockRequest', 21, '2026-05-15 07:05:17', '2026-05-15 07:05:17'),
	(76, '2026-06-20', 'expense', 'restock', 1200182.00, 'Biaya Restock untuk 2 unit Dipan Spring Bed (Varian: 120x200)', 'transfer', 'App\\Models\\RestockRequest', 26, '2026-06-20 07:08:16', '2026-06-20 07:08:16'),
	(77, '2026-06-20', 'expense', 'restock', 4545455.00, 'Biaya Restock untuk 5 unit Dipan Spring Bed (Varian: 180x200)', 'transfer', 'App\\Models\\RestockRequest', 25, '2026-06-20 07:08:16', '2026-06-20 07:08:16'),
	(78, '2026-06-20', 'expense', 'restock', 2727273.00, 'Biaya Restock untuk 3 unit Dipan Spring Bed (Varian: 160x200)', 'transfer', 'App\\Models\\RestockRequest', 24, '2026-06-20 07:08:16', '2026-06-20 07:08:16'),
	(79, '2025-05-29', 'income', 'installment', 150150.00, 'Pembayaran Angsuran ke-1 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 54, '2026-05-29 08:23:12', '2026-05-29 08:23:12'),
	(80, '2026-06-29', 'income', 'installment', 150150.00, 'Pembayaran Angsuran ke-2 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 55, '2026-06-29 08:29:20', '2026-06-29 08:29:20'),
	(81, '2026-04-10', 'expense', 'restock', 6363636.00, 'Biaya Restock untuk 3 unit Lemari Plastik OTC (Varian: 3 Pintu - Modern)', 'transfer', 'App\\Models\\RestockRequest', 30, '2026-04-10 08:55:16', '2026-04-10 08:55:16'),
	(82, '2026-04-10', 'expense', 'restock', 6727272.00, 'Biaya Restock untuk 3 unit Lemari Plastik OTC (Varian: 3 Pintu - Klasik)', 'transfer', 'App\\Models\\RestockRequest', 29, '2026-04-10 08:55:16', '2026-04-10 08:55:16'),
	(83, '2026-04-10', 'expense', 'restock', 3030304.00, 'Biaya Restock untuk 2 unit Lemari Plastik OTC (Varian: 2 Pintu - Modern)', 'transfer', 'App\\Models\\RestockRequest', 28, '2026-04-10 08:55:16', '2026-04-10 08:55:16'),
	(84, '2026-04-10', 'expense', 'restock', 3272728.00, 'Biaya Restock untuk 2 unit Lemari Plastik OTC (Varian: 2 Pintu - Klasik)', 'transfer', 'App\\Models\\RestockRequest', 27, '2026-04-10 08:55:16', '2026-04-10 08:55:16'),
	(85, '2026-03-27', 'income', 'installment', 370050.00, 'Pembayaran Angsuran ke-1 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 56, '2026-03-27 09:05:46', '2026-03-27 09:05:46'),
	(86, '2026-03-14', 'expense', 'restock', 2242424.00, 'Biaya Restock untuk 1 unit Lemari Plastik OTC (Varian: 3 Pintu - Klasik)', 'transfer', 'App\\Models\\RestockRequest', 31, '2026-03-14 09:12:14', '2026-03-14 09:12:14'),
	(87, '2026-04-27', 'income', 'installment', 370050.00, 'Pembayaran Angsuran ke-2 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 57, '2026-04-27 09:19:22', '2026-04-27 09:19:22'),
	(88, '2026-05-27', 'income', 'installment', 370050.00, 'Pembayaran Angsuran ke-3 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 58, '2026-05-27 09:20:20', '2026-05-27 09:20:20'),
	(89, '2026-06-27', 'income', 'installment', 370050.00, 'Pembayaran Angsuran ke-4 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 59, '2026-06-27 09:20:58', '2026-06-27 09:20:58'),
	(90, '2026-07-20', 'income', 'installment', 370050.00, 'Pembayaran Angsuran ke-5 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 60, '2026-07-20 09:21:42', '2026-07-20 09:21:42'),
	(91, '2025-12-12', 'expense', 'restock', 3818182.00, 'Biaya Restock untuk 1 unit Ac Dinding LG (Varian: 1 Pk)', 'transfer', 'App\\Models\\RestockRequest', 32, '2025-12-12 09:39:04', '2025-12-12 09:39:04'),
	(92, '2025-12-21', 'income', 'installment', 630000.00, 'Pembayaran Angsuran ke-1 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 61, '2025-12-21 09:43:56', '2025-12-21 09:43:56'),
	(93, '2026-01-21', 'income', 'installment', 630000.00, 'Pembayaran Angsuran Manual (Order #13) - Pembayaran Angsuran ke-2', 'tunai', 'App\\Models\\PaymentLog', 62, '2026-01-21 05:54:05', '2026-01-21 05:54:05'),
	(94, '2026-02-21', 'income', 'installment', 630000.00, 'Pembayaran Angsuran Manual (Order #13) - Pembayaran Angsuran ke-3', 'tunai', 'App\\Models\\PaymentLog', 63, '2026-02-21 05:54:13', '2026-02-21 05:54:13'),
	(95, '2026-03-22', 'income', 'installment', 630000.00, 'Pembayaran Angsuran ke-4 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 64, '2026-03-22 05:57:27', '2026-03-22 05:57:27'),
	(96, '2026-04-21', 'income', 'installment', 630000.00, 'Pembayaran Angsuran ke-5 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 65, '2026-04-21 05:57:52', '2026-04-21 05:57:52'),
	(97, '2026-05-21', 'income', 'installment', 630000.00, 'Pembayaran Angsuran ke-6 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 66, '2026-05-21 05:58:26', '2026-05-21 05:58:26'),
	(98, '2026-06-21', 'income', 'installment', 630000.00, 'Pembayaran Angsuran ke-7 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 67, '2026-06-21 05:59:09', '2026-06-21 05:59:09'),
	(99, '2026-03-20', 'expense', 'restock', 1750000.00, 'Biaya Restock untuk 1 unit Kulkas Sharp (Varian: 167 Mg)', 'transfer', 'App\\Models\\RestockRequest', 33, '2026-03-20 06:04:29', '2026-03-20 06:04:29'),
	(100, '2026-04-20', 'income', 'installment', 288750.00, 'Pembayaran Angsuran ke-1 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 68, '2026-04-20 06:06:12', '2026-04-20 06:06:12'),
	(101, '2026-05-20', 'income', 'installment', 288750.00, 'Pembayaran Angsuran ke-2 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 69, '2026-05-20 06:10:38', '2026-05-20 06:10:38'),
	(102, '2026-06-20', 'income', 'installment', 288750.00, 'Pembayaran Angsuran ke-3 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 70, '2026-06-20 06:11:24', '2026-06-20 06:11:24'),
	(103, '2026-07-22', 'income', 'installment', 288750.00, 'Pembayaran Angsuran ke-4 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 71, '2026-07-22 06:17:11', '2026-07-22 06:17:11'),
	(104, '2026-03-16', 'income', 'installment', 349950.00, 'Pembayaran Angsuran ke-1 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 72, '2026-03-16 06:33:05', '2026-03-16 06:33:05'),
	(105, '2026-04-16', 'income', 'installment', 349950.00, 'Pembayaran Angsuran ke-2 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 73, '2026-04-22 06:36:29', '2026-04-22 06:36:29'),
	(106, '2026-05-16', 'income', 'installment', 349950.00, 'Pembayaran Angsuran ke-3 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 74, '2026-05-16 06:36:56', '2026-05-16 06:36:56'),
	(107, '2026-06-16', 'income', 'installment', 349950.00, 'Pembayaran Angsuran ke-4 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 75, '2026-06-16 06:37:16', '2026-06-16 06:37:16'),
	(108, '2026-07-16', 'income', 'installment', 349950.00, 'Pembayaran Angsuran ke-5 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 76, '2026-07-16 06:37:16', '2026-07-16 06:37:16'),
	(109, '2026-03-01', 'expense', 'restock', 2910000.00, 'Biaya Restock untuk 1 unit Lemari Kain Plat Besi 1.5', 'transfer', 'App\\Models\\RestockRequest', 34, '2026-03-01 06:49:49', '2026-03-01 06:49:49'),
	(110, '2026-02-01', 'expense', 'restock', 2848485.00, 'Biaya Restock untuk 1 unit Lemari Kain Plat Besi 1.5 3 Pintu', 'transfer', 'App\\Models\\RestockRequest', 35, '2026-02-01 07:10:01', '2026-02-01 07:10:01'),
	(111, '2026-01-01', 'expense', 'restock', 2303030.00, 'Biaya Restock untuk 1 unit Matras Olympic Eero', 'transfer', 'App\\Models\\RestockRequest', 36, '2026-01-01 07:15:56', '2026-01-01 07:15:56'),
	(112, '2026-03-15', 'expense', 'restock', 3333333.00, 'Biaya Restock untuk 1 unit Set Sofa Beludru', 'transfer', 'App\\Models\\RestockRequest', 37, '2026-03-15 11:23:34', '2026-03-15 11:23:34'),
	(113, '2026-07-24', 'income', 'installment', 338250.00, 'Pembayaran Angsuran ke-1 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 77, '2026-07-23 19:33:28', '2026-07-23 19:33:28'),
	(114, '2026-07-24', 'income', 'installment', 50000.00, 'Pembayaran Angsuran Manual (Order #18) - Pembayaran Angsuran ke-2', 'tunai', 'App\\Models\\PaymentLog', 78, '2026-07-23 19:36:19', '2026-07-23 19:36:19'),
	(115, '2026-07-24', 'income', 'installment', 1000000.00, 'Pembayaran Angsuran Manual (Order #18) - Pembayaran Angsuran ke-3', 'tunai', 'App\\Models\\PaymentLog', 79, '2026-07-23 19:37:10', '2026-07-23 19:37:10'),
	(116, '2026-08-03', 'income', 'installment', 894700.00, 'Pembayaran Angsuran ke-1 otomatis via Midtrans', 'transfer', 'App\\Models\\PaymentLog', 80, '2026-08-03 06:46:18', '2026-08-03 06:46:18');

-- Dumping structure for table toko_haji_db.jobs
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.jobs: ~0 rows (approximately)

-- Dumping structure for table toko_haji_db.job_batches
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.job_batches: ~0 rows (approximately)

-- Dumping structure for table toko_haji_db.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.migrations: ~23 rows (approximately)
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '0001_01_01_000000_create_users_table', 1),
	(2, '0001_01_01_000001_create_cache_table', 1),
	(3, '0001_01_01_000002_create_jobs_table', 1),
	(4, '2025_09_04_030759_create_categories_table', 1),
	(5, '2025_09_04_031230_create_products_table', 1),
	(6, '2025_09_04_031446_create_product_images_table', 1),
	(7, '2025_09_05_072001_add_role_to_users_table', 1),
	(8, '2025_09_05_072302_create_customers_table', 1),
	(9, '2025_12_20_195253_create_carts_table', 1),
	(10, '2025_12_20_203840_create_user_search_histories_table', 1),
	(11, '2025_12_20_205255_create_cart_items_table', 1),
	(12, '2025_12_20_210130_create_orders_table', 1),
	(13, '2025_12_20_210131_create_order_items_table', 1),
	(14, '2025_12_20_210132_create_order_messages_table', 1),
	(15, '2025_12_21_132345_add_shipping_cost_to_orders_table', 1),
	(16, '2025_12_21_151233_create_credits_table', 2),
	(17, '2025_12_21_161530_add_proof_of_payment_path_to_credits_table', 3),
	(18, '2025_12_21_170542_add_installments_paid_to_credits_table', 4),
	(19, '2025_12_21_173307_rename_credits_to_payments_table', 5),
	(20, '2025_12_21_175456_create_payment_logs_table', 6),
	(21, '2025_12_21_193556_create_financial_transactions_table', 7),
	(22, '2025_12_21_200224_make_proof_path_nullable_in_payment_logs', 8),
	(23, '2025_12_21_213839_add_months_paid_to_payment_logs', 9),
	(24, '2026_05_05_075152_add_snap_token_to_payment_logs_table', 10),
	(25, '2026_05_10_091502_create_addresses_table', 11),
	(26, '2026_05_11_201022_add_minimum_stock_to_products_table', 12),
	(27, '2026_05_11_201031_create_restock_requests_table', 12),
	(28, '2026_05_20_160937_add_custom_options_to_products_table', 13),
	(29, '2026_05_20_160943_add_variant_details_to_cart_and_order_items', 13),
	(30, '2026_05_20_170041_create_product_variants_table', 13),
	(31, '2026_05_20_170042_add_variant_id_to_cart_and_orders', 13),
	(32, '2026_05_20_175504_create_product_returns_table', 13),
	(33, '2026_05_28_144109_add_price_to_product_variants_table', 14),
	(34, '2026_06_01_092855_add_product_variant_id_to_restock_requests_table', 15),
	(35, '2026_06_01_101112_add_weight_to_product_variants_table', 16),
	(36, '2026_06_02_105946_create_defective_products_table', 17),
	(37, '2026_06_02_122113_add_repossessed_to_payments_status', 18),
	(38, '2026_06_03_094402_add_sold_status_to_defective_products_table', 19),
	(39, '2026_06_03_134029_add_cash_gantung_to_payments_table', 20),
	(40, '2026_06_03_175948_create_notifications_table', 21);

-- Dumping structure for table toko_haji_db.notifications
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_id` bigint unsigned NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.notifications: ~0 rows (approximately)

-- Dumping structure for table toko_haji_db.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'negotiation',
  `total_amount` decimal(12,2) NOT NULL,
  `shipping_cost` decimal(12,2) DEFAULT NULL,
  `province` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `village` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_detail` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.orders: ~19 rows (approximately)
INSERT INTO `orders` (`id`, `user_id`, `status`, `total_amount`, `shipping_cost`, `province`, `city`, `district`, `village`, `address_detail`, `postal_code`, `notes`, `created_at`, `updated_at`) VALUES
	(1, 12, 'completed', 2574000.00, NULL, 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'LANGKAT', 'Bagan Jaya', '28771', NULL, '2026-03-18 05:31:17', '2026-03-18 05:45:04'),
	(2, 62, 'completed', 3201000.00, NULL, 'RIAU', 'KABUPATEN S I A K', 'SABAK AUH', 'REMPAK', 'Desa Rempak, Jalan Raja Kecik', '28685', NULL, '2025-10-30 07:58:41', '2025-10-30 07:58:41'),
	(3, 63, 'completed', 4125000.00, NULL, 'Riau', 'Pekanbaru', 'Toko', 'Toko', 'Pembelian Langsung di Toko (Walk-in/POS)', NULL, 'Kasir: administrator', '2025-11-10 10:57:46', '2025-11-10 11:00:20'),
	(4, 64, 'completed', 8806000.00, NULL, 'RIAU', 'KABUPATEN S I A K', 'SABAK AUH', 'BANDAR SUNGAI', 'Pasar Bandar Sungai', '28664', NULL, '2025-11-30 04:53:54', '2025-11-30 04:53:54'),
	(5, 65, 'completed', 6708000.00, NULL, 'Riau', 'Pekanbaru', 'Toko', 'Toko', 'Pembelian Langsung di Toko (Walk-in/POS)', NULL, 'Kasir: administrator', '2025-11-12 06:53:35', '2025-11-12 06:53:35'),
	(6, 15, 'completed', 3003000.00, NULL, 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'SEPOTONG', 'Ngacceh, Parit 5', '28771', NULL, '2026-05-02 07:31:32', '2026-07-20 07:41:28'),
	(7, 13, 'completed', 2950000.00, NULL, 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'MUARA DUA', 'Desa Muara 2', '28771', NULL, '2026-04-10 08:47:25', '2026-04-10 08:47:25'),
	(8, 17, 'completed', 1936000.00, NULL, 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'SEPOTONG', 'Ngacceh', '28771', NULL, '2026-04-28 09:03:05', '2026-04-28 09:03:05'),
	(9, 18, 'completed', 2668000.00, NULL, 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'LANGKAT', 'bagan jaya, Desa Langkat', '28771', NULL, '2026-06-14 05:58:59', '2026-06-14 05:58:59'),
	(10, 19, 'completed', 1925000.00, NULL, 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'SEPOTONG', 'Parit 4', '28771', NULL, '2026-05-29 06:12:18', '2026-05-29 06:12:18'),
	(11, 20, 'completed', 1001000.00, NULL, 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'SEPOTONG', 'Ngacceh', '28771', NULL, '2026-05-29 08:23:12', '2026-05-29 08:23:12'),
	(12, 29, 'completed', 2467000.00, NULL, 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'SUMBER JAYA', 'Jl. ATR, Parit Baru', '28771', NULL, '2026-03-27 09:05:46', '2026-03-27 09:05:46'),
	(13, 28, 'completed', 4200000.00, NULL, 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'TANJUNG DAMAI', 'Absen', '28771', NULL, '2025-12-21 09:43:56', '2025-12-21 09:43:56'),
	(14, 27, 'completed', 1925000.00, NULL, 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'TANJUNG DAMAI', 'Absen', '28771', NULL, '2026-04-20 06:06:12', '2026-04-20 06:06:12'),
	(15, 25, 'completed', 2333000.00, NULL, 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'LUBUK GAUNG', 'Sungai Manggis', '28771', NULL, '2026-03-16 06:33:05', '2026-03-16 06:33:05'),
	(16, 26, 'awaiting_payment', 5668000.00, NULL, 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'SUMBER JAYA', 'Siak 4', '28771', NULL, '2026-03-15 07:21:53', '2026-03-15 07:21:53'),
	(17, 24, 'negotiation', 3667000.00, NULL, 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'TANJUNG DAMAI', 'Absen Laut', '28771', NULL, '2026-07-23 15:36:11', '2026-07-23 15:36:11'),
	(18, 12, 'completed', 2255000.00, NULL, 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'LANGKAT', 'Bagan Jaya', '28771', NULL, '2026-07-23 19:27:51', '2026-07-23 19:34:26'),
	(19, 13, 'completed', 2334000.00, NULL, 'RIAU', 'KABUPATEN BENGKALIS', 'SIAK KECIL', 'MUARA DUA', 'Desa Muara 2', '28771', NULL, '2026-08-03 06:21:53', '2026-08-03 06:46:48');

-- Dumping structure for table toko_haji_db.order_items
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `product_variant_id` bigint unsigned DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `selected_options` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  KEY `order_items_product_id_foreign` (`product_id`),
  KEY `order_items_product_variant_id_foreign` (`product_variant_id`),
  CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `order_items_product_variant_id_foreign` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.order_items: ~18 rows (approximately)
INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_variant_id`, `quantity`, `price`, `created_at`, `updated_at`, `selected_options`) VALUES
	(1, 1, 1, NULL, 1, 2574000.00, '2026-06-26 05:31:17', '2026-06-26 05:31:17', NULL),
	(2, 2, 4, NULL, 1, 3201000.00, '2026-07-16 07:58:41', '2026-07-16 07:58:41', NULL),
	(3, 3, 5, NULL, 1, 2750000.00, '2026-07-16 10:57:46', '2026-07-16 10:57:46', NULL),
	(4, 4, 7, NULL, 1, 6001000.00, '2026-07-20 04:52:18', '2026-07-20 04:52:18', NULL),
	(5, 4, 6, NULL, 1, 2805000.00, '2026-07-20 04:52:18', '2026-07-20 04:52:18', NULL),
	(6, 5, 8, NULL, 1, 2536000.00, '2026-07-20 06:53:35', '2026-07-20 06:53:35', NULL),
	(7, 5, 9, 7, 1, 1936000.00, '2026-07-20 06:53:35', '2026-07-20 06:53:35', NULL),
	(8, 6, 2, NULL, 1, 3003000.00, '2026-07-20 07:31:32', '2026-07-20 07:31:32', NULL),
	(9, 7, 10, NULL, 1, 2492000.00, '2026-07-20 08:28:52', '2026-07-20 08:28:52', NULL),
	(10, 8, 9, 7, 1, 1936000.00, '2026-07-20 09:03:05', '2026-07-20 09:03:05', NULL),
	(11, 9, 11, NULL, 1, 2668000.00, '2026-07-21 05:58:59', '2026-07-21 05:58:59', NULL),
	(12, 10, 3, 1, 1, 1925000.00, '2026-07-21 06:12:18', '2026-07-21 06:12:18', NULL),
	(13, 11, 12, 11, 1, 1001000.00, '2026-05-29 08:23:12', '2026-05-29 08:23:12', NULL),
	(14, 12, 13, 16, 1, 2467000.00, '2026-07-21 09:05:46', '2026-07-21 09:05:46', NULL),
	(15, 13, 14, 19, 1, 4200000.00, '2025-12-21 09:43:56', '2025-12-21 09:43:56', NULL),
	(16, 14, 3, 1, 1, 1925000.00, '2026-04-20 06:06:12', '2026-04-20 06:06:12', NULL),
	(17, 15, 3, 3, 1, 2333000.00, '2026-03-16 06:33:05', '2026-03-16 06:33:05', NULL),
	(18, 16, 15, NULL, 1, 3134000.00, '2026-07-22 07:21:53', '2026-07-22 07:21:53', NULL),
	(19, 16, 16, NULL, 1, 2534000.00, '2026-07-22 07:21:53', '2026-07-22 07:21:53', NULL),
	(20, 17, 17, NULL, 1, 3667000.00, '2026-07-23 15:36:11', '2026-07-23 15:36:11', NULL),
	(21, 18, 3, 2, 1, 2255000.00, '2026-07-23 19:27:51', '2026-07-23 19:27:51', NULL),
	(22, 19, 13, 17, 1, 2334000.00, '2026-08-03 06:21:53', '2026-08-03 06:21:53', NULL);

-- Dumping structure for table toko_haji_db.order_messages
CREATE TABLE IF NOT EXISTS `order_messages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_messages_order_id_foreign` (`order_id`),
  KEY `order_messages_user_id_foreign` (`user_id`),
  CONSTRAINT `order_messages_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_messages_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.order_messages: ~6 rows (approximately)
INSERT INTO `order_messages` (`id`, `order_id`, `user_id`, `message`, `is_read`, `created_at`, `updated_at`) VALUES
	(1, 7, 13, 'mau yang tipe 2 ya buk warna hitam', 0, '2026-07-20 08:29:17', '2026-07-20 08:29:17'),
	(2, 7, 1, 'oke siap', 0, '2026-07-20 08:29:34', '2026-07-20 08:29:34'),
	(3, 11, 20, 'warna Hitam Ada buk?', 0, '2026-07-21 08:23:24', '2026-07-21 08:23:24'),
	(4, 11, 1, 'ada', 0, '2026-07-21 08:23:37', '2026-07-21 08:23:37'),
	(5, 11, 20, 'oke saya mau yang itu buk', 0, '2026-07-21 08:23:46', '2026-07-21 08:23:46'),
	(6, 11, 1, 'oke di keep ya', 0, '2026-07-21 08:24:00', '2026-07-21 08:24:00');

-- Dumping structure for table toko_haji_db.password_reset_tokens
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.password_reset_tokens: ~0 rows (approximately)

-- Dumping structure for table toko_haji_db.payments
CREATE TABLE IF NOT EXISTS `payments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `customer_id` bigint unsigned DEFAULT NULL,
  `payment_method` enum('cash','credit','cash_gantung') COLLATE utf8mb4_unicode_ci NOT NULL,
  `installment_type` enum('fixed','flexible') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `proof_of_payment_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cash_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `down_payment` decimal(12,2) DEFAULT NULL,
  `installment_amount` decimal(12,2) DEFAULT NULL,
  `duration_months` int DEFAULT NULL,
  `installments_paid` int NOT NULL DEFAULT '0',
  `status` enum('pending_approval','ongoing','paid_off','arrears','rejected','completed','repossessed') COLLATE utf8mb4_unicode_ci DEFAULT 'pending_approval',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `credits_order_id_foreign` (`order_id`),
  KEY `credits_customer_id_foreign` (`customer_id`),
  CONSTRAINT `credits_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL,
  CONSTRAINT `credits_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.payments: ~17 rows (approximately)
INSERT INTO `payments` (`id`, `order_id`, `customer_id`, `payment_method`, `installment_type`, `proof_of_payment_path`, `cash_type`, `down_payment`, `installment_amount`, `duration_months`, `installments_paid`, `status`, `created_at`, `updated_at`) VALUES
	(1, 1, 1, 'credit', NULL, NULL, NULL, 0.00, 386100.00, 10, 4, 'ongoing', '2026-03-18 05:32:23', '2026-07-16 10:45:43'),
	(2, 2, 51, 'credit', NULL, NULL, NULL, 0.00, 480150.00, 10, 8, 'ongoing', '2025-10-30 07:59:21', '2026-07-16 08:12:28'),
	(3, 3, 52, 'credit', NULL, NULL, 'tunai', 0.00, 412500.00, 10, 10, 'paid_off', '2025-10-10 10:57:46', '2026-07-16 11:07:36'),
	(4, 4, 53, 'credit', NULL, NULL, NULL, 0.00, 1320900.00, 10, 8, 'ongoing', '2025-11-30 04:53:07', '2026-07-20 05:12:00'),
	(5, 5, 54, 'credit', NULL, NULL, 'tunai', 0.00, 670800.00, 10, 9, 'ongoing', '2025-11-12 06:53:35', '2026-07-20 07:06:00'),
	(6, 6, 4, 'credit', NULL, NULL, NULL, 0.00, 450450.00, 10, 3, 'ongoing', '2026-05-02 07:40:38', '2026-07-02 07:54:17'),
	(7, 7, 2, 'credit', NULL, NULL, NULL, 0.00, 442500.00, 10, 4, 'ongoing', '2026-04-10 08:47:25', '2026-07-20 08:53:13'),
	(8, 8, 6, 'credit', NULL, NULL, NULL, 0.00, 290400.00, 10, 3, 'ongoing', '2026-04-28 09:03:43', '2026-06-28 09:05:49'),
	(9, 9, 7, 'credit', NULL, NULL, NULL, 0.00, 400200.00, 10, 1, 'ongoing', '2026-06-14 05:58:59', '2026-06-14 05:58:59'),
	(10, 10, 8, 'credit', NULL, NULL, NULL, 0.00, 288750.00, 10, 2, 'ongoing', '2026-05-29 06:12:18', '2026-06-29 06:48:07'),
	(11, 11, 9, 'credit', NULL, NULL, NULL, 0.00, 150150.00, 10, 2, 'ongoing', '2026-05-29 08:23:12', '2026-06-29 08:29:20'),
	(12, 12, 18, 'credit', NULL, NULL, NULL, 0.00, 370050.00, 10, 5, 'ongoing', '2026-03-27 09:05:46', '2026-07-21 09:21:42'),
	(13, 13, 17, 'credit', NULL, NULL, NULL, 0.00, 630000.00, 10, 7, 'ongoing', '2025-12-21 09:43:56', '2026-07-22 05:59:09'),
	(14, 14, 16, 'credit', NULL, NULL, NULL, 0.00, 288750.00, 10, 4, 'ongoing', '2026-04-20 06:06:12', '2026-07-22 06:17:11'),
	(15, 15, 14, 'credit', NULL, NULL, NULL, 0.00, 349950.00, 10, 5, 'ongoing', '2026-03-16 06:33:05', '2026-07-16 06:37:44'),
	(16, 18, 1, 'credit', NULL, NULL, NULL, 0.00, 338250.00, 10, 4, 'ongoing', '2026-07-23 19:28:34', '2026-08-02 13:39:08'),
	(17, 19, 2, 'cash_gantung', NULL, NULL, NULL, 0.00, 894700.00, 3, 1, 'ongoing', '2026-08-03 06:45:27', '2026-08-03 06:46:18');

-- Dumping structure for table toko_haji_db.payment_logs
CREATE TABLE IF NOT EXISTS `payment_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `payment_id` bigint unsigned NOT NULL,
  `type` enum('down_payment','installment') COLLATE utf8mb4_unicode_ci NOT NULL,
  `installment_number` int DEFAULT NULL,
  `amount` decimal(12,2) NOT NULL,
  `months_paid` int NOT NULL DEFAULT '1',
  `proof_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `snap_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','verified','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `paid_at` timestamp NULL DEFAULT NULL,
  `admin_notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_logs_payment_id_foreign` (`payment_id`),
  CONSTRAINT `payment_logs_payment_id_foreign` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.payment_logs: ~76 rows (approximately)
INSERT INTO `payment_logs` (`id`, `payment_id`, `type`, `installment_number`, `amount`, `months_paid`, `proof_path`, `snap_token`, `status`, `paid_at`, `admin_notes`, `created_at`, `updated_at`) VALUES
	(1, 1, 'installment', 1, 386100.00, 1, NULL, '76c55f3c-734c-4c8f-ab74-59f031d551dc', 'verified', '2026-03-18 05:33:04', NULL, '2026-03-18 05:32:26', '2026-06-26 05:33:04'),
	(2, 1, 'installment', 2, 386100.00, 1, NULL, '14211b3f-c570-4b16-8569-c3486e09cd62', 'verified', '2026-04-18 05:46:40', NULL, '2026-04-18 05:46:08', '2026-06-26 05:46:40'),
	(3, 1, 'installment', 3, 386100.00, 1, NULL, '59a53a7f-298f-42f1-8f42-9204eeb1f34c', 'verified', '2026-05-18 05:47:05', NULL, '2026-05-18 05:46:48', '2026-06-26 05:47:05'),
	(5, 2, 'installment', 1, 480150.00, 1, NULL, '2c4ef70b-f759-4235-bc49-38146b7dc81f', 'verified', '2025-10-30 08:00:20', NULL, '2025-10-30 08:00:20', '2025-10-30 08:00:20'),
	(6, 2, 'installment', 2, 480150.00, 1, NULL, 'c9a1074a-1a89-4923-b78e-ab3a0d4f03e8', 'verified', '2025-11-30 08:11:17', NULL, '2025-11-30 08:06:16', '2026-07-16 08:11:17'),
	(7, 2, 'installment', 3, 480150.00, 1, NULL, NULL, 'verified', '2025-12-29 17:00:00', 'Pembayaran Angsuran ke-3', '2025-12-30 08:11:50', '2026-07-16 08:11:50'),
	(8, 2, 'installment', 4, 480150.00, 1, NULL, NULL, 'verified', '2026-01-29 17:00:00', 'Pembayaran Angsuran ke-4', '2026-01-30 08:11:55', '2026-07-16 08:11:55'),
	(9, 2, 'installment', 5, 480150.00, 1, NULL, NULL, 'verified', '2026-02-27 17:00:00', 'Pembayaran Angsuran ke-5', '2026-02-28 08:12:03', '2026-07-16 08:12:03'),
	(10, 2, 'installment', 6, 480150.00, 1, NULL, NULL, 'verified', '2026-03-29 17:00:00', 'Pembayaran Angsuran ke-6', '2026-03-30 08:12:15', '2026-07-16 08:12:15'),
	(11, 2, 'installment', 7, 480150.00, 1, NULL, NULL, 'verified', '2026-04-28 17:00:00', 'Pembayaran Angsuran ke-7', '2026-04-29 08:12:22', '2026-07-16 08:12:22'),
	(12, 2, 'installment', 8, 480150.00, 1, NULL, NULL, 'verified', '2026-06-29 17:00:00', 'Pembayaran Angsuran ke-8', '2026-05-30 08:12:28', '2026-07-16 08:12:28'),
	(13, 1, 'installment', 4, 386100.00, 1, NULL, NULL, 'verified', '2026-07-15 17:00:00', 'Pembayaran Angsuran ke-4', '2026-07-16 10:45:43', '2026-07-16 10:45:43'),
	(14, 3, 'installment', 1, 412500.00, 1, NULL, NULL, 'verified', '2025-10-09 17:00:00', 'Pembayaran Angsuran ke-1', '2025-10-09 17:00:00', '2026-07-16 10:58:28'),
	(15, 3, 'installment', 2, 412500.00, 1, NULL, NULL, 'verified', '2025-11-09 17:00:00', 'Pembayaran Angsuran ke-2', '2025-11-09 17:00:00', '2026-07-16 10:58:32'),
	(16, 3, 'installment', 3, 412500.00, 1, NULL, NULL, 'verified', '2025-12-09 17:00:00', 'Pembayaran Angsuran ke-3', '2025-12-09 17:00:00', '2026-07-16 10:58:37'),
	(17, 3, 'installment', 4, 412500.00, 1, NULL, NULL, 'verified', '2026-01-09 17:00:00', 'Pembayaran Angsuran ke-4', '2026-01-09 17:00:00', '2026-07-16 10:58:41'),
	(18, 3, 'installment', 5, 412500.00, 1, NULL, NULL, 'verified', '2026-02-09 17:00:00', 'Pembayaran Angsuran ke-5', '2026-02-09 17:00:00', '2026-07-16 10:58:45'),
	(19, 3, 'installment', 6, 412500.00, 1, NULL, NULL, 'verified', '2026-03-09 17:00:00', 'Pembayaran Angsuran ke-6', '2026-03-09 17:00:00', '2026-07-16 10:58:49'),
	(20, 3, 'installment', 7, 412500.00, 1, NULL, NULL, 'verified', '2026-04-09 17:00:00', 'Pembayaran Angsuran ke-7', '2026-04-09 17:00:00', '2026-07-16 10:59:13'),
	(21, 3, 'installment', 8, 412500.00, 1, NULL, '42b59dd7-cd92-4fe3-8966-77214326b8a5', 'verified', '2026-05-10 11:06:23', NULL, '2026-07-16 11:05:47', '2026-07-16 11:06:23'),
	(22, 3, 'installment', 9, 412500.00, 1, NULL, '19bf3600-b83f-4f0e-8819-4cabba095794', 'verified', '2026-06-10 11:07:06', NULL, '2026-07-16 11:06:45', '2026-07-16 11:07:06'),
	(23, 3, 'installment', 10, 412500.00, 1, NULL, 'c50cbdc4-ddcd-47e5-9c5a-50c8a8db4030', 'verified', '2026-06-10 11:07:36', NULL, '2026-07-16 11:07:17', '2026-07-16 11:07:36'),
	(24, 4, 'installment', 1, 1320900.00, 1, NULL, 'eeffb032-a09c-41af-adad-ae6815667b03', 'verified', '2025-11-30 04:53:54', NULL, '2025-11-30 04:53:54', '2025-10-30 04:53:54'),
	(25, 4, 'installment', 2, 1320900.00, 1, NULL, NULL, 'verified', '2025-12-29 17:00:00', 'Pembayaran Angsuran ke-2', '2025-12-30 04:59:03', '2026-07-20 04:59:03'),
	(26, 4, 'installment', 3, 1320900.00, 1, NULL, NULL, 'verified', '2026-01-29 17:00:00', 'Pembayaran Angsuran ke-3', '2026-01-30 04:59:11', '2026-07-20 04:59:11'),
	(27, 4, 'installment', 4, 1320900.00, 1, NULL, NULL, 'verified', '2026-02-27 17:00:00', 'Pembayaran Angsuran ke-4', '2026-02-28 05:06:24', '2026-07-20 05:06:24'),
	(28, 4, 'installment', 5, 1320900.00, 1, NULL, '1e283928-026f-45b2-8c68-b38c9bbc9b23', 'verified', '2026-03-30 05:09:26', NULL, '2026-03-30 05:09:06', '2026-07-20 05:09:26'),
	(29, 4, 'installment', 6, 1320900.00, 1, NULL, '69106220-4e7d-4bcc-b405-4c141b088f50', 'verified', '2026-04-30 05:09:54', NULL, '2026-04-30 05:09:36', '2026-07-20 05:09:54'),
	(30, 4, 'installment', 7, 1320900.00, 1, NULL, 'daa6d6e9-fdf6-4629-8e74-6d243e0bdbd0', 'verified', '2026-05-30 05:10:26', NULL, '2026-05-30 05:10:04', '2026-07-20 05:10:26'),
	(31, 4, 'installment', 8, 1320900.00, 1, NULL, '14465613-3806-4062-ae43-80b12507b62c', 'verified', '2026-06-30 05:12:00', NULL, '2026-06-30 05:10:36', '2026-07-20 05:12:00'),
	(32, 5, 'installment', 1, 670800.00, 1, NULL, NULL, 'verified', '2025-11-12 06:53:35', 'Pembayaran Angsuran ke-1', '2025-11-12 06:53:35', '2025-11-12 06:53:35'),
	(33, 5, 'installment', 2, 670800.00, 1, NULL, NULL, 'verified', '2025-12-11 17:00:00', 'Pembayaran Angsuran ke-2', '2026-07-20 06:59:27', '2026-07-20 06:59:27'),
	(34, 5, 'installment', 3, 670800.00, 1, NULL, NULL, 'verified', '2026-01-11 17:00:00', 'Pembayaran Angsuran ke-3', '2026-07-20 06:59:32', '2026-07-20 06:59:32'),
	(35, 5, 'installment', 4, 670800.00, 1, NULL, NULL, 'verified', '2026-02-11 17:00:00', 'Pembayaran Angsuran ke-4', '2026-07-20 06:59:44', '2026-07-20 06:59:44'),
	(36, 5, 'installment', 5, 670800.00, 1, NULL, NULL, 'verified', '2026-03-11 17:00:00', 'Pembayaran Angsuran ke-5', '2026-07-20 07:00:04', '2026-07-20 07:00:04'),
	(37, 5, 'installment', 6, 670800.00, 1, NULL, NULL, 'verified', '2026-04-12 17:00:00', 'Pembayaran Angsuran ke-6', '2026-07-20 07:00:11', '2026-07-20 07:00:11'),
	(38, 5, 'installment', 7, 670800.00, 1, NULL, NULL, 'verified', '2026-05-11 17:00:00', 'Pembayaran Angsuran ke-7', '2026-07-20 07:00:17', '2026-07-20 07:00:17'),
	(39, 5, 'installment', 8, 670800.00, 1, NULL, '30b82603-8ecf-4ff7-8f35-b83aedcb1e79', 'verified', '2026-06-12 07:05:07', NULL, '2026-07-20 07:04:36', '2026-07-20 07:05:07'),
	(40, 5, 'installment', 9, 670800.00, 1, NULL, '34a0618b-d05d-4e5f-b492-4c1dc92b4199', 'verified', '2026-07-12 07:06:00', NULL, '2026-07-20 07:05:32', '2026-07-20 07:06:00'),
	(41, 6, 'installment', 1, 450450.00, 1, NULL, '360a6ce3-33ac-4f25-ae9a-674f4705d214', 'verified', '2026-05-02 07:41:03', NULL, '2026-07-20 07:40:42', '2026-07-20 07:41:03'),
	(42, 6, 'installment', 2, 450450.00, 1, NULL, 'f9272202-75d8-4a2a-b893-7313446cd6a7', 'verified', '2026-06-02 07:53:12', NULL, '2026-07-20 07:46:51', '2026-07-20 07:53:12'),
	(43, 6, 'installment', 3, 450450.00, 1, NULL, 'a9118552-1caf-4237-8809-603c1c6ab4d5', 'verified', '2026-07-02 07:54:17', NULL, '2026-07-20 07:53:42', '2026-07-20 07:54:17'),
	(44, 7, 'installment', 1, 442500.00, 1, NULL, 'e3dd00b6-30f9-4bc4-a783-538986eb2f04', 'verified', '2026-04-10 08:47:25', NULL, '2026-04-10 08:47:25', '2026-04-10 08:47:25'),
	(45, 7, 'installment', 2, 442500.00, 1, NULL, '48864917-cd33-4558-a8ed-0918df5f5670', 'verified', '2026-05-10 08:50:56', NULL, '2026-05-10 08:50:27', '2026-05-10 08:50:27'),
	(46, 7, 'installment', 3, 442500.00, 1, NULL, 'ba407dc7-e0ff-45f2-a2fb-f5047eb79578', 'verified', '2026-06-10 08:51:26', NULL, '2026-06-10 08:51:04', '2026-06-10 08:51:04'),
	(47, 7, 'installment', 4, 442500.00, 1, NULL, '3665e425-aee6-4abb-ac8c-8eda66c1547c', 'verified', '2026-07-10 08:53:13', NULL, '2026-07-10 08:53:13', '2026-07-10 08:53:13'),
	(48, 8, 'installment', 1, 290400.00, 1, NULL, 'ca8351b2-adab-44eb-999f-bbe540e15a24', 'verified', '2026-04-28 09:04:29', NULL, '2026-04-28 09:04:29', '2026-04-28 09:04:29'),
	(49, 8, 'installment', 2, 290400.00, 1, NULL, '6aa1623c-4c76-496c-be7e-2197d09ede24', 'verified', '2026-05-28 09:05:29', NULL, '2026-05-28 09:05:29', '2026-05-28 09:05:29'),
	(50, 8, 'installment', 3, 290400.00, 1, NULL, '8edb3efa-4856-494b-9445-0223bf37657e', 'verified', '2026-06-28 09:05:49', NULL, '2026-06-28 09:05:49', '2026-06-28 09:05:49'),
	(51, 9, 'installment', 1, 400200.00, 1, NULL, '69301095-59c7-4283-a990-c58410eb49e6', 'verified', '2026-06-14 06:12:18', NULL, '2026-06-14 06:12:18', '2026-06-14 06:12:18'),
	(52, 10, 'installment', 1, 288750.00, 1, NULL, '73d46976-fd4c-4ccf-9e60-61c78d00aacb', 'verified', '2026-05-29 06:12:18', NULL, '2026-05-29 06:12:18', '2026-05-29 06:12:18'),
	(53, 10, 'installment', 2, 288750.00, 1, NULL, 'f7d8faa4-243f-47d9-9bdb-f9cd9b00b674', 'verified', '2026-06-29 06:48:07', NULL, '2026-06-29 06:48:07', '2026-06-29 06:48:07'),
	(54, 11, 'installment', 1, 150150.00, 1, NULL, '64a7eadf-47a4-4d47-828c-60064723cbb5', 'verified', '2026-05-29 08:23:12', NULL, '2026-05-29 08:23:12', '2026-05-29 08:23:12'),
	(55, 11, 'installment', 2, 150150.00, 1, NULL, '95fd475c-ba7b-4274-a8d5-5dd3832355ab', 'verified', '2026-06-29 08:29:20', NULL, '2026-06-29 08:29:20', '2026-06-29 08:29:20'),
	(56, 12, 'installment', 1, 370050.00, 1, NULL, 'b3256f77-024e-45d5-9f20-a8be48b482e6', 'verified', '2026-03-27 09:05:46', NULL, '2026-03-27 09:05:46', '2026-03-27 09:05:46'),
	(57, 12, 'installment', 2, 370050.00, 1, NULL, '9db2b413-3723-497c-a237-1264dc1b1803', 'verified', '2026-04-27 09:19:22', NULL, '2026-04-27 09:19:22', '2026-04-27 09:19:22'),
	(58, 12, 'installment', 3, 370050.00, 1, NULL, '26ac0713-a6be-4414-9947-89dca83c73f9', 'verified', '2026-05-27 09:20:20', NULL, '2026-05-27 09:20:20', '2026-05-27 09:20:20'),
	(59, 12, 'installment', 4, 370050.00, 1, NULL, '81e4aede-c5f9-44b4-9018-ef441594662d', 'verified', '2026-06-27 09:20:58', NULL, '2026-06-27 09:20:58', '2026-06-27 09:20:58'),
	(60, 12, 'installment', 5, 370050.00, 1, NULL, '930fd605-997e-4ed0-90de-87c5a0e99e12', 'verified', '2026-07-20 09:21:42', NULL, '2026-07-20 09:21:42', '2026-07-20 09:21:42'),
	(61, 13, 'installment', 1, 630000.00, 1, NULL, '5473e2e1-f579-4aa1-8755-550c1c8d6a9d', 'verified', '2025-12-21 09:43:56', NULL, '2025-12-21 09:43:56', '2025-12-21 09:43:56'),
	(62, 13, 'installment', 2, 630000.00, 1, NULL, NULL, 'verified', '2026-01-20 17:00:00', 'Pembayaran Angsuran ke-2', '2026-01-21 05:54:05', '2026-01-21 05:54:05'),
	(63, 13, 'installment', 3, 630000.00, 1, NULL, NULL, 'verified', '2026-02-20 17:00:00', 'Pembayaran Angsuran ke-3', '2026-02-21 05:54:13', '2026-02-21 05:54:13'),
	(64, 13, 'installment', 4, 630000.00, 1, NULL, 'dc4f1d30-9c9a-4d14-a1e5-41f919af077c', 'verified', '2026-03-22 05:57:27', NULL, '2026-03-22 05:57:27', '2026-03-22 05:57:27'),
	(65, 13, 'installment', 5, 630000.00, 1, NULL, 'f884cd14-98a5-4eb8-9992-26a373fa458b', 'verified', '2026-04-21 05:57:52', NULL, '2026-04-21 05:57:52', '2026-04-21 05:57:52'),
	(66, 13, 'installment', 6, 630000.00, 1, NULL, '8547a1cc-cad0-46ea-989b-247b11bf8cf1', 'verified', '2026-05-21 05:58:26', NULL, '2026-05-21 05:58:26', '2026-05-21 05:58:26'),
	(67, 13, 'installment', 7, 630000.00, 1, NULL, 'f2655c76-cf0b-4a9b-940b-c2eadcb21e25', 'verified', '2026-06-21 05:59:09', NULL, '2026-06-21 05:59:09', '2026-06-21 05:59:09'),
	(68, 14, 'installment', 1, 288750.00, 1, NULL, '17d680ad-2b97-47f7-9aad-03ba378f3f87', 'verified', '2026-04-20 06:06:12', NULL, '2026-04-20 06:06:12', '2026-04-20 06:06:12'),
	(69, 14, 'installment', 2, 288750.00, 1, NULL, '1def8555-d7c5-4501-8226-e92074f5d13f', 'verified', '2026-05-20 06:10:38', NULL, '2026-05-20 06:10:38', '2026-05-20 06:10:38'),
	(70, 14, 'installment', 3, 288750.00, 1, NULL, '4662a321-0860-4694-b5e7-da6c2ead627c', 'verified', '2026-06-20 06:11:24', NULL, '2026-06-20 06:11:24', '2026-06-20 06:11:24'),
	(71, 14, 'installment', 4, 288750.00, 1, NULL, '3b36f441-0701-4743-8ce9-d6a6d000d846', 'verified', '2026-07-22 06:17:11', NULL, '2026-07-22 06:16:19', '2026-07-22 06:17:11'),
	(72, 15, 'installment', 1, 349950.00, 1, NULL, '66cb2bc6-c59e-4a2e-8bec-4deeb40a2f23', 'verified', '2026-03-16 06:33:05', NULL, '2026-03-16 06:33:05', '2026-03-16 06:33:05'),
	(73, 15, 'installment', 2, 349950.00, 1, NULL, '0e63d9ba-b79f-42ec-a9aa-04287a871c37', 'verified', '2026-04-16 06:36:29', NULL, '2026-04-16 06:36:29', '2026-04-16 06:36:29'),
	(74, 15, 'installment', 3, 349950.00, 1, NULL, '69fbd716-084c-43a4-9934-fe3138c4c381', 'verified', '2026-05-16 06:36:56', NULL, '2026-05-16 06:36:56', '2026-05-16 06:36:56'),
	(75, 15, 'installment', 4, 349950.00, 1, NULL, '631c44f4-5a47-48e8-8db3-41abcfb0aaf7', 'verified', '2026-06-16 06:37:16', NULL, '2026-05-16 06:36:56', '2026-05-16 06:36:56'),
	(76, 15, 'installment', 5, 349950.00, 1, NULL, '1760da7a-c2f2-4de9-96ad-88e5bc217518', 'verified', '2026-07-16 06:37:44', NULL, '2026-07-16 06:37:44', '2026-07-16 06:37:44'),
	(77, 16, 'installment', 1, 338250.00, 1, NULL, '83222fd9-e290-4b3c-8cd6-653504a28610', 'verified', '2026-07-23 19:33:28', NULL, '2026-07-23 19:31:40', '2026-07-23 19:33:28'),
	(78, 16, 'installment', 2, 50000.00, 1, NULL, NULL, 'verified', '2026-07-23 17:00:00', 'Pembayaran Angsuran ke-2', '2026-07-23 19:36:18', '2026-07-23 19:36:18'),
	(79, 16, 'installment', 3, 1000000.00, 1, NULL, NULL, 'verified', '2026-07-23 17:00:00', 'Pembayaran Angsuran ke-3', '2026-07-23 19:37:10', '2026-07-23 19:37:10'),
	(80, 17, 'installment', 1, 894700.00, 1, NULL, 'ca13751f-5ef0-42d6-a703-64343af07f1f', 'verified', '2026-08-03 06:46:18', NULL, '2026-08-03 06:45:39', '2026-08-03 06:46:18');

-- Dumping structure for table toko_haji_db.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `custom_options` json DEFAULT NULL,
  `price` decimal(15,2) NOT NULL,
  `stock` int unsigned NOT NULL DEFAULT '0',
  `minimum_stock` int NOT NULL DEFAULT '5',
  `category_id` bigint unsigned NOT NULL,
  `weight` int unsigned NOT NULL COMMENT 'in grams',
  `specifications` json DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT '0',
  `is_published` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_unique` (`slug`),
  UNIQUE KEY `products_sku_unique` (`sku`),
  KEY `products_category_id_foreign` (`category_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.products: ~17 rows (approximately)
INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `description`, `custom_options`, `price`, `stock`, `minimum_stock`, `category_id`, `weight`, `specifications`, `is_featured`, `is_published`, `created_at`, `updated_at`) VALUES
	(1, 'Mesin Cuci - Sharp  - 90', 'mesin-cuci-sharp-90', 'HJE-MCS-001', NULL, NULL, 2340000.00, 0, 5, 1, 24999, '{"Merk": "Sharp", "Tipe": "T 90 MW", "Ukuran": "9 Kg"}', 0, 1, '2026-03-10 01:45:52', '2026-07-23 12:08:50'),
	(2, 'Mesin Cuci - LG - 905', 'mesin-cuci-lg-905', 'HJE-MCL-001', NULL, NULL, 2730000.00, 0, 5, 1, 29998, '{"Merk": "LG", "Tipe": "905", "Ukuran": "9 Kg"}', 0, 1, '2026-04-12 00:21:42', '2026-07-23 12:08:50'),
	(3, 'Kulkas Sharp', 'kulkas-sharp', 'HJE-KKS-001', NULL, '[{"name": "Tipe", "options": ["167 Mg", "185 Mg", "187 Mg", "197 Mg", "237 Mg", "236 Nm"]}]', 0.00, 5, 5, 1, 0, '{"Merk": "Sharp"}', 0, 1, '2026-03-01 00:32:52', '2026-07-23 19:27:51'),
	(4, 'Lemari Kain Plat Besi 1.5 4 Pintu', 'lemari-kain-plat-besi', 'HJE-LKPB-001', 'Lemari Kain Anti Rayap', NULL, 2910000.00, 1, 5, 2, 60000, '{"Merk": "Import", "Tipe": "Sliding 3 Pintu", "Ukuran": "180 x 120"}', 0, 1, '2025-10-10 07:54:27', '2026-07-23 12:08:50'),
	(5, 'Smart Phone Realme C55', 'smart-phone-realme-c55', 'HJE-SPR-001', 'Smart Phone Realme', NULL, 2500000.00, 0, 5, 1, 1000, '{"Merk": "Realme", "Varian": "C55", "Spesifikasi": "6/128 Gb"}', 0, 1, '2025-10-10 10:53:20', '2026-07-23 12:08:50'),
	(6, 'Lemari Sudut', 'lemari-sudut', 'HJE-LSJ-001', 'Lemari Sudut Kokoh Berbahan Jati', NULL, 2550000.00, 0, 5, 2, 70000, '{"Tipe": "Jati", "Ukuran": "200 x 60 cm"}', 0, 1, '2025-10-12 04:39:04', '2026-07-23 12:08:50'),
	(7, 'Lemari Hias Singapur', 'lemari-hias-singapur', 'HJE-LHS-001', 'Lemari Hias Impor Impian Anda', NULL, 5455000.00, 0, 5, 2, 70000, '{"Tipe": "Singapur", "Ukuran": "200 x 190"}', 0, 1, '2025-10-20 04:43:27', '2026-07-23 12:08:50'),
	(8, 'Lemari Kain Plat Besi 1.2', 'lemari-kain-plat-besi-12', 'HJE-LKPB-002', 'Lemari Kain Ukuran Ekonomis', NULL, 2305000.00, 0, 5, 2, 50000, '{"Merk": "Lokal", "Tipe": "Sliding", "Ukuran": "120 x 190"}', 0, 1, '2025-10-26 06:37:26', '2026-07-23 12:08:50'),
	(9, 'Matras Kangoroo Chiko', 'matras-kangoroo-chiko', 'HJE-MOCU-001', 'Matras Empuk Kangoroo Harga Terjangkau', '[{"name": "Varian", "options": ["Union", "Nippon"]}, {"name": "Ukuran", "options": ["180x200", "160x200"]}]', 1636364.00, 0, 5, 2, 30000, '{"Merk": "Kangoroo", "Ukuran": "180x200,160x200", "Tipe/Varian": "Union/Nippon"}', 0, 1, '2025-10-23 06:37:26', '2026-07-23 12:08:50'),
	(10, 'Lemari Kaca Piring 4 Pintu 1.5', 'lemari-kaca-piring-4-pintu-15', 'HJE-LKP-001', 'Lemari Kaca Piring Anti Karat, Untuk Variasi Warna SIlahkan Diskusi kan dengan Admin via Chat', NULL, 2680000.00, 0, 5, 2, 39999, '{"Merk": "Lokal Pekanbaru", "Warna": "Hitam/Pink/Oranye/Biru DLL", "Ukuran": "190x150", "Varian": "Tipe 1, Tipe 2"}', 0, 1, '2025-01-01 08:20:30', '2026-07-23 12:08:50'),
	(11, 'Lemari TV Olympic', 'lemari-tv-olympic', 'HJE-LTV-001', 'Lemari TV Besar Dan mewah', NULL, 2425000.00, 0, 5, 2, 100000, '{"Merk": "Olympic", "Ukuran": "180x195"}', 0, 1, '2026-07-21 05:49:54', '2026-07-23 12:08:50'),
	(12, 'Dipan Spring Bed', 'dipan-spring-bed', 'HJE-DSB-001', 'Dipan Kualitas Mantap Buatan Lokal Pekanbaru, Untuk Warna Silahkan Konfirmasi dengan Admin Via Chat', '[{"name": "Ukuran", "options": ["120x200", "160x200", "180x200"]}]', 0.00, 19, 5, 2, 25000, '{"Merk": "Lokal Pekanbaru", "Ukuran": "120x200/160x200/180x200"}', 0, 1, '2026-05-01 06:59:11', '2026-07-21 08:23:12'),
	(13, 'Lemari Plastik OTC', 'lemari-plastik-otc', 'HJE-LPO-001', 'Lemari Kain Plastik elegan Premium', '[{"name": "Ukuran", "options": ["2 Pintu", "3 Pintu"]}, {"name": "Varian", "options": ["Klasik", "Modern"]}]', 0.00, 9, 5, 2, 0, '{"Merk": "OTC", "Varian": "Klasik/Modern"}', 0, 1, '2026-03-01 08:49:30', '2026-08-03 06:21:53'),
	(14, 'Ac Dinding LG', 'ac-dinding-lg', 'HJE-AC-001', 'AC  Berkualitas Tinggi DI jamin SUper Dingin', '[{"name": "Ukuran", "options": ["1/2 Pk", "1 Pk"]}]', 0.00, 0, 5, 1, 0, '{"Merk": "LG", "Ukuran": "1/2 Pk, 1 Pk, 2 Pk"}', 0, 1, '2025-12-12 09:39:04', '2026-07-21 09:43:56'),
	(15, 'Lemari Kain Plat Besi 1.5 2 Pintu', 'lemari-kain-plat-besi-15-3-pintu', 'HJE-LKPB-003', 'Varian 3 Pintu Elegan Sliding Lebar', NULL, 2848485.00, 0, 5, 2, 60000, '{"Merk": "Import", "Ukuran": "3 Pintu 1.5 Meter"}', 0, 1, '2026-02-01 07:10:01', '2026-07-23 12:08:50'),
	(16, 'Matras Olympic Eero', 'matras-olympic-eero', 'HJE-MOE-001', 'Matras Kualitas Tinggi Empuk dan Nyaman', NULL, 2303030.00, 0, 5, 2, 35000, '{"Merk": "Olympic", "Tipe": "Eero", "Ukuran": "180 x 200"}', 0, 1, '2026-01-01 07:15:56', '2026-07-23 12:08:50'),
	(17, 'Set Sofa Beludru', 'set-sofa-beludru', 'HJE-SSB-001', 'Sofa Nyaman Lembut Empuk Halus', NULL, 3333333.00, 0, 5, 2, 20000, '{"Merk": "Lokal Pekanbaru"}', 0, 1, '2026-03-15 11:23:34', '2026-07-23 15:36:11');

-- Dumping structure for table toko_haji_db.product_images
CREATE TABLE IF NOT EXISTS `product_images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Path penyimpanan file gambar',
  `display_order` tinyint unsigned NOT NULL DEFAULT '1' COMMENT 'Urutan tampil gambar',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_images_product_id_foreign` (`product_id`),
  CONSTRAINT `product_images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.product_images: ~20 rows (approximately)
INSERT INTO `product_images` (`id`, `product_id`, `image_path`, `display_order`, `created_at`, `updated_at`) VALUES
	(1, 1, 'products/ktAazkJDIT4LOiQaa7w57S34Q1EYIl5m6Px1KC39.jpg', 1, '2026-06-30 22:04:02', '2026-06-30 22:04:02'),
	(2, 2, 'products/xBcnY3xHrfE9g5yqksgjC8Q78lK4XZLTslgzLaxX.jpg', 1, '2026-07-01 00:23:18', '2026-07-01 00:23:18'),
	(3, 3, 'products/qmllGDExmHwy7rVKBNDueZ6KnZQ6FOH8oDZzgzVs.webp', 1, '2026-07-01 00:35:48', '2026-07-01 00:35:48'),
	(4, 3, 'products/VLPwrzMeHDNjtEoE3YSrXJpPYcfvxoeOuJBswLkO.webp', 1, '2026-07-01 00:35:48', '2026-07-01 00:35:48'),
	(5, 3, 'products/GwmGatVbjgJggcecYs2jfwIJG9GWiKAdBaqPwXB7.webp', 1, '2026-07-01 00:35:48', '2026-07-01 00:35:48'),
	(7, 5, 'products/igAjqpJrNVAax4vhfMultJ1R9eCrHfn1z9X899P4.jpg', 1, '2026-07-16 10:53:21', '2026-07-16 10:53:21'),
	(8, 6, 'products/76j63Y5XmzxWbAtzspSzwfCXoZqTR9h8ZoQ0WWip.webp', 1, '2026-07-20 04:39:05', '2026-07-20 04:39:05'),
	(9, 7, 'products/GJsviyjcWFRKIKXbEYVIbsZ3n67dzEMWa6Wntuz8.png', 1, '2026-07-20 04:43:27', '2026-07-20 04:43:27'),
	(11, 8, 'products/zDULcHwYh0VPSMY525zEI2plKkMddI9X6BJJR3VC.jpg', 1, '2026-07-20 06:23:33', '2026-07-20 06:23:33'),
	(12, 9, 'products/CQhrb6BDIKIgE0INGdRT3Kco1wBCqAS4usMW101W.jpg', 1, '2026-07-20 06:36:40', '2026-07-20 06:36:40'),
	(13, 9, 'products/NsstpYXfCwldtuJNIpBT9A4IReYlLHcaJMqAdeFA.jpg', 1, '2026-07-20 06:36:40', '2026-07-20 06:36:40'),
	(14, 10, 'products/5KgJwl163kVkuWg1jTfhxvh76kqmSv26O3hr5U3y.png', 1, '2026-07-20 08:20:30', '2026-07-20 08:20:30'),
	(15, 10, 'products/11HaqdU1D4VQdsISqsm5pg0I1htoWoNoHtZitSh5.jpg', 1, '2026-07-20 08:20:30', '2026-07-20 08:20:30'),
	(16, 11, 'products/RS2WIQuyLUyhZvWBm3C3Lxzu3Mxra8832UKcLzxh.png', 1, '2026-07-21 05:49:54', '2026-07-21 05:49:54'),
	(17, 12, 'products/UR2sLz7cFKiEBIP1GmwZcGmU7K3MjJbUY0AywOPw.png', 1, '2026-07-21 06:59:12', '2026-07-21 06:59:12'),
	(18, 13, 'products/0vxrCu1531K0x7R38CJZV31JTBDJqDMAeWntq68u.png', 1, '2026-07-21 08:49:30', '2026-07-21 08:49:30'),
	(19, 13, 'products/iF6hxQMHubgajtpmGydgBzMMVHVxBsVdqsxXg2Aq.png', 1, '2026-07-21 08:49:30', '2026-07-21 08:49:30'),
	(20, 14, 'products/Y3eiKzlkc0Z7HWjaiVFE33SMjiY32yWsWkqqLwzh.png', 1, '2026-07-21 09:39:04', '2026-07-21 09:39:04'),
	(21, 4, 'products/IZZ4Oe9yB8APdIjWN55yLva27S3IhGu9KZr5eqkt.png', 1, '2026-07-22 07:05:16', '2026-07-22 07:05:16'),
	(23, 16, 'products/u84wsjgwcuxn7VJqQDdJbuPLwsKvfnGzJG5pothY.png', 1, '2026-07-22 07:15:56', '2026-07-22 07:15:56'),
	(24, 15, 'products/fc9mfeABiQnsD7AxCpOAjWtz2nyrzQdKcKhF5jnP.png', 1, '2026-07-22 16:27:02', '2026-07-22 16:27:02'),
	(25, 17, 'products/KjOmvdOuaL1oMJX4gWhqWSLWx3aEWd3Ge2KX6fHv.png', 1, '2026-07-23 11:23:35', '2026-07-23 11:23:35');

-- Dumping structure for table toko_haji_db.product_returns
CREATE TABLE IF NOT EXISTS `product_returns` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `order_item_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `proof_image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','processing','completed','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_returns_order_id_foreign` (`order_id`),
  KEY `product_returns_order_item_id_foreign` (`order_item_id`),
  KEY `product_returns_user_id_foreign` (`user_id`),
  CONSTRAINT `product_returns_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_returns_order_item_id_foreign` FOREIGN KEY (`order_item_id`) REFERENCES `order_items` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_returns_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.product_returns: ~0 rows (approximately)

-- Dumping structure for table toko_haji_db.product_variants
CREATE TABLE IF NOT EXISTS `product_variants` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `sku` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `weight` int NOT NULL DEFAULT '0',
  `options` json NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_variants_product_id_foreign` (`product_id`),
  CONSTRAINT `product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.product_variants: ~19 rows (approximately)
INSERT INTO `product_variants` (`id`, `product_id`, `sku`, `price`, `stock`, `weight`, `options`, `created_at`, `updated_at`) VALUES
	(1, 3, NULL, 1750000.00, 0, 30000, '{"Tipe": "167 Mg"}', '2026-07-01 00:32:52', '2026-07-23 12:08:50'),
	(2, 3, NULL, 2050000.00, 0, 30000, '{"Tipe": "185 Mg"}', '2026-07-01 00:32:52', '2026-07-23 19:27:51'),
	(3, 3, NULL, 2122000.00, 2, 30000, '{"Tipe": "187 Mg"}', '2026-07-01 00:32:52', '2026-07-23 12:08:50'),
	(4, 3, NULL, 2100000.00, 1, 35000, '{"Tipe": "197 Mg"}', '2026-07-01 00:32:52', '2026-07-23 12:08:50'),
	(5, 3, NULL, 3100000.00, 2, 35000, '{"Tipe": "237 Mg"}', '2026-07-01 00:32:52', '2026-07-23 12:08:50'),
	(6, 3, NULL, 3000000.00, 1, 35000, '{"Tipe": "236 Nm"}', '2026-07-01 00:32:52', '2026-07-23 12:08:50'),
	(7, 9, NULL, 1760000.00, 0, 30000, '{"Ukuran": "180x200", "Varian": "Union"}', '2026-07-20 06:36:40', '2026-07-23 12:08:50'),
	(8, 9, NULL, 1636364.00, 0, 30000, '{"Ukuran": "160x200", "Varian": "Union"}', '2026-07-20 06:36:40', '2026-07-23 12:08:50'),
	(9, 9, NULL, 1409091.00, 0, 30000, '{"Ukuran": "180x200", "Varian": "Nippon"}', '2026-07-20 06:36:40', '2026-07-23 12:08:50'),
	(10, 9, NULL, 1409091.00, 0, 30000, '{"Ukuran": "160x200", "Varian": "Nippon"}', '2026-07-20 06:36:40', '2026-07-23 12:08:50'),
	(11, 12, NULL, 909091.00, 5, 25000, '{"Ukuran": "160x200"}', '2026-07-21 06:59:12', '2026-07-23 12:08:50'),
	(12, 12, NULL, 909091.00, 10, 25000, '{"Ukuran": "180x200"}', '2026-07-21 06:59:12', '2026-07-23 12:08:51'),
	(13, 12, NULL, 600091.00, 4, 20000, '{"Ukuran": "120x200"}', '2026-07-21 07:04:40', '2026-07-23 12:08:51'),
	(14, 13, NULL, 1636364.00, 2, 15000, '{"Ukuran": "2 Pintu", "Varian": "Klasik"}', '2026-04-01 08:49:30', '2026-07-23 12:08:51'),
	(15, 13, NULL, 1515152.00, 2, 15000, '{"Ukuran": "2 Pintu", "Varian": "Modern"}', '2026-04-01 08:49:30', '2026-07-23 12:08:51'),
	(16, 13, NULL, 2242424.00, 3, 20000, '{"Ukuran": "3 Pintu", "Varian": "Klasik"}', '2026-04-01 08:49:30', '2026-07-23 12:08:51'),
	(17, 13, NULL, 2121212.00, 2, 20000, '{"Ukuran": "3 Pintu", "Varian": "Modern"}', '2026-04-01 08:49:30', '2026-08-03 06:21:53'),
	(18, 14, NULL, 3181818.00, 0, 25000, '{"Ukuran": "1/2 Pk"}', '2026-07-21 09:39:04', '2026-07-23 12:08:51'),
	(19, 14, NULL, 3818182.00, 0, 25000, '{"Ukuran": "1 Pk"}', '2026-07-21 09:39:04', '2026-07-23 12:08:51');

-- Dumping structure for table toko_haji_db.restock_requests
CREATE TABLE IF NOT EXISTS `restock_requests` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `requested_quantity` int NOT NULL,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `product_variant_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `restock_requests_product_id_foreign` (`product_id`),
  KEY `restock_requests_user_id_foreign` (`user_id`),
  KEY `restock_requests_product_variant_id_foreign` (`product_variant_id`),
  CONSTRAINT `restock_requests_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `restock_requests_product_variant_id_foreign` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`) ON DELETE SET NULL,
  CONSTRAINT `restock_requests_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.restock_requests: ~36 rows (approximately)
INSERT INTO `restock_requests` (`id`, `product_id`, `user_id`, `requested_quantity`, `status`, `notes`, `created_at`, `updated_at`, `product_variant_id`) VALUES
	(1, 1, 1, 1, 'approved', NULL, '2026-03-10 05:27:04', '2026-03-10 05:27:45', NULL),
	(2, 3, 1, 1, 'approved', NULL, '2026-03-16 00:42:11', '2026-07-01 00:44:03', 5),
	(3, 3, 1, 1, 'approved', NULL, '2026-03-17 00:48:32', '2026-07-01 00:50:53', 3),
	(4, 3, 1, 1, 'approved', NULL, '2026-03-17 00:48:49', '2026-07-01 00:53:37', 6),
	(5, 3, 1, 1, 'approved', NULL, '2026-03-19 00:49:09', '2026-07-01 00:54:52', 1),
	(6, 3, 1, 1, 'approved', NULL, '2026-03-29 00:49:22', '2026-07-01 00:55:39', 4),
	(7, 3, 1, 1, 'approved', NULL, '2026-04-02 00:49:53', '2026-07-01 00:58:02', 5),
	(8, 3, 1, 1, 'approved', NULL, '2026-04-02 00:50:09', '2026-07-01 00:58:50', 2),
	(9, 3, 1, 2, 'approved', NULL, '2026-07-01 00:50:21', '2026-07-01 00:59:54', 3),
	(10, 2, 1, 1, 'approved', NULL, '2026-07-01 13:28:06', '2026-07-20 07:26:07', NULL),
	(11, 4, 1, 1, 'approved', NULL, '2025-10-15 07:54:13', '2025-10-15 07:54:13', NULL),
	(12, 5, 1, 1, 'approved', NULL, '2025-10-10 10:53:41', '2025-10-10 10:53:41', NULL),
	(13, 6, 1, 1, 'approved', NULL, '2025-10-20 04:45:25', '2025-10-20 04:45:25', NULL),
	(14, 4, 1, 1, 'pending', NULL, '2026-03-15 04:45:30', '2026-03-15 04:45:30', NULL),
	(15, 7, 1, 1, 'approved', NULL, '2025-10-15 04:46:09', '2025-10-15 04:46:09', NULL),
	(16, 8, 1, 1, 'approved', NULL, '2025-10-26 06:23:44', '2025-10-26 06:23:44', NULL),
	(17, 9, 1, 1, 'approved', NULL, '2025-10-23 06:36:53', '2025-10-23 06:36:53', 7),
	(18, 10, 1, 1, 'approved', NULL, '2026-02-15 08:21:33', '2026-02-15 08:21:33', NULL),
	(19, 9, 1, 1, 'approved', NULL, '2026-04-20 06:36:53', '2026-04-20 06:36:53', 7),
	(20, 11, 1, 1, 'approved', NULL, '2026-03-20 05:50:07', '2026-03-20 05:50:07', NULL),
	(21, 12, 1, 3, 'approved', NULL, '2026-05-15 07:05:17', '2026-05-15 07:05:17', 11),
	(22, 12, 1, 5, 'approved', NULL, '2026-05-15 07:05:17', '2026-05-15 07:05:17', 12),
	(23, 12, 1, 2, 'approved', NULL, '2026-05-15 07:05:17', '2026-05-15 07:05:17', 13),
	(24, 12, 1, 3, 'approved', NULL, '2026-06-20 07:08:25', '2026-06-20 07:08:25', 11),
	(25, 12, 1, 5, 'approved', NULL, '2026-06-20 07:08:25', '2026-06-20 07:08:25', 12),
	(26, 12, 1, 2, 'approved', NULL, '2026-06-20 07:08:25', '2026-06-20 07:08:25', 13),
	(27, 13, 1, 2, 'approved', NULL, '2026-04-10 08:55:16', '2026-04-10 08:55:16', 14),
	(28, 13, 1, 2, 'approved', NULL, '2026-04-10 08:55:16', '2026-04-10 08:55:16', 15),
	(29, 13, 1, 3, 'approved', NULL, '2026-04-10 08:55:16', '2026-04-10 08:55:16', 16),
	(30, 13, 1, 3, 'approved', NULL, '2026-04-10 08:55:16', '2026-04-10 08:55:16', 17),
	(31, 13, 1, 1, 'approved', NULL, '2026-03-14 09:12:14', '2026-03-14 09:12:14', 16),
	(32, 14, 1, 1, 'approved', NULL, '2025-12-21 09:43:56', '2025-12-21 09:43:56', 19),
	(33, 3, 1, 1, 'approved', NULL, '2026-03-20 06:04:29', '2026-03-20 06:04:29', 1),
	(34, 4, 1, 1, 'approved', NULL, '2026-03-01 06:49:40', '2026-03-01 06:49:40', NULL),
	(35, 15, 1, 1, 'approved', NULL, '2026-02-01 07:10:01', '2026-02-01 07:10:01', NULL),
	(36, 16, 1, 1, 'approved', NULL, '2026-01-01 07:15:56', '2026-01-01 07:15:56', NULL),
	(37, 17, 1, 1, 'approved', NULL, '2026-03-15 11:23:34', '2026-03-15 11:23:34', NULL);

-- Dumping structure for table toko_haji_db.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.sessions: ~2 rows (approximately)
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
	('NnS0GnFXiUH5MkPbuP4RymfIdPUG0RhactpEc9Wt', 13, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiOVhneGozUEg1Z292VjZaTUk2MVBtdTlVbmF1OXJTODdrT05EcXJ5YSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTM7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDA6Imh0dHA6Ly9wcm9qZWN0X3Rva29idWhhamkudGVzdC9vcmRlcnMvMTkiO319', 1785765454),
	('Sp3STYggMdGQFmVOP6w5k2v8ZimTni1yCtBjBD9Y', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiWHpPOFhpTGF3bW5UNTJMYkFhWG9oYThDeDBoU2RVc3ZWVVBhSGdVTSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTc6Imh0dHA6Ly9wcm9qZWN0X3Rva29idWhhamkudGVzdC9hZG1pbi9maW5hbmNlL2luc3RhbGxtZW50cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1785765402);

-- Dumping structure for table toko_haji_db.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','customer') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'customer',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.users: ~55 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `role`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'administrator', 'admin@gmail.com', 'admin', '2025-12-21 06:59:17', '$2y$12$ksmeqtKJIud./2Z31BfsnON2jVWZ/KsUsNSpXZmvH0unnqjUx2u02', 'DyFqJgRy7uAqpJcHg95PIvlsjjnXpGC8OlRefhjLaS0gjsS9bO0kaRzapfFE', '2025-12-21 06:59:18', '2025-12-21 06:59:18'),
	(12, 'Jeni', 'jeni18@gmail.com', 'customer', NULL, '$2y$12$XegP/F7xHDq00TCldjyct.08uuUeG4mOjnSuDUCjGMduVapMwnEAK', NULL, '2026-03-18 05:31:17', '2026-07-22 05:48:49'),
	(13, 'Juwita', 'juwita10@gmail.com', 'customer', NULL, '$2y$12$tbVSU.PNp0DY2dB6SDcDXOOLShMH7ZuMTCwDOKrcwmnX7uNg9rDYS', NULL, '2026-04-10 08:47:25', '2026-07-22 05:48:49'),
	(14, 'Mawar', 'mawar26@gmail.com', 'customer', NULL, '$2y$12$u/Tihb.w8szYr9yjyY735e6Dq23XZJ7aEUqAoRX637GbKCF12HLVi', NULL, '2026-06-22 23:16:06', '2026-06-22 23:16:06'),
	(15, 'Irma', 'irma02@gmail.com', 'customer', NULL, '$2y$12$DTwAX2vHwY7s.lnaZPy5J.ihaITsnjb.TA.gkUYje5JWYHeUOkV9W', NULL, '2026-05-02 07:31:32', '2026-07-22 05:48:49'),
	(16, 'Betti', 'betti04@gmail.com', 'customer', NULL, '$2y$12$FxHF7r6ydPg9ORxcdz/RKeThIHubHFv0RtV2UrIAChDeGi/4wlNeK', NULL, '2026-06-22 23:18:33', '2026-06-22 23:18:33'),
	(17, 'Yati', 'yati28@gmail.com', 'customer', NULL, '$2y$12$56S/caXPwStKRApCKRQpSeEbnaQf5SHl8wOsTSNL4RuvQN7hgSg82', NULL, '2026-04-28 09:03:05', '2026-07-22 05:48:49'),
	(18, 'Adi Ketua', 'adi14@gmail.com', 'customer', NULL, '$2y$12$/ogRrTEb.CDgnMZJaT3AreM3vVM9MbZr61BUjoJq/t/4SnkSYnPZ6', NULL, '2026-06-14 05:58:59', '2026-07-22 05:48:49'),
	(19, 'WIji', 'wiji29@gmail.com', 'customer', NULL, '$2y$12$iWe0N83rfEng9sSiNVQUbuwxbM6ey9vHyhzlE41tEyyqMiTPp0gGu', NULL, '2026-05-29 06:12:18', '2026-07-22 05:48:49'),
	(20, 'Sukardi', 'sukardi29@gmail.com', 'customer', NULL, '$2y$12$x1kFGFuIoCwfTQWzUTOh4OTSrcD1dZKyMOFD3JWT5tcNn3fAdElnO', NULL, '2026-05-29 08:23:12', '2026-07-22 05:48:49'),
	(21, 'Wawa', 'wawan20@gmail.com', 'customer', NULL, '$2y$12$ZVUFBA8JtzztbvaRzeb7G.hydN7R6Y7HI94QjQuY43A1SN5gN5K7u', NULL, '2026-06-22 23:27:09', '2026-06-22 23:27:09'),
	(22, 'Eka Puspita', 'eka01@gmail.com', 'customer', NULL, '$2y$12$C935YLCHtGlO49Z/fDH/ae65yFYy2gvZKjSkTZzFxJ3.bCrj2A5iu', NULL, '2026-06-22 23:29:06', '2026-06-22 23:29:06'),
	(23, 'Andi Rusa', 'andi16@gmail.com', 'customer', NULL, '$2y$12$fEj4noQxUeBK7x5kVdgvE./of6ZHcQ5S4MbyhhdWXtnvWeoiXyCAW', NULL, '2026-06-22 23:33:30', '2026-06-22 23:33:30'),
	(24, 'Hadiono', 'hadiono15@gmail.com', 'customer', NULL, '$2y$12$.ZG5EuS2uAXilEdikqHDt.opCFckRpj5z5JruWBZSnhQ5YUzdJHZG', NULL, '2026-06-22 23:34:35', '2026-06-22 23:34:35'),
	(25, 'Rika', 'rika16@gmail.com', 'customer', NULL, '$2y$12$HUwvUgHhaHyzHeBk5RvrQ.I4bqRMQFvkrO1usEUsQzOEIz0chxQXq', NULL, '2026-06-22 23:35:18', '2026-06-22 23:35:18'),
	(26, 'Warningsi', 'warningsi18@gmail.com', 'customer', NULL, '$2y$12$oldoMbSKpP.KWpZl21gA3OtMy59tK2n/ugQXdIA67utfGrGh179uW', NULL, '2026-06-22 23:37:16', '2026-06-22 23:37:16'),
	(27, 'Santi Maris', 'santi20@gmail.com', 'customer', NULL, '$2y$12$Z7v1JUboIon0FHh51b96lun.tBOmfLm4YVqnsdEMTuZbKEXRTbaHi', NULL, '2026-06-22 23:38:25', '2026-06-22 23:38:25'),
	(28, 'Radi', 'radi21@gmail.com', 'customer', NULL, '$2y$12$CO/NLuo7/NAWHNtHH6f70eYGlOKHPsvRokPQQuGE.QvBWDpSzA0yu', NULL, '2025-12-21 09:43:56', '2026-07-22 05:48:49'),
	(29, 'mistar', 'mistar27@gmail.com', 'customer', NULL, '$2y$12$s1jc7fE5MCtKo38tXv66seYknfpNdspwCmdeV8U78Hay8QhkUIcw6', NULL, '2026-03-27 09:05:46', '2026-07-22 05:48:49'),
	(30, 'Joko Ririn', 'joko08@gmail.com', 'customer', NULL, '$2y$12$ug5fVgvBJSP0JRII8DAHOOroM.ZledJ7xyo2CoV3zMLmpjx0K5kn.', NULL, '2026-06-22 23:47:42', '2026-06-22 23:47:42'),
	(31, 'Ismail', 'ismail12@gmail.com', 'customer', NULL, '$2y$12$ced.xuYJcurS8n6FP6AD2uWdRqc9XSRCx59U6ZipBdTaKFZvvkgna', NULL, '2026-06-22 23:48:34', '2026-06-22 23:48:34'),
	(32, 'Naenda', 'naenda12@gmail.com', 'customer', NULL, '$2y$12$Y3/5Rj0tNRcvWWx1j0ewb.p4w3XnX0DjMi14boSE03c2eWA9OdkQe', NULL, '2026-06-22 23:50:21', '2026-06-22 23:50:21'),
	(33, 'Purwanto', 'purwanto12@gmail.com', 'customer', NULL, '$2y$12$OkQ.OggaVeZb/tHWTbo4b.Yi8UlXUhfFWedlFKKlAnFki36EX1eDK', NULL, '2026-06-22 23:52:09', '2026-06-22 23:52:09'),
	(34, 'Susi Susanti', 'susi23@gmail.com', 'customer', NULL, '$2y$12$8TF4HO1jJjLDAvSQYY84ZelvnZAtweJBHMz/hwSgBxHla/dNXcKI2', NULL, '2026-06-22 23:53:26', '2026-06-22 23:53:26'),
	(35, 'Karsina', 'karsina18@gmail.com', 'customer', NULL, '$2y$12$DCtuUXdkhpgiOkYGAKlcXO4O550THKO7eaKXUbv10OY.f/pd/DYIS', NULL, '2026-06-22 23:54:16', '2026-06-22 23:54:16'),
	(36, 'Leha', 'leha27@gmail.com', 'customer', NULL, '$2y$12$o7Gl8Ank5omtvixEwVc6t.WVJDn5j/Hc.96ERh01rPHC2nzs1vciW', NULL, '2026-06-22 23:55:28', '2026-06-22 23:55:28'),
	(37, 'Yasmin', 'yasmin14@gmail.com', 'customer', NULL, '$2y$12$Ql7.oUVPnpJ3yWYNvj3LSu4BlfcDpLiVANrILmCgUxSlbjaiP2BxG', NULL, '2026-06-22 23:56:37', '2026-06-22 23:56:37'),
	(38, 'Saifah', 'saifah23@gmail.com', 'customer', NULL, '$2y$12$dZgQUUtjfQTy9U9.swS8NeXcxiDm/c98jlzx7JKNqVMt9W0AIs0G2', NULL, '2026-06-22 23:58:41', '2026-06-22 23:58:41'),
	(39, 'Hariyono', 'hariyono05@gmail.com', 'customer', NULL, '$2y$12$GtqWybP7mlK/e6lnrrPBv.Mjol930CmLLHm5oyLuATT95Is8T6mMu', NULL, '2026-06-22 23:59:41', '2026-06-22 23:59:41'),
	(40, 'Mariam', 'mariam06@gmail.com', 'customer', NULL, '$2y$12$uCb8bDYcTWLL1ZDUaj9x2.X48PuGiSlb/ALpwqrJa7WHlD6uKYoai', NULL, '2026-06-23 00:00:41', '2026-06-23 00:00:41'),
	(41, 'Dewi hasan', 'dewi10@gmail.com', 'customer', NULL, '$2y$12$.Nu/lqoIbiTrRrtqIzqQEessqwlxaSpRviOzkH7dVKqq2OMwmvwvi', NULL, '2026-06-23 00:03:11', '2026-06-23 00:03:11'),
	(42, 'Linda Kamil', 'linda10@gmail.com', 'customer', NULL, '$2y$12$RnxXGyp4iWe5F2te5auIEes9JQDO6202jGdH3Tn2loKHzkfpmA6ua', NULL, '2026-06-23 00:03:56', '2026-06-23 00:04:05'),
	(43, 'Dewi Sari', 'dewisari14@gmail.com', 'customer', NULL, '$2y$12$ZmpREv1Tt2JdDxuBLO2xR.xudiPeLKshV8ZiaZ8fCk68QIQn4ziTa', NULL, '2026-06-23 00:05:23', '2026-06-23 00:05:23'),
	(44, 'Nanik', 'nanik15@gmail.com', 'customer', NULL, '$2y$12$G0q70XFLoQ14cnB3KTfxjOjghrLCm2MHFKN0ydNUM/bCxSvAXwySG', NULL, '2026-06-23 00:06:09', '2026-06-23 00:06:09'),
	(45, 'Riki', 'riki15@gmail.com', 'customer', NULL, '$2y$12$UFAkhuuOGkNwycUhljp1g.qliutLBsIeAZo0JzRj8MGfojdHyhLSa', NULL, '2026-06-23 01:08:39', '2026-06-23 01:08:39'),
	(46, 'Tari', 'tari16@gmail.com', 'customer', NULL, '$2y$12$CRWUJgEhcPQRVtqFTEDs2OnA2f9yB.hQyM86Ko8z2O4edzmE4aQwO', NULL, '2026-06-23 01:09:24', '2026-06-23 01:09:24'),
	(47, 'Am Nita', 'amnita16@gmail.com', 'customer', NULL, '$2y$12$fGTbKPzQeQEGK5xBim2h9Owi9yAn6MtW17vPxn7.5IMd.715.h5Ny', NULL, '2026-06-23 01:12:57', '2026-06-23 01:12:57'),
	(48, 'Pendi Sayur', 'pendi10@gmail.com', 'customer', NULL, '$2y$12$eBp549haT5.jg0Fb37MOj.kfWPe9rAa7DlZZo.iiOund4yVWtF4ki', NULL, '2026-06-23 01:14:58', '2026-06-23 01:14:58'),
	(49, 'Elisa', 'elisa25@gmail.com', 'customer', NULL, '$2y$12$8geKEENMsATXJaBXszXAxunS1ulWFmlwU2v2QfVd3JkpJdDxXXBRK', NULL, '2026-06-23 01:15:56', '2026-06-23 01:15:56'),
	(50, 'Dedi', 'dedi26@gmail.com', 'customer', NULL, '$2y$12$TAIBI5dYhhRRegSrtjBLOewrp4rUbUb80GIRGwEuH/gbex.nLxbry', NULL, '2026-06-23 01:21:05', '2026-06-23 01:21:05'),
	(51, 'Zaimah', 'zaimah14@gmail.com', 'customer', NULL, '$2y$12$BAfV6MXqoZsw/GVMqAkmGuNQROCG20ExJBV9Q.pj4DB6PfyL5Z9V2', NULL, '2026-06-23 01:22:21', '2026-06-23 01:22:21'),
	(52, 'Rajar', 'rajar19@gmail.com', 'customer', NULL, '$2y$12$aRuLIvagc3BEJQMzqYpDKeDClOybbTAliRlGlAkvUZQyngkgYvYB2', NULL, '2026-06-23 01:26:05', '2026-06-23 01:26:05'),
	(53, 'Amir', 'amir27@gmail.com', 'customer', NULL, '$2y$12$44WKqGlEdZ8T9EyeRyRx/Ouo6BD5nYZSF9oqaGn6ZE9gw75OSbXG6', NULL, '2026-06-23 01:27:11', '2026-06-23 01:27:11'),
	(54, 'Rusdi', 'rusdi15@gmail.com', 'customer', NULL, '$2y$12$idfJBwLiEWlUy5fskNW29.RUU.3MJOsuis11mRMnFqcic2LChXqCK', NULL, '2026-06-23 01:28:07', '2026-06-23 01:28:07'),
	(55, 'Ade', 'ade22@gmail.com', 'customer', NULL, '$2y$12$lZ1mCW2JHx3PYtw2eQdvUOW6poqj8xmDVhKKrdqbZObFjPOXU6Qw6', NULL, '2026-06-23 01:31:00', '2026-06-23 01:31:00'),
	(56, 'Hendri', 'hendri23@gmail.com', 'customer', NULL, '$2y$12$xNUEw480y7YpFTJTuRM9b.va57SpQ0jpBQgq7WRwsrV8gPeDRwkH2', NULL, '2026-06-23 01:31:51', '2026-06-23 01:31:51'),
	(57, 'Lisa', 'lisa30@gmail.com', 'customer', NULL, '$2y$12$EA0xdx7RxejezvRXzTZcIOW5vRT8oFLmtpOU8PG6lln7XdVxyWY4K', NULL, '2026-06-23 01:32:56', '2026-06-23 01:32:56'),
	(58, 'Ujang', 'ujang01@gmail.com', 'customer', NULL, '$2y$12$VFW2SlTECtT8teyDh/eqNOTIcg7EC1JNzUPbGlN5IlDOOLlLoQuLW', NULL, '2026-06-23 01:33:33', '2026-06-23 01:33:33'),
	(59, 'Rahmad', 'rahmad05@gmail.com', 'customer', NULL, '$2y$12$lYYFCnu7kKENMlwix9G31edygK5mTJYSxp/ZRPm.xDbiYgw3qW9J2', NULL, '2026-06-23 01:34:23', '2026-06-23 01:34:23'),
	(60, 'Rozali', 'rozali10@gmail.com', 'customer', NULL, '$2y$12$Qp.ZX7x876kHZXlP0moMEuYYmT8Ct7zXlh0SjHpCo6FByspXfBbkO', NULL, '2026-06-23 01:35:09', '2026-06-23 01:35:09'),
	(61, 'Ru', 'ru18@gmail.com', 'customer', NULL, '$2y$12$dFMBfcqqnSkoHoHEYdeQ4u8VlmkFziV4Q4CuIb.6OMsyNTs/O2TJ.', NULL, '2026-06-23 01:36:40', '2026-06-23 01:36:40'),
	(62, 'Ino', 'ino30@gmail.com', 'customer', NULL, '$2y$12$LpbldE9cDcpXcdoHhFafhO/JPPMn5O8yE2UhfJYV1oHOESEgcbN0G', NULL, '2025-10-30 07:58:41', '2026-07-22 05:48:49'),
	(63, 'Winda Iyek', 'winda10@gmail.com', 'customer', NULL, '$2y$12$Hvs.dRcDRg10PMF0htMnK.713l.GOYJ86dE4gmGfVZBhnF0NavI.K', NULL, '2025-11-10 10:57:46', '2026-07-22 05:48:49'),
	(64, 'Marlis', 'marlis30@gmail.com', 'customer', NULL, '$2y$12$.MBuwkqtHTAc22jx/y1eG.vrXPQQSzfE9woZwshx2juvrfuv9wMB.', NULL, '2025-11-30 04:53:54', '2026-07-22 05:48:49'),
	(65, 'Ngatiyem Kunyil', 'ngatiyem12@gmail.com', 'customer', NULL, '$2y$12$pct1vLM4KVmpJLgv5jWIAuWJ2.JFyh4G0DDs3wzPyWw4K0.866wdO', NULL, '2025-11-12 06:53:35', '2026-07-22 05:48:49');

-- Dumping structure for table toko_haji_db.user_search_histories
CREATE TABLE IF NOT EXISTS `user_search_histories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `query` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_search_histories_user_id_foreign` (`user_id`),
  CONSTRAINT `user_search_histories_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table toko_haji_db.user_search_histories: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
