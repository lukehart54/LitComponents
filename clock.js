import { LitElement, html, css, property } from 'lit';

class DigitalClock extends LitElement {
  @property({ type: String }) currentTime = this.getCurrentTime();

  static styles = css`
    .clock {
      font-family: 'Arial', sans-serif;
      font-size: 24px;
      background: #333;
      color: white;
      padding: 10px;
      border-radius: 5px;
      text-align: center;
      width: 200px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.timerID = setInterval(() => {
      this.currentTime = this.getCurrentTime();
    }, 1000);
  }

  disconnectedCallback() {
    clearInterval(this.timerID);
    super.disconnectedCallback();
  }

  getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString();
  }

  render() {
    return html`
      <div class="clock">${this.currentTime}</div>
    `;
  }
}

customElements.define('clock', DigitalClock);
