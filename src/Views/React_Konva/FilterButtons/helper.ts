// types
export type FilterType =
  | "save"
  | "download"
  | "color"
  | "shape"
  | "image"
  | "text"
  | "template"
  | "size";

export interface FilterButtonsProps {
  activeFilter: FilterType | null;
  setActiveFilter: (filter: FilterType | null) => void;
  handleDownload: () => void;
}

export const FILTER_OPTIONS = [
  { label: "Save", value: "save", src: "SAVE" },
  { label: "Download", value: "download", src: "DOWNLOAD" },
  { label: "Background", value: "color", src: "BACKGROUND" },
  { label: "Shapes", value: "shape", src: "SHAPES" },
  { label: "Upload", value: "image", src: "UPLOAD" },
  { label: "Text", value: "text", src: "TEXT" },
  { label: "Templates", value: "template", src: "TEMPLATE" },
];
