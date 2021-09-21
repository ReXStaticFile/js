/*!
 * kl/editor-manager/plugins/gFontFamily.plugin.js
 * License https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode
 * Copyright 2020 Lukas Wieditz
 */

/*global console, jQuery, XF, setTimeout */
/*jshint loopfunc:true */

(function ($) {
    $(document).one('editor:start', function() {
        $.FE.DefineIcon('xfKLEMgFontFamily', {NAME: 'google fab'});

        $.FE.RegisterCommand('gFontFamily', {
            title: 'Google Font',
            icon: 'xfKLEMgFontFamily',
            undo: true,
            focus: true,
            callback: function () {
                XF.EditorHelpers.loadDialog(this, 'gfont');
            }
        });

        XF.EditorDialogGFont = XF.extend(XF.EditorDialog, {
            _beforeShow: function (overlay) {
                $('#editor_kl_em_gfont_title').val('');
                $('#editor_kl_em_gfont_preview').css('font-family', false);
            },

            _init: function (overlay) {
                $('#editor_kl_em_gfont_form').submit($.proxy(this, 'submit'));
            },

            submit: function (e) {
                e.preventDefault();

                var ed = this.ed,
                    overlay = this.overlay;

                console.log(ed);

                ed.selection.restore();
                XF.EditorHelpers.insertKLEMgFontFamily(ed, $('#editor_kl_em_gfont_title').val());

                overlay.hide();
            }
        });

        XF.EditorHelpers.dialogs.gfont = new XF.EditorDialogGFont('gfont');

        /* Additional Helpers */
        XF.EditorHelpers.insertKLEMgFontFamily = function (ed, title) {
            if (title) {
                var titleReplace = title.replace(/\s/g, '+');

                ed.format.applyStyle('font-family', "'" + title + "'");

                $(ed.selection.element()).before('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=' + titleReplace + '" />');
            }
        };
    });
})(jQuery);