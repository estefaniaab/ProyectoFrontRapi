import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import VirtualAssistant from '../components/IAChat/virtualAssistent';

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showAssistant, setShowAssistant] = useState(false);

  return (
    <Provider store={store}>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto min-h-screen  max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Outlet />
              </div>
            </main>
            {/* Botón flotante para abrir/cerrar el asistente */}
            <button
              onClick={() => setShowAssistant(!showAssistant)}
              className="fixed bottom-4 right-4 bg-blue-500 text-black p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
              🧠 Asistente
            </button>

            {/* Panel flotante del asistente */}
            {showAssistant && (
              <div className="fixed bottom-16 right-4 bg-white shadow-xl p-4 border rounded-md w-96 h-auto max-h-[80vh] overflow-y-auto">
                <VirtualAssistant />
              </div>
            )}
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </div>
    </Provider>
  );
};

export default DefaultLayout;
