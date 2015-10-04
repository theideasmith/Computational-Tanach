var thru = require('../');

var input = thru();

var inflate = thru(function(obj, cb) {
  if (obj === 'a') {
    this.push('a');
    this.push('b');
    cb();
  } else {
    cb(null, obj);
  }
});

var modify = thru(function(obj, cb) {
  if (obj === 'd') obj = 'c';
  cb(null, obj);
});

var deflate = thru(function(obj, cb) {
  if (obj === 'e') cb();
  else cb(null, obj);
});

var newlines = thru(function(obj, cb) {
  cb(null, obj + '\n');
});

input
  .pipe(inflate)
  .pipe(modify)
  .pipe(deflate)
  .pipe(newlines)
  .pipe(process.stdout);

newlines.on('end', function() {
  console.log('done!');
});

input.write('a'); // a
                  // b
input.write('d'); // c
input.write('e');
input.end();      // done!