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
	var wages = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
	var sum = 0;
	for (var i = 0; i < 10; i++) {
		sum += parseInt(data[i]) * wages[i];
	}
	
	var result = Math.floor( (10 - (sum % 10)) % 10 );
	return "" + result;
}

PeselGenerator.prototype.generatePesel = function(birthDate, sex) {

	var pesel = this.getPeselDate(birthDate) + this.getAdditionalDigits(sex);

	pesel = pesel + this.getCheckSumDigit(pesel);
	return pesel;
}

PeselGenerator.prototype.isPeselCorrect = function(pesel) {

	var checksumDigit = this.getCheckSumDigit(pesel.substr(0,10));
	return checksumDigit === pesel.substr(10,1);
}

module.exports.PeselGenerator = PeselGenerator;
