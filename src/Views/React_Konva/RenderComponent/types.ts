import { RefObject } from "react";
import Konva from "konva";
import { ShapeData, CardImage, TextState } from "../types";

type CanvasElement = ShapeData | CardImage | TextState;

interface Size {
  width: number;
  height: number;
}

export interface RenderImageProps {
  stageRef: RefObject<Konva.Stage>;
  selectedColor: string;
  backgroundImage: HTMLImageElement | null;
  shapes: ShapeData[];
  images: CardImage[];
  text: TextState[];
  sortByZIndex: (a: CanvasElement, b: CanvasElement) => number;
  renderShape: (shape: ShapeData) => JSX.Element;
  renderImage: (image: CardImage) => JSX.Element;
  renderText: (text: TextState) => JSX.Element;
  transformerRef: RefObject<Konva.Transformer>;
  selectedTextId: string | null;
  selectedImageId: string | null;
  selectedShapeId: string | null;
  size: Size;
}
