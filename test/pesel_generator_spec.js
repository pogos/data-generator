'use strict';

var peselGenerator = require('../lib/pesel_generator'); 

describe("Pesel generator tests: ", function() {
	
	var generator = new peselGenerator.PeselGenerator();
	
	var correctPesels = ["80010715437", "80040308425", "73090311121", "98812001742", "01320615886", "13262318521", "24311110302", "27520712480", "33661916058"];
	var inCorrectPesels = ["80010715433", "80040308424", "73090311120", "98812001741", "01320615888", "13262318520", "24311110305", "27520712486", "33661916057"];
	
	describe("Basics tests for pesel: ", function() {
		
		it("Pesel should have eleven characters", function() {
			var date = new Date(Date.parse('1882-11-23'));
			
			var pesel = generator.generatePesel(date, 'M');
			
			expect(pesel.length).toEqual(11)
		});
		
		it("Pesel should contain only digits", function() {
			var date = new Date(Date.parse('1882-11-23'));
			
			var pesel = generator.generatePesel(date, 'M');
			
			expect(pesel).not.toMatch(/\D/);
		});
		
	});

	describe("Pesel generator pesel date test: ", function(){
		
		
		it("Get pesel date for 19xx", function() {
			var pesel = generator.generatePesel(new Date(Date.parse('1982-07-03')), 'M');
			expect(pesel.substr(0,6)).toEqual("820703");
		});
		
		it("Get pesel date for 18xx", function() {
			var date = new Date(Date.parse('1882-11-23'));
			
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
	
	describe("Checking sex in pesel: ", function() {		
		
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
	
	describe("Checking sum control", function() {		
		
		it("Check sum control", function() {
			
			for (var i = 0, len = correctPesels.length; i < len; i++) {

				var peselCheckSum = generator.getCheckSumDigit(correctPesels[i].substr(0,10));
				
				expect(peselCheckSum).toEqual(correctPesels[i].substr(10,1));
			}
			
		});
	});
	
	describe("Verify pesel", function() {
		
		it("Verify correct pesels", function() {
			for (var i = 0, len = correctPesels.length; i < len; i++) {

				var isCorrect = generator.isPeselCorrect(correctPesels[i]);
				
				expect(isCorrect).toEqual(true);
			}
		}); 
		
		it("Verify incorrect pesels", function() {
			for (var i = 0, len = inCorrectPesels.length; i < len; i++) {

				var isCorrect = generator.isPeselCorrect(inCorrectPesels[i]);
				
				expect(isCorrect).toEqual(false);
			}
		});
		
	});
});