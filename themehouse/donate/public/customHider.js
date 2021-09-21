(function ($, window, document, _undefined) {
    "use strict";
    $(document).on('change', '.js-CostAmount', function ($event) {
        var value = $(this).val();

        if (value == -1) {
            $('.js-CustomAmount').removeClass('custom-hidden');
        }
        else {
            $('.js-CustomAmount').addClass('custom-hidden');
        }
    });
}(jQuery, window, document));