import { useState } from "react";
import { TemplateContainerProps } from "./types";

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
    <div className="templates-container">
      <h4 className="color-title">Saved Templates</h4>
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner" />
          <span>Loading templates...</span>
        </div>
      ) : compatibleTemplates.length === 0 ? (
        <div className="no-templates">
          <p>No saved templates found</p>
        </div>
      ) : (
        <div className="templates-grid">
          {compatibleTemplates.map((template) => (
            <div
              key={template.name}
              className={`template-item ${
                selectedTemplate === template.name ? "selected" : ""
              }`}
              onClick={() => setSelectedTemplate(template.name)}
            >
              <div className="template-thumbnail">
                {template.data.thumbnail ? (
                  <img
                    src={template.data.thumbnail}
                    alt={`${template.name} thumbnail`}
                    className="thumbnail-image"
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
                  <div className="thumbnail-placeholder">
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

              <div className="template-info">
                <span className="template-name">{template.name}</span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  loadTemplate(template.name);
                }}
                className="load-btn"
                disabled={isLoading}
              >
                {isLoading && selectedTemplate === template.name
                  ? "Loading..."
                  : "Load"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default TemplateContainer;
