import { customElement } from "atomico";
import html from "atomico/html";
import css from "./BlockComponent.css";

// External JS/CSS vars
const color = "red";

function BlockComponent() {
  return html`
    <host shadowDom>
      <style>
        :host {
          --color: ${color};
          background: #191919;
        }
        ${css}
      </style>
      <div class="block">
        <h2>BlockComponent</h2>
        <img src="/assets/webcomponents.png" alt="WebComponents icon" />
        <slot><p>This is my description text!</p></slot>
      </div>
    </host>
  `;
}

export default customElement("block-component", BlockComponent);
