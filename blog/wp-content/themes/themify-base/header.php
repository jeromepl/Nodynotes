<?php
/**
 * Template for site header
 * @package themify
 * @since 1.0.0
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>

<meta charset="<?php bloginfo( 'charset' ); ?>">

<title><?php wp_title( '|', true, 'right' ); ?></title>

<?php
/**
 *  Stylesheets and Javascript files are enqueued in theme-functions.php
 */
?>

<!-- wp_header -->
<?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>
<?php themify_base_body_start(); // hook ?>
<div id="pagewrap">

	<div id="headerwrap">
    
		<?php themify_base_header_before(); // hook ?>
		<header id="header" class="pagewidth">
        <?php themify_base_header_start(); // hook ?>
			<?php echo themify_base_site_title( 'site-logo' ); ?>

			<?php if ( $site_desc = get_bloginfo( 'description' ) ) :
				global $themify_customizer;
				?>
				<h2 id="site-description" class="site-description"><?php echo $themify_customizer->site_description(); ?></h2>
			<?php endif; ?>

			<nav>
				<div id="menu-icon" class="mobile-button"><i class="icon-menu"></i></div>
				<?php
				wp_nav_menu( array(
					'theme_location' => 'main-nav',
					'fallback_cb'    => 'themify_base_default_main_nav',
					'container'      => '',
					'menu_id'        => 'main-nav',
					'menu_class'     => 'main-nav'
				));
				?>
				<!-- /#main-nav --> 
			</nav>

		<?php themify_base_header_end(); // hook ?>
		</header>
		<!-- /#header -->
        <?php themify_base_header_after(); // hook ?>
				
	</div>
	<!-- /#headerwrap -->
	
	<div id="body" class="clearfix">
    <?php themify_base_layout_before(); //hook ?>