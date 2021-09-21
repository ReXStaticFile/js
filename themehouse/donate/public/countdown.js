(function ($, window, document, _undefined) {
    "use strict";

    jQuery.fn.extend({
        'updateCountdown': function() {
            var remainingTime = $(this).data('endtime') - Math.floor(Date.now()/1000),
                seconds = remainingTime % 60,
                secondsElem = $(this).find('.js-SecondsWrapper');

            secondsElem.html(seconds + " " + secondsElem.data(seconds === 1 ? 'singular' : 'plural'));

            if(remainingTime <= 60) {
                $(this).find('.js-MinutesWrapper').remove();
            }
            else {
                var minutes = Math.floor(remainingTime / 60) % 60,
                    minutesElem = $(this).find('.js-MinutesWrapper');
                minutesElem.html(minutes + " " + minutesElem.data(minutes === 1 ? 'singular' : 'plural'));
            }

            if(remainingTime <= 3600) {
                $(this).find('.js-HoursWrapper').remove();
            }
            else {
                var hours = Math.floor(remainingTime / 3600) % 24,
                    hoursElem = $(this).find('.js-HoursWrapper');
                hoursElem.html(hours + " " + hoursElem.data(hours === 1 ? 'singular' : 'plural'));
            }

            if(remainingTime <= 86400) {
                $(this).find('.js-DaysWrapper').remove();
            }
            else {
                var days = Math.floor(remainingTime / 86400),
                    daysElem = $(this).find('.js-DaysWrapper');
                daysElem.html(days + " " + daysElem.data(days === 1 ? 'singular' : 'plural'));
            }
        }
    });

    function updateCountdowns() {
        $('.js-Countdown').updateCountdown();
        window.setTimeout(function() {
            updateCountdowns();
        }, 1000);
    }

    updateCountdowns();

}(jQuery, window, document));