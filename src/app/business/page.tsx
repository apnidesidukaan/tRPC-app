// import { BusinessForm } from "../_components/business/BusinessForm";
// import { BusinessList } from "../_components/business/BusinessList";
import BusinessTypes from "../components/business/BusinessTypes";

import { Breadcrumbs } from "../components/ui/Breadcrumb/breadcrumb";
import Layout from "../layouts/Layout";
const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "View Inventory" },
];
export default function BusinessPage() {
  return (
    <Layout>

      <Breadcrumbs items={breadcrumbs} />
      <div className="p-6 space-y-6 grid grid-cols-1 lg:grid-cols-1 md:grid-cols-3 gap-6">
        <BusinessTypes />
      </div>
  
    </Layout>
  );
}
