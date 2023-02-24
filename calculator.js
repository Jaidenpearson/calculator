//GRAB HTML

const buttons = document.querySelectorAll('value')

const answerDisplay = document.getElementById('answerDisplay')

//GLOBAL VARIABLES

let displayContent = ''
let previousNumber = ''
let runningTotal = ''
let currentNumber = ''
let previousOperator = ''
let currentOperator = ''
let runningDecimalCounter = 0
let currentDecimalCounter = 0

//FUNCTIONS

function clear(){
    displayContent = ''
    runningTotal = ''
    currentNumber = ''
    previousOperator = ''
    currentOperator = ''
    runningDecimalCounter = 0
    currentDecimalCounter = 0
    return answerDisplay.textContent = displayContent
}

function del(){
    if(previousOperator == '') {
        let delArray = runningTotal.split('')
        let delSlice = delArray.slice(0, -1)
        let delJoin = delSlice.join('')
        runningTotal = delJoin
        answerDisplay.textContent = delJoin
        return 
    } else if(previousOperator !== '') {
        let currArray = currentNumber.split('')
        let currSlice = currArray.slice(0, -1)
        let currJoin = currSlice.join('')
        currentNumber = currJoin
        answerDisplay.textContent = currJoin
        return
    }
}

function equals(){
    if(currentOperator == ''){
        runningTotal = operate(runningTotal, currentNumber, previousOperator)
        answerDisplay.textContent = runningTotal
        currentNumber = ''
        previousOperator = ''
        currentOperator = ''
        currentDecimalCounter = 0
        return
    } else if (currentOperator !== '') {
        runningTotal = operate(runningTotal, currentNumber, currentOperator)
        displayContent = runningTotal
        answerDisplay.textContent = displayContent
        currentNumber = ''
        previousOperator = ''
        currentOperator = ''
        return 
    }
}

function operate(prevNumber, currNumber, op){
    if( op == "/" && currNumber == "0"){
        return answerDisplay.textContent = `Can't divide by zero, learn to math bro`
    }else if(op == '+'){
        return parseFloat(prevNumber) + parseFloat(currentNumber)
    } else if(op == '-') {
        return parseFloat(prevNumber) - parseFloat(currNumber)
    } else if(op == 'x') {
        return parseFloat(prevNumber) * parseFloat(currNumber)
    } else if(op == '/') {
        return parseFloat(prevNumber) / parseFloat(currNumber)
    }
}
  
//EVENT LISTENER

document.addEventListener('click', (e) => {
    if(e.target.className == "number" && previousOperator == ''){ // FIRST NUMBER
        if(e.target.id == 'decimal' && !runningTotal.includes('.')){
            runningTotal += '.'
            answerDisplay.textContent = runningTotal
            return
        }
        runningTotal += e.target.value
        console.log(e.target.value)
        answerDisplay.textContent = runningTotal
        return
    } else if(e.target.className == 'operator' && previousOperator == '') { // FIRST OPERATOR
        displayContent = ''
        previousOperator = e.target.value
        return
    } else if(e.target.className == 'number' && previousOperator !== '') { // CURRENT NUMBER
        if(e.target.id == 'decimal' && !currentNumber.includes('.')){
            currentNumber += '.'
            answerDisplay.textContent = currentNumber
            return
        }
        currentNumber += e.target.value
        console.log(e.target.value)
        answerDisplay.textContent = currentNumber
        return 
    } else if(e.target.className == 'operator' && currentNumber !== '') { // SECOND OPERATOR
        runningTotal = operate(runningTotal, currentNumber, previousOperator)
        answerDisplay.textContent = runningTotal
        currentNumber = ''
        currentOperator = e.target.value
        previousOperator = currentOperator
        currentOperator == ''
        displayContent = ''
        return
    } else if (e.target.id == 'clear') { //CLEAR
        return clear()
    } else if(e.target.id == 'equals') { //EQUALS
        return equals()
    } else if(e.target.id == 'del') {
        return del()
    }
})
