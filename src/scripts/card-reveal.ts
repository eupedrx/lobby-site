export class CardReveal {
  private element: HTMLElement;
  private revealed: boolean = false;
  private frameCount: number = 0;
  private triggerFrame: number;
  private onReveal?: () => void;

  constructor(element: HTMLElement, triggerFrame: number = 120, onReveal?: () => void) {
    this.element = element;
    this.triggerFrame = triggerFrame;
    this.onReveal = onReveal;
  }

  update() {
    if (this.revealed) return;

    this.frameCount++;
    if (this.frameCount > this.triggerFrame) {
      this.reveal();
    }
  }

  reveal() {
    if (this.revealed) return;
    this.element.style.opacity = '1';
    this.element.style.transform = 'translateY(0) scale(1)';
    this.revealed = true;
    if (this.onReveal) {
      this.onReveal();
    }
  }

  isRevealed(): boolean {
    return this.revealed;
  }
}
