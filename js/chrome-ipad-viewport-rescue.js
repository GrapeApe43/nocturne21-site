
/* Nocturne 21 — Chrome-on-iPad orientation rescue.
   Based on the successful manual width correction in Test L.
   Include near the end of <body>, with defer, or after the body exists.
*/
(function () {
  'use strict';

  const ua = navigator.userAgent;
  const isChromeIOS = /CriOS\//.test(ua);
  const isIPad = /iPad/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (!isChromeIOS || !isIPad) return;

  const root = document.documentElement;
  let body;
  let active = false;
  let pending = [];
  let lastTarget = 0;

  function visibleWidth() {
    // innerWidth is not affected by visual-viewport zoom.
    return Math.round(window.innerWidth);
  }

  function setWidth(node, target) {
    node.style.setProperty('width', target + 'px', 'important');
    node.style.setProperty('min-width', '0px', 'important');
    node.style.setProperty('max-width', target + 'px', 'important');
  }

  function correct() {
    body = document.body;
    if (!body) return;

    const target = visibleWidth();
    if (!target || target < 300) return;

    const mismatch = Math.abs(root.clientWidth - target) > 2;

    // Once rescued, keep the explicit width synchronized
    // on every rotation.
    if (!mismatch && (!active || target === lastTarget)) return;

    setWidth(root, target);
    setWidth(body, target);

    active = true;
    lastTarget = target;

    // Request a synchronous layout calculation.
    void root.offsetWidth;

    document.dispatchEvent(
      new CustomEvent('n21-viewport-rescue', {
        detail: {
          target,
          clientWidth: root.clientWidth,
          scrollWidth: root.scrollWidth
        }
      })
    );
  }

  function schedule() {
    pending.forEach(clearTimeout);
    pending = [];

    requestAnimationFrame(correct);

    [80, 250, 650, 1300].forEach(function (ms) {
      pending.push(setTimeout(correct, ms));
    });
  }

  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('orientationchange', schedule, { passive: true });

  if (window.visualViewport) {
    window.visualViewport.addEventListener(
      'resize',
      schedule,
      { passive: true }
    );
  }

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) schedule();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule, { once: true });
  } else {
    schedule();
  }

  window.addEventListener('load', schedule, { once: true });
})();
