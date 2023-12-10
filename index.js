//* There are explanatory notes throughout this file for how elements works. For example:

		//! Notes:
				//? [property]
				//* brief description / explanation.

// Starer data set:
var finances = [["Jan-2010", 867884],["Feb-2010", 984655],["Mar-2010", 322013],["Apr-2010", -69417],["May-2010", 310503],["Jun-2010", 522857],["Jul-2010", 1033096],["Aug-2010", 604885],["Sep-2010", -216386],["Oct-2010", 477532],["Nov-2010", 893810],["Dec-2010", -80353],["Jan-2011", 779806],["Feb-2011", -335203],["Mar-2011", 697845],["Apr-2011", 793163],["May-2011", 485070],["Jun-2011", 584122],["Jul-2011", 62729],["Aug-2011", 668179],["Sep-2011", 899906],["Oct-2011", 834719],["Nov-2011", 132003],["Dec-2011", 309978],["Jan-2012", -755566],["Feb-2012", 1170593],["Mar-2012", 252788],["Apr-2012", 1151518],["May-2012", 817256],["Jun-2012", 570757],["Jul-2012", 506702],["Aug-2012", -1022534],["Sep-2012", 475062],["Oct-2012", 779976],["Nov-2012", 144175],["Dec-2012", 542494],["Jan-2013", 359333],["Feb-2013", 321469],["Mar-2013", 67780],["Apr-2013", 471435],["May-2013", 565603],["Jun-2013", 872480],["Jul-2013", 789480],["Aug-2013", 999942],["Sep-2013", -1196225],["Oct-2013", 268997],["Nov-2013", -687986],["Dec-2013", 1150461],["Jan-2014", 682458],["Feb-2014", 617856],["Mar-2014", 824098],["Apr-2014", 581943],["May-2014", 132864],["Jun-2014", 448062],["Jul-2014", 689161],["Aug-2014", 800701],["Sep-2014", 1166643],["Oct-2014", 947333],["Nov-2014", 578668],["Dec-2014", 988505],["Jan-2015", 1139715],["Feb-2015", 1029471],["Mar-2015", 687533],["Apr-2015", -524626],["May-2015", 158620],["Jun-2015", 87795],["Jul-2015", 423389],["Aug-2015", 840723],["Sep-2015", 568529],["Oct-2015", 332067],["Nov-2015", 989499],["Dec-2015", 778237],["Jan-2016", 650000],["Feb-2016", -1100387],["Mar-2016", -174946],["Apr-2016", 757143],["May-2016", 445709],["Jun-2016", 712961],["Jul-2016", -1163797],["Aug-2016", 569899],["Sep-2016", 768450],["Oct-2016", 102685],["Nov-2016", 795914],["Dec-2016", 60988],["Jan-2017", 138230],["Feb-2017", 671099]];


//Initial variables:
var totalMonths = finances.length;
var totalProfitsLosses = 0;
var averageChange = 0;
var greatestIncrease = { date: "", amount: -Infinity };
var greatestDecrease = { date: "", amount: Infinity };

		//! Notes:
				//? [array-name].length
				//* This is a JavaScript property that returns the total number of items in the specified array.

				//? {thingy 1, thingy 2}
				//* This is called an object literal.

				//? thingy 1 (date) & thingy 2 (amount)
				//* These are 'keys' within the object literal.

				//? ""
				//* This is a placeholder empty string that will update to the month & year (e.g. Feb-2017) when the script runs.

				//? -Infinity / Infinity
				//* This is a JavaScript placeholder value that will update to the greatest increases/decreases when the script runs. Using 0 as the value instead could produce errors with numbers greater or less than 0. Positive & negative infinity avoids those potential errors.

// Number formatter:
const numberFormatter = new Intl.NumberFormat("en-GB", {
	style: "currency",
	currency: "GBP",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

		//! Notes:
				//? Intl.NumberFormat("en-GB" ...
				//* Anywhere 'numberFormatter.format' appears in the code below, this formats the number to add £ signs, commas and two decimal places. 

for (var i = 0; i < totalMonths; i++) {
	var currentDataPoint = finances[i];
	var previousDataPoint = i > 0 ? finances[i - 1] : null;

		//! Notes:
				//? for ...
				//* This is a 'for' loop that iterates through totalMonths (i.e. the 'finances' array).

				//? i 
				//* 'i' stands for "index" and is used to represent the iterator or counter in a loop. 

				//? i++
				//* This is shorthand for 'i = i + 1'. So the 'for' loop will continue as long as 'i' is less than totalMonths and increases 'i' by 1 in each iteration.

				//? finances[i]
				//* The square brackets are used to access 'i' in the finances array as the for loop iterates through it, so 'currentDataPoint' will be updated as it runs.

				//?  i > 0 ? finances[i - 1] : null;
				//* This is a ternary operator, i.e., a one-line if-else statement.
				//* If 'i' is greater than 0, then previousDataPoint = the previous value to 'i'. If false, it assigns 'null'.

				//? null
				//* This is a JavaScript property that represents the absence of any object or value, i.e., when a variable intentionally has no value / a condition is not met.
				//* If 'i' is not greater than 0, then previousDataPoint = null, i.e., there is no previous data point for the first iteration of the loop.

				//	 i = 0:	currentDataPoint: ["Jan-2010", 867884],	previousDataPoint: null (because i > 0 condition is not met)
				//	 i = 1: currentDataPoint: ["Feb-2010", 984655],	previousDataPoint: ["Jan-2010", 867884]
				//	 i = 2: currentDataPoint: ["Mar-2010", 322013],	previousDataPoint: ["Feb-2010", 984655] etc.

	totalProfitsLosses += currentDataPoint[1];
	
		//! Notes:
				//? +=
				//* This adds the left & right variables and updates left variable with the result, i.e. x += y results in x = x + y
				
	if (previousDataPoint) {
		var change = currentDataPoint[1] - previousDataPoint[1];
		averageChange += change;

		if (change > greatestIncrease.amount) {
			greatestIncrease.amount = change;
			greatestIncrease.date = currentDataPoint[0];
		}
		if (change < greatestDecrease.amount) {
			greatestDecrease.amount = change;
			greatestDecrease.date = currentDataPoint[0];
		}

		//! Notes:
				//? if 
				//* This is an 'if' statement that checks whether the condition in the parentheses is true ('truthy'). If the condition is true, the code inside the curly braces ({}) is executed; otherwise, it is skipped.

	}
}

averageChange /= totalMonths - 1;

		//! Notes:
				//? /= 
				//* This divides the left variable by the right variable and updates the left variable with the result, i.e. x /= y results in x = x / y

				//? - 1
				//* This divides by the intervals between all months, e.g. there are 12 months in a year, but 11 intervals between the months.

averageChange = numberFormatter.format(averageChange);

var years = Math.floor(totalMonths / 12);
var months = totalMonths % 12;

		//! Notes:
				//? Math.floor(x)
				//* This rounds down the number X to nearest whole number, so:

				//? Math.floor(totalMonths / 12);
				//* This divides totalMonths by 12 and rounds down to calculate the number of whole years.

				//? totalMonths % 12
				//* In JavaScript, the % symbol is called the "remainder" or "modulo" operator. This calculates the remainding months after extracting the whole years.


