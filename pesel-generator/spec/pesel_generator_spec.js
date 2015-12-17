'use strict';

var peselGenerator = require('../pesel_generator'); 

describe("Pesel generator tests", function() {

	describe("Pesel generator pesel date test:", function(){
		
		var generator = new peselGenerator.PeselGenerator();
		
		it("Get pesel date for 19xx", function() {
			var pesel = generator.generatePesel(new Date(Date.parse('1982-07-03')), 'M');
			expect(pesel.substr(0,6)).toEqual("820703");
		});
		
		it("Get pesel date for 18xx", function() {
			var date = new Date(Date.parse('1882-11-23'))
			
			var pesel = generator.generatePesel(date, 'M');
			
			expect(pesel.substr(0,6)).toEqual("829123");
		});
		
		it("Get pesel date for 20xx", function() {
			var date = new Date(Date.parse('2005-01-12'))
			
			var pesel = generator.generatePesel(date, 'M');
			
			expect(pesel.substr(0,6)).toEqual("052112");
		});
		
		it("Get pesel date for 21xx", function() {
			var date = new Date(Date.parse('2125-04-09'))
			
			var pesel = generator.generatePesel(date, 'M');
			
			expect(pesel.substr(0,6)).toEqual("254409");
		});
		
		it("Get pesel date for 22xx", function() {
			var date = new Date(Date.parse('2251-05-19'))
			
			var pesel = generator.generatePesel(date, 'M');
			
			expect(pesel.substr(0,6)).toEqual("516519");
		});

	});
	
	describe("Checking sex in pesel", function() {
		
		var generator = new peselGenerator.PeselGenerator();
		
		it("Check sex pesel digit for female", function() {
			var date = new Date(Date.parse('2251-05-19'))
			
			var pesel = generator.generatePesel(date, 'F');
			
			expect(pesel.substr(9,1) % 2).toEqual(0);
		});
		
		it("Check sex pesel digit for male", function() {
			var date = new Date(Date.parse('2251-05-19'))
			
			var pesel = generator.generatePesel(date, 'F');
			
			expect(pesel.substr(9,1) % 2).toEqual(0);
		});
		
	});
});