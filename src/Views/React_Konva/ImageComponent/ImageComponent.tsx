// components
import ZIndex from "../../../Components/Molecule/ZIndex";
import CustomInput from "../../../Components/Atom/CustomInput";

// types
import { ImageComponentProps, ImageProperty } from "./helper/types";

// constants
import { IMAGES } from "../../../assets";
import TEXT from "../../../Shared/text";
import CLASSNAME from "../../../Shared/className";
import selectedPropertiesOptions from "../../../Shared/constant";
import IMAGE_CONFIG from "./helper/constant";

function ImageComponent({
  handleImageClick,
  selectedImageId,
  images,
  deleteSelectedImage,
  sendToBack,
  handleDragOver,
  dragOver,
  handleDragLeave,
  handleDrop,
  fileInputRef,
  handleFileUpload,
  selectedImage,
  updateImageProperty,
  bringToFront,
  moveForward,
  moveBackward,
}: ImageComponentProps) {
  return (
    <div className={CLASSNAME.LAYOUT.IMAGE_UPLOAD_SECTION}>
      <div
        className={`${CLASSNAME.LAYOUT.DRAG_DROP_AREA} ${
          dragOver ? CLASSNAME.LAYOUT.DRAG_OVER : CLASSNAME.EMPTY
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className={CLASSNAME.LAYOUT.DRAG_DROP_CONTENT}>
          <p>{TEXT.MESSAGE.ADD_YOUR_MEDIA}</p>
          <span>{TEXT.MESSAGE.UPLOAD_YOUR_MEDIA}</span>
          <button type="button">
            <img src={IMAGES.UPLOAD} alt={TEXT.TITLE.ALT} />
            <span className={CLASSNAME.LAYOUT.UPLOAD_MEDIA}>
              {TEXT.MESSAGE.UPLOAD_MEDIA}
            </span>
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={(e) => handleFileUpload(e.target.files)}
      />

      {selectedImage && (
        <div className={CLASSNAME.LAYOUT.IMAGE_CONTROLS}>
          <h4>{TEXT.HEADER.SELECTED_IMAGE}</h4>
          <div className={CLASSNAME.LAYOUT.SIZE_CONTROLS}>
            {selectedPropertiesOptions.map((option) => (
              <CustomInput
                key={option.value}
                type="number"
                label={option.label}
                value={selectedImage[option.value as ImageProperty]}
                min="20"
                displayValue="px"
                onChange={(e) =>
                  updateImageProperty(
                    option.value as ImageProperty,
                    parseInt(e.target.value, 10),
                  )
                }
              />
            ))}
          </div>

          <div className={CLASSNAME.LAYOUT.FILTER_CONTROLS}>
            {IMAGE_CONFIG.map((option) => (
              <CustomInput
                key={option.value}
                type="range"
                label={option.label}
                value={selectedImage[option.value as ImageProperty]}
                min={option.min}
                max={option.max}
                step={option.step}
                displayValue={selectedImage[
                  option.value as ImageProperty
                ].toFixed(1)}
                onChange={(e) =>
                  updateImageProperty(
                    option.value as ImageProperty,
                    parseFloat(e.target.value),
                  )
                }
              />
            ))}
          </div>

          <ZIndex
            bringToFront={bringToFront}
            moveForward={moveForward}
            moveBackward={moveBackward}
            sendToBack={sendToBack}
            value={selectedImage.zIndex}
            updateProperty={
              updateImageProperty as (property: string, value: number) => void
            }
          />

          <div className={CLASSNAME.LAYOUT.DELETE_TEXT}>
            <button
              type="button"
              onClick={deleteSelectedImage}
              className={CLASSNAME.BUTTON.DELETE}
            >
              {TEXT.BUTTON.DELETE_IMAGE}
            </button>
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className={CLASSNAME.LAYOUT.UPLOADED_IMAGES}>
          <h4>
            {TEXT.HEADER.UPLOADED_IMAGES} ({images.length})
          </h4>
          <div className={CLASSNAME.LAYOUT.IMAGES_GRID}>
            {images.map((image) => (
              <div
                key={image.id}
                className={`${CLASSNAME.LAYOUT.IMAGE_THUMBNAIL} ${
                  selectedImageId === image.id
                    ? CLASSNAME.LAYOUT.SELECTED
                    : CLASSNAME.EMPTY
                }`}
                onClick={() => handleImageClick(image.id)}
              >
                <img
                  src={image.src}
                  alt={TEXT.TITLE.ALT}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default ImageComponent;
