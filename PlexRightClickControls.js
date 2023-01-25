// ==UserScript==
// @name         Plex Right Click Controls
// @namespace    http://tampermonkey.net/
// @version      1.0
// @author       Dyvinia
// @match        https://app.plex.tv/desktop/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=plex.tv
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    //GM_addStyle('button[class^="PlayPauseOverlay-"] { display: block !important; margin-left: 46.5%; width: 100px; }');

    waitForElm('[class^=HTMLMedia-mediaElement-]').then((elm) => {
        document.querySelector('[class^=HTMLMedia-mediaElement-]').setAttribute('onclick', "this[this.paused ? 'play' : 'pause']()");
        GM_addStyle('button[class^="PlayPauseOverlay-"] { pointer-events: none; }');
    });

    function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

})();