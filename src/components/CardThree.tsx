const Home3 = () => {
  return (
    <div className="col-span-1 md:col-span-2 w-full rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          <svg
            className="fill-primary dark:fill-white"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM11 6h2v6h-2V6zm0 8h2v2h-2v-2z" />
          </svg>
        </div>

        <div>
          <h2 className="text-title-lg font-bold text-black dark:text-white mb-1">
            ¡Bienvenido a tu plataforma de domicilios!
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Explora menús personalizados de distintos restaurantes, realiza pedidos rápidos, gestiona entregas y consulta el estado de tu comida. Desde motociclistas hasta reportes de incidentes, todo en un solo lugar, moderno, intuitivo y pensado para ti.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home3;
