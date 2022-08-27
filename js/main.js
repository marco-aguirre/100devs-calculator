const calc = new Calculator();

let operands = [];
let operators = [];

////////////// numerical keys, display ////////////////

let newDisplay = true;  //resets display

document.querySelectorAll('.numButton').forEach(elem => elem.addEventListener('click', function (event) {
    let keyStroke = event.currentTarget.innerHTML;
    let currentDisplay = document.querySelector('#output').innerText;
    if (newDisplay) {
        document.querySelector('#output').innerText = keyStroke;
        newDisplay = false;
    }
    else{ document.querySelector('#output').innerText += keyStroke;}
}));

//////////////// map out operator buttons /////////////

document.querySelectorAll('.operator').forEach(elem => elem.addEventListener('click', function () {
    newDisplay = true;
    operands.push(parseInt(document.querySelector('#output').innerText));
    operators.push(elem.innerText);
}));

/////////////// equals functionality ///////////////

document.querySelector('#equals').addEventListener('click', function (){
    newDisplay = true;
    operands.push(parseInt(document.querySelector('#output').innerText));
    document.querySelector('#output').innerText = calc.equals(...calc.consolidateOrderOps(operands, operators));
    operands = [];
    operators = [];
});


function Calculator(){
    this.div = function (a, b){
        return a / b;
    }
    this.mul = function (a, b){
        return a * b;
    }
    this.add = function (a, b){
        return a + b;
    }
    this.sub = function(a, b){
        return a - b;
    }

    ////////////// evaluate all addition and subtraction for final value /////////////
    this.equals = function(vals, ops){
        console.log('first equals: ' + vals, ops);
        if(!vals[0])
            return 0;
        console.log('2nd equals: ' + vals, ops);
        let result =vals[0];
        for (let i = 0; i < vals.length; i++){
            if(!ops[i]){
                return result;
            }
            switch(ops[i]) {
                case "+":
                    result = this.add(result, vals[i+1]);
                    continue;
                case "-":
                    result = this.sub(result, vals[i+1]);
                    continue;
                // case "x":                                    \
                //     result = this.mul(result, vals[i+1]);        \
                //     continue;                                        //gonna need their own method!!
                // case "/":                                        /
                //     result = this.div(result, vals[i+1]);      /
                //     continue;                                /
            }
        }
 

    }

    /////////////////evaluate all multiplcation and division first//////////

    this.consolidateOrderOps = function (vals, ops){
        let consolidatedVals, addSubs;
        consolidatedVals =[] 
        addSubs = []; 
        let nextValtoAdd = vals[0];
        let lastValAdded = false;
        for (let i = 0; i < vals.length; i++){

            if(!ops[i]){
                consolidatedVals.push(nextValtoAdd);
                console.log('end expected push' + nextValtoAdd);
                let returnArray = [];
                returnArray.push(consolidatedVals);
                returnArray.push(addSubs);   
                return returnArray;
            }
            if (ops[i] == '+' || ops[i] == '-'){
                consolidatedVals.push(nextValtoAdd);
                console.log(`expected push ${nextValtoAdd}`);
                lastValAdded = true;
                nextValtoAdd = vals[i+1];
                addSubs.push(ops[i]);
            }
            if(ops[i] == 'x' || ops[i] == '/'){
                if(lastValAdded){
                    nextValtoAdd = vals[i];
                    lastValAdded = false;
                }
            }
            if (ops[i] ==  'x'){
                nextValtoAdd = this.mul(nextValtoAdd, vals[i+1]);
            }
            if (ops[i] ==  '/'){
                nextValtoAdd = this.div(nextValtoAdd, vals[i+1]);
            }
            
        }
            // switch(ops[i]){
            //     case false:
            //         consolidatedVals.push(nextValtoAdd);
            //         console.log('returning: ' + [consolidatedVals, addSubs]);                
            //     case ('+' || '-'):
            //         console.log('case plus or minus');
            //         consolidatedVals.push(nextValtoAdd);
            //         console.log(`expected push ${nextValtoAdd}`,consolidatedVals);
            //         lastValAdded = true;
            //         addSubs.push(ops[i]);

            //     case ('x' || '/'):
            //         if(lastValAdded){
            //             nextValtoAdd = vals[i];
            //             console.log('value added to consolidated list');
            //             lastValAdded = false;
            //         }
            //     case 'x':
            //         nextValtoAdd = this.mul(nextValtoAdd, vals[i+1]);
            //         console.log('made it to multiply');
            //         continue;
            // }

    }
}
////////////////First try/////////////////////
// function Calculator(){    
    //this.result = [];
 //   this.nextOperand = 0;
//    this.nextOperatorPressed = false;
//for number buttons (and .) concatenate the face value onto the output value
    

    //operator buttons -- to work like an old-school calculator, at least the way I remember it, the function won't end until the next one starts...  hmm...
        //would have to first set the next operator, then wait until input value is finished, indicated by the pressing of the next operator
        //then the first part of each operator press would be to accept the last input value and begin the next one, while setting the next operator if indeed there is a last operator

    // this.saveValue = function(){
    //     // while (!nextOperatorPressed){                        //where do I run this loop? needs to run after every mul/div stroke - make it a separate function that is called inside of each
    //     // //do nothing - allow concatToInput
    //     // };
    //     let value =  parseInt(document.querySelector('#output').innerText);
    //     this.result.push(value);
    // }

    // this.updateDisplay = function(){
    //     document.querySelector('#output').innerText = this.nextOperand;
    // }
    // nextOperatorPressed = false;

    // nextOperatorPressed = true;
    // retrieve numerical value of string on display
    // evaluateLastOperation(unless first operation)
    // setNextOperator (only if mul/div)

        
        //for mul/div - evaluate operation between last and current and update display
        //if add/sub
            //push to array (negative value if sub)
       //set next operation
    // this.mul = function (lastInput){
    //     //.nextOperatorPressed = true;
    //     this.nextOperand *= lastInput;
    // }

    // this.div = function (lastInput){
    //     this.nextOperatorPressed = true;
    //     total /= lastInput;
    // }

    // this.add = function(){
    //     // this.nextOperand = this.getNextOperand;
    //     // this.nextOperatorPressed = true;
    //     // this.result.push(this.nextOperand);
    //     this.saveValue;
    //     this.result.push('+');
    //     console.log(result);
    // }

    // this.sub = function (lastInput){
    //     this.nextOperatorPressed = true;
    //     total -= lastInput;
    // }


    //                                         //except for =, which will
    //                                             //reduce result array and produce a final value
    //                                             //push final value as first element of new result array
    // this.equals = function () {
    //     nextOperand = result.reduce(a,b => b += a);
    //     this.updateDisplay();
    // }
// }