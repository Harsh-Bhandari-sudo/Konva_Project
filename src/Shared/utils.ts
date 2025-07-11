import { DeleteSelectedItem } from "./types";

export const sortByZIndex = (a: { zIndex: number }, b: { zIndex: number }) =>
  a.zIndex - b.zIndex;

export const handleDownload = () => {
  const stage = document.querySelector(".image canvas") as HTMLCanvasElement;

  if (stage) {
    const link = document.createElement("a");
    link.download = "custom-card.png";
    link.href = stage.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const deleteSelectedItem = <T extends { id: string }>({
  items,
  selectedId,
  setItems,
  setSelectedItemsId,
}: DeleteSelectedItem<T>) => {
  if (selectedId) {
    setItems(items.filter((item) => item?.id !== selectedId));
    setSelectedItemsId(null);
  }
};

export function zIndexConfig(
  bringToFront: () => void,
  moveForward: () => void,
  moveBackward: () => void,
  sendToBack: () => void
) {
  return [
    { label: "Bring to Front", value: "bringToFront", onClick: bringToFront },
    { label: "Move Forward", value: "moveForward", onClick: moveForward },
    { label: "Move Backward", value: "moveBackward", onClick: moveBackward },
    { label: "Send to Back", value: "sendToBack", onClick: sendToBack },
  ];
}
