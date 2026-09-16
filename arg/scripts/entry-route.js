(function () {
  'use strict';
  // This runs before the original page paints. Existing saves keep their entry.
  const query = new URLSearchParams(window.location.search);
  if (query.get('story') === '1' || window.location.pathname.includes('/preview/')) return;
  let returning = false;
  try {
    returning = Boolean(localStorage.getItem('ward13_save'))
      || Object.keys(JSON.parse(localStorage.getItem('ward13_save_slots') || '{}')).length > 0
      || sessionStorage.getItem('ward13_return_from_404') === '1';
  } catch { /* The public entrance is also usable when storage is unavailable. */ }
  if (!returning) window.location.replace(new URL('arg/index.html', window.location.href).href);
})();
