//Game Values
let min=1,
    max=10,
    winningNum=getRandomNum(min,max),
    guessesLeft=3;

//UI Elements
const game=document.querySelector('#game'),
      minNum=document.querySelector('.min-num'),
      maxNum=document.querySelector('.max-num'),
      guessBtn=document.querySelector('#guess-btn'),
      guessInput=document.querySelector('#guess-input'),
      message=document.querySelector('.message');

//Assign UI min and max

minNum.textContent=min;
maxNum.textContent=max;

//Play Again event listener=Event Delegation
game.addEventListener('mousedown',function(e){
    
    if(e.target.className==='play-again'){
        window.location.reload();
    }

    
});

//Listen for guess
guessBtn.addEventListener('click',function(){

    let guess=parseInt(guessInput.value);
    
    //Validate
    if(isNaN(guess) || guess<min || guess>max) {

        setMessage(`Please enter a number between 
        ${min} and ${max}`,'red');//function called
    }
    else{
      //Check if won
    if(guess===winningNum){

       gameOver(true,`${winningNum} is correct, YOU WIN!`);//function called
       
    }
    else{
      //Wrong number
      guessesLeft-= 1;//guessesLeft=guessesLeft-1;

      if(guessesLeft===0){
          //Game over-lost
          
         gameOver(false, `Game over, you lost. 
         The correct number is ${winningNum}`);
      }
      
      else{
          //Game continues - answer wrong

          //Change border color
          guessInput.style.borderColor='red';

          //Clear input
          guessInput.value='';

          //Tell user its the wrong number
          setMessage(`${guess} is not correct, ${guessesLeft} is
          guesses left`,'red');
   
      }  
    }
    
    }
});

//Game over
function gameOver(won,msg){
    let color;
    won === true ? color ='green' : color='red';

    //Disable input
    guessInput.disabled=true;
    //Change border color
    guessInput.style.borderColor=color;
    //Set text color
    message.style.color=color;
    //Set message
    setMessage(msg);

    //Play Again?
    guessBtn.value='Play Again';
    guessBtn.className = 'play-again';//guessBtn.className += 'play-again';



}

//Get random number
function getRandomNum(min,max){

    //Math.random() fonksiyonu her zaman 1'den küçük float sayılar üretir.
    return(Math.floor(Math.random()*(max-min+1)+min));

}


//Set message
function setMessage(msg,color){//function  defined
    message.style.color=color;
    message.textContent=msg;
}

