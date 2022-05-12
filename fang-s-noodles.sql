-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 12, 2022 at 07:50 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: 'fang-s-noodles'
--

-- --------------------------------------------------------

--
-- Table structure for table 'admin'
--

DROP TABLE IF EXISTS 'admin';
CREATE TABLE IF NOT EXISTS 'admin' (
  'id' int(11) NOT NULL AUTO_INCREMENT,
  'email' varchar(100) NOT NULL,
  'password' varchar(100) NOT NULL,
  PRIMARY KEY ('id')
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table 'reservation'
--

DROP TABLE IF EXISTS 'reservation';
CREATE TABLE IF NOT EXISTS 'reservation' (
  'id' int(11) NOT NULL AUTO_INCREMENT,
  'date' date NOT NULL,
  'heure' varchar(10) NOT NULL,
  'personnes' int(11) NOT NULL,
  'client' int(11) NOT NULL,
  PRIMARY KEY ('id')
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table 'users'
--

DROP TABLE IF EXISTS 'users';
CREATE TABLE IF NOT EXISTS 'users' (
  'id' int(11) NOT NULL AUTO_INCREMENT,
  'email' varchar(100) NOT NULL,
  'password' varchar(100) NOT NULL,
  'prenom' varchar(100) NOT NULL,
  'nom' varchar(100) NOT NULL,
  'telephone' varchar(10) NOT NULL,
  PRIMARY KEY ('id')
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
