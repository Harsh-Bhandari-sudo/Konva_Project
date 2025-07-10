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
