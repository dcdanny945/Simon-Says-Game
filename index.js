const buttonColours =["red", "blue", "green", "yellow"];
let gamePattern =[];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

$(document).keypress(function(){
   if(!gameStarted){
      $("#level-title").text("Level "+ level);
      nextSequence();
      gameStarted = true; 
   }
});


 $(".btn").click(function(){
    const userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSounds(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
 });


 function checkAnswer(){
   for(let i = 0; i < userClickedPattern.length; i++){
      if (userClickedPattern[i]!== gamePattern[i]){
         console.log("wrong");
         const audio = new Audio("sounds/wrong.mp3");
         audio.play();
         $("body").addClass("game-over");
         setTimeout(() => {
            $("body").removeClass("game-over");
         }, 200);
         $("h1").text("Game Over, Press Any Key to Restart");
         startOver();
         return; // if there is a thing not matched jump out from the function
      }
      
   }
   console.log("success");
   if (userClickedPattern.length ===  gamePattern.length){ // why doen't need to check the i in array again?
      setTimeout(() => {
         nextSequence()
      }, 1000);
   }
}

 function nextSequence(){
   userClickedPattern = [];
   level++;
   $("#level-title").text("Level "+level)
 const randomNumber = Math.floor(Math.random()*4);
 const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
 playSounds(randomChosenColour);
}

function playSounds(colorGotChosen){
   const audio = new Audio("sounds/"+ colorGotChosen +".mp3"); // taking input from playSounds(userChosenColour), to be the same input on file name".mp3"
   audio.play();
}

function animatePress(animatedColour){
   $("#"+ animatedColour).addClass("pressed");
   
      setTimeout(function(){
         $("#"+animatedColour).removeClass("pressed");
      },100)
   }


function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = false;
}



// // Practice Run

// const  buttonColorFromHTMML =["red", "blue", "green", "yellow"];
// let userClickColorArray = [];
// let gameRandomColorArray = [];
// let started = false; 
// let level1 = 0;

// function randomGameColor(){
//    userClickColorArray = [];
//    level1 ++;
//    const randomNumber1 =Math.floor(Math.random()*4);
//    gameRandomColror = buttonColorFromHTMML[randomNumber1];
//    gameRandomColorArray.push(gameRandomColor);
//    buttonsPlaySound(gameRandomColor);
//    buttonsAnimatedColors(gameRandomColor);
// }

// $(document).keypress(function(){
//    if(!started){
//       $("#level-title").text("Level "+ level1);
//    }
//    randomGameColor();
//    started = true;
// })

// $(".btn").click(function(){
//   let ColorGotClicked = $(this).attr("id");
//   buttonsAnimatedColors(ColorGotClicked);
//   buttonsPlaySound(ColorGotClicked);
//   checkAnswer1();
// })


// function buttonsPlaySound(colorToPlaySound){
//    const audio = new Audio ("sounds/"+ colorToPlaySound + ".mp3");
//    audio.play();
// }

// function buttonsAnimatedColors(animatedColors){
//    $("#"+animatedColors).addClass("pressed");
//    setTimeout(function(){
//       $("#"+animatedColors).removeClass("pressed");
//    },100)
// }

// function checkAnswer1(){
//    for( let i = 0; i< userClickColorArray; i++){
//       if(userClickColorArray[i] !== gameRandomColorArray[i]){
//          console.log("wrong");
//          return;
//       }
//    }
//       console.log("success");
//       if(userClickColorArray.length === gameRandomColorArray){
//          setTimeout(() => {
//             randomGameColor();
//          }, 1000);
//       }
//    }
// }