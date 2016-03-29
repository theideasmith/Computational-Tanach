# Gematria

Functions to calculate numeric value of Hebrew text according to various
methods of Jewish numerology

[![browser support](http://ci.testling.com/akiva/gematria.js.png)](http://ci.testling.com/akiva/gematria.js)

[![build
status](https://secure.travis-ci.org/akiva/gematria.js.png)](http://travis-ci.org/akiva/gematria.js)

# Example

    > var Gematria = require('gematria');
    > var eretz = Gematria('ץרא');
    > eretz.toMisparGadol()
    1101

NB. Any input string is sanitized of all non-Hebrew characters.

# Methods

    var Gematria = require('gematria');

## Gematria#toMisparGadol()

Returns the value counting the _sofit_ (final form) characters with 
values assigned from 500 to 900.

## Gematria#toMisparHaPanim()

Returns the absolute numerical value (or _face value_) of each of the 22
letters of the otiyot (_Hebrew letters_).

## Gematria#toMisparHechrachi() 

Another name for the _mispar hapanim_ method and, as such, is an alias of
it within the API.

## Gematria#toMisparSiduri()

Return the numerical value using each letters ordinal value (ie. from 1
to 22).

# Install

With [npm](http://npmjs.org) do:

```
npm install gematria
```

# License

The MIT License (MIT)

Copyright (c) 2014 Akiva Levy <akiva@sixthirteen.co>

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE.
