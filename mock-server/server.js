const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const uniqid = require('uniqid');

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("json:api:spec MockServer started on ::/api/*");
});

let jsonSpec = {};

const formatResponse = (data, { params, route, method }, resource) => {
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
      route: route.path,
      resource,
      method
    }
  }
};

module.exports = {
  start: (port = 3001, specFp, prefix = 'api') => {
    jsonSpec = JSON.parse(fs.readFileSync(specFp));
    const resources = Object.keys(jsonSpec);

    resources.forEach((resource) => {
      const resourceJson = jsonSpec[resource];

      // GET /resource
      app.get(`/${prefix}/${resource}`, (req, res) => {
        res.send(formatResponse(resourceJson, req, resource));
      });

      // GET /resource/:id
      app.get(`/${prefix}/${resource}/:id`, (req, res) => {
        const data = resourceJson.find((obj) => String(obj.id) === req.params.id);
        res.send(formatResponse([data], req, resource));
      });

      // POST /resource
      app.post(`/${prefix}/${resource}`, (req, res) => {
        const reqBody = req.body.data;
        const data = [];
        reqBody.forEach((d) => {
          const single = {...d, id: uniqid()};
          jsonSpec[resource].push(single);
          data.push(single);
        });        
        fs.writeFileSync(specFp, JSON.stringify(jsonSpec, null, 2));

        res.send(formatResponse([data], req, resource));
      });

      // PUT /resource/:id
      app.put(`/${prefix}/${resource}/:id`, (req, res) => {
        const data = [];
        const reqBody = req.body.data[0];
        delete reqBody.id;
        jsonSpec[resource].forEach((obj, index) => {
          if (String(obj.id) === req.params.id) {
            const single = {...jsonSpec[resource][index], ...reqBody};
            data.push(single);
            jsonSpec[resource][index] = single;
          }
        });
        fs.writeFileSync(specFp, JSON.stringify(jsonSpec, null, 2));

        res.send(formatResponse([data], req, resource));
      });

      // PATCH /resource/:id
      // TODO Impliment this properly later.
      app.patch(`/${prefix}/${resource}/:id`, (req, res) => {
        const data = [];
        const reqBody = req.body.data[0];
        delete reqBody.id;
        jsonSpec[resource].forEach((obj, index) => {
          if (String(obj.id) === req.params.id) {
            const single = {...jsonSpec[resource][index], ...reqBody};
            data.push(single);
            jsonSpec[resource][index] = single;
          }
        });
        fs.writeFileSync(specFp, JSON.stringify(jsonSpec, null, 2));

        res.send(formatResponse([data], req, resource));
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

        res.send(formatResponse([data], req, resource));
      });
    });

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  },
};
