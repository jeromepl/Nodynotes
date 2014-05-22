-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Ven 28 Mars 2014 à 00:17
-- Version du serveur: 5.6.12-log
-- Version de PHP: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `data`
--

-- --------------------------------------------------------

--
-- Structure de la table `linkbars`
--

CREATE TABLE IF NOT EXISTS `linkbars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node1_id` int(11) NOT NULL,
  `node2_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=108 ;

--
-- Contenu de la table `linkbars`
--

INSERT INTO `linkbars` (`id`, `node1_id`, `node2_id`) VALUES
(1, 1, 2),
(2, 2, 4),
(3, 4, 11),
(4, 5, 6),
(6, 7, 8),
(7, 8, 9),
(9, 11, 5),
(10, 6, 12),
(11, 12, 7),
(12, 1, 7),
(17, 19, 22),
(18, 21, 23),
(20, 22, 24),
(21, 20, 25),
(25, 30, 29),
(26, 31, 29),
(27, 20, 21),
(28, 35, 36),
(29, 35, 37),
(32, 39, 39),
(41, 21, 38),
(43, 40, 28),
(44, 40, 27),
(45, 23, 40),
(47, 43, 21),
(48, 42, 43),
(49, 44, 45),
(50, 44, 46),
(51, 44, 47),
(52, 49, 50),
(53, 50, 51),
(54, 50, 52),
(55, 34, 52),
(58, 50, 32),
(59, 51, 33),
(60, 53, 51),
(61, 53, 54),
(62, 55, 52),
(63, 54, 56),
(64, 57, 58),
(65, 57, 64),
(66, 57, 63),
(67, 57, 62),
(68, 57, 61),
(69, 57, 60),
(70, 57, 59),
(71, 57, 65),
(72, 65, 66),
(73, 69, 68),
(74, 68, 71),
(75, 36, 84),
(76, 85, 86),
(77, 85, 87),
(78, 85, 88),
(79, 85, 89),
(80, 85, 90),
(81, 65, 94),
(82, 65, 95),
(83, 65, 96),
(84, 65, 97),
(85, 65, 98),
(86, 65, 99),
(87, 66, 104),
(88, 65, 105),
(89, 66, 106),
(90, 66, 107),
(93, 110, 9),
(94, 10, 110),
(95, 66, 111),
(97, 112, 114),
(99, 115, 112),
(100, 116, 112),
(103, 117, 112),
(104, 118, 112),
(105, 119, 112),
(106, 120, 112),
(107, 121, 112);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
