import { Navigate } from "react-router-dom";
import { ROUTES_CONFIG, WILDCARD_ROUTES } from "../Shared/routes";
import { CustomRouter } from "./RootRoutes";
import CardWrapper from "../Views/React_Konva/CardWrapper/CardWrapper";
import ChooseTemplateSize from "../Views/React_Konva/ChooseTemplateSize/ChooseTemplateSize";

export const PRIVATE_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.KONVA.path,
    title: ROUTES_CONFIG.KONVA.title,
    element: <CardWrapper />,
  },
  {
    path: ROUTES_CONFIG.TEMPLATE.path,
    title: ROUTES_CONFIG.TEMPLATE.title,
    element: <ChooseTemplateSize />,
  },
  {
    path: "*",
    element: <Navigate to={WILDCARD_ROUTES.PRIVATE} />,
    title: "Rendering wildcard",
  },
];
