'use strict';

var nipGenerator = require('../nip_generator');

var generator = new nipGenerator.NipGenerator();

describe("Nip generator tests: ", function() {

  describe("Basic tests for NIP: ", function() {
    
    it("Nip should have ten characters", function() {
    
      var nip = generator.generateNip();
      
      expect(nip.length).toEqual(10);
    });
  });

});

