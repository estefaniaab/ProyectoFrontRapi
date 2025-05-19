import Home4 from '../../components/CardFour.tsx';
import Home1 from '../../components/CardOne.tsx';
import Home3 from '../../components/CardThree.tsx';
import Home2 from '../../components/CardTwo.tsx';
import TableTwo from '../../components/TableTwo.tsx';

const ECommerce = () => {
  return (
    <div className="space-y-6">
      <Home3 />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Home1 />
        <Home2 />
      </div>
      <div className="w-full">
        <TableTwo />
      </div>
      <div className="w-full">
        <Home4 />
      </div>
    </div>
    
  );
};

export default ECommerce;
