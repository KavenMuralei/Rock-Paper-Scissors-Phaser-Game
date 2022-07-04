/* 
 Akaran, Kaven, Sansar 
 6/6/2022
 Game Code
 This page contains the code for the Rock Paper Scissors Game
*/
//Rock Paper Scissors variables
let rock = "rock";
let paper = "paper";
let scissors = "scissors";


//Important number counts. These count are very important to count. 
let roundCount = 0;
let roundCountString = "";
let rounds = 0;
let pScore = 0;
let oScore = 0;
let replayCount = 0;

//String Variables
let startMessage = "Rock Paper Scissors \n      Remastered";
let person = "";
let personT;
let gameModeMessage = "Choose your gamemode!"
let selection = "   Select either rock paper or scissors!"
let opponent = "opponent";
let pScoreString = "";
let oScoreString = "";
let ScoreArray = [];

//Sprites
let background;
let loadingIcon;
let wrongAnimation;

//Sound files
let bgMusic;
let buttonClick;
let panicSound;

//Images
let clickHere;
let rockImage;
let paperImage;
let scissorsImage;
let insaneButton;
let startButton;

//Booleans this screenshake boolean needs o be global since it is accessed by both INSANe and CLASSIC dificulties
let screenShake;

//Important classic variables
let selectionTemp;
let opponentTemp;
let personTTemp;
let roundCountStringTemp;
let pScoreStringTemp;
let oScoreStringTemp;

//Arrays. These variables NEED to be global to be acsessed by the end scene
let nameArray = []; 
let pScoreArray = [];
let oScoreArray = [];
let roundsArray = [];
let tempArray = [];

// Variables for Insane Mode




/*********************START OF THE INITIALIZATION SCENE*********************/
class initializingScene extends Phaser.Scene {
  constructor(config) {
    super(config);
  }

  preload() {
    //loads an audio sound used for button clickings
    this.load.audio("buttonClicked", "assets/audio/buttonClick.mp3");
    //loads the click here picture
    this.load.image("clickHere", "assets/IMAGES/clickHere.png");
    this.load.spritesheet('load', 'assets/sprites/loading.png', { frameWidth: 300, frameHeight: 300 });
  }
  create() {
    let intermission = "Intermission";
    //Adds the button clicking sound
    buttonClick = this.sound.add("buttonClicked")
    //creates a loading circle sprite. Ths sprite infinitely loops
    this.anims.create({
      key: "loadF",
      frames: this.anims.generateFrameNumbers("load", {
        start: 0,
        end: 7
      }),
      frameRate: 15,
      repeat: 0
    });//end of the sprite
    //sets the position and scale for the loading icon
    loadingIcon = this.add.sprite(400, 300, 'loadF');
    loadingIcon.setScale(0.1);
    //intermission text and font customization 
    this.intermission = this.add.text(285, 100, intermission, { fontFamily: "DM Sans,sans-serif", fontSize: 42, color: "#FFFFFF", textAlign: "center" });
    //adjust position and scale. Also Makes it interactive.
    clickHere = this.physics.add.image(400, 460, "clickHere").setInteractive();
    //hover
    clickHere.on("pointerdown", function(pointer) {
      this.setTint(925252);
    });//end of pointerdown event
    clickHere.on("pointerup", function(pointer) {
      buttonClick.play();//<-----NEW FUNCTION
      this.clearTint();
      //startMessage.x=-1000;
      alert(nameTaker());
      game.scene.start("startScene");
      game.scene.stop("initialScene");
    });
    //This function takes your name and checks if your name has invalid characters
    function nameTaker() {
      let out = false;
      let count = 0;
      while (out == false) {
        person = prompt("Please enter your name:", "Username");
        //Converts the text to lower case
        let personTemp = person.toLowerCase();
        for (let x = 0; x <= personTemp.length - 1; x++) {
          if (personTemp.charAt(x) == "a" || personTemp.charAt(x) == "b" || personTemp.charAt(x) == "o" || personTemp.charAt(x) == "c" || personTemp.charAt(x) == "p" || personTemp.charAt(x) == "d" || personTemp.charAt(x) == "q" || personTemp.charAt(x) == "e" || personTemp.charAt(x) == "r" || personTemp.charAt(x) == "f" || personTemp.charAt(x) == "s" || personTemp.charAt(x) == "g" || personTemp.charAt(x) == "t" || personTemp.charAt(x) == "h" || personTemp.charAt(x) == "u" || personTemp.charAt(x) == "i" || personTemp.charAt(x) == "v" || personTemp.charAt(x) == "j" || personTemp.charAt(x) == "w" || personTemp.charAt(x) == "k" || personTemp.charAt(x) == "x" || personTemp.charAt(x) == "l" || personTemp.charAt(x) == "y" || personTemp.charAt(x) == "m" || personTemp.charAt(x) == "z" || personTemp.charAt(x) == "n") {
            count += 0
          }
          else {
            count++
          }
        }
        if (count > 0) {
          alert("Invalid Entry. You have " + count + " invalid characters");
          count = 0
        }
        else {
          out = true;
        }
      }
      return "Hello " + person + "!";//returns name
    }
  }
  update() {
    loadingIcon.anims.play("loadF", true);
  }
}




/*********************START OF THE START SCENE*********************/


class startScene extends Phaser.Scene {
  constructor(config) {
    super(config);

  }
  preload() {
    //Loads the background music
    this.load.audio("bgMusic", "assets/audio/startMusic.mp3");
    this.load.audio("buttonClicked", "assets/audio/buttonClick.mp3");
    //Loads the backgroud sprite found in the menu
    this.load.spritesheet('bg', 'assets/sprites/background.png', { frameWidth: 800, frameHeight: 600 });
    //Loads the start button for the game
    this.load.spritesheet('pressStart', 'assets/sprites/pressStart.png', { frameWidth: 480, frameHeight: 100 });

  }
  create(data) {
    
    //This adds and plays the background music
    bgMusic = this.sound.add("bgMusic");
    bgMusic.play();
    //Adds the button clicking sound
    buttonClick = this.sound.add("buttonClicked")
    //This is the animation in the start menu
    this.anims.create({
      key: "bg1",
      frames: this.anims.generateFrameNumbers("bg", {
        start: 0,
        end: 90
      }),
      frameRate: 30,
      repeat: 0
    });
    this.bg = this.add.sprite(400, 300, 'bg1');
    //This is the press start button
    this.anims.create({
      key: "startFrames",
      frames: this.anims.generateFrameNumbers("pressStart", {
        start: 0,
        end: 2
      }),
      frameRate: 5,
      repeat: 0
    });
    startButton = this.add.sprite(400, 400, 'pressStart').setInteractive();
    startButton.setScale(0.5);
    //hover
    startButton.on("pointerup", function(pointer) {
      this.setTint(0xff0000);
    });//end of pointerdown event
    startButton.on("pointerdown", function(pointer) {
      this.clearTint();
      buttonClick.play();
      game.scene.stop("startScene");
      game.scene.start("menuScene");
    });
    //This is the start screen message
    this.startMessage = this.add.text(210, 100, startMessage, { fontFamily: "DM Sans,sans-serif", fontSize: 42, color: "#FFFFFF", textAlign: "center" });
  }



  update() {
    //sets the background
    this.bg.anims.play("bg1", true);
    //Sets the press start button
    startButton.anims.play("startFrames", true);

  }
}




/*********************START OF THE MENU SCENE*********************/
class menuScene extends Phaser.Scene {
  constructor(config) {
    super(config);
  }

  preload() {
    //loads the button click audio
    this.load.audio("buttonClicked", "assets/audio/buttonClick.mp3");

    //loads the classic mode and insane mode images
    this.load.image("classic", "assets/IMAGES/classic.png");
    this.load.image("insane", "assets/IMAGES/insane.png");

    //loads the rock paper scissors animated battle in the background
    this.load.spritesheet('bg', 'assets/sprites/image.png', { frameWidth: 800, frameHeight: 600 });
  }
  create() {
    let classicButton;
    //declares the button clicked audio in the buttonClick variable
    buttonClick = this.sound.add("buttonClicked")
    //Animation for the background
    this.anims.create({
      key: "bg1",
      frames: this.anims.generateFrameNumbers("bg", {
        start: 0,
        end: 90
      }),
      frameRate: 30,
      repeat: 0
    });
    this.bg = this.add.sprite(400, 300, 'bg1');
    //This makes the classic mode and insane mode buttons interactive
    classicButton = this.physics.add.image(140, 340, "classic").setInteractive();
    insaneButton = this.physics.add.image(660, 340, "insane").setInteractive();
    //When classic mode is clicked then..
    classicButton.on("pointerdown", function(pointer) {
      this.setTint(595959);
    });//end of pointerdown event
    classicButton.on("pointerup", function(pointer) {
      buttonClick.play();//Plays the audio for the button click
      this.clearTint();//changes the tint
      //startMessage.x=-1000;
      rounds = +prompt("How many round would you like? \nONLY ODD NUMBERS, MINIMUM 5", 5) //prompt for rounds
      while (rounds % 2 == 0|| rounds<5) { //while loop if the rounds modulo 2 
        rounds = +prompt("Invalid Number. How many round would you like?", 5)
      }
      game.scene.stop("menuScene");
      game.scene.start("gameScene");
    });
    insaneButton.on("pointerdown", function(pointer) {
      this.setTint(595959);
    });//end of pointerdown event
    insaneButton.on("pointerup", function(pointer) {
      buttonClick.play();
      this.clearTint();
      //startMessage.x=-1000;
      rounds = +prompt("How many round would you like? \nONLY ODD NUMBERS, MINIMUM 5", 5)
      while (rounds % 2 == 0 || rounds<5) {
        rounds = +prompt("Invalid Number. How many round would you like?", 5);
      }
      game.scene.stop("menuScene");
      game.scene.start("insaneGameScene");
    });
    this.gameModeMessage = this.add.text(150, 100, gameModeMessage, { fontFamily: "DM Sans,sans-serif", fontSize: 42, color: "#FFFFFF", textAlign: "center" })
  }
  update() {
    this.bg.anims.play("bg1", true);
  }
}



/*********************START OF THE GAME SCENE*********************/
//Mr krnic added these. Idk if they are important 
let startTime = 0;
let endTime = 0;
let elapsed = 0;
let showAdd = false;
class gameScene extends Phaser.Scene {
  constructor(config) {
    super(config);
  }

  preload() {
    this.load.audio("buttonClicked", "assets/audio/buttonClick.mp3");
    //This loads the panic audio
    this.load.audio("panic", "assets/audio/panicMusic.m4a");

    //These are all the sprites for the base game plus a unique background for the game. 
    this.load.spritesheet('rockMoving', 'assets/sprites/rock.png', { frameWidth: 200, frameHeight: 200 });
    this.load.spritesheet('opponentRockMoving', 'assets/sprites/rockOpponent.png', { frameWidth: 200, frameHeight: 200 });
    this.load.spritesheet('paperMoving', 'assets/sprites/paper.png', { frameWidth: 200, frameHeight: 200 });
    this.load.spritesheet('opponentPaperMoving', 'assets/sprites/paperOpponent.png', { frameWidth: 200, frameHeight: 200 });
    this.load.spritesheet('scissorsMoving', 'assets/sprites/scissors.png', { frameWidth: 200, frameHeight: 200 });
    this.load.spritesheet('opponentScissorsMoving', 'assets/sprites/scissorsOpponent.png', { frameWidth: 200, frameHeight: 200 });
    this.load.spritesheet('bgGame', 'assets/sprites/classicBackground.png', { frameWidth: 1024, frameHeight: 384 });

    //These are the images of the pixelated rock paper and scissors
    this.load.image("rock", "assets/IMAGES/rock.png");
    this.load.image("paper", "assets/IMAGES/paper.png");
    this.load.image("scissors", "assets/IMAGES/scissors.png");
  }

  create() {
    //These are variables that are only necessary for the game. These includes the sprites of the rock paper and scissors
    let rockSprite;
    let opponentRockSprite;
    let paperSprite;
    let opponentPaperSprite;
    let scissorsSprite;
    let opponentScissorsSprite;
    //this is the panic audio activation. Basically later in the code if your score is less then the opponents, it will activate
    let panic = 0;

    //sound declarations
    buttonClick = this.sound.add("buttonClicked");
    panicSound = this.sound.add("panic");

    //This is the background of the game scene. It has to be executed before all the other code. Otherwise, the background would overlap all the text. 
    this.anims.create({
      key: "bgGame1",
      frames: this.anims.generateFrameNumbers("bgGame", {
        start: 0,
        end: 7
      }),
      frameRate: 21,
      repeat: 0
    });
    this.bgGame = this.add.sprite(400, 300, 'bgGame1').setScale(1.55);


    //These are all the text ouputed by the game
    selectionTemp = this.add.text(120, 50, selection, { fontFamily: "DM Sans,sans-serif", fontSize: 32, color: "#FFFFFF", textAlign: "center" })
    opponentTemp = this.add.text(700, 150, opponent, { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
    personTTemp = this.add.text(15, 150, person, { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
    if (roundCountStringTemp == null) {
      roundCountStringTemp = this.add.text(400, 100, roundCount.toString(), { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
    }
    if (pScoreStringTemp == null) {
      pScoreStringTemp = this.add.text(30, 175, pScore.toString(), { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
    }
    if (oScoreStringTemp == null) {
      oScoreStringTemp = this.add.text(750, 175, oScore.toString(), { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
    }




    //This makes the rock paper scissor images interactible 
    rockImage = this.physics.add.image(200, 240, "rock").setInteractive();
    paperImage = this.physics.add.image(400, 240, "paper").setInteractive();
    scissorsImage = this.physics.add.image(600, 240, "scissors").setInteractive();

    rockImage.setScale(0.5);
    paperImage.setScale(0.5);
    scissorsImage.setScale(0.4);

    //Rock sprite
    this.anims.create({
      key: "rockF",
      frames: this.anims.generateFrameNumbers("rockMoving", {
        start: 0,
        end: 31
      }),
      frameRate: 21,
      repeat: 0
    });
    rockSprite = this.add.sprite(10500, 400, 'rockMoving').setInteractive();

    //The opponents rock sprite
    this.anims.create({
      key: "opponentRockF",
      frames: this.anims.generateFrameNumbers("opponentRockMoving", {
        start: 0,
        end: 31
      }),
      frameRate: 21,
      repeat: 0
    });
    opponentRockSprite = this.add.sprite(10500, 400, 'opponentRockMoving').setInteractive();

    //Paper sprite
    this.anims.create({
      key: "paperF",
      frames: this.anims.generateFrameNumbers("paperMoving", {
        start: 0,
        end: 41
      }),
      frameRate: 21,
      repeat: 0
    });
    paperSprite = this.add.sprite(10500, 400, 'paperMoving').setInteractive();

    //The opponents paper sprite
    this.anims.create({
      key: "opponentPaperF",
      frames: this.anims.generateFrameNumbers("opponentPaperMoving", {
        start: 0,
        end: 41
      }),
      frameRate: 21,
      repeat: 0
    });
    opponentPaperSprite = this.add.sprite(10500, 400, 'opponentPaperMoving').setInteractive();

    //scissors sprite
    this.anims.create({
      key: "scissorsF",
      frames: this.anims.generateFrameNumbers("scissorsMoving", {
        start: 0,
        end: 42
      }),
      frameRate: 23,
      repeat: 0
    });
    scissorsSprite = this.add.sprite(10500, 400, 'opponentScissorsMoving').setInteractive();

    //the opponent scissors sprite
    this.anims.create({
      key: "opponentScissorsF",
      frames: this.anims.generateFrameNumbers("opponentScissorsMoving", {
        start: 0,
        end: 42
      }),
      frameRate: 18,
      repeat: 0
    });
    opponentScissorsSprite = this.add.sprite(10500, 400, 'opponentScissorsMoving').setInteractive();

    //This is when the user interacts with rock image
    rockImage.on("pointerdown", function(pointer) {
    });
    rockImage.on("pointerup", function(pointer) {
      //This destroys all the text in the game
      roundCountStringTemp.destroy();
      oScoreStringTemp.destroy();
      pScoreStringTemp.destroy();
      buttonClick.play();
      //resets the position of all sprites
      resetPosition();
      //takes the result of the rpsBaseGame function and puts it in the rps variable
      let rps = rpsBaseGame(rock);
      //Plays the rock sprite at the set position
      rockSprite.anims.play("rockF", true).setFlipX(true).setPosition(105, 500);
      //If the function says "you won" then it checks stoppanicmusic to see if your score exceed the opponents. If it doesnt, panic music continues to play. 
      if (rps == "You won!") {
        stopPanicMusic();
        //Plays the sprite which you won from
        scissorsSprite.anims.play("scissorsF", true).setFlipX(false).setPosition(700, 500);
      }
      //If the function says "you lost" then it checks panicmusic to see if your score is less then the opponents. If it isnt, bgmusic continus to play. 
      else if (rps == "You lost!") {
        panicMusic();
        paperSprite.anims.play("paperF", true).setFlipX(false).setPosition(700, 500);
        screenShake = true; //shakes the screen to indicate you lost a point
      }
      //If the function say "you tied"
      else if (rps == "You tied! Round will be restarted!") {
        opponentRockSprite.anims.play("opponentRockF", true).setFlipX(false).setPosition(700, 500);
      }
      hideImages();
      showAdd = true;
    });

    //Refer to the rock comments for functionality
    paperImage.on("pointerdown", function(pointer) {
    });
    paperImage.on("pointerup", function(pointer) {
      roundCountStringTemp.destroy();
      oScoreStringTemp.destroy();
      pScoreStringTemp.destroy();
      buttonClick.play();
      resetPosition();
      let rps = rpsBaseGame(paper);
      paperSprite.anims.play("paperF", true).setFlipX(true).setPosition(105, 500);
      if (rps == "You won!") {
        stopPanicMusic();
        rockSprite.anims.play("rockF", true).setFlipX(false).setPosition(700, 500);
      }
      else if (rps == "You lost!") {
        panicMusic();
        scissorsSprite.anims.play("scissorsF", true).setFlipX(false).setPosition(700, 500);
        screenShake = true;
      }
      else if (rps == "You tied! Round will be restarted!") {
        opponentRockSprite.anims.play("opponentPaperF", true).setFlipX(false).setPosition(700, 500);
      }
      hideImages();
      showAdd = true;
    });

    //Refer to the rock comments for functionality
    scissorsImage.on("pointerdown", function(pointer) {
    });
    scissorsImage.on("pointerup", function(pointer) {
      roundCountStringTemp.destroy();
      oScoreStringTemp.destroy();
      pScoreStringTemp.destroy();
      buttonClick.play();
      resetPosition();
      let rps = rpsBaseGame(scissors);
      scissorsSprite.anims.play("scissorsF", true).setFlipX(true).setPosition(105, 500);
      if (rps == "You won!") {
        stopPanicMusic();
        paperSprite.anims.play("paperF", true).setFlipX(false).setPosition(700, 500);
      }
      else if (rps == "You lost!") {
        panicMusic();
        rockSprite.anims.play("rockF", true).setFlipX(false).setPosition(700, 500);
        screenShake = true;
      }
      else if (rps == "You tied! Round will be restarted!") {
        opponentScissorsSprite.anims.play("opponentScissorsF", true).setFlipX(false).setPosition(700, 500);
      }
      hideImages();
      showAdd = true;
    });

    //this function is hides all images
    function hideImages() {
      rockImage.setPosition(2000, 256);
      rockImage.setPosition(2000, 256);
      paperImage.setPosition(2000, 256);
      scissorsImage.setPosition(2000, 256);
      selectionTemp.setPosition(2000, 1);

    }

    //this funtion checks to see if its applicable to play panic music
    function panicMusic() {
      panic++
      if (pScore < oScore && panic == 1) {
        bgMusic.pause();
        panicSound.play();
      }
    }

    //this function checks to see if its applicable to stop the panic music
    function stopPanicMusic() {
      panic = 0
      if (pScore >= oScore) {
        panicSound.stop();
        bgMusic.resume();
      }
    }

    //This function adds the images pack
    function add() {
      console.log("test");
      rockImage.setPosition(200, 256);
      paperImage.setPosition(400, 256);
      scissorsImage.setPosition(600, 256);
    }

    //this function resets the sprites by moving them aways from the game
    function resetPosition() {
      opponentRockSprite.anims.play("rockF", true).setFlipX(true).setPosition(10500, 400);
      rockSprite.anims.play("rockF", true).setFlipX(true).setPosition(10500, 400);
      opponentPaperSprite.anims.play("opponentPaperF", true).setFlipX(true).setPosition(10500, 400);
      paperSprite.anims.play("paperF", true).setFlipX(true).setPosition(10500, 400);
      scissorsSprite.anims.play("scissorsF", true).setFlipX(true).setPosition(10005, 400);
      opponentScissorsSprite.anims.play("opponentScissorsF", true).setFlipX(true).setPosition(10005, 400);
    }


    //Ok so this is function is basically the base game. It has one parameter. If the user presses rock paper or scissors, it will become this functions parameter
    function rpsBaseGame(rockPaperOrScissors) {
      //This is an array that stores rock paper scissors. Basically, a random number is generated from 0-2. If it's 0, then rock is called. if its 1, then paper is called. if its 2, then scissors is called. 
      let opponentRPS = ["paper", "rock", "scissors"];
      let opponentChoice = opponentRPS[Math.round(Math.random() * 2)];
      console.log(opponentChoice);
      //The next several if and else statements basically compares the user clicked button to the random generated rock paper scissors. If you tie, "you tied" is returned. If you win, then "you win" is returned aswell as pScore and roundCount is added by 1. If you lose, "you lose" is returned aswell as oScore and roundCount is added by 1 
      if (rockPaperOrScissors == opponentChoice) {
        return "You tied! Round will be restarted!";
      }
      else if (opponentChoice == "scissors" && rockPaperOrScissors == "rock") {
        pScore++
        roundCount++
        return "You won!";
      }
      else if (opponentChoice == "scissors" && rockPaperOrScissors == "paper") {
        oScore++
        roundCount++
        return "You lost!";
      }
      else if (opponentChoice == "paper" && rockPaperOrScissors == "rock") {
        oScore++
        roundCount++
        return "You lost!";
      }
      else if (opponentChoice == "paper" && rockPaperOrScissors == "scissors") {
        pScore++
        roundCount++
        return "You won!";
      }
      else if (opponentChoice == "rock" && rockPaperOrScissors == "scissors") {
        oScore++
        roundCount++
        return "You lost!";
      }
      else if (opponentChoice == "rock" && rockPaperOrScissors == "paper") {
        pScore++
        roundCount++
        return "You won!";
      }
    }
  }
  //idk what this time delta stuff is. Mr krnic added it.
  update(time, delta) {
    this.bgGame.anims.play("bgGame1", true); //plays the background game sprite
    //Im not sure what's happening here
    elapsed = endTime - startTime;
    if (showAdd == false) {
      startTime = time;
    }
    else {
      endTime = time;
    }
    if (screenShake == true && showAdd == true && elapsed >= 2000 && roundCount != rounds) {
      this.cameras.main.shake(500);
      screenShake = false
      showAdd = false;
      rockImage.setPosition(200, 256);
      paperImage.setPosition(400, 256);
      scissorsImage.setPosition(600, 256);
      roundCountStringTemp = this.add.text(400, 100, roundCount.toString(), { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
      pScoreStringTemp = this.add.text(30, 175, pScore.toString(), { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
      oScoreStringTemp = this.add.text(750, 175, oScore.toString(), { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
      selectionTemp.setPosition(120, 50);

    }
    else if (showAdd == true && elapsed >= 2000 && roundCount != rounds) {
      showAdd = false;
      rockImage.setPosition(200, 256);
      paperImage.setPosition(400, 256);
      scissorsImage.setPosition(600, 256);
      roundCountStringTemp = this.add.text(400, 100, roundCount.toString(), { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
      pScoreStringTemp = this.add.text(30, 175, pScore.toString(), { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
      oScoreStringTemp = this.add.text(750, 175, oScore.toString(), { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
      selectionTemp.setPosition(120, 50);
    }
    else if (showAdd == true && elapsed >= 2000 && roundCount == rounds) {
      game.scene.start("endScene");
      game.scene.stop("gameScene");
    }
  }
}


/*********************START OF THE INSANE GAME SCENE*********************/
class insaneGameScene extends Phaser.Scene {
  constructor(config) {
    super(config);
  }

  preload() {
    this.load.audio("correct", "assets/audio/correct.mp3");
    this.load.audio("wrong", "assets/audio/wrong.mp3");
    this.load.audio("buttonClicked", "assets/audio/buttonClick.mp3");
    //This loads the panic audio
    this.load.audio("panic", "assets/audio/panicMusic.m4a");

    //These are all the sprites for the base game plus a unique background for the game. 
    this.load.spritesheet('rockMoving', 'assets/sprites/rock.png', { frameWidth: 200, frameHeight: 200 });
    this.load.spritesheet('opponentRockMoving', 'assets/sprites/rockOpponent.png', { frameWidth: 200, frameHeight: 200 });
    this.load.spritesheet('paperMoving', 'assets/sprites/paper.png', { frameWidth: 200, frameHeight: 200 });
    this.load.spritesheet('opponentPaperMoving', 'assets/sprites/paperOpponent.png', { frameWidth: 200, frameHeight: 200 });
    this.load.spritesheet('scissorsMoving', 'assets/sprites/scissors.png', { frameWidth: 200, frameHeight: 200 });
    this.load.spritesheet('opponentScissorsMoving', 'assets/sprites/scissorsOpponent.png', { frameWidth: 200, frameHeight: 200 });
    this.load.spritesheet('bgGame2', 'assets/sprites/backgroundGame.png', { frameWidth: 640, frameHeight: 464 });
    this.load.spritesheet('correctAnimation', 'assets/sprites/correct.png', { frameWidth: 200, frameHeight: 195 });
    this.load.spritesheet('wrongAnimation', 'assets/sprites/wrong.png', { frameWidth: 800, frameHeight: 600 });

    //These are the images of the pixelated rock paper and scissors
    this.load.image("rock", "assets/IMAGES/rock.png");
    this.load.image("paper", "assets/IMAGES/paper.png");
    this.load.image("scissors", "assets/IMAGES/scissors.png");
  }

  create() {
    //These are variables that are only necessary for the game. These includes the sprites of the rock paper and scissors
    let wrong;
    let correct;
    let correctAnimation;
    let rockSprite;
    let opponentRockSprite;
    let paperSprite;
    let opponentPaperSprite;
    let scissorsSprite;
    let opponentScissorsSprite;
    let userAnswer;

    //Array questions for insane mode
    let questionArray = ["Where is Argentina Located?", "What language do people in Brazil speak?", "What causes Earthquakes?", "Where is Mount Everest located?", "What is the most populated country in the world?", "How many states are in the USA", "What is the largest continent by area?", "How many French speaking countries are in the world?", "What is the only country in the world, that has it's name start with an O", "What is the largest ocean?", "What is the imaginary line in the middle of the earth called?", "What is the smallest country in the world?", "What country has the most islands in the world?", "What is the horizontal line in the globe called?", "What is the vertical line in the globe called", "What is the capital of Mexico?", "What country borders portugal?","How many countries does Bolivia border?","How many countries are inside the United Kingdom", "What is the capital of Canada"];
    let answerArray = ["south america", "portuguese", "tectonic plates", "nepal", "china", "50", "asia", "29", "oman", "pacific ocean", "the equator", "vatican city", "sweden", "latitude", "longitude", "mexico city", "spain", "5", "4","ottawa"];

    //this is the panic audio activation. Basically later in the code if your score is less then the opponents, it will activate
    let panic = 0;

    //sound declarations
    buttonClick = this.sound.add("buttonClicked");
    panicSound = this.sound.add("panic");
    wrong = this.sound.add("wrong");
    correct = this.sound.add("correct");

    //This is the background of the game scene. It has to be executed before all the other code. Otherwise, the background would overlap all the text. 
    this.anims.create({
      key: "bgGame3",
      frames: this.anims.generateFrameNumbers("bgGame2", {
        start: 0,
        end: 63
      }),
      frameRate: 21,
      repeat: 0
    });
    this.bgGame2 = this.add.sprite(400, 300, 'bgGame3').setScale(1.3);

    //These are all the text ouputed by the game
    selectionTemp = this.add.text(120, 50, selection, { fontFamily: "DM Sans,sans-serif", fontSize: 32, color: "#FFFFFF", textAlign: "center" })
    opponentTemp = this.add.text(700, 150, opponent, { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
    personTTemp = this.add.text(15, 150, person, { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
    if (roundCountStringTemp == null) {
      roundCountStringTemp = this.add.text(400, 100, roundCount.toString(), { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
    }
    if (pScoreStringTemp == null) {
      pScoreStringTemp = this.add.text(30, 175, pScore.toString(), { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
    }
    if (oScoreStringTemp == null) {
      oScoreStringTemp = this.add.text(750, 175, oScore.toString(), { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
    }




    //This makes the rock paper scissor images interactible 
    rockImage = this.physics.add.image(200, 240, "rock").setInteractive();
    paperImage = this.physics.add.image(400, 240, "paper").setInteractive();
    scissorsImage = this.physics.add.image(600, 240, "scissors").setInteractive();

    rockImage.setScale(0.5);
    paperImage.setScale(0.5);
    scissorsImage.setScale(0.4);

    this.anims.create({
      key: "wrongF",
      frames: this.anims.generateFrameNumbers("wrongAnimation", {
        start: 4,
        end: 74
      }),
      frameRate: 30,
      repeat: 0
    });
    wrongAnimation = this.add.sprite(1000, 400, 'wrongAnimation');

    this.anims.create({
      key: "correctF",
      frames: this.anims.generateFrameNumbers("correctAnimation", {
        start: 0,
        end: 19
      }),
      frameRate: 30,
      repeat: 0
    });
    correctAnimation = this.add.sprite(1000, 400, 'correctAnimation');

    //Rock sprite
    this.anims.create({
      key: "rockF",
      frames: this.anims.generateFrameNumbers("rockMoving", {
        start: 0,
        end: 31
      }),
      frameRate: 21,
      repeat: 0
    });
    rockSprite = this.add.sprite(10500, 400, 'rockMoving').setInteractive();

    //The opponents rock sprite
    this.anims.create({
      key: "opponentRockF",
      frames: this.anims.generateFrameNumbers("opponentRockMoving", {
        start: 0,
        end: 31
      }),
      frameRate: 21,
      repeat: 0
    });
    opponentRockSprite = this.add.sprite(10500, 400, 'opponentRockMoving').setInteractive();

    //Paper sprite
    this.anims.create({
      key: "paperF",
      frames: this.anims.generateFrameNumbers("paperMoving", {
        start: 0,
        end: 41
      }),
      frameRate: 21,
      repeat: 0
    });
    paperSprite = this.add.sprite(10500, 400, 'paperMoving').setInteractive();

    //The opponents paper sprite
    this.anims.create({
      key: "opponentPaperF",
      frames: this.anims.generateFrameNumbers("opponentPaperMoving", {
        start: 0,
        end: 41
      }),
      frameRate: 21,
      repeat: 0
    });
    opponentPaperSprite = this.add.sprite(10500, 400, 'opponentPaperMoving').setInteractive();

    //scissors sprite
    this.anims.create({
      key: "scissorsF",
      frames: this.anims.generateFrameNumbers("scissorsMoving", {
        start: 0,
        end: 42
      }),
      frameRate: 23,
      repeat: 0
    });
    scissorsSprite = this.add.sprite(10500, 400, 'opponentScissorsMoving').setInteractive();

    //the opponent scissors sprite
    this.anims.create({
      key: "opponentScissorsF",
      frames: this.anims.generateFrameNumbers("opponentScissorsMoving", {
        start: 0,
        end: 42
      }),
      frameRate: 18,
      repeat: 0
    });
    opponentScissorsSprite = this.add.sprite(10500, 400, 'opponentScissorsMoving').setInteractive();

    //This is when the user interacts with rock image
    rockImage.on("pointerdown", function(pointer) {
    });
    rockImage.on("pointerup", function(pointer) {
      //This destroys all the text in the game
      roundCountStringTemp.destroy();
      oScoreStringTemp.destroy();
      destroySprite();
      pScoreStringTemp.destroy();
      buttonClick.play();
      //resets the position of all sprites
      resetPosition();
      //takes the result of the rpsBaseGame function and puts it in the rps variable
      let rps = rpsBaseGame(rock);
      //Plays the rock sprite at the set position
      rockSprite.anims.play("rockF", true).setFlipX(true).setPosition(105, 500);
      //If the function says "you won" then it checks stoppanicmusic to see if your score exceed the opponents. If it doesnt, panic music continues to play. 
      if (rps == "You won!") {
        insaneModeQuestionGenerator(rps);
        stopPanicMusic();
        //Plays the sprite which you won from
        scissorsSprite.anims.play("scissorsF", true).setFlipX(false).setPosition(700, 500);
      }
      //If the function says "you lost" then it checks panicmusic to see if your score is less then the opponents. If it isnt, bgmusic continus to play. 
      else if (rps == "You lost!") {
        panicMusic();
        paperSprite.anims.play("paperF", true).setFlipX(false).setPosition(700, 500);
        screenShake = true; //shakes the screen to indicate you lost a point
      }
      //If the function say "you tied"
      else if (rps == "You tied! Round will be restarted!") {
        opponentRockSprite.anims.play("opponentRockF", true).setFlipX(false).setPosition(700, 500);
      }
      hideImages();
      showAdd = true;
    });

    //Refer to the rock comments for functionality
    paperImage.on("pointerdown", function(pointer) {
    });
    paperImage.on("pointerup", function(pointer) {
      roundCountStringTemp.destroy();
      oScoreStringTemp.destroy();
      destroySprite();
      pScoreStringTemp.destroy();
      buttonClick.play();
      resetPosition();
      let rps = rpsBaseGame(paper);
      paperSprite.anims.play("paperF", true).setFlipX(true).setPosition(105, 500);
      if (rps == "You won!") {
        insaneModeQuestionGenerator(rps);
        stopPanicMusic();
        rockSprite.anims.play("rockF", true).setFlipX(false).setPosition(700, 500);
      }
      else if (rps == "You lost!") {
        panicMusic();
        scissorsSprite.anims.play("scissorsF", true).setFlipX(false).setPosition(700, 500);
        screenShake = true;
      }
      else if (rps == "You tied! Round will be restarted!") {
        opponentRockSprite.anims.play("opponentPaperF", true).setFlipX(false).setPosition(700, 500);
      }
      hideImages();
      showAdd = true;
    });

    //Refer to the rock comments for functionality
    scissorsImage.on("pointerdown", function(pointer) {
    });
    scissorsImage.on("pointerup", function(pointer) {
      roundCountStringTemp.destroy();
      oScoreStringTemp.destroy();
      destroySprite();
      pScoreStringTemp.destroy();
      buttonClick.play();
      resetPosition();
      let rps = rpsBaseGame(scissors);
      scissorsSprite.anims.play("scissorsF", true).setFlipX(true).setPosition(105, 500);
      if (rps == "You won!") {
        insaneModeQuestionGenerator(rps);
        stopPanicMusic();
        paperSprite.anims.play("paperF", true).setFlipX(false).setPosition(700, 500);
      }
      else if (rps == "You lost!") {
        panicMusic();
        rockSprite.anims.play("rockF", true).setFlipX(false).setPosition(700, 500);
        screenShake = true;
      }
      else if (rps == "You tied! Round will be restarted!") {
        opponentScissorsSprite.anims.play("opponentScissorsF", true).setFlipX(false).setPosition(700, 500);
        screenShake = true;
      }
      hideImages();
      showAdd = true;
    });


    function insaneModeQuestionGenerator(rockPaperScissors) {
      let tempRandomNumber = 0;
      if (rockPaperScissors == "You won!") {
        tempRandomNumber = Math.round(Math.random() * 19);
        userAnswer = prompt(questionArray[tempRandomNumber]);
        if (answerArray[tempRandomNumber] != userAnswer.toLowerCase()) {
          oScore++
          pScore--
          wrong.play();
          wrongAnimation.anims.play("wrongF", true).setPosition(410, 145);
          wrongAnimation.setScale(0.1);
        }
        else {
          correct.play();
          correctAnimation.anims.play("correctF", true).setPosition(405, 145);
          correctAnimation.setScale(0.25);
        }
      }
    }

    //this function is hides all images
    function hideImages() {
      rockImage.setPosition(2000, 256);
      rockImage.setPosition(2000, 256);
      paperImage.setPosition(2000, 256);
      scissorsImage.setPosition(2000, 256);
      selectionTemp.setPosition(2000, 1);
    }

    function destroySprite() {
      correctAnimation.anims.play("correctF", true).setPosition(4005, 145);
      wrongAnimation.anims.play("wrongF", true).setPosition(4005, 145);
    }

    //this funtion checks to see if its applicable to play panic music
    function panicMusic() {
      panic++
      if (pScore < oScore && panic == 1) {
        bgMusic.pause();
        panicSound.play();
      }
    }

    //this function checks to see if its applicable to stop the panic music
    function stopPanicMusic() {
      panic = 0
      if (pScore >= oScore) {
        panicSound.stop();
        bgMusic.resume();
      }
    }

    //This function adds the images pack
    function add() {
      console.log("test");
      rockImage.setPosition(200, 256);
      paperImage.setPosition(400, 256);
      scissorsImage.setPosition(600, 256);
    }

    //this function resets the sprites by moving them aways from the game
    function resetPosition() {
      opponentRockSprite.anims.play("rockF", true).setFlipX(true).setPosition(10500, 400);
      rockSprite.anims.play("rockF", true).setFlipX(true).setPosition(10500, 400);
      opponentPaperSprite.anims.play("opponentPaperF", true).setFlipX(true).setPosition(10500, 400);
      paperSprite.anims.play("paperF", true).setFlipX(true).setPosition(10500, 400);
      scissorsSprite.anims.play("scissorsF", true).setFlipX(true).setPosition(10005, 400);
      opponentScissorsSprite.anims.play("opponentScissorsF", true).setFlipX(true).setPosition(10005, 400);
    }


    //Ok so this is function is basically the base game. It has one parameter. If the user presses rock paper or scissors, it will become this functions parameter
    function rpsBaseGame(rockPaperOrScissors) {
      //This is an array that stores rock paper scissors. Basically, a random number is generated from 0-2. If it's 0, then rock is called. if its 1, then paper is called. if its 2, then scissors is called. 
      let opponentRPS = ["paper", "rock", "scissors"];
      let opponentChoice = opponentRPS[Math.round(Math.random() * 2)];
      console.log(opponentChoice);
      //The next several if and else statements basically compares the user clicked button to the random generated rock paper scissors. If you tie, "you tied" is returned. If you win, then "you win" is returned aswell as pScore and roundCount is added by 1. If you lose, "you lose" is returned aswell as oScore and roundCount is added by 1 
      if (rockPaperOrScissors == opponentChoice) {
        oScore++
        roundCount++
        return "You tied! Round will be restarted!";
      }
      else if (opponentChoice == "scissors" && rockPaperOrScissors == "rock") {
        pScore++
        roundCount++
        return "You won!";
      }
      else if (opponentChoice == "scissors" && rockPaperOrScissors == "paper") {
        oScore++
        roundCount++
        return "You lost!";
      }
      else if (opponentChoice == "paper" && rockPaperOrScissors == "rock") {
        oScore++
        roundCount++
        return "You lost!";
      }
      else if (opponentChoice == "paper" && rockPaperOrScissors == "scissors") {
        pScore++
        roundCount++
        return "You won!";
      }
      else if (opponentChoice == "rock" && rockPaperOrScissors == "scissors") {
        oScore++
        roundCount++
        return "You lost!";
      }
      else if (opponentChoice == "rock" && rockPaperOrScissors == "paper") {
        pScore++
        roundCount++
        return "You won!";
      }
    }
  }
  //idk what this time delta stuff is. Mr krnic added it.
  update(time, delta) {
    this.bgGame2.anims.play("bgGame3", true); //plays the background game sprite
    //Im not sure what's happening here
    elapsed = endTime - startTime;
    if (showAdd == false) {
      startTime = time;
    }
    else {
      endTime = time;
    }
    if (screenShake == true && showAdd == true && elapsed >= 2000 && roundCount != rounds) {
      this.cameras.main.shake(500);
      screenShake = false
      showAdd = false;
      rockImage.setPosition(200, 256);
      paperImage.setPosition(400, 256);
      scissorsImage.setPosition(600, 256);
      roundCountStringTemp = this.add.text(400, 100, roundCount.toString(), { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
      pScoreStringTemp = this.add.text(30, 175, pScore.toString(), { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
      oScoreStringTemp = this.add.text(750, 175, oScore.toString(), { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
      selectionTemp.setPosition(120, 50);

    }
    else if (showAdd == true && elapsed >= 2000 && roundCount != rounds) {
      showAdd = false;
      rockImage.setPosition(200, 256);
      paperImage.setPosition(400, 256);
      scissorsImage.setPosition(600, 256);
      roundCountStringTemp = this.add.text(400, 100, roundCount.toString(), { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
      pScoreStringTemp = this.add.text(30, 175, pScore.toString(), { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
      oScoreStringTemp = this.add.text(750, 175, oScore.toString(), { fontFamily: "DM Sans,sans-serif", fontSize: 20, color: "#FFFFFF", textAlign: "center" })
      selectionTemp.setPosition(120, 50);
    }
    else if (showAdd == true && elapsed >= 2000 && roundCount == rounds) {
      this.bgGame2.destroy();
      game.scene.start("endScene");
      game.scene.stop("insaneGameScene");
    }
  }
}

//END SCENE
class endScene extends Phaser.Scene {
  constructor(config) {
    super(config);
  }
  preload() {
    this.load.image("replay", "assets/IMAGES/replay.png");

    this.load.audio("buttonClicked", "assets/audio/buttonClick.mp3");
    this.load.audio("victory", "assets/audio/victory.mp3");
    this.load.audio("defeat", "assets/audio/defeat.mp3");
  }
  create() {
    let replayButton;
    let victory = "You won! \n Replay?";
    let defeat = "You lost! \nReplay?";


    nameArray.push(person);
    pScoreArray.push(pScore);
    oScoreArray.push(oScore);
    roundsArray.push(rounds);
    tempArray.push(pScore);

    selectionTemp = "";
    opponentTemp = "";
    personTTemp = "";
    roundCountStringTemp = "";
    pScoreStringTemp = "";
    oScoreStringTemp = "";

    replayCount++

    replayButton = this.physics.add.image(410, 460, "replay").setInteractive();
    // console.log(person);
    // console.log(pScore);
    // console.log(oScore);
    // console.log(rounds);
    if (replayCount >= 1) {
      document.getElementById('PlayerName1').innerHTML = nameArray[pScoreArray.indexOf(NumberSorted(tempArray)[0])];
      document.getElementById('PlayerWins1').innerHTML = pScoreArray[pScoreArray.indexOf(NumberSorted(tempArray)[0])];
      document.getElementById('PlayerLosses1').innerHTML = oScoreArray[pScoreArray.indexOf(NumberSorted(tempArray)[0])];
      document.getElementById('RoundsPlayed1').innerHTML = roundsArray[pScoreArray.indexOf(NumberSorted(tempArray)[0])];
      if (PlayerName1 != person) {
        document.getElementById('PlayerName1').innerHTML = nameArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[0])];
        document.getElementById('PlayerWins1').innerHTML = pScoreArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[0])];
        document.getElementById('PlayerLosses1').innerHTML = oScoreArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[0])];
        document.getElementById('RoundsPlayed1').innerHTML = roundsArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[0])];
      }
    }
    if (replayCount >= 2) {
      document.getElementById('PlayerName2').innerHTML = nameArray[pScoreArray.indexOf(NumberSorted(tempArray)[1])];
      document.getElementById('PlayerWins2').innerHTML = pScoreArray[pScoreArray.indexOf(NumberSorted(tempArray)[1])];
      document.getElementById('PlayerLosses2').innerHTML = oScoreArray[pScoreArray.indexOf(NumberSorted(tempArray)[1])];
      document.getElementById('RoundsPlayed2').innerHTML = roundsArray[pScoreArray.indexOf(NumberSorted(tempArray)[1])];
      if (PlayerName2 != person) {
        document.getElementById('PlayerName2').innerHTML = nameArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[1])];
        document.getElementById('PlayerWins2').innerHTML = pScoreArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[1])];
        document.getElementById('PlayerLosses2').innerHTML = oScoreArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[1])];
        document.getElementById('RoundsPlayed2').innerHTML = roundsArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[1])];
      }
    }
    if (replayCount >= 3) {
      document.getElementById('PlayerName3').innerHTML = nameArray[pScoreArray.indexOf(NumberSorted(tempArray)[2])];
      document.getElementById('PlayerWins3').innerHTML = pScoreArray[pScoreArray.indexOf(NumberSorted(tempArray)[2])];
      document.getElementById('PlayerLosses3').innerHTML = oScoreArray[pScoreArray.indexOf(NumberSorted(tempArray)[2])];
      document.getElementById('RoundsPlayed3').innerHTML = roundsArray[pScoreArray.indexOf(NumberSorted(tempArray)[2])];
      if (PlayerName3 != person) {
        document.getElementById('PlayerName3').innerHTML = nameArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[2])];
        document.getElementById('PlayerWins3').innerHTML = pScoreArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[2])];
        document.getElementById('PlayerLosses3').innerHTML = oScoreArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[2])];
        document.getElementById('RoundsPlayed3').innerHTML = roundsArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[2])];
      }
    }
    if (replayCount >= 4) {
      document.getElementById('PlayerName4').innerHTML = nameArray[pScoreArray.indexOf(NumberSorted(tempArray)[3])];
      document.getElementById('PlayerWins4').innerHTML = pScoreArray[pScoreArray.indexOf(NumberSorted(tempArray)[3])];
      document.getElementById('PlayerLosses4').innerHTML = oScoreArray[pScoreArray.indexOf(NumberSorted(tempArray)[3])];
      document.getElementById('RoundsPlayed4').innerHTML = roundsArray[pScoreArray.indexOf(NumberSorted(tempArray)[3])];
      if (PlayerName4 != person) {
        document.getElementById('PlayerName4').innerHTML = nameArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[3])];
        document.getElementById('PlayerWins4').innerHTML = pScoreArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[3])];
        document.getElementById('PlayerLosses4').innerHTML = oScoreArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[3])];
        document.getElementById('RoundsPlayed4').innerHTML = roundsArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[3])];
      }
    }
    if (replayCount >= 5) {
      document.getElementById('PlayerName5').innerHTML = nameArray[pScoreArray.indexOf(NumberSorted(tempArray)[4])];
      document.getElementById('PlayerWins5').innerHTML = pScoreArray[pScoreArray.indexOf(NumberSorted(tempArray)[4])];
      document.getElementById('PlayerLosses5').innerHTML = oScoreArray[pScoreArray.indexOf(NumberSorted(tempArray)[4])];
      document.getElementById('RoundsPlayed5').innerHTML = roundsArray[pScoreArray.indexOf(NumberSorted(tempArray)[4])];
      if (PlayerName1 != person) {
        document.getElementById('PlayerName5').innerHTML = nameArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[4])];
        document.getElementById('PlayerWins5').innerHTML = pScoreArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[4])];
        document.getElementById('PlayerLosses5').innerHTML = oScoreArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[4])];
        document.getElementById('RoundsPlayed5').innerHTML = roundsArray[pScoreArray.lastIndexOf(NumberSorted(tempArray)[4])];
      }
    }
    buttonClick = this.sound.add("buttonClicked")

    replayButton.on("pointerdown", function(pointer) {
      this.setTint(925252);
    });//end of pointerdown event
    replayButton.on("pointerup", function(pointer) {
      buttonClick.play();
      this.clearTint();
      pScore = 0
      oScore = 0
      person = "";
      rounds = 0;
      roundCount = 0
      roundCountString = ""
      game.scene.start("initialScene");
      game.scene.stop("endScene");
    });


    if (pScore > oScore) {
      victory = this.add.text(340, 50, victory, { fontFamily: "DM Sans,sans-serif", fontSize: 32, color: "#FFFFFF", textAlign: "center" })
      this.victory = this.sound.play("victory")
      bgMusic.stop();
    }
    if (pScore < oScore) {
      defeat = this.add.text(340, 50, defeat, { fontFamily: "DM Sans,sans-serif", fontSize: 32, color: "#FFFFFF", textAlign: "center" })
      this.defeat = this.sound.play("defeat")
      panicSound.stop();
      bgMusic.stop();
    }
    function NumberSorted(array) {
      for (let x = 0; x < array.length; x++) { //Passes through the list of array index
        for (let y = 0; y <= array.length - 2; y++) { //This is used to compaire paires
          if (array[y] < array[y + 1]) {
            let tempvar = array[y]; //Create a temporary variable, that stores the number being switched. If this variable wasn't here, the number being switched will be lost.
            array[y] = array[y + 1]
            array[y + 1] = tempvar;
          }
        }
      }
      return array;
    }
  }

  update() {
    
    }
    
  }

var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
};
var game = new Phaser.Game(config);
game.scene.add("initialScene", initializingScene)
game.scene.add("startScene", startScene);
game.scene.add("menuScene", menuScene);
game.scene.add("gameScene", gameScene);
game.scene.add("insaneGameScene", insaneGameScene);
game.scene.add("endScene", endScene);
game.scene.start("initialScene");
// game.scene.start("endScene");

