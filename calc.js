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
	"sequence":[],
};

function deleteSequence()
{
	display["sequence"] = [];
}

function storeNumbers()
{
	display["sequence"].push(this.getAttribute('value'));

	let display_panel = document.querySelector("#display");
	display_panel.textContent = display["sequence"];

}

function chooseOperator()
{
	
}

function theDomHasLoaded(e) {
	const buttons = document.querySelectorAll('.buttons');
	buttons.forEach(button => {
		button.addEventListener('click',storeNumbers);
		
	});

	const clear = document.querySelector('#clear');
	clear.addEventListener('click',deleteSequence);

	const equal = document.querySelector('#equal');
	equal.addEventListener('click',chooseOperator);
}


document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);
