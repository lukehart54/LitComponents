import { LitElement, html, css, property } from 'lit';

class CustomHeader extends LitElement {
  @property({ type: String }) title = 'My Header';
  @property({ type: Array }) links = [
    { text: "Home", url: "#" },
    { text: "About", url: "#", subLinks: [{ text: "Team", url: "#" }, { text: "History", url: "#" }] },
    { text: "Contact", url: "#" }
  ];
  @property({ type: Boolean }) dropdownOpen = false;
  @property({ type: String }) theme = 'light'; // or 'dark'
  @property({ type: String }) searchText = '';

  static styles = css`
    :host {
      display: block;
      background-color: #0078d4;
      color: white;
      padding: 16px;
      position: relative;
    }

    :host([theme='dark']) {
      background-color: #333;
      color: white;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title {
      font-size: 24px;
      margin-right: 20px;
    }

    .links {
      display: flex;
    }

    .link {
      margin-right: 20px;
      text-decoration: none;
      color: white;
      cursor: pointer;
    }

    .dropdown {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      padding: 12px;
      z-index: 1;
      color: black;
    }

    .dropdown a {
      text-decoration: none;
      color: black;
      display: block;
      margin: 5px 0;
    }

    .dropdown a:hover {
      background-color: #f1f1f1;
    }

    .search {
      display: flex;
      align-items: center;
    }

    .search input {
      padding: 8px;
      margin-right: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .search button {
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
    }

    @media screen and (max-width: 600px) {
      .links {
        display: none;
      }

      .mobile-menu-icon {
        display: block;
        cursor: pointer;
      }
    }
  `;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  renderLink(link) {
    return html`
      <span class="link" @click="${() => this.handleLinkClick(link)}">
        ${link.text}
        ${link.subLinks
          ? html`
              <button @click="${this.toggleDropdown}">▼</button>
              <div class="dropdown" style="display: ${this.dropdownOpen ? 'block' : 'none'};">
                ${link.subLinks.map(subLink => this.renderLink(subLink))}
              </div>
            `
          : ''}
      </span>
    `;
  }

  handleLinkClick(link) {
    this.dispatchEvent(new CustomEvent('link-clicked', { detail: link }));
  }

  handleSearchInput(event) {
    this.searchText = event.target.value;
  }

  handleSearch() {
    this.dispatchEvent(new CustomEvent('search', { detail: this.searchText }));
  }

  render() {
    return html`
      <div class="header" theme="${this.theme}">
        <div class="title">${this.title}</div>
        <div class="links">
          ${this.links.map(link => this.renderLink(link))}
        </div>
        <div class="search">
          <input type="text" placeholder="Search..." @input="${this.handleSearchInput}">
          <button @click="${this.handleSearch}">🔍</button>
        </div>
      </div>
    `;
  }
}

customElements.define('header', CustomHeader);
