import { SaveTemplateProps } from "./types";

function SaveTemplate({
  templateName,
  setTemplateName,
  handleSaveTemplate,
  isLoading,
}: SaveTemplateProps) {
  return (
    <div className="save-template-container">
      <div className="save-form">
        <input
          type="text"
          placeholder="Enter template name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          className="template-name-input"
          maxLength={50}
        />
        <button
          type="button"
          onClick={handleSaveTemplate}
          disabled={isLoading || !templateName.trim()}
          className="save-btn"
        >
          {isLoading ? "Saving..." : "Save Template"}
        </button>
      </div>
    </div>
  );
}

export default SaveTemplate;
