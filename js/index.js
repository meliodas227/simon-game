var arr = new Array("green", "red", "yellow", "blue");
var seq = new Array();
var userSeq = new Array();
var level = 0;
var started = false;
function nextSequence(){
  level++;
  userSeq=[];
  var randomNum = Math.floor(Math.random()*4);
  $("#"+arr[randomNum]).animate({opacity:0.5},150).animate({opacity:1},150);
  var audio = new Audio("sounds/"+arr[randomNum]+".mp3");
  audio.play();;
  seq.push(arr[randomNum]);
  $("#level-title").text("round "+level);
}
function playing(color,dist){
$(color).click(()=>{
  $(color).animate({opacity:0.5},150).animate({opacity:1},150);
  var audio = new Audio(dist);
  audio.play();
});
}

playing("#green", "sounds/green.mp3");
playing("#blue", "sounds/blue.mp3");
playing("#red", "sounds/red.mp3");
playing("#yellow", "sounds/yellow.mp3");

if(!started){
  $("body").keypress(()=>{
    $("h1").text("round "+level);
    started = true;
    setTimeout(function () {
          nextSequence();
        }, 1000);
  })
}



  $(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userSeq.push(userChosenColour);

    playing(userChosenColour);
    checkAnswer(userSeq.length-1);
  });
function checkAnswer(currentLevel) {

    if (seq[currentLevel] === userSeq[currentLevel]) {
      if (userSeq.length === seq.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
 else {
     var aud = new Audio("sounds/wrong.mp3");
     aud.play();
     $("body").addClass("game-over");
     $("#level-title").text("Game Over, Press Any Key to Restart");

     setTimeout(function () {
       $("body").removeClass("game-over");
     }, 200);
     level = 0;
     seq = [];
     started=false;
  }
}
