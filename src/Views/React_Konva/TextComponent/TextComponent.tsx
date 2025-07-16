// libs
import { useEffect, useRef } from "react";
import Konva from "konva";
import { SketchPicker } from "@hello-pangea/color-picker";

// components
import ZIndex from "../../../Components/Molecule/ZIndex";
import CustomSelect from "../../../Components/Atom/CustomSelect/CustomSelect";
import CustomInput from "../../../Components/Atom/CustomInput";

// constants and utils
import { TextComponentProps, FontFamily, FontWeight } from "./helper/type";
import CLASSNAME from "../../../Shared/className";
import { FONT_WEIGHT_PROPERTY, FONT_FAMILY_PROPERTY } from "./helper/constant";
import TEXT from "../../../Shared/text";

function TextComponent({
  deleteSelectedText,
  handleTextClick,
  text,
  bringToFront,
  moveForward,
  moveBackward,
  sendToBack,
  selectedText,
  textInput,
  setTextInput,
  addText,
  textFontSize,
  setTextFontSize,
  selectedTextId,
  updateTextProperty,
  textFontWeight,
  setTextFontWeight,
  textFontFamily,
  setTextFontFamily,
  textColor,
  handleTextColorChange,
  stageRef,
}: TextComponentProps) {
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (selectedTextId && transformerRef.current) {
      const textNode = stageRef.current?.findOne(`#${selectedTextId}`);
      if (textNode) {
        textNode.x(textNode.x());
        textNode.y(textNode.y());

        transformerRef.current.nodes([textNode]);
        transformerRef.current.resizeEnabled(true);
        transformerRef.current.getLayer()?.batchDraw();
      }
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedTextId]);

  useEffect(() => {
    if (selectedTextId && transformerRef.current) {
      const textNode = stageRef.current?.findOne(`#${selectedTextId}`);
      if (textNode) {
        // Force update the position to ensure proper transformation
        textNode.setAttrs({
          x: textNode.x(),
          y: textNode.y(),
          width: textNode.width(),
          height: textNode.height(),
        });

        transformerRef.current.nodes([textNode]);

        // Configure transformer specifically for text
        transformerRef.current.anchorSize(8);
        transformerRef.current.borderStroke("#00ff00");
        transformerRef.current.borderStrokeWidth(1);
        transformerRef.current.enabledAnchors([
          "top-center",
          "middle-right",
          "bottom-center",
          "middle-left",
        ]);
        transformerRef.current.resizeEnabled(true);
        transformerRef.current.getLayer()?.batchDraw();
      }
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedTextId]);

  return (
    <div className={CLASSNAME.LAYOUT.TEXT_OPTIONS}>
      <h4>Add Text</h4>

      <div className={CLASSNAME.LAYOUT.TEXT_INPUT_SECTION}>
        <div className={CLASSNAME.LAYOUT.INPUT_GROUP}>
          <label>Enter Text:</label>
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Type your text here..."
            onKeyPress={(e) => {
              if (e.key === "Enter" && textInput.trim()) {
                addText();
              }
            }}
          />
          <button
            className="add-text-btn"
            onClick={addText}
            disabled={!textInput.trim()}
          >
            Add Text
          </button>
        </div>
      </div>

      <div className="text-properties">
        <h4>Text Properties</h4>
        <CustomInput
          label="Font Size:"
          inputClassName="input-font-size"
          type="number"
          value={textFontSize}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setTextFontSize(value);
            if (selectedTextId) {
              updateTextProperty("fontSize", value);
            }
          }}
          displayValue="px"
        />
        <CustomSelect
          label="Font Weight:"
          value={selectedText?.fontStyle ?? textFontWeight}
          onChange={(e) => {
            setTextFontWeight(e.target.value as FontWeight);
            if (selectedTextId) {
              updateTextProperty("fontStyle", e.target.value);
            }
          }}
          displayOptions={FONT_WEIGHT_PROPERTY}
        />
        <CustomSelect
          label="Font Family:"
          value={textFontFamily}
          onChange={(e) => {
            setTextFontFamily(e.target.value as FontFamily);
            if (selectedTextId) {
              updateTextProperty("fontFamily", e.target.value);
            }
          }}
          displayOptions={FONT_FAMILY_PROPERTY}
        />

        <div className="color-controls">
          <label>Color:</label>
          <SketchPicker
            color={textColor}
            onChangeComplete={handleTextColorChange}
          />
        </div>
      </div>

      {selectedText && (
        <div className="selected-text">
          <h4>Selected Text: "{selectedText.text}"</h4>
          <CustomInput
            label="Edit Text:"
            type="text"
            value={selectedText.text}
            onChange={(e) => updateTextProperty("text", e.target.value)}
            placeholder="Edit text content..."
          />

          <div className="text-style-controls">
            <CustomInput
              label="Font Size:"
              type="number"
              value={selectedText?.fontSize || textFontSize}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setTextFontSize(value);
                updateTextProperty("fontSize", value);
              }}
              inputClassName="input-font-size"
              displayValue="px"
            />
            <CustomSelect
              label="Font Weight:"
              value={selectedText.fontStyle}
              onChange={(e) => updateTextProperty("fontStyle", e.target.value)}
              displayOptions={FONT_WEIGHT_PROPERTY}
            />
            <CustomSelect
              label="Font Family:"
              value={selectedText.fontFamily}
              onChange={(e) => updateTextProperty("fontFamily", e.target.value)}
              displayOptions={FONT_FAMILY_PROPERTY}
            />
          </div>
          <ZIndex
            bringToFront={bringToFront}
            moveForward={moveForward}
            moveBackward={moveBackward}
            sendToBack={sendToBack}
            value={selectedText.zIndex}
            updateProperty={updateTextProperty}
          />

          <div className={CLASSNAME.LAYOUT.DELETE_TEXT}>
            <button
              type="button"
              onClick={deleteSelectedText}
              className={CLASSNAME.BUTTON.DELETE}
            >
              {TEXT.BUTTON.DELETE_TEXT}
            </button>
          </div>
        </div>
      )}
      {text[TEXT.KEY.LENGTH as "length"] > 0 && (
        <div className={CLASSNAME.LAYOUT.TEXT_LIST}>
          <h4>
            {TEXT.HEADER.TEXT_ELEMENT} ({text[TEXT.KEY.LENGTH as "length"]})
          </h4>
          <div className={CLASSNAME.LAYOUT.TEXT_ITEMS}>
            {text.map((textItem) => (
              <button
                key={textItem[TEXT.KEY.ID]}
                type="button"
                className={`${CLASSNAME.LAYOUT.TEXT_ITEM} ${
                  selectedTextId === textItem[TEXT.KEY.ID]
                    ? CLASSNAME.LAYOUT.SELECTED
                    : CLASSNAME.EMPTY
                }`}
                onClick={() => handleTextClick(textItem[TEXT.KEY.ID as "id"])}
              >
                <div className={CLASSNAME.LAYOUT.TEXT_INFO}>
                  <small>
                    {textItem[TEXT.KEY.TEXT]} <br />{" "}
                    {textItem[TEXT.KEY.FONT_SIZE]}px •{"  "}
                    {textItem[TEXT.KEY.FONT_STYLE]}
                  </small>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default TextComponent;
