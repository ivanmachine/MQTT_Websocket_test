import { io, Socket } from "socket.io-client";
import { wsStore } from "../stores/ws_store";

let _socket: Socket | null = null;

export function getSocket(): Socket | null {
    if(_socket) return _socket;
    try {
        const socket = io("http://localhost:8080");
        _socket = socket;
        return socket;
    } catch(e) {
        console.error(e);
        return null;
    }
}

export function connect() {
    const socket = getSocket();
    if(socket) {
        socket.on("connect", () => {
            wsStore.update(state => ({ ...state, status: "connected" }));
        });

        socket.on("temperature", (temperature) => {
            wsStore.update(state => ({ ...state, data: [...state.data, temperature] }));
        });
        
        socket.on("disconnect", () => {
            wsStore.update(state => ({ ...state, status: "disconnected" }));
        });
    }
}

export function disconnect() {
    wsStore.update((state) => ({ ...state, status: "loading" }));
    const socket = getSocket();
    if(socket) socket.disconnect();
    _socket = null;
    wsStore.update((state) => ({ ...state, status: "disconnected" }));
} 