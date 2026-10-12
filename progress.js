class ProgressCircle {
  #circle;
  #visual;
  #svg;
  #circumference;
  #value = 0;
  #animated = false;
  #animationId = null;
  #previousTime = null;
  #angle = 0;

  constructor(container) {
    this.#circle = container.querySelector(".blue-circle");
    this.#visual = container.querySelector(".progress-visual");
    this.#svg = container.querySelector(".svg-circles");
    if (!this.#circle || !this.#visual || !this.#svg) {
      throw new Error("Контейнер не содержит разметку ProgressCircle");
    }
    this.#circumference = 2 * Math.PI * Number(this.#circle.getAttribute("r"));
    this.#circle.setAttribute("stroke-dasharray", String(this.#circumference));
    this.setValue(0);
  }

  get value() {
    return this.#value;
  }

  setValue(value) {
    if (!Number.isFinite(value) || value < 0 || value > 100) return false;
    this.#value = value;
    this.#circle.setAttribute(
      "stroke-dashoffset",
      String(this.#circumference * (1 - value / 100)),
    );
    return true;
  }

  setAnimated(animated) {
    this.#animated = Boolean(animated);
    if (this.#animated) {
      if (this.#animationId === null) {
        this.#previousTime = null;
        this.#animationId = requestAnimationFrame(this.#animate);
      }
      return;
    }
    if (this.#animationId !== null) cancelAnimationFrame(this.#animationId);
    this.#animationId = null;
    this.#previousTime = null;
    this.#angle = 0;
    this.#svg.style.transform = "rotate(0deg)";
  }

  setHidden(hidden) {
    this.#visual.classList.toggle("is-hidden", Boolean(hidden));
  }

  destroy() {
    this.setAnimated(false);
  }

  #animate = (time) => {
    if (!this.#animated) return;
    if (this.#previousTime !== null) {
      const delta = Math.min(time - this.#previousTime, 100);
      this.#angle = (this.#angle + delta * 0.24) % 360;
    }
    this.#previousTime = time;
    this.#svg.style.transform = `rotate(${this.#angle}deg)`;
    this.#animationId = requestAnimationFrame(this.#animate);
  };
}
