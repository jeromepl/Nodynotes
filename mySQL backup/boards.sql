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
-- Structure de la table `boards`
--

CREATE TABLE IF NOT EXISTS `boards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `xPos` int(11) NOT NULL,
  `yPos` int(11) NOT NULL,
  `color_last` varchar(6) NOT NULL,
  `date_creation` datetime NOT NULL,
  `date_update` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Contenu de la table `boards`
--

INSERT INTO `boards` (`id`, `user_id`, `title`, `xPos`, `yPos`, `color_last`, `date_creation`, `date_update`) VALUES
(1, 1, 'Colors', -42, 104, '4140E1', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 1, 'Recettes', 691, 488, '4140E1', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 1, 'Nody Notes', 1117, -159, 'ffff00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 1, 'Music sheets website', 597, 556, 'ffff00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 1, 'String Class (Java)', -77, -11, 'ffff00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 1, '15 Weeks Project', -1088, 212, 'ffff00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 1, 'Investments', 0, 0, 'ffff00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 1, 'Entrepreneurship 101', -269, 47, '00d7dd', '2014-03-23 13:27:58', '2014-03-23 13:27:58');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
