'use strict';

var test = require('tape');
var Gematria = require('..');

var aleph = Gematria('א');
var resh = Gematria('ר');
var tzadiSofit = Gematria('ץ');
var eretz = Gematria('ץרא');

test('Gematria() removes all non-Hebrew input', function (t) {
  t.equal(Gematria().toMisparGadol(), 0, 'should return 0');
  t.equal(Gematria('foo').toMisparGadol(), 0, 'should return 0');
  t.equal(Gematria('"  @!#').toMisparGadol(), 0, 'should return 0');
  t.end();
});

test('Gematria#toMisparGadol', function (t) {
  t.equal(aleph.toMisparGadol(), 1, 'Alef should == 1');
  t.equal(resh.toMisparGadol(), 200, 'Resh should == 200');
  t.equal(tzadiSofit.toMisparGadol(), 900, 'Tzadi sofit should == 900');
  t.equal(eretz.toMisparGadol(), 1101, 'Eretz should == 1101');
  t.end();
});

test('Gematria#toMisparSiduri', function (t) {
  t.equal(aleph.toMisparSiduri(), 1, 'Alef as should == 1');
  t.equal(resh.toMisparSiduri(), 20, 'Resh as should == 20');
  t.equal(tzadiSofit.toMisparSiduri(), 18, 'Tzadi sofit should == 18');
  t.equal(eretz.toMisparSiduri(), 39, 'Eretz should == 39');
  t.end();
});

test('Gematria#toMisparHechrachi', function (t) {
  t.equal(aleph.toMisparHechrachi(), 1, 'Aleph should == 1');
  t.equal(resh.toMisparHechrachi(), 200, 'Resh should == 200');
  t.equal(tzadiSofit.toMisparHechrachi(), 90, 'Tzadi sofit should == 90');
  t.equal(eretz.toMisparHechrachi(), 291,'Eretz should == 291');
  t.end();
});

test('Gematria#toMisparHaPanim', function (t) {
  t.equal(aleph.toMisparHaPanim(), 1, 'Alef should == 1');
  t.equal(resh.toMisparHaPanim(), 200, 'Resh should == 200');
  t.equal(tzadiSofit.toMisparHaPanim(), 90, 'Tzadi sofit should == 90');
  t.equal(eretz.toMisparHaPanim(), 291, 'Eretz should == 291');
  t.end();
});
