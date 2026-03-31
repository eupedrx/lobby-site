export class TypingEffect {
  private element: HTMLElement;
  private text: string;
  private index: number = 0;
  private started: boolean = false;
  private timer?: number;
  private speed: number;

  constructor(element: HTMLElement, text: string, speed: number = 270) {
    this.element = element;
    this.text = text;
    this.speed = speed;
  }

  start() {
    if (this.started || !this.element) return;
    this.started = true;
    this.element.textContent = '';

    this.timer = window.setInterval(() => {
      if (this.index < this.text.length) {
        this.element.textContent += this.text[this.index];
        this.index++;
      } else if (this.timer) {
        window.clearInterval(this.timer);
      }
    }, this.speed);
  }

  stop() {
    if (this.timer) {
      window.clearInterval(this.timer);
    }
  }
}
