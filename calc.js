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

	switch (operator){
		case "add":
			add(num1,num2);
			break;
		case "subtract":
			subtract(num1,num2);
			break;
		case "multiply":
			multiply(num1,num2)
			break;
		case "divide":
			divide(num1,num2);
			break;

	}

}

let display = {
	"sequence":"",
	"operatorlimit":false,
	"operator":"",
	"operatorList":["+","-","*","/","^","!"],
};

function deleteSequence()
{
	display["sequence"] = "";
	let display_panel = document.querySelector("#display");
	display_panel.textContent = "";
}

function storeNumbers()
{
	let classList = this.getAttribute('class');
	if(display["operatorlimit"]==false)
	{
		display["sequence"] += (this.getAttribute('value'));
		let display_panel = document.querySelector("#display");
		display_panel.textContent = display["sequence"];
	}
	else
	{
		display_panel.textContent = "TOO MANY OPERATORS BRUH";
	}

}

function changeOperatorBool()
{
	display["operatorlimit"] = true;
	display["operator"] = this.getAttribute('value');
}

function chooseOperator()
{
	let sequence = display["sequence"];
	let index = sequence.indexOf();
}

function theDomHasLoaded(e) {

	const buttons = document.querySelectorAll('.buttons');
	buttons.forEach(button => {
		button.addEventListener('click',storeNumbers);
		
	});

	const operators = document.querySelectorAll('.operators');
	operators.forEach(operator => {
		operator.addEventListener('click',changeOperatorBool);
		
	});

	const clear = document.querySelector('#clear');
	clear.addEventListener('click',deleteSequence);

	const equal = document.querySelector('#equal');
	equal.addEventListener('click',chooseOperator);

}


document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);
