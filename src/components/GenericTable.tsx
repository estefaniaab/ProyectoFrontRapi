import React from 'react';

interface Action {
  name: string;
  label?: string;
  icon?: React.ReactNode; 
}

interface GenericTableProps<T extends Record<string, any>> {
  data: T[];
  columns: string [];
  actions: Action[];
  onAction: (name: string, item: T) => void;
}

const GenericTable = <T extends Record<string, any>>(
  { data, columns, actions, onAction }: GenericTableProps<T>
): JSX.Element => {
  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        {/* <!-- Input Fields --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Listado</h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    {columns.map((col) => (
                      <th key={String(col)} className='px-6 py-3'>{String(col)}</th>
                    ))}
                    <th className='px-6 py-3'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} className='border-b'>
                      {columns.map((col) => (
                        <td key={String(col)} className='px-6 py-4'>{item[col] ?? "-"}</td>
                      ))}
                      <td className='px-6 py-4 space-x-2'>
                        {actions.map((action) => (
                          <button
                            key={action.name}
                            onClick={() => onAction(action.name, item)}
                            className='px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-700'
                          >
                            {action.icon || action.label}
                          </button>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericTable