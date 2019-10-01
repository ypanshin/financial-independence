'use strict';

const core = require('./core-0c2b188e.js');

const startStatusTap = () => {
    const win = window;
    win.addEventListener('statusTap', () => {
        core.readTask(() => {
            const width = win.innerWidth;
            const height = win.innerHeight;
            const el = document.elementFromPoint(width / 2, height / 2);
            if (!el) {
                return;
            }
            const contentEl = el.closest('ion-content');
            if (contentEl) {
                contentEl.componentOnReady().then(() => {
                    core.writeTask(() => contentEl.scrollToTop(300));
                });
            }
        });
    });
};

exports.startStatusTap = startStatusTap;
