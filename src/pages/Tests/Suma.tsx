import React from "react";
import Sum from "../../components/OperacionMatematica";

const SumPage: React.FC = () => {
  const addNumbers = (x: number, y: number): number => x + y;

  return (
    <div>
      <Sum a={5} b={3} calculate={addNumbers} />
    </div>
  );
};

export default SumPage;