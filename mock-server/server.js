const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const uniqid = require("uniqid");

const { validationMiddleware } = require("./middlewares");
const { formatSuccessResponse, formatErrorMsg } = require("./utils/http");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("json:api:spec MockServer started on ::/api/*");
});

app.use("/api/*", validationMiddleware);

let jsonSpec = {};
const config = {
  prefix: "api",
};

module.exports = {
  start: (port = 3001, specFp, prefix = config.prefix) => {
    jsonSpec = JSON.parse(fs.readFileSync(specFp));
    const resources = Object.keys(jsonSpec);

    resources.forEach((resource) => {
      const resourceJson = jsonSpec[resource];

      // GET /resource
      app.get(`/${prefix}/${resource}`, (req, res) => {
        res.status(200).send(formatSuccessResponse(resourceJson, req));
      });

      // GET /resource/:id
      app.get(`/${prefix}/${resource}/:id`, (req, res) => {
        const single = resourceJson.find(
          (obj) => String(obj.id) === req.params.id
        );

        if (!single)
          return res.status(404).send(formatErrorMsg(404, "Not Found"));

        res.status(200).send(formatSuccessResponse([single], req));
      });

      // POST /resource
      app.post(`/${prefix}/${resource}`, (req, res) => {
        const { data } = req.body;
        let single = null;

        data.forEach((obj) => {
          delete obj.id;
          single = { id: uniqid(), ...obj };
          jsonSpec[resource].push(single);
        });
        fs.writeFileSync(specFp, JSON.stringify(jsonSpec, null, 2));

        res.status(201).send(formatSuccessResponse([single], req));
      });

      // PUT /resource/:id
      app.put(`/${prefix}/${resource}/:id`, (req, res) => {
        const { data } = req.body;
        let single = null;

        // TODO Error handling

        delete data[0].id;
        jsonSpec[resource].forEach((obj, index) => {
          if (String(obj.id) === req.params.id) {
            single = { ...jsonSpec[resource][index], ...data[0] };
            jsonSpec[resource][index] = single;
          }
        });
        fs.writeFileSync(specFp, JSON.stringify(jsonSpec, null, 2));

        res.status(200).send(formatSuccessResponse([single], req));
      });

      // PATCH /resource/:id
      // TODO Impliment this properly later.
      app.patch(`/${prefix}/${resource}/:id`, (req, res) => {
        const { data } = req.body;
        let single = null;

        // TODO Error handling

        delete data[0].id;
        jsonSpec[resource].forEach((obj, index) => {
          if (String(obj.id) === req.params.id) {
            single = { ...jsonSpec[resource][index], ...data[0] };
            jsonSpec[resource][index] = single;
          }
        });
        fs.writeFileSync(specFp, JSON.stringify(jsonSpec, null, 2));

        res.status(200).send(formatSuccessResponse([single], req));
      });

      // DELETE /resource/:id
      app.delete(`/${prefix}/${resource}/:id`, (req, res) => {
        const modifiedJsonSpecPerResource = [];
        const data = [];
        jsonSpec[resource].forEach((obj) => {
          if (String(obj.id) === req.params.id) {
            data.push(obj);
          } else {
            modifiedJsonSpecPerResource.push(obj);
          }
        });

        jsonSpec[resource] = modifiedJsonSpecPerResource;
        fs.writeFileSync(specFp, JSON.stringify(jsonSpec, null, 2));

        res.status(200).send(formatSuccessResponse(data, req));
      });
    });

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  },
};
