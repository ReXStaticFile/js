!function ($, window, document, _undefined) {
    "use strict";

    XF.UIXImageUpload = XF.Element.newHandler({
        options: {},

        $form: null,

        init: function () {
            var $form = this.$form = this.$target;
            $form.on('ajax-submit:response', XF.proxy(this, 'ajaxResponse'));
            console.log($form);
        },

        ajaxResponse: function (e, data) {
            console.log(data);

            if (data.errors || data.exception) {
                return;
            }

            e.preventDefault();

            if (data.message) {
                XF.flashMessage(data.message, 3000);
            }

            $('[data-style-property-id="' + data.stylePropertyId + '"]').val(data.file);
            $('.overlay').trigger('overlay:hide');
        }
    });

    XF.Element.register('uix-image-upload', 'XF.UIXImageUpload');
}(jQuery, window, document);