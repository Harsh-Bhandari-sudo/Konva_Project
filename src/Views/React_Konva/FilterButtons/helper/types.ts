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
