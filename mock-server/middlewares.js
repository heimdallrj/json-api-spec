const uniqid = require("uniqid");

const { formatErrorMsg } = require("./utils/http");
const { version } = require("./config");

module.exports = {
  validationMiddleware: (req, res, next) => {
    if (req.method !== "GET") {
      const contentType = req.headers["content-type"];
      if (contentType !== "application/json")
        return res
          .status(415)
          .send(formatErrorMsg(415, "Unsupported Media Type"));
    }

    let xRequestId = req.headers["x-request-id"];
    if (!xRequestId) xRequestId = uniqid();
    res.set("X-Request-ID", xRequestId);

    res.set("json-api-spec", `v${version}`);

    next();
  },
};
