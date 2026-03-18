const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on("userLoggedIn", (username) => {
    console.log(`User ${username} logged in.`);
});

eventEmitter.on("userLoggedOut", (username) => {
    console.log(`User ${username} logged out.`);
});

eventEmitter.on("sessionExpired", (username) => {
    console.log(`Session expired for ${username}.`);
});

const user = "Hemanth";

eventEmitter.emit("userLoggedIn", user);
eventEmitter.emit("userLoggedOut", user);

setTimeout(() => {
    eventEmitter.emit("sessionExpired", user);
}, 5000);