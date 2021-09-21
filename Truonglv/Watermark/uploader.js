!(function($, window, document, _undefined) {
    XF.Watermark_ImageUploader = XF.Element.newHandler({
        options: {
            url: null,
        },

        init: function() {
            this.$target.bind('change', XF.proxy(this, 'onChange'));
        },

        onChange: function() {
            var formData = new FormData();

            formData.append('file', this.$target[0].files[0]);
            XF.ajax('POST', this.options.url, formData, XF.proxy(this, 'onResponse'));
        },

        onResponse: function(data) {
            // TODO
        },
    });

    XF.Element.register('watermark-image--uploader', 'XF.Watermark_ImageUploader');
})(jQuery, this, document);
