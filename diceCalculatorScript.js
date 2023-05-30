var average = 0;
var roll = 0;
var justPress = 0;
var number1 = 0;
var number2 = 0;
var justNumber2 = 0;
var acAverage = 0;
var toHit = 0;
var ac = 0;
window.onload = dicePress(0);
window.onload = diceCalc();

function dicePress(input)
{
    if(justPress == 1)
    {
        number2 = number2*10+input;
        justNumber2 = 1;
        document.getElementById("dice").innerHTML = number1 + "d" + number2;
    }
    else if(input == "d")
    {
        justPress = 1;
        document.getElementById("dice").innerHTML = number1 + "d";
    }
    else
    {
        number1 = number1*10+input;
        document.getElementById("dice").innerHTML = number1;
    }
}

function diceCalc()
{
    if(justNumber2 == 1)
    {
        average = number1 * ((number2*(number2+1))/(2*number2));
        sum = 0;
        for(let i = 0; i < number1; i++)
        {
            sum += Math.floor(number2 * Math.random()) + 1
        }
        roll = sum;
        document.getElementById("average").innerHTML = average;
        document.getElementById("roll").innerHTML = roll;
    }
    if(number1 == 0)
    {
        average = 0;
        roll = 0;
        document.getElementById("average").innerHTML = average;
        document.getElementById("roll").innerHTML = roll;
    }

}

function diceClear()
{
    average = 0;
    roll = 0;
    justPress = 0;
    number1 = 0;
    number2 = 0;
    justNumber2 = 0;
    dicePress(0);
    diceCalc();
}

var slider = document.getElementById("myRange");
var output = document.getElementById("ac");
output.innerHTML = slider.value;

slider.oninput = function() {
  ac = this.value;
  output.innerHTML = ac;
  update();
}

var slider2 = document.getElementById("myRange2");
var output2 = document.getElementById("toHit");
output2.innerHTML = slider2.value;

slider2.oninput = function() {
  toHit = this.value;
  output2.innerHTML = toHit;
  update();
}

function update()
{
  acAverage = (1 - ((ac-1-toHit)/(20)));
  if(acAverage < 0)
  {
    acAverage = 0;
  }
  if (acAverage > 1)
  {
    acAverage = 1;
  }
  document.getElementById("toHit").innerHTML = toHit;
  document.getElementById("acAverage").innerHTML = acAverage*average;
}