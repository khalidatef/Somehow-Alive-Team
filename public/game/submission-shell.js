// Keep required disclosure visible in the exported browser game, including fullscreen.
(() => {
  const title = 'Somehow Alive';
  const keepTitle = () => { if (document.title !== title) document.title = title; };
  new MutationObserver(keepTitle).observe(document.querySelector('title'), { childList: true });
  keepTitle();
  const canvas = document.getElementById('canvas');
  if (canvas && document.documentElement.requestFullscreen) {
    canvas.requestFullscreen = (options) => document.documentElement.requestFullscreen(options);
  }
})();
