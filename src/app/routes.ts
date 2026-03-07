import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { Customers } from "./pages/Customers";
import { CustomerProfile } from "./pages/CustomerProfile";
import { Products } from "./pages/Products";
import { Segments } from "./pages/Segments";
import { SegmentView } from "./pages/SegmentView";
import { Exports } from "./pages/Exports";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "customers", Component: Customers },
      { path: "customers/:customerId", Component: CustomerProfile },
      { path: "products", Component: Products },
      { path: "segments", Component: Segments },
      { path: "segments/:segmentId", Component: SegmentView },
      { path: "exports", Component: Exports },
      { path: "settings", Component: Settings },
    ],
  },
]);