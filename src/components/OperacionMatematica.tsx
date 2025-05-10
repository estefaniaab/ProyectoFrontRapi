import React from "react";

interface OperationProps {
  a: number;
  b: number;
  calculate: (x: number, y: number) => number;
}

const Operation: React.FC<OperationProps> = ({ a, b, calculate }) => {
  return <p>Resultado: {calculate(a, b)}</p>;
};

export default Operation;