import { Server } from "socket.io";

const io = new Server(8080, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("a user connected");
    // Set up interval to emit random number every second
    const interval = setInterval(() => {
        const randomNum: number = Math.floor(Math.random() * 10) + 1;
        socket.emit("temperature", randomNum);
    }, 1000);

    socket.on("disconnect", () => {
        clearInterval(interval);
    });
});