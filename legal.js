/*
  Nexigence Legal Center loader.
  Loads content.html from the same folder this script is served from,
  puts it into <div id="nexigence-legal"></div>, and runs the sidebar tabs.
  You normally never need to edit this file. Edit content.html instead.
*/
(function () {
  var script = document.currentScript;
  var base = script ? script.src.replace(/[^\/]*$/, '') : '';
  var CONTENT_URL = base + 'content.html';

  function init() {
    var mount = document.getElementById('nexigence-legal');
    if (!mount) return;

    fetch(CONTENT_URL, { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (html) {
        mount.innerHTML = html;
        setupTabs(mount);
      })
      .catch(function () {
        mount.innerHTML =
          '<p style="font-family:Switzer,-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Arial,sans-serif;padding:48px 24px;color:#5c5c5c;">' +
          'Our legal documents could not be loaded right now. Please refresh the page, or contact us if the problem continues.</p>';
      });
  }

  function setupTabs(mount) {
    var root = mount.querySelector('.nxl');
    if (!root) return;
    var tabs = root.querySelectorAll('.nxl-tab[data-tab]');
    var panels = root.querySelectorAll('.nxl-panel[data-panel]');
    if (!tabs.length || !panels.length) return;

    function show(id, scroll) {
      var panel = root.querySelector('.nxl-panel[data-panel="' + id + '"]');
      if (!panel) return false;
      tabs.forEach(function (t) {
        var on = t.getAttribute('data-tab') === id;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panels.forEach(function (p) { p.classList.toggle('is-active', p === panel); });
      if (scroll) {
        var top = root.getBoundingClientRect().top + window.scrollY - 40;
        if (window.scrollY > top) window.scrollTo({ top: top, behavior: 'smooth' });
      }
      return true;
    }

    function select(id) {
      if (show(id, true)) history.replaceState(null, '', '#' + id);
    }

    // Sidebar clicks
    tabs.forEach(function (t) {
      t.addEventListener('click', function () { select(t.getAttribute('data-tab')); });
    });

    // Links inside the policies like <a href="#privacy-policy"> switch tabs too
    root.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href').slice(1);
      if (root.querySelector('.nxl-panel[data-panel="' + id + '"]')) {
        e.preventDefault();
        select(id);
      }
    });

    // Open the policy named in the URL, e.g. /legal#privacy-policy
    function fromHash() {
      var id = window.location.hash.slice(1);
      if (!id || !show(id, false)) show(tabs[0].getAttribute('data-tab'), false);
    }
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
