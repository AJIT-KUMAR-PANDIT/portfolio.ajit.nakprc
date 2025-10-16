import Artyom from "artyom.js";

const artyom = new Artyom();

export const initTTS = () => {
  artyom.initialize({
    lang: "en-GB", // Great Britain english
    continuous: false, // Do not stop artyom when talking
    listen: false, // Start listening when the page is loaded
    debug: true, // Show debug messages in the console
    speed: 0.9, // Talk a little bit slower
    mode: "silent", // This mode doesn't listen to commands
  });
};

export const speakText = (text) => {
  artyom.say(text);
};