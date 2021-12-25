import { useState } from "react";
import { calculateResult, convertToRPN, normalizeExpression } from "./utils/math";
import { getErrors } from "./utils/validation";


const Calculator = () => {

    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');
    const [errors, setErrors] = useState([]);

    const expressionChangeListener = ((event) => {
        const value = event.target.value;
        setExpression(value);
        
        if(!value){
            setErrors([])
            return;
        }
        
        setErrors(getErrors(value));
    });

    const handleCalculate = () => {
        const normalizedExpression = normalizeExpression(expression)
        console.log(`normalizedExpression`, normalizedExpression)
        const rpn = convertToRPN(normalizedExpression)
        setResult(calculateResult(rpn));
      };

      const handleClear = () => {
        setExpression("");
        setErrors([])
        setResult("")
      }


    return (
        <div>
            {errors.map((error) => 
                <p key={error}>{error}</p>
            )}
            <input style={{minWidth:"400px"}} id="expInput" value={expression} onChange={expressionChangeListener}/> = <span>{result}</span>
            <br/>
            <button onClick={handleCalculate}>Calculate</button>
            <button onClick={handleClear} >Clear</button>
        </div>
    )
}

export default Calculator;