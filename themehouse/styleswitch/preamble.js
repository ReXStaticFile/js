var themehouse = themehouse || {};

themehouse.styleSwitch = {
    autodetectInitialized: false,
    styleToggleInitialized: false,

    initAutodetect: function() {
        if (!thstyleswitchConfig.autodetectEnabled) {
            return;
        }
        if (themehouse.styleSwitch.autodetectInitialized) {
            return;
        }
        themehouse.styleSwitch.autodetectInitialized = true;
        var preferred = themehouse.styleSwitch.getPreferredStyleType();

        var write = '';
        if (preferred === null) {
            var defaultStyleKey = thstyleswitchConfig.currentStyleType + 'Style';
            var styleOpts = thstyleswitchConfig[defaultStyleKey];

            write = themehouse.styleSwitch.buildStyleLinkTag(styleOpts.primaryCssUrl) + themehouse.styleSwitch.buildStyleLinkTag(styleOpts.additionalCssUrl);
        } else {
            write = themehouse.styleSwitch.buildStyleLinkTag(thstyleswitchConfig.lightStyle.primaryCssUrl, 'light') +
                themehouse.styleSwitch.buildStyleLinkTag(thstyleswitchConfig.lightStyle.additionalCssUrl, 'light') +
                themehouse.styleSwitch.buildStyleLinkTag(thstyleswitchConfig.darkStyle.primaryCssUrl, 'dark') +
                themehouse.styleSwitch.buildStyleLinkTag(thstyleswitchConfig.darkStyle.additionalCssUrl, 'dark');
        }

        document.write(write);
    },

    initStyleToggle: function() {
        $('.thstyleswitch_toggleSwitch__checkbox').click(function(e) {
            var checked = $(e.target).is(':checked');

            var styleType = null;
            if (checked) {
                styleType = 'dark';
            } else {
                styleType = 'light';
            }

            themehouse.styleSwitch.switchStyle(styleType);
        });
    },

    switchStyle: function(styleType) {
        var styleOpts = thstyleswitchConfig[styleType + 'Style'];
        console.log(styleOpts);
        themehouse.styleSwitch.updateStyleType(styleType, false);

        var originalLoadedCss = Object.keys(thstyleswitchConfig.originalCss);
        var currentLoadedCss = Object.keys(XF.config.css);
        var cssDiff = themehouse.styleSwitch.getArrayDiff(originalLoadedCss, currentLoadedCss);
        var css = styleOpts.primaryCss.concat(styleOpts.additionalCss, cssDiff);

        $.get({
            url: styleOpts.switchStyleUrl,
            success: function(data, textStatus, xhr) {
                themehouse.styleSwitch.forceLoadStyleSheets(css, function() {
                    $('.thstyleswitch-currentStyling').remove();
                    $('.thstyleswitch-newStyling').addClass('thstyleswitch-currentStyling').removeClass('thstyleswitch-newStyling');
                    $(document).trigger('thstyleswitch:switch', [styleType]);
                }, 'thstyleswitch-newStyling');
            }
        });
    },

    detectStyleType: function() {
        if (!thstyleswitchConfig.autodetectEnabled) {
            return;
        }

        var styleType = themehouse.styleSwitch.getPreferredStyleType();

        if (styleType) {
            themehouse.styleSwitch.updateStyleType(styleType);
        }
    },

    buildStyleLinkTag: function(cssUrl, styleMode) {
        var styleAttr = '';
        if (styleMode) {
            styleAttr = 'media="(prefers-color-scheme: ' + styleMode + ')" ';
        }

        return '<link rel="stylesheet" ' + styleAttr + 'href="' + cssUrl + '" />';
    },

    getPreferredStyleType: function() {
        var isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var isLight = window.matchMedia("(prefers-color-scheme: light)").matches;

        if (isDark) {
            return 'dark';
        }

        if (isLight) {
            return 'light';
        }

        return null;
    },

    updateStyleType: function(styleType, loadAdditionalCss) {
        loadAdditionalCss = loadAdditionalCss || false;

        var styleOpts = thstyleswitchConfig[styleType + 'Style'];

        XF.config.url.css = styleOpts.cssUrl;

        thstyleswitchConfig.currentStyleType = styleType;

        if (styleType === 'light') {
            $('.thstyleswitch_toggleSwitch__checkbox').attr('checked', false);
        } else {
            $('.thstyleswitch_toggleSwitch__checkbox').attr('checked', true);
        }

        if (!loadAdditionalCss) {
            return;
        }

        var originalLoadedCss = Object.keys(thstyleswitchConfig.originalCss);
        var currentLoadedCss = Object.keys(XF.config.css);
        var cssDiff = themehouse.styleSwitch.getArrayDiff(originalLoadedCss, currentLoadedCss);

        if (cssDiff.length > 0) {
            themehouse.styleSwitch.forceLoadStyleSheets(cssDiff, function() {
                $('.thstyleswitch-currentStyling').remove();
                $('.thstyleswitch-newStyling').addClass('thstyleswitch-currentStyling').removeClass('thstyleswitch-newStyling');
                $(document).trigger('thstyleswitch:switch', [styleType]);
            }, 'thstyleswitch-newStyling');
        }
    },

    forceLoadStyleSheets: function(css, onComplete, styleTagClass) {
        css = css || [];
        styleTagClass = styleTagClass || 'thstyleswitch_ajax_css';

        var totalRemaining = (css.length ? 1 : 0),
            markFinished = function() {
                totalRemaining--;
                if (totalRemaining === 0 && onComplete) {
                    onComplete();
                }
            };

        if (!totalRemaining) {
            if (onComplete) {
                onComplete();
            }
            return;
        }

        if (css.length) {
            var cssUrl = XF.config.url.css;
            if (cssUrl) {
                cssUrl = cssUrl.replace('__SENTINEL__', css.join(','));
            }

            $.ajax({
                type: 'GET',
                url: cssUrl,
                cache: true,
                global: false,
                dataType: 'text',
                success: function (cssText) {
                    var baseHref = XF.config.url.basePath;
                    if (baseHref) {
                        cssText = cssText.replace(
                            /(url\(("|')?)([^"')]+)(("|')?\))/gi,
                            function (all, front, null1, url, back, null2) {
                                if (!url.match(/^([a-z]+:|\/)/i)) {
                                    url = baseHref + url;
                                }
                                return front + url + back;
                            }
                        );
                    }

                    $('<style class="' + styleTagClass + '">' + cssText + '</style>').appendTo('head');
                }
            }).always(function () {
                markFinished();
            });
        } else {
            console.error('No CSS URL so cannot dynamically load CSS');
            markFinished();
        }
    },

    getArrayDiff: function(a1, a2) {
        var a = [], diff = [], i = 0;

        for (i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }

        for (i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }

        for (var k in a) {
            diff.push(k);
        }

        return diff;
    }
};