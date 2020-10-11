### Using curl

To make a get request
```
$ curl http://localhost:8080
```

Upload a file
```
$ curl -F 'data=@path/file-path/name' http://localhost:8080` or `$curl --upload-file <path-of-the-file> http://localhost:8080`
```

Upload multiple files
```
$ curl -F 'fileX=@path/file-name' -F 'fileY=@path/filename' http://localhost:8080`
```

## Commands

```
$ curl -i -X GET http://rest-api.io/items

$ curl -i -X GET http://rest-api.io/items/5069b47aa892630aae059584

$ curl -i -X DELETE http://rest-api.io/items/5069b47aa892630aae059584

$ curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "New item", "year": "2009"}' http://rest-api.io/items

$ curl -i -X PUT -H 'Content-Type: application/json' -d '{"name": "Updated item", "year": "2010"}' http://rest-api.io/items/5069b47aa892630aae059584
```
