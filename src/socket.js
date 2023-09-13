import { reactive } from "vue"
import { io } from "socket.io-client";
export const state = reactive({
  connected: false,
  pkResult: false,
  onlineList: []
});

// "undefined" means the URL will be computed from the `window.location` object
//const URL = "http://localhost:3310"
const URL = "https://whisky-code-socket.onrender.com"

export const socket = io(URL);

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("who", (...args) => {
  state.onlineList.push(args);
});

socket.on("zero", (...args) => {
  state.onlineList = [];
});