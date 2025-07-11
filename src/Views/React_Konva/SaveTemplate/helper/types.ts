import { RefObject } from "react";
import { Stage as KonvaStage } from "konva/lib/Stage";

export interface SaveTemplateProps {
  templateName: string;
  setTemplateName: (name: string) => void;
  handleSaveTemplate: () => void;
  isLoading: boolean;
  stageRef: RefObject<KonvaStage>;
  generateThumbnail: (stageRef: React.RefObject<KonvaStage>) => string | null;
}
