import { LitElement, html, css, property } from 'lit';

class WeatherWidget extends LitElement {
  @property({ type: String }) city = 'London';
  @property({ type: Object }) weatherData = null;
  @property({ type: String }) apiKey = "";

  static styles = css`
    .widget {
      font-family: 'Arial', sans-serif;
      padding: 15px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      text-align: center;
      background-color: #f9f9f9;
    }

    .temperature {
      font-size: 2em;
      margin: 10px 0;
    }

    .condition {
      font-size: 1.2em;
      margin-bottom: 10px;
    }

    .icon {
      width: 100px;
      height: 100px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.fetchWeatherData();
  }

  async fetchWeatherData() {
    // Mock API URL (replace with a real API call)
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${this.city}&aqi=no`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Weather data fetch failed');
      }
      const data = await response.json();
      this.weatherData = data.current;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  renderWeather() {
    if (this.weatherData) {
      return html`
        <div class="temperature">${this.weatherData.temp_c}°C</div>
        <div class="condition">${this.weatherData.condition.text}</div>
        <img class="icon" src="${this.weatherData.condition.icon}" alt="Weather icon">
      `;
    }
    return html`<div>Loading...</div>`;
  }

  render() {
    return html`
      <div class="widget">
        <div class="city">${this.city}</div>
        ${this.renderWeather()}
      </div>
    `;
  }
}

customElements.define('weather-widget', WeatherWidget);
