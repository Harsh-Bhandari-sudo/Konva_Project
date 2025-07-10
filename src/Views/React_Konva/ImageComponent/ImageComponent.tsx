import { ImageComponentProps } from "./types";

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
    <div className="image-upload-section">
      <div
        className={`drag-drop-area ${dragOver ? "drag-over" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="drag-drop-content">
          <p>Add your media</p>
          <span>You can upload your media from your device.</span>
          <button type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="upload-media"> Upload media</span>
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
        <div className="image-controls">
          <h4>Selected Image Properties</h4>

          <div className="size-controls">
            <div className="property-group">
              <label>Width:</label>
              <div className="text-property">
                <input
                  className="input-font-size"
                  type="number"
                  min="20"
                  value={selectedImage.width}
                  onChange={(e) =>
                    updateImageProperty("width", parseInt(e.target.value))
                  }
                />
                <span>px</span>
              </div>
            </div>

            <div className="property-group">
              <label>Height:</label>
              <div className="text-property">
                <input
                  className="input-font-size"
                  type="number"
                  min="20"
                  value={selectedImage.height}
                  onChange={(e) =>
                    updateImageProperty("height", parseInt(e.target.value))
                  }
                />
                <span>px</span>
              </div>
            </div>
          </div>

          <div className="filter-controls">
            <div className="property-group">
              <label>Brightness:</label>
              <div className="text-property">
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={selectedImage.brightness}
                  onChange={(e) =>
                    updateImageProperty(
                      "brightness",
                      parseFloat(e.target.value)
                    )
                  }
                />
                <span>{selectedImage.brightness.toFixed(1)}</span>
              </div>
            </div>
            <div className="property-group">
              <label>Contrast:</label>
              <div className="text-property">
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={selectedImage.contrast}
                  onChange={(e) =>
                    updateImageProperty("contrast", parseFloat(e.target.value))
                  }
                />
                <span>{selectedImage.contrast.toFixed(1)}</span>
              </div>
            </div>

            <div className="property-group">
              <label>Saturation:</label>
              <div className="text-property">
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={selectedImage.saturation}
                  onChange={(e) =>
                    updateImageProperty(
                      "saturation",
                      parseFloat(e.target.value)
                    )
                  }
                />
                <span>{selectedImage.saturation.toFixed(1)}</span>
              </div>
            </div>

            <div className="property-group">
              <label>Opacity:</label>
              <div className="text-property">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={selectedImage.opacity}
                  onChange={(e) =>
                    updateImageProperty("opacity", parseFloat(e.target.value))
                  }
                />
                <span>{selectedImage.opacity.toFixed(1)}</span>
              </div>
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
                value={selectedImage.zIndex}
                onChange={(e) =>
                  updateImageProperty("zIndex", parseInt(e.target.value))
                }
                style={{ width: "60px", marginLeft: "8px" }}
              />
            </div>
          </div>

          <div className="delete-text">
            <button
              type="button"
              onClick={deleteSelectedImage}
              className="delete-btn"
            >
              Delete Image
            </button>
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className="uploaded-images">
          <h4>Uploaded Images ({images.length})</h4>
          <div className="images-grid">
            {images.map((image) => (
              <div
                key={image.id}
                className={`image-thumbnail ${
                  selectedImageId === image.id ? "selected" : ""
                }`}
                onClick={() => handleImageClick(image.id)}
              >
                <img
                  src={image.src}
                  alt="Uploaded"
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
