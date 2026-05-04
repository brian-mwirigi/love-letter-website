// ===========================
// Geometry Primitives
// ===========================

const random = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const randomFloat = (min, max) => min + Math.random() * (max - min);

const bezier = (cp, t) => {
  const [p0, p1, p2] = cp;
  return p0.mul((1 - t) ** 2).add(p1.mul(2 * t * (1 - t))).add(p2.mul(t ** 2));
};

const inheart = (x, y, r) => {
  const [nx, ny] = [x / r, y / r];
  return (nx ** 2 + ny ** 2 - 1) ** 3 - nx ** 2 * ny ** 3 < 0;
};

// ===========================
// Point — 2D vector with basic arithmetic
// ===========================

class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  clone() { return new Point(this.x, this.y); }
  add(o) { return new Point(this.x + o.x, this.y + o.y); }
  sub(o) { return new Point(this.x - o.x, this.y - o.y); }
  div(n) { return new Point(this.x / n, this.y / n); }
  mul(n) { return new Point(this.x * n, this.y * n); }
  set(x, y) { this.x = x; this.y = y; return this; }
}

// ===========================
// Heart — parametric heart curve sampled into points
// ===========================

class Heart {
  constructor() {
    this.points = [];
    for (let i = 10; i < 30; i += 0.2) {
      const t = i / Math.PI;
      const x = 16 * Math.sin(t) ** 3;
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      this.points.push(new Point(x, y));
    }
    this.length = this.points.length;
    this.path = this.buildPath(1);
  }

  get(i, scale = 1) { return this.points[i].mul(scale); }

  buildPath(scale) {
    const path = new Path2D();
    const pts = this.points;
    const p0x = pts[0].x * scale;
    const p0y = -pts[0].y * scale;
    path.moveTo(p0x, p0y);
    for (let i = 0; i < pts.length - 1; i++) {
      const cx = pts[i].x * scale;
      const cy = -pts[i].y * scale;
      const nx = pts[i + 1].x * scale;
      const ny = -pts[i + 1].y * scale;
      path.quadraticCurveTo(cx, cy, (cx + nx) / 2, (cy + ny) / 2);
    }
    const last = pts[pts.length - 1];
    path.quadraticCurveTo(last.x * scale, -last.y * scale, p0x, p0y);
    path.closePath();
    return path;
  }
}
