// constants
import { IMAGES } from "../../../assets";
import TEXT from "../../../Shared/text";
import { FilterType, FilterButtonsProps, FILTER_OPTIONS } from "./helper";
import CLASSNAME from "../../../Shared/className";

function FilterButtons({
  activeFilter,
  setActiveFilter,
  handleDownload,
}: FilterButtonsProps) {
  return (
    <div className={CLASSNAME.LAYOUT.FILTER}>
      {FILTER_OPTIONS.map((option) => (
        <button
          type="button"
          key={option.value}
          className={`${CLASSNAME.BUTTON.FILTER}${
            activeFilter === option.value
              ? CLASSNAME.BUTTON.ACTIVE
              : CLASSNAME.EMPTY
          }`}
          onClick={() => {
            setActiveFilter(
              activeFilter === option.value
                ? null
                : (option.value as FilterType)
            );
            if (option.value === TEXT.LABEL.DOWNLOAD) handleDownload();
          }}
        >
          <img
            src={IMAGES[option.src as keyof typeof IMAGES]}
            alt={TEXT.TITLE.ALT}
          />
          <span
            className={`${CLASSNAME.BUTTON.FILTER_BTN_TITLE}${
              activeFilter === option.value ? null : CLASSNAME.BUTTON.ACTIVE
            }`}
          >
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
