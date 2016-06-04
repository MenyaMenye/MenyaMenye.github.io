var prices = new Array(20);
var adventureLevel = 0;
var weaponLevel = 0;
var armorLevel = 0;
var survivalLevel = 0;
var totalLevel = 0;
var cost = [0, 0, 0, 0];
var totalCost = 100000;
var resCost = new Array(20);
var expeditionTime = 20;
var gemMin = 0;
var gemMax = 0;
var relicMin = 1;
var relicMax = 2;
var keyMin = 0;
var keyMax = 0;
var gemPrice = 0;
var relicPrice = 0;

if(typeof Storage == undefined) assignDefaultPrices();
else assignPricesFromStorage();

for(var i=0; i<resCost.length; i++) {
	resCost[i] = 0;
}

for(var i=0; i<document.getElementsByClassName("cost res").length; i++) {
	if(i<5) {
		document.getElementsByClassName("cost res")[i].innerHTML = "T"+(i+1)+" : "+resCost[i]+" x "+prices[i]+" = "+resCost[i]*prices[i];
	}
	else if(i<10) {
		document.getElementsByClassName("cost res")[i].innerHTML = "T"+(i+1-5)+" : "+resCost[i]+" x "+prices[i]+" = "+resCost[i]*prices[i];
	}
	else if(i<15) {
		document.getElementsByClassName("cost res")[i].innerHTML = "T"+(i+1-10)+" : "+resCost[i]+" x "+prices[i]+" = "+resCost[i]*prices[i];
	}
	else if(i<20) {
		document.getElementsByClassName("cost res")[i].innerHTML = "T"+(i+1-15)+" : "+resCost[i]+" x "+prices[i]+" = "+resCost[i]*prices[i];
	}
}

document.getElementsByClassName("profitText")[0].innerHTML = "Min : "+gemMin+" x "+gemPrice+" = "+gemMin*gemPrice;
document.getElementsByClassName("profitText")[1].innerHTML = "Max : "+gemMax+" x "+gemPrice+" = "+gemMax*gemPrice;
document.getElementsByClassName("profitText")[2].innerHTML = "Avg : "+(gemMin*gemPrice + gemMax*gemPrice) / 2;
document.getElementsByClassName("profitText")[3].innerHTML = "Min : "+relicMin+" x "+relicPrice+" = "+relicMin*relicPrice;
document.getElementsByClassName("profitText")[4].innerHTML = "Max : "+relicMax+" x "+relicPrice+" = "+relicMax*relicPrice;
document.getElementsByClassName("profitText")[5].innerHTML = "Avg : "+(relicMin*relicPrice + relicMax*relicPrice) / 2;
document.getElementsByClassName("profitText")[6].innerHTML = "Min : "+(gemMin*gemPrice + relicMin*relicPrice - totalCost);
document.getElementsByClassName("profitText")[7].innerHTML = "Max : "+(gemMax*gemPrice + relicMax*relicPrice - totalCost);
document.getElementsByClassName("profitText")[8].innerHTML = "Avg : "+((gemMin*gemPrice + relicMin*relicPrice - totalCost)+(gemMax*gemPrice + relicMax*relicPrice - totalCost))/2;

for(var i=0; i<document.getElementsByClassName("priceInput").length; i++) {
	document.getElementsByClassName("priceInput")[i].onchange = function () {
		calculate();
		updateLocalStorage();
	};
}

for(var i=0; i<document.getElementsByClassName("gemRelicPriceTextarea").length; i++) {
	document.getElementsByClassName("gemRelicPriceTextarea")[i].onchange = function () {
		calculate();
		updateLocalStorage();
	};
}

for(var i=0; i<document.getElementsByClassName("buttonControl").length; i++) {
	giveFunction(document.getElementsByClassName("buttonControl")[i], i);
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
	gemMax = Math.ceil(totalLevel/4);
	relicMin = 1 + Math.floor(totalLevel/2) + weaponLevel;
	relicMax = 2 + adventureLevel + weaponLevel*4 + armorLevel + survivalLevel;
	keyMin = Math.floor(armorLevel/3.5);
	keyMax = Math.floor((totalLevel/9+armorLevel/3)/2);
	
	document.getElementsByClassName("rewardsDiv")[0].innerHTML = "[Value : "+totalLevel+"] [Time : "+expeditionTime+" Minutes] [Gems : "+gemMin+"-"+gemMax+"] [Relics : "+relicMin+"-"+relicMax+"] [Keys : "+keyMin+"-"+keyMax+"]";
	
	for(var i=0; i<resCost.length; i++) {
		resCost[i] = 0;
	}
	for(var i=0; i<cost.length; i++) {
		cost[i] = 0;
	}
	for(var i=1; i<=adventureLevel; i++) {
		cost[0] += i * 1000 * prices[0];
		resCost[0] += i * 1000;
		if(i > 1) {
			cost[0] += (i-1) * 950 * prices[1];
			resCost[1] += (i-1) * 950;
		}
		if(i > 2) {
			cost[0] += (i-2) * 900 * prices[2];
			resCost[2] += (i-2) * 900;
		}
		if(i > 3) {
			cost[0] += (i-3) * 750 * prices[3];
			resCost[3] += (i-3) * 750;
		}
		if(i > 4) {
			cost[0] += (i-4) * 500 * prices[4];
			resCost[4] += (i-4) * 500;
		}
	}
	document.getElementsByClassName("cost value")[0].innerHTML = cost[0];
	for(var i=1; i<=weaponLevel; i++) {
		cost[1] += i * 1000 * prices[0+5];
		resCost[0+5] += i * 1000;
		if(i > 1) {
			cost[1] += (i-1) * 950 * prices[1+5];
			resCost[1+5] += (i-1) * 950;
		}
		if(i > 2) {
			cost[1] += (i-2) * 900 * prices[2+5];
			resCost[2+5] += (i-2) * 900;
		}
		if(i > 3) {
			cost[1] += (i-3) * 750 * prices[3+5];
			resCost[3+5] += (i-3) * 750;
		}
		if(i > 4) {
			cost[1] += (i-4) * 500 * prices[4+5];
			resCost[4+5] += (i-4) * 500;
		}
	}
	document.getElementsByClassName("cost value")[1].innerHTML = cost[1];
	for(var i=1; i<=armorLevel; i++) {
		cost[2] += i * 1000 * prices[0+10];
		resCost[0+10] += i * 1000;
		if(i > 1) {
			cost[2] += (i-1) * 950 * prices[1+10];
			resCost[1+10] += (i-1) * 950;
		}
		if(i > 2) {
			cost[2] += (i-2) * 900 * prices[2+10];
			resCost[2+10] += (i-2) * 900;
		}
		if(i > 3) {
			cost[2] += (i-3) * 750 * prices[3+10];
			resCost[3+10] += (i-3) * 750;
		}
		if(i > 4) {
			cost[2] += (i-4) * 500 * prices[4+10];
			resCost[4+10] += (i-4) * 500;
		}
	}
	document.getElementsByClassName("cost value")[2].innerHTML = cost[2];
	for(var i=1; i<=survivalLevel; i++) {
		cost[3] += i * 1000 * prices[0+15];
		resCost[0+15] += i * 1000;
		if(i > 1) {
			cost[3] += (i-1) * 950 * prices[1+15];
			resCost[1+15] += (i-1) * 950;
		}
		if(i > 2) {
			cost[3] += (i-2) * 900 * prices[2+15];
			resCost[2+15] += (i-2) * 900;
		}
		if(i > 3) {
			cost[3] += (i-3) * 750 * prices[3+15];
			resCost[3+15] += (i-3) * 750;
		}
		if(i > 4) {
			cost[3] += (i-4) * 500 * prices[4+15];
			resCost[4+15] += (i-4) * 500;
		}
	}
	document.getElementsByClassName("cost value")[3].innerHTML = cost[3];
	for(var i=0; i<document.getElementsByClassName("cost res").length; i++) {
		if(i<5) {
			document.getElementsByClassName("cost res")[i].innerHTML = "T"+(i+1)+" : "+resCost[i]+" x "+prices[i]+" = "+resCost[i]*prices[i];
		}
		else if(i<10) {
			document.getElementsByClassName("cost res")[i].innerHTML = "T"+(i+1-5)+" : "+resCost[i]+" x "+prices[i]+" = "+resCost[i]*prices[i];
		}
		else if(i<15) {
			document.getElementsByClassName("cost res")[i].innerHTML = "T"+(i+1-10)+" : "+resCost[i]+" x "+prices[i]+" = "+resCost[i]*prices[i];
		}
		else if(i<20) {
			document.getElementsByClassName("cost res")[i].innerHTML = "T"+(i+1-15)+" : "+resCost[i]+" x "+prices[i]+" = "+resCost[i]*prices[i];
		}
	}
	totalCost = 100000 + cost[0] + cost[1] + cost[2] + cost[3];
	document.getElementsByClassName("totalCost")[0].innerHTML = "Total cost : "+totalCost;
	
	document.getElementsByClassName("profitText")[0].innerHTML = "Min : "+gemMin+" x "+gemPrice+" = "+gemMin*gemPrice;
	document.getElementsByClassName("profitText")[1].innerHTML = "Max : "+gemMax+" x "+gemPrice+" = "+gemMax*gemPrice;
	document.getElementsByClassName("profitText")[2].innerHTML = "Avg : "+(gemMin*gemPrice + gemMax*gemPrice) / 2;
	document.getElementsByClassName("profitText")[3].innerHTML = "Min : "+relicMin+" x "+relicPrice+" = "+relicMin*relicPrice;
	document.getElementsByClassName("profitText")[4].innerHTML = "Max : "+relicMax+" x "+relicPrice+" = "+relicMax*relicPrice;
	document.getElementsByClassName("profitText")[5].innerHTML = "Avg : "+(relicMin*relicPrice + relicMax*relicPrice) / 2;
	document.getElementsByClassName("profitText")[6].innerHTML = "Min : "+(gemMin*gemPrice + relicMin*relicPrice - totalCost);
	document.getElementsByClassName("profitText")[7].innerHTML = "Max : "+(gemMax*gemPrice + relicMax*relicPrice - totalCost);
	document.getElementsByClassName("profitText")[8].innerHTML = "Avg : "+((gemMin*gemPrice + relicMin*relicPrice - totalCost)+(gemMax*gemPrice + relicMax*relicPrice - totalCost))/2;
}

function assignDefaultPrices() {
	for(var i=0; i<document.getElementsByClassName("priceInput").length; i++) {
		if(i==0 || i==5 || i==10 || i==15) {
			document.getElementsByClassName("priceInput")[i].value = 50;
			prices[i] = Number(document.getElementsByClassName("priceInput")[i].value);
		}
		else if(i==0+1 || i==5+1 || i==10+1 || i==15+1) {
			document.getElementsByClassName("priceInput")[i].value = 100;
			prices[i] = Number(document.getElementsByClassName("priceInput")[i].value);
		}
		else if(i==0+2 || i==5+2 || i==10+2 || i==15+2) {
			document.getElementsByClassName("priceInput")[i].value = 250;
			prices[i] = Number(document.getElementsByClassName("priceInput")[i].value);
		}
		else if(i==0+3 || i==5+3 || i==10+3 || i==15+3) {
			document.getElementsByClassName("priceInput")[i].value = 750;
			prices[i] = Number(document.getElementsByClassName("priceInput")[i].value);
		}
		else if(i==0+4 || i==5+4 || i==10+4 || i==15+4) {
			document.getElementsByClassName("priceInput")[i].value = 1250;
			prices[i] = Number(document.getElementsByClassName("priceInput")[i].value);
		}
	}
	document.getElementsByClassName("gemRelicPriceTextarea")[0].value = 1500000;
	gemPrice = Number(document.getElementsByClassName("gemRelicPriceTextarea")[0].value);
	document.getElementsByClassName("gemRelicPriceTextarea")[1].value = 80000;
	relicPrice = Number(document.getElementsByClassName("gemRelicPriceTextarea")[1].value);
	console.log("Default values has been loaded.");
}

function assignPricesFromStorage() {
	if(localStorage.prices0 == undefined) assignDefaultPrices();
	else {
		for(var i=0; i<document.getElementsByClassName("priceInput").length; i++) {
			document.getElementsByClassName("priceInput")[i].value = Number(localStorage.getItem("prices"+i));
			prices[i] = Number(document.getElementsByClassName("priceInput")[i].value);
		}
		document.getElementsByClassName("gemRelicPriceTextarea")[0].value = Number(localStorage.getItem("gemPrice"));
		gemPrice = Number(document.getElementsByClassName("gemRelicPriceTextarea")[0].value);
		document.getElementsByClassName("gemRelicPriceTextarea")[1].value = Number(localStorage.getItem("relicPrice"));
		relicPrice = Number(document.getElementsByClassName("gemRelicPriceTextarea")[1].value);
		console.log("Values from local storage has been loaded.");
	}
}

function updateLocalStorage() {
	for(var i=0; i<document.getElementsByClassName("priceInput").length; i++) {
		localStorage.setItem("prices"+i, document.getElementsByClassName("priceInput")[i].value);
	}
	localStorage.setItem("gemPrice", document.getElementsByClassName("gemRelicPriceTextarea")[0].value);
	localStorage.setItem("relicPrice", document.getElementsByClassName("gemRelicPriceTextarea")[1].value);
	console.log("Values in local storage has been updated.");
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











