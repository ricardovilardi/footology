(() => {
  const stage = document.getElementById('stage');
  const slides = [...stage.querySelectorAll('.slide')];
  const total = slides.length;
  const count = document.getElementById('count');
  const bar = document.getElementById('bar');
  let i = 0;

  // Chrome: corner logo (except cover) and footer on every slide
  slides.forEach((s, n) => {
    if (n > 0) {
      const logo = document.createElement('img');
      logo.className = 'corner-logo';
      logo.alt = 'Footology';
      logo.src = s.classList.contains('dark') ? 'assets/logo-cream.svg' : 'assets/logo-navy.svg';
      s.appendChild(logo);
    }
    if (n > 0 && n < total - 1) {
      const foot = document.createElement('div');
      foot.className = 'foot';
      foot.innerHTML = `<span>${s.dataset.act || ''}</span><span>${String(n + 1).padStart(2, '0')} / ${total}</span>`;
      s.appendChild(foot);
    }
  });

  function fit() {
    const k = Math.min(innerWidth / 1600, innerHeight / 900);
    stage.style.transform = `translate(-50%, -50%) scale(${k})`;
  }

  function go(n, push = true) {
    i = Math.max(0, Math.min(total - 1, n));
    slides.forEach((s, k) => s.classList.toggle('active', k === i));
    count.textContent = `${i + 1} / ${total}`;
    bar.style.width = `${((i + 1) / total) * 100}%`;
    if (push) history.replaceState(null, '', `#${i + 1}`);
  }

  const next = () => go(i + 1), prev = () => go(i - 1);

  function toggleOverview(force) {
    const on = document.body.classList.toggle('overview', force);
    if (on) {
      const cols = Math.max(1, Math.floor((innerWidth - 80) / 344));
      const w = (innerWidth - 80 - (cols - 1) * 24) / cols;
      document.body.style.setProperty('--oz', (w / 1600).toFixed(4));
      slides[i].scrollIntoView({ block: 'center' });
    } else fit();
  }

  function fullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }

  document.getElementById('next').onclick = next;
  document.getElementById('prev').onclick = prev;
  document.getElementById('grid').onclick = () => toggleOverview();
  document.getElementById('fs').onclick = fullscreen;

  stage.addEventListener('click', e => {
    if (document.body.classList.contains('overview')) {
      const s = e.target.closest('.slide');
      if (s) { go(slides.indexOf(s)); toggleOverview(false); }
      return;
    }
    if (e.target.closest('a,button')) return;
    (e.clientX < innerWidth * 0.3 ? prev : next)();
  });

  addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(k)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); prev(); }
    else if (k === 'Home') go(0);
    else if (k === 'End') go(total - 1);
    else if (k === 'f' || k === 'F') fullscreen();
    else if (k === 'g' || k === 'G' || k === 'Escape') toggleOverview(k === 'Escape' ? false : undefined);
    else if (/^[1-9]$/.test(k)) go(+k - 1);
  });

  let x0 = null, y0 = null;
  addEventListener('touchstart', e => { document.body.classList.add('touch'); x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  addEventListener('touchend', e => {
    if (x0 === null || document.body.classList.contains('overview')) return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next : prev)();
    x0 = null;
  });

  addEventListener('resize', () => document.body.classList.contains('overview') ? toggleOverview(true) : fit());
  addEventListener('hashchange', () => go((parseInt(location.hash.slice(1), 10) || 1) - 1, false));

  fit();
  go((parseInt(location.hash.slice(1), 10) || 1) - 1, false);
})();
