<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'blog');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'H0T_Gu!t@r3');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '$U2VD^/!TN1{{l6sidoP@5`_W[qG]^MrFdOGBquC&kjwlt 5S@eEWM{jJh1K4aw+');
define('SECURE_AUTH_KEY',  'ZJ}Du -}|u4P5injzG],~&<l6|:@$!KHwncQ[}Wu-DGaHQ{Oyz,?{~p,E0t~EX&~');
define('LOGGED_IN_KEY',    'O}=I@cAnab?<Q|Z/IXIpNZpm5-wfVfY[a&sdygav]Y(.Im lp9F,QGZ$XHyP%HR%');
define('NONCE_KEY',        'A%`4?mfSXg,zuU%7I&&]WmjCv9Bx5ixe$%U6^S(Umg>t-eGKx/,EC19&EmdH!#:u');
define('AUTH_SALT',        '#3Q*sT~X<>1p$PGW]b6zOrX!<o0Ys.!ESB=;[^a5CoQO.gY>IOVg/:0 2J~|E4Zu');
define('SECURE_AUTH_SALT', 'bPW!79=A};+r}6x?OKh9Ttw}}8-kgE}2@>B> 3wGDj`EP@f3# r,$[FU2QvtkI#U');
define('LOGGED_IN_SALT',   '0Mv6+Q;:O.~F{2w;c_Adj6P@,^YI29HaGAO[9O,g^}t/ULiv7yh/y#vG-iMj_x*}');
define('NONCE_SALT',       'aNP,<!WB.SMzW?ou/znM@GaytS_ka#3&=,vN/:+&9y4TNxZ1RZ=9]Q0*QRmuH7n=');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
