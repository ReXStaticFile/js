/*!
 * kl/editor-manager/plugins/unlinkAll.plugin.js
 * License https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode
 * Copyright 2020 Lukas Wieditz
 */

/*global console, jQuery, XF, setTimeout */
/*jshint loopfunc:true */

(function ($) {
    $.FE.DefineIcon('klUnlinkAll', {NAME: 'unlink'});
    $.FE.RegisterCommand('klUnlinkAll', {
        title: 'unlink all links',
        focus: true,
        icon: 'klUnlinkAll',
        undo: true,
        refreshAfterCallback: true,
        callback: function (e) {
            $('.fr-view').find("a").each(function () {
                var elem = $(this);
                elem.before(elem.html());
                elem.remove();
            });
        }
    });
})(jQuery);