
function btnNine(){
    var btnNine = document.querySelector('#btnNine').textContent;
            document.querySelector('#demo').value += btnNine;
}

function btnEight(){
    var btnEight= document.querySelector('#btnEight').textContent;
   document.querySelector('#demo').value += btnEight; 
}

function btnSeven(){
    var btnSeven= document.querySelector('#btnSeven').textContent;
   document.querySelector('#demo').value += btnSeven; 
}

function btnSix(){
    var btnSix= document.querySelector('#btnSix').textContent;
   document.querySelector('#demo').value += btnSix; 
}

function btnFive(){
    var btnFive= document.querySelector('#btnFive').textContent;
   document.querySelector('#demo').value += btnFive; 
}

function btnFour(){
    var btnFour= document.querySelector('#btnFour').textContent;
   document.querySelector('#demo').value += btnFour; 
}

function btnThree(){
    var btnThree= document.querySelector('#btnThree').textContent;
   document.querySelector('#demo').value += btnThree; 
}

function btnTwo(){
    var btnTwo= document.querySelector('#btnTwo').textContent;
   document.querySelector('#demo').value += btnTwo; 
}

function btnOne(){
    var btnOne= document.querySelector('#btnOne').textContent;
   document.querySelector('#demo').value += btnOne; 
}

function btnZero(){
    var btnZero= document.querySelector('#btnZero').textContent;
   document.querySelector('#demo').value += btnZero; 
}

function btnAdd(){
    var btnAdd= document.querySelector('#btnAdd').textContent;
   document.querySelector('#demo').value += btnAdd; 
}

function btnSubtract(){
    var btnSubtract= document.querySelector('#btnSubtract').textContent;
   document.querySelector('#demo').value += btnSubtract; 
}

function btnMultiply(){
    var btnMultiply= document.querySelector('#btnMultiply').textContent;
   document.querySelector('#demo').value += btnMultiply; 
}

function btnDivide(){
    var btnDivide= document.querySelector('#btnDivide').textContent;
   document.querySelector('#demo').value += btnDivide; 
}

function btnPercent(){
    var btnPercent= document.querySelector('#btnPercent').textContent;
         document.querySelector('#demo').value += btnPercent; 
}
    
function btnD(){
      var  del = document.getElementById('demo').value.slice(0,-1)
        document.getElementById('demo').value = del;    
}

function btnC(){
    var btnC = document.getElementById('demo').value;
    var cancel = "";
    document.getElementById('demo').value = cancel;
}

function btnDecimal(){
    var btnDecimal = document.querySelector('#btnDecimal').textContent;
    document.getElementById('demo').value += btnDecimal;
        
}

function btnEqual(){
   var inputData = document.querySelector('#demo').value; 
   var outPut = eval(inputData)
   document.getElementById('demo').value = outPut;
   console.log(outPut)
}
