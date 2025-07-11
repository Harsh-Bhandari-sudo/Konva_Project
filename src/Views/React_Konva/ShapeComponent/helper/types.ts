import { ColorResult } from "@hello-pangea/color-picker";
import { ShapeData } from "../../../../Shared/types";

export type ShapeType =
  | "rectangle"
  | "circle"
  | "triangle"
  | "star"
  | "ellipse";

export interface Shape {
  type: ShapeType;
  width: number;
  height: number;
  zIndex: number;
}

export interface ShapeComponentProps {
  deleteSelectedShape: () => void;
  sendToBack: () => void;
  moveBackward: () => void;
  moveForward: () => void;
  addShape: (shapeType: ShapeType) => void;
  selectedShape: Shape | null;
  handleShapeColorChange: (color: ColorResult) => void;
  shapeColor: string;
  strokeColor: string;
  handleStrokeColorChange: (color: ColorResult) => void;
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
  updateShapeProperty: (
    property: keyof ShapeData,
    value: number | string,
  ) => void;
  bringToFront: () => void;
  selectedImageId: string | number | null;
}
