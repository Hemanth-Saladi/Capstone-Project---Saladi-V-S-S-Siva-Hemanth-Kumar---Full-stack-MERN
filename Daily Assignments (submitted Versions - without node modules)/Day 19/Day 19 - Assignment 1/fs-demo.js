const fs = require("fs").promises;

async function handleFile() {
    try {
        const feedback = "Node.js is awesome!";

        await fs.writeFile("feedback.txt", feedback);
        console.log("Data written successfully.");

        console.log("Reading file...");
        const data = await fs.readFile("feedback.txt", "utf8");
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

handleFile();