import {
  customElement,
  useProp,
  useState,
  useRef,
  useEffect,
  usePublic
} from "atomico";
import html from "atomico/html";
import css from "./SpinnerLoading.css";

const STATUS = {
  LOADING: 0,
  PAUSE: 1,
  LOADED: 2
};

const STYLES = ["square", "circle", "leaf", "jump", "diamond", "star"];

function SpinnerLoading() {
  const [type] = useProp("type");
  const [status, setStatus] = useState(STATUS.LOADING);

  const ref = useRef();
  const togglePause = () =>
    status === STATUS.PAUSE ? STATUS.LOADING : STATUS.PAUSE;

  const pause = () => {
    setStatus(togglePause());
    ref.current.style.setProperty(
      "--state",
      status !== STATUS.PAUSE ? "paused" : "running"
    );
  };

  const end = () => {
    setStatus(STATUS.LOADED);
    ref.current.remove();
  };

  usePublic("pause", pause);
  usePublic("end", end);

  // Styles
  useEffect(() => {
    if (STYLES.includes(type))
      ref.current.shadowRoot.querySelector(".spinner").classList.add(type);
  });

  return html`
    <host ref="${ref}" shadowDom>
      <style>
        ${css}
      </style>
      <div class="spinner">
        <div class="block" part="b1"></div>
        <div class="block" part="b2"></div>
        <div class="block" part="b3"></div>
        <div class="block" part="b4"></div>
      </div>
    </host>
  `;
}

SpinnerLoading.props = {
  type: {
    type: String,
    value: "jump"
  }
};

export default customElement("spinner-loading", SpinnerLoading);
