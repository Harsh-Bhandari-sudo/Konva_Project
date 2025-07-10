import Konva from "konva";
import { ColorResult } from "@hello-pangea/color-picker";
import { TextState } from "../types";

export type FontWeight = "normal" | "bold" | "lighter" | "bolder" | string;

export type FontFamily =
  | "Arial"
  | "Helvetica"
  | "Times New Roman"
  | "Georgia"
  | "Verdana"
  | "Courier New"
  | "Comic Sans MS"
  | "Impact"
  | "Trebuchet MS"
  | "Palatino";

interface TextItem {
  id: string;
  text: string;
  fontSize: number;
  fontStyle: FontWeight;
  fontFamily: FontFamily;
  zIndex: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface TextComponentProps {
  deleteSelectedText: () => void;
  handleTextClick: (textId: string) => void;
  text: TextItem[];
  bringToFront: () => void;
  moveForward: () => void;
  moveBackward: () => void;
  sendToBack: () => void;
  selectedText: TextItem | null;
  textInput: string;
  setTextInput: (input: string) => void;
  addText: () => void;
  textFontSize: number;
  setTextFontSize: (size: number) => void;
  selectedTextId: string | null;
  updateTextProperty: (
    property: keyof TextState,
    value: string | number
  ) => void;
  textFontWeight: FontWeight;
  setTextFontWeight: (weight: FontWeight) => void;
  textFontFamily: FontFamily;
  setTextFontFamily: (family: FontFamily) => void;
  textColor: string;
  handleTextColorChange: (color: ColorResult) => void;
  stageRef: React.RefObject<Konva.Stage>;
}
