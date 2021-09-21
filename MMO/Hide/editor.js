var MMO = window.MMO || {};
MMO.Hide = MMO.Hide || {};

!function($, window, document, _undefined)
{
    "use strict";

    MMO.Hide.editorConfig = {
        'dialog': []
    };

    MMO.Hide.EditorButtons = {
        init: function ()
        {
            if ($.parseJSON($('.js-mhHideEditorConfig').first().html()))
            {
                MMO.Hide.editorConfig.dialog = $.parseJSON($('.js-mhHideEditorConfig').first().html()) || [];
            }

            if (!Array.isArray(MMO.Hide.editorConfig.dialog))
            {
                return;
            }

            MMO.Hide.editorConfig.dialog.forEach(function (element) {
                MMO.Hide[element] = MMO.Hide[element] || {};
                if (!MMO.Hide[element].editorButton)
                {
                    MMO.Hide[element].editorButton = {
                        init: function ()
                        {
                            MMO.Hide[element].EditorDialog = XF.extend(XF.EditorDialog, {
                                cache: false,
                                $container: null,

                                _beforeShow: function(overlay)
                                {
                                    this.ed.$el.blur();
                                },

                                _init: function (overlay)
                                {
                                    overlay.$overlay.find('form').submit(XF.proxy(this, 'submit'));
                                },

                                submit: function (e)
                                {
                                    e.preventDefault();

                                    var
                                        $type = $('#editor_hide_count'),
                                        $groupHide = $('#editor_hide_id_count input:checked'),
                                        $description = $('#editor_hide_text'),
                                        gr = false;

                                    if($groupHide)
                                    {
                                        var GroupsID = [];
                                        if ($groupHide.length)
                                        {
                                            gr = true;
                                            $groupHide.each(function(i) {
                                                GroupsID.push($(this).val());
                                            });
                                        }

                                        $groupHide = GroupsID.length ? '' + GroupsID.join(",") : '';
                                    }

                                    this.ed.selection.restore();
                                    MMO.Hide.EditorButtons.insertHide(this.ed, element.toString().toUpperCase(), gr ? $groupHide : $type.val(), XF.unparseBbCode($description.val()));

                                    this.overlay.hide();

                                    $description.val('');
                                    $type.val('');
                                }
                            });
                        },

                        callback: function ()
                        {
                            XF.EditorHelpers.loadDialog(this, element);
                        }
                    };
                }

                MMO.Hide[element].editorButton.init();
                XF.EditorHelpers.dialogs[element] = new MMO.Hide[element].EditorDialog(element);

                if ($.FE.COMMANDS['xfCustom_' + element])
                {
                    $.FE.COMMANDS['xfCustom_' + element].callback = MMO.Hide[element].editorButton.callback;
                }
            });
        },

        insertHide: function(ed, tag, option, text)
        {
            var output;

            text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;')
                .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
                .replace(/\t/g, '    ')
                .replace(/\n /g, '\n&nbsp;')
                .replace(/  /g, '&nbsp; ')
                .replace(/  /g, ' &nbsp;') // need to do this twice to catch a situation where there are an odd number of spaces
                .replace(/\n/g, '</p><p>');

            output = '[' + tag + (option ? '=' + option : '')  + ']' + text + '[/' + tag + ']';
            if (output.match(/\n/))
            {
                output = '<p>' + output + '</p>';
                output = output.replace(/<p><\/p>/g, '<p><br></p>');
            }

            ed.html.insert(output);
        }
    };

    MMO.Hide.Reaction = XF.extend(XF.Reaction, {
        __backup: {
            'actionComplete': '__mhHide_actionComplete'
        },

        actionComplete: function(data)
        {
            this.__mhHide_actionComplete(data);
            if (this.options.reactionList === '< .js-post | .js-reactionsList')
            {
                if (this.$target.closest('.message').find('.message-body').length)
                {
                    setTimeout(function()
                    {
                        this.reloadPost();
                    }.bind(this), 100);
                }
            }
        },

        reloadPost: function()
        {
            XF.ajax('GET', this.$target.attr('href').replace('react', 'show'), {}, XF.proxy(this, 'postUpdate'), {skipDefaultSuccessError: true});
        },

        postUpdate: function(data)
        {
            if (data.errors || data.exception)
            {
                return;
            }

            XF.setupHtmlInsert(data.html, function($html, container)
            {
                var $message = $html.find('.message-body'),
                    $replace = this.$target.closest('.message-cell--main').find('.message-body');

                $replace.replaceWith($message);
            }.bind(this));
        }
    });

    MMO.Hide.QuickReply = XF.extend(XF.SelectToQuote, {
        __backup: {
            'getValidSelectionContainer': '__mhHide_getValidSelectionContainer'
        },

        getValidSelectionContainer: function(selection)
        {
            if (selection.isCollapsed || !selection.rangeCount)
            {
                return null;
            }

            var range = selection.getRangeAt(0);

            if ($(range.startContainer).closest('.bbCodeBlock--hide, .js-noSelectToQuote').length
                || $(range.endContainer).closest('.bbCodeBlock--hide, .js-noSelectToQuote').length)
            {
                return null;
            }

            return this.__mhHide_getValidSelectionContainer(selection);
        }
    });

    $(document).on('editor:first-start', MMO.Hide.EditorButtons.init);

    XF.Element.register('reaction', 'MMO.Hide.Reaction');
    XF.Element.register('select-to-quote', 'MMO.Hide.QuickReply');
} (jQuery, window, document);