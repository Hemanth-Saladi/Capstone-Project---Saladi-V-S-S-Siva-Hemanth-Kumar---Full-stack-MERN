const figlet = require("figlet");
const chalk = require("chalk");

figlet("Hello Hemanth, Welcome to Node.js", (err, data) => {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }

  console.log(chalk.blue(data));
});