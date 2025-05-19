import { useNavigate } from "react-router-dom";

const Home2 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/product/list");
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer transition-transform duration-200 hover:scale-105 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <svg
          className="fill-primary dark:fill-white"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
        </svg>
      </div>

      <div className="mt-4">
        <h4 className="text-title-md font-bold text-black dark:text-white mb-2">
          Productos para todos los gustos
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Hamburguesas, pizzas, bebidas y mucho más. Descubre una gran variedad de sabores y elige tus favoritos.
        </p>
      </div>
    </div>
  );
};

export default Home2;

