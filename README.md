# json:api:spec

A minimalistic specification for building RESTful APIs in JSON.

This project inspired after [{json:api}](https://jsonapi.org/)

**{json:api}** is undoubtedly one of the best API specifications and this project has no intention of replacing it. This approach is proposing more of a minimalistic, but scalable API Spec. which can use building RESTful APIs.

Here's an example JSON Response:

```json
{
  "data": [
    {
      "id": "1",
      "title": "Hello World!",
      "excerpt": "Neque porro quisquam est qui dolorem",
      "body": "<p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit<p>",
      "featured_image": "https://cdn.example.com/hello.png",
      "datestamp": "Sat, 25 Jul 2020 13:24:57 GMT",
      "authors": {
        "data": [
          {
            "id": "11",
            "first_name": "John",
            "last_name": "Doe",
            "_links": {
              "self": "http://example-api.com/authors/11"
            }
          }
        ],
        "_links": {
          "self": "http://example-api.com/articles/1/authors/"
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
                "self": "http://example-api.com/users/121"
              }
            },
            "_links": {
              "self": "http://example-api.com/comments/12"
            }
          }
        ],
        "_links": {
          "self": "http://example-api.com/articles/1/comments/"
        }
      }
    }
  ],
  "_params": {
    "limit": "20",
    "offset": "1",
    "html": "true"
  },
  "_meta": {
    "request_id": "83dcefb7",
    "resource": "articles"
  },
  "_links": {
    "self": "http://example-api.com/articles",
    "next": "http://example-api.com/articles?limit=20&offset=21"
  }
}
```

[![CC0 1.0 Universal (CC0 1.0)
Public Domain Dedication](https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/cc-zero.svg)](https://creativecommons.org/publicdomain/zero/1.0/)
