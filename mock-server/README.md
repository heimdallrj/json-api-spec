# json:api:spec MockServer

[![npm version](https://badge.fury.io/js/json-api-spec.svg)](https://badge.fury.io/js/json-api-spec)

Get up and running fully MockAPIServer with zero coding.

## Getting Started

Install npm package.

```
npm install -g json-api-spec // or npm install -d json-api-spec
```

Create JSON SPEC file anywhere on your computer.

**api.json**
```json
{
  "posts": [
    { "id": 1, "title": "Hello World!", "author": "John Doe" }
  ],
  "comments": [
    { "id": 1, "body": "Some comment", "postId": 1 }
  ]
}
```

Start MockServer

```
mock-server -s ./api.json -p 3001
```

The MockAPIServer will start on port ::3001/api/* (or on the port you specified).

### Available Routes

```
GET resource
GET resource/:id
POST resource
PUT resource/:id
PATCH resource/:id
DELETE resource/:id
```

## License

MIT