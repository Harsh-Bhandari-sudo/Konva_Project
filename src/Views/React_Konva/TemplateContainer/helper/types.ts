interface Size {
  width: number;
  height: number;
}

interface FrameSize {
  width: number;
  height: number;
}

interface TemplateData {
  frameSize: FrameSize;
  thumbnail: string;
}

export interface Template {
  name: string;
  data: TemplateData;
}

export interface TemplateContainerProps {
  isLoading: boolean;
  templates: Template[];
  loadTemplate: (templateName: string) => void;
  size: Size;
}
