import Layout from "../layouts/Layout";

import DeliveryRulesAdmin from "../components/config";
import PlatformConfigAdmin from "../components/platform";


// ===================================================================

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "View Inventory" },
];
// ===================================================================
const BusinessConfig = () => {

  // ===================================================================
  return (
    <Layout>

      <DeliveryRulesAdmin />
      <PlatformConfigAdmin />

    </Layout >
  );
}
export default BusinessConfig;
// ===================================================================
