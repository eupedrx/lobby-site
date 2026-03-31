export interface StarfieldConfig {
  numStars: number;
  speed: number;
}

export class Star {
  x: number;
  y: number;
  z: number;
  xPrev: number;
  yPrev: number;
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.x = (Math.random() - 0.5) * width * 2;
    this.y = (Math.random() - 0.5) * height * 2;
    this.z = Math.random() * width;
    this.xPrev = this.x;
    this.yPrev = this.y;
  }

  update(speed: number) {
    this.z -= speed * 50;

    if (this.z <= 0) {
      this.x = (Math.random() - 0.5) * this.width * 2;
      this.y = (Math.random() - 0.5) * this.height * 2;
      this.z = this.width;
      this.xPrev = this.x;
      this.yPrev = this.y;
    }
  }

  draw(ctx: CanvasRenderingContext2D, speed: number) {
    const sx = (this.x / this.z) * (this.width / 2) + this.width / 2;
    const sy = (this.y / this.z) * (this.height / 2) + this.height / 2;

    const px = (this.xPrev / (this.z + speed * 50)) * (this.width / 2) + this.width / 2;
    const py = (this.yPrev / (this.z + speed * 50)) * (this.height / 2) + this.height / 2;

    this.xPrev = this.x;
    this.yPrev = this.y;

    const size = (1 - this.z / this.width) * 2.5;
    const opacity = 1 - this.z / this.width;

    if (sx > 0 && sx < this.width && sy > 0 && sy < this.height && size > 0) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.arc(sx, sy, size < 0.1 ? 0.1 : size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export class Starfield {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  stars: Star[];
  config: StarfieldConfig;

  constructor(canvas: HTMLCanvasElement, config: StarfieldConfig) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas context not available');
    this.ctx = context;
    this.config = config;
    this.width = 0;
    this.height = 0;
    this.stars = [];
    this.resize();
    this.initStars();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < this.config.numStars; i++) {
      this.stars.push(new Star(this.width, this.height));
    }
  }

  animate() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.stars.forEach((star) => {
      star.width = this.width;
      star.height = this.height;
      star.update(this.config.speed);
      star.draw(this.ctx, this.config.speed);
    });

    requestAnimationFrame(() => this.animate());
  }

  start() {
    this.animate();
  }
}
