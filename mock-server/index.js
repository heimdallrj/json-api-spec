const program = require("commander");

const server = require("./server");
const { isValidPortNumber } = require("./utils/validate");
const { version } = require("./config");

program.version(version, "-v, --version");

program
  .command("start")
  .option("-p, --port <port>")
  .option("-s, --spec <fp>")
  .description("mock-server start -p 3001 -s ./api.json")
  .action(({ port, spec }) => {
    if (!isValidPortNumber(port)) {
      console.log(`Not a valid port: ${port}`);
      return;
    }
    // TODO Validate args: spec
    server.start(port, spec);
  });

program.parse(process.argv);
