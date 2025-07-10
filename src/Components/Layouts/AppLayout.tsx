import PrivateLayout from "./Private/PrivateLayout";
import PublicLayout from "./Public/PublicLayout";
import { AppLayoutProps } from "./AppLayout.d";

function AppLayout({ isAuthenticated, children }: AppLayoutProps) {
  return (
    <div className="root">
      {isAuthenticated ? (
        <PrivateLayout>{children}</PrivateLayout>
      ) : (
        <PublicLayout>{children}</PublicLayout>
      )}
    </div>
  );
}

export default AppLayout;
