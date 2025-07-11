// libs
import { useRef } from "react";

// components
import { SketchPicker } from "@hello-pangea/color-picker";

// constants
import CLASSNAME from "../../../Shared/className";
import { ColorComponentProps } from "./helper/types";
import TEXT from "../../../Shared/text";

function ColorComponent({
  selectedColor,
  handleColorChange,
  handleFileUpload,
  backgroundImage,
  setBackgroundImage,
  setSelectedColor,
}: ColorComponentProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={CLASSNAME.LAYOUT.COLOR_PICKER_CONTAINER}>
      <div className={CLASSNAME.LAYOUT.ADD_COLORS}>
        <h4 className={CLASSNAME.HEADER.COLOR_TITLE}>{TEXT.HEADER.COLOR}</h4>
        <SketchPicker
          color={selectedColor}
          onChangeComplete={handleColorChange}
        />
      </div>
      <div className={CLASSNAME.LAYOUT.BACKGROUND_IMAGE_UPLOAD}>
        <h4 className={CLASSNAME.HEADER.COLOR_TITLE}>
          {TEXT.HEADER.BACKGROUND_IMG}
        </h4>
        <div className={CLASSNAME.LAYOUT.UPLOAD_WRAPPER}>
          <input
            title={TEXT.TITLE.INPUT}
            ref={fileInputRef}
            className={CLASSNAME.INPUT.CHOOSE_FILE}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files)}
          />
          {backgroundImage && (
            <button
              type="button"
              onClick={() => {
                setBackgroundImage(null);
                setSelectedColor("#ffffff");
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              className={CLASSNAME.BUTTON.DELETE}
            >
              {TEXT.BUTTON.REMOVE}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ColorComponent;
