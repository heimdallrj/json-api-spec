const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const uniqid = require('uniqid');

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("json:api:spec MockServer started on ::/api/*");
});

const formatResponse = (data, { params, route }, resource) => {
  const getEndpoints = () => {
    let self = route.path.replace('/api', '');
    Object.keys(params).forEach((p) => {
      self = self.replace(`:${p}`, params[p])
    });

    return {
      self
    }
  };

  return {
    data,
    endpoints: getEndpoints(),
    meta: {
      request_id: uniqid(),
      route,
      resource
    }
  }
};

module.exports = {
  start: (port = 3001, specFp, prefix = 'api') => {
    const jsonSpec = JSON.parse(fs.readFileSync(specFp));
    const resources = Object.keys(jsonSpec);

    resources.forEach((resource) => {
      const resourceJson = jsonSpec[resource];

      // GET /resource
      app.get(`/${prefix}/${resource}`, (req, res) => {
        res.send(formatResponse(resourceJson, req, resource));
      });

      // GET /resource/{id}
      app.get(`/${prefix}/${resource}/:id`, (req, res) => {
        const data = resourceJson.find((obj) => String(obj.id) === req.params.id);
        res.send(formatResponse([data], req, resource));
      });
      
      // TODO Impliment for post, put, patch and delete methods
    });

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  },
};
