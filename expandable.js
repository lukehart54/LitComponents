import { LitElement, html, css, property } from 'lit';

class ExpandableDiv extends LitElement {
  @property({ type: Boolean }) expanded = false;
  @property({ type: String }) headerText = 'Toggle me';
  @property({ type: String }) contentText = 'Content goes here';

  static styles = css`
    .expandable-div {
      border: 1px solid #ccc;
      padding: 10px;
      margin: 10px;
    }

    .header {
      cursor: pointer;
      font-weight: bold;
    }

    .content {
      display: none;
    }

    .content[expanded] {
      display: block;
    }
  `;

  render() {
    return html`
      <div class="expandable-div">
        <div class="header" @click="${this.toggleContent}">${this.headerText}</div>
        <div class="content" ?expanded="${this.expanded}">
          ${this.contentText}
        </div>
      </div>
    `;
  }

  toggleContent() {
    this.expanded = !this.expanded;
  }
}

customElements.define('expandable-div', ExpandableDiv);
