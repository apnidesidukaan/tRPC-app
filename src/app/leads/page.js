import Layout from "../layouts/Layout";
// import { Breadcrumbs } from "../../components/ui/Breadcrumb/breadcrumb";
import { FaPeopleGroup } from "react-icons/fa6";
// import { fetchLeadsServerSide } from "../../api/leads";
import { GiShop } from "react-icons/gi";
import { RiCustomerService2Fill } from "react-icons/ri";

import { MdPending } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { CiShop } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import ExplorerView from "../components/ExplorerView";
import { Breadcrumbs } from "../components/ui/Breadcrumb/breadcrumb";

import { api } from "~/trpc/react";


// ===================================================================

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "View Inventory" },
];
// ===================================================================
const ViewLeadsPage = () => {
  // console.log(api.business); // see if `getAllLeads` exists

  // const { data, isLoading } = api.lead.getAllLeads.useQuery();
  // console.log(data);

  // if (isLoading) return <p>Loading...</p>;
  // if (!leads) return <p>No leads found</p>;

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

  // console.log("Leads response:", response);

  // ===================================================================
  return (
    <Layout>

      <div className="min-h-[calc(100vh-100px)] p-6 space-y-6">
        <Breadcrumbs items={breadcrumbs} />
         <ExplorerView
          filtersConfig={filterConfig}
          headerTitle='Lead Management'
          headerIcon={<FaPeopleGroup />}
          // data={leads}
          columns={['Name', 'Email', 'Phone', 'Location', 'Status', 'Created On']}
          tableType='leads'
        /> 
      </div>

    </Layout >
  );
}
export default ViewLeadsPage;
// ===================================================================
