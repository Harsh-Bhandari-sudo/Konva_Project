// libs
import { useState } from "react";

// constants
import { TemplateContainerProps } from "./helper/types";
import CLASSNAME from "../../../Shared/className";
import TEXT from "../../../Shared/text";

function TemplateContainer({
  isLoading,
  templates,
  loadTemplate,
  size,
}: TemplateContainerProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const compatibleTemplates = templates.filter((template) => {
    return (
      template?.data?.frameSize?.width === size?.width &&
      template?.data?.frameSize?.height === size?.height
    );
  });

  return (
    <div className={CLASSNAME.LAYOUT.TEMPLATE_CONTAINER}>
      <h4 className={CLASSNAME.HEADER.COLOR_TITLE}>
        {TEXT.HEADER.SAVE_TEMPLATE}
      </h4>
      {isLoading ? (
        <div className={CLASSNAME.LAYOUT.LOADING_CONTAINER}>
          <div className={CLASSNAME.LAYOUT.LOADING_SPINNER} />
          <span>{TEXT.MESSAGE.LOADING_TEMPLATE}</span>
        </div>
      ) : compatibleTemplates.length === 0 ? (
        <div className={CLASSNAME.LAYOUT.NO_TEMPLATE}>
          <p>{TEXT.MESSAGE.NO_SAVED_TEMPLATE}</p>
        </div>
      ) : (
        <div className={CLASSNAME.LAYOUT.TEMPLATE_GRID}>
          {compatibleTemplates.map((template) => (
            <div
              key={template.name}
              className={`${CLASSNAME.LAYOUT.TEMPLATE_ITEM} ${
                selectedTemplate === template.name
                  ? CLASSNAME.LAYOUT.SELECTED
                  : ""
              }`}
              onClick={() => setSelectedTemplate(template.name)}
            >
              <div className={CLASSNAME.LAYOUT.TEMPLATE_THUMBNAIL}>
                {template.data.thumbnail ? (
                  <img
                    src={template.data.thumbnail}
                    alt={`${template.name} thumbnail`}
                    className={CLASSNAME.LAYOUT.THUMBNAIL_IMAGE}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (
                        e.target as HTMLImageElement
                      ).parentElement!.innerHTML = `
                        <div class="thumbnail-placeholder">
                          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="3" y="3" width="18" height="14" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21,15 16,10 5,21" />
                          </svg>
                        </div>
                      `;
                    }}
                  />
                ) : (
                  <div className={CLASSNAME.LAYOUT.THUMBNAIL_PLACEHOLDER}>
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect x="3" y="3" width="18" height="14" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21,15 16,10 5,21" />
                    </svg>
                  </div>
                )}
              </div>

              <div className={CLASSNAME.LAYOUT.TEMPLATE_INFO}>
                <span className={CLASSNAME.LAYOUT.TEMPLATE_NAME}>
                  {template.name}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  loadTemplate(template.name);
                }}
                className={CLASSNAME.BUTTON.LOAD_BTN}
                disabled={isLoading}
              >
                {isLoading && selectedTemplate === template.name
                  ? TEXT.BUTTON.LOADING
                  : TEXT.BUTTON.LOAD}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default TemplateContainer;
