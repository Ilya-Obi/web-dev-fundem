let goingValue = 0;
let buffer = "0";
let previousOperator = null;
const display = document.querySelector(".display")

document.querySelector('.buttons').addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
})

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
    rerender();
}

function handleSymbol(value) {
    switch (value) {
        case 'C':
            buffer = "0";
            goingValue = 0;
            previousOperator = null;
            break;
        case '←':
            if (buffer.length === 1)
                buffer = "0";
            else                
                buffer = buffer.slice(0, -1);
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            operate(parseInt(buffer));
            previousOperator = null;
            buffer = "" + goingValue;
            goingValue = 0;
            break;
        default:
            handleMath(value);
            break;
    };
    rerender();
}
function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if(goingValue === 0) {
        goingValue = intBuffer;
    } else
        operate(intBuffer);
    previousOperator = value;
    buffer = "0";
}
function operate(intBuffer) { //flushOperator
    if(previousOperator === "+") {
        goingValue += intBuffer;
    } else if (previousOperator === "-") {
        goingValue -= intBuffer;
    } else if (previousOperator === "x") {
        goingValue *= intBuffer;
    } else if (previousOperator === "/") {
        goingValue /= intBuffer;
    }
}


function rerender() {
    display.innerText = buffer;
}