import Artyom from "artyom.js";

const artyom = new Artyom();

export const initSTT = (commands = []) => {
  artyom.initialize({
    lang: "en-GB", // Great Britain english
    continuous: true, // Listen forever
    listen: true, // Start listening when the page is loaded
    debug: true, // Show debug messages in the console
    speed: 0.9, // Talk a little bit slower
    mode: "normal", // This mode will listen to commands
  }).then(() => {
    console.log("Artyom has been succesfully initialized");
  }).catch((err) => {
    console.error("Artyom couldn't be initialized", err);
  });

  artyom.addCommands(commands);
};

export const startSTT = () => {
  artyom.fatality().then(() => {
    console.log("Artyom succesfully stopped");
    artyom.initialize({
      lang: "en-GB",
      continuous: true,
      listen: true,
      debug: true,
      speed: 0.9,
      mode: "normal",
    });
  });
};

export const stopSTT = () => {
  artyom.fatality();
};

export const addSTTCommand = (command) => {
  artyom.addCommands(command);
};
