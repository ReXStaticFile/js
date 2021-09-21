! function ($, window, document, _undefined) {
    "use strict";

    XF.cv6NodeSvgInit = XF.Element.newHandler({

        init: function () {
            SVGInject(this.$target, {
                beforeInject: function (img, svg) {
                    svg.classList.add('replaced-svg');
                }
            });
        },
        
    });

    XF.Element.register('cv6-node-svg', 'XF.cv6NodeSvgInit');

}(jQuery, window, document);