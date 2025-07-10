import { SketchPicker } from "@hello-pangea/color-picker";
import { useEffect } from "react";
import { ShapeComponentProps } from "./types";

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
  selectedImageId,
}: ShapeComponentProps) {
  useEffect(() => {}, [selectedImageId]);
  return (
    <div className="shape-options">
      <div className="shape-buttons">
        <h4 className="color-title">Add Shapes</h4>
        <div className="shapes">
          <button type="button" onClick={() => addShape("rectangle")}>
            <svg
              width="90"
              height="90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="4"
                y="6"
                width="16"
                height="12"
                strokeWidth="0.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button type="button" onClick={() => addShape("circle")}>
            <svg
              width="90"
              height="90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="8"
                strokeWidth="0.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button type="button" onClick={() => addShape("triangle")}>
            <svg
              width="90"
              height="90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="12,4 4,20 20,20"
                strokeWidth="0.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>
          <button type="button" onClick={() => addShape("star")}>
            <svg
              width="90"
              height="90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                points="12,2 15,8.5 22,9.3 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.3 9,8.5"
                strokeWidth="0.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>
          <button type="button" onClick={() => addShape("ellipse")}>
            <svg
              width="90"
              height="90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="12"
                cy="12"
                rx="9"
                ry="6"
                strokeWidth="0.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {selectedShape && (
        <div className="shape-controls">
          <h3>Shape Properties</h3>

          <div className="color-controls">
            <label>Fill Color:</label>
            <SketchPicker
              color={shapeColor}
              onChangeComplete={handleShapeColorChange}
            />
          </div>

          <div className="color-controls">
            <label>Stroke Color:</label>
            <SketchPicker
              color={strokeColor}
              onChangeComplete={handleStrokeColorChange}
            />
          </div>

          <div className="property-group">
            <label>Stroke Width:</label>
            <div className="text-property">
              <input
                type="range"
                min="0"
                max="10"
                value={strokeWidth}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setStrokeWidth(value);
                  updateShapeProperty("strokeWidth", value);
                }}
              />
              <span>{strokeWidth ?? ""}px</span>
            </div>
          </div>

          {selectedShape && (
            <div className="selected-shape-controls">
              <h4>Selected Shape: {selectedShape.type}</h4>

              <div className="property-group">
                <label>Width:</label>
                <div className="text-property">
                  <input
                    key={`width-${selectedImageId}`}
                    type="number"
                    value={selectedShape.width}
                    onChange={(e) =>
                      updateShapeProperty("width", parseInt(e.target.value))
                    }
                  />
                  <span>px</span>
                </div>
              </div>

              <div className="property-group">
                <label>Height:</label>
                <div className="text-property">
                  <input
                    key={`height-${selectedImageId}`}
                    type="number"
                    value={selectedShape.height}
                    onChange={(e) =>
                      updateShapeProperty("height", parseInt(e.target.value))
                    }
                  />
                  <span>px</span>
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
                  <button
                    type="button"
                    onClick={moveForward}
                    className="layer-btn"
                  >
                    Move Forward
                  </button>
                  <button
                    type="button"
                    onClick={moveBackward}
                    className="layer-btn"
                  >
                    Move Backward
                  </button>
                  <button
                    type="button"
                    onClick={sendToBack}
                    className="layer-btn"
                  >
                    Send to Back
                  </button>
                </div>
                <div className="property-group">
                  <label>Z-Index:</label>
                  <input
                    type="number"
                    value={selectedShape.zIndex}
                    onChange={(e) =>
                      updateShapeProperty("zIndex", parseInt(e.target.value))
                    }
                    style={{ width: "60px", marginLeft: "8px" }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={deleteSelectedShape}
                className="delete-btn"
              >
                Delete Shape
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ShapeComponent;
