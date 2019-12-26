import { customElement, useProp, useState, useEffect, useRef } from "atomico";
import html from "atomico/html";
import css from "./FancyButton.css";

const STATUS = {
  DISABLED: -1,
  NORMAL: 0
};

function FancyButton() {
  const [status, setStatus] = useState(STATUS.NORMAL); // eslint-disable-line
  const [disabled] = useProp("disabled");
  const ref = useRef();

  useEffect(() => {
    setStatus(STATUS.DISABLED);
    if (disabled) ref.current.disabled = true;
  });

  return html`
    <host shadowDom styleSheet="${css}">
      <button ref="${ref}"><slot></slot></button>
    </host>
  `;
}

FancyButton.props = {
  href: {
    type: String,
    value: "#"
  },
  disabled: Boolean
};

export default customElement("fancy-button", FancyButton);
