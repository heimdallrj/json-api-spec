const program = require("commander");
const pkg = require("./package.json");

program.version(pkg.version, "-v, --version");

program
  .command("start")
  .option("-p, --port", "Specify custom port")
  .option("-s, --spec", "")
  .option("-r, --routes", "")
  .description("json-api start -p 3001 -s ./api.json -r routes.json")
  .action((a, b, c) => {
    console.log(a, b, c);
  });

program.parse(process.argv);