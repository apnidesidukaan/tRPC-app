
// import { Breadcrumbs } from "../../../../components/ui/Breadcrumb/breadcrumb";
import ProfileTabs from "~/app/components/ui/tabs/ProfileTab";
import Layout from "~/app/layouts/Layout";
import { api } from "~/trpc/react";
// import { fetchProfile } from "../../../../api/profile";

//============================================================================================================================
export default async function ViewProfile({ params, searchParams }) {


    //============================================================================================================================
    // const response = await fetchProfile(type, id)
   
    // console.log("response =============:", response?.data);
    //============================================================================================================================
    return (
        <>
            <Layout>
                <ProfileTabs/>

            </Layout>
        </>
    );
}
//============================================================================================================================
