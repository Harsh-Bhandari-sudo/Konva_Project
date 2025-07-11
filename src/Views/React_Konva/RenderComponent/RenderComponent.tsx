// libs
import {
  Stage,
  Layer,
  Rect,
  Transformer,
  Image as KonvaImage,
} from "react-konva";
import { useRef, useEffect } from "react";
import Konva from "konva";

// styles
import "../../DynamicCss/CustomizeImage/CustomizeImage.css";

// constants and utils
import { ShapeData, CardImage, TextState } from "../../../Shared/types";
import { RenderImageProps } from "./helper/types";

function RenderImage({
  stageRef,
  selectedColor,
  backgroundImage,
  shapes,
  images,
  text,
  sortByZIndex,
  renderShape,
  renderImage,
  renderText,
  transformerRef,
  selectedTextId,
  selectedImageId,
  selectedShapeId,
  size,
}: RenderImageProps) {
  const localTransformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    const transformer = transformerRef.current || localTransformerRef.current;
    if (!transformer) return;

    if (selectedTextId) {
      transformer.anchorSize(8);
      transformer.borderStroke("#00ff00");
      transformer.borderStrokeWidth(1);
      transformer.enabledAnchors([
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ]);
      transformer.keepRatio(false);
    } else {
      transformer.anchorSize(8);
      transformer.borderStroke("#00ff00");
      transformer.borderStrokeWidth(1);
      transformer.enabledAnchors([
        "top-left",
        "top-center",
        "top-right",
        "middle-left",
        "middle-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ]);
      transformer.keepRatio(false);
    }
  }, [selectedTextId, selectedImageId, selectedShapeId]);

  return (
    <div className="image">
      <div className="template">
        <Stage ref={stageRef} width={size.width} height={size.height}>
          <Layer>
            <Rect
              width={size.width}
              height={size.height}
              fill={selectedColor}
              shadowColor="rgba(11, 5, 5, 0.5)"
              shadowBlur={10}
              shadowOffset={{ x: 5, y: 5 }}
              shadowOpacity={0.8}
              listening={false}
            />

            {backgroundImage && (
              <KonvaImage
                image={backgroundImage}
                width={size.width}
                height={size.height}
              />
            )}

            {[...shapes, ...images, ...text]
              .sort(sortByZIndex)
              .map((element) => {
                if ("type" in element) return renderShape(element as ShapeData);
                if ("src" in element) return renderImage(element as CardImage);
                return renderText(element as TextState);
              })}

            <Transformer
              ref={transformerRef || localTransformerRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
              anchorSize={8}
              borderEnabled
              borderStroke="#00ff00"
              borderStrokeWidth={1}
              anchorStroke="#00ff00"
              anchorCornerRadius={4}
              rotateAnchorOffset={30}
              ignoreStroke={false}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default RenderImage;
