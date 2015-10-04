var Transform = require('_stream_transform');
var inherits = require('inherits');

module.exports = Thru;

function Thru(transformer, opts) {
  if (!(this instanceof Thru))
    return new Thru(transformer, opts);

  this.transformer = transformer;

  opts = opts || {};
  opts.objectMode = true;
  
  Transform.call(this, opts);
}
inherits(Thru, Transform);

Thru.prototype._transform = function(chunk, encoding, cb) {
  if (this.transformer) {
    var self = this;
    this.transformer(chunk, function(err, data) {
      if (data) {
        self.push(data);
      }
      cb(err);
    });
  }
  else {
    this.push(chunk);
    cb();
  }
};
