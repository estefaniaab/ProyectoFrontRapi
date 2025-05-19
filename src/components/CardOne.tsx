import { useNavigate } from "react-router-dom";

const Home1 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/restaurant/list");
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
          <path d="M4 6h16v2H4V6zm0 4h10v2H4v-2zm0 4h16v2H4v-2z" />
        </svg>
      </div>

      <div className="mt-4">
        <h4 className="text-title-md font-bold text-black dark:text-white mb-2">
          Restaurantes a tu alcance
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Explora una amplia variedad de menús personalizados y encuentra tu próxima comida favorita. ¡Haz clic y empieza a ordenar!
        </p>
      </div>
    </div>
  );
};

export default Home1;


