const program = require("commander");
const pkg = require("./package.json");

const server = require("./server");

program.version(pkg.version, "-v, --version");

program
  .command("start")
  .option("-p, --port <port>")
  .option("-s, --spec <fp>")
  .description("mock-server start -p 3001 -s ./api.json")
  .action(({port, spec, prefix}) => {
    // TODO Validate args: port, spec
    // TODO Let users to specify API Prefix
    server.start(port, spec, prefix);
  });

program.parse(process.argv);