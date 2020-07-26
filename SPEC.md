# json:api:spec (v1.0.0-alpha.14)

## Status

Early draft.

## Introduction

TODO

## Content Negotiation

```
Content-Type: application/json
Accept: application/json
```

## API Structure

### URI Component

```
[protocol(http|https)]://[host]:[port]/api/v[api-version-number]/[resource]/[identifier]?[url-param-field]=[url-param-value]
```

**Examples**
```
GET https:/example.com/api/articles?limit=20&offset=100
GET https:/example.com/api/v1/articles/1/comments?recent=true
```

### Versioning

Use [Semantic Versioning](https://semver.org/)

### Request/Response Overview

#### Request

##### GET

```
GET /articles HTTP/1.1
Content-Type: application/json
Accept: application/json
X-Request-ID: ?
```

##### POST

```
POST /articles HTTP/1.1
Content-Type: application/json
Accept: application/json
X-Request-ID: ?

{
  "data": [{}]
}
```

##### PUT

```
PUT /articles/1 HTTP/1.1
Content-Type: application/json
Accept: application/json
X-Request-ID: ?

{
  "data": [{}]
}
```

##### PATCH

```
PATCH /articles/1 HTTP/1.1
Content-Type: application/json
Accept: application/json
X-Request-ID: ?

{
  "data": [{}]
}
```

##### DELETE

```
DELETE /articles/1 HTTP/1.1
Content-Type: application/json
Accept: application/json
X-Request-ID: ?

{
  "data": [{}]
}
```

#### Response

A response object MUST contain at least one of the following fields:

* [`data`](https://github.com/thinkholic/json-api-spec/blob/master/SPEC.md#data)
* [`error`](https://github.com/thinkholic/json-api-spec/blob/master/SPEC.md#error)

Additionally,

* [`endpoints`](https://github.com/thinkholic/json-api-spec/blob/master/SPEC.md#endpoints)

##### `data`

```json
{
  "data": [],
}
```

##### `error`

```json
{
  "error": {
    "code": "601",
    "message": "Custom Error Message"
  }
}
```

###### `endpoints`

```json
{
  "endpoints": {
    "self": "/articles",
    "first": "/articles?limit=20&offset=1",
    "last": "/articles?limit=20&offset=100",
    "prev": "/articles?limit=20&offset=21",
    "next": "/articles?limit=20&offset=41",
    "explicit": "/articles/1",
    "extends": "/comments/12",
    "related": "/articles/1/meta"
  },
}
```

#### HTTP Status Codes

**1×× Informational**  
100 Continue  
101 Switching Protocols  
102 Processing

**2×× Success**  
200 OK  
201 Created  
202 Accepted  
203 Non-authoritative Information  
204 No Content  
205 Reset Content  
206 Partial Content  
207 Multi-Status  
208 Already Reported  
226 IM Used  

**3×× Redirection**  
300 Multiple Choices
301 Moved Permanently  
302 Found  
303 See Other  
304 Not Modified  
305 Use Proxy  
307 Temporary Redirect  
308 Permanent Redirect

**4×× Client Error**  
400 Bad Request  
401 Unauthorized  
402 Payment Required  
403 Forbidden  
404 Not Found  
405 Method Not Allowed  
406 Not Acceptable  
407 Proxy Authentication Required  
408 Request Timeout  
409 Conflict  
410 Gone  
411 Length Required  
412 Precondition Failed  
413 Payload Too Large  
414 Request-URI Too Long  
415 Unsupported Media Type  
416 Requested Range Not Satisfiable  
417 Expectation Failed  
418 I'm a teapot  
421 Misdirected Request  
422 Unprocessable Entity  
423 Locked  
424 Failed Dependency  
426 Upgrade Required  
428 Precondition Required  
429 Too Many Requests  
431 Request Header Fields Too Large  
444 Connection Closed Without Response  
451 Unavailable For Legal Reasons  
499 Client Closed Request  

**5×× Server Error**  
500 Internal Server Error  
501 Not Implemented  
502 Bad Gateway  
503 Service Unavailable  
504 Gateway Timeout  
505 HTTP Version Not Supported  
506 Variant Also Negotiates  
507 Insufficient Storage  
508 Loop Detected  
510 Not Extended  
511 Network Authentication Required  
599 Network Connect Timeout Error

## Links
- {json:api} - [jsonapi.org](https://jsonapi.org/)
- Semantic Versioning [semver.org](https://semver.org/)
- HTTP Status Codes - [httpstatuses.com](https://httpstatuses.com/)

