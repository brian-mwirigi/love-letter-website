// ===========================
// Clock Display
// ===========================

const createClockDOM = (config) => {
  const clock = document.getElementById("clock");
  const cfg = config.time;
  const digits = {};
  clock.textContent = "";

  const addText = (text) => clock.appendChild(document.createTextNode(text));
  const addDigit = (key) => {
    const span = document.createElement("span");
    span.className = "digit";
    clock.appendChild(span);
    digits[key] = span;
    return span;
  };

  addText(cfg.prefix);
  addDigit("days");
  addText(` ${cfg.day} `);
  addDigit("hours");
  addText(` ${cfg.hour} `);
  addDigit("minutes");
  addText(` ${cfg.minute} `);
  addDigit("seconds");
  addText(` ${cfg.second}`);

  return digits;
};

const timeElapse = (startMs, digits) => {
  let seconds = (Date.now() - startMs) / 1000;
  const days = Math.floor(seconds / (3600 * 24));
  seconds %= 3600 * 24;
  const hours = Math.floor(seconds / 3600).toString().padStart(2, "0");
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  seconds = Math.floor(seconds % 60).toString().padStart(2, "0");
  digits.days.textContent = String(days);
  digits.hours.textContent = hours;
  digits.minutes.textContent = minutes;
  digits.seconds.textContent = seconds;
};

// ===========================
// Responsive Scaling
// ===========================

const scaleContent = () => {
  const viewport = document.getElementById("viewport");
  const main = document.getElementById("main");

  const observer = new ResizeObserver(() => {
    const scale = Math.min(
      window.innerWidth / StageConfig.width,
      window.innerHeight / StageConfig.height,
      1
    );
    viewport.style.width = `${StageConfig.width * scale}px`;
    viewport.style.height = `${StageConfig.height * scale}px`;
    main.style.transform = `scale(${scale})`;
  });

  observer.observe(document.documentElement);
};

// ===========================
// Content Initialization
// ===========================

const initContent = (config) => {
  const letter = document.getElementById("letter");
  letter.textContent = "";
  const { paragraph1, paragraph2, paragraph3 } = config.letter;

  const addParagraph = (lines) => {
    lines.forEach(line => {
      const p = document.createElement("p");
      p.textContent = line;
      letter.appendChild(p);
    });
  };

  addParagraph(paragraph1);
  letter.appendChild(document.createElement("br"));
  addParagraph(paragraph2);
  letter.appendChild(document.createElement("br"));
  addParagraph(paragraph3);

  const clockText = document.getElementById("clock-text");
  clockText.textContent = "";
  const name1 = document.createElement("span");
  name1.className = "name";
  name1.textContent = config.couple.name1;
  const name2 = document.createElement("span");
  name2.className = "name";
  name2.textContent = config.couple.name2;
  clockText.appendChild(name1);
  clockText.appendChild(document.createTextNode(` ${config.couple.connector} `));
  clockText.appendChild(name2);
  clockText.appendChild(document.createTextNode(` ${config.couple.together}`));
};

// ===========================
// Canvas Initialization
// ===========================

const initCanvas = (id) => {
  const canvas = document.getElementById(id);
  const { width: w, height: h } = StageConfig;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  canvas.getContext("2d").scale(dpr, dpr);
  return canvas;
};
