import Layout from "../layouts/Layout";
// import { Breadcrumbs } from "../../components/ui/Breadcrumb/breadcrumb";
// import ExplorerView from "../../components/ExplorerView";;
import { FaPeopleGroup } from "react-icons/fa6";
// import { fetchLeadsServerSide } from "../../api/leads";
import { MdPending } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { CiShop } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { SiHomeassistantcommunitystore } from "react-icons/si";
// import { fetchAllProfiles } from "../../api/profile";
import { Breadcrumbs } from "../components/ui/Breadcrumb/breadcrumb";
import ExplorerView from "../components/exploreView/vendors";


// ===================================================================

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "View Inventory" },
];
// ===================================================================

export default async function ViewVendorPage() {

  // const response = await fetchAllProfiles('vendor')

  let filterConfig = [

    {
      key: "leadType",
      label: "Lead Type",
      options: [
        {
          value: "vendor",
          label: "Vendor",
          icon: <CiShop className="text-accent" />,

        },
        {
          value: "delivery_agent",
          label: "Delivery Partner",
          icon: <TbTruckDelivery className="text-accent" />,
        }
      ]
    },
    {
      key: "status",
      label: "Status",
      options: [
        {
          value: "new",
          label: "New",
          icon: <FaCheck className="text-accent" />,
        },
        {
          value: "pending",
          label: "Pending",
          icon: <MdPending className="text-accent" />,
        }
      ]
    },
  ]
  // ===================================================================
  return (
    <Layout>

      <div className="min-h-[calc(100vh-100px)] p-6 space-y-6">
        <Breadcrumbs items={breadcrumbs} />
        <ExplorerView
          filtersConfig={filterConfig}
          headerTitle='Vendor(s)'
          headerIcon={<SiHomeassistantcommunitystore />}
          // data={response?.data}
          columns={['Name', 'Email', 'Phone', 'Location', 'Status', 'Created On']}
          tableType='vendors'
        />
      </div>

    </Layout>
  );
}

// ===================================================================
