// types
import { CardImage, ShapeData, TextState } from "../../../../Shared/types";
import { ImageProperty } from "../../../../Views/React_Konva/ImageComponent/helper/types";

export interface ZIndexProps {
  bringToFront: () => void;
  moveForward: () => void;
  moveBackward: () => void;
  sendToBack: () => void;
  value: number;
  updateProperty: (
    property:
      | keyof (ShapeData | CardImage | TextState | ImageProperty)
      | string,
    value: number
  ) => void;
}
