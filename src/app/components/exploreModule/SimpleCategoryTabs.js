import React, { useState, useEffect } from 'react';
// import { useVendorStore } from '../../../controllers/store';
// import CategoryHighlighter from '../../ui/drawer/CategoryHighlighter';
// import { useCategory } from '../../controllers/categories';
import { useParams } from 'next/navigation';
import { api } from '~/trpc/react';

const SimpleCategoryTabs = ({ setCategoryId }) => {
  const params = useParams()  // const { vendorStoreCaterogies } = useVendorStore();
  // console.log('params =================', params?.id);
    const { data: categories, isLoading } = api.category.getByModuleId.useQuery(params?.id);

  // const { categories, refetchCategories } = useCategory(params?.id);
  const [activeTab, setActiveTab] = useState(null);

  // Extract categories from all modules
  const categories_ =
    categories?.flatMap(categories => categories) || [];
  // console.log('params', params);
  // useEffect(() => {
  //   refetchCategories();
  // }, [params?.id, refetchCategories]);
  // Initialize active tab if not set and categories exist
  useEffect(() => {
    if (!activeTab && categories_.length > 0) {
      setActiveTab(categories_[0].categoryId);
    }
  }, [categories_, activeTab]);

  if (!categories_ || categories_.length === 0) {
    return (
      <div className="w-full py-4 text-center text-gray-500">
        No categories available
      </div>
    );
  }

  return (
    <>
      {/* <div className="bg-white w-[450px]"> */}

      <div className="overflow-x-auto w-full flex items-center justify-center py-4">
        {/* <CategoryHighlighter /> */}
        <div className="inline-flex min-w-max gap-4 px-6">
          {categories_?.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setCategoryId(category.id)
                setActiveTab(category.id)
              }}
              className={`
                flex-shrink-0 flex flex-col items-center 
                px-3 py-4 rounded-xl transition-all duration-200
                ${activeTab === category.id
                  ? 'bg-blue-50'
                  : 'hover:bg-gray-50'
                }
              `}
              style={{ minWidth: '120px' }}
            >
              <div className={`
                w-20 h-20 rounded-xl overflow-hidden 
                flex items-center justify-center mb-2
                ${activeTab === category.id
                  ? 'ring-4 ring-blue-500'
                  : 'ring-2 ring-gray-200'
                }
              `}>
                <img
                  src={category.icon || "/api/placeholder/80/80"}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className={`
                text-base font-semibold text-center truncate w-full max-w-28
                ${activeTab === category.id
                  ? 'text-blue-700'
                  : 'text-gray-700'
                }
              `}>
                {category.name}
              </span>

              {activeTab === category.id && (
                <div className="h-1 w-12 bg-blue-600 rounded-full mt-2" />
              )}
            </button>
          ))}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default SimpleCategoryTabs;