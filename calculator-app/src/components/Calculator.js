// Calculator.js
import React, { useState } from 'react';
import '../styles/Calculator.css';

const Calculator = () => {
    const [result, setResult] = useState("0");
    const [history, setHistory] = useState([]);

    const handleClick = (e) => {
        if (e.target.name === '.' && result.includes('.')) {
            return;
        }
        if (result === "0" && e.target.name !== '.') {
            setResult(e.target.name);
        } else {
            setResult(result.concat(e.target.name));
        }
    }

    const clear = () => {
        setResult("0");
    }

    const backspace = () => {
        setResult(result.slice(0, -1));
    }

    const calculate = () => {
        const checkResult = () => {
            if (result.includes('--')) {
                setResult(result.replace('--', '+'));
            }
    
            else if (result.includes('++')) {
                setResult(result.replace('++', '+'));
            }
    
            else if (result.includes('**')) {
                setResult(result.replace('**', '*'));
            }
    
            else if (result.includes('//')) {
                setResult(result.replace('//', '/'));
            }
        }
    
        checkResult();
    
        let operatorArray = result.split(/[0-9.]+/).filter(n => n);
        let numbersArray = result.split(/[^0-9.]+/).map(n => +n);
        let operate = (operator, a, b) => {
            switch (operator) {
                case '+':
                    return a + b;
                case '-':
                    return a - b;
                case '*':
                    return a * b;
                case '/':
                    if (b === 0) {
                        return 'Error';
                    } else {
                        return a / b;
                    }
                default:
                    return 'Error';
            }
        };
    
        while (operatorArray.length > 0) {
            if (operatorArray.includes('*')) {
                let index = operatorArray.indexOf('*');
                numbersArray.splice(index, 2, operate('*', numbersArray[index], numbersArray[index + 1]));
                operatorArray.splice(index, 1);
            } else if (operatorArray.includes('/')) {
                let index = operatorArray.indexOf('/');
                numbersArray.splice(index, 2, operate('/', numbersArray[index], numbersArray[index + 1]));
                operatorArray.splice(index, 1);
            } else if (operatorArray.includes('+')) {
                let index = operatorArray.indexOf('+');
                numbersArray.splice(index, 2, operate('+', numbersArray[index], numbersArray[index + 1]));
                operatorArray.splice(index, 1);
            } else if (operatorArray.includes('-')) {
                let index = operatorArray.indexOf('-');
                numbersArray.splice(index, 2, operate('-', numbersArray[index], numbersArray[index + 1]));
                operatorArray.splice(index, 1);
            }
        }
    
        setResult(numbersArray[0].toString());

                    let historyCopy = [...history];
            historyCopy.unshift(result + " = " + numbersArray[0]);
            if (historyCopy.length > 5) {
                historyCopy.pop();
            }
            setHistory(historyCopy);
    }

    return (
        <div className="container">
            <div style={{ display: 'flex' }}>
                <div>
                    <div className="result-box">{result}</div>
                    <div>
                        <button className="button" name="1" onClick={handleClick}>1</button>
                        <button className="button" name="2" onClick={handleClick}>2</button>
                        <button className="button" name="3" onClick={handleClick}>3</button>
                        <button className="button" name="+" onClick={handleClick}>+</button>
                        <button className="button" onClick={backspace}>[x]</button>
                    </div>
                    <div>
                        <button className="button" name="4" onClick={handleClick}>4</button>
                        <button className="button" name="5" onClick={handleClick}>5</button>
                        <button className="button" name="6" onClick={handleClick}>6</button>
                        <button className="button" name="-" onClick={handleClick}>-</button>
                    </div>
                    <div>
                        <button className="button" name="7" onClick={handleClick}>7</button>
                        <button className="button" name="8" onClick={handleClick}>8</button>
                        <button className="button" name="9" onClick={handleClick}>9</button>
                        <button className="button" name="*" onClick={handleClick}>*</button>
                    </div>
                    <div>
                        <button className="button" name="0" onClick={handleClick}>0</button>
                        <button className="button" name="." onClick={handleClick}>.</button>
                        <button className="button" onClick={clear}>Clear</button>
                        <button className="button" onClick={calculate}>=</button>
                        <button className="button" name="/" onClick={handleClick}>/</button>
                    </div>
                </div>
                <div className="history-box" style={{ marginLeft: '20px' }}>
                <div style={{textAlign: 'right' }}><b>History</b></div>
                    <ul style={{ listStyleType: 'none', textAlign: 'right' }}>
                        {history.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
    }
    
    export default Calculator;







