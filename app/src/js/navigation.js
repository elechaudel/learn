/* navigation component */
$(document).ready(function() {
	$('.js-nav-menu').on('click touch', function() {
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

		if ($('.page-background').hasClass("bg-color--white")) {
			$('nav.menu').toggleClass('white');
		}
	});

	if ($('nav.menu').hasClass("white")) {
		$('body').css("background-color", "black")
	} else {
		$('body').css("background-color", "white")
	};
});