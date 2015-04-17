
jQuery(document).ready(function () {
    if (jQuery(window).width() > 640) {

        (function ($) {
            // Init Skrollr
            var s = skrollr.init({
                render: function (data) {
                    //Debugging - Log the current scroll position.
                    //console.log(data.curTop);
                }
            });
        })(jQuery);

    }
});
