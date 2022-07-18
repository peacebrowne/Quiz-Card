
const infoDiv = document.querySelector('#infoDiv');
const gameDiv = document.querySelector('#gameDiv')
const playAginBtn = document.getElementById('playAginBtn')
const startBtn = document.getElementById('stBtn');
const score = document.querySelector('#score')
const restartBtn = document.getElementById('restartBtn')
startBtn.addEventListener('click',displayIn)
   

function displayIn(){
    infoDiv.style.display = 'none'
    startBtn.style.display = 'none'
    gameDiv.style.display = 'block';
    playAginBtn.style.display = 'block'
    score.style.display = 'block'
    restartBtn.style.display = 'block'
}

function displayOut() {
    score.style.display = 'none'
    gameDiv.style.display = 'none';
    restartBtn.style.display = 'none'
    playAginBtn.style.display = 'none'
    startBtn.style.display = 'block'
    infoDiv.style.display = 'block';
}

const chartToPlayWith = document.querySelectorAll('.chartToPlayWith');
var tableData = document.querySelectorAll('table tr td');

chartToPlayWith.forEach((character) => {
    character.addEventListener('click',(player) => {
        character.style.backgroundColor = 'yellow'
        let letter = player.target.textContent;
        let boxes = document.querySelectorAll('.box');
        boxes.forEach((box) => {
            box.addEventListener('click',(e) => {
                let slot = e.target;
                slot.textContent = letter;
                let randomNumber = Math.floor(Math.random() * tableData.length);
                if(tableData[randomNumber].textContent === ''){
                    if(letter === 'x'){
                        tableData[randomNumber].textContent = 'o'
                    }
                    else {
                        tableData[randomNumber].textContent = 'x'
                    }
                } 
                else if (tableData[randomNumber].textContent != ''){
                   for(let i = 0; i <= tableData.length; i++){
                        var secondRandom =  Math.floor(Math.random() * tableData.length)
                        if(tableData[secondRandom].textContent === ''){
                            if(letter === 'x'){
                                tableData[secondRandom].textContent = 'o'
                                break
                            }
                            else {
                                tableData[secondRandom].textContent = 'x'
                                break
                            }
                        } 
                    }
                }

                for(let i = 0; i < tableData.length; i++){
    // box 1,2 and 3                     
                    if(box1.textContent == letter && box2.textContent == letter && box3.textContent == letter){
                        box1.style.backgroundColor = 'green'
                        box2.style.backgroundColor = 'green'
                        box3.style.backgroundColor = 'green'
                        document.getElementById('youWin').style.display = 'block'
                        scores()
                        break;
                    } 
                    else if(letter == 'x' || 'o'){
                        if(box1.textContent == 'x' && box2.textContent == 'x' && box3.textContent == 'x'){
                            box1.style.backgroundColor = 'red'
                            box2.style.backgroundColor = 'red'
                            box3.style.backgroundColor = 'red'
                            document.getElementById('youLoose').style.display = 'block'
                            scores()
                            break;

                        } else if(box1.textContent == 'o' && box2.textContent == 'o' && box3.textContent == 'o'){
                            box1.style.backgroundColor = 'red'
                            box2.style.backgroundColor = 'red'
                            box3.style.backgroundColor = 'red'
                            document.getElementById('youLoose').style.display = 'block'
                            scores()
                            break;
                        }
                    }
    
    // Box 4,5 and 6
                    if(box4.textContent == letter && box5.textContent == letter && box6.textContent == letter){
                        box4.style.backgroundColor = 'green'
                        box5.style.backgroundColor = 'green'
                        box6.style.backgroundColor = 'green'
                        document.getElementById('youWin').style.display = 'block'
                        scores()
                        break;
                    } 
                    else if(letter == 'x' || 'o'){
                        if(box4.textContent == 'x' && box5.textContent == 'x' && box6.textContent == 'x'){
                            box4.style.backgroundColor = 'red'
                            box5.style.backgroundColor = 'red'
                            box6.style.backgroundColor = 'red'
                            document.getElementById('youLoose').style.display = 'block'
                            scores()
                            break;
                        } else if(box4.textContent == 'o' && box5.textContent == 'o' && box6.textContent == 'o'){
                            box4.style.backgroundColor = 'red'
                            box5.style.backgroundColor = 'red'
                            box6.style.backgroundColor = 'red'
                            document.getElementById('youLoose').style.display = 'block'
                            scores()
                            break;
                        }
                    }

    // Box 7,8 and 9
                    if(box7.textContent == letter && box8.textContent == letter && box9.textContent == letter){
                        box7.style.backgroundColor = 'green'
                        box8.style.backgroundColor = 'green'
                        box9.style.backgroundColor = 'green'
                        document.getElementById('youWin').style.display = 'block'
                        scores()
                        break;
                    } 
                    else if(letter == 'x' || 'o'){
                        if(box7.textContent == 'x' && box8.textContent == 'x' && box9.textContent == 'x'){
                            box7.style.backgroundColor = 'red'
                            box8.style.backgroundColor = 'red'
                            box9.style.backgroundColor = 'red'
                            document.getElementById('youLoose').style.display = 'block'
                            scores()
                        break;
                        } else if(box7.textContent == 'o' && box8.textContent == 'o' && box9.textContent == 'o'){
                            box7.style.backgroundColor = 'red'
                            box8.style.backgroundColor = 'red'
                            box9.style.backgroundColor = 'red'
                            document.getElementById('youLoose').style.display = 'block'
                            scores()
                        break;
                        }
                    }

    // Box 1,4 and 7                
                    if(box1.textContent == letter && box4.textContent == letter && box7.textContent == letter){
                        box1.style.backgroundColor = 'green'
                        box4.style.backgroundColor = 'green'
                        box7.style.backgroundColor = 'green'
                        document.getElementById('youWin').style.display = 'block'
                        scores()
                        break;
                    } 
                    else if(letter == 'x' || 'o'){
                        if(box1.textContent == 'x' && box4.textContent == 'x' && box7.textContent == 'x'){
                                box1.style.backgroundColor = 'red'
                                box4.style.backgroundColor = 'red'
                                box7.style.backgroundColor = 'red'
                                document.getElementById('youLoose').style.display = 'block'
                                scores()
                                break;
                        } else if(box1.textContent == 'o' && box4.textContent == 'o' && box7.textContent == 'o'){
                                box1.style.backgroundColor = 'red'
                                box4.style.backgroundColor = 'red'
                                box7.style.backgroundColor = 'red'
                                document.getElementById('youLoose').style.display = 'block'
                                scores()
                                break;
                            }
                    }
    
    // Box 2,5 and 8
                    if(box2.textContent == letter && box5.textContent == letter && box8.textContent == letter){
                        box2.style.backgroundColor = 'green'
                        box5.style.backgroundColor = 'green'
                        box8.style.backgroundColor = 'green'
                        document.getElementById('youWin').style.display = 'block'
                        scores()
                        break;
                    } 
                    else if(letter == 'x' || 'o'){
                        if(box2.textContent == 'x' && box5.textContent == 'x' && box8.textContent == 'x'){
                            box2.style.backgroundColor = 'red'
                            box5.style.backgroundColor = 'red'
                            box8.style.backgroundColor = 'red'
                            document.getElementById('youLoose').style.display = 'block'
                            scores()
                            break;
                        } else if(box2.textContent == 'o' && box5.textContent == 'o' && box8.textContent == 'o'){
                                box2.style.backgroundColor = 'red'
                                box5.style.backgroundColor = 'red'
                                box8.style.backgroundColor = 'red'
                                document.getElementById('youLoose').style.display = 'block'
                                scores()
                                break;
                            }
                    }
    
    // Box 3,6 and 9
                    if(box3.textContent == letter && box6.textContent == letter && box9.textContent == letter){
                            box3.style.backgroundColor = 'green'
                            box6.style.backgroundColor = 'green'
                            box9.style.backgroundColor = 'green'
                            document.getElementById('youWin').style.display = 'block'
                            scores()
                            break;
                    } 
                    else if(letter == 'x' || 'o'){
                       if(box3.textContent == 'x' && box6.textContent == 'x' && box9.textContent == 'x'){
                            box3.style.backgroundColor = 'red'
                            box6.style.backgroundColor = 'red'
                            box9.style.backgroundColor = 'red'
                            document.getElementById('youLoose').style.display = 'block'
                            scores()
                            break;
                        } else if(box3.textContent == 'o' && box6.textContent == 'o' && box9.textContent == 'o'){
                            box3.style.backgroundColor = 'red'
                            box6.style.backgroundColor = 'red'
                            box9.style.backgroundColor = 'red'
                            document.getElementById('youLoose').style.display = 'block'
                            scores()
                            break;
                            }
                        }

    // Box 1,5 and 9
                        if(box1.textContent == letter && box5.textContent == letter && box9.textContent == letter){
                            box1.style.backgroundColor = 'green'
                            box5.style.backgroundColor = 'green'
                            box9.style.backgroundColor = 'green'
                            document.getElementById('youWin').style.display = 'block'
                            scores()
                            break;
                        } 
                        else if(letter == 'x' || 'o'){
                            if(box1.textContent == 'x' && box5.textContent == 'x' && box9.textContent == 'x'){
                                box1.style.backgroundColor = 'red'
                                box5.style.backgroundColor = 'red'
                                box9.style.backgroundColor = 'red'
                                document.getElementById('youLoose').textContent = 'You Loose!!'
                                scores()
                                break;
                            } else if(box1.textContent == 'o' && box5.textContent == 'o' && box9.textContent == 'o'){
                                box1.style.backgroundColor = 'red'
                                box5.style.backgroundColor = 'red'
                                box9.style.backgroundColor = 'red'
                                document.getElementById('youLoose').style.display = 'block'
                                scores()
                                break;
                            }
                        }

    // Box 3,5 and 7
                        if(box3.textContent == letter && box5.textContent == letter && box7.textContent == letter){
                            box3.style.backgroundColor = 'green'
                            box5.style.backgroundColor = 'green'
                            box7.style.backgroundColor = 'green'
                            document.getElementById('youWin').style.display = 'block'
                            scores()
                            break;
                        } 
                        else if(letter == 'x' || 'o'){
                            if(box3.textContent == 'x' && box5.textContent == 'x' && box7.textContent == 'x'){
                                box3.style.backgroundColor = 'red'
                                box5.style.backgroundColor = 'red'
                                box7.style.backgroundColor = 'red'
                                document.getElementById('youLoose').style.display = 'block'
                                scores()
                                break;
                            } else if(box3.textContent == 'o' && box5.textContent == 'o' && box7.textContent == 'o'){
                                box3.style.backgroundColor = 'red'
                                box5.style.backgroundColor = 'red'
                                box7.style.backgroundColor = 'red'
                                document.getElementById('youLoose').style.display = 'block'
                                scores()
                                break;
                            }
                        }
                       
                    }
            });
        });
    });
});



const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const box3 = document.getElementById('box3');
const box4 = document.getElementById('box4');
const box5 = document.getElementById('box5');
const box6 = document.getElementById('box6');
const box7 = document.getElementById('box7');
const box8 = document.getElementById('box8');
const box9 = document.getElementById('box9');


// A function that play the game over
var playAgin = () => {
    tableData.forEach((box) => {
        if(box.textContent == 'x'){
            box.textContent = ''
            box.style.backgroundColor = 'white'
        } else if(box.textContent == 'o'){
            box.textContent = ''
            box.style.backgroundColor = 'white'
        }
        document.getElementById('youWin').style.display = 'none'
        document.getElementById('youLoose').style.display = 'none'
    })
}

playAginBtn.addEventListener('click', playAgin)

let winScore = document.querySelector('#score #winScore span')
let looseScore = document.querySelector('#score #looseScore span');
let incrementWinScore = 0;
let incrementLooseScore = 0;
 
// A function that keeps track of both the player and the computer scores
function scores (){
    if(document.getElementById('youWin').style.display == 'block'){
         incrementWinScore++
         winScore.textContent = incrementWinScore
    }
    else if(document.getElementById('youLoose').style.display == 'block'){
        incrementLooseScore++
        looseScore.textContent = incrementLooseScore
    }
}

// A function that alert if the game tied
function gameTied(){
    var count = 0;
    for(let i = 0; i <= tableData.length; i++){
     if(tableData[i].textContent == 'x'){
         count++
     } else if(tableData[i].textContent == 'o'){
         count++
     }

     if(count == tableData.length){
         if(document.getElementById('youWin').style.display !== 'block'){
             document.getElementById('youWin').textContent = 'Game Tied!!'
             document.getElementById('youWin').style.fontSize = '40px'
             document.getElementById('youWin').style.display = 'block'
         }
     }
 }
}

// A function that restart the game
function resetGame () {
    location.reload()
}

restartBtn.addEventListener('click',resetGame)