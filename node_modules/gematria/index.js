'use strict';

module.exports = Gematria;

var VALUES = {};

VALUES.misparHechrachi = {
  'א': 1,
  'ב': 2,
  'ג': 3,
  'ד': 4,
  'ה': 5,
  'ו': 6,
  'ז': 7,
  'ח': 8,
  'ט': 9,
  'י': 10,
  'כ': 20,
  'ך': 20,
  'ל': 30,
  'מ': 40,
  'ם': 40,
  'נ': 50,
  'ן': 50,
  'ס': 60,
  'ע': 70,
  'פ': 80,
  'ף': 80,
  'צ': 90,
  'ץ': 90,
  'ק': 100,
  'ר': 200,
  'ש': 300,
  'ת': 400
};

VALUES.misparHaPanim = VALUES.misparHechrachi;

VALUES.misparGadol = merge({
  'ך': 500,
  'ם': 600,
  'ן': 700,
  'ף': 800,
  'ץ': 900
}, VALUES.misparHaPanim);

VALUES.misparSiduri = merge({
  'כ': 11,
  'ך': 11,
  'ל': 12,
  'מ': 13,
  'ם': 13,
  'נ': 14,
  'ן': 14,
  'ס': 15,
  'ע': 16,
  'פ': 17,
  'ף': 17,
  'צ': 18,
  'ץ': 18,
  'ק': 19,
  'ר': 20,
  'ש': 21,
  'ת': 22
}, VALUES.misparHaPanim);

function Gematria(str) {
  if (!(this instanceof Gematria)) return new Gematria(str);
  this.str = filterHebrew(str);
}

Gematria.prototype.toMisparGadol = function toMisparGadol() {
  return getNumericalValue(this.str, 'misparGadol');
};

Gematria.prototype.toMisparHaPanim = function toMisparHaPanim() {
  return getNumericalValue(this.str, 'misparHaPanim');
};

Gematria.prototype.toMisparHechrachi = function toMisparHechrachi() {
  return getNumericalValue(this.str, 'misparHechrachi');
};

Gematria.prototype.toMisparSiduri = function toMisparSiduri() {
  return getNumericalValue(this.str, 'misparSiduri');
};

function merge(target, source) {
  var keys = Object.keys(source);

  keys.forEach(function(key) {
    target[key] = target[key] || source[key];
  });

  return target;
}

function filterHebrew(str) {
  var re = /[\u0590-\u05FF]/g;
  return ((str || '').match(re) || []).join('');
}

function getNumericalValue(str, method) {
  var number = 0;
  var len = str.length;
  var i;
  for (i = 0; i < len; i++) {
    number += VALUES[method][str[i]];
  }
  return number;
}
