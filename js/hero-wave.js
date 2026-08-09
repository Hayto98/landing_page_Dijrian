/**
 * Hero Section Dynamic Wave Ribbon Animation
 * Djirian Freeze-Dried Durian Web App
 * Responsive & Mobile-Optimized Smooth Wave & Color Flow
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-wave-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let animationFrameId = null;
  let time = 0;

  // Responsive Canvas Sizing
  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = parent.clientWidth;
    height = parent.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize);
  resize();

  // Mouse interaction for organic wave response
  let mouseY = 0;
  let targetMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
      targetMouseY = (e.clientY - rect.top) - height / 2;
    }
  });

  // Seamless Vibrant Palette flowing from Left to Right
  const palette = [
    { r: 63,  g: 98,  b: 18,  a: 0.82 }, // 0. Forest Green (#3f6212)
    { r: 101, g: 163, b: 13,  a: 0.85 }, // 1. Leaf Green (#65a30d)
    { r: 132, g: 204, b: 22,  a: 0.88 }, // 2. Lime Green (#84cc16)
    { r: 234, g: 179, b: 8,   a: 0.90 }, // 3. Durian Gold (#eab308)
    { r: 245, g: 158, b: 11,  a: 0.85 }, // 4. Warm Amber (#f59e0b)
    { r: 63,  g: 98,  b: 18,  a: 0.82 }  // 5. Forest Green (Loop Back)
  ];

  // Smooth LERP color interpolation
  function getInterpolatedColor(t, opacityScale = 1) {
    const normT = ((t % 1) + 1) % 1;
    const scaledT = normT * (palette.length - 1);
    const index = Math.floor(scaledT);
    const frac = scaledT - index;

    const c1 = palette[index];
    const c2 = palette[Math.min(index + 1, palette.length - 1)];

    const r = Math.round(c1.r + (c2.r - c1.r) * frac);
    const g = Math.round(c1.g + (c2.g - c1.g) * frac);
    const b = Math.round(c1.b + (c2.b - c1.b) * frac);
    const a = ((c1.a + (c2.a - c1.a) * frac) * opacityScale).toFixed(3);

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  // Create smooth dynamic flowing linear gradient moving Left -> Right
  function getFlowingGradient(ctx, width, time, opacityScale = 1) {
    const grad = ctx.createLinearGradient(0, 0, width, 0);
    const flowShift = (time * 0.07) % 1;
    const stops = 24;

    for (let i = 0; i <= stops; i++) {
      const pos = i / stops;
      const colorProgress = (pos - flowShift + 1) % 1;
      const colorStr = getInterpolatedColor(colorProgress, opacityScale);
      grad.addColorStop(pos, colorStr);
    }

    return grad;
  }

  // Render loop
  function draw() {
    time += 0.007; // 60fps frame tick
    mouseY += (targetMouseY - mouseY) * 0.04;

    ctx.clearRect(0, 0, width, height);

    // Responsive logic for Mobile vs Desktop
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    // Mobile-optimized dimensions to keep buttons & text clear and aesthetic
    let baseHeight = height * 0.45;
    let amplitude1 = Math.min(height * 0.12, 60);
    let amplitude2 = Math.min(height * 0.08, 40);
    let ribbonThickness = Math.min(Math.max(width * 0.08, 75), 150);
    let mainOpacity = 1.0;

    if (isMobile) {
      // On mobile: position ribbon higher behind headline, thinner width & gentler wave
      baseHeight = height * 0.32;
      amplitude1 = Math.min(height * 0.05, 30);
      amplitude2 = Math.min(height * 0.04, 20);
      ribbonThickness = Math.min(width * 0.14, 52); // Sleek & elegant on mobile
      mainOpacity = 0.65; // Soft transparency for clean button readability
    } else if (isTablet) {
      baseHeight = height * 0.38;
      amplitude1 = Math.min(height * 0.08, 45);
      ribbonThickness = Math.min(width * 0.10, 70);
      mainOpacity = 0.85;
    }

    const step = isMobile ? 8 : 10;

    // --- SECONDARY SOFT BACKGROUND WAVE (LAYER 1) ---
    ctx.save();
    ctx.beginPath();

    const pointsBackTop = [];
    const pointsBackBottom = [];

    for (let x = -50; x <= width + 50; x += step) {
      const normX = x / width;
      const yCenter = baseHeight + (isMobile ? 12 : 20) +
        Math.sin(normX * Math.PI * 2.2 + time * 0.7) * (amplitude1 * 1.1) +
        Math.cos(normX * Math.PI * 4 + time * 1.0) * (amplitude2 * 0.8) +
        (mouseY * 0.12 * Math.sin(normX * Math.PI));

      const thick = ribbonThickness * (1.1 + 0.12 * Math.sin(normX * Math.PI * 3 + time * 0.9));

      pointsBackTop.push({ x, y: yCenter - thick / 2 });
      pointsBackBottom.push({ x, y: yCenter + thick / 2 });
    }

    ctx.moveTo(pointsBackTop[0].x, pointsBackTop[0].y);
    for (let i = 1; i < pointsBackTop.length; i++) {
      const xc = (pointsBackTop[i].x + pointsBackTop[i - 1].x) / 2;
      const yc = (pointsBackTop[i].y + pointsBackTop[i - 1].y) / 2;
      ctx.quadraticCurveTo(pointsBackTop[i - 1].x, pointsBackTop[i - 1].y, xc, yc);
    }
    for (let i = pointsBackBottom.length - 1; i >= 0; i--) {
      if (i === pointsBackBottom.length - 1) {
        ctx.lineTo(pointsBackBottom[i].x, pointsBackBottom[i].y);
      } else {
        const xc = (pointsBackBottom[i].x + pointsBackBottom[i + 1].x) / 2;
        const yc = (pointsBackBottom[i].y + pointsBackBottom[i + 1].y) / 2;
        ctx.quadraticCurveTo(pointsBackBottom[i + 1].x, pointsBackBottom[i + 1].y, xc, yc);
      }
    }
    ctx.closePath();

    // Background wave left-to-right color flow
    const bgGrad = ctx.createLinearGradient(0, 0, width, 0);
    const bgShift = (time * 0.04) % 1;
    bgGrad.addColorStop(0, getInterpolatedColor((0 - bgShift + 1) % 1, 0.4 * mainOpacity));
    bgGrad.addColorStop(0.5, getInterpolatedColor((0.5 - bgShift + 1) % 1, 0.4 * mainOpacity));
    bgGrad.addColorStop(1, getInterpolatedColor((1 - bgShift + 1) % 1, 0.4 * mainOpacity));

    ctx.fillStyle = bgGrad;
    ctx.fill();
    ctx.restore();

    // --- MAIN HERO DYNAMIC RIBBON WAVE (LAYER 2) ---
    ctx.save();
    ctx.beginPath();

    const pointsTop = [];
    const pointsBottom = [];

    for (let x = -60; x <= width + 60; x += step) {
      const normX = x / width;

      const wave1 = Math.sin(normX * Math.PI * 1.8 + time) * amplitude1;
      const wave2 = Math.cos(normX * Math.PI * 3.2 - time * 1.2) * amplitude2;
      const interactiveFactor = (mouseY * 0.18) * Math.sin(normX * Math.PI);

      const yCenter = baseHeight + wave1 + wave2 + interactiveFactor;
      const thickVariation = Math.sin(normX * Math.PI * 2.5 + time * 1.3) * (isMobile ? 8 : 14);
      const thick = ribbonThickness + thickVariation;

      pointsTop.push({ x, y: yCenter - thick / 2 });
      pointsBottom.push({ x, y: yCenter + thick / 2 });
    }

    // Draw Smooth Top Curve
    ctx.moveTo(pointsTop[0].x, pointsTop[0].y);
    for (let i = 1; i < pointsTop.length; i++) {
      const xc = (pointsTop[i].x + pointsTop[i - 1].x) / 2;
      const yc = (pointsTop[i].y + pointsTop[i - 1].y) / 2;
      ctx.quadraticCurveTo(pointsTop[i - 1].x, pointsTop[i - 1].y, xc, yc);
    }

    // Connect to right edge and draw Smooth Bottom Curve back to left
    for (let i = pointsBottom.length - 1; i >= 0; i--) {
      if (i === pointsBottom.length - 1) {
        ctx.lineTo(pointsBottom[i].x, pointsBottom[i].y);
      } else {
        const xc = (pointsBottom[i].x + pointsBottom[i + 1].x) / 2;
        const yc = (pointsBottom[i].y + pointsBottom[i + 1].y) / 2;
        ctx.quadraticCurveTo(pointsBottom[i + 1].x, pointsBottom[i + 1].y, xc, yc);
      }
    }

    ctx.closePath();

    // Fill with smooth left-to-right flowing gradient
    const mainGrad = getFlowingGradient(ctx, width, time, mainOpacity);
    ctx.fillStyle = mainGrad;
    ctx.shadowColor = 'rgba(63, 98, 18, 0.15)';
    ctx.shadowBlur = isMobile ? 18 : 32;
    ctx.shadowOffsetY = isMobile ? 8 : 14;
    ctx.fill();

    // --- CONTINUOUS STREAMING LIGHT PULSE FROM LEFT TO RIGHT ---
    const pulseProgress = (time * 0.15) % 1.5 - 0.25;
    if (pulseProgress >= -0.25 && pulseProgress <= 1.25) {
      const beamX = pulseProgress * width;
      const beamWidth = width * 0.30;

      const beamGrad = ctx.createLinearGradient(beamX - beamWidth / 2, 0, beamX + beamWidth / 2, 0);
      beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      beamGrad.addColorStop(0.5, `rgba(254, 240, 138, ${0.28 * mainOpacity})`);
      beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = beamGrad;
      ctx.shadowBlur = 0;
      ctx.fill();
    }

    ctx.restore();

    animationFrameId = requestAnimationFrame(draw);
  }

  draw();
});
