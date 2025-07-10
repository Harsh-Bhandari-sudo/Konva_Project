// libs
import { useEffect, useRef } from "react";
import Konva from "konva";
import { SketchPicker } from "@hello-pangea/color-picker";

// constants
import { TextComponentProps, FontFamily, FontWeight } from "./helper/type";
import CLASSNAME from "../../../Shared/className";
import { FONT_WEIGHT_PROPERTY, FONT_FAMILY_PROPERTY } from "./helper/constant";

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

        <div className="property-group">
          <label>Font Size:</label>
          <div className="text-property">
            <input
              className="input-font-size"
              type="number"
              value={textFontSize}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setTextFontSize(value);
                if (selectedTextId) {
                  updateTextProperty("fontSize", value);
                }
              }}
            />
            <span>px</span>
          </div>
        </div>

        <div className="property-group">
          <label>Font Weight:</label>
          <select
            className="font-weight-property"
            value={textFontWeight}
            onChange={(e) => {
              setTextFontWeight(e.target.value as FontWeight);
              if (selectedTextId) {
                updateTextProperty("fontStyle", e.target.value);
              }
            }}
          >
            {FONT_WEIGHT_PROPERTY.map((weight) => (
              <option key={weight.value} value={weight.value}>
                {weight.label}
              </option>
            ))}
          </select>
        </div>

        <div className="property-group">
          <label>Font Family:</label>
          <select
            className="font-family-property"
            value={textFontFamily}
            onChange={(e) => {
              setTextFontFamily(e.target.value as FontFamily);
              if (selectedTextId) {
                updateTextProperty("fontFamily", e.target.value);
              }
            }}
          >
            {FONT_FAMILY_PROPERTY.map((family) => (
              <option key={family.value} value={family.value}>
                {family.label}
              </option>
            ))}
          </select>
        </div>

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

          <div className="property-group">
            <label>Edit Text:</label>
            <input
              type="text"
              value={selectedText.text}
              onChange={(e) => updateTextProperty("text", e.target.value)}
              placeholder="Edit text content..."
            />
          </div>

          <div className="text-style-controls">
            <div className="property-group">
              <label>Font Size:</label>
              <div className="text-property">
                <input
                  key={`font-size-${selectedText?.id}`}
                  className="input-font-size"
                  type="number"
                  value={selectedText?.fontSize || textFontSize}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setTextFontSize(value);
                    updateTextProperty("fontSize", value);
                  }}
                />
                <span>px</span>
              </div>
            </div>

            <div className="property-group">
              <label>Font Weight:</label>
              <select
                className="font-weight-property"
                value={selectedText.fontStyle}
                onChange={(e) =>
                  updateTextProperty("fontStyle", e.target.value)
                }
              >
                {FONT_WEIGHT_PROPERTY.map((weight) => (
                  <option key={weight.value} value={weight.value}>
                    {weight.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="property-group">
              <label>Font Family:</label>
              <select
                value={selectedText.fontFamily}
                onChange={(e) =>
                  updateTextProperty("fontFamily", e.target.value)
                }
              >
                {FONT_FAMILY_PROPERTY.map((family) => (
                  <option key={family.value} value={family.value}>
                    {family.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="z-index-controls">
            <h4>Layer Controls</h4>
            <div className="z-index-buttons">
              <button
                type="button"
                onClick={bringToFront}
                className="layer-btn"
              >
                Bring to Front
              </button>
              <button type="button" onClick={moveForward} className="layer-btn">
                Move Forward
              </button>
              <button
                type="button"
                onClick={moveBackward}
                className="layer-btn"
              >
                Move Backward
              </button>
              <button type="button" onClick={sendToBack} className="layer-btn">
                Send to Back
              </button>
            </div>
            <div className="property-group">
              <label>Z-Index:</label>
              <input
                type="number"
                value={selectedText.zIndex}
                onChange={(e) =>
                  updateTextProperty("zIndex", parseInt(e.target.value))
                }
                style={{ width: "60px", marginLeft: "8px" }}
              />
            </div>
          </div>

          <div className="delete-text">
            <button
              type="button"
              onClick={deleteSelectedText}
              className="delete-btn"
            >
              Delete Text
            </button>
          </div>
        </div>
      )}

      {text.length > 0 && (
        <div className={CLASSNAME.LAYOUT.TEXT_LIST}>
          <h4>Text Elements ({text.length})</h4>
          <div className={CLASSNAME.LAYOUT.TEXT_ITEMS}>
            {text.map((textItem) => (
              <div
                key={textItem.id}
                className={`${CLASSNAME.LAYOUT.TEXT_ITEM} ${
                  selectedTextId === textItem.id
                    ? CLASSNAME.LAYOUT.SELECTED
                    : CLASSNAME.EMPTY
                }`}
                onClick={() => handleTextClick(textItem.id)}
              >
                <div className={CLASSNAME.LAYOUT.TEXT_INFO}>
                  <small>
                    {textItem.text} <br /> {textItem.fontSize}px •{"  "}
                    {textItem.fontStyle}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default TextComponent;
