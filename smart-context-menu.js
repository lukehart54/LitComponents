import { LitElement, html, css, property } from 'lit';

class SmartContextMenu extends LitElement {
  @property({ type: Boolean }) isOpen = false;
  @property({ type: Number }) x = 0;
  @property({ type: Number }) y = 0;
  @property({ type: Array }) menuItems = [];

  static styles = css`
    :host {
      position: relative;
      display: inline-block;
    }

    .context-menu {
      display: none;
      position: absolute;
      background-color: white;
      border: 1px solid #ccc;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      padding: 8px;
      z-index: 1000;
    }

    :host([opened]) .context-menu {
      display: block;
    }

    .menu-item {
      cursor: pointer;
      padding: 4px 0;
    }
  `;

  render() {
    return html`
      <div @contextmenu="${this.handleContextMenu}">
        <slot></slot>
      </div>
      <div class="context-menu" style="left: ${this.x}px; top: ${this.y}px;">
        ${this.menuItems.map(
          (item) =>
            html`<div class="menu-item" @click="${this.handleMenuItemClick(item)}">${item}</div>`
        )}
      </div>
    `;
  }

  handleContextMenu(event) {
    event.preventDefault();
    this.isOpen = true;
    this.x = event.clientX;
    this.y = event.clientY;

    window.addEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = () => {
    this.isOpen = false;
    window.removeEventListener('click', this.handleOutsideClick);
  };

  handleMenuItemClick(item) {
    return () => {
      this.isOpen = false;
      this.dispatchEvent(new CustomEvent('context-menu-item-clicked', { detail: item }));
    };
  }
}

customElements.define('smart-context-menu', SmartContextMenu);
