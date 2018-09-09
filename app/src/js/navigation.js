$(document).ready(function() {
	$('.js-nav-menu').click(function() {
		$(this).toggleClass('open');
		$('.menu-overlay').toggleClass('open');
		$('body').toggleClass('no-scroll');
		window.setTimeout(function() {
			$('nav.menu').toggleClass('active');
		}, 1000);
	});
});