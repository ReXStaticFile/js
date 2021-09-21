/*!
 * kl/editor-manager/plugins/fontAwesomeIcons.plugin.js
 * License https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode
 * Copyright 2020 Lukas Wieditz
 */

/*global console, jQuery, XF, setTimeout */
/*jshint loopfunc:true */

(function ($) {
    $(document).on('editor:config', function (event, config, xfEditor) {
        var initialized = false,
            loaded = false,
            $menu,
            $menuScroll,
            scrollTop = 0,
            flashTimeout,
            logTimeout,
            timer;

        function showMenu()
        {
            selectionSave();

            XF.EditorHelpers.blur(xfEditor.ed);

            var $btn = $(xfEditor.ed.$tb.find('.fr-command[data-cmd="klFontAwesome"]')).first();

            if (!initialized)
            {
                initialized = true;

                var menuHtml = $.trim($('.js-xfEditorMenu').first().html());

                $menu = $($.parseHTML(Mustache.render($('.js-fontAwesomeIcon').first().html())));
                $menu.insertAfter($btn);

                $btn.data('xf-click', 'menu');

                var handler = XF.Event.getElementHandler($btn, 'menu', 'click');

                $menu.on('menu:complete', function () {
                    $menuScroll = $menu.find('.menu-scroller');

                    if (!loaded) {
                        loaded = true;

                        $menuScroll.find('.js-fontAwesomeIcon').on('click', insertfontAwesomeIcon);

                        var $fontAwesomeIconSearch = $menu.find('.js-fontAwesomeIconSearch');
                        $fontAwesomeIconSearch.on('focus', selectionSave);
                        $fontAwesomeIconSearch.on('blur', selectionRestore);
                        $fontAwesomeIconSearch.on('input', performSearch);

                        $menu.find('.js-fontAwesomeIconCloser').on('click', function () {
                            XF.EditorHelpers.focus(xfEditor.ed);
                        });

                        $(document).on('recent-klem-font-awesome-icon:logged', updateRecentfontAwesomeIcon);

                        xfEditor.ed.events.on('commands.mousedown', function ($el) {
                            if ($el.data('cmd') !== 'fontAwesomeIcon') {
                                handler.close();
                            }
                        });

                        $menu.on('menu:closed', function () {
                            scrollTop = $menuScroll.scrollTop();
                        });
                    }

                    $menuScroll.scrollTop(scrollTop);
                });

                $menu.on('menu:closed', function()
                {
                    setTimeout(function()
                    {
                        xfEditor.ed.markers.remove();
                    }, 50);
                });
            }

            var clickHandlers = $btn.data('xfClickHandlers');
            if (clickHandlers && clickHandlers.menu)
            {
                clickHandlers.menu.toggle();
            }
        }

        function insertfontAwesomeIcon(e) {
            var $target = $(e.currentTarget),
                html = $target.html().trim();

            XF.EditorHelpers.focus(xfEditor.ed);
            xfEditor.ed.html.insert(html);
            selectionSave();
            XF.EditorHelpers.blur(xfEditor.ed);

            if ($menu) {
                var $insertRow = $menu.find('.js-fontAwesomeIconInsertedRow');
                $insertRow.find('.js-fontAwesomeIconInsert').html(html);
                $insertRow.addClassTransitioned('is-active');

                clearTimeout(flashTimeout);
                flashTimeout = setTimeout(function () {
                    $insertRow.removeClassTransitioned('is-active');
                }, 1500);
            }

            clearTimeout(logTimeout);
            logTimeout = setTimeout(function () {
                logRecentfontAwesomeIconUsage($target.data('id'));
            }, 1500);
        }

        function performSearch() {
            var $input = $(this),
                $fullList = $menu.find('.js-fontAwesomeIconFullList'),
                $searchResults = $menu.find('.js-fontAwesomeIconSearchResults');

            clearTimeout(timer);

            timer = setTimeout(function () {
                var value = $input.val();

                if (!value || value.length < 2) {
                    $searchResults.hide();
                    $fullList.show();
                    return;
                }

                var url = XF.canonicalizeUrl('index.php?editor/kl-em-font-awesome-icons/search');
                XF.ajax('GET', url, {'q': value}, function (data) {
                    if (!data.html) {
                        return;
                    }

                    XF.setupHtmlInsert(data.html, function ($html) {
                        $html.find('.js-fontAwesomeIcon').on('click', insertfontAwesomeIcon);

                        $fullList.hide();
                        $searchResults.replaceWith($html);
                    });
                });
            }, 300);
        }

        function getRecentfontAwesomeIconUsage() {
            var value = XF.Cookie.get('klem_fontAwesomeIcon_usage'),
                recent = value ? value.split(',') : [];

            return recent.reverse();
        }

        function updateRecentfontAwesomeIcon() {
            var recent = getRecentfontAwesomeIconUsage(),
                $recentHeader = $menuScroll.find('.js-recentHeader'),
                $recentBlock = $menuScroll.find('.js-recentBlock'),
                $recentList = $recentBlock.find('.js-recentList'),
                $fontAwesomeIconLists = $menuScroll.find('.js-fontAwesomeIconList');

            if (!recent) {
                return;
            }

            var $newList = $recentList.clone(),
                newListArr = [];

            $newList.empty();

            for (var i in recent) {
                var id = recent[i],
                    $fontAwesomeIcon;

                $fontAwesomeIconLists.each(function () {
                    var $list = $(this),
                        $original = $list.find('.js-fontAwesomeIcon[data-id="' + id + '"]').closest('li');

                    $fontAwesomeIcon = $original.clone();

                    if ($fontAwesomeIcon.length) {
                        $fontAwesomeIcon.find('.js-fontAwesomeIcon').on('click', insertfontAwesomeIcon);
                        newListArr.push($fontAwesomeIcon);
                        return false;
                    }
                });
            }

            for (i in newListArr) {
                var $li = newListArr[i];
                $li.appendTo($newList);
            }

            $recentList.replaceWith($newList);

            if ($recentBlock.hasClass('is-hidden')) {
                $recentBlock.hide();
                $recentBlock.removeClass('is-hidden');
                $recentHeader.removeClass('is-hidden');
                $recentBlock.xfFadeDown(XF.config.speed.fast);
            }
        }

        function selectionSave() {
            xfEditor.ed.selection.save();
        }

        function selectionRestore() {
            xfEditor.ed.selection.restore();
        }

        function logRecentfontAwesomeIconUsage(id) {
            id = $.trim(id);

            var limit = XF.Feature.has('hiddenscroll') ? 12 : 11, // bit arbitrary but basically a single row on full width displays
                value = XF.Cookie.get('klem_fontAwesomeIcon_usage'),
                recent = value ? value.split(',') : [],
                exist = recent.indexOf(id);

            if (exist !== -1) {
                recent.splice(exist, 1);
            }

            recent.push(id);

            if (recent.length > limit) {
                recent = recent.reverse().slice(0, limit).reverse();
            }

            XF.Cookie.set(
                'klem_fontAwesomeIcon_usage',
                recent.join(','),
                new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            );

            $(document).trigger('recent-klem-font-awesome-icon:logged');

            return recent;
        }

        $.FE.DefineIcon('klFontAwesome', {NAME: 'flag'});
        $.FE.RegisterCommand('klFontAwesome', {
            title: 'Font Awesome Icons',
            icon: 'klFontAwesome',
            undo: false,
            focus: false,
            refreshOnCallback: false,
            callback: function () {
                showMenu();
            }
        });

    });
})(jQuery);