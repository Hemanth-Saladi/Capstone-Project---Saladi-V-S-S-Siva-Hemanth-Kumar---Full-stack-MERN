const name = process.argv[2];

if (!name) {
    console.log("Please provide your name.");
    console.log("Example: node greet.js Hemanth");
} else {
    const now = new Date();
    console.log(`Hello, ${name}! Today is ${now}`);
}