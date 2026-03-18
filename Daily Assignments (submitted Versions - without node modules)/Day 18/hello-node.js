console.log("Node.js Version:", process.version);
console.log("Current File:", __filename);
console.log("Current Directory:", __dirname);

const intervalId = setInterval(() => {
    console.log("Hello Hemanth, Welcome to Node.js!");
}, 3000);

setTimeout(() => {
    clearInterval(intervalId);
    console.log("Stopped welcome messages after 10 seconds.");
}, 10000);