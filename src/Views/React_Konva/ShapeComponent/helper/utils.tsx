// types
import { ColorResult } from "@hello-pangea/color-picker";

// components
import SvgWrappper from "../../../../Components/Atom/SvgWrapper";

const getShape = () => {
  return [
    {
      label: "Rectangle",
      value: "rectangle",
      render: () => {
        return (
          <SvgWrappper>
            <rect
              x="4"
              y="6"
              width="16"
              height="12"
              strokeWidth="0.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </SvgWrappper>
        );
      },
    },
    {
      label: "Circle",
      value: "circle",
      render: () => {
        return (
          <SvgWrappper>
            <circle
              cx="12"
              cy="12"
              r="8"
              strokeWidth="0.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </SvgWrappper>
        );
      },
    },
    {
      label: "Triangle",
      value: "triangle",
      render: () => {
        return (
          <SvgWrappper>
            <polygon
              points="12,4 4,20 20,20"
              strokeWidth="0.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </SvgWrappper>
        );
      },
    },
    {
      label: "Star",
      value: "star",
      render: () => {
        return (
          <SvgWrappper>
            <polygon
              points="12,2 15,8.5 22,9.3 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.3 9,8.5"
              strokeWidth="0.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </SvgWrappper>
        );
      },
    },
    {
      label: "Ellipse",
      value: "ellipse",
      render: () => {
        return (
          <SvgWrappper>
            <ellipse
              cx="12"
              cy="12"
              rx="9"
              ry="6"
              strokeWidth="0.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </SvgWrappper>
        );
      },
    },
  ];
};

const shapeProperties = (
  strokeColor: string,
  shapeColor: string,
  handleStrokeColorChange: (color: ColorResult) => void,
  handleShapeColorChange: (color: ColorResult) => void
) => {
  return [
    {
      label: "Fill Color:",
      value: "fillColor",
      color: shapeColor,
      onColorChange: handleShapeColorChange,
    },
    {
      label: "Stroke Color:",
      value: "strokeColor",
      color: strokeColor,
      onColorChange: handleStrokeColorChange,
    },
  ];
};

export { getShape, shapeProperties };
