function add(num1,num2)
{
	return num1+num2;
}

function subtract(num1,num2)
{
	return num1-num2;
}

function multiply(num1,num2)
{
	return num1*num2;
}

function divide(num1,num2)
{
	return num1/num2;
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

function operate(num1,num2,operator)
{
	num1 = parseFloat(num1);
	num2 = parseFloat(num2);

	console.log(operator);
	switch (operator){
		case "+":
			display["sequence"]=String(add(num1,num2));
			updateDisplay();
			display["operator"]="";
			display["operatorlimit"]=false;
			break;
		case "-":
			display["sequence"]=String(subtract(num1,num2));
			updateDisplay();
			display["operator"]="";
			display["operatorlimit"]=false;
			break;
		case "*":
			display["sequence"]=String(multiply(num1,num2));
			updateDisplay();
			display["operator"]="";
			display["operatorlimit"]=false;
			break;
		case "/":
			display["sequence"]=String(divide(num1,num2));
			updateDisplay();
			display["operator"]="";
			display["operatorlimit"]=false;
			break;
		case "^":
			display["sequence"]=String(power(num1,num2));
			updateDisplay();
			display["operator"]="";
			display["operatorlimit"]=false;
			break;

	}

}

let display = {
	"sequence":"",
	"operatorlimit":false,
	"operator":"",
	"operatorList":["+","-","*","/","^","!"],
	"num1":"",
	"num2":"",
};

function updateDisplay()
{
	let display_panel = document.querySelector("#display");
	display_panel.textContent = display["sequence"];
}

function clearSequence()
{
	display["sequence"] = "";
	updateDisplay();
	display["operatorlimit"]=false;
	display["operator"]="";
}

function storeNumbers()
{
	let classList = this.getAttribute('class');
	let display_panel = document.querySelector("#display");

	if(classList.includes('operator') && display["operatorlimit"]==true)
	{
		display_panel.textContent = "TOO MANY OPERATORS BRUH";
	}
	else
	{
		display["sequence"] += (this.getAttribute('value'));
		updateDisplay();
	}

}

function setOperator()
{
	if(display["operatorlimit"] == false)
	{
		display["operatorlimit"] = true;
		display["operator"] = this.getAttribute('value');
	}
}

function evaluateFunction()
{
	let sequence = display["sequence"];
	//let indexOfOperator = sequence.indexOf(display["operator"]);
	//if(indexOfOperator>-1)
	if(display["operator"] != "")
	{
		let indexOfOperator = sequence.indexOf(display["operator"]);
		display["num1"] = sequence.substr(0,indexOfOperator);
		display["num2"] = sequence.substr(indexOfOperator+1);
		operate(display["num1"],display["num2"] ,display["operator"]);
	}
}

function delete_button()
{
	let strLength = display["sequence"].length;

	if(display["operatorList"].indexOf(display["sequence"][strLength-1])>-1)
	{
		display["operatorlimit"] = false;
		display["operator"] = "";
	}

	display["sequence"] = display["sequence"].substring(0,strLength-1);

	updateDisplay();
}

function theDomHasLoaded(e) {

	const buttons = document.querySelectorAll('.buttons');
	buttons.forEach(button => {
		button.addEventListener('click',storeNumbers);
		
	});

	const operators = document.querySelectorAll('.operators');
	operators.forEach(operator => {
		operator.addEventListener('click',setOperator);
		
	});

	const delete_btn = document.querySelector('#delete');
	delete_btn.addEventListener('click',delete_button);

	const clear = document.querySelector('#clear');
	clear.addEventListener('click',clearSequence);

	const equal = document.querySelector('#equal');
	equal.addEventListener('click',evaluateFunction);

}


document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);
