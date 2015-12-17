'use strict';

function PeselGenerator() { }

PeselGenerator.prototype.getYear = function(year) {
	return this.fillMissingZeros('' + year % 100, 2);
}

PeselGenerator.prototype.fillMissingZeros = function(text, correctLength) {
	var additionZeros = '';
	if (text.length < correctLength) {
		for (var i = 0; i < (correctLength - text.length); i++ ) {
			additionZeros += '0';
		}
	}
	return additionZeros + text;
}

PeselGenerator.prototype.getMonth = function(year, month) {
	var decade = Math.floor(year / 100);
	var additionMonths = 0;
	switch(decade) {
		case 18: 
			additionMonths = 80;
			break;
		case 20: 
			additionMonths = 20;
			break;
		case 21: 
			additionMonths = 40;
			break;
		case 22: 
			additionMonths = 60;
			break;
	}

	return this.fillMissingZeros('' + (month + additionMonths), 2);
}

PeselGenerator.prototype.getDay = function(day) {
	return this.fillMissingZeros('' + day, 2);
}

PeselGenerator.prototype.getAdditionalDigits = function(sex) {
	var sexMod = 0;
	var result = '';
	if (sex == 'm') {
		sexMod = 1;
	}
	for (var i = 0; i < 3; i++) {
		result += Math.floor(Math.random() * 10);
	}
	//add number with sex
	result += Math.floor(Math.random() * 5) * 2 - sexMod;
	return result;
}

PeselGenerator.prototype.getPeselDate = function(birthDate) {
	var originalYear = birthDate.getFullYear();
	var originalMonth = birthDate.getMonth() + 1;
	var originalDay = birthDate.getDate();
	
	return '' + this.getYear(originalYear) + this.getMonth(originalYear, originalMonth) + this.getDay(originalDay);
}

PeselGenerator.prototype.getCheckSumDigit = function(data) {
	return "0";
}

PeselGenerator.prototype.generatePesel = function(birthDate, sex) {

	var pesel = this.getPeselDate(birthDate) + this.getAdditionalDigits(sex);

	pesel = pesel + this.getCheckSumDigit(pesel);
	return pesel;
}

//var generator = new PeselGenerator();

//var pesel = generator.generatePesel(new Date(Date.parse('1982-07-03')), 'M');

//console.log('Pesel: ' + pesel);

module.exports.PeselGenerator = PeselGenerator;
