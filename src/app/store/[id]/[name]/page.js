"use client";
import { Breadcrumbs } from "../../../components/ui/Breadcrumb/breadcrumb";
import StoreFront from "../../../components/store/StoreFront";
import Header from "../../../layouts/Header";
import { useParams } from "next/navigation";
//========================================================================

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "My Store" },
];
//========================================================================
export default function BusinessListings() {
  //========================================================================
  const params = useParams()
  // console.log('params==', params);







  return (
    <>
      <Header />
      <div className="bg-[#f9f9f9] container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <Breadcrumbs items={breadcrumbs} />

        <StoreFront />
      </div>



    </>
  );
}
//========================================================================

