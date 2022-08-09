import io from "socket.io-client";
import { setRoomId, setParticipants } from "../redux/actions";
import store from "../redux/actions";
import * as webRTCHandler from "./webRTCHandler";

const SERVER = "http://localhost:5000";

let socket = null;

export const connectWithSocketIOServer = () => {
  socket = io(SERVER);

  socket.on("connect", () => {
    console.log("successfully connected with socket io server");
    // console.log(socket.id);
  });

  socket.on("room-id", (data) => {
    const { roomId } = data;
    store.dispatch(setRoomId(roomId));
  });

  socket.on("room-update", (data) => {
    const { connectedUsers } = data;
    store.dispatch(setParticipants(connectedUsers));
  });

  socket.on("connect-prepare", (data) => {
    const { connUserSocketId } = data;

    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

    // inform the user which just join the room that we have prepared for incoming connection
    socket.emit("connect-init", { connUserSocketId: connUserSocketId });
  });

  socket.on("connect-signal", (data) => {
    webRTCHandler.handleSignalingData(data);
  });

  socket.on("connect-init", (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on("user-disconnected", (data) => {
    webRTCHandler.removePeerConnection(data);
  });
};

export const createNewRoom = (identity) => {
  // emit an event to server that we would like to create new room
  const data = {
    identity,
  };

  socket.emit("new-room", data);
};

export const joinRoom = (identity, roomId) => {
  //emit an event to server that we would to join a room
  const data = {
    roomId,
    identity,
  };

  socket.emit("join-room", data);
};

export const signalPeerData = (data) => {
  socket.emit("connect-signal", data);
};
