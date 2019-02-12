#### pb-from-json

Convert js objects to proto objects, useful to use with grpc-web

Official js protobuf have this issue actively discussed:

https://github.com/protocolbuffers/protobuf/issues/1591

https://github.com/protocolbuffers/protobuf/pull/5449

Once the above issues are resolved, this package doesn't need to exist

example:

```
    const resp = await grpcCall(fromJSON(object))
    return resp.toObject()
```

