const displayTemp = document.querySelector(".display-temp");
const displayInput = document.querySelector('.display-input');
const tempResult = document.querySelector('.temp-result');
const clearEnd = document.querySelector('.clear-end');
const allClear = document.querySelector('.all-clear');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const equal = document.querySelector('.equal');

let dis1Num = "";
let dis2Num = "";//input sementara
let result = null;
let haveDot = false;
let lastOperation = "";

numbers.forEach((num) =>{
    num.addEventListener("click", (e) => {
        if (e.target.innerText === "." && !haveDot){
            haveDot = true;
        } else if (e.target.innerText === "." && haveDot){
            return;
        }
        dis2Num += e.target.innerText;
        displayInput.innerText = dis2Num;
        // dis1Num += dis2Num;
    })
})

operators.forEach((operation)=> {
    operation.addEventListener("click", (i)=>{
        if(!dis2Num) return;
        haveDot = false;
        var operationName = i.target.innerText;
        if (dis1Num && dis2Num && lastOperation){
            mathOperation();
        } else {
            result = parseFloat(dis2Num);
        }
        clearVar(operationName);
        lastOperation = operationName;
    })
})

function clearVar(name = ""){
    if (name === "=") name = "";
    dis1Num += dis2Num + " " + name + " ";
    displayTemp.innerText = dis1Num;
    displayInput.innerText = " ";
    dis2Num = "";
    tempResult.innerText = result;
}

function mathOperation (){
    if (lastOperation === "x"){
        result = parseFloat(result) * parseFloat(dis2Num);
    } else if (lastOperation === "/"){
        result = parseFloat(result) / parseFloat(dis2Num);
    } else if (lastOperation === "+"){
        result = parseFloat(result) + parseFloat(dis2Num);
    } else if (lastOperation === "-"){
        result = parseFloat(result) - parseFloat(dis2Num);
    } else if (lastOperation === "%"){
        result = parseFloat(result) % parseFloat(dis2Num);
    }
}

equal.addEventListener("click", ()=>{
    if (!dis1Num || !dis2Num) result;
    haveDot = false;
    mathOperation();
    clearVar();
    displayInput.innerText = result;
    tempResult.innerText = "";
    dis2Num = result;
    dis1Num = "";
})

allClear.addEventListener("click", ()=>{
    dis1Num = " ";
    dis2Num = " ";
    displayInput.innerText = "0";
    displayTemp.innerText = "0";
    tempResult.innerText = "0";
    haveDot = false;
    result = "";
    lastOperation = "";
})

clearEnd.addEventListener("click", () => {
    displayInput.innerText = "";
    dis2Num = "";
})

window.addEventListener("keydown", (e) => {
    numbers.forEach((i)=>{
        if(e.key === i.innerText){
            i.click()
        }
    })

    operators.forEach((a)=>{
        if(e.key === a.innerText){
            a.click();
        }
    })
    console.log(e.key);

    if (e.key === "Enter" || e.key === "="){
        equal.click();
    } else if (e.key === "Backspace"){
        allClear.click();
    }
})

