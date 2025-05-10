import React from "react";
import Sum from "../../components/OperacionMatematica";

const SubstractPage: React.FC = () => {
  const substractNumbers = (x: number, y: number): number => x - y;

  return (
    <div>
      <Sum a={5} b={3} calculate={substractNumbers} />
    </div>
  );
};

export default SubstractPage;