import { LitElement, html, css, property } from 'lit';

class Tabs extends LitElement {
  @property({ type: Array }) tabs = [];
  @property({ type: Number }) activeTabIndex = 0;

  static styles = css`
    .tabs {
      overflow: hidden;
      background: #ddd;
      font-family: Arial;
    }

    .tab {
      float: left;
      list-style: none;
      margin-bottom: -1px; /* Prevent double border */
      padding: 10px 15px;
      cursor: pointer;
    }

    .active-tab {
      background-color: white;
      border: solid 1px #ccc;
      border-bottom: none;
    }

    .tab-content {
      padding: 10px;
      border: solid 1px #ccc;
      background-color: white;
    }
  `;

  setActiveTab(index) {
    this.activeTabIndex = index;
  }

  render() {
    return html`
      <ul class="tabs">
        ${this.tabs.map((tab, index) => html`
          <li class="tab ${index === this.activeTabIndex ? 'active-tab' : ''}" @click="${() => this.setActiveTab(index)}">
            ${tab.title}
          </li>
        `)}
      </ul>
      <div class="tab-content">
        ${this.tabs[this.activeTabIndex].content}
      </div>
    `;
  }
}

customElements.define('tabs', Tabs);
