import { customElement, useProp, useState, useRef } from "atomico";
import html from "atomico/html";
import css from "./YoutubeVideo.css";

const SIZES = {
  "180p": { width: 320, height: 180, name: "mq" },
  "240p": { width: 420, height: 240, name: "mq" },
  "360p": { width: 480, height: 360, name: "hq" },
  "480p": { width: 640, height: 480, name: "sd" },
  "720p": { width: 1280, height: 720, name: "maxres" },
  "960p": { width: 1600, height: 960, name: "maxres" },
  "1080p": { width: 1920, height: 1080, name: "maxres" }
};

const STATUS = {
  PREVIEW: 0,
  LOADING: 1,
  COMPLETE: 2,
  ERROR: -1
};

function YoutubeVideo() {
  // Hooks
  const [video] = useProp("v");
  const [width] = useProp("width");
  const [height] = useProp("height");
  const [size] = useProp("size");
  const [start] = useProp("start");
  const [autoplay] = useProp("autoplay");
  const [noControls] = useProp("noControls");
  const [end] = useProp("end");
  const dom = useRef();

  // State
  const [status, setStatus] = useState(STATUS.PREVIEW);

  // useEffect(() => {
  //   console.log('useEffect hook', video, status);
  //   return () => console.log('useEffect hook return', video, status);
  // });

  // Members
  const image = `https://img.youtube.com/vi/${video}/${SIZES[size].name}default.jpg`;
  const url = new URL(`https://www.youtube-nocookie.com/embed/${video}`);

  if (start > 0) url.searchParams.append("start", start);
  if (autoplay) url.searchParams.append("autoplay", autoplay);
  if (end > 0) url.searchParams.append("end", end);
  if (noControls) url.searchParams.append("controls", 0);
  url.searchParams.append("rel", 0);
  url.searchParams.append("showinfo", 0);

  // Getters
  const getWidth = () => width || SIZES[size].width;
  const getHeight = () => height || SIZES[size].height;

  // Setters
  const enableVideo = () => setStatus(STATUS.LOADING);
  const setComplete = () => {
    setStatus(STATUS.COMPLETE);
    const spinner = dom.current.shadowRoot.querySelector(".container");
    spinner.remove();
  };

  // Styles
  const styles = `
    :host {
        --width: ${getWidth()}px;
        --height: ${getHeight()}px;
    }
  `;

  // Templates
  const getImage = () =>
    html`
      <img
        width="${getWidth()}"
        height="${getHeight()}"
        loading="lazy"
        src="${image}"
        alt="Youtube Image"
        onmouseover="${enableVideo}"
      />
    `;

  const getVideo = () => {
    return html`
      <div class="container">
        <spinner-loading></spinner-loading>
      </div>
      <iframe
        width="${getWidth()}"
        height="${getHeight()}"
        loading="lazy"
        src="${url}"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        onload="${setComplete}"
      >
      </iframe>
    `;
  };

  // Render
  return html`
    <host ref="${dom}" shadowDom styleSheet=${[css, styles]}>
      ${status === STATUS.PREVIEW ? getImage() : ""}
      ${status > STATUS.PREVIEW ? getVideo() : ""}
    </host>
  `;
}

YoutubeVideo.props = {
  v: String,
  size: {
    type: String,
    value: "480p"
  },
  width: Number,
  height: Number,
  start: Number,
  end: Number,
  noControls: {
    type: Boolean,
    value: false
  },
  autoplay: {
    type: Boolean,
    value: false
  }
};

export default customElement("youtube-video", YoutubeVideo);
