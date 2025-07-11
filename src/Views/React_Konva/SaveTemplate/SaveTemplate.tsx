// constants
import { SaveTemplateProps } from "./helper/types";
import CLASSNAME from "../../../Shared/className";
import TEXT from "../../../Shared/text";

function SaveTemplate({
  templateName,
  setTemplateName,
  handleSaveTemplate,
  isLoading,
}: SaveTemplateProps) {
  return (
    <div className={CLASSNAME.LAYOUT.SAVE_TEMPLATE_CONTAINER}>
      <div className={CLASSNAME.LAYOUT.SAVE_FORM}>
        <input
          type="text"
          placeholder={TEXT.PLACEHOLDER.ENTER_TEMPLATE_NAME}
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          className={CLASSNAME.INPUT.TEMPLATE_NAME_INPUT}
          maxLength={50}
        />
        <button
          type="button"
          onClick={handleSaveTemplate}
          disabled={isLoading || !templateName.trim()}
          className={CLASSNAME.BUTTON.SAVE_BTN}
        >
          {isLoading ? TEXT.BUTTON.SAVING : TEXT.BUTTON.SAVE_TEMPLATE}
        </button>
      </div>
    </div>
  );
}

export default SaveTemplate;
