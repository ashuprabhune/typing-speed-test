const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var timerInvalid = false;
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZeros(time){
  if(time <= 9){
    time = "0" + time;
  }
  return time;
}

// Run a standard minute/second/hundredths timer:


// Match the text entered with the provided text on the page:
function matchText(){
  let enteredText = testArea.value;
  let origText =  originText.substring(0,enteredText.length);
  if(enteredText == originText){
    testWrapper.style.borderColor = "#32CD32"
    clearInterval(interval);
    timerInvalid = true;
  }else{
    if(enteredText == origText){
      testWrapper.style.borderColor = "#65CCf3";
    }else {
      testWrapper.style.borderColor = "#FF0000";
    }

  }
}

// Start the timer:

function runTimer(){
  let currentTime = leadingZeros(timer[0]) + ":" + leadingZeros(timer[1]) + ":" + leadingZeros(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;
  timer[0] = Math.floor((timer[3]/100)/60);
  timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));

}
function start(){
  let textEntered =  testArea.value.length;
  if(textEntered === 0 && !timerInvalid){
    interval = setInterval(runTimer,10);
  }
}

// Reset everything:
function resetTimer(){
  theTimer.innerHTML = "00:00:00"
  testWrapper.style.borderColor = "grey"
  testArea.value = ""
  clearInterval(interval);
  interval = null
  //interval = null
  //let currentTime = timer[0] + ":" + timer[1] + ":" + timer[2];
  //theTimer.innerHTML = currentTime;
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",start,false);
testArea.addEventListener("keyup",matchText,false);
resetButton.addEventListener("click",resetTimer, false);
