import { ColorResult } from "@hello-pangea/color-picker";

export interface ColorComponentProps {
  selectedColor: string;
  handleColorChange: (color: ColorResult) => void;
  handleFileUpload: (files: FileList | null) => void;
  backgroundImage: HTMLImageElement | null;
  setBackgroundImage: (image: HTMLImageElement | null) => void;
  setSelectedColor: (color: string) => void;
}
