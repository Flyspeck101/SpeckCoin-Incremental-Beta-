// Tried to put into Core class, failed
function format(num) {
  const numInSciNot = {};
        [numInSciNot.coefficient, numInSciNot.exponent] =
          num.toExponential(2).split('e').map(item => Number(item));
        return (num >= 1000000) ? `${numInSciNot.coefficient}e${numInSciNot.exponent}` : String(num);
}





    // Game class 
    class Game {
      constructor(coins, diamonds, opals, protons, neutrons) {
        this.coins = coins;
        this.diamonds = diamonds;
        this.opals = opals;
        this.protons = protons;
        this.neutrons = neutrons;
      }



    }

// Used in HTML for tabs 
    function openCity(evt, cityName) {
      // Declare all variables
      var i, tabcontent, tablinks;

      // Get all elements with class="tabcontent" and hide them
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      // Get all elements with class="tablinks" and remove the class "active"
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      // Show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
    }

// Game data (VERY IMPORTANT)
var data = {
  game: new Game(new Resource([100, 0, 0, 0, 0, 0], [100, 2000, 40000, 800000, 16000000]), 
                 new Resource([0, 0, 0, 0, 0, 0], [1, 200, 40000, 8000000, 1600000000]),
                 new Resource([0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]),
                 new Resource([0, 0, 0, 0, 0, 0], [1, 400, 160000, 64000000, 25600000000]),
                 new Resource([0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0])
                ),
  unlockedCoins: [true, true, false, false, false, false],
  unlockedDiamonds: [false, false, false, false, false, false],
  unlockedProtons: [false, false, false, false, false, false],
  totalResets: 0
};
function reset() {
  data = {
      game: new Game(new Resource([100, 0, 0, 0, 0, 0], [100, 2000, 40000, 800000, 16000000]), 
                     new Resource([0, 0, 0, 0, 0, 0], [1, 200, 40000, 8000000, 1600000000]),
                     new Resource([0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]),
                     new Resource([0, 0, 0, 0, 0, 0], [1, 400, 160000, 64000000, 25600000000]),
                     new Resource([0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0])
                    ),
      unlockedCoins: [true, true, false, false, false, false],
      unlockedDiamonds: [false, false, false, false, false, false],
      unlockedProtons: [false, false, false, false, false, false],
      totalResets: 0
    };

}

// Global Variables (For display and stuff)
let timePassed = 0;
let secondsPassed = 0;


if (Core.loadGameTo(data)) {
  console.log("Save found!");
} else {
  reset();
}


document.getElementById("default").click();
setInterval((function() { // Update
  timePassed++;
  
  if (timePassed < 600) {
    Core.showById("loader");
    Core.hideById("pageContent");
  } else {
    Core.hideById("loader");
    Core.showById("pageContent");
  }
  
  document.getElementById("coinDisplay").innerHTML = format(data.game.coins.amounts[0]);
  document.getElementById("diamondDisplay").innerHTML = format(data.game.diamonds.amounts[0]);
  document.getElementById("protonDisplay").innerHTML = format(data.game.protons.amounts[0]);
  
  document.getElementById("coin1").innerHTML = `[${format(data.game.coins.amounts[1])}] Flyspeck (Currently: ${format(data.game.coins.amounts[1] * 10 * (data.game.opals.amounts[0] * 0.1 + 1))} SpC/s) Cost: <b>${format(data.game.coins.cost(1))} SpeckCoin</b>`;
  document.getElementById("coin2").innerHTML = `[${format(data.game.coins.amounts[1])}] Cloner (Currently: ${format(data.game.coins.amounts[2] * (data.game.opals.amounts[0] * 0.1 + 1))} SpC/s) Cost: <b>${format(data.game.coins.cost(2))} SpeckCoin</b>`;
  document.getElementById("coin3").innerHTML = `[${format(data.game.coins.amounts[3])}] Daydream (Currently: ${format(data.game.coins.amounts[3] * (data.game.opals.amounts[0] * 0.1 + 1))} Clnr/s) Cost: <b>${format(data.game.coins.cost(3))} SpeckCoin</b>`
  document.getElementById("coin4").innerHTML = `[${format(data.game.coins.amounts[4])}] Lollipop (Currently: ${format(data.game.coins.amounts[4] * (data.game.opals.amounts[0] * 0.1 + 1))} SpC/s) Cost: <b>${format(data.game.coins.cost(4))} SpeckCoin</b>`;
  document.getElementById("coin5").innerHTML = `[${format(data.game.coins.amounts[5])}] Fly King (Currently: ${format(data.game.coins.amounts[5] * (data.game.opals.amounts[0] * 0.1 + 1))} SpC/s) Cost: <b>${format(data.game.coins.cost(5))} SpeckCoin</b>`;
  
  for (var index = 1; index < data.unlockedCoins.length; index++) {
    if (data.game.coins.amounts[0] >= data.game.coins.cost(index)/2 && !data.unlockedCoins[index]) {
      data.unlockedCoins[index] = true;
    }                      
  }
  for (var index = 1; index < data.unlockedCoins.length; index++) {    
    if (data.unlockedCoins[index]) {
      Core.showById("coinDisp" + index);
    } else {
      Core.hideById("coinDisp" + index);
    }
  }
}), 5);

setInterval(function() {
  data.game.coins.amounts[0] += data.game.coins.amounts[1] * 10 * (data.game.opals.amounts[0] * 0.1 + 1);
  data.game.coins.produced[0] += data.game.coins.amounts[1] * 10 * (data.game.opals.amounts[0] * 0.1 + 1);
  
  for (var index = 2; index < data.game.coins.amounts.length; index++) {
    data.game.coins.amounts[index - 1] += data.game.coins.amounts[index] * (data.game.opals.amounts[0] * 0.1 + 1);
    data.game.coins.produced[index - 1] += data.game.coins.amounts[index] * (data.game.opals.amounts[0] * 0.1 + 1);
  }
  
  for (var index = 1; index < data.game.diamonds.amounts.length; index++) {
    if (index != 1) {
      data.game.diamonds.amounts[index - 1] += data.game.diamonds.amounts[index] * 10;
    } else {
      data.game.opals.amounts[0] += data.game.diamonds.amounts[1];
    }
  }
  
  for (var index = 1; index < data.game.protons.amounts.length; index++) {
    if (index != 1) {
      data.game.protons.amounts[index - 1] += data.game.protons.amounts[index] * 10;
    } else {
      data.game.neutrons.amounts[0] += data.game.protons.amounts[1];
    }
  }
}, 1000);


window.addEventListener("beforeunload", function (e) { Core.saveGame(data) });

if (document.addEventListener) {
  document.addEventListener('contextmenu', function(e) {
    Core.notify("Lol, right-click doesn't work");
    e.preventDefault();
  }, false);
} else {
  document.attachEvent('oncontextmenu', function() {
    Core.notify("Lol, right-click doesnt work");
    window.event.returnValue = false;
  });
}

window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);

let prizesClaimed = [false, false];
let keys = [];

function keysPressed(e) {
	// store an entry for every key pressed
	keys[e.code] = true;
	
	// Ctrl + Shift + J
	if (keys[17] && keys[16] && keys[74]) {
		// do something
    Core.notify("Hey! Why do you want to invade the console, huh?");
    e.preventDefault();
	}
  
  // Ctrl + Shift + I
	if (keys[17] && keys[16] && keys[73]) {
		// do something
    Core.notify("That's not your source code!");
    e.preventDefault();
	}
	
	// F12
	if (keys[123]) {
		// do something
    Core.notify("<b>You are getting nowhere.</b>")
		e.preventDefault();	
	}
  
  if (keys[17] && (keys[49] || keys[50] || keys[51] || keys[52] || keys[53] || keys[54] || keys[55] || keys[56])) {
		// do something
		e.preventDefault();	
	}
  
  if (keys[17] && (keys[49] && keys[50] && keys[51] && keys[52] && keys[53] && keys[54] && keys[55] && keys[56]) && !prizesClaimed[1]) {
    Core.notify("You got <i><b>lots</b> of free money<i>!!!");
    data.game.coins.amounts[0] += Math.floor(data.game.coins.amounts[0] / 2);
    prizesClaimed[1] = true;
  }
  
  
  if (keys[17] && (keys[65] || keys[66] || keys[67] || keys[68] || keys[69] || keys[70])) {
		// do something
		e.preventDefault();	
	}
  
  if (keys[17] && (keys[65] && keys[66] && keys[67] && keys[68] && keys[69] && keys[70]) && !prizesClaimed[0]) {
    Core.notify("You got <i>free money<i>!!!");
    data.game.coins.amounts[0] += Math.floor(data.game.coins.amounts[0] / 10);
    prizesClaimed[0] = true;
  }
}

function keysReleased(e) {
	// mark keys that were released
	keys[e.code] = false;
}

Core.notify("Welcome to SpeckCoin Incremental! Click the icons to buy them. ");
