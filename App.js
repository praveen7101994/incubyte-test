import React, { useState } from "react";
import "./App.css";

function StringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  function add(numbers) {
    if (numbers === "") {
      return 0;
    }

    let separator = /,|\n/;
    if (numbers.startsWith("//")) {
      const endIndex = numbers.indexOf("\n");
      separator = numbers.substring(2, endIndex);
      numbers = numbers.substring(endIndex + 1);
    }

    const numberArray = numbers
      .split(separator)
      .map((num) => parseInt(num, 10));

    const negatives = numberArray.filter((num) => num < 0);
    if (negatives.length > 0) {
      throw new Error(`negative numbers not allowed: ${negatives.join(", ")}`);
    }

    console.log(numberArray);
    return numberArray.reduce((sum, num) => sum + (isNaN(num) ? 0 : num), 0);
  }

  const handleCalculate = () => {
    try {
      const processedInput = input.replace(/\\n/g, "\n");

      const resultValue = add(processedInput);
      setResult(`Result: ${resultValue}`);
    } catch (e) {
      setResult(e.message);
    }
  };

  return (
    <div className="calculator-container">
      <h1>String Calculator</h1>

      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          console.log(e.target.value);
        }}
        placeholder="Enter numbers (e.g. 1,2 or //;\n1;2)"
      />

      <button onClick={handleCalculate}>Calculate</button>

      {input && <div className="result">{input}</div>}
      {result && <div className="result">{result}</div>}
    </div>
  );
}

export default StringCalculator;
