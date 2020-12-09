function add(num1,num2)
{
	return DecimalPrecision2.trunc(num1+num2,9);
}

function subtract(num1,num2)
{
	return DecimalPrecision2.trunc(num1-num2,9);
}

function multiply(num1,num2)
{
	return DecimalPrecision2.trunc(num1*num2,9);
}

function divide(num1,num2)
{
	return DecimalPrecision2.trunc(num1/num2,9);
}

function power(num1,num2)
{
	return Math.pow(num1,num2);
}

function factorial(num1)
{
	if(num1===1)
	{
		return 1;
	}

	return num1 * factorial(num1-1);
}

function operate(operator,num1,num2)
{
	num1 = parseFloat(num1);
	num2 = parseFloat(num2);

	console.log(operator);
	switch (operator){
		case "+":
			display["sequence"]=String(add(num1,num2));
			updateDisplay();
			display["operator"]="";
			display["isOperatorSet"]=false;
			break;
		case "-":
			display["sequence"]=String(subtract(num1,num2));
			updateDisplay();
			display["operator"]="";
			display["isOperatorSet"]=false;
			break;
		case "*":
			display["sequence"]=String(multiply(num1,num2));
			updateDisplay();
			display["operator"]="";
			display["isOperatorSet"]=false;
			break;
		case "/":
			display["sequence"]=String(divide(num1,num2));
			updateDisplay();
			display["operator"]="";
			display["isOperatorSet"]=false;
			break;
		case "!":
			display["sequence"]=String(factorial(num1));
			updateDisplay();
			display["operator"]="";
			display["isOperatorSet"]=false;
			break;
		case "^":
			display["sequence"]=String(power(num1,num2));
			updateDisplay();
			display["operator"]="";
			display["isOperatorSet"]=false;
			break;

	}

}

let display = {
	"sequence":"",
	"isOperatorSet":false,
	"operator":"",
	"operatorList":["+","-","*","/","^","!"],
	"num1":"",
	"num2":"",
	"num1decimalSet":false,
	"num2decimalSet":false,
	"digitLimit":false
};

function updateDisplay()
{
	let display_panel = document.querySelector("#display");
	display_panel.textContent = display["sequence"];
}

function clearSequence()
{
	display["sequence"] = "";
	display["isOperatorSet"]=false;
	display["operator"]="";
	display["num1"]="";
	display["num2"]="";
	display["num1decimalSet"]=false;
	display["num2decimalSet"]=false;

	updateDisplay();

}

function changePlusMinus()
{

	if(display["isOperatorSet"]==false)
	{
		if(display["sequence"][0] != '-')
		{
			display["sequence"] = '-' + display["sequence"];
			updateDisplay();
		}
		else
		{
			display["sequence"] = display["sequence"].substring(1);
			updateDisplay();
		}
	}
	else
	{

		let indexOfOperator = display["sequence"].substring(1).indexOf(display["operator"])+1;

		if(display["sequence"][indexOfOperator+1] != '-')
		{
		
			display["sequence"] = display["sequence"].substring(0, indexOfOperator+1) + '-' + display["sequence"].substring(indexOfOperator+1);
			updateDisplay();
		}
		else
		{
			display["sequence"] = display["sequence"].substring(0, indexOfOperator+1) + display["sequence"].substring(indexOfOperator+2);
			updateDisplay();
		}
	}	
}

var DecimalPrecision2 = (function() {
    if (Number.EPSILON === undefined) {
        Number.EPSILON = Math.pow(2, -52);
    }
    if (Math.trunc === undefined) {
        Math.trunc = function(v) {
            return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
    }
    var isRound = function(num, decimalPlaces) {
        //return decimalPlaces >= 0 &&
        //    +num.toFixed(decimalPlaces) === num;
        var p = Math.pow(10, decimalPlaces);
        return Math.round(num * p) / p === num;
    };
    var decimalAdjust = function(type, num, decimalPlaces) {
        if (isRound(num, decimalPlaces || 0))
            return num;
        var p = Math.pow(10, decimalPlaces || 0);
        var m = (num * p) * (1 + Number.EPSILON);
        return Math[type](m) / p;
    };
    return {
        // Decimal round (half away from zero)
        round: function(num, decimalPlaces) {
            return decimalAdjust('round', num, decimalPlaces);
        },
        // Decimal ceil
        ceil: function(num, decimalPlaces) {
            return decimalAdjust('ceil', num, decimalPlaces);
        },
        // Decimal floor
        floor: function(num, decimalPlaces) {
            return decimalAdjust('floor', num, decimalPlaces);
        },
        // Decimal trunc
        trunc: function(num, decimalPlaces) {
            return decimalAdjust('trunc', num, decimalPlaces);
        },
        // Format using fixed-point notation
        toFixed: function(num, decimalPlaces) {
            return decimalAdjust('round', num, decimalPlaces).toFixed(decimalPlaces);
        }
    };
})();

function storeNumbers()
{

	if(display["operator"]!= "!")
	{
		display["sequence"] += (this.getAttribute('value'));
		updateDisplay();
	}

}

function setErrorMessage(message)
{
	let error_console = document.querySelector("#error-console");
	error_console.textContent = "Err: " + message;
}

function clearErrorMessage()
{
	let error_console = document.querySelector("#error-console");
	error_console.textContent = "";
}

function setOperator()
{

	let display_panel = document.querySelector("#display");

	if(display["isOperatorSet"] == false)
	{
		display["isOperatorSet"] = true;
		display["operator"] = this.getAttribute('value');
		display["sequence"] += (this.getAttribute('value'));
		updateDisplay();
	}
	else
	{
		setErrorMessage("Too many operators");
	}
}

function evaluateFunction()
{

	let sequence = display["sequence"];
	let display_panel = document.querySelector("#display");

	if(display["operator"]=="!")
	{
		let indexOfOperator = sequence.indexOf(display["operator"]);
		display["num1"] = sequence.substr(0,indexOfOperator);

		if(display["num1"].includes("."))
		{
			setErrorMessage("Cannot add decimal when evaluating a factorial");
		}
		else if (parseFloat(display["num1"]) < 0)
		{
			setErrorMessage("Can't do factorial of a negative number");
		}
		else
		{
			operate(display["operator"],display["num1"]);
		}

	}

	else if(display["operator"] != "")
	{
		let indexOfOperator = sequence.indexOf(display["operator"]);
		display["num1"] = sequence.substr(0,indexOfOperator);
		display["num2"] = sequence.substr(indexOfOperator+1);
		operate(display["operator"],display["num1"],display["num2"]);
	}
}

function setDecimal()
{

	let display_panel = document.querySelector("#display");
	let error_console = document.querySelector("#error-console");

	if(display["operator"]=="" && display["num1decimalSet"]==false)
	{
		if(display["sequence"]=="")
		{
			display["sequence"] += "0"+(this.getAttribute('value'));
		}
		else
		{
			display["sequence"] += (this.getAttribute('value'));	
		}
		updateDisplay();
		display["num1decimalSet"]=true;
	}
	else if(display["operator"]=="!")
	{
		setErrorMessage("Cannot add decimal when evaluating a factorial");	
	}

	else if(display["operator"]!= "" && display["num2decimalSet"]==false)
	{
		display["sequence"] += (this.getAttribute('value'));
		updateDisplay();
		display["num2decimalSet"]=true;
	}
	else
	{
		setErrorMessage("Too many decimals");	
	}
}

function delete_button()
{

	let strLength = display["sequence"].length;

	if(display["operatorList"].indexOf(display["sequence"][strLength-1])>-1)
	{
		display["isOperatorSet"] = false;
		display["operator"] = "";
	}

	display["sequence"] = display["sequence"].substring(0,strLength-1);

	updateDisplay();
}

function theDomHasLoaded(e) {

	const buttons = document.querySelectorAll('.numbers');
	buttons.forEach(button => {
		button.addEventListener('click',storeNumbers);
		
	});

	const all = document.querySelectorAll('.all');
	all.forEach(element => {
		element.addEventListener('click',clearErrorMessage);
		
	});

	const operators = document.querySelectorAll('.operators');
	operators.forEach(operator => {
		operator.addEventListener('click',setOperator);
		
	});

	const decimal_btn = document.querySelector('#decimal');
	decimal_btn.addEventListener('click',setDecimal);

	const delete_btn = document.querySelector('#delete');
	delete_btn.addEventListener('click',delete_button);

	const clear = document.querySelector('#clear');
	clear.addEventListener('click',clearSequence);

	const equal = document.querySelector('#equal');
	equal.addEventListener('click',evaluateFunction);

	const plusminus = document.querySelector('#plusminus');
	plusminus.addEventListener('click',changePlusMinus);

}


document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);
