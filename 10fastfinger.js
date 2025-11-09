// ==UserScript==
// @name          Auto Go Chu
// @description   Auto gõ chữ trên 10fastfinger
// @match         *://*.10fastfingers.com/*
// @grant         none
// @author         Vanh
// @version       1.7
// ==/UserScript==

(function() {
    'use strict';

    console.log('Script Auto Go Chu Pro V1.7 da chay');

    const TYPING_DELAY_MS = 958; //điều chỉnh tốc độ gõ (khuyến nghị nên để cao rồi hạ thấp dần để tránh anti cheat)

    const oInput = document.getElementById('inputfield');
    const hangChu = document.getElementById('row1');

    if (!oInput || !hangChu) {
        console.error('DECH tim thay o input hoac hang chu. Script chet.');
        return;
    }

    let dangXuLy = false;

    function dispatchKeyEvents(target, key, code, keyCode) {
        const eventProps = {
            key: key,
            code: code,
            keyCode: keyCode,
            which: keyCode,
            bubbles: true,
            cancelable: true
        };

        target.dispatchEvent(new KeyboardEvent('keydown', eventProps));
        target.dispatchEvent(new KeyboardEvent('keypress', eventProps));
        target.dispatchEvent(new KeyboardEvent('keyup', eventProps));
    }


    function copyChuHienTai() {
        if (dangXuLy) return;
        dangXuLy = true;

        const chuHienTai = hangChu.querySelector('span.highlight');

        if (chuHienTai) {
            let chuCanGo = chuHienTai.innerText;

            setTimeout(() => {
                oInput.value = chuCanGo;
                oInput.dispatchEvent(new Event('input', { bubbles: true }));

                dispatchKeyEvents(oInput, ' ', 'Space', 32);

                dangXuLy = false;
            }, TYPING_DELAY_MS);

        } else {
            console.log('Xong game, khong con chu highlight.');
            dangXuLy = false;
        }
    }

    const observer = new MutationObserver(function(mutations) {
        copyChuHienTai();
    });

    observer.observe(hangChu, {
        attributes: true,
        subtree: true,
        attributeFilter: ['class']
    });

    copyChuHienTai();
})();
