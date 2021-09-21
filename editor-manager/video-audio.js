/*!
 * kl/editor-manager/hide-refresh.js
 * License https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode
 * Copyright 2017 Lukas Wieditz
 */

/*global $, XF, setTimeout, jQuery, window, document, console */

(function ($, window, document, Plyr, _undefined) {
    "use strict";

    var videoOptions = {
            controls: ['play', 'progress', 'volume', 'mute', 'current-time', 'fullscreen'],
            keyboard: {focused: true, global: false},
            displayDuration: true,
        },
        videoPlayers = Array.from(document.querySelectorAll('.js-PlyrVideo')).map(p => new Plyr(p, videoOptions)),
        audioOptions = {
            controls: ['play', 'progress', 'volume', 'mute', 'current-time'],
            keyboard: {focused: true, global: false},
            displayDuration: true,
        },
        audioPlayers = Array.from(document.querySelectorAll('.js-PlyrAudio')).map(p => new Plyr(p, audioOptions));

    $(document).bind('DOMNodeInserted', function () {
        var videoPlayers = Array.from(document.querySelectorAll('.js-PlyrVideo')).map(p => new Plyr(p, videoOptions)),
            audioPlayers = Array.from(document.querySelectorAll('.js-PlyrAudio')).map(p => new Plyr(p, audioOptions));
    });

}($, window, document, Plyr));