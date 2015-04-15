/* ===================================================
 * whoisandywhite.js v1.0
 * ===================================================
 */

!function($) {

	$(function(){
		var $window = $(window)
			windowWidth = $window.width();



		/* any flexsliders */
		$('.flexslider').flexslider({
			animation: "slide",
			slideshow: true,
			touch: true,
			prevText: '<span></span>',
			nextText: '<span></span>',
		});

		/*
		** Main flexslider
		*/
		$('.flexslider-main').flexslider({
			animation: "slide",
			selector: ".slides > .slide",
			slideshow: true,
			touch: true,
			prevText: '<span></span>',
			nextText: '<span></span>',

			start: function(){
				resizeMainCarousel();
			}
		});


		/*
		** When slides with videos are clicked,
		** replace the slide with the video
		*/
		$(".slide-has-video").click(function(){
			var $this = $(this);
			$this.children('.container').slideUp();
			$this.children('.slide-video-container').append('<iframe src="//player.vimeo.com/video/'+ $(this).data('video') +'?autoplay=true" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>').slideDown(300, function(){
				$('.flexslider-main').height( $(this).outerHeight() ).flexslider('pause');
				$.scrollTo( $('.flexslider-main'), 300, {offset: {top:-116} });
			});
			$('.flexslider-main .flex-control-nav').hide();
			return false;
		});

		$(".closeVideo").click(function(){
			var $this = $(this);
			$this.parents('.slide-video-container').slideUp().prev('.container').slideDown(300, function(){
				$this.parents('.slide-video-container').children('iframe').remove();
				$('.flexslider-main').height( $(this).outerHeight() ).flexslider('play');
				$('.flexslider-main .flex-control-nav').show();
			});
			return false;
		});

		// animate the section icons into view
		$('.section-section_anchor img').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {
				$(this).animate({
					opacity: 1,
					marginTop: '-51px'
				}, 500, 'linear');
			}
		});

		$('.section-section_anchorSpecial img').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {
				$(this).animate({
					opacity: 1,
					marginTop: '-15%'
				}, 500, 'linear');
			}
		});

		$('.section-section_anchorSpecial2 img').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if (isInView) {
				$(this).animate({
					opacity: 1,
					marginTop: '-12%'
				}, 500, 'linear');
			}
		});

		$('.icon-svg').bind('inview', function(event, isInView) {
			
			$('').addClass('wufoo-letter');
		});

		// resize all the .flexslider li's to the flexslider height
		resizeFlexSlides();


		// Global window resize function
	    $window.resize(function()
	    {
	    	windowWidth = $window.width();

		    // resize the flexSlider slides to fit
		    resizeFlexSlides();
		    resizeMainCarousel();

		    columnConform();
		    alignOffersToBottomOfDiv();
	    });



		/*
		** animate to next section optional icon
		*/
		$(".link-to-next-section").click(function()
		{
			$.scrollTo( $(this).parents('.section').next('.section'), 500, {offset: {top:-200} });
			return false;
		});


		$(".back-to-top").click(function(){
			$.scrollTo(0,500);
			return false;
		});


		/*
		** Scroll to the correct section on click
		*/
		$(".anchor-nav a").click(function(){
			$.scrollTo( $(this).attr('href'), 500, {offset: {top:-200} });
			return false;
		});


		/*
		** Scroll to the correct section if hash exists
		*/
		if(location.hash) {
			var title = location.hash;
			$.scrollTo( '*[data-title="'+title+'"]', 500, {offset: {top:-200} });
		}




		/*
		** Reveal more jobs on the jobs section
		*/
		$(".show-more-offers").click(function(){
			var $this = $(this);

			//$(".job-wrap").css("height", "auto");

			$(".job-section .row.hide:first").removeClass('hide').find(".job-wrap").css("height", "auto"); 

			//columnConform();

			if( !$this.prev('.row').hasClass('hide'))
			{
				$this.hide();
			}

			return false;
		});


		/*
		** Large screens only
		*/
		if ( windowWidth > 767 ) 
		{
			// count to target on number section
			$('.count-to-number').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
				if (isInView && !$(this).hasClass('count-complete')) {
					$(this).html('0');
					count($(this));
				}
			});
			// count to target on number section
			$('.count-to-number-fast').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
				if (isInView && !$(this).hasClass('count-complete')) {
					$(this).html('0');
					countFast($(this));
				}
			});



			/* when the page is scrolled, stick the ANCHOR nav to the top of the site */
			$window.scroll(function(){
				if( $(".anchor-nav").length > 0 )
				{
					if( $(this).scrollTop() > 126 ) {
				 		$("body").addClass("fixed-anchor-nav");
				 	} else {
				 		$("body").removeClass("fixed-anchor-nav");
				 	}	
				}
			 	
			});

		} else { // small screens only

			/* when the page is scrolled, stick the MAIN nav to the top of the site */
			$window.scroll(function(){
				if( $(this).scrollTop() > 34 ) {
			 		$("body").addClass("fixed-main-nav");
			 	} else {
			 		$("body").removeClass("fixed-main-nav");
			 	}	
			});
		}


	}); // end doc ready


	$(window).load(function()
	{
		columnConform();

		alignOffersToBottomOfDiv();
	});








	/*
	** Function to resize flexslider with image backgrounds
	*/
	function resizeFlexSlides()
	{
		var flexHeight = $(".flexslider").outerHeight();
		
		$(".flexslider-bg-image .slide").each(function()
		{
			$(this).height( flexHeight );
		});
		$(".flexslider-bg-image .slide-text-container").each(function()
		{
			$(this).height( flexHeight );
		});
	}




	/*
	** Function to resize flexslider for main carousel
	*/
	function resizeMainCarousel( flexHeight)
	{
		if( flexHeight == undefined)
		{
			var flexHeight = $(".flexslider-main").outerHeight();
		}
		
		$(".flexslider-main").each(function()
		{
			$(this).height( flexHeight );
		});
		$(".flexslider-main .slide-container").each(function()
		{
			$(this).height( flexHeight );
		});
	}






	/*
	** Function to count up to a number
	*/
	function count($this){
        var current = parseInt($this.html(), 10);
        $this.html(++current);
        if(current < $this.data('count')){
            setTimeout(function(){count($this)}, 50);
        }
        else
        {
        	$this.html( $this.data('count'));
        	$this.addClass('count-complete');
        }
    }

 	function countFast($this){
        var current = parseInt($this.html(), 10);
        $this.html(++current);
        if(current < $this.data('count')){
            setTimeout(function(){countFast($this)}, 1);
        }
        else
        {
        	$this.html( $this.data('count'));
        	$this.addClass('count-complete');
        }
    }  






    /*
	** Function to set css blocks to a matching height in a row
	*/
	var currentTallest = 0,
	currentRowStart = 0,
	rowDivs = new Array();

	function setConformingHeight(el, newHeight) 
	{
		// set the height to something new, but remember the original height in case things change
		el.data("originalHeight", (el.data("originalHeight") == undefined) ? (el.height()) : (el.data("originalHeight")));
		el.height(newHeight);
	}

	function getOriginalHeight(el) 
	{
		// if the height has changed, send the originalHeight
		return (el.data("originalHeight") == undefined) ? (el.height() + 20) : (el.data("originalHeight"));
	}
	function columnConform() 
	{
		// find the tallest DIV in the row, and set the heights of all of the DIVs to match it.
		$('.match-height').each(function() {

			// "caching"
			var $el = $(this);
		
			var topPosition = $el.offset().top;

			if (currentRowStart != topPosition) {

				// we just came to a new row.  Set all the heights on the completed row
				for(currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) setConformingHeight(rowDivs[currentDiv], currentTallest);

				// set the variables for the new row
				rowDivs.length = 0; // empty the array
				currentRowStart = topPosition;
				currentTallest = getOriginalHeight($el);
				rowDivs.push($el);

			} else {

				// another div on the current row.  Add it to the list and check if it's taller
				rowDivs.push($el);
				currentTallest = (currentTallest < getOriginalHeight($el)) ? (getOriginalHeight($el)) : (currentTallest);

			}
			// do the last row
			for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) setConformingHeight(rowDivs[currentDiv], currentTallest);

		});
	}





	/*
	** Function to align the offers to the bottom of the div
	*/
	function alignOffersToBottomOfDiv(){

		$(".offer-wrap").each(function(){

			var $this = $(this),
				offerHeight = $this.height(),
				offerOuterHeight = $this.parent().height();

			// add top margin to $this
			$this.css('margin-top', offerOuterHeight - offerHeight + 'px');

		});

	}

	$.fn.scrollStopped = function(callback) {           
	        $(this).scroll(function(){
	        	 $('#sidebar').removeClass('fadeInUp animated');
	        	 $('#sidebar').addClass('fade');
	            var self = this, $this = $(self);
	            if ($this.data('scrollTimeout')) {
	              clearTimeout($this.data('scrollTimeout'));
	            }
	            $this.data('scrollTimeout', setTimeout(callback,250,self));
	        });
    };

	$(window).scrollStopped(function(){
	    
	    $('#sidebar').removeClass('fade');
	    $('#sidebar').addClass('fadeInUp animated');

	});

}(window.jQuery);