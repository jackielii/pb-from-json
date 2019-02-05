// This is a hack to convert js objects to proto objects
// official js protobuf have this issue actively discussed:
// https://github.com/protocolbuffers/protobuf/issues/1591
// https://github.com/protocolbuffers/protobuf/pull/5449

import { isArray, isPlainObject } from 'lodash-es'
function isPrimitive (test) {
  return test !== Object(test)
}

export default function fromJSON (pb, value, ctors = {}) {
  if (isPlainObject(value)) {
    Object.keys(value).forEach(k => {
      let setter = `set${k.charAt(0).toUpperCase() + k.slice(1)}`
      let val = value[k]
      if (isArray(val)) {
        setter += 'List'
      }
      if (setter in pb) {
        if (isPrimitive(val)) {
          pb[setter](val)
        } else if (isPlainObject(val)) {
          let Ctor = ctors[`${k}.ctors`]
          if (Ctor) {
            let subPb = new Ctor()
            fromJSON(subPb, val, ctors[k])
            pb[setter](subPb)
          }
        } else if (isArray(val) && val.length) {
          let firstEl = val[0]
          if (isPrimitive(firstEl)) {
            pb[setter](val)
          } else if (isPlainObject(val)) {
            let array = []
            let Ctor = ctors[`${k}.ctors`]
            if (Ctor) {
              for (let el of val) {
                let sub = new Ctor()
                array.push(fromJSON(sub, el, ctors[k]))
              }
              pb[setter](val)
            }
          }
        }
      }
    })
  }
  return pb
}
