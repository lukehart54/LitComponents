import { LitElement, html, css, property } from 'lit';

class ImageCarousel extends LitElement {
  @property({ type: Array }) images = [];
  @property({ type: Number }) activeIndex = 0;

  static styles = css`
    .carousel-container {
      width: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }

    .carousel-image {
      max-width: 100%;
      display: block;
      transition: transform 0.5s ease;
    }

    .button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      cursor: pointer;
      padding: 10px;
      z-index: 100;
    }

    .prev-button {
      left: 10px;
    }

    .next-button {
      right: 10px;
    }
  `;

  showNext() {
    this.activeIndex = (this.activeIndex + 1) % this.images.length;
  }

  showPrev() {
    this.activeIndex = (this.activeIndex - 1 + this.images.length) % this.images.length;
  }

  render() {
    const transformStyle = `translateX(-${this.activeIndex * 100}%)`;

    return html`
      <div class="carousel-container">
        ${this.images.map(
          (image) => html`<img class="carousel-image" src="${image}" style="transform: ${transformStyle};" />`
        )}
        <button class="button prev-button" @click="${this.showPrev}">❮</button>
        <button class="button next-button" @click="${this.showNext}">❯</button>
      </div>
    `;
  }
}

customElements.define('image-carousel', ImageCarousel);
