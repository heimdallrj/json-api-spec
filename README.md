# json:api:spec

A minimalistic specification for building RESTful APIs in JSON.

This project inspired after [{json:api}](https://jsonapi.org/)

**{json:api}** is one of the best API specifications we have around. The intention of this project isn't competing but proposing more of a minimalistic, but scalable API specification which can apply to build RESTful APIs.

Here's an example JSON Response:

```json
{
  "data": [
    {
      "id": "1",
      "title": "Hello World!",
      "excerpt": "Neque porro quisquam est qui dolorem",
      "body": "<p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit<p>",
      "images": [
        "https://cdn.example.com/hello.png",
        "https://cdn.example.com/hello-2.png"
      ],
      "datestamp": "Sat, 25 Jul 2020 13:24:57 GMT",
      "authors": {
        "data": [
          {
            "id": "11",
            "first_name": "John",
            "last_name": "Doe",
            "_links": {
              "self": "http://example.com/api/authors/11"
            }
          }
        ],
        "_links": {
          "self": "http://example.com/api/articles/1/authors/"
        }
      },
      "comments": {
        "data": [
          {
            "id": "12",
            "body": "Nice writeup!",
            "author": {
              "id": "121",
              "first_name": "Jane",
              "last_name": "Doe",
              "email": "jane.doe@example.com",
              "avatar": "https://cdn.example.com/users/jane-doe.png",
              "_links": {
                "self": "http://example.com/api/users/121"
              }
            },
            "_links": {
              "self": "http://example.com/api/comments/12"
            }
          }
        ],
        "_links": {
          "self": "http://example.com/api/articles/1/comments/"
        }
      }
    }
  ],
  "_meta": {
    "request_id": "83dcefb7",
    "resource": "articles",
    "params": {
      "limit": "20",
      "offset": "1",
      "html": "true"
    }
  },
  "_links": {
    "self": "http://example.com/api/articles",
    "next": "http://example.com/api/articles?limit=20&offset=21"
  }
}
```

[![CC0 1.0 Universal (CC0 1.0)
Public Domain Dedication](https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/cc-zero.svg)](https://creativecommons.org/publicdomain/zero/1.0/)
