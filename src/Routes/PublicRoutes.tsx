import { Navigate } from 'react-router-dom';
import { WILDCARD_ROUTES } from '../Shared/routes';
import { CustomRouter } from './RootRoutes';

export const PUBLIC_ROUTES: Array<CustomRouter> = [
  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PUBLIC} />,
    title: 'Rendering wildcard',
  },
];
