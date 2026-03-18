// === ROOT DISPLAY FIX ===
(function(){
  function fixRoot() {
    var root = document.getElementById('root');
    if (root && root.style.display === 'none') root.style.display = '';
    if (root && root.children[0] && root.children[0].style.display === 'none') root.children[0].style.display = '';
  }
  fixRoot();
  setInterval(fixRoot, 50);
  var ro = new MutationObserver(fixRoot);
  document.addEventListener('DOMContentLoaded', function() {
    fixRoot();
    var root = document.getElementById('root');
    if (root) ro.observe(root, { attributes: true, attributeFilter: ['style'], childList: true, subtree: false });
    if (root && root.children[0]) ro.observe(root.children[0], { attributes: true, attributeFilter: ['style'] });
  });
})();

// === BRANDING ===
(function() {
  'use strict';
  var BRAND = 'slime.chat';
  var LOGO_HTML = '<div class="slime-logo-container"><div class="slime-text">slime.<span class="line2">chat</span></div><div class="drips"><div class="drip" style="left:12%;--w:6px;--dur:2.8s;--delay:0s;--maxH:35px"></div><div class="drip" style="left:20%;--w:9px;--dur:3.5s;--delay:0.4s;--maxH:50px"></div><div class="drip" style="left:30%;--w:7px;--dur:4.1s;--delay:1.2s;--maxH:40px"></div><div class="drip" style="left:38%;--w:5px;--dur:2.5s;--delay:0.8s;--maxH:28px"></div><div class="drip" style="left:48%;--w:10px;--dur:3.8s;--delay:0.2s;--maxH:55px"></div><div class="drip" style="left:55%;--w:6px;--dur:3.2s;--delay:1.5s;--maxH:32px"></div><div class="drip" style="left:65%;--w:8px;--dur:4.5s;--delay:0.6s;--maxH:48px"></div><div class="drip" style="left:72%;--w:5px;--dur:2.9s;--delay:1.0s;--maxH:30px"></div><div class="drip" style="left:82%;--w:7px;--dur:3.6s;--delay:1.8s;--maxH:42px"></div><div class="drip" style="left:90%;--w:6px;--dur:3.0s;--delay:0.3s;--maxH:36px"></div></div></div>';
  var TAGLINE = 'Find your friends. No age Verification. No BS. Just chat, ducks, caffiene, feet and friends.';
  var DESCRIPTION = 'slime.chat is a self-contained, data deleting chat system that allows you to chat without the worry of a big company spying and selling your data. It stays on the server here, with Gurth for a maximum of 2 weeks for security and safety issues, and then is deleted forever.';

  function applyBranding() {
    var svgs = document.querySelectorAll('svg[width="500"][height="94"]');
    svgs.forEach(function(svg) {
      svg.style.display = 'none';
      var parent = svg.parentElement;
      if (parent && !parent.querySelector('.slime-logo-container')) {
        var d = document.createElement('div');
        d.innerHTML = LOGO_HTML;
        parent.insertBefore(d.firstChild, svg);
      }
    });
    if (svgs.length === 0) {
      document.querySelectorAll('svg').forEach(function(svg) {
        var cls = svg.getAttribute('class') || '';
        if (cls.indexOf('fill_var') !== -1 && cls.indexOf('on-surface') !== -1) {
          svg.style.display = 'none';
          var parent = svg.parentElement;
          if (parent && !parent.querySelector('.slime-logo-container')) {
            var d = document.createElement('div');
            d.innerHTML = LOGO_HTML;
            parent.insertBefore(d.firstChild, svg);
          }
        }
      });
    }
    document.querySelectorAll('h1, h2, h3, h4, h5, h6, b, strong').forEach(function(el) {
      if (el.closest('.slime-logo-container')) return;
      var t = el.textContent.trim();
      if (t.indexOf('Find your community') !== -1 || t.indexOf('connect with the world') !== -1) {
        el.textContent = TAGLINE;
        el.style.fontWeight = '800';
        el.style.fontSize = '1.4em';
        el.style.display = 'flex';
        el.style.flexDirection = 'column';
        el.style.alignItems = 'center';
        el.style.textAlign = 'center';
      }
    });
    document.querySelectorAll('p, span').forEach(function(el) {
      if (el.closest('.slime-logo-container')) return;
      if (el.children.length > 2) return;
      if (el.querySelector('button, input')) return;
      var t = el.textContent.trim();
      if (t.indexOf('one of the best ways') !== -1 || t.indexOf('stay connected with your friends') !== -1 || t.indexOf('Stoat is') !== -1) {
        el.textContent = DESCRIPTION;
        el.style.textAlign = 'center';
        el.style.opacity = '0.5';
      }
    });
    document.querySelectorAll('p, span, div, a, small').forEach(function(el) {
      if (el.children.length > 2) return;
      if (el.closest('.slime-logo-container')) return;
      var t = el.textContent.trim();
      if (t.indexOf('unsplash') !== -1 || t.indexOf('@fakurian') !== -1 || t.indexOf('Image by') !== -1) {
        el.style.display = 'none';
      }
    });
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while (node = walker.nextNode()) {
      if (node.parentElement && node.parentElement.closest('.slime-logo-container')) continue;
      if (node.parentElement && node.parentElement.closest('.slimy-zoom-panel')) continue;
      var text = node.nodeValue;
      if (!text) continue;
      var changed = false;
      if (/\bRevolt\b/.test(text)) { text = text.replace(/\bRevolt\b/g, BRAND); changed = true; }
      if (/\bStoat\b/.test(text)) { text = text.replace(/\bStoat\b/g, BRAND); changed = true; }
      if (/^\s*Revol\s*$/.test(text)) { text = text.replace(/Revol/, BRAND); changed = true; }
      if (changed) node.nodeValue = text;
    }
    if (document.title !== BRAND) document.title = BRAND;
  }

  applyBranding();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyBranding);
  } else {
    setTimeout(applyBranding, 200);
    setTimeout(applyBranding, 500);
    setTimeout(applyBranding, 1000);
  }
  var dt;
  var obs = new MutationObserver(function() { clearTimeout(dt); dt = setTimeout(applyBranding, 150); });
  obs.observe(document.documentElement, { childList: true, subtree: true });
  console.log('[' + BRAND + '] Branding v6.0 loaded');
})();

// === SWIPE TO OPEN/CLOSE SIDEBARS ===
(function() {
  var touchStartX = 0;
  var touchStartY = 0;
  var swiping = false;

  document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    swiping = true;
  }, { passive: true });

  document.addEventListener('touchend', function(e) {
    if (!swiping) return;
    swiping = false;
    var touchEndX = e.changedTouches[0].clientX;
    var touchEndY = e.changedTouches[0].clientY;
    var dx = touchEndX - touchStartX;
    var dy = touchEndY - touchStartY;
    if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx)) return;

    // Close overlays/backdrops first
    var backdrop = document.querySelector('[class*="backdrop" i], [class*="overlay" i], [class*="scrim" i]');
    if (backdrop && backdrop.offsetParent !== null) {
      backdrop.click();
      return;
    }

    // LEFT TO RIGHT = Channel sidebar (main sidebar on left)
    if (dx > 60) {
      // Simply click on the left edge of screen where server icons are
      var clickX = 30;
      var clickY = window.innerHeight / 2;
      var el = document.elementFromPoint(clickX, clickY);
      if (el) {
        el.click();
        return;
      }
    }

    // RIGHT TO LEFT = Member sidebar (right side)
    if (dx < -60) {
      // Find right sidebar
      var rightSidebar = null;
      var allSidebars = document.querySelectorAll('[class*="sidebar" i]');
      for (var j = 0; j < allSidebars.length; j++) {
        var rsb = allSidebars[j];
        var rrect = rsb.getBoundingClientRect();
        if (rrect.left > window.innerWidth / 2 && rrect.width > 100) {
          rightSidebar = rsb;
          break;
        }
      }

      // If right sidebar visible, close it
      if (rightSidebar && window.getComputedStyle(rightSidebar).visibility !== 'hidden') {
        rightSidebar.click();
        return;
      }

      // Try to find member toggle button
      var memberToggle = document.querySelector('[aria-label*="member" i], [title*="member" i], button[class*="member" i]');
      if (memberToggle) {
        memberToggle.click();
        return;
      }

      // Find any toggle that might open member panel
      var buttons = document.querySelectorAll('button, [role="button"]');
      for (var k = 0; k < buttons.length; k++) {
        var btn = buttons[k];
        var label = (btn.getAttribute('aria-label') || '').toLowerCase();
        if (label.indexOf('member') !== -1 || label.indexOf('people') !== -1 || label.indexOf('user') !== -1) {
          btn.click();
          return;
        }
      }
    }
  }, { passive: true });
  console.log('[slime.chat] Swipe gestures loaded');
})();

// === ZOOM UI CONTROL ===
(function() {
  var currentScale = 1;
  var steps = [0.5, 0.6, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1, 1.1, 1.2, 1.3, 1.5];

  function setScale(s) {
    s = Math.max(0.5, Math.min(1.5, s));
    currentScale = s;
    document.documentElement.style.setProperty('--slimy-scale', s);
    try { localStorage.setItem('slimy-scale', String(s)); } catch(e) {}
    var label = document.getElementById('slimy-zoom-label');
    if (label) label.textContent = Math.round(s * 100) + '%';
  }

  function stepUp() {
    var i;
    for (i = 0; i < steps.length; i++) {
      if (steps[i] > currentScale + 0.01) { setScale(steps[i]); return; }
    }
  }

  function stepDown() {
    var i;
    for (i = steps.length - 1; i >= 0; i--) {
      if (steps[i] < currentScale - 0.01) { setScale(steps[i]); return; }
    }
  }

  window.setSlimeScale = setScale;

  function createZoomButton() {
    if (document.getElementById('slimy-zoom-btn')) return;
    if (window.location.pathname.indexOf('login') !== -1) return;
    if (window.location.pathname === '/') return;

    var btn = document.createElement('div');
    btn.id = 'slimy-zoom-btn';
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/><line x1="11" y1="8" x2="11" y2="14"/></svg>';
    btn.title = 'UI Scale';
    document.body.appendChild(btn);

    var panel = document.createElement('div');
    panel.id = 'slimy-zoom-panel';
    panel.className = 'slimy-zoom-panel';
    panel.style.display = 'none';
    panel.innerHTML = '<div class="slimy-zoom-header">UI Scale</div>' +
      '<div class="slimy-zoom-controls">' +
        '<button id="slimy-zoom-down" class="slimy-zoom-step" title="Zoom out">&minus;</button>' +
        '<span id="slimy-zoom-label" class="slimy-zoom-value">' + Math.round(currentScale * 100) + '%</span>' +
        '<button id="slimy-zoom-up" class="slimy-zoom-step" title="Zoom in">&plus;</button>' +
      '</div>' +
      '<div class="slimy-zoom-presets">' +
        '<button class="slimy-zoom-preset" data-scale="0.75">75%</button>' +
        '<button class="slimy-zoom-preset" data-scale="0.85">85%</button>' +
        '<button class="slimy-zoom-preset" data-scale="1">100%</button>' +
        '<button class="slimy-zoom-preset" data-scale="1.2">120%</button>' +
      '</div>' +
      '<button id="slimy-zoom-reset" class="slimy-zoom-reset">Reset</button>';
    document.body.appendChild(panel);

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
    });

    document.addEventListener('click', function(e) {
      if (!panel.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
        panel.style.display = 'none';
      }
    });

    document.getElementById('slimy-zoom-up').addEventListener('click', stepUp);
    document.getElementById('slimy-zoom-down').addEventListener('click', stepDown);
    document.getElementById('slimy-zoom-reset').addEventListener('click', function() { setScale(1); });

    var presetBtns = panel.querySelectorAll('.slimy-zoom-preset');
    for (var p = 0; p < presetBtns.length; p++) {
      (function(b) {
        b.addEventListener('click', function() { setScale(parseFloat(b.getAttribute('data-scale'))); });
      })(presetBtns[p]);
    }
  }

  try {
    var saved = localStorage.getItem('slimy-scale');
    if (saved) { currentScale = parseFloat(saved); setScale(currentScale); }
  } catch(e) {}

  function tryCreate() { createZoomButton(); }
  setTimeout(tryCreate, 1000);
  setTimeout(tryCreate, 2000);
  setTimeout(tryCreate, 4000);
  var zoomObs = new MutationObserver(function() { setTimeout(tryCreate, 500); });
  zoomObs.observe(document.documentElement, { childList: true, subtree: true });

  console.log('[slime.chat] Zoom control loaded');
})();
