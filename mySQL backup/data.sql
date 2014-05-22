-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Mar 18 Mars 2014 à 00:02
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
CREATE DATABASE IF NOT EXISTS `data` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `data`;

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
(3, 1, 'Nody Notes', 781, 198, 'ffff00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 1, 'Music sheets website', 597, 556, 'ffff00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 1, 'String Class (Java)', -77, -11, 'ffff00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 1, '15 Weeks Project', -1088, 212, 'ffff00', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 1, 'Investments', 0, 0, 'ffff00', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `linkbars`
--

CREATE TABLE IF NOT EXISTS `linkbars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node1_id` int(11) NOT NULL,
  `node2_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=96 ;

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
(95, 66, 111);

-- --------------------------------------------------------

--
-- Structure de la table `nodes`
--

CREATE TABLE IF NOT EXISTS `nodes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `board_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `xPos` int(11) NOT NULL,
  `yPos` int(11) NOT NULL,
  `color` varchar(6) NOT NULL,
  `icon` varchar(40) NOT NULL,
  `date_creation` datetime NOT NULL,
  `date_update` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=113 ;

--
-- Contenu de la table `nodes`
--

INSERT INTO `nodes` (`id`, `board_id`, `title`, `text`, `xPos`, `yPos`, `color`, `icon`, `date_creation`, `date_update`) VALUES
(1, 1, 'Red', 'Red is the color of blood, rubies and strawberries. It is the color of the wavelength of light from approximately 620â€“740 nm on the electromagnetic spectrum. Next to orange at the end of the visible spectrum, red is commonly associated with danger, sacrifice, passion, fire, beauty, blood, anger, Christmas, socialism, communism, and in China and many other cultures, with happiness.', 604, 215, 'fb001a', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 1, 'Fuchsia', 'Fuchsia is a vivid purplish shade of red, named after the flower of the fuchsia plant, which took its name from the 16th century German botanist Leonhart Fuchs.', 511, 110, 'e500d9', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 1, 'Purple', 'Purple is a range of hues of color occurring between red and blue. The Oxford English Dictionary describes it as a deep, rich shade between crimson and violet.', 421, 213, '9900ff', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 1, 'Cyan', 'Cyan is a greenish blue color and one of the three primary colors of the subtractive CMYK color model. On the color wheels of the RGB (additive) and CMYK (subtractive) color models, it is located midway between blue and green, whereby it is the complementary color of red.', 410, 400, '00d7dd', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 1, 'Lime', 'Lime, also traditionally known as lime green, lime-green, or bitter lime, is a color three-quarters of the way between yellow and green (closer to yellow than to green), so named because it is a representation of the color of the citrus fruit called limes. It is the color that is in between the web color chartreuse and yellow on the color wheel.', 502, 503, '22ff22', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 1, 'Orange', 'Orange is a color located between red and yellow on the spectrum of light, and in the traditional color wheel used by painters. Its name is derived from the orange fruit.<br>In Europe and America, orange is commonly associated with amusement, the unconventional, extroverts, fire, activity, danger, taste and aroma, the autumn season, and Protestantism. In Asia, it is an important symbolic color of Buddhism and Hinduism.', 687, 309, 'ffa500', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 1, 'Brown', 'Brown is the color of dark wood or rich soil. It is a composite color made by combining red, black and yellow. The color is seen widely in nature, in wood, soil, and human hair color, eye color and skin pigmentation. Culturally, it is most often associated with plainness, humility, the rustic, and poverty.', 880, 304, '7e2b02', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 1, 'White', 'White is the color of milk and fresh snow. It is the color produced by the reflection, transmission or emission of all wavelengths of visible light, without absorption.', 1001, 183, 'ffffff', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 1, 'Black', 'Black is the color of coal, ebony, and of outer space. It is the darkest color, the result of the absence of or complete absorption of light. It is the opposite of white and often represents darkness in contrast with light.', 1252, 127, '000000', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 1, 'Blue', 'Blue is the colour of the clear sky and the deep sea. On the optical spectrum, blue is located between violet and green.<br>Surveys in the U.S. and Europe show that blue is the colour most commonly associated with harmony, faithfulness, and confidence. In U.S. and European public opinion polls it is overwhelmingly the most popular colour, chosen by almost half of both men and women as their favourite colour. It is also commonly associated with the sky, the sea, ice, cold, and sometimes with sadness.', 318, 304, '4140e1', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 1, 'Yellow', 'Yellow is the color of gold, butter, or ripe lemons. In the spectrum of visible light, and in the traditional color wheel used by painters, yellow is located between green and orange.<br>Yellow is commonly associated with gold, wealth, sunshine, reason, happiness, optimism and pleasure, but also with cowardice, envy, jealousy and betrayal. It plays an important part in Asian culture, particularly in China.', 603, 405, 'ffff00', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 2, 'Recettes', 'Toutes les recettes de la famille Parent-LÃ©vesque!', -251, -155, 'FF0', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 3, 'Must do\\''s', 'Links and ideas to have fun!', 1016, 173, '22ff22', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 3, 'Pro users features', 'Features that pro users could obtain through a monthly or annual payment.', 348, 306, '4140e1', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(21, 3, 'What\\''s left', 'There are a lot of things left to do before I can call this a releasable version, but here are the ones that have to be completed soon.', 141, 169, '4140e1', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(22, 3, 'If this ever works', 'Things I\\''d like to do if this whole project works, to celebrate, have fun and thank my friends and family.', 1244, 15, '00d7dd', 'star', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(23, 3, 'Ideas and plans', 'Things left to do and other ideas that could be added later.', 267, -19, 'fb001a', 'star', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(24, 3, 'Who to thank', 'Everyone who has contributed in some way to this wonderful project!', 1359, 182, '22ff22', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(25, 3, 'Not sure', 'Could be added to the pro features list, but not as good or easy to make...', 428, 472, '00d7dd', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(27, 3, 'Keywords', 'Keywords to help find the best name for this website', 684, -243, 'ffff00', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(28, 3, 'Slogan', 'Subtitle of the website', 752, -75, 'ffff00', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(29, 3, 'Color codes', 'All the color codes in hexadecimal used in this project', 922, 413, '9900ff', 'star', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(30, 3, 'Node colors', 'In total: 12 different choices of colors for the border of nodes', 818, 566, '4140e1', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(31, 3, 'Design colors', 'Colors used for the header and  things other than nodes', 1137, 560, '4140e1', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(32, 4, 'Domain name ideas', 'Available domain names that could fit the website', -185, -86, '00d7dd', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(33, 4, 'General ideas', 'Ideas about the website conception', 351, 5, '7e2b02', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(34, 4, 'Music sheets to do', 'Music sheets that we want and would like to do', 237, -383, 'ffa500', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(35, 3, 'New toolbar', 'The new way of playing with the board and nodes!', 441, 738, '7e2b02', 'star', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(36, 3, 'Top toolbar', 'Toolbar on top of the selected node', 276, 870, 'ffa500', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(37, 3, 'Side toolbar', 'The usual side toolbar, used to select tools', 601, 942, 'ffa500', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(38, 3, 'Next things to do', 'Short term goals', -130, 252, '22ff22', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(40, 3, 'Name ideas', 'Appealing and unreserved domain names.', 501, -104, 'ffa500', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(42, 3, 'Bigger additions', 'Things that could add to the potential of this website, but that are far from done.', -107, 566, '9900ff', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(43, 3, 'Not sure', 'Things and stuff that could be added to the final version of the website but that I don\\''t know yet how to do or that might not enhance the website.', 60, 415, '00d7dd', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(44, 5, 'String Class', 'Useful to manipulate user input<br><br>-Strings are immutable (Their value cannot be changed). Instead, Java creates a new object and changes the reference in the variable', 552, 190, '4140e1', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(45, 5, 'Compare Strings', 'Methods in java.lang to compare strings', 372, 347, '00d7dd', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(46, 5, 'Methods', 'Change content...', 720, 262, '00d7dd', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(47, 5, 'Regular expressions!!', 'Change content...', 705, 440, '22ff22', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(48, 5, 'Excercises', 'Change content...', 1060, 234, '00d7dd', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(49, 4, 'Conception process', 'Main steps of production of this website and their progress', -170, -367, '9900ff', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(50, 4, 'Design', 'Laurent est en train de s\\''occuper de Ã§a peut-Ãªtre avec de l\\''aide d\\''amis', -70, -196, 'e500d9', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(51, 4, 'Programming', 'Recreating the design and adding php/mySQL features', 350, -103, 'fb001a', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(52, 4, 'Music sheets creation', 'Start creating music sheets as soon as possible to be able to have a few of them when releasing the final product!', 236, -280, 'fb001a', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(53, 4, 'Hosting and releasing', 'Fin a hosting company and release the final version for everyone to see!', 589, -100, 'ffff00', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(54, 4, 'Publicity', 'Put a little publicity on youtube videos related to the song + create facebook page + twitter', 832, -101, '22ff22', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(55, 4, 'Continue adding content!', 'That\\''s what is going to make people come regularly and bring new people to the website!', 1035, -282, '4140e1', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(56, 4, 'Monetize', 'When there is going to be a database big enough of people, create a way to pay to have a music sheet in 2 weeks or so.<br><br>and/or place adds?', 1044, -100, '00d7dd', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(57, 6, 'Week 0', 'Started Saturday, February 1st.<br>Ends Friday, February 7th.', 282, 265, '4140e1', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(58, 6, 'Saturday', 'February 1st<br>117 pounds', 83, 94, '22ff22', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(59, 6, 'Sunday', 'February 2nd', 312, 1, '22ff22', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(60, 6, 'Monday', 'February 3rd', 487, 93, '22ff22', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(61, 6, 'Tuesday', 'February 4th', 560, 286, '22ff22', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(62, 6, 'Wednesday', 'February 5th<br><br>Injured to the upper left body.<br>Can\\''t work out for a while.', 401, 466, '22ff22', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(63, 6, 'Thursday', 'February 6th', 145, 473, 'fb001a', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(64, 6, 'Friday', 'February 7th', 27, 282, 'fb001a', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(65, 6, 'Week 1', 'Starts Saturday, March 1st<br>Ends Friday, March 7th', 1127, -39, '4140e1', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(66, 6, 'Week 2', 'Starts Saturday, February 8th<br>Ends Friday, February 14th', 1872, 275, '4140e1', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(68, 7, 'TSX', 'Bourse de Toronto', 566, 292, '00d7dd', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(69, 7, 'BAJ Baja Mining Corp.', 'Has just settled their dispute with another company. Could go up a lot until the beginning of production of their Boleo project in ~June 2014.<br>COULD BE KICKED OUT OF TSX ON FEB. 18 2014', 354, 460, '22ff22', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(71, 7, 'RET Reitmans', 'currently a little more than 5$, could increase by 400% in a few years, if it regains strength', 726, 461, '22ff22', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(84, 3, '\\"Ellipse\\" icon', 'This ellipse icon stands for \\"more\\" because it should deploy a list of the other options available for this node. Here is a list of the options it should contain.', 171, 1021, 'ffff00', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(85, 3, 'Presentation of this website', 'How to present this, so that people will understand why they need it, how it works and that it is safe. (As a bonus it\\''s beautiful ;) )<br>All of this should be part of a kickstarter if there ever happens to be one.', -822, 142, '22ff22', 'star', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(86, 3, 'Example boards', 'Examples of what boards can be used for', -1077, 261, 'ffffff', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(87, 3, 'Why people need it', 'Because it\\''s awesome, duh!', -570, 148, '000000', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(88, 3, 'How it works', 'You press buttons, duh!', -565, -5, '000000', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(89, 3, 'Why is it safe?', 'Because I am a master programmer, duh!', -566, 292, '000000', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(90, 3, 'Home page', 'The home page should be the first place where people understand what this website is about.', -910, -18, '00d7dd', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(91, 3, 'Hosting details', 'Main Hosting Details<br>Control panel username<br>olope_13798203<br>Control panel password<br>05qms89h<br>Control panel URL<br>http://cpanel.olikeopen.com<br>MySQL username<br>olope_13798203<br>MySQL password<br>05qms89h<br>MySQL hostname<br>sql202.olikeopen.com<br>FTP username<br>olope_13798203<br>FTP password<br>05qms89h<br>FTP host name	185.27.134.8<br><br>Your Website URL\\''s<br>Home page<br>http://anecdote.olikeopen.com/nodesMain.php', -541, 557, 'fb001a', 'cloud', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(94, 6, 'Saturday', 'March 1st', 864, -221, '22ff22', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(95, 6, 'Sunday', 'March 2nd', 1110, -310, '22ff22', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(96, 6, 'Monday', 'Imagine Dragons', 1375, -237, 'fb001a', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(97, 6, 'Tuesday', '', 1425, -15, 'fb001a', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(98, 6, 'Wednesday', 'Change content...', 1253, 205, 'fb001a', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(99, 6, 'Thursday', 'Change content...', 1008, 184, 'fb001a', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(104, 6, 'Monday', 'March 10', 2062, 101, '22ff22', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(105, 6, 'Friday', 'Change content...', 845, -1, 'fb001a', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(106, 6, 'Saturday', 'Change content...', 1634, 90, 'fb001a', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(107, 6, 'Sunday', 'Change content...', 1856, 4, 'fb001a', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(110, 1, 'Grey', 'Change content...', 1152, 240, '555555', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(111, 6, 'Tuesday', 'Change content...', 2166, 273, 'fb001a', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `subtitles`
--

CREATE TABLE IF NOT EXISTS `subtitles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `position` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=267 ;

--
-- Contenu de la table `subtitles`
--

INSERT INTO `subtitles` (`id`, `node_id`, `title`, `text`, `position`) VALUES
(1, 1, 'Bouh!', 'Demo text', 0),
(2, 1, 'Ah!', 'Demo text', 1),
(3, 1, 'Pourquoi t\\''as dit ah?', 'Demo text', 2),
(4, 1, 'Parce que t\\''as dit bouh!', 'Demo text', 3),
(5, 1, 'Ah!', 'Demo text', 4),
(6, 2, 'Allo', 'Demo text', 0),
(7, 2, 'Bonjour!', 'Demo text', 1),
(9, 1, 'Un autre sous-titre!', 'Demo text', 5),
(11, 20, 'More upload space', 'Demo text', 0),
(12, 20, 'Search in uploaded documents', 'Demo text', 2),
(13, 20, 'Work offline, save when connecting back', 'Demo text', 1),
(14, 20, 'Export to PDF and print', 'Demo text', 3),
(18, 24, 'Benjamin', 'Demo text', 0),
(19, 24, 'Maman et Papa', 'Demo text', 1),
(20, 24, 'Nicole et Grand-maman (mÃªme si elle ne comprenait rien!)', 'Demo text', 2),
(21, 19, 'https://www.youtube.com/watch?v=Cj98Rz--aoI', 'Demo text', 0),
(22, 25, 'Colored name?', 'Demo text', 0),
(23, 25, 'Ability to lock portions of data with password? (or share only parts of board?)', 'Demo text', 1),
(24, 25, 'Team work on a board?', 'Demo text', 2),
(25, 21, 'Images instead of background color', '+ see the image in content shower<br>+image for boards instead of boring same color for each', 2),
(26, 21, 'Touch support', 'Demo text', 3),
(27, 21, 'Friends', 'Demo text', 5),
(28, 21, 'Sharing', 'Demo text', 6),
(29, 26, 'Sublinks', 'Demo text', 0),
(31, 27, 'Nodes', 'Demo text', 0),
(32, 27, 'Knowledge', 'Demo text', 1),
(33, 27, 'Memory', 'Demo text', 2),
(34, 27, 'Connect (-tion)', 'Demo text', 3),
(35, 27, 'Data', 'Demo text', 4),
(36, 27, 'Notes', 'Demo text', 5),
(37, 27, 'Storage', 'Demo text', 6),
(38, 27, 'Thoughts', 'Demo text', 7),
(39, 28, 'Learn and never forget', 'Demo text', 0),
(40, 28, 'Apprendre sans jamais oublier', 'Demo text', 1),
(41, 26, '\\"Title\\" nodes (more important nodes)', 'Demo text', 1),
(42, 24, 'Laurent', 'Demo text', 3),
(43, 19, 'Get a car!', 'Demo text', 2),
(44, 26, 'Direction to link bars (allow tags to transfer to children)', 'Demo text', 2),
(45, 30, 'FB001A - red', 'Demo text', 0),
(46, 30, 'E500D9 - fuchsia', 'Demo text', 1),
(47, 30, '90F - purple', 'Demo text', 2),
(48, 30, '4140E1 - blue', 'Demo text', 3),
(49, 30, '00D7DD - cyan', 'Demo text', 4),
(50, 30, '2F2 - lime', 'Demo text', 5),
(51, 30, 'FF0 - yellow', 'Demo text', 6),
(52, 30, 'FFA500 - orange', 'Demo text', 7),
(53, 30, '7E2B02 - brown', 'Demo text', 8),
(54, 30, 'FFF - white', 'Demo text', 9),
(55, 30, '000 - black', 'Demo text', 11),
(56, 31, '020024 - dark blue', 'Demo text', 0),
(57, 31, '09F - lighter blue', 'Demo text', 1),
(58, 31, '06F - slightly darker blue', 'Demo text', 2),
(59, 31, 'FFF - white', 'Demo text', 3),
(60, 32, 'missingmusicsheets.com', 'Demo text', 0),
(61, 32, 'wantedmusicsheets.com', 'Demo text', 1),
(62, 32, 'musicsheetswewant.com', 'Demo text', 2),
(63, 33, 'Music sheets don\\''t have to be done for a specific instrument. If you write 2 or more different parts, user can choose left and right hand if piano for example. Need to write F key to G key transposer.', 'Demo text', 0),
(64, 34, 'Intense - Armin Van Buuren', 'Demo text', 0),
(65, 33, '\\"What do you want next\\" feature', 'Demo text', 1),
(66, 33, 'Admin submitted vs user submitted sheets', 'Demo text', 2),
(68, 36, 'Add subtitle', 'Demo text', 0),
(69, 36, 'Delete', 'Demo text', 1),
(70, 36, 'Inputs / Outputs', 'Demo text', 4),
(72, 36, 'Change color', 'Demo text', 2),
(73, 36, 'Change Icon', 'Demo text', 3),
(74, 36, 'Manage tags', 'Demo text', 5),
(81, 21, 'Search', '+ add advanced search option, maybe a div that scrolls down under the search bar', 4),
(82, 31, 'EAEAEA - light grey (background color)', 'Demo text', 4),
(83, 36, 'Ellipse', 'Demo text', 6),
(85, 27, 'Network', 'Demo text', 8),
(96, 28, 'Extend your memory', 'Demo text', 2),
(97, 21, 'Change cursors to \\''move\\'' only when dragging. Default otherwise', 'Demo text', 0),
(99, 26, 'Subtitles act as a selector to show a node\\''s children', 'Demo text', 3),
(101, 26, 'Pass subtitles from node to node', 'Demo text', 4),
(102, 26, 'Possibility to select multiple nodes at once to move them', 'Demo text', 5),
(104, 26, 'Change the way \\''saving\\'' is showing', 'Demo text', 6),
(105, 19, 'http://www.bikidi.com/goods.php?id=736', 'Demo text', 1),
(106, 21, 'Fix stupid IE not showing good cursor', 'Demo text', 1),
(107, 26, 'Undo', 'Demo text', 7),
(115, 37, 'Select/Move tool (main tool)', '', 0),
(116, 34, 'Chuck', '', 1),
(117, 39, 'Sublinks', '', 1),
(118, 39, '\\"Title\\" nodes (more important nodes)', '', 2),
(119, 39, 'Direction to link bars (allow tags to transfer to children', '', 3),
(120, 39, 'Subtitles act as a selector to show a node\\''s children', '', 4),
(121, 39, 'Pass subtitles from node to node', '', 5),
(122, 39, 'Possibility to select multiple nodes at once to move them', '', 6),
(123, 39, 'Change the way \\''saving\\'' is showing', '', 7),
(124, 39, 'UNDO', '', 0),
(125, 21, 'Different cursors for every tool', '', 8),
(127, 37, 'Delete tool', '', 1),
(128, 37, 'Link tool', '', 2),
(129, 37, 'Add node', '', 3),
(130, 37, 'Share board', '', 4),
(131, 37, 'Board properties', '', 5),
(132, 40, 'nodynotes.com', '', 0),
(137, 19, 'Lucid dreaming?', '', 3),
(138, 42, 'Chrome/Firefox plugin to quickly add a node', 'Could simply be a plus button where you add a node and select a board. (The node should be added in the middle of it) Then on next logging some indicator should tell the user that something is new and might need to be re-arranged', 1),
(139, 42, 'Smartphone/tablet app', 'Change content...', 0),
(140, 43, 'Sublinks', 'From my notes on my computer:<br>-Sublinks sur les subtitles?<br>-sublinks font apparaitres les nodes (les autres sont semi-transparentes) et change le content du content shower<br>OR<br>-Sublinks on subtitles can act as a chooser for what node connections to show (need a direction to links for that)', 1),
(141, 43, 'UNDO', 'Change content...', 0),
(142, 43, '\\"Title\\" nodes (more important ones)', 'Change content...', 2),
(143, 43, 'Direction to link bars', 'Change content...', 3),
(144, 43, 'Selected subtitle changes the child nodes shown', 'Clicking on subtitles could show different children of the parent node. (Allows a folder-like organisation)', 4),
(146, 44, 'Constructor', 'String variable = \\"\\"; (Shortcut) - creates an interned String<br>or<br>String variable = new String(\\"\\"); - creates a String object', 0),
(147, 45, 's1.equals(s2)', 'returns a boolean<br><br>checks the content (not the reference)', 1),
(148, 45, 's1 == s2', 'checks the reference', 0),
(149, 45, 's1.compareTo(s2)', 'returns an Integer based on the alphabetic order<br><br>*case sensitive', 2),
(151, 46, 'length()', 'Change content...', 0),
(152, 46, 'charAt(int index)', 'Change content...', 1),
(153, 46, 'concat(String s)', 'adds a string to the end of another<br><br>same as s1 + s2', 2),
(155, 46, 'substring(int i1, int i2)', 'Change content...', 3),
(156, 46, 'toLowerCase()', 'Change content...', 4),
(157, 46, 'toUpperCase()', 'Change content...', 5),
(158, 46, 'trim()', 'remove blancks at beginning and end of the string', 6),
(159, 46, 'replace(String a, String b)', 'replaces THE FIRST \\"a\\"s by \\"b\\"s in the String', 7),
(160, 46, 'replaceAll(String a, String b)', 'Change content...', 8),
(161, 46, 'split(String s)', 'breaks a string into an array of strings', 9),
(162, 48, 'Finding Palindromes', 'public static boolean isPalindrome(String s) {<br>    for(int i = 0; i < s.length/2; i++) {<br>        if(s.charAt(i) != s.charAt(s.length - 1 - i)) return false;<br>    }<br><br>    return true;<br>}', 0),
(163, 58, '42 push-ups', 'hands far apart to work pectorals', 3),
(164, 58, '85 dumbbell presses', '5 pounds per hand', 1),
(165, 58, '135 dumbbell biceps curls', '5 pounds per hand', 0),
(166, 58, '35 squats', 'no weight', 5),
(167, 58, '15 dumbbell lunges', '5 pounds per hand', 6),
(168, 58, '45 myAbs', 'Change content...', 2),
(169, 58, '40 floor crunches', 'abs', 4),
(170, 67, 'Subtitle', 'Change content...', 0),
(171, 67, 'Subtitle', 'Change content...', 1),
(174, 67, 'Subtitle', 'Change content...', 3),
(187, 67, 'Subtitle', 'Change content...', 2),
(189, 59, '80 dumbbell bicep curls', '5 pounds per hand', 2),
(190, 59, '130 dumbbell bench presses', '5 pounds per hand', 0),
(191, 59, '90 dumbbell presses', '5 pounds per hand', 1),
(192, 69, 'http://bajamining.com', 'Change content...', 0),
(194, 59, '62 floor crunches', 'Change content...', 3),
(195, 59, '55 push-ups', 'Change content...', 4),
(196, 60, '45 dumbbell presses', '5 pounds per hand', 3),
(197, 60, '70 dumbbel bicep curls', '5 pounds per hand', 0),
(198, 60, '55 push-ups', 'Change content...', 2),
(199, 60, '60 floor crunches', 'Change content...', 1),
(200, 61, '30 push-ups', 'Change content...', 1),
(201, 61, '28 floor crunches', 'Change content...', 2),
(202, 61, '40 dumbbell presses', '5 pounds per hand', 0),
(203, 62, '30 push-ups', 'Change content...', 1),
(204, 62, '40 u-boats', 'abs', 0),
(205, 62, '20 floor crunches', 'Change content...', 2),
(207, 43, 'Add the icon to the left of the title in the content shower', 'Change content...', 5),
(208, 38, 'Add creation and update date to nodes', 'Change content...', 0),
(220, 38, 'Update date to boards', '', 1),
(221, 84, 'Sublink', 'Change content...', 0),
(222, 84, 'Attach a file (pro)', 'Change content...', 1),
(223, 84, 'Checkboxes?', 'Could be used to make lists of to-do stuff', 2),
(224, 38, 'last color', 'Change content...', 2),
(225, 38, 'user\\''s last login', 'should be saved inside the php file that connects the user', 3),
(227, 43, '\\"Delete\\" in toolbar2 could delete subtitle if selected', 'Change content...', 6),
(228, 21, 'Other important safety in php sessions', 'See favorites in chrome for more info.', 9),
(230, 21, 'Icon chooser', 'Change content...', 7),
(231, 21, 'Error and warning messages', '-for board not shared with user<br>-for ajax error when saving<br>-when loggin in if email-password don\\''t match<br>-when trying to look at a board not logged in<br>-when looking at board not allowed (events.php line 33)<br><br>-Warning message when deleting board (cannot be un-done)', 10),
(232, 20, 'Add image background to node', 'Could be done in the color chooser tool, instead of a colored background', 4),
(233, 42, 'Get text from recordings and images', 'This feature could allow someone to record a class or something else and then getting the text from it and re-arrange it in nodes', 2),
(234, 86, 'Make a plan', 'Plan a trip or an awesome project', 0),
(235, 86, 'Remember who is owing you money', 'Cause we all know that money always disapears.', 1),
(236, 86, 'Take class notes', 'Take notes to study for your tests. Organized and beautiful notes, not like the mess you are usually writing in your books. Plus, these notes are gonna be an incredible source of knowledge for the rest of your life, since this information has been writtent by you, and not that doctor who wrote a 250 pages paper you understand 10 words of.<br>SHARE \\''EM!', 2),
(238, 88, 'Demo board', 'A demo board should be created when creating an account. It could contain all information about how this works in little text bubbles floating next to the part they are explaining.<br>This board should show the entire potential of this website (maybe even the pro features?)', 0),
(239, 86, 'Store your trip pictures', 'This website allows you to store pictures easily and to retrieved them in an even easier way. Add a little information to your pictures, the place they were taken, the date... then add tags to them to search them at any time.<br>Great way to quickly organize your pictures by location and/or date and to share them with whoever you want! ', 3),
(240, 87, 'Your own database', 'Quit wikipedia and google, where half of the information you find is either fake or too complex for you. Build over time your own database, where you can be sure of your information and that you will understand it clearly!', 0),
(241, 87, 'Share your notes with other', '(And receive notes from others of course)<br>You missed a class, don\\''t worry! Your friends got you covered. In a single click, their notes are transfered to you.<br>Feel like it\\''s difficult to understand the teacher while copying so much information? Take turns with your classmates and fully understand the teacher.<br>Feel like your notes are incomplete? Get a friend\\''s notes and compare to see what you missed, and maybe what is missed too?', 1),
(242, 87, 'In the cloud', 'Get access to your information everywhere, with a technology becoming greater every day!', 2),
(243, 89, 'Password', 'Are hashed and salted', 0),
(244, 89, 'Encryption', 'SSL certificate (to do)', 1),
(245, 21, 'Salt passwords', 'Change content...', 11),
(246, 89, 'Everything is private', 'Only you and the people you shared your board with can see what\\''s in it.', 2),
(247, 90, 'Video', 'First thing the user should see.<br>Should be an edit of the kickstarter video. (Which means it has to be awesome!)', 0),
(248, 90, 'Icons and text', 'Explaining:<br>-Secure<br>-Cloud<br>-Organized<br>-Beautiful (find another word)<br>-Share<br><br>Maybe in this order:<br>-Create<br>-Share<br>-Access (offline?)<br>-On the cloud<br>-Private', 1),
(249, 38, 'Modify moveIntoView', 'add something to move everything down if the 2nd toolbar is not showing', 4),
(250, 21, 'Link support', 'Create a regex to transform urls into clickable elements', 12),
(251, 92, 'Subtitle', 'Change content...', 0),
(252, 94, '60 myAbs', 'Change content...', 1),
(253, 94, '35 push-ups', 'Change content...', 2),
(255, 94, '65 dumbbell presses', 'Change content...', 0),
(256, 95, '60 myAbs', 'Change content...', 0),
(257, 95, '48 push-ups', 'Change content...', 1),
(258, 21, 'Add pngs', 'In case Iconic doesn\\''t load for some reason, the raw png should be added in the \\"src\\" attribute for all image elements using iconic', 13),
(259, 42, 'Facebook app to store conversations', 'and maybe twitter', 3),
(260, 104, '50 push-ups', 'Change content...', 2),
(261, 104, '75 dumbbell presses', '5 pounds per hand', 0),
(262, 104, '60 myAbs', 'Change content...', 1),
(263, 30, '555 - grey', 'Change content...', 10),
(264, 21, 'Automatic mySQL backup', 'http://agiliq.com/blog/2009/02/automatically-backup-mysql-database-to-amazon-s3-u/', 14),
(265, 21, 'RÃ©fÃ©rencement', 'See favorites in chrome for a good tutorial', 15);

-- --------------------------------------------------------

--
-- Structure de la table `tags`
--

CREATE TABLE IF NOT EXISTS `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Contenu de la table `tags`
--

INSERT INTO `tags` (`id`, `node_id`, `title`) VALUES
(1, 23, 'Tag 1'),
(3, 23, 'Wow, another tag!'),
(4, 23, 'Man, this node has so many tags!'),
(5, 23, 'Another one for good luck'),
(6, 23, 'Added'),
(7, 112, 'zach');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name_first` varchar(255) NOT NULL,
  `name_last` varchar(255) NOT NULL,
  `date_creation` date NOT NULL,
  `date_last` date NOT NULL,
  `last_board` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name_first`, `name_last`, `date_creation`, `date_last`, `last_board`) VALUES
(1, 'jeparlev@gmail.com', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 'Jerome', 'Parent-Levesque', '2013-09-28', '2014-02-11', 3);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
