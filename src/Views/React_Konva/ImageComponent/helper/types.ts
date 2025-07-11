import { RefObject } from "react";
import { CardImage } from "../../../../Shared/types";

export type ImageProperty =
  | "width"
  | "height"
  | "brightness"
  | "contrast"
  | "saturation"
  | "opacity"
  | "zIndex";

export interface ImageComponentProps {
  handleImageClick: (imageId: string) => void;
  selectedImageId: string | null;
  images: CardImage[];
  deleteSelectedImage: () => void;
  sendToBack: () => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  dragOver: boolean;
  handleDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  fileInputRef: RefObject<HTMLInputElement>;
  handleFileUpload: (files: FileList | null) => void;
  selectedImage: CardImage | null;
  updateImageProperty: (property: ImageProperty, value: number) => void;
  bringToFront: () => void;
  moveForward: () => void;
  moveBackward: () => void;
}
