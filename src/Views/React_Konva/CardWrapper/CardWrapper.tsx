import "../../DynamicCss/CustomizeImage/CustomizeImage.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Stage as KonvaStage } from "konva/lib/Stage";
import Konva from "konva";
import { useState, useRef, useEffect } from "react";
import {
  Rect,
  Circle,
  RegularPolygon,
  Star,
  Ellipse,
  Image as KonvaImage,
  Text as KonvaText,
} from "react-konva";
import { ColorResult } from "@hello-pangea/color-picker";
import { KonvaEventObject } from "konva/lib/Node";
import {
  saveTemplate,
  listTemplates,
  TemplateData,
  getTemplate,
} from "../../../Services/firebase";
import { FontFamily } from "../TextComponent/helper/type";
import { Template } from "../TemplateContainer/helper/types";
import { ShapeData, CardImage, TextState } from "../../../Shared/types";
import {
  sortByZIndex,
  handleDownload,
  deleteSelectedItem,
} from "../../../Shared/utils";
import TextComponent from "../TextComponent/TextComponent";
import ImageComponent from "../ImageComponent/ImageComponent";
import ShapeComponent from "../ShapeComponent/ShapeComponent";
import SaveTemplate from "../SaveTemplate/SaveTemplate";
import TemplateContainer from "../TemplateContainer/TemplateContainer";
import ColorComponent from "../ColorComponent/ColorComponent";
import RenderImage from "../RenderComponent/RenderComponent";
import FilterButtons from "../FilterButtons/FilterButtons";

type TemplateListItem = {
  name: string;
  data: TemplateData;
};

function CardWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedSize = location?.state?.size || undefined;
  const [size] = useState(selectedSize || { height: 700, width: 600 });

  const [templates, setTemplates] = useState<TemplateListItem[]>([]);
  const [templateName, setTemplateName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [text, setText] = useState<TextState[]>([]);
  const [backgroundImage, setBackgroundImage] =
    useState<HTMLImageElement | null>(null);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [activeFilter, setActiveFilter] = useState<
    | "color"
    | "shape"
    | "image"
    | "text"
    | "download"
    | "save"
    | "template"
    | "size"
    | null
  >(null);
  const [shapes, setShapes] = useState<ShapeData[]>([]);
  const [images, setImages] = useState<CardImage[]>([]);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [shapeColor, setShapeColor] = useState("#ff0000");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string | null>(
    null,
  );

  const [textInput, setTextInput] = useState("");
  const [textFontSize, setTextFontSize] = useState(24);
  const [textFontFamily, setTextFontFamily] = useState("Arial");
  const [textFontWeight, setTextFontWeight] = useState("normal");
  const [textColor, setTextColor] = useState("#000000");

  const generateThumbnail = (
    stageRef: React.RefObject<KonvaStage>,
  ): string | null => {
    if (!stageRef.current) return null;

    try {
      const stage = stageRef.current.getStage();
      const originalWidth = stage.width();
      const originalHeight = stage.height();
      const maxSize = 200;
      const scale = Math.min(maxSize / originalWidth, maxSize / originalHeight);
      const thumbnailWidth = originalWidth * scale;
      const thumbnailHeight = originalHeight * scale;

      const tempStage = new Konva.Stage({
        width: thumbnailWidth,
        height: thumbnailHeight,
        container: document.createElement("div"),
      });

      const originalLayer = stage.children[0];
      const clonedLayer = originalLayer.clone();

      clonedLayer.scale({ x: scale, y: scale });
      tempStage.add(clonedLayer);

      const dataURL = tempStage.toDataURL({
        width: thumbnailWidth,
        height: thumbnailHeight,
        quality: 0.8,
        pixelRatio: 1,
      });

      tempStage.destroy();

      return dataURL;
    } catch (error) {
      console.error("Error generating thumbnail:", error);
      return null;
    }
  };

  const loadTemplates = async () => {
    try {
      const templateList = await listTemplates();
      setTemplates(templateList);
    } catch (error) {
      console.error("Error loading templates:", error);
    }
  };

  useEffect(() => {
    if (activeFilter === "template") {
      loadTemplates();
    }
  }, [activeFilter]);

  const loadTemplate = async (templateName: string) => {
    setIsLoading(true);
    try {
      const templateData = await getTemplate(templateName);
      setShapes(templateData.shapes);
      setText(templateData.text);

      const restoredImages: CardImage[] = await Promise.all(
        templateData.images.map(async (imgData) => {
          const img = new Image();
          return new Promise<CardImage>((resolve) => {
            img.onload = () => {
              resolve({
                ...imgData,
                imageElement: img,
              });
            };
            img.src = imgData.src;
          });
        }),
      );
      setImages(restoredImages);
      setSelectedColor(templateData.background.color);
      if (templateData.background.imageUrl) {
        const bgImg = new Image();
        bgImg.onload = () => {
          setBackgroundImage(bgImg);
          setBackgroundImageUrl(templateData.background.imageUrl || null);
        };
        bgImg.src = templateData.background.imageUrl;
      } else {
        setBackgroundImage(null);
        setBackgroundImageUrl(null);
      }

      setSelectedShapeId(null);
      setSelectedImageId(null);
      setSelectedTextId(null);
    } catch (error) {
      console.error("Error loading template:", error);
      alert(
        `Failed to load template: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTemplate = async () => {
    if (!templateName.trim()) {
      alert("Please enter a template name");
      return;
    }

    setIsLoading(true);
    try {
      const thumbnail = generateThumbnail(stageRef);

      const templateData: TemplateData = {
        shapes,
        images: images.map((img) => ({
          ...img,
          src: img.src,
          imageElement: null,
        })),
        text,
        background: {
          color: selectedColor,
          ...(backgroundImageUrl && { imageUrl: backgroundImageUrl }),
        },
        thumbnail,
        frameSize: size,
        createdAt: new Date().toISOString(),
      };
      console.log("template name in firebase", templateName);
      await saveTemplate(templateName, templateData);

      alert("Template saved successfully!");
      setTemplateName("");
      loadTemplates();
    } catch (error) {
      console.error("Error saving template:", error);
      alert("Failed to save template");
    } finally {
      setIsLoading(false);
    }
  };

  const handleColorChange = (color: ColorResult) => {
    setSelectedColor(color.hex);
  };

  const handleShapeColorChange = (color: ColorResult) => {
    setShapeColor(color.hex);
    if (selectedShapeId) {
      setShapes(
        shapes.map((shape) =>
          shape.id === selectedShapeId ? { ...shape, fill: color.hex } : shape,
        ),
      );
    }
  };

  const handleStrokeColorChange = (color: ColorResult) => {
    setStrokeColor(color.hex);
    if (selectedShapeId) {
      setShapes(
        shapes.map((shape) =>
          shape.id === selectedShapeId
            ? { ...shape, stroke: color.hex }
            : shape,
        ),
      );
    }
  };

  const handleTextColorChange = (color: ColorResult) => {
    setTextColor(color.hex);
    if (selectedTextId) {
      setText(
        text.map((textItem) =>
          textItem?.id === selectedTextId
            ? { ...textItem, fill: color.hex }
            : textItem,
        ),
      );
    }
  };

  const addText = () => {
    if (!textInput.trim()) return;

    const maxZIndex = Math.max(
      ...shapes.map((s) => s.zIndex),
      ...images.map((i) => i.zIndex),
      ...text.map((t) => t.zIndex),
      0,
    );

    const newText: TextState = {
      id: Date.now().toString(),
      text: textInput,
      x: 20,
      y: 20,
      fontSize: textFontSize,
      fontFamily: textFontFamily as FontFamily,
      fontStyle: textFontWeight,
      fill: textColor,
      zIndex: maxZIndex + 1,
      width: textInput.length * (textFontSize * 0.6),
      height: textFontSize * 1.2,
    };

    setText([...text, newText]);
    setSelectedTextId(newText.id);
    setSelectedShapeId(null);
    setSelectedImageId(null);
    setTextInput("");
  };

  const addShape = (type: ShapeData["type"]) => {
    const maxZIndex = Math.max(
      ...shapes.map((s) => s.zIndex),
      ...images.map((i) => i.zIndex),
      ...text.map((t) => t.zIndex),
      0,
    );

    const newShape: ShapeData = {
      id: Date.now().toString(),
      type,
      x: 20,
      y: 20,
      width: type === "circle" ? 100 : 100,
      height: type === "circle" ? 100 : 100,
      fill: shapeColor,
      stroke: strokeColor,
      strokeWidth,
      zIndex: maxZIndex + 1,
    };

    setShapes([...shapes, newShape]);
    setSelectedShapeId(newShape.id);
    setSelectedImageId(null);
    setSelectedTextId(null);
    setShapeColor(newShape.fill);
    setStrokeColor(newShape.stroke);
    setStrokeWidth(newShape.strokeWidth);
  };

  const handleShapeDragEnd = (
    e: KonvaEventObject<DragEvent>,
    shapeId: string,
  ) => {
    const newShapes = shapes.map((shape) => {
      if (shape.id === shapeId) {
        return {
          ...shape,
          x: e.target.x(),
          y: e.target.y(),
        };
      }
      return shape;
    });
    setShapes(newShapes);
  };

  const handleImageDragEnd = (
    e: KonvaEventObject<DragEvent>,
    imageId: string,
  ) => {
    const newImages = images.map((image) => {
      if (image.id === imageId) {
        return {
          ...image,
          x: e.target.x(),
          y: e.target.y(),
        };
      }
      return image;
    });
    setImages(newImages);
  };

  const handleTextDragEnd = (
    e: KonvaEventObject<DragEvent>,
    textId: string,
  ) => {
    const newTexts = text.map((textItem) => {
      if (textItem.id === textId) {
        return {
          ...textItem,
          x: e.target.x(),
          y: e.target.y(),
        };
      }
      return textItem;
    });
    setText(newTexts);
  };

  const handleShapeClick = (shapeId: string) => {
    if (selectedShapeId === shapeId) {
      setSelectedShapeId(null);
      setActiveFilter(null);
      return;
    }
    setSelectedShapeId(shapeId);
    setSelectedImageId(null);
    setSelectedTextId(null);
    setActiveFilter("shape");
    const shape = shapes.find((s) => s.id === shapeId);
    if (shape) {
      setShapeColor(shape.fill);
      setStrokeColor(shape.stroke);
      setStrokeWidth(shape.strokeWidth);
    }
  };

  const handleImageClick = (imageId: string) => {
    if (selectedImageId === imageId) {
      setSelectedImageId(null);
      setActiveFilter(null);
      return;
    }
    setSelectedImageId(imageId);
    setSelectedShapeId(null);
    setSelectedTextId(null);
    setActiveFilter("image");
  };

  const handleTextClick = (textId: string) => {
    if (selectedTextId === textId) {
      const currentText = text.find((t) => t.id === textId);
      if (currentText) {
        setTextFontSize(currentText.fontSize);
      }
      setSelectedTextId(null);
      setActiveFilter(null);
      return;
    }

    setSelectedTextId(textId);
    setSelectedShapeId(null);
    setSelectedImageId(null);
    setActiveFilter("text");
    const textItem = text.find((t) => t.id === textId);
    if (textItem) {
      setTextFontSize(textItem.fontSize);
      setTextFontFamily(textItem.fontFamily);
      setTextFontWeight(textItem.fontStyle);
      setTextColor(textItem.fill);
    }
  };
  const updateShapeProperty = (
    property: keyof ShapeData,
    value: number | string,
  ) => {
    if (selectedShapeId) {
      setShapes(
        shapes.map((shape) =>
          shape.id === selectedShapeId
            ? { ...shape, [property]: value }
            : shape,
        ),
      );

      const node = stageRef.current?.findOne(`#${selectedShapeId}`);
      if (node) {
        const shape = shapes.find((s) => s.id === selectedShapeId);
        if (!shape) return;

        switch (property) {
          case "width":
            if (shape.type === "circle") {
              (node as Konva.Circle).radius(Number(value) / 2);
            } else if (shape.type === "ellipse") {
              (node as Konva.Ellipse).radiusX(Number(value) / 2);
            } else {
              node.width(Number(value));
            }
            node.scaleX(1);
            break;
          case "height":
            if (shape.type === "ellipse") {
              (node as Konva.Ellipse).radiusY(Number(value) / 2);
            } else {
              node.height(Number(value));
            }
            node.scaleY(1);
            break;
        }
        node.getLayer()?.batchDraw();
      }
    }
  };
  const updateImageProperty = (property: keyof CardImage, value: number) => {
    if (selectedImageId) {
      setImages((prevImages) =>
        prevImages.map((image) =>
          image.id === selectedImageId
            ? { ...image, [property]: value }
            : image,
        ),
      );

      const node = stageRef.current?.findOne(
        `#${selectedImageId}`,
      ) as Konva.Image;
      if (node) {
        if (property === "width") {
          node.width(value);
          node.scaleX(1);
        } else if (property === "height") {
          node.height(value);
          node.scaleY(1);
        }
        node.getLayer()?.batchDraw();
      }
    }
  };
  const updateTextProperty = (
    property: keyof TextState,
    value: string | number,
  ) => {
    if (selectedTextId) {
      setText((prevText) =>
        prevText.map((textItem) =>
          textItem.id === selectedTextId
            ? { ...textItem, [property]: value }
            : textItem,
        ),
      );
      if (property === "fontSize") {
        setTextFontSize(Number(value));
      }
    }
  };
  const bringToFront = () => {
    const maxZIndex = Math.max(
      ...shapes.map((s) => s.zIndex),
      ...images.map((i) => i.zIndex),
      ...text.map((t) => t.zIndex),
      0,
    );

    if (selectedShapeId) {
      updateShapeProperty("zIndex", maxZIndex + 1);
    } else if (selectedImageId) {
      updateImageProperty("zIndex", maxZIndex + 1);
    } else if (selectedTextId) {
      updateTextProperty("zIndex", maxZIndex + 1);
    }
  };

  const sendToBack = () => {
    const minZIndex = Math.min(
      ...shapes.map((s) => s.zIndex),
      ...images.map((i) => i.zIndex),
      ...text.map((t) => t.zIndex),
      0,
    );

    if (selectedShapeId) {
      updateShapeProperty("zIndex", minZIndex - 1);
    } else if (selectedImageId) {
      updateImageProperty("zIndex", minZIndex - 1);
    } else if (selectedTextId) {
      updateTextProperty("zIndex", minZIndex - 1);
    }
  };

  const moveForward = () => {
    if (selectedShapeId) {
      const currentShape = shapes.find((s) => s.id === selectedShapeId);
      if (currentShape) {
        updateShapeProperty("zIndex", currentShape.zIndex + 1);
      }
    } else if (selectedImageId) {
      const currentImage = images.find((i) => i.id === selectedImageId);
      if (currentImage) {
        updateImageProperty("zIndex", currentImage.zIndex + 1);
      }
    } else if (selectedTextId) {
      const currentText = text.find((t) => t.id === selectedTextId);
      if (currentText) {
        updateTextProperty("zIndex", currentText.zIndex + 1);
      }
    }
  };

  const moveBackward = () => {
    if (selectedShapeId) {
      const currentShape = shapes.find((s) => s.id === selectedShapeId);
      if (currentShape) {
        updateShapeProperty("zIndex", currentShape.zIndex - 1);
      }
    } else if (selectedImageId) {
      const currentImage = images.find((i) => i.id === selectedImageId);
      if (currentImage) {
        updateImageProperty("zIndex", currentImage.zIndex - 1);
      }
    } else if (selectedTextId) {
      const currentText = text.find((t) => t.id === selectedTextId);
      if (currentText) {
        updateTextProperty("zIndex", currentText.zIndex - 1);
      }
    }
  };

  const convertTemplateListItemToTemplate = (
    item: TemplateListItem,
  ): Template => {
    return {
      ...item,
      data: {
        ...item.data,
        frameSize: item.data.frameSize || { width: 800, height: 600 }, // Provide default
        thumbnail: item.data.thumbnail || "",
      },
    };
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    if (activeFilter === "color") {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            setBackgroundImage(img);
            setSelectedColor("transparent");
          };
          img.src = e.target?.result as string;
          setBackgroundImageUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
      return;
    }

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const maxZIndex = Math.max(
              ...shapes.map((s) => s.zIndex),
              ...images.map((i) => i.zIndex),
              ...text.map((t) => t.zIndex),
              0,
            );
            const newImage: CardImage = {
              id: Date.now().toString() + Math.random(),
              src: e.target?.result as string,
              x: 20,
              y: 20,
              width: Math.min(img.width, 200),
              height: Math.min(img.height, 200),
              originalWidth: img.width,
              originalHeight: img.height,
              brightness: 1,
              contrast: 1,
              saturation: 1,
              opacity: 1,
              zIndex: maxZIndex + 1,
              imageElement: img,
            };
            setImages((prev) => [...prev, newImage]);
            setSelectedImageId(newImage.id);
            setSelectedShapeId(null);
            setSelectedTextId(null);
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const renderShape = (shape: ShapeData) => {
    const commonProps = {
      onMouseEnter: () => {
        const container = stageRef.current?.getStage().container();
        if (container) container.style.cursor = "pointer";
      },
      onMouseLeave: () => {
        const container = stageRef.current?.getStage().container();
        if (container) container.style.cursor = "default";
      },
      id: shape.id,
      key: shape.id,
      x: shape.x,
      y: shape.y,
      fill: shape.fill,
      stroke: shape.stroke,
      strokeWidth: shape.strokeWidth,
      draggable: true,
      onClick: () => handleShapeClick(shape.id),
      onDragEnd: (e: KonvaEventObject<DragEvent>) =>
        handleShapeDragEnd(e, shape.id),
      onTransformEnd: () => {
        const node = stageRef.current?.findOne(`#${shape.id}`);
        console.log("node of the shape", node);
        if (node) {
          const updates: Partial<ShapeData> = {
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
          };
          switch (shape.type) {
            case "rectangle":
            case "ellipse":
              updates.width = Math.max(10, node.width() * node.scaleX());
              updates.height = Math.max(10, node.height() * node.scaleY());
              break;
            case "circle":
              const circle = node as Konva.Circle;
              updates.width = Math.max(10, circle.radius() * 2 * node.scaleX());
              updates.height = Math.max(
                10,
                circle.radius() * 2 * node.scaleY(),
              );
              break;
            case "triangle":
            case "star":
              updates.width = Math.max(10, shape.width * node.scaleX());
              updates.height = Math.max(10, shape.height * node.scaleY());
              break;
          }

          setShapes(
            shapes.map((s) => (s.id === shape.id ? { ...s, ...updates } : s)),
          );
          node.scaleX(1);
          node.scaleY(1);
          node.getLayer()?.batchDraw();
        }
      },
    };

    switch (shape.type) {
      case "rectangle":
        return (
          <Rect {...commonProps} width={shape.width} height={shape.height} />
        );
      case "circle":
        return <Circle {...commonProps} radius={shape.width / 2} />;
      case "triangle":
        return (
          <RegularPolygon {...commonProps} sides={3} radius={shape.width / 2} />
        );
      case "star":
        return (
          <Star
            {...commonProps}
            numPoints={5}
            innerRadius={shape.width / 4}
            outerRadius={shape.width / 2}
          />
        );
      case "ellipse":
        return (
          <Ellipse
            {...commonProps}
            radiusX={shape.width / 2}
            radiusY={shape.height / 2}
          />
        );
      default:
        return <></>;
    }
  };
  const renderImage = (imageData: CardImage) => {
    const isSelected = imageData.id === selectedImageId;
    return (
      <KonvaImage
        id={imageData.id}
        key={imageData.id}
        image={imageData.imageElement}
        x={imageData.x}
        y={imageData.y}
        width={imageData.width}
        height={imageData.height}
        draggable
        stroke={isSelected ? "#00ff00" : undefined}
        strokeWidth={isSelected ? 3 : undefined}
        onDragEnd={(e: KonvaEventObject<DragEvent>) =>
          handleImageDragEnd(e, imageData.id)
        }
        onClick={() => handleImageClick(imageData.id)}
        onTap={() => handleImageClick(imageData.id)}
        brightness={imageData.brightness}
        contrast={imageData.contrast}
        saturation={imageData.saturation}
        opacity={imageData.opacity}
        onTransformEnd={() => {
          const node = stageRef.current?.findOne(
            `#${imageData.id}`,
          ) as Konva.Image;

          if (node) {
            const newWidth = Math.max(10, node.width() * node.scaleX());
            const newHeight = Math.max(10, node.height() * node.scaleY());
            setImages(
              images.map((img) =>
                img.id === imageData.id
                  ? {
                      ...img,
                      x: node.x(),
                      y: node.y(),
                      width: newWidth,
                      height: newHeight,
                      rotation: node.rotation(),
                    }
                  : img,
              ),
            );
            node.scaleX(1);
            node.scaleY(1);
            node.getLayer()?.batchDraw();
          }
        }}
      />
    );
  };
  const renderText = (textData: TextState) => {
    return (
      <KonvaText
        id={textData.id}
        key={textData.id}
        text={textData.text}
        x={textData.x}
        y={textData.y}
        fontSize={textData.fontSize}
        fontFamily={textData.fontFamily}
        fontStyle={textData.fontStyle}
        fill={textData.fill}
        draggable
        onDragEnd={(e: KonvaEventObject<DragEvent>) =>
          handleTextDragEnd(e, textData.id)
        }
        onClick={() => handleTextClick(textData.id)}
        onTap={() => handleTextClick(textData.id)}
        onDblClick={() => handleTextClick(textData.id)}
        onDblTap={() => handleTextClick(textData.id)}
        perfectDrawEnabled={false}
        listening
        onTransformEnd={() => {
          const node = stageRef.current?.findOne(
            `#${textData.id}`,
          ) as Konva.Text;
          console.log("node of text");
          if (node) {
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            const scaleFactor = Math.max(scaleX, scaleY);
            const newFontSize = Math.max(8, textData.fontSize * scaleFactor);

            updateTextProperty("x", node.x());
            updateTextProperty("y", node.y());
            updateTextProperty("width", node.textWidth);
            updateTextProperty("height", node.textHeight);

            updateTextProperty("fontSize", newFontSize);
            updateTextProperty("scaleX", 1);
            updateTextProperty("scaleY", 1);

            if (selectedTextId === textData.id) {
              setTextFontSize(newFontSize);
            }

            node.getLayer()?.batchDraw();
          }
        }}
      />
    );
  };
  const selectedShape = shapes.find((s) => s.id === selectedShapeId);
  const selectedImage = images.find((i) => i.id === selectedImageId);
  const selectedText = text.find((t) => t.id === selectedTextId);

  const stageRef = useRef<KonvaStage>(null);

  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (!transformerRef.current) return;

    let selectedNode: Konva.Node | null | undefined;

    if (selectedImageId) {
      selectedNode = stageRef.current?.findOne(`#${selectedImageId}`);
    } else if (selectedTextId) {
      selectedNode = stageRef.current?.findOne(`#${selectedTextId}`);
    } else if (selectedShapeId) {
      selectedNode = stageRef.current?.findOne(`#${selectedShapeId}`);
    }

    if (selectedNode) {
      transformerRef.current?.nodes([selectedNode]);
      transformerRef.current.getLayer()?.batchDraw();
    } else {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedImageId, selectedTextId, selectedShapeId]);

  return (
    <div className="wrapper">
      <FilterButtons
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        handleDownload={handleDownload}
      />

      <RenderImage
        stageRef={stageRef}
        selectedColor={selectedColor}
        backgroundImage={backgroundImage}
        shapes={shapes}
        images={images}
        text={text}
        sortByZIndex={sortByZIndex}
        renderShape={renderShape}
        renderImage={renderImage}
        renderText={renderText}
        transformerRef={transformerRef}
        selectedTextId={selectedTextId}
        selectedImageId={selectedImageId}
        selectedShapeId={selectedShapeId}
        size={size}
      />

      {!activeFilter ? (
        <div className="options">
          <h2 className="design-options">Design</h2>
          <div className="temp-size">
            <span>Size</span>
            <button
              type="button"
              className="size-dimensions"
              onClick={() => navigate("/chosen-template")}
            >
              <span className="size-name">{size?.name}</span>
              <span className="dimensions">
                {size?.width}px x {size?.height}px
              </span>
            </button>
          </div>
          <div className="temp-size">
            <span>Background</span>
            {backgroundImage ? (
              <div className="selected-image">
                <img src={backgroundImage.src} />
              </div>
            ) : (
              <div className="size-dimensions">
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "36px",
                    border: "1px solid grey",
                    backgroundColor: selectedColor,
                  }}
                />
                <span className="dimensions">{selectedColor}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="options">
          <h2 className="design-options">Design</h2>
          {activeFilter === "color" && (
            <ColorComponent
              selectedColor={selectedColor}
              handleColorChange={handleColorChange}
              handleFileUpload={handleFileUpload}
              backgroundImage={backgroundImage}
              setBackgroundImage={setBackgroundImage}
              setSelectedColor={setSelectedColor}
            />
          )}
          {activeFilter === "shape" && (
            <ShapeComponent
              selectedImageId={selectedImageId}
              deleteSelectedShape={() =>
                deleteSelectedItem<ShapeData>({
                  items: shapes,
                  selectedId: selectedShapeId ?? "",
                  setItems: setShapes,
                  setSelectedItemsId: setSelectedShapeId,
                })
              }
              sendToBack={sendToBack}
              moveBackward={moveBackward}
              moveForward={moveForward}
              addShape={addShape}
              selectedShape={selectedShape || null}
              handleShapeColorChange={handleShapeColorChange}
              shapeColor={shapeColor}
              strokeColor={strokeColor}
              handleStrokeColorChange={handleStrokeColorChange}
              strokeWidth={strokeWidth}
              setStrokeWidth={setStrokeWidth}
              updateShapeProperty={updateShapeProperty}
              bringToFront={bringToFront}
            />
          )}
          {/* CUSTOMIZE IMAGE */}
          {activeFilter === "image" && (
            <ImageComponent
              handleImageClick={handleImageClick}
              selectedImageId={selectedImageId}
              images={images}
              deleteSelectedImage={() =>
                deleteSelectedItem<CardImage>({
                  items: images,
                  selectedId: selectedImageId ?? "",
                  setItems: setImages,
                  setSelectedItemsId: setSelectedImageId,
                })
              }
              sendToBack={sendToBack}
              handleDragOver={handleDragOver}
              dragOver={dragOver}
              handleDragLeave={handleDragLeave}
              handleDrop={handleDrop}
              fileInputRef={fileInputRef}
              handleFileUpload={handleFileUpload}
              selectedImage={selectedImage || null}
              updateImageProperty={updateImageProperty}
              bringToFront={bringToFront}
              moveForward={moveForward}
              moveBackward={moveBackward}
            />
          )}
          {/* CUSTOMIZE TEXT */}
          {activeFilter === "text" && (
            <TextComponent
              deleteSelectedText={() =>
                deleteSelectedItem<TextState>({
                  items: text,
                  selectedId: selectedTextId ?? "",
                  setItems: setText,
                  setSelectedItemsId: setSelectedTextId,
                })
              }
              handleTextClick={handleTextClick}
              text={text}
              stageRef={stageRef}
              bringToFront={bringToFront}
              moveForward={moveForward}
              moveBackward={moveBackward}
              sendToBack={sendToBack}
              selectedText={selectedText || null}
              textInput={textInput}
              setTextInput={setTextInput}
              addText={addText}
              textFontSize={textFontSize}
              setTextFontSize={setTextFontSize}
              selectedTextId={selectedTextId}
              updateTextProperty={updateTextProperty}
              textFontWeight={textFontFamily}
              setTextFontWeight={setTextFontFamily}
              textFontFamily={textFontFamily as FontFamily}
              setTextFontFamily={setTextFontFamily}
              textColor={textColor}
              handleTextColorChange={handleTextColorChange}
            />
          )}
          {activeFilter === "save" && (
            <SaveTemplate
              templateName={templateName}
              setTemplateName={setTemplateName}
              handleSaveTemplate={handleSaveTemplate}
              generateThumbnail={generateThumbnail}
              isLoading={isLoading}
              stageRef={stageRef}
            />
          )}
          {activeFilter === "template" && (
            <TemplateContainer
              isLoading={isLoading}
              templates={templates.map(convertTemplateListItemToTemplate)}
              loadTemplate={loadTemplate}
              size={size}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default CardWrapper;
