'use strict';
var $ = jQuery;

$(document).ready(function(){
	$('.main-menu .navbar-nav a').on('click', function(e) {
		var $this = $(this),
				id    = '#' + $this.attr('href').split('#').pop();
		
		e.preventDefault();
		
		if ($(id).length) {
			$('html, body').animate({
				scrollTop: $(id).offset().top
			}, 600);
		}
	});
	
	$(document).on('scroll', function() {
		var scrollPos = $(document).scrollTop(),
				link      = $('.main-menu .navbar-nav a');
		
		link.each(function () {
			var currLink = $(this),
					refElement;
			
			if ($(currLink.attr('href')).length) {
				refElement = $(currLink.attr('href'));
				
				if (
				refElement.position().top - 1 <= scrollPos &&
				refElement.position().top + refElement.outerHeight() > scrollPos) {
					link.removeClass('active');
					currLink.addClass('active');
				} else {
					currLink.removeClass('active');
				}
			}
		});
	});
});