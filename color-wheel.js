import { LitElement, html, css } from 'lit';

class ColorWheel extends LitElement {
    static get styles() {
        return css`
            canvas {
                border: 1px solid #000;
            }
        `;
    }

    static get properties() {
        return {
            size: { type: Number },
            selectedColor: { type: String, reflect: true }
        };
    }

    constructor() {
        super();
        this.size = 300; // Default size of the color wheel
        this.selectedColor = '#FFFFFF';
    }

    firstUpdated() {
        this.drawColorWheel();
    }

    drawColorWheel() {
        const canvas = this.shadowRoot.getElementById('colorWheel');
        const ctx = canvas.getContext('2d');
        const radius = this.size / 2;
        const image = ctx.createImageData(this.size, this.size);
        const data = image.data;

        for (let x = -radius; x < radius; x++) {
            for (let y = -radius; y < radius; y++) {
                let [r, phi] = this.xyToPolar(x, y);

                if (r > radius) {
                    continue;
                }

                const deg = (phi * 180) / Math.PI;
                const [red, green, blue] = this.hslToRgb(deg, r / radius, 0.5);
                const alpha = 255;

                const index = (x + radius + (y + radius) * this.size) * 4;
                data[index] = red;
                data[index + 1] = green;
                data[index + 2] = blue;
                data[index + 3] = alpha;
            }
        }

        ctx.putImageData(image, 0, 0);
    }

    xyToPolar(x, y) {
        let r = Math.sqrt(x * x + y * y);
        let phi = Math.atan2(y, x);
        return [r, phi];
    }

    hslToRgb(h, s, l) {
        let r, g, b;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    selectColor(event) {
        const rect = this.shadowRoot.getElementById('colorWheel').getBoundingClientRect();
        const x = event.clientX - rect.left - this.size / 2;
        const y = event.clientY - rect.top - this.size / 2;
        const [r, phi] = this.xyToPolar(x, y);

        if (r > this.size / 2) {
            return;
        }

        const deg = (phi * 180) / Math.PI;
        const [red, green, blue] = this.hslToRgb(deg, r / (this.size / 2), 0.5);
        this.selectedColor = `rgb(${red}, ${green}, ${blue})`;
        this.dispatchEvent(new CustomEvent('color-change', { detail: { color: this.selectedColor } }));
    }

    render() {
        return html`
            <canvas id="colorWheel" width="${this.size}" height="${this.size}" @click="${this.selectColor}"></canvas>
        `;
    }
}

customElements.define('color-wheel', ColorWheel);
