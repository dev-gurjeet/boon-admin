import io from "socket.io-client";

// export const socket = io("http://localhost:5000");
const connectionSocket = {
  transports: ["websocket"],
  reConnect: true,
};
export const socket = io.connect(
  "https://apis.booncontracting.com",
  connectionSocket
);
