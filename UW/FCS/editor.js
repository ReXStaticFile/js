!function($, window, document, _undefined)
{
    var uwed;
    "use strict";
    XF.UWeditor = XF.extend(XF.Editor, {
        __backup: {
            'startInit': '_startInit',
            'isBbCodeView': '_isBbCodeView'
        },
        startInit: function(callbacks)
        {
            if (this.$target.parent().hasClass('uw_comment'))
            {
                this._startInit(callbacks);
            }
            else
            {
                this._startInit(callbacks);
                uwed = this.ed;
            }
        },
        insertContent: function(html, text)
        {
            var ed = uwed;
            if (this.isBbCodeView())
            {
                if (typeof text !== 'undefined')
                {
                    ed.bbCode.insertBbCode(text);
                }
            }
            else
            {
                this.insertFocus();
                ed.html.insert(html);
                XF.Element.initialize(ed.$el);
            }

//                this.scrollToCursor();
//                this.scrollToCursorAfterPendingResize();
        },
        isBbCodeView: function()
        {
            if (uwed.bbCode && uwed.bbCode.isBbCodeView)
            {
                return uwed.bbCode.isBbCodeView();
            }
            else
            {
                return false;
            }
        },
        insertFocus: function()
        {
            XF.EditorHelpers.focus(uwed);
        }
    });


    XF.UWQuickEdit = XF.extend(XF.QuickEditClick, {
        __backup: {
            'handleAjax': '_handleAjax',
            'stopEditing': '_stopEditing'
        },
        handleAjax: function(data)
        {
            var $editorTarget = this.$editorTarget;
            $editorTarget.closest('.comment-inner').addClass('comment-editing');
            this._handleAjax(data);
        },
        stopEditing: function(showMessage, onComplete)
        {
            var $editorTarget = this.$editorTarget;
            $editorTarget.closest('.comment-inner').removeClass('comment-editing');
            this._stopEditing(showMessage, onComplete)
        }
    });

    XF.CommentQuoteClick = XF.Event.newHandler({
        eventNameSpace: 'XFCommentQuoteClick',
        options: {
            quoteHref: null,
            editor: '.js-quickReply .js-editor'
        },
        init: function()
        {
            if (!this.options.quoteHref)
            {
                console.error('Must be initialized with a data-quote-href attribute.');
            }
        },
        click: function(e)
        {
            e.preventDefault();

            var href = this.options.quoteHref;

            XF.ajax('POST', href, {}, XF.proxy(this, 'handleAjax'), {skipDefaultSuccess: true});

            $(this.options.editor + ' .editorPlaceholder').trigger('click');
            $(e.target).trigger('s2q:click');

            var $editor = XF.findRelativeIf(this.options.editor, this.$target);
            XF.focusEditor($editor);
        },
        handleAjax: function(data)
        {
            var $editor = XF.findRelativeIf(this.options.editor + ' .js-editor', this.$target);
            var edParent = XF.getEditorInContainer($editor);
            var ed = edParent.ed;
            if (edParent.isBbCodeView())
            {
                ed.bbCode.insertBbCode(data.quote);
            }
            else
            {
                edParent.focus();
                ed.html.insert(data.quoteHtml);
                XF.Element.initialize(ed.$el);
                ed.bbCode.insertBbCode(data.quote);                
            }

            edParent.scrollToCursor();
            edParent.scrollToCursorAfterPendingResize();
        }
    });

    XF.UWMultiQuote = XF.extend(XF.MultiQuote, {
        __backup: {
            'removeFromMultiQuote': '_removeFromMultiQuote',
            'initControls' : '_initControls'
        },        
        removeFromMultiQuote: function(messageId)
        {
            var quoteInfo = String(messageId).match(/^(\d+)-(\d+)$/);

            if(quoteInfo == null)
            {
                quoteInfo = String(messageId).match(/^(-\d+)-(\d+)$/);

                this.refreshMqData();

                if (quoteInfo)
                {
                        messageId = quoteInfo[1];

                        delete this.mqStorage[messageId][quoteInfo[2]];

                        if (!this.getQuoteStoreCount(this.mqStorage[messageId]))
                        {
                                delete this.mqStorage[messageId];
                        }
                }
                else
                {
                        delete this.mqStorage[messageId];
                }

                this.updateMultiQuote();

                if (!this.mqStorage[messageId])
                {
                        this.deselectMqControl(messageId);
                        this.triggerCrossTabEvent('removed', messageId);
                }
            }
            else
            {
                this._removeFromMultiQuote(messageId);
            }
        },
        initControls: function()
        {
            if(this.options.messageSelector == '.js-post')
            {
                var messages = '.tooltip--selectToQuote, ' + "article"+this.options.messageSelector,
                        $controls = $(messages).find('.js-multiQuote');

                $(document).on('click', messages, XF.proxy(this, 'controlClick'));

                var self = this;
                $controls.each(function()
                {
                        var $control = $(this),
                                messageId = $control.data('messageId');

                        if (self.mqStorage.hasOwnProperty(messageId))
                        {
                                $control.addClass('is-selected');
                                $control.data('mqAction', 'remove');
                        }
                });
            }
            else
            {
                this._initControls();
            }
        },
    });
    
    XF.Element.extend('inline-mod', {
        toggleContainer: function($toggle, selected)
        {
            if (!$toggle.hasClass('uw_fcs_inlineMod'))
            {
                var method = selected ? 'addClass' : 'removeClass';
                $toggle.closest(this.options.toggleContainer)[method](this.options.containerClass);
            }
        },
        deselect: function()
        {
            this.setCookieValue([]);
            this.recalculateFromCookie();
            this.hideBar();
            $('.comment').removeClass('is-mod-selected');
            $('.message-inner.message').removeClass('is-mod-selected');
        }
    });

    XF.UWSelectToQuote = XF.extend(XF.SelectToQuote, {
        createButton: function($selectionContainer, id)
        {
                var $message = $selectionContainer.closest(this.options.messageSelector),
                        $tooltip = $('<span />');

                var $mqButton = $message.find('.actionBar-action.js-multiQuote:first').clone();
                if ($mqButton.length)
                {
                        $mqButton
                                .attr('title', '')
                                .removeClass('is-selected')
                                .data('mqAction', 'add')
                                .css({
                                        marginLeft: 0,
                                        background: 'transparent'
                                })
                                .on('s2q:click', XF.proxy(this, 'buttonClicked'));

                        $tooltip.append($mqButton);
                        $tooltip.append(document.createTextNode(' | '));
                }

                var $quoteButton = $message.find('.actionBar-action[data-xf-click="quote"]:first')
                                .attr('title', '')
                                .clone()
                                .css({
                                        marginLeft: 0
                                })
                                .on('s2q:click', XF.proxy(this, 'buttonClicked'));

                $tooltip.append($quoteButton);

                this.tooltip = new XF.TooltipElement($tooltip, {
                        html: true,
                        placement: 'bottom'
                });
                this.tooltipId = id;
        }
    });
    
    XF.UWGuestUsername = XF.extend(XF.GuestUsername, {
        __backup: {
            'change': '_change'
        },
        change: function()
        {
            this._change();
            var $input = this.$target;
            $('*[data-xf-init="guest-username"]').val($input.val());
        }
    });    

    // Registering our extension
    XF.Event.register('click', 'commentquote', 'XF.CommentQuoteClick');
    XF.Element.register('editor-test', 'XF.UWeditor');
    XF.Element.register('quick-edit', 'XF.UWQuickEdit');
    XF.Element.register('multi-quote', 'XF.UWMultiQuote');
    XF.Element.register('select-to-quote', 'XF.UWSelectToQuote');
    XF.Element.register('guest-username', 'XF.UWGuestUsername');
}(jQuery, window, document);