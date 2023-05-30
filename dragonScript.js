var counter = 0;
var cps = 0;
var power = 1;

window.onload = document.getElementById("counter").innerHTML = counter;


document.getElementById("dragon").onclick = function dClick() 
{
    counter+=power;
    setDragonCount(counter);
}
document.getElementById("mouse").onclick = function moClick()
{
    if(counter>=40)
    {
        cps += 0.1;
        counter -= 40;
        setDragonCount(counter);
        addImage(1)
    }
}
document.getElementById("knight").onclick = function kClick()
{
    if(counter>=200)
    {
        cps += 1;
        counter -= 200;
        setDragonCount(counter);
        addImage(2)
    }
}
document.getElementById("fighter").onclick = function fClick()
{
    if(counter>=1500)
    {
        cps += 10;
        counter -= 1500;
        setDragonCount(counter);
        addImage(3)
    }
}
document.getElementById("meteor").onclick = function mClick()
{
    if(counter>=100000)
    {
        cps += 1000;
        counter -= 100000;
        setDragonCount(counter);
        addImage(4)
    }
}

document.getElementById("sword").onclick = function sClick()
{
    if(counter>=500)
    {
        power += 1;
        counter -= 500;
        setDragonCount(counter);
        addImage(0);
    }
}

function add()
{
    counter += cps/10;
    setDragonCount(counter);
    if(counter > 999999999)
    {
        document.getElementById("dragon").src="dragonImages/explode.jpg";
    }
}

function setDragonCount(count) {
    count = Math.round(count*10)/10;
    document.getElementById("counter").innerHTML = count;
}

function addImage(number) {
        images = ["dragonImages/sword.jpg","dragonImages/mouse.jpg","dragonImages/knight.jpg","dragonImages/dragonFighter.jpg","dragonImages/meteor.jpg"]
        const img = document.createElement('img');
        img.src = images[number];
        img.width = 20;
        img.height = 20;
        img.style.position = "absolute";
        img.style.top = randint(5,95)+"%";
        img.style.left = randint(5,95)+"%";
        document.getElementById("container").appendChild(img);
        
}
    
function randint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



window.setInterval("add()",100);

