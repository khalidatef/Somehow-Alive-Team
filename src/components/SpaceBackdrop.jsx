import { useEffect, useRef } from 'react';
import './SpaceBackdrop.css';

export default function SpaceBackdrop({ theme }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (theme === 'light') return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width, height, stars, frame, previous = 0;
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      stars = Array.from({ length: Math.min(360, Math.max(90, Math.round(width * height / 4200))) }, (_, i) => {
        const depth = Math.random();
        return { x: Math.random() * width, y: Math.random() * height, radius: .65 + depth * 1.15,
          speed: 3 + depth * 9, phase: Math.random() * Math.PI * 2, bright: i % 27 === 0,
          color: i % 7 === 0 ? '167,218,255' : '235,243,255' };
      });
      draw(0, 0);
    }
    function draw(time, delta) {
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        star.x = (star.x + width - delta * star.speed * .35) % width;
        star.y = (star.y + height - delta * star.speed) % height;
        const alpha = reduced.matches ? .8 : .65 + .25 * Math.sin(time * .001 + star.phase);
        if (star.bright) {
          const glow = context.createRadialGradient(star.x, star.y, 0, star.x, star.y, 9);
          glow.addColorStop(0, `rgba(${star.color},${alpha * .5})`);
          glow.addColorStop(1, `rgba(${star.color},0)`);
          context.fillStyle = glow;
          context.fillRect(star.x - 9, star.y - 9, 18, 18);
          context.strokeStyle = `rgba(${star.color},${alpha * .65})`;
          context.lineWidth = .7;
          context.beginPath();
          context.moveTo(star.x - 4, star.y); context.lineTo(star.x + 4, star.y);
          context.moveTo(star.x, star.y - 4); context.lineTo(star.x, star.y + 4);
          context.stroke();
        }
        context.fillStyle = `rgba(${star.color},${alpha})`;
        context.beginPath(); context.arc(star.x, star.y, star.radius, 0, Math.PI * 2); context.fill();
      }
    }
    function animate(time) {
      frame = requestAnimationFrame(animate);
      if (time - previous < 1000 / 30) return;
      draw(time, previous ? Math.min((time - previous) / 1000, .1) : 0);
      previous = time;
    }
    function sync() {
      cancelAnimationFrame(frame);
      previous = 0;
      if (!document.hidden && !reduced.matches) frame = requestAnimationFrame(animate);
      else draw(0, 0);
    }
    resize(); sync();
    window.addEventListener('resize', resize);
    reduced.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      reduced.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [theme]);
  return <div className="space-scene" aria-hidden="true"><canvas ref={canvasRef} /></div>;
}
