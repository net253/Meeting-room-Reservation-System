-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 21, 2022 at 07:29 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rrs`
--

-- --------------------------------------------------------

--
-- Table structure for table `t_rooms`
--

CREATE TABLE `t_rooms` (
  `id` int(10) NOT NULL,
  `rooms` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` varchar(100) NOT NULL,
  `agent` varchar(100) NOT NULL,
  `tel` varchar(100) NOT NULL,
  `datetime` datetime(6) DEFAULT NULL,
  `datetimeUse` datetime(6) DEFAULT NULL,
  `datetimeReturn` datetime(6) DEFAULT NULL,
  `purpose` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `t_rooms_logger`
--

CREATE TABLE `t_rooms_logger` (
  `id` int(10) NOT NULL,
  `rooms` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` varchar(100) NOT NULL,
  `agent` varchar(100) NOT NULL,
  `tel` varchar(100) NOT NULL,
  `datetime` datetime(6) DEFAULT NULL,
  `datetimeUse` datetime(6) DEFAULT NULL,
  `datetimeReturn` datetime(6) DEFAULT NULL,
  `purpose` varchar(100) NOT NULL,
  `action` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_rooms`
--
ALTER TABLE `t_rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_rooms_logger`
--
ALTER TABLE `t_rooms_logger`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `t_rooms`
--
ALTER TABLE `t_rooms`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `t_rooms_logger`
--
ALTER TABLE `t_rooms_logger`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
