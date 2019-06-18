#### pb-from-json
Convert js objects to proto objects, useful to use with grpc-web
Official js protobuf have this issue actively discussed:
https://github.com/protocolbuffers/protobuf/issues/1591
https://github.com/protocolbuffers/protobuf/pull/5449

Once the above issues are resolved, this package doesn't need to exist

example:

```

import { PingRequest } from 'my-service-pb'

const obj = {
    a: 'a',
    b: 'b'
}

const pbObj = pbFromJson(PingRequest, obj)
```

nested example:

```

import {PingRequest, PingSubRequest} from 'my-service-pb'

const obj = {
    a: 'a',
    b: {
        c: 'c'
    }
}
const pbObj = pbFromJson(PingRequest, obj, {'b.ctors':PingSubRequest})
```
