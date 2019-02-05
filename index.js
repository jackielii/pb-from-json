'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fromJSON;

var _lodashEs = require('lodash-es');

function isPrimitive(test) {
  return test !== Object(test);
} // This is a hack to convert js objects to proto objects
// official js protobuf have this issue actively discussed:
// https://github.com/protocolbuffers/protobuf/issues/1591
// https://github.com/protocolbuffers/protobuf/pull/5449

function fromJSON(pb, value) {
  var ctors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if ((0, _lodashEs.isPlainObject)(value)) {
    Object.keys(value).forEach(function (k) {
      var setter = 'set' + (k.charAt(0).toUpperCase() + k.slice(1));
      var val = value[k];
      if ((0, _lodashEs.isArray)(val)) {
        setter += 'List';
      }
      if (setter in pb) {
        if (isPrimitive(val)) {
          pb[setter](val);
        } else if ((0, _lodashEs.isPlainObject)(val)) {
          var Ctor = ctors[k + '.ctors'];
          if (Ctor) {
            var subPb = new Ctor();
            fromJSON(subPb, val, ctors[k]);
            pb[setter](subPb);
          }
        } else if ((0, _lodashEs.isArray)(val) && val.length) {
          var firstEl = val[0];
          if (isPrimitive(firstEl)) {
            pb[setter](val);
          } else if ((0, _lodashEs.isPlainObject)(val)) {
            var array = [];
            var _Ctor = ctors[k + '.ctors'];
            if (_Ctor) {
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = val[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var el = _step.value;

                  var sub = new _Ctor();
                  array.push(fromJSON(sub, el, ctors[k]));
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              pb[setter](val);
            }
          }
        }
      }
    });
  }
  return pb;
}