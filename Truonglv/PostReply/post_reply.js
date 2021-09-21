!(function ($, window, document, _undefined) {
    XF.PostReply_ReplyClick = XF.Event.newHandler({
        eventNameSpace: 'PostReply_ReplyClick',
        options: {
            formUrl: null,
            messageSelector: null,
        },

        loading: false,
        formHtml: null,
        $container: null,
        $close: null,

        init: function () {
            var closeClasses = ['button', 'button--iconOnly', 'button--icon'];
            this.$close = $('<button />').addClass(closeClasses.join(' ')).attr('type', 'button');
            this.$close.html('<span class="button-text"><i class="fa fa-times" aria-hidden="true"></i></span>');
        },

        click: function (e) {
            e.preventDefault();
            if (this.loading || this.formHtml) {
                if (this.$container) {
                    this.$container.show();
                    XF.focusEditor(this.$container);
                }

                return;
            }

            this.loading = true;
            var $newMessagesContainer = null,
                maxLoop = 10,
                postLevel = 0,
                lastShownPost = 0;
            while (maxLoop > 0) {
                maxLoop--;
                if ($newMessagesContainer === null) {
                    $newMessagesContainer = this.$target.closest('.js-tprReplyMessageContainer');
                } else {
                    $newMessagesContainer = XF.findRelativeIf('<:up(5)', $newMessagesContainer);
                }

                if ($newMessagesContainer.hasClass('js-tprReplyMessageContainer')) {
                    postLevel++;
                } else {
                    break;
                }
            }

            var $messages;
            if (postLevel > 1) {
                var $newContainer = this.$target.closest('.js-tprReplyMessageContainer');
                $messages = $newContainer.find('>.js-post');
            } else {
                var $messagesContainer = XF.findRelativeIf(this.options.messageSelector, this.$target);
                $messages = $messagesContainer.find('.js-post');
            }
            if ($messages.length > 0) {
                var lastMessage = $messages.last(),
                    content = lastMessage.data('content'),
                    parts = content.split('-');
                if (parts.length >= 2) {
                    lastShownPost = parts[1];
                }
            }

            var _this = this;
            XF.ajax('POST', this.options.formUrl, { last_post: lastShownPost }, function (data) {
                _this.formHtml = data.html;
                if (!_this.$container && data.hasOwnProperty('formHolder')) {
                    _this.$container = $(data.formHolder);
                }
                _this.$container.empty().show();

                XF.setupHtmlInsert(data.html, function ($html) {
                    var $closeBtn = _this.$close.clone();
                    $closeBtn.on('click', function () {
                        _this.$container.hide();
                    });

                    $closeBtn.appendTo($html.find('.formButtonGroup-primary'));
                    $html.appendTo(_this.$container);

                    setTimeout(function () {
                        _this.setupComplete($html, data);
                    }, XF.config.speed.xxfast);
                });
            }).always(function () {
                _this.loading = false;
            });
        },

        setupComplete: function ($html, data) {
            if (data.hasOwnProperty('mentionUser') && data.mentionUser) {
                XF.replaceEditorContent(this.$container, data.mentionUser + '<span> </span>', data.mentionUser + ' ');
            }

            XF.focusEditor(this.$container);
        },
    });

    XF.PostReply_LoadReplies = XF.Event.newHandler({
        eventNameSpace: 'PostReply_LoadReplies',
        options: {
            link: null,
            messageSelector: null,
            sibling: 0,
        },

        link: null,
        loading: false,

        init: function () {
            this.link = this.options.link || this.$target.attr('href');
            if (!this.link) {
                throw new Error('No link for load');
            }
        },

        click: function (e) {
            e.preventDefault();
            var skipIds = [],
                _this = this,
                $messages = XF.findRelativeIf(this.options.messageSelector, this.$target);

            for (var i = 0; i < $messages.length; i++) {
                var content = $($messages[i]).data('content'),
                    parts = content.split('-');
                if (parts.length >= 2) {
                    skipIds.push(parts[1]);
                }
            }

            if (this.loading) {
                return;
            }
            this.loading = true;
            var payload = {
                skip_ids: skipIds.join(','),
                sibling: this.options.sibling,
            };

            XF.ajax('POST', this.link, payload, XF.proxy(this, 'onResponse')).always(function () {
                _this.loading = false;
            });
        },

        onResponse: function (data) {
            if (!data.hasOwnProperty('hasMore') || !data.hasMore) {
                this.$target.hide();
            }

            var _this = this;
            XF.setupHtmlInsert(data.html, function ($html) {
                $html.insertAfter(_this.$target);
            });
        },
    });

    XF.PostReply_ExpandQuote = XF.Event.newHandler({
        eventNameSpace: 'PostReply_ExpandQuote',
        options: {
            content: null,
        },

        $content: null,

        init: function () {
            this.$content = XF.findRelativeIf(this.options.content, this.$target);
        },

        click: function (e) {
            e.preventDefault();
            this.$content.show();
        },
    });

    XF.Event.register('click', 'tpr-load-replies', 'XF.PostReply_LoadReplies');
    XF.Event.register('click', 'tpr-post-reply', 'XF.PostReply_ReplyClick');
    XF.Event.register('click', 'tpr-expand-quote', 'XF.PostReply_ExpandQuote');
})(jQuery, this, document);
