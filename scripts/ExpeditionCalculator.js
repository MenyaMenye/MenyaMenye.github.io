var prices = new Array(20);
var adventureLevel = 0;
var weaponLevel = 0;
var armorLevel = 0;
var survivalLevel = 0;
var totalLevel = 0;
var cost = [0, 0, 0, 0];
var totalCost = 0;
var expeditionTime = 20;
var gemMin = 0;
var gemMax = 0;
var relicMin = 1;
var relicMax = 2;
var keyMin = 0;
var keyMax = 0;

for(var i=0; i<document.getElementsByClassName("priceInput").length; i++) {
	document.getElementsByClassName("priceInput")[i].onchange = function () {calculate();};
}

for(var i=0; i<document.getElementsByClassName("buttonControl").length; i++) {
	giveFunction(document.getElementsByClassName("buttonControl")[i], i);
}

function giveFunction(elem, num) {
	elem.onclick = function () {
		if     (num==0) adventureLevel++;
		else if(num==1) adventureLevel--;
		else if(num==2) weaponLevel++;
		else if(num==3) weaponLevel--;
		else if(num==4) armorLevel++;
		else if(num==5) armorLevel--;
		else if(num==6) survivalLevel++;
		else if(num==7) survivalLevel--;
		calculate();
	};
}

function calculate() {
	for(var i=0; i<document.getElementsByClassName("priceInput").length; i++) {
		prices[i] = Number(document.getElementsByClassName("priceInput")[i].value);
		prices[i] = prices[i] < 0 || prices[i] == "" ? 0 : prices[i];
	}
	
	adventureLevel = adventureLevel < 0 ? 0 : adventureLevel;
	weaponLevel = weaponLevel < 0 ? 0 : weaponLevel;
	armorLevel = armorLevel < 0 ? 0 : armorLevel;
	survivalLevel = survivalLevel < 0 ? 0 : survivalLevel;
	
	weaponLevel = weaponLevel > adventureLevel ? adventureLevel : weaponLevel;
	armorLevel = armorLevel > adventureLevel ? adventureLevel : armorLevel;
	survivalLevel = survivalLevel > adventureLevel ? adventureLevel : survivalLevel;
	
	document.getElementsByClassName("expeditionLevel")[0].innerHTML = "Adventure Lv. "+adventureLevel;
	document.getElementsByClassName("expeditionLevel")[1].innerHTML = "Weapon Lv. "+weaponLevel;
	document.getElementsByClassName("expeditionLevel")[2].innerHTML = "Armor Lv. "+armorLevel;
	document.getElementsByClassName("expeditionLevel")[3].innerHTML = "Survival Lv. "+survivalLevel;
	totalLevel = adventureLevel + weaponLevel + armorLevel + survivalLevel;
	expeditionTime = 20;
	expeditionTime += adventureLevel*15 + weaponLevel*5 + armorLevel*5 + survivalLevel*5;
	gemMin = Math.floor(totalLevel/8);
	gemMax = adventureLevel;
	relicMin = 1 + weaponLevel*2 + survivalLevel;
	relicMax = 2 + adventureLevel + weaponLevel*4 + armorLevel*1 + survivalLevel;
	keyMin = Math.floor(armorLevel/3.5);
	keyMax = Math.floor(armorLevel/2.5); //is thsi even correct?
	document.getElementsByClassName("rewardsDiv")[0].innerHTML = "[Value : "+totalLevel+"] [Time : "+expeditionTime+" Minutes] [Gems : "+gemMin+"-"+gemMax+"] [Relics : "+relicMin+"-"+relicMax+"] [Keys : "+keyMin+"-"+keyMax+"]";
	
	cost[0] = 0;
	for(var i=1; i<=adventureLevel; i++) {
		cost[0] += i * 1000 * prices[0];
		if(i > 1) cost[0] += (i-1) * 950 * prices[1];
		if(i > 2) cost[0] += (i-2) * 900 * prices[2];
		if(i > 3) cost[0] += (i-3) * 750 * prices[3];
		if(i > 4) cost[0] += (i-4) * 500 * prices[4];
	}
	document.getElementsByClassName("cost value")[0].innerHTML = cost[0];
	
	cost[1] = 0;
	for(var i=1; i<=weaponLevel; i++) {
		cost[1] += i * 1000 * prices[5];
		if(i > 1) cost[1] += (i-1) * 950 * prices[6];
		if(i > 2) cost[1] += (i-2) * 900 * prices[7];
		if(i > 3) cost[1] += (i-3) * 750 * prices[8];
		if(i > 4) cost[1] += (i-4) * 500 * prices[9];
	}
	document.getElementsByClassName("cost value")[1].innerHTML = cost[1];
	
	cost[2] = 0;
	for(var i=1; i<=armorLevel; i++) {
		cost[2] += i * 1000 * prices[10];
		if(i > 1) cost[2] += (i-1) * 950 * prices[11];
		if(i > 2) cost[2] += (i-2) * 900 * prices[12];
		if(i > 3) cost[2] += (i-3) * 750 * prices[13];
		if(i > 4) cost[2] += (i-4) * 500 * prices[14];
	}
	document.getElementsByClassName("cost value")[2].innerHTML = cost[2];
	cost[3] = 0;
	for(var i=1; i<=survivalLevel; i++) {
		cost[3] += i * 1000 * prices[15];
		if(i > 1) cost[3] += (i-1) * 950 * prices[16];
		if(i > 2) cost[3] += (i-2) * 900 * prices[17];
		if(i > 3) cost[3] += (i-3) * 750 * prices[18];
		if(i > 4) cost[3] += (i-4) * 500 * prices[19];
	}
	document.getElementsByClassName("cost value")[3].innerHTML = cost[3];
	totalCost = 100000 + cost[0] + cost[1] + cost[2] + cost[3];
	document.getElementsByClassName("totalCost")[0].innerHTML = "Total cost : "+totalCost;
}




















