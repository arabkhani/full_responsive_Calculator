//gathering info from calculator

const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const equation = document.querySelector('.equation')
const clear = document.getElementById('clear')
const deleteInputs = document.getElementById('delete')
const historyArea = document.querySelector('.History')
const mainArea = document.querySelector('.calculator-container')

//end gathering info from calculator

//set history part

historyArea.style.display = 'none';

function displayHistory(){
    if(historyArea.style.display === 'none'){
        historyArea.style.display = '';
        mainArea.style.borderRadius = '10px 0 0 10px';
    }else{
        historyArea.style.display = 'none';
        mainArea.style.marginLeft = '';
        mainArea.style.borderRadius='10px';
    }
}

document.getElementById('show-history').addEventListener("click", displayHistory)

//end display and set history part


//add item to history

const history = [];

function addToHistory(entry) {
    history.push(entry);

    const historyList = document.querySelector('.History ul');
    const newHistoryItem = document.createElement('li');
    newHistoryItem.textContent = entry;
    historyList.appendChild(newHistoryItem);
}

//end adding item to history


//display numbers

let operand1 = null;
let operator = null;

function displayNumbers(event){
    const clickedNumber = event.target;
    const inputValue = document.getElementById('input-answer').value;
    if(inputValue === '0'){
        document.getElementById('input-answer').value = clickedNumber.textContent;
    }else{
        document.getElementById('input-answer').value +=clickedNumber.textContent;
    }
}

numbers.forEach(number=>{
    number.addEventListener("click",displayNumbers)
});


//display double zero
function displayDoubleZero(event){
    const clickedNumber = event.target;
    const inputValue = document.getElementById('input-answer').value;

    if(inputValue > 0){
        document.getElementById('input-answer').value +=clickedNumber.textContent;
    }else{
        document.getElementById('input-answer').value = '0';
    }
}

document.getElementById('doubleZero').addEventListener("click", displayDoubleZero);

//end display double zero


//clear input
function clearInput(){

    equation.style.visibility="hidden";
    document.getElementById('input-answer').value = '0';
    operand1 = null;
    operator = null;
    equation.textContent = '0';

}
clear.addEventListener("click", clearInput);

//end the clear input

function deleteInput(){
    let inputValue = document.getElementById('input-answer').value;
    if(inputValue.length > 1){
        inputValue = inputValue.slice(0,-1);
        document.getElementById('input-answer').value = inputValue;
    }else{
        document.getElementById('input-answer').value = 0;
    }
}

deleteInputs.addEventListener("click", deleteInput);

//end of delete input


//change the sign of the number

function changeSign() {
    const currentText = document.getElementById('input-answer').value;

    if (currentText !== '0') {
        if (currentText.startsWith('-')) {
            document.getElementById('input-answer').value = currentText.slice(1);
        } else {
            document.getElementById('input-answer').value = '-' + currentText;
        }
    }
}
document.getElementById('positiveNegative').addEventListener("click", changeSign);

//end the sign of the number


//main calculator

function performCalculation(){
    const inputValue = document.getElementById('input-answer').value;

    if(operand1 !== null && operator !==null){
        let result;

        switch (operator){
            case '+':
                result = (operand1 + parseFloat(inputValue));
                break;
            case '-':
                result = (operand1 - parseFloat(inputValue));
                break;
            case 'x':
                result = (operand1 * parseFloat(inputValue));
                break;
            case '÷':
                result = (operand1 / parseFloat(inputValue));
                break;
            case '%':
                result = ((operand1 / 100) * parseFloat(inputValue));
                break;
            default:
                break;
        }
        document.getElementById('input-answer').value = result;
    }
    //set calculations to history
    equation.textContent = operand1 + " " + operator + " " + inputValue;
    const historyEntry = `${equation.textContent} ${document.getElementById('input-answer').value}`
    addToHistory(historyEntry);
    //set the value and operator to default
    operand1 = null;
    operator=null;
}
//set the operation sign and operand1 value and operator value and default value after each process to input part

operators.forEach(operatorButton =>{
    operatorButton.addEventListener("click",()=>{
        equation.style.visibility = 'visible';
        operand1 = parseFloat(document.getElementById('input-answer').value);
        operator = operatorButton.textContent;
        equation.textContent = operand1+" "+operator;
        document.getElementById('input-answer').value = '0';
    })
});

document.getElementById('calculate').addEventListener("click", performCalculation);

//end of the operator process


//set the function square root

function squareRootOf(){
    const inputValue = parseFloat(document.getElementById('input-answer').value);

    if(inputValue > 0){
        let result;
        equation.style.visibility = 'visible';
        equation.textContent = '√' + inputValue;
        result = Math.sqrt(inputValue);

        document.getElementById('input-answer').value = result;
    }

    const historyEntry = `${equation.textContent} = ${document.getElementById('input-answer').value}`;
    addToHistory((historyEntry));
}
document.getElementById('squareRoot').addEventListener("click", squareRootOf);

//end of the square root of


//function power of two
function square(){
    const inputValue = parseFloat(document.getElementById('input-answer').value);

    if(inputValue > 0){
        let result;
        equation.style.visibility = 'visible';
        equation.textContent = inputValue + "²";
        result = Math.pow(inputValue, 2);

        document.getElementById('input-answer').value = result;
    }

    const historyEntry = `${equation.textContent} = ${document.getElementById('input-answer').value}`;
    addToHistory(historyEntry);
}

document.getElementById('square').addEventListener("click", square);

//end of the square function;

//start of the reset all function

function resetAll(){
    location.reload();
}

document.getElementById('clearALL').addEventListener("click", resetAll);

function myFunction(event) { 
    if (event.key == '0' || event.key == '1' 
        || event.key == '2' || event.key == '3' 
        || event.key == '4' || event.key == '5' 
        || event.key == '6' || event.key == '7' 
        || event.key == '8' || event.key == '9' 
        || event.key == '+' || event.key == '-' 
        || event.key == '*' || event.key == '/') 
        document.getElementById("input-answer").value += event.key; 
} 
let cal = document.getElementById('calculator')
cal.onkeyup = function (event) { 
    if (event.keyCode === 13) { 
        console.log("Enter"); 
        let x = document.getElementById('input-answer').value 
        console.log(x); 
        solve()
    } 
} 

    // Function that evaluates the digit and return result 
function solve() { 
    let x = document.getElementById("input-answer").value
    equation.style.visibility = 'visible';
    equation.textContent = x +" = ";
    document.getElementById("input-answer").value = eval(x)

    const historyEntry = `${equation.textContent} = ${document.getElementById('input-answer').value}`;
    addToHistory((historyEntry));
} 
