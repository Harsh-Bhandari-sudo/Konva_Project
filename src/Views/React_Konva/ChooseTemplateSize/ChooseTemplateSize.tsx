// libs
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// styles
import "./choosetemplatesize.css";

// constants
import CLASSNAME from "../../../Shared/className";
import TEXT from "../../../Shared/text";
import SIZE_OPTIONS, { SizeOption } from "./helper/constant";

function ChooseTemplateSize() {
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);
  const navigate = useNavigate();

  const handleSizeSelect = (size: SizeOption) => {
    setSelectedSize(size);
  };

  const handleStartDesigning = () => {
    navigate("/konva", { state: { size: selectedSize } });
  };
  return (
    <div className={CLASSNAME.LAYOUT.CONTAINER}>
      <div className={CLASSNAME.LAYOUT.CHOOSE_TEMPLATE_SIZE}>
        <div className={CLASSNAME.LAYOUT.TITLE}>
          <span className={CLASSNAME.LAYOUT.TITLE}>
            {TEXT.MESSAGE.DESIGN_SIZE}
          </span>
        </div>

        <div className={CLASSNAME.LAYOUT.GRID}>
          {SIZE_OPTIONS.map((size) => (
            <button
              key={size?.name}
              type="button"
              className={`${CLASSNAME.BUTTON.SIZE_OPTION} ${
                selectedSize?.name === size.name
                  ? CLASSNAME.BUTTON.SIZE_OPTION_SELCTED
                  : CLASSNAME.EMPTY
              }`}
              onClick={() => handleSizeSelect(size)}
            >
              <h3 className={CLASSNAME.HEADER.SIZE_NAME}>{size.name}</h3>
              <p className={CLASSNAME.LAYOUT.SIZE_DIMENSIONS}>
                {size.width} {TEXT.ICON.CROSS} {size.height}
              </p>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleStartDesigning}
          className={`${CLASSNAME.BUTTON.BUTTON} ${
            !selectedSize ? CLASSNAME.BUTTON.BUTTON_DISABLED : CLASSNAME.EMPTY
          }`}
          disabled={!selectedSize}
        >
          {TEXT.BUTTON.START_DESIGNING}
        </button>

        {selectedSize && (
          <div className={CLASSNAME.LAYOUT.SELECTED_INFO}>
            {TEXT.MESSAGE.SELECTED} {selectedSize.name} ({selectedSize.width}{" "}
            {TEXT.ICON.CROSS} {selectedSize.height})
          </div>
        )}
      </div>
    </div>
  );
}

export default ChooseTemplateSize;
