import { Outlet } from "react-router-dom";
import Navigation from "@/shared/Navigation/Navigation";
import { ConfirmDialog } from "primereact/confirmdialog";
import DeleteConfirmDialog from "@/shared/DeleteConfirmDialog/DeleteConfirmDialog";

export default function Layout() {
  return (
    <>
			<DeleteConfirmDialog/>
      <Navigation />
      <Outlet />
    </>
  );
}
