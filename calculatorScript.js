var num1 = 0;
var num2 = 0;
var operation = "";
var justCalc = 0;
var justSecond = 0;
window.onload = buttonPress(0);
function buttonPress(input)
{
    if(input == "+" || input == "-" || input == "*" || input == "/")
    {
        operation = input;
        document.getElementById("calc").innerHTML = num1 + " " + operation;
    }
    else if (operation == "")
    {
        if(justCalc == 1)
        {
            num1 = 0;
            justCalc = 0;
        }
        num1 = num1*10 + input;
        document.getElementById("calc").innerHTML = num1;
    }
    else
    {
        num2 = num2*10 + input;
        justSecond = 1;
        document.getElementById("calc").innerHTML = num1 + " " + operation + " " + num2;
    }
}

function calculate()
{   if(justSecond == 1)
    {
        if(operation == "+")
        {
            num1 = num1 + num2;
        }
    else if(operation == "-")
        {
            num1 = num1 - num2;
        }
    else if(operation == "*")
        {
            num1 = num1 * num2;
        }
    else if(operation == '/')
        {
            num1 = num1 / num2;
        }
        operation = "";
    }
    
    
    num2 = 0;
    document.getElementById("calc").innerHTML = num1 + " " + operation;
    justCalc = 1;
}

function clearIt()
{
    num1 = 0;
    num2 = 0;
    operation = "";
    justCalc = 0;
    justSecond = 0;
    document.getElementById("calc").innerHTML = num1;
}


