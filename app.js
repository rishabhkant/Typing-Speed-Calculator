const sentences = `The quick brown fox jumps over the lazy dog . Sphinx of black quartz , judge my vow . Pack my box with five dozen liquor jugs . How vexingly quick daft zebras jump !`;
// const sentences = `As you can see in the title this is "A very hard typing test text." Someone must have the worldwide record as at least 60 seconds to he put up on my typing test wall! I will be checking this page every day to see if someone got this score. Most likely I will! Me! It's very fun making these types of elaborate things because you can write whatever you want! And input commonly mispeled words! As you probably noticed by now, that mistake was on purpose. Or was it? Do your best! I will do my best. Believe in yourself.`

const sentenceElement = document.getElementById("sentence");
const inputElement = document.getElementById("input");
const startButton = document.getElementById("start-btn");
const timerElement = document.getElementById("timer");
const speedElement = document.getElementById("speed");
const accuracyElement = document.getElementById("accuracy");
const resultElement = document.getElementById("result");
const retryButton = document.getElementById("retry-btn");



startButton.addEventListener('click' ,()=>{
    start();
})

function start(){
    startButton.disabled = true;
    resultElement.style.display = "none";
    sentenceElement.textContent = sentences;
    inputElement.value = '';
    inputElement.disabled = false;
    inputElement.focus();
    time = 30;
    timerElement.textContent = `00:${time}`;
}
let time = 30;
let timeEl;
let timeoutEl;

inputElement.addEventListener("input", () => timer(), { once: true });

function timer(){
    // time = 6;
    timerElement.textContent = `00:${time}`;

    timeEl = setInterval(() => {
    time--;
    
    if(time >= 0){
        timerElement.textContent = `00:${time}`;
    }
  }, 1000);

  timeoutEl = setTimeout(() => {
    endedTimer();
  }, 30000);

}



retryButton.addEventListener('click', ()=>{
    clearTimeout(timeoutEl);
    clearInterval(timeEl);
    startButton.disabled = false;
    resultElement.style.display = "none";
    inputElement.value = '';
    time = 30;
    timerElement.textContent = `00:${time}`;
    inputElement.disabled = true;
})


function endedTimer(){
    clearTimeout(timeoutEl);
    clearInterval(timeEl);
    inputElement.disabled = true;
    startButton.disabled = true;
    timerElement.textContent = `00:00`;
    sentenceElement.textContent = '';
    resultElement.style.display = "block";
    accuracy();
}



function accuracy(){
    let correctWords = 0;
    const refernce = inputElement.value.toLowerCase();
    const original = sentences.toLowerCase();
    const totalOrg = original.trim().split(/\s+/).length;

    for(let i = 0; i < refernce.length; i++){
        let tempWord = refernce.split(' ')[i];
        if(original.includes(tempWord)){
            correctWords++;
        }
    }

    let wpm = ( correctWords / 30) * 60;
    let acc = ( correctWords / totalOrg ) * 100;

    speedElement.textContent = wpm.toFixed(2);
    accuracyElement.textContent = acc.toFixed(2);
    
    // console.log(correctWords);
    // console.log(refernce.length);
    // console.log(original.length);
}

