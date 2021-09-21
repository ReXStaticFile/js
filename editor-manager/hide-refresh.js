/*!
 * kl/editor-manager/hide-refresh.js
 * License https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode
 * Copyright 2017 Lukas Wieditz
 */

/*global $, XF, setTimeout, jQuery, window, document, console */

(function ($, window, document, _undefined) {
    "use strict";
    $(document).on('ajax:before-success', function($data, $status, $xhr) {
       if($status.klEMPosts) {
           $.each($status.klEMPosts, function($index, $content) {
               $('article[data-content="post-' + $index + '"] article.message-body').html($content);
           });
       }
    });
}($, window, document));