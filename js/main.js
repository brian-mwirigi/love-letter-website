// ===========================
// Show Letter & Start Timer
// ===========================

function showLoveLetterAndTime(config) {
  const startMs = new Date(config.memorialDate).getTime();
  const digits = createClockDOM(config);
  typewriter(document.getElementById("letter"));
  document.getElementById("clock-box").style.opacity = 1;
  return { startMs, digits };
}

function startTimeUpdate(startMs, digits) {
  timeElapse(startMs, digits);
  setInterval(() => timeElapse(startMs, digits), AnimationConfig.TIME_UPDATE_INTERVAL);
}

// ===========================
// Main Initialization
// ===========================

document.addEventListener("DOMContentLoaded", async () => {
  initContent(CONFIG);

  const staticCanvas = initCanvas("static-canvas");
  const groundCanvas = initCanvas("ground-canvas");
  const dynamicCanvas = initCanvas("canvas");

  const { width: w, height: h } = StageConfig;
  const tree = new Tree(staticCanvas, dynamicCanvas, groundCanvas, w, h, TreeShape, CONFIG);
  const { seed, footer } = tree;

  scaleContent();

  seed.draw();

  await waitForUserClick(seed, dynamicCanvas);
  await animateSeedShrink(seed);
  await animateSeedMove(seed, footer);
  await animateTreeGrow(tree);
  await animateFlowerBloom(tree);
  tree.resetFallingBlooms();

  footer.draw();
  await animateTreeMove(staticCanvas);

  const { startMs, digits } = showLoveLetterAndTime(CONFIG);

  startHeartJumpAnimation(tree);
  startTimeUpdate(startMs, digits);
});
