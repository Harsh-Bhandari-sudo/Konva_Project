import { AppLayoutProps } from "../AppLayout.d";

// styles
import "../../../App.css";

// constants
import { IMAGES } from "../../../assets";
import TEXT from "../../../Shared/text";
import CLASSNAME from "../../../Shared/className";

function PrivateLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <div className="root">
      <div className={CLASSNAME.LAYOUT.TITLE_PROJECT}>
        <img src={IMAGES.LOGO} alt={TEXT.TITLE.ALT} />
      </div>
      {children}
    </div>
  );
}

export default PrivateLayout;
