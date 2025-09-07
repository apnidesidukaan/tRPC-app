"use client";

import Layout from "../../layouts/Layout";
import { Breadcrumbs } from "../../components/ui/Breadcrumb/breadcrumb";
// import ContentSectionAdd from "../../components/ContentSectionAdd";
// import { ContentSectionPreview } from "../../components/store/ContentSectionPreview";
// import { useFetchVendorContentSection } from "../../controllers/contentSection";
import { useEffect, useState } from "react";
//========================================================================

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "My Store" },
];
//========================================================================

export default function BusinessListings() {
  // const { contentSections, isLoading, isError } = useFetchVendorContentSection();
  const [contentSectionData, setContentSectionData] = useState([]);

  // useEffect(() => {
  //   if (contentSections && contentSections.length > 0) {
  //     setContentSectionData(contentSections);
  //   }
  // }, [contentSections]);

  //========================================================================

  return (
    <>
      <Layout>
        <Breadcrumbs items={breadcrumbs} />
        {/* {contentSectionData &&  <ContentSectionPreview dataItems={contentSectionData} /> } */}

        {/* < ContentSectionAdd /> */}
      </Layout>
    </>
  );
}
//========================================================================