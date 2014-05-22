-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Ven 28 Mars 2014 à 00:18
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=123 ;

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
(23, 3, 'Ideas and plans', 'Things left to do and other ideas that could be added later.', 250, -11, 'fb001a', 'star', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
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
(111, 6, 'Tuesday', 'Change content...', 2166, 273, 'fb001a', 'none', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(112, 8, 'Online information sharing', 'Very global and wide subject', 388, 376, '22ff22', 'none', '2014-03-23 13:27:58', '2014-03-23 13:27:58'),
(114, 8, 'Business', 'Usages of online data sharing services', 687, 225, '00d7dd', 'none', '2014-03-26 20:46:07', '2014-03-26 20:46:07'),
(115, 8, 'School work', 'Change content...', 685, 379, '00d7dd', 'none', '2014-03-26 20:46:52', '2014-03-26 20:46:52'),
(116, 8, 'Social', 'Share pictures, videos, etc.', 690, 544, '00d7dd', 'none', '2014-03-26 20:47:02', '2014-03-26 20:47:02'),
(117, 8, 'Pictures', 'Change content...', 937, 98, '4140e1', 'none', '2014-03-26 20:47:22', '2014-03-26 20:47:22'),
(118, 8, 'Videos', 'Change content...', 937, 238, '4140e1', 'none', '2014-03-26 20:47:35', '2014-03-26 20:47:35'),
(119, 8, 'Links', 'Change content...', 936, 382, '4140e1', 'none', '2014-03-26 20:47:46', '2014-03-26 20:47:46'),
(120, 8, 'Notes', 'Change content...', 938, 531, '4140e1', 'none', '2014-03-26 20:47:57', '2014-03-26 20:47:57'),
(121, 8, 'Documents', 'Change content...', 943, 684, '4140e1', 'none', '2014-03-26 20:48:03', '2014-03-26 20:48:03'),
(122, 8, 'Key Questions', 'Organisation questions to help start a business', 1256, 373, 'fb001a', 'star', '2014-03-26 20:50:01', '2014-03-26 20:50:01');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
