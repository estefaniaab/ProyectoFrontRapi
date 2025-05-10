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

const coreRoutes = [
  {
    path: '/demo',
    title: 'Demo',
    component: Demo,
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
