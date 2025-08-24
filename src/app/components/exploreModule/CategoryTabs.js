import React, { useState } from 'react';
import SimpleCategoryTabs from './SimpleCategoryTabs';
//===================================================================
const CategoryTabs = ({ setCategoryId }) => {
  //===================================================================
  return (
    <>
      <div>
        <SimpleCategoryTabs setCategoryId={setCategoryId} />
      </div>
    </>
  );
};
//===================================================================
export default CategoryTabs;
//===================================================================