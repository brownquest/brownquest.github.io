//options varibles
var colors = ["url('dragonImages2/cursors/fist1.cur'), auto","url('dragonImages2/cursors/fist2.cur'), auto","url('dragonImages2/cursors/fist3.cur'), auto","url('dragonImages2/cursors/fist4.cur'), auto","url('dragonImages2/cursors/fist5.cur'), auto"]
var colors2 = ["url('dragonImages2/cursors/fist1.cur')","url('dragonImages2/cursors/fist2.cur')","url('dragonImages2/cursors/fist3.cur')","url('dragonImages2/cursors/fist4.cur')","url('dragonImages2/cursors/fist5.cur')"]
var myColor = colors[0]
var currentColor = 0;

//enemy variables
var images = [["dragonImages2/zone0/enemy1.png","dragonImages2/zone0/enemy2.png","","dragonImages2/zone0/boss.png"],
              ["dragonImages2/zone1/enemy1.png","dragonImages2/zone1/enemy2.png","dragonImages2/zone1/enemy3.png","dragonImages2/zone1/miniboss.png","dragonImages2/zone1/boss.png"],
              ["dragonImages2/zone2/enemy1.png","dragonImages2/zone2/enemy2.png","dragonImages2/zone2/miniboss.png","dragonImages2/zone2/boss.png"],
              ["dragonImages2/zone3/enemy1.png","dragonImages2/zone3/enemy2.png","dragonImages2/zone3/enemy3.png","dragonImages2/zone3/miniboss.png","dragonImages2/zone3/boss.png"]];
var currentEnemy = 0;
var currentHealth = 5;
var maxHealth = 5;

//zone variables
backgrounds = ["url('dragonImages2/backgrounds/corner.jpg')","url('dragonImages2/backgrounds/rotunda.jpg')","url('dragonImages2/backgrounds/brown.jpg')","url('dragonImages2/backgrounds/tunnels.png')"]
var freeplayOn = [false,false,false,false];
var progress = [0,0,0,0];
var currentZone = 0;

//currency variables
var gold = 0;
var xp = 0;

//level variables
var pCost = 5;
var hCost = 5;
var powerSave = 1;
var power = 1;
var mana = 1;
var pMaxHealth = 10;
var pCurrentHealth = 10;
var interval;
var tutorialProgress = 1;


//shop variables
var swordEquiped = [false,false,false,false];
var swordOwned = [false,false,false,false];
var swordMultipliers=[1.5,2,3,10]
var swordPrices = [100,500,2000,10000];
var shopItems = [["dragonImages2/icons/wSword.jpg","weapon w0"],["dragonImages2/icons/rSword.png","weapon w1"],["dragonImages2/icons/iSword.jpg","weapon w2"],["dragonImages2/icons/dSword.png","weapon w3"]]
var cursors = ["url('dragonImages2/cursors/woodenCursor.cur'), auto","url('dragonImages2/cursors/rootCursor.cur'), auto","url('dragonImages2/cursors/ironCursor.cur'), auto","url('dragonImages2/cursors/demonCursor.cur'), auto"]
var currentSword = -1;
var swordMultiplier = 1;

//helpers
function update() 
{
    document.getElementById("xp").innerHTML = "XP: " + xp;
    document.getElementById("gold").innerHTML = "Gold: " + gold;
    power = Math.round(powerSave*swordMultiplier);
    if(!interval)
    {
        pCurrentHealth = pMaxHealth;
    }
    document.getElementById("healthText").innerHTML = pCurrentHealth + "/" + pMaxHealth;
    var paras = document.getElementsByClassName('slashClass');

    while(paras[0]) {
        document.getElementById("slash").removeChild(paras[0]);
    }
}


closePopup.addEventListener("click", function () {
    myPopup.classList.remove("show");
});



var garbageBin;
window.onload = function ()
{
if (typeof(garbageBin) === 'undefined')
    {
    garbageBin = document.createElement('div');
    garbageBin.style.display = 'none';
    document.body.appendChild(garbageBin);
    }
    myPopup.classList.add("show");
    document.getElementById("pBox").innerHTML = "Click on the enemy to attack!";
}

function discardElement(element)
{
    garbageBin.appendChild(element);
    garbageBin.innerHTML = "";
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function roundIt(num)
{
    num = num.toFixed(2);
    return +num;
}

function updateProgress()
{
    if(currentZone == 0)//tutorial
    {
        for(var m=6; m<11; m++)
        {
            document.getElementById("skull" + m).style.display="none";
        }
        var i = 1;
        while(progress[currentZone] >= i)
        {
            if(i==5)
            {
                document.getElementById("skull" + i).src="dragonImages2/skulls/minibossComplete.png";
                i = i + 1;
            }
            else
            {
                document.getElementById("skull" + i).src="dragonImages2/skulls/skullComplete.png";
                i = i + 1;
            }
        }
        while(i<6)
        {
            if(i==5)
            {
                document.getElementById("skull" + i).src="dragonImages2/skulls/miniboss.png";
                i = i + 1;
            }
            else
            {
                document.getElementById("skull" + i).src="dragonImages2/skulls/skull.png";
                i = i + 1;
            }
        }
        if(freeplayOn[currentZone]==true)
        {
            document.getElementById("freeplay").src="dragonImages2/skulls/skullSelected.png";
            document.getElementById("freeplay").style.visibility="visible";
            document.getElementById("freeplaytext").style.visibility="visible";
            spawn(0,currentZone);
        }
        else
        {
            document.getElementById("freeplay").src="dragonImages2/skulls/skull.png";
            document.getElementById("freeplay").style.visibility="hidden";
            document.getElementById("freeplaytext").style.visibility="hidden";
            if(progress[currentZone]==4)
            {
                spawn(1,currentZone);
            }
            else
            {
                spawn(0,currentZone);
            }
        }
    }
    else //other levels
    {
        for(var m=6; m<11; m++)
            {
                document.getElementById("skull" + m).style.display="block";
            }
        var i = 1;
        while(progress[currentZone] >= i)
        {
            if(i==5)
            {
                document.getElementById("skull" + i).src="dragonImages2/skulls/minibossComplete.png";
                i = i + 1;
            }
            else if(i==10)
            {
                document.getElementById("skull" + i).src="dragonImages2/skulls/bossComplete.png";
                i = i + 1;

            }
            else
            {
                document.getElementById("skull" + i).src="dragonImages2/skulls/skullComplete.png";
                i = i + 1;
            }
        }
        while(i<11)
        {
            if(i==5)
            {
                document.getElementById("skull" + i).src="dragonImages2/skulls/miniboss.png";
                i = i + 1;
            }
            else if(i==10)
            {
                document.getElementById("skull" + i).src="dragonImages2/skulls/boss.png";
                i = i + 1;

            }
            else
            {
                document.getElementById("skull" + i).src="dragonImages2/skulls/skull.png";
                i = i + 1;
            }
        }
        if(freeplayOn[currentZone]==true)
        {
            document.getElementById("freeplay").src="dragonImages2/skulls/skullSelected.png";
            document.getElementById("freeplay").style.visibility="visible";
            document.getElementById("freeplaytext").style.visibility="visible";
            spawn(0,currentZone);
        }
        else if(progress[currentZone] > 4)
        {
            document.getElementById("freeplay").style.visibility="visible";
            document.getElementById("freeplaytext").style.visibility="visible";
            document.getElementById("freeplay").src="dragonImages2/skulls/skull.png";
            if(progress[currentZone]==4)
            {
                spawn(2,currentZone);
            }
            else if(progress[currentZone] == 9)
            {
                spawn(1,currentZone);
            }
            else
            {
                spawn(0,currentZone);
            }
        }
        else
        {
            document.getElementById("freeplay").src="dragonImages2/skulls/skull.png";
            document.getElementById("freeplay").style.visibility="hidden";
            document.getElementById("freeplaytext").style.visibility="hidden";
            if(progress[currentZone]==4)
            {
                spawn(2,currentZone);
            }
            else
            {
                spawn(0,currentZone);
            }
        }
    }
    
}



//left

function changeZone(num)
{
    if(num==1 && currentZone < backgrounds.length-1 || num==0 && currentZone > 0)
    {
        endDamage();
        if(num==0)
        {
            currentZone = currentZone - 1;
        }
        if(num==1)
        {
            currentZone = currentZone + 1;
        }
        document.getElementById("main").style.backgroundImage=backgrounds[currentZone];
        if(currentZone == 0)
        {
            document.getElementById("backButton").style.visibility="hidden";
            document.getElementById("forwardButton").style.visibility="visible";
        }
        else if(currentZone == backgrounds.length-1)
        {
            document.getElementById("backButton").style.visibility="visible";
            document.getElementById("forwardButton").style.visibility="hidden";
        }
        else if(progress[currentZone]==10)
        {
            document.getElementById("backButton").style.visibility="visible";
            document.getElementById("forwardButton").style.visibility="visible";
        }
        else
        {
            document.getElementById("backButton").style.visibility="visible";
            document.getElementById("forwardButton").style.visibility="hidden";
        }
        updateProgress();
        
    }

}




//middle

document.getElementById("enemy").onclick = function enemyClick()
{
    currentHealth = currentHealth - power;
    document.getElementById("bar").style.width = (currentHealth/maxHealth)*100 + "%";
    document.getElementById("enemyHealthText").innerHTML = currentHealth + "/" + maxHealth;
    if(currentHealth <=0)
    {
        enemyProgress(currentZone);
    }
    createSlash();   
}

function createSlash(){
    const img = document.createElement('img');
    img.src = "dragonImages2/slashes/playerSlash.png";
    img.className="slashClass";
    img.draggable="false";
    if(randint(1,3)==2)
    {
        img.style.transform="translate(-50%,-50%) scaleX(-1)";   
    }
    document.getElementById("slash").appendChild(img);
    
}

function spawnCoin(num)
{
    while(num>0)
    {
        if(num>=1000)
        {
            createDrop("dragonImages2/drops/diamond.png");
            num = num - 1000;
        }
        if(num>=100)
        {
            createDrop("dragonImages2/drops/ruby.png");
            num = num - 100;
        }
        {
            createDrop("dragonImages2/drops/coin1.png");
            num = num - 1;
        }
    }
}
function createDrop(source){
    var counter = 0;
    var xPos = 50;
    var yPos = 70;
    var isClear = 1;
    var ran = randint(10,91);
    const coinImg = document.createElement('img');
    coinImg.src = source;
    coinImg.className="coinClass";
    document.getElementById("slash").appendChild(coinImg);
    var coinInterval = setInterval(frame, 10);
    function frame() {
        var i = (ran-50)/40;
        if(counter < 100)
        {
            if(counter < 20)
            {
                yPos = yPos - 5/2;
                xPos = xPos + i;
                coinImg.style.left = xPos + "%";
                coinImg.style.top = yPos + "%";
            }
            else if (counter < 40)
            {
                yPos = yPos + 7/2;
                xPos = xPos + i;
                coinImg.style.left = xPos + "%";
                coinImg.style.top = yPos + "%";
            }
            else if (counter > 78)
            {
                coinImg.style.opacity = isClear;
                isClear = isClear - 1/20;
            }
            counter = counter + 1;
        }
        else
        {
            clearInterval(coinInterval);
            discardElement(coinImg);
        }        
    }
}


function enemyProgress(num) { 
    if(currentZone == 0) //tutorial
    {
        if(freeplayOn[num] == false)
        {   if(progress[num]==4)
            {
                document.getElementById("skull" + (progress[num]+1)).src="dragonImages2/skulls/minibossComplete.png";
                freeplayOn[num]=true;
                document.getElementById("freeplay").style.visibility="visible";
                document.getElementById("freeplaytext").style.visibility="visible";
                document.getElementById("freeplay").src="dragonImages2/skulls/skullSelected.png";
                document.getElementById("forwardButton").style.visibility="visible";
                endDamage();
                if(tutorialProgress == 2)
                {
                    myPopup.classList.add("show");
                    document.getElementById("pBox").innerHTML = "You defeated the boss! Open the menu labled \"Level Up\" to increase your stats!";
                    tutorialProgress += 1;
                }
            }
            else
            {
                document.getElementById("skull" + (progress[num]+1)).src="dragonImages2/skulls/skullComplete.png";
            }
            progress[num] = progress[num] + 1;
            
            if(progress[num]==4)
            {
                destroyEnemy(num);
                if(tutorialProgress == 1)
                {
                    myPopup.classList.add("show");
                    document.getElementById("pBox").innerHTML = "Defeat the boss before it kills you!";
                    tutorialProgress += 1;
                }
                spawn(1,num);
            }
            else
            {
                destroyEnemy(num);
                spawn(0,num);
            }
        }
        else if(freeplayOn[num] == true)
        {
            destroyEnemy(num);
            spawn(0,num);
        }
    }
    else //other levels
    {
        if(freeplayOn[num] == false)
        {   if(progress[num]==4)
            {
                document.getElementById("skull" + (progress[num]+1)).src="dragonImages2/skulls/minibossComplete.png";
                document.getElementById("freeplay").style.visibility="visible";
                document.getElementById("freeplaytext").style.visibility="visible";
            }
            else if(progress[num]==9)
            {
    
                document.getElementById("skull" + (progress[num]+1)).src="dragonImages2/skulls/bossComplete.png";
                freeplayOn[num]=true;
                document.getElementById("freeplay").src="dragonImages2/skulls/skullSelected.png";
                if(currentZone != backgrounds.length-1)
                {
                    document.getElementById("forwardButton").style.visibility="visible";
                }
                document.getElementById("backButton").style.visibility="visible";
                endDamage();
                if(currentZone==3)
                {
                    myPopup.classList.add("show");
                    document.getElementById("pBox2").innerHTML = "You win!";
                    document.getElementById("pBox").innerHTML = "";
                }
            }
            else
            {
                document.getElementById("skull" + (progress[num]+1)).src="dragonImages2/skulls/skullComplete.png";
            }
            progress[num] = progress[num] + 1;
            
            if(progress[num]==4)
            {
                destroyEnemy(num);
                spawn(2,num);
            }
            else if(progress[num] == 9)
            {
                destroyEnemy(num);
                spawn(1,num);
            }
            else
            {
                destroyEnemy(num);
                spawn(0,num);
            }
        }
        else if(freeplayOn[num] == true)
        {
            destroyEnemy(num);
            spawn(0,num);
        }
    }
    
}

function freeplay(num)
{
    var maxLevel;
    if(currentZone == 0)
    {
        maxLevel = 5;
    }
    else
    {
        maxLevel = 10;
    }
    if(progress[num]<maxLevel)
    {
        if(freeplayOn[num] == false)
        {
            freeplayOn[num] = true;
            endDamage();
            document.getElementById("freeplay").src="dragonImages2/skulls/skullSelected.png";
            spawn(0,num);
        }
        else
        {
            freeplayOn[num] = false;
            document.getElementById("freeplay").src="dragonImages2/skulls/skull.png";
            if(progress[num]==4)
            {
                spawn(2,num);
            }
            else if(progress[num] == 9)
            {
                spawn(1,num);
            }
            else
            {
                spawn(0,num);
            }
        }
    }
}



function destroyEnemy(num)
{
        const xpTable = [[1,1,0,10],[5,10,5,25,75],[20,35,125,500],[100,150,200,4000,10000]];
        const goldTable = [[1,1,0,10],[10,5,1,50,100],[35,20,200,1000],[150,100,500,5000,100000]];
        xp = xp + xpTable[num][currentEnemy];
        gold = gold + goldTable[num][currentEnemy];
        update();
        spawnCoin(goldTable[num][currentEnemy]);
        
        
}

function spawn(num,zone) {
        const health = [[5,6,1,15],[25,32,30,80,400],[100,120,300,500],[500,600,650,2500,12000]];
        if(num==0)//grunt
        {
            var ran = randint(0,images[zone].length-2);
            while(ran == currentEnemy)
            {
                ran = randint(0,images[zone].length-2);
            }
            document.getElementById("enemy").src = images[zone][ran];
            currentEnemy = ran;
            currentHealth = health[zone][ran];
            maxHealth = health[zone][ran];
            document.getElementById("bar").style.width = (currentHealth/maxHealth)*100 + "%";
            document.getElementById("enemyHealthText").innerHTML = currentHealth + "/" + maxHealth;
        }
        else if(num==2)//miniboss
        {
            i = images[zone].length-num;
            document.getElementById("enemy").src= images[zone][i];
            currentEnemy = i;
            currentHealth = health[zone][i];
            maxHealth = health[zone][i];
            document.getElementById("bar").style.width = (currentHealth/maxHealth)*100 + "%";
            document.getElementById("enemyHealthText").innerHTML = currentHealth + "/" + maxHealth;
        
        }
        else if(num==1)//boss
        {
            i = images[zone].length-num;
            document.getElementById("enemy").src= images[zone][i];
            currentEnemy = i;
            currentHealth = health[zone][i];
            maxHealth = health[zone][i];
            document.getElementById("bar").style.width = (currentHealth/maxHealth)*100 + "%";
            document.getElementById("enemyHealthText").innerHTML = currentHealth + "/" + maxHealth;
            interval = setInterval(damage,1000);
        }
}

function damage()
{
    var bossDamage = [1,1,10,4];
    pCurrentHealth = pCurrentHealth - bossDamage[currentZone];
    document.getElementById("health").style.width = (pCurrentHealth/pMaxHealth)*100 + "%";
    document.getElementById("healthText").innerHTML = pCurrentHealth + "/" + pMaxHealth;
    const img = document.createElement('img');
    img.src = "dragonImages2/slashes/enemySlash.png";
    img.className="slashClass";
    img.draggable="false";
    img.style.width="100%";
    img.style.top="50%";
    document.getElementById("slash").appendChild(img);
    if(pCurrentHealth<1)
    {
        myPopup.classList.add("show");
        document.getElementById("pBox2").innerHTML = "You died!";
        document.getElementById("pBox").innerHTML = "Try leveling up your power or health. You could also buy a new sword!";
        if(currentZone==0)
        {
            progress[currentZone] = 0;
        }
        else
        {
            progress[currentZone] = 5;
        }
        updateProgress();
        endDamage();
    }
}
function endDamage()
{
    clearInterval(interval);
    interval = null;
    pCurrentHealth = pMaxHealth;
    document.getElementById("health").style.width = (pCurrentHealth/pMaxHealth)*100 + "%";
    document.getElementById("healthText").innerHTML = pCurrentHealth + "/" + pMaxHealth;
}

//right

function shopClick()
{
    document.getElementById("skills").hidden=true;
    document.getElementById("shop").hidden=false;
    document.getElementById("shopImg").src = "dragonImages2/menus/shopSelected.png";
    document.getElementById("levelImg").src = "dragonImages2/menus/levelup.png";
    document.getElementById("options").hidden=true;
    document.getElementById("optionsImg").src = "dragonImages2/menus/options.png";
    document.getElementById("inventory").hidden=true;
    document.getElementById("inventoryImg").src = "dragonImages2/menus/Inventory.png";
}
function skillsClick()
{
    document.getElementById("shop").hidden=true;
    document.getElementById("skills").hidden=false;
    document.getElementById("levelImg").src = "dragonImages2/menus/levelupSelected.png";
    document.getElementById("shopImg").src = "dragonImages2/menus/shop.png";
    document.getElementById("options").hidden=true;
    document.getElementById("optionsImg").src = "dragonImages2/menus/options.png";
    document.getElementById("inventory").hidden=true;
    document.getElementById("inventoryImg").src = "dragonImages2/menus/Inventory.png";
    if(tutorialProgress == 3)
    {
        myPopup.classList.add("show");
        document.getElementById("pBox").innerHTML = "Click the icons to level up. Once you are done you can use the buttons in the bottom left corner to navigate between zones. Make sure to check out the shop and good luck on your quest!";
        tutorialProgress += 1;
    }
}
function optionsClick()
{
    document.getElementById("options").hidden=false;
    document.getElementById("optionsImg").src = "dragonImages2/menus/optionsSelected.png";
    document.getElementById("shop").hidden=true;
    document.getElementById("skills").hidden=true;
    document.getElementById("levelImg").src = "dragonImages2/menus/levelup.png";
    document.getElementById("shopImg").src = "dragonImages2/menus/shop.png";
    document.getElementById("inventory").hidden=true;
    document.getElementById("inventoryImg").src = "dragonImages2/menus/Inventory.png";
}
function inventoryClick()
{
    document.getElementById("options").hidden=true;
    document.getElementById("optionsImg").src = "dragonImages2/menus/options.png";
    document.getElementById("shop").hidden=true;
    document.getElementById("skills").hidden=true;
    document.getElementById("levelImg").src = "dragonImages2/menus/levelup.png";
    document.getElementById("shopImg").src = "dragonImages2/menus/shop.png";
    document.getElementById("inventory").hidden=false;
    document.getElementById("inventoryImg").src = "dragonImages2/menus/InventorySelected.png";
}

//levels

document.getElementById("power").onclick = function pClick()
{
    if(xp>=pCost)
    {
        powerSave += 1;
        xp = xp - pCost;
        update();
        document.getElementById("power2").innerHTML = "Power Level: " + powerSave;
        pCost = Math.round(pCost*1.5);
        document.getElementById("powerCost").innerHTML = "Power Cost: " + pCost + "xp";
    }
}
document.getElementById("healthIcon").onclick = function hClick()
{
    if(xp>=hCost)
    {
        pMaxHealth += 1;
        xp = xp - hCost;
        update();
        document.getElementById("health2").innerHTML = "Health Level: " + pMaxHealth;
        hCost = Math.round(hCost*1.5);
        document.getElementById("healthCost").innerHTML = "Health Cost: " + hCost + "xp";
    }
}

//shop



function swordPurchase(num)
{
    if(gold>=swordPrices[num] && swordOwned[num] == false)
    {
        if(tutorialProgress == 4)
        {
            myPopup.classList.add("show");
            document.getElementById("pBox").innerHTML = "Click on the treasure chest to open your inventory. Drag your new sword into your hand to equip it!";
            tutorialProgress += 1;
        }

        gold = gold - swordPrices[num];
        update();
        document.getElementById("swordPurchased" + num).parentNode.removeChild(document.getElementById("swordPurchased" + num));
        const p6 = document.createElement('p6');
        p6.innerHTML = "Owned";
        document.getElementById("shopItems").insertBefore(p6, document.getElementById("shopItems").childNodes[2+6*num]);
        
        swordOwned[num] = true;
        const img = document.createElement('img');
        img.src = shopItems[num][0];
        img.className=shopItems[num][1];
        img.draggable="true";
        img.style.width="100%";
        img.style.height="100%";
        img.ondragstart = function(ev){ev.dataTransfer.setData("text", ev.target.id);};
        img.addEventListener("drop", drop);
        var slotNum = 1;
        while(document.getElementById("invslot" + slotNum).hasChildNodes() && slotNum <= 12)
        {
            slotNum = slotNum + 1;
        }
        img.id="slot" + slotNum;
        document.getElementById("invslot" + slotNum).appendChild(img);
    }
}

function seClick(num)
{
    if (swordEquiped[num] == false)
    {
        if(currentSword > -1)
        {
            swordEquiped[currentSword] = false;
        }
        swordEquiped[num] = true;
        currentSword = num;
        swordMultiplier = swordMultipliers[num];
        document.getElementById("page").style.cursor=cursors[num];
        update();
    }
    else
    {
        swordEquiped[num] = false;
        currentSword = -1;
        swordMultiplier = 1;
        document.getElementById("page").style.cursor=myColor;
        update();
    }
}

function hovering(img)
{
    img.src="dragonImages2/purchaseHover.png"
}
function hoveringStop(img)
{
    img.src="dragonImages2/purchase.png"
}

//options

function changeColor()
{
    if (currentColor < colors.length-1)
    {
        currentColor = currentColor + 1;
        myColor = colors[currentColor];
        if(currentSword == -1)
        {
            document.getElementById("page").style.cursor=myColor;
        }
        document.getElementById("cursorButton").style.cursor=myColor;
        document.getElementById("equipslot4").style.backgroundImage = colors2[currentColor];
    }
    else
    {
        currentColor = 0;
        myColor = colors[currentColor];
        document.getElementById("page").style.cursor=myColor;
        document.getElementById("cursorButton").style.cursor=myColor;
        if(currentSword == -1)
        {
            document.getElementById("page").style.cursor=myColor;
        }
        document.getElementById("equipslot4").style.backgroundImage = colors2[currentColor];
    }
}


//inventory

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    ev.stopPropagation()
    container = document.getElementById(ev.target.id);
    if(!container.classList.contains("inventoryContainer"))
    {
        container = container.parentNode;
    }
    var data = ev.dataTransfer.getData("text");
   
    if(container.className == "inventoryContainer")
    {
        
        if(container.hasChildNodes())
        {
            if(container.firstChild.classList.contains("helmet") && data.substring(4)=="h" ||
            container.firstChild.classList.contains("chestplate") && data.substring(4)=="c"  ||
            container.firstChild.classList.contains("boots") && data.substring(4)=="b"  ||
            container.firstChild.classList.contains("weapon") && data.substring(4)=="w" ||
            data.substring(4)!= "h" && data.substring(4)!= "c" && data.substring(4)!= "b" && data.substring(4)!= "w")
            {
                if(data.substring(4)=="h")
                {
                
                }
                else if(data.substring(4)=="c")
                {

                }
                else if(data.substring(4)=="b")
                {

                }
                else if(data.substring(4)=="w")
                {
                    seClick(container.firstChild.className.substring(8));
                }
                container.appendChild(document.getElementById(data));
                document.getElementById("inv" + data).appendChild(container.firstChild);
                document.getElementById(data).id=data.substring(0,4) + document.getElementById(data).parentNode.id.substring(7);
                document.getElementById("inv" + data).lastChild.id=data;
            }
        }
        else
        {
            if(data.substr(4)=="h")
            {
                
            }
            else if(data.substr(4)=="c")
            {

            }
            else if(data.substr(4)=="b")
            {

            }
            else if(data.substr(4)=="w")
            {
                seClick(document.getElementById(data).className.substring(8));
            }
            container.appendChild(document.getElementById(data));
            document.getElementById(data).id=data.substring(0,4) + document.getElementById(data).parentNode.id.substring(7);
        }
       
    }
    else if(container.className == "inventoryContainer helmet" && document.getElementById(data).classList.contains("helmet") && container.id.substring(3)!=data||
    container.className == "inventoryContainer chestplate" && document.getElementById(data).classList.contains("chestplate") && container.id.substring(3)!=data||
    container.className == "inventoryContainer boots" && document.getElementById(data).classList.contains("boots") && container.id.substring(3)!=data||
    container.className == "inventoryContainer weapon" && document.getElementById(data).classList.contains("weapon")&& container.id.substring(3)!=data)
    {
        if(container.hasChildNodes())
        {
            if(container.className == "inventoryContainer helmet")
            {
                
            }
            else if(container.className == "inventoryContainer chestplate")
            {

            }
            else if(container.className == "inventoryContainer boots")
            {

            }
            else if(container.className == "inventoryContainer weapon")
            {
                seClick(document.getElementById(data).className.substring(8));
            }
            container.appendChild(document.getElementById(data));
            document.getElementById("inv" + data).appendChild(container.firstChild);
            document.getElementById(data).id=data.substr(0,4) + document.getElementById(data).parentNode.id.substr(7);
            document.getElementById("inv" + data).lastChild.id=data;
        }
        else
        {
            if(container.className == "inventoryContainer helmet")
            {
                
            }
            else if(container.className == "inventoryContainer chestplate")
            {

            }
            else if(container.className == "inventoryContainer boots")
            {

            }
            else if(container.className == "inventoryContainer weapon")
            {
                seClick(document.getElementById(data).className.substring(8));
            }
            container.appendChild(document.getElementById(data));
            document.getElementById(data).id=data.substr(0,4) + document.getElementById(data).parentNode.id.substr(7);
        }


    }
    
  }


