import { Component } from 'lucide-react';
import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const Demo= lazy(() => import('../pages/Demo'));

const ListUsers = lazy(() => import('../pages/Users/List')); // Que lo cargue cuando sea solicitado el lazy
const ListRoles = lazy(() => import('../pages/Roles/list'))
const listPermissions = lazy(() => import ('../pages/Permissions/list'))

const SumPages = lazy(() => import('../pages/Tests/Suma'));
const SubstractPage = lazy(() => import('../pages/Tests/Resta'))

const CreateUser = lazy(() => import('../pages/Users/create'))
const UpdateUsers = lazy(() => import('../pages/Users/update'))

const CreateRoles = lazy(() => import('../pages/Roles/create'))
const UpdateRoles = lazy(() => import('../pages/Roles/update'))

const CreatePermission = lazy(() => import('../pages/Permissions/create'))
const UpdatePermission = lazy(() => import('../pages/Permissions/update'))

const ListCustomers = lazy(() => import('../pages/Customer/list'))
const CreateCustomer = lazy(() => import('../pages/Customer/create'))
const UpdateCustomer = lazy(() => import('../pages/Customer/update'))
const ViewCustomer = lazy(() => import('../pages/Customer/view'))

const CreateMotorcycle = lazy(() => import('../pages/Motorcycle/create'))
const ListMotorcycle = lazy(() => import('../pages/Motorcycle/list'))
const ViewMotorcycle = lazy(() => import('../pages/Motorcycle/view'))
const UpdateMotorcycle = lazy(() => import('../pages/Motorcycle/update'))

const CreateProduct = lazy(() => import('../pages/Product/create'))
const ListProduct = lazy(() => import('../pages/Product/list')) 
const UpdateProduct = lazy(() => import('../pages/Product/update'))
const ViewProduct = lazy(() => import('../pages/Product/view'))

const ListPhoto = lazy(() => import('../pages/Photo/list'));
const CreatePhoto = lazy(()=>import('../pages/Photo/create'))

const CreateDriver= lazy(()=> import('../pages/Driver/cretae'))
const ListDriver= lazy(()=> import('../pages/Driver/list'))
const UpdateDriver= lazy(()=> import('../pages/Driver/update'))
const ViewDriver= lazy(()=> import('../pages/Driver/view'))

const CreateRestaurant= lazy(()=> import('../pages/Restaurant/create'))
const ListRestaurant= lazy(()=> import('../pages/Restaurant/list'))
const UpdateRestaurant= lazy(()=> import('../pages/Restaurant/update'))
const ViewRestaurant= lazy(()=> import('../pages/Restaurant/view'))

const ListIssues = lazy(()=> import('../pages/Issues/list'))
const CrearIssues =lazy(()=>import('../pages/Issues/create'))

const ListMenu= lazy(()=>import ('../pages/Menu/list'))
const CreateMenu= lazy(()=>import('../pages/Menu/create'))

const listOrder = lazy(() => import('../pages/Order/list'))
const createOrder = lazy(() => import('../pages/Order/create'))

const UpdateMenu=lazy(()=>import('../pages/Menu/update'))
const ViewMenu=lazy(()=>import('../pages/Menu/view'))

const coreRoutes = [
  {
    path: '/demo',
    title: 'Demo',
    component: Demo,
  },
  {
    path: '/order/list',
    title: 'List of orders',
    component: listOrder,
  },
  {
    path: '/order/create',
    title: 'Create Order',
    component: createOrder,
  },
  {
    path: '/menu/list/:id_restaurant',
    title: 'List of restuarant menu ', 
    component: ListMenu,
  },
  {
    path: '/menu/update/:id',
    title: 'Update menu for if', 
    component: UpdateMenu,
  },
  {
    path: '/menu/list',
    title: 'List of all menu', 
    component: ListMenu,
  },
  {
    path: '/menu/create/:id_restaurant',
    title: 'Create menu', 
    component: CreateMenu,
  },
  {
    path: '/menu/view/:id',
    title: 'View menu', 
    component: ViewMenu,
  },

  {
    path: '/photo/list',
    title: 'List of Photo', 
    component: ListPhoto,

  },
  {
    path: '/issues/list/:id_moto',
    title: 'List of issues',
    component: ListIssues,
  },
  {
    path: '/issues/create/:id_moto',
    title: 'List of issues',
    component: CrearIssues,
  },
  {
    path: '/photo/create',
    title: 'Create of Photo', 
    component: CreatePhoto,

  },
  {
    path: '/restaurant/create',
    title: 'Create Restaurant',
    component: CreateRestaurant,
  },
  {
    path: '/restaurant/list',
    title: 'List of Restaurants',
    component: ListRestaurant,
  },
  {
    path: '/restaurant/view/:id',
    title: 'View Restaurant by id',
    component: ViewRestaurant,
  },
  {
    path: '/restaurant/update/:id',
    title: 'Update Restaurant',
    component: UpdateRestaurant,
  },
  {
    path: '/motorcycle/view/:id',
    title: 'View Motorcycle by id',
    component: ViewMotorcycle,
  },
  {
    path: '/motorcycle/update/:id',
    title: 'Update Motorcycles', 
    component: UpdateMotorcycle,
  },
  {
    path: '/motorcycle/create',
    title: 'Create Motorcycle', 
    component: CreateMotorcycle,
  },
  {
    path: '/motorcycle/list',
    title: 'List of Motorcycle', 
    component: ListMotorcycle,
  },
  {
    path: '/driver/create',
    title: 'Create Driver',
    component: CreateDriver,
  },
  {
    path: '/driver/list',
    title: 'List of Drivers',
    component: ListDriver,
  },
  {
    path: '/driver/view/:id',
    title: 'View Driver by id',
    component: ViewDriver,
  },
  {
    path: '/driver/update/:id',
    title: 'Update Driver',
    component: UpdateDriver,
  },
  
  {
    path: "/product/create",
    title: "Create Product",
    component: CreateProduct,
  },
  {
    path: "/product/list",
    title: "List Products",
    component: ListProduct,
  },
  {
    path: "/product/update/:id",
    title: "Update Product",
    component: UpdateProduct,
  },
  {
    path: "/product/view/:id",
    title: "View Product",
    component: ViewProduct,
  },
  {
    path: '/customers/list',
    title: 'List of Customers',
    component: ListCustomers,
  },
  {
    path: '/customers/create',
    title: 'Create Customers',
    component: CreateCustomer,
  },
  {
    path: '/customers/update/:id',
    title: 'Update Customers',
    component: UpdateCustomer
  },
  {
    path: '/customers/view/:id',
    title: 'View Customer by id',
    component: ViewCustomer
  },
  {
    path: '/create/users',
    title: 'Create Users',
    component: CreateUser,
  },
  {
    path: '/update/users/:id',
    title: 'Update Users',
    component: UpdateUsers,
  },
  {
    path: '/create/roles',
    title: 'Create Roles',
    component: CreateRoles,
  },
  {
    path: '/update/roles/:id',
    title: 'Update Roles',
    component: UpdateRoles,
  },
  {
    path: '/create/permissions',
    title: 'Create Permission',
    component: CreatePermission,
  },
  {
    path: '/update/permissions/:id',
    title: 'Update permissions',
    component: UpdatePermission,
  },
  {
    path: '/suma',
    title: 'Test',
    component: SumPages,
  },
  {
    path: '/resta',
    title: 'Test-Resta',
    component: SubstractPage,
  },
  {
    path: '/users/list',
    title: 'Lista de usuarios',
    component: ListUsers,
  },
  {
    path: '/roles/list',
    title: 'Lista de roles',
    component: ListRoles,
  },
  {
    path: '/permissions/list',
    title: 'Lista de roles',
    component: listPermissions,
  },
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
