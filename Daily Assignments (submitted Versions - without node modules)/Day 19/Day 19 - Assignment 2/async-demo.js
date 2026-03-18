const fs = require("fs").promises;

async function copyFile() {
    try {
        const data = await fs.readFile("input.txt", "utf8");

        await new Promise((resolve) => setTimeout(resolve, 1000));

        await fs.writeFile("async-output.txt", data);

        console.log("File copied successfully using async/await!");
    } catch (error) {
        console.error("Error:", error);
    }
}

copyFile();