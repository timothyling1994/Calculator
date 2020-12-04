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

function theDomHasLoaded(e) {
	
}

document.addEventListener("DOMContentLoaded",theDomHasLoaded,false);
