import { LitElement, html, css, property } from 'lit';

class SimpleRating extends LitElement {
  @property({ type: Number }) maxRating = 5;
  @property({ type: Number }) value = 0;

  static styles = css`
    .rating {
      display: inline-flex;
      direction: rtl; 
    }

    .star {
      cursor: pointer;
      color: #ddd; 
    }

    .star:hover,
    .star:hover ~ .star,
    .star.selected {
      color: gold; 
    }
  `;

  updateRating(newValue) {
    this.value = newValue;
    this.dispatchEvent(new CustomEvent('rating-changed', { detail: this.value }));
  }

  render() {
    return html`
      <div class="rating">
        ${Array.from({ length: this.maxRating }, (_, i) => html`
          <span class="star ${i < this.value ? 'selected' : ''}" @click="${() => this.updateRating(i + 1)}">
            ★
          </span>
        `)}
      </div>
    `;
  }
}

customElements.define('simple-rating', SimpleRating);
