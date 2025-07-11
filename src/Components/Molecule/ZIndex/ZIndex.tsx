// libs
import { useMemo } from "react";

// constants and utils
import CLASSNAME from "../../../Shared/className";
import { zIndexConfig } from "../../../Shared/utils";
import { ZIndexProps } from "./helper/types";
import TEXT from "../../../Shared/text";

export default function ZIndex({
  bringToFront,
  moveForward,
  moveBackward,
  sendToBack,
  value,
  updateProperty,
}: ZIndexProps) {
  const zIndexOptions = useMemo(() => {
    return zIndexConfig(bringToFront, moveForward, moveBackward, sendToBack);
  }, [bringToFront, moveForward, moveBackward, sendToBack]);

  return (
    <div className={CLASSNAME.LAYOUT.Z_INDEX_CONTROL}>
      <h4>{TEXT.HEADER.LAYER_CONTROL}</h4>
      <div className={CLASSNAME.LAYOUT.Z_INDEX_BUTTON}>
        {zIndexOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={option.onClick}
            className={CLASSNAME.BUTTON.LAYER}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className={CLASSNAME.LAYOUT.PROPERTY_GROUP}>
        <label>{TEXT.LABEL.Z_INDEX}</label>
        <input
          type="number"
          title={TEXT.TITLE.INPUT}
          value={value}
          onChange={(e) =>
            updateProperty("zIndex", parseInt(e.target.value, 10))
          }
          style={{ width: "60px", marginLeft: "8px" }}
        />
      </div>
    </div>
  );
}
