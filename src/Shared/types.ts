import { FontFamily } from "../Views/React_Konva/TextComponent/helper/type";

export interface CardImage {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
  brightness: number;
  contrast: number;
  saturation: number;
  opacity: number;
  zIndex: number;
  rotation?: number;
  imageElement: HTMLImageElement;
}

// Shape Data Interface
export interface ShapeData {
  id: string;
  type: "rectangle" | "circle" | "triangle" | "star" | "ellipse";
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  zIndex: number;
  rotation?: number;
  cornerRadius?: number;
}

// Enhanced Text State Interface
export interface TextState {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: FontFamily;
  fontStyle: string;
  fill: string;
  zIndex: number;
  width: number;
  [key: string]: string | number;
}

// Template Data Interface
export interface TemplateData {
  shapes: ShapeData[];
  images: Omit<ImageData, "imageElement">[]; // Exclude imageElement for Firestore
  text: TextState[];
  background: {
    color: string;
    imageUrl?: string;
  };
  createdAt?: string;
  frameSize?: {
    width: number;
    height: number;
  };
  thumbnail?: string | null;
}

// deleteSlectedItem Interface
export interface DeleteSelectedItem<T> {
  items: T[];
  selectedId: string;
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  setSelectedItemsId: (selected: null) => void;
}
