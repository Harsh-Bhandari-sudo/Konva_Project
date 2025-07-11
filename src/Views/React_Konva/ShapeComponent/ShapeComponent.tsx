// libs
import { useMemo } from "react";
import { SketchPicker } from "@hello-pangea/color-picker";

// components
import ZIndex from "../../../Components/Molecule/ZIndex/ZIndex";

// constants and utils
import { ShapeComponentProps, ShapeType, Shape } from "./helper/types";
import { getShape, shapeProperties } from "./helper/utils";
import selectedPropertiesOptions from "../../../Shared/constant";
import TEXT from "../../../Shared/text";
import CLASSNAME from "../../../Shared/className";
import CustomInput from "../../../Components/Atom/CustomInput";

function ShapeComponent({
  deleteSelectedShape,
  sendToBack,
  moveBackward,
  moveForward,
  addShape,
  selectedShape,
  handleShapeColorChange,
  shapeColor,
  strokeColor,
  handleStrokeColorChange,
  strokeWidth,
  setStrokeWidth,
  updateShapeProperty,
  bringToFront,
}: ShapeComponentProps) {
  const shapeOption = useMemo(() => {
    return getShape();
  }, []);

  const shapePropertiesOption = useMemo(() => {
    return shapeProperties(
      strokeColor,
      shapeColor,
      handleShapeColorChange,
      handleStrokeColorChange,
    );
  }, [
    strokeColor,
    shapeColor,
    handleShapeColorChange,
    handleStrokeColorChange,
  ]);

  return (
    <div className={CLASSNAME.LAYOUT.SHAPE_OPTIONS}>
      <div className={CLASSNAME.LAYOUT.SHAPE_BUTTON}>
        <h4 className={CLASSNAME.HEADER.COLOR_TITLE}>
          {TEXT.HEADER.ADD_SHAPE}
        </h4>
        <div className={CLASSNAME.LAYOUT.SHAPES}>
          {shapeOption.map((shape) => (
            <button
              key={shape.value}
              type="button"
              onClick={() => addShape(shape.value as ShapeType)}
            >
              {shape.render()}
            </button>
          ))}
        </div>
      </div>

      {selectedShape && (
        <div className={CLASSNAME.LAYOUT.SHAPE_CONTROL}>
          <h3>{TEXT.HEADER.SHAPE_PROPERTIES}</h3>
          {shapePropertiesOption.map((option) => (
            <div key={option.value} className={CLASSNAME.LAYOUT.COLOR_CONTROL}>
              <label>{option.label}</label>
              <SketchPicker
                color={option.color}
                onChangeComplete={option.onColorChange}
              />
            </div>
          ))}
          <CustomInput
            type="range"
            label={TEXT.LABEL.STROKE_WIDTH}
            value={strokeWidth}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setStrokeWidth(value);
              updateShapeProperty("strokeWidth", value);
            }}
            displayValue={`${strokeWidth ?? ""}px`}
          />

          <div className={CLASSNAME.LAYOUT.SELECTED_SHAPE_CONTROL}>
            <h4>
              {TEXT.HEADER.SELECTED_SHAPE} {selectedShape.type}
            </h4>
            {selectedPropertiesOptions.map((option) => (
              <CustomInput
                type="number"
                key={option.value}
                label={option.label}
                value={selectedShape[option.value as keyof Shape]}
                onChange={(e) =>
                  updateShapeProperty(
                    option.value as keyof Shape,
                    parseInt(e.target.value, 10)
                  )
                }
                displayValue="px"
              />
            ))}

            <ZIndex
              bringToFront={bringToFront}
              moveForward={moveForward}
              moveBackward={moveBackward}
              sendToBack={sendToBack}
              value={selectedShape.zIndex}
              updateProperty={
                updateShapeProperty as (property: string, value: number) => void
              }
            />

            <button
              type="button"
              onClick={deleteSelectedShape}
              className={CLASSNAME.BUTTON.DELETE}
            >
              {TEXT.BUTTON.DELETE_SHAPE}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShapeComponent;
