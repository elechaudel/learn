/* navigation component */
$(document).ready(function() {
	$('.js-nav-menu').click(function() {
		$(this).toggleClass('open');
		$('.menu-overlay').toggleClass('open');
		$('body').toggleClass('no-scroll');
		
		if ($('nav.menu').hasClass("active")) {
			$('nav.menu').removeClass('active');
		} else {
			window.setTimeout(function() {
				$('nav.menu').addClass('active');
			}, 1000);
		};
	});
});