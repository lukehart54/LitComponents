import { LitElement, html, css, property } from 'lit';

class MultiPageModal extends LitElement {
  @property({ type: Boolean }) isOpen = false;
  @property({ type: Number }) currentPage = 0;
  @property({ type: Array }) pages = [];
  @property({ type: Boolean }) animate = true;

  static styles = css`
    :host {
      display: block;
    }

    .modal-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s, opacity 0.3s ease-in-out;
    }

    .modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
      width: 300px;
    }

    .page-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .page {
      display: none;
    }

    .page.active {
      display: block;
    }

    .page-enter-active,
    .page-leave-active {
      transition: opacity 0.3s;
    }

    .page-enter, .page-leave-to {
      opacity: 0;
    }
  `;

  updated(changedProperties) {
    if (changedProperties.has('isOpen')) {
      if (this.isOpen) {
        this.showModal();
      } else {
        this.hideModal();
      }
    }
  }

  showModal() {
    this.shadowRoot.querySelector('.modal-container').style.visibility = 'visible';
    this.shadowRoot.querySelector('.modal-container').style.opacity = '1';
    this.currentPage = 0;
  }

  hideModal() {
    this.shadowRoot.querySelector('.modal-container').style.opacity = '0';
    setTimeout(() => {
      this.shadowRoot.querySelector('.modal-container').style.visibility = 'hidden';
    }, 300);
  }

  nextPage() {
    if (this.currentPage < this.pages.length - 1) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  render() {
    return html`
      <div class="modal-container">
        <div class="modal-content">
          <div class="page-container">
            ${this.pages.map(
              (page, index) => html`
                <div
                  class="page ${this.currentPage === index ? 'active' : ''}"
                >
                  ${page}
                </div>
              `
            )}
          </div>
          <div>
            <button @click="${this.prevPage}">Previous</button>
            <button @click="${this.nextPage}">Next</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('multi-page-modal', MultiPageModal);
