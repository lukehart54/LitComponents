import { LitElement, html, css, property } from 'lit';

class SimpleModal extends LitElement {
  @property({ type: Boolean }) open = false;
  @property({ type: String }) title = '';
  @property({ type: String }) content = '';

  static styles = css`
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s, visibility 0.3s;
    }

    .modal.open {
      opacity: 1;
      visibility: visible;
    }

    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .modal-header {
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: bold;
    }

    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 24px;
    }
  `;

  toggleModal() {
    this.open = !this.open;
  }

  render() {
    return html`
      <div class="modal ${this.open ? 'open' : ''}" @click="${this.toggleModal}">
        <div class="modal-content" @click="${e => e.stopPropagation()}">
          <span class="close-button" @click="${this.toggleModal}">&times;</span>
          <div class="modal-header">${this.title}</div>
          <div class="modal-body">${this.content}</div>
        </div>
      </div>
    `;
  }
}

customElements.define('simple-modal', SimpleModal);
