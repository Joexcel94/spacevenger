//This side of the editor is the code that controls your game
//Anything after two slashes (like this line) is ignored by the game

var canvas;
var canvasWidth = 600;
var canvasHeight = 280;
var bgWidth = 610;

var gameState = "menu";
var gameStartSpeed = 5;
var gameSpeed;

var musicEnabled = false;
var music;
var bgMusic;

var soundEnabled = false;
var snd;
var crashSound;

var frameRate = 20;
var contact = false;
var yPosition = -1;
var score = 0;
var scoreContainer;


var venger;
var vengerSize = 25;
var vengerLimit;
var vengerState = "normal";


var bodies;
var asteroids;
var numOfBodies = 8;
var maxBodySpace = 250;
var bodiesPositions = [0, 35, 70, 100, 135, 160, 190, 210, 225];


var bodiesStartSpeed = 8;
var asteroidsStartSpeed = 12;
var bodiesSpeed;
var asteroidSpeed;

var firstBG;
var secondBG;
var firstBGxCoordinate;
var secondBGxCoordinate;


var iWidth = window.innerWidth;
var iHeight = window.innerHeight;


//Initialise game when window is fully loaded
window.onload = function(){
	document.title = "SpaceVenger Game";
	initialise();
}


// -------------- Below here the proper game code start --------------


//********** Game Components Initialised **********//
var initialise = function(){



	//Main is a div acting as a canvas for HTML4
	canvas = document.getElementById("main");
	canvas.innerHTML = ""; //Clear out anything already in the canvas
	canvas.style.width = canvasWidth + 'px';
	canvas.style.height = canvasHeight + 'px';
    canvas.style.position = 'absolute';
    canvas.style.border = "1px solid black";
	gameSpeed = gameStartSpeed;
    bodiesSpeed = bodiesStartSpeed;
	asteroidSpeed = asteroidsStartSpeed;
	score = 0;

	//###### Setting BG Image ######//
	firstBG = document.createElement('img');
	firstBG.src = "images/newBG-01.png";
	firstBG.style.position = "absolute";
	firstBG.style.zIndex = "0";
	firstBG.style.top = "0px";
	firstBG.style.left = "0px";
	firstBG.style.width = bgWidth + 'px';
	firstBG.style.height = canvasHeight + 'px';
	firstBGxCoordinate = 0;


	secondBG = document.createElement('img');
	secondBG.src = "images/newBG-12.png";
	secondBG.style.position = "absolute";
	secondBG.style.zIndex = "0";
	secondBG.style.top = "0px";
	secondBG.style.width = bgWidth + 'px';
	secondBG.style.height = canvasHeight + 'px';
	secondBG.style.left = canvasWidth +"px";
	secondBGxCoordinate = canvasWidth;

	canvas.appendChild(firstBG);
	canvas.appendChild(secondBG);

	//Make all text on the canvas white
	//canvas.style.color = "white";


    // Add settings pop-up box
	settingsDiv = document.createElement('div');
	settingsDiv.setAttribute('id', 'controls');
	settingsDiv.style.backgroundColor = "white";
	settingsDiv.style.position = "absolute";
	settingsDiv.style.top = "20px";
    settingsDiv.style.right = "80px";
	settingsDiv.style.width = "200px";
	settingsDiv.style.zIndex = "999";
	settingsDiv.style.border = "3px solid black";
	settingsDiv.style.paddingBottom = "5px";
	settingsDiv.style.textAlign = "center";
	settingsDiv.style.boxShadow = "5px 5px 10px gray";
	settingsDiv.style.display = "none";


    //H3 element
	var header_3 = document.createElement('h4');
	header_3.innerHTML = "Settings";
	header_3.style.color = "white";
	header_3.style.backgroundColor = "cornflowerblue";
	header_3.style.padding = "10px 5px";
	header_3.style.marginTop = "0px";

	// Button element
	var button_1 = document.createElement('button');
	button_1.setAttribute('id', 'new');
	button_1.innerHTML = "New Game";
	button_1.style.border = "1px black solid";
	button_1.style.margin = "5px";
	button_1.style.minWidth = "100px";
    listenForEvent(button_1, 'click', resetGame);





    // Fieldset element
	var fieldSet_1 = document.createElement('fieldset');
	fieldSet_1.style.textAlign = "left";
	fieldSet_1.style.width = "70%";
	fieldSet_1.style.margin = "10px auto";

	var legend_1 = document.createElement('legend');
	legend_1.innerHTML = "Sounds";
	var legendInput_1 = document.createElement('input');
	legendInput_1.setAttribute('type', 'checkbox');
	legendInput_1.setAttribute('id', 'snd');
	var inputLabel_1 = document.createElement('label');
	inputLabel_1.innerHTML = "Effects";
	inputLabel_1.setAttribute('for', 'snd');
    listenForEvent(legendInput_1, 'click', toggleSound);

	var legendInput_2 = document.createElement('input');
	legendInput_2.setAttribute('type', 'checkbox');
	legendInput_2.setAttribute('id', 'music');
	//legendInput_2.addEventListener('click', setBG, false);
	listenForEvent(legendInput_2, 'click', toggleMusic);

	var breakLine_1 = document.createElement('br');

	var inputLabel_2 = document.createElement('label');
	inputLabel_2.innerHTML = "Music";
	inputLabel_2.setAttribute('for', 'music');



    // 'Done' button
	var button_2 = document.createElement('button');
	button_2.setAttribute('id', 'done');
	button_2.innerHTML = "Done";
	listenForEvent(button_2, 'click', hideSettings);

	// 'Settings' button
	var button_3 = document.createElement('button');
	button_3.setAttribute('id', 'settings');
	button_3.innerHTML = "⚙";
	button_3.style.position = "absolute";
	button_3.style.top = "20px";
	button_3.style.right = "20px";
	button_3.style.fontSize = "2em";
	listenForEvent(button_3, 'click', showSettings);



    fieldSet_1.appendChild(legend_1);
	fieldSet_1.appendChild(legendInput_1);
	fieldSet_1.appendChild(inputLabel_1);
	fieldSet_1.appendChild(breakLine_1);
	fieldSet_1.appendChild(legendInput_2);
	fieldSet_1.appendChild(inputLabel_2);


	settingsDiv.appendChild(header_3);
	settingsDiv.appendChild(button_1);
	settingsDiv.appendChild(fieldSet_1);
	settingsDiv.appendChild(button_2);



	document.body.appendChild(settingsDiv);
	document.body.appendChild(button_3);






	//###### Loading audio file ######//
	bgMusic = document.createElement('audio');
	bgMusic.src = "http://users.tpg.com.au/dor19een59/music.mp3";
	bgMusic.setAttribute('controls', 'muted');
	bgMusic.setAttribute('preload', 'auto');
	bgMusic.volume = 0.0000000001;
	//bgMusic.play();

    crashSound = document.createElement('audio');
	crashSound.src = "http://users.tpg.com.au/dor19een59/sound-crash.mp3";
	crashSound.setAttribute('controls', 'muted');
	crashSound.setAttribute('preload', 'auto');
	crashSound.load();
	crashSound.volume = 0.0000000001;
	//crashSound.play();



	//###### Setting the Venger ######//
	venger = Object();
	venger.xCoordinate = 100;
	venger.yCoordinate = 100;
	venger.img = document.createElement('img');
	venger.img.src = "images/venger.png";
	vengerState = "normal";
	venger.img.height = vengerSize;
	venger.img.style.position = "absolute";
	canvas.appendChild(venger.img);




	//###### Setting the space bodies ######//
	bodies = Array();
	asteroids = Array();
	for(var i = 0; i < numOfBodies; i++){
		if(i > 3){
			var asteroid = new Object();
			asteroid.img = document.createElement('img');
			asteroid.img.src = "images/bigAsteroid.png";
			asteroid.img.style.position = "absolute";
			asteroid.img.height = 30;
			canvas.appendChild(asteroid.img);

			asteroid.xCoordinate = canvasWidth+(Math.floor(Math.random() * 1000));
			var asteroidPosition = Math.floor(Math.random() * 9);
			asteroid.yCoordinate = bodiesPositions[asteroidPosition];

			asteroids.push(asteroid);
		}else{
			var meteor = new Object();
			meteor.img = document.createElement('img');
			meteor.img.src = "images/content2.png";
			meteor.img.style.position = "absolute";
			meteor.img.height = 30;
			canvas.appendChild(meteor.img);

			meteor.xCoordinate = canvasWidth+(Math.floor(Math.random() * 1000));
			var asteroidPosition = Math.floor(Math.random() * 9);
			meteor.yCoordinate = bodiesPositions[asteroidPosition];
			bodies.push(meteor);
		}

	}

	//Create container for displaying player score
	scoreContainer = document.createElement("div");
    scoreContainer.setAttribute('id', 'score');
	scoreContainer.style.position = "absolute";
	scoreContainer.style.bottom = "5px";
	scoreContainer.style.left = "5px";
	scoreContainer.style.color = "white";
	scoreContainer.innerHTML = "Score : " + score;
	canvas.appendChild(scoreContainer);

	//Add event listeners for canvas
	listenForEvent(window, "mousedown", handleClick);
	listenForEvent(window, "touchstart", handleClick);
	listenForEvent(window, "touchend", handleRelease);
	listenForEvent(window, "mouseup", handleRelease);
	listenForEvent(window, "touchmove", handleSwipe);
	listenForEvent(window, "mousemove", handleMouse);



	// listenForEvent(window, "resize", startGame); There is bug that needs fixing here.

	listenForEvent(canvas, 'contextmenu', function(e){e.preventDefault();});


	//checkScreenOrientation();

    checkScreen();

	//Start update and draw loops
	update();
	draw();
	clock();
}

//Update method performs all maths calculations and movement for game objects
var update = function(){

	if(gameState == "ingame"){
		updateBackground();
		for(var i = 0; i < bodies.length; i++){
			bodies[i].xCoordinate -= bodiesSpeed;
			if(bodies[i].xCoordinate < -10){
				bodies[i].img.style.visibility = 'visible';
				var asteroidPosition = Math.floor(Math.random() * 9);
				bodies[i].xCoordinate = canvasWidth;
				bodies[i].yCoordinate = bodiesPositions[asteroidPosition];
			}
			if(isCollision(venger, bodies[i])){
				if(vengerState == "normal"){
					vengerState = "dead";
					window.setTimeout(function(){
						gameState = "gameover";
					}, 1000);
					venger.img.src="images/smokepuff.gif";
                    playSound(crashSound);
				}else{
					bodies[i].img.style.visibility = 'hidden';
					score += 1;
				}
			}
		}

		for(var i = 0; i < asteroids.length; i++){
			asteroids[i].xCoordinate -= asteroidSpeed;
			if(asteroids[i].xCoordinate < -10){
				asteroids[i].img.style.visibility = 'visible';
				var asteroidPosition = Math.floor(Math.random() * 9);
				asteroids[i].xCoordinate = canvasWidth;
				asteroids[i].yCoordinate = bodiesPositions[asteroidPosition];
			}
			if(isCollision(venger, asteroids[i])){
				if(vengerState == "normal"){
					vengerState = "dead";
					window.setTimeout(function(){
						gameState = "gameover";
					},100);
					venger.img.src="images/smokepuff.gif";
                    playSound(crashSound);
				}else{
					asteroids[i].img.style.visibility = 'hidden';
					score += 1;
				}
			}

		}
		setTimeout(update, 1000/frameRate);
	}
}


var draw = function(){
	if(gameState == "menu"){

		canvas.innerHTML = "<img src= 'images/venger-bg.png' style= 'width:600px; height:200px; z-index:-1;position:absolute; top:30px; left: 0px;' />"
        	+"<h1 style= 'position:absolute; z-index:999; top:-25px; left:10px; width:100%; color:#42C7F1;'>Welcome To SpaceVenger Game</h1>"
			+"<button style= 'position:absolute; z-index:999; top:225px; left:350px; width:20%; height:16%; background-color:#42C7F1; color:white; font-size: 1.2em; line-height:16px;' ontouchstart='showControls();' onclick='showControls();'>Game Instructions</button>"
            +"<button style= 'position:absolute; z-index:999; top:225px; left:150px; width:20%; height:16%; background-color:#42C7F1; color:white; font-size: 1.2em;' ontouchstart='startGame();' onclick='startGame();'>Play Game</button>";

    }

	else if(gameState == "controls"){

		canvas.innerHTML = "<h1 style= 'position:absolute; z-index:999; top:-25px; left:10px; width:100%; color:black;'>Game Instructions</h1>"
		+"<p style= 'position:absolute; z-index:999; top:25px; left:5px; width:100%; color:black; font-size:1.2em; padding-right:25px; text-align:left;'><strong>On Mobile: </strong>Rotate screen to landscape for best experience. Scroll up/down to move the spaceship. You gain points by avoiding the space bodies. If you crash with any space body, that's <em>Game Over!</em></p>"
		+"<p style= 'position:absolute; z-index:999; top:100px; left:5px; width:100%; color:black; font-size:1.2em; padding:5px, 20px; text-align:left;'><strong>On PC: </strong>Drag the mouse up/down to move the spaceship. You gain points by avoiding the space bodies. If you crash with any space body, that's <em>Game Over!</em></p>"
        +"<button style= 'position:absolute; z-index:999; top:225px; left:250px; width:20%; height:16%; background-color:#42C7F1; color:white; font-size: 1.2em;' ontouchstart='startGame();' onclick='startGame();'>Start Game</button>";
	}


	else if(gameState == "ingame"){

		venger.img.style.left = venger.xCoordinate + 'px';
		venger.img.style.top = venger.yCoordinate + 'px';

		firstBG.style.left = firstBGxCoordinate + 'px';
		firstBG.style.top = "0px";
		secondBG.style.left = secondBGxCoordinate + 'px';
		secondBG.style.top = "0px";

		for(var i = 0; i < bodies.length; i++){
			bodies[i].img.style.left = bodies[i].xCoordinate+ 'px';
			bodies[i].img.style.top = bodies[i].yCoordinate + 'px';
		}

		for(var i = 0; i < asteroids.length; i++){
			asteroids[i].img.style.left = asteroids[i].xCoordinate+ 'px';
			asteroids[i].img.style.top = asteroids[i].yCoordinate + 'px';
		}
		setTimeout(draw, 1000/frameRate);
	}

	else if(gameState == "gameover"){

		canvas.innerHTML =
		"<img src= 'images/venger-bg.png' style= 'z-index:-999999; top:0px; left: 0px; width:600px; height:250px; ' />"
			+"<h1 style= 'position:absolute; z-index:999; top:-10px; left:-180px; width:100%; color:#42C7F1;'>GAME OVER</h1>"
			+"<h1 style= 'position:absolute; z-index:999; top:30px; left:-180px; color:red; width:100%; '>Score: "
			+ score
			+ "</h1>"
			+"<button style= 'position:absolute; z-index:999; top:225px; left:250px; width:20%; height:16%; background-color:#42C7F1; color:white; font-size: 1.2em;' ontouchstart='startGame();' onclick='startGame();'>Restart</button>"
	}
}


//Checks for collisions between 2 game objects
var isCollision = function(object1, object2){
	if((object1.xCoordinate + object1.img.width) < object2.xCoordinate || object1.xCoordinate>(object2.xCoordinate+object2.img.width) || (object1.yCoordinate+object1.img.height)<object2.yCoordinate || object1.yCoordinate>(object2.yCoordinate+object2.img.height)){
		return false;
	}else{
		return true;
	}
}

//Increases score periodically

var clock = function(){
	if(gameState == "ingame"){
		gameSpeed += 2;
		asteroidSpeed += 2;
		bodiesSpeed += 2;

		setInterval(function(){
			if(gameState == "ingame"){
				score = score + 1;
			}
			scoreContainer.innerHTML = "Score : " + score;		},1000);
		setTimeout(clock, 10000);
	}
}

var startMusic = function(){
	if(bgMusic != null){
		bgMusic.volume = 1;
		bgMusic.currentTime = 0;
		bgMusic.play();
		showTutorial();
	}
}

var handleClick = function(event){
	event.preventDefault();
	if(gameState == "ingame"){
		contact = true;
	}
}

var handleRelease = function(e){
	contact = false;
	yPosition=-1;
}

var showControls = function(){
	gameState = "controls";
	draw();
}

var showTutorial = function(){
	gameState = "tutorial";
	draw();
}

var startGame = function(){

	checkScreenOrientation();
	gameState = "ingame";
	initialise();
    //openFullScreen();
}

var resetGame = function(){
	hideSettings();
	startGame();
}




//This stops the browser from scrolling when you
//swipe around
vengerLimit = canvasHeight - vengerSize;
var handleSwipe = function(event){
	event.preventDefault();
	var currentY = event.touches[(event.touches.length-1)].clientY;
	var difference;
	if (yPosition < 0){
		yPosition = currentY;
    }
	if(yPosition < currentY || yPosition > currentY){
		difference = yPosition - currentY;
		venger.yCoordinate -= difference;
		if(venger.yCoordinate < 0){
			venger.yCoordinate = 5 ;
		}
		else if(venger.yCoordinate > vengerLimit)		{
			venger.yCoordinate = vengerLimit;
		}
	}
	yPosition = currentY;
}

var handleMouse = function(event){
	event.preventDefault();
	if(contact==true){
		var event = event || window.event;
		var currentY = event.clientY;
		var difference;
		if (yPosition < 0)		{
			yPosition = currentY;
		}
		if(yPosition < currentY || yPosition > currentY){
			difference = yPosition - currentY;
			venger.yCoordinate -= difference;
			if(venger.yCoordinate < 0){
				venger.yCoordinate = 5 ;
			}
			else if(venger.yCoordinate > vengerLimit){
				venger.yCoordinate = vengerLimit;
			}
		}
		yPosition = currentY;
	}
}

var updateBackground = function(){
	if(firstBGxCoordinate < -canvasWidth){
		firstBGxCoordinate = (secondBGxCoordinate + canvasWidth);
	}
	if(secondBGxCoordinate < -canvasWidth){
		secondBGxCoordinate = (firstBGxCoordinate + canvasWidth);
	}
	firstBGxCoordinate -= gameSpeed;
	secondBGxCoordinate -= gameSpeed;
}

var CodeEditorcloseG = function(){
		document.getElementById('gameContainer').style.display = "none";
		document.getElementById("overlay").style.display = "none";
}
var stopMusic = function(){
	bgMusic.pause();
}



var setBG = function(){
	bgMusic.volume = 1;
	bgMusic.currentTime = 0;
	if(musicEnabled == false){
		bgMusic.loop = true;
		bgMusic.play();
		musicEnabled = true;
	}else if(musicEnabled == true){
		bgMusic.loop = false;
		bgMusic.volume = 0.0000000001;
		bgMusic.pause();
		musicEnabled = false;
	}
}

var opens = true;
var showSettings = function(){
	if(opens){
		settingsDiv.style.display = "block";
		opens = false;
	}else{
		settingsDiv.style.display = "none";
		opens = true;
	}
}

var hideSettings = function(){
	settingsDiv.style.display = "none";
	opens = true;
}

var toggleMusic = function(){
	console.log(musicEnabled);
	if(musicEnabled){
		bgMusic.pause();
	}else{
		bgMusic.loop = true;
		bgMusic.currentTime = 0;
		bgMusic.volume = 1;
		bgMusic.play();
	}
	musicEnabled = !musicEnabled;
	console.log(musicEnabled);
}

var toggleSound = function(){
	soundEnabled = !soundEnabled;
	console.log(soundEnabled);
}

var playSound = function(objSound){
	if(soundEnabled){
		objSound.volume = 1;
		objSound.play();
		console.log(soundEnabled);
	}
}



var screenOrientation = function(){
	screen.orientation.lock("portrait-primary");
}

var openFullScreen = function(){
	if(canvas.requestFullscreen){
		canvas.requestFullscreen();
	}else if(canvas.mozRequestFullScreen){
		canvas.mozRequestFullScreen();
	}else if(canvas.webkitRequestFullscreen){
		canvas.webkitRequestFullscreen();
	}else if(canvas.msRequestFullscreen){
		canvas.msRequestFullscreen();
	}
}


var checkScreenOrientation = function(){
	if(window.innerHeight > window.innerWidth){
		document.body.appendChild(alertBox);
        console.log(iWidth);
        console.log(iHeight);
	}else{
    	closeAlert();
        console.log(iWidth);
        console.log(iHeight);
    }
    setTimeout(checkScreenOrientation, 1000);
}


var alertBox = document.createElement('div');
alertBox.style.position = 'absolute';
alertBox.style.top = "50px";
alertBox.style.left = "50px";
alertBox.style.backgroundColor = 'white';
alertBox.style.padding = '5px 10px';
alertBox.style.zIndex = "9999";
alertBox.style.border = "1px dashed red";
alertBox.style.width = '320px';

var alertMsg = document.createElement('h1');
alertMsg.innerHTML = 'Please! Rotate your screen<br><br><button style="font-size: 22px; color:white; background-color:red; width:20%; float:right; " onclick="closeAlert();"  \>close</button>';
alertMsg.style.color = 'red';


alertBox.appendChild(alertMsg);

var closeAlert = function(){
	alertBox.style.display = 'none';
    icount++;
}

var icloseAlert = function(){
	alertBox.style.display = 'none';
}

var openAlert = function(){
	alertBox.style.display = 'block';
}

var icount = 0;

var checkScreen = function(){
	var width = window.innerWidth;
    var height = window.innerHeight;



    if(height > width){
    	document.body.appendChild(alertBox);
        openAlert();
        console.log('Screen width: ' + width);
    	console.log('Screen height: ' + height);
    }else{
    	icloseAlert();

    }

    var timer = setTimeout(checkScreen, 5000);


    console.log(icount);

    if(icount == 5){
    	clearTimeout(timer);
    }
}
