var themehouse = themehouse || {};

themehouse.donateProgressBar = {
    init: function() {
        $('html').addClass('th_donate--initialized')
    }
};

$(document).ready(function() {
    themehouse.donateProgressBar.init();
})
