const Home4 = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark transition-opacity duration-700 ease-in-out opacity-100 animate-fadeIn">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <svg
          className="fill-primary dark:fill-white"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M20.57 14.86C19.86 13.72 18.55 13 17 13H9.82L11.4 10.59C11.78 10.03 12 9.34 12 8.6C12 6.89 10.61 5.5 8.9 5.5C8.4 5.5 7.93 5.63 7.5 5.85L6.92 6.13L9 10H7L3 4L0 8H2V20C2 21.1 2.9 22 4 22H18C19.1 22 20 21.1 20 20V16.9C20.32 16.64 20.6 16.32 20.81 15.95C21.28 15.14 21.18 14.12 20.57 14.86Z" />
        </svg>
      </div>
      <div className="mt-4">
        <h4 className="text-title-md font-bold text-black dark:text-white mb-2">
          ¡Tu antojo, nuestra misión!
        </h4>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Pide lo que quieras, donde estés. En minutos lo tienes en tu puerta. 🚀
        </p>
      </div>
    </div>
  );
};

export default Home4;

