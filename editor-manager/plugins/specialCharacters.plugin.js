/*!
 * kl/editor-manager/plugins/specialCharacters.plugin.js
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

            var $btn = $(xfEditor.ed.$tb.find('.fr-command[data-cmd="specialCharacters"]')).first();

            if (!initialized)
            {
                initialized = true;

                var menuHtml = $.trim($('.js-xfEditorMenu').first().html());

                $menu = $($.parseHTML(Mustache.render($('.js-specialCharacters').first().html())));
                $menu.insertAfter($btn);

                $btn.data('xf-click', 'menu');

                var handler = XF.Event.getElementHandler($btn, 'menu', 'click');

                $menu.on('menu:complete', function () {
                    $menuScroll = $menu.find('.menu-scroller');

                    if (!loaded) {
                        loaded = true;

                        $menuScroll.find('.js-specialCharacter').on('click', insertSpecialChar);

                        var $specialCharsSearch = $menu.find('.js-specialCharacterSearch');
                        $specialCharsSearch.on('focus', selectionSave);
                        $specialCharsSearch.on('blur', selectionRestore);
                        $specialCharsSearch.on('input', performSearch);

                        $menu.find('.js-specialCharsCloser').on('click', function () {
                            XF.EditorHelpers.focus(xfEditor.ed);
                        });

                        $(document).on('recent-klem-special-character:logged', updateRecentSpecialChar);

                        xfEditor.ed.events.on('commands.mousedown', function ($el) {
                            if ($el.data('cmd') !== 'specialCharacters') {
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

        function insertSpecialChar(e) {
            var $target = $(e.currentTarget),
                html = $target.html().trim();

            XF.EditorHelpers.focus(xfEditor.ed);
            xfEditor.ed.html.insert(html);
            selectionSave();
            XF.EditorHelpers.blur(xfEditor.ed);

            if ($menu) {
                var $insertRow = $menu.find('.js-specialCharacterInsertedRow');
                $insertRow.find('.js-specialCharacterInsert').html(html);
                $insertRow.addClassTransitioned('is-active');

                clearTimeout(flashTimeout);
                flashTimeout = setTimeout(function () {
                    $insertRow.removeClassTransitioned('is-active');
                }, 1500);
            }

            clearTimeout(logTimeout);
            logTimeout = setTimeout(function () {
                logRecentSpecialCharacterUsage($target.data('id'));
            }, 1500);
        }

        function performSearch() {
            var $input = $(this),
                $fullList = $menu.find('.js-specialCharacterFullList'),
                $searchResults = $menu.find('.js-specialCharacterSearchResults');

            clearTimeout(timer);

            timer = setTimeout(function () {
                var value = $input.val();

                if (!value || value.length < 2) {
                    $searchResults.hide();
                    $fullList.show();
                    return;
                }

                var url = XF.canonicalizeUrl('index.php?editor/kl-em-special-chars/search');
                XF.ajax('GET', url, {'q': value}, function (data) {
                    if (!data.html) {
                        return;
                    }

                    XF.setupHtmlInsert(data.html, function ($html) {
                        $html.find('.js-specialCharacter').on('click', insertSpecialChar);

                        $fullList.hide();
                        $searchResults.replaceWith($html);
                    });
                });
            }, 300);
        }

        function getRecentSpecialCharUsage() {
            var value = XF.Cookie.get('klem_specialcharacter_usage'),
                recent = value ? value.split(',') : [];

            return recent.reverse();
        }

        function updateRecentSpecialChar() {
            var recent = getRecentSpecialCharUsage(),
                $recentHeader = $menuScroll.find('.js-recentHeader'),
                $recentBlock = $menuScroll.find('.js-recentBlock'),
                $recentList = $recentBlock.find('.js-recentList'),
                $specialCharLists = $menuScroll.find('.js-specialCharacterList');

            if (!recent) {
                return;
            }

            var $newList = $recentList.clone(),
                newListArr = [];

            $newList.empty();

            for (var i in recent) {
                var id = recent[i],
                    $specialChar;

                $specialCharLists.each(function () {
                    var $list = $(this),
                        $original = $list.find('.js-specialCharacter[data-id="' + id + '"]').closest('li');

                    $specialChar = $original.clone();

                    if ($specialChar.length) {
                        $specialChar.find('.js-specialCharacter').on('click', insertSpecialChar);
                        newListArr.push($specialChar);
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

        function logRecentSpecialCharacterUsage(id) {
            id = $.trim(id);

            var limit = XF.Feature.has('hiddenscroll') ? 12 : 11, // bit arbitrary but basically a single row on full width displays
                value = XF.Cookie.get('klem_specialcharacter_usage'),
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
                'klem_specialcharacter_usage',
                recent.join(','),
                new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            );

            $(document).trigger('recent-klem-special-character:logged');

            return recent;
        }

        $.FE.DefineIcon('klSpecialChars', {NAME: 'omega'});
        $.FE.RegisterCommand('specialCharacters', {
            title: 'Special Characters',
            icon: 'klSpecialChars',
            undo: false,
            focus: false,
            refreshOnCallback: false,
            callback: function () {
                showMenu();
            }
        });

    });
})(jQuery);