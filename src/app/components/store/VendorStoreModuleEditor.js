import { useState, useEffect } from "react";
import { FaCross, FaPlusCircle, FaTrash } from "react-icons/fa";
import { IoSwapVerticalOutline } from "react-icons/io5";
import { MdEditNotifications } from "react-icons/md";
// import { EditIcon, Trash2Icon, PlusCircleIcon, SaveIcon, X } from "lucide-react";

export default function VendorStoreModuleEditor() {
  // Sample initial data, in real app would come from API
  const [modules, setModules] = useState([
    {
      moduleName: "Atta, Rice & Dal",
      moduleIcon: "http://localhost:8000/media/1747215161686-84758234.png",
      categories: [
        {
          categoryId: "682463419b57a264c0a8b8e1",
          categoryName: "Rice",
          categoryIcon: "http://localhost:8000/media/1747215169295-714646852.png"
        },
        {
          categoryId: "6824652b9b57a264c0a8bb14",
          categoryName: "Daal",
          categoryIcon: "http://localhost:8000/media/1747215658984-489182218.png"
        },
        {
          categoryId: "6824847df881a007093f6680",
          categoryName: "Wheat & Flour",
          categoryIcon: "http://localhost:8000/media/1747223677559-366761023.png"
        },
        {
          categoryId: "68248990f881a007093f6869",
          categoryName: "Poha, Daliya & Other Grains",
          categoryIcon: "http://localhost:8000/media/1747224975910-437355117.png"
        },
        {
          categoryId: "682489a9f881a007093f687c",
          categoryName: "Arhar",
          categoryIcon: "http://localhost:8000/media/1747225001316-643162273.png"
        }
      ]
    },
    {
      moduleName: "Kidz Zone",
      moduleIcon: "http://localhost:8000/media/1747223711014-957078170.png",
      categories: [
        {
          categoryId: "682484bbf881a007093f6696",
          categoryName: "Kids Magazines",
          categoryIcon: "http://localhost:8000/media/1747223739751-161503495.png"
        },
        {
          categoryId: "682484cef881a007093f66a3",
          categoryName: "toys",
          categoryIcon: "http://localhost:8000/media/1747223758142-891253855.png"
        }
      ]
    }
  ]);

  const [editMode, setEditMode] = useState({
    active: false,
    moduleIndex: null,
    categoryIndex: null,
    type: null // "module" or "category"
  });

  const [editForm, setEditForm] = useState({
    name: "",
    icon: ""
  });

  const handleEditClick = (moduleIndex, categoryIndex = null) => {
    const type = categoryIndex !== null ? "category" : "module";
    let name, icon;

    if (type === "module") {
      name = modules[moduleIndex].moduleName;
      icon = modules[moduleIndex].moduleIcon;
    } else {
      name = modules[moduleIndex].categories[categoryIndex].categoryName;
      icon = modules[moduleIndex].categories[categoryIndex].categoryIcon;
    }

    setEditMode({
      active: true,
      moduleIndex,
      categoryIndex,
      type
    });

    setEditForm({
      name,
      icon
    });
  };

  const handleSave = () => {
    const newModules = [...modules];
    const { moduleIndex, categoryIndex, type } = editMode;

    if (type === "module") {
      newModules[moduleIndex] = {
        ...newModules[moduleIndex],
        moduleName: editForm.name,
        moduleIcon: editForm.icon
      };
    } else {
      newModules[moduleIndex].categories[categoryIndex] = {
        ...newModules[moduleIndex].categories[categoryIndex],
        categoryName: editForm.name,
        categoryIcon: editForm.icon
      };
    }

    setModules(newModules);
    cancelEdit();
  };

  const handleDelete = (moduleIndex, categoryIndex = null) => {
    const newModules = [...modules];
    
    if (categoryIndex !== null) {
      // Delete category
      newModules[moduleIndex].categories = newModules[moduleIndex].categories.filter(
        (_, idx) => idx !== categoryIndex
      );
    } else {
      // Delete module
      newModules.splice(moduleIndex, 1);
    }
    
    setModules(newModules);
  };

  const handleAddModule = () => {
    const newModule = {
      moduleName: "New Module",
      moduleIcon: "/api/placeholder/64/64",
      categories: []
    };
    setModules([...modules, newModule]);
    handleEditClick(modules.length);
  };

  const handleAddCategory = (moduleIndex) => {
    const newModules = [...modules];
    const newCategory = {
      categoryId: `temp-${Date.now()}`, // In real app, this would be from backend
      categoryName: "New Category",
      categoryIcon: "/api/placeholder/64/64"
    };
    
    newModules[moduleIndex].categories.push(newCategory);
    setModules(newModules);
    handleEditClick(moduleIndex, newModules[moduleIndex].categories.length - 1);
  };

  const cancelEdit = () => {
    setEditMode({
      active: false,
      moduleIndex: null,
      categoryIndex: null,
      type: null
    });
    setEditForm({
      name: "",
      icon: ""
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value
    });
  };

  // Simulating saving data to backend
  const saveToBackend = () => {
    console.log("Saving data to backend:", { modules });
    alert("Store settings saved successfully!");
    // In a real application, you would make an API call here
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Store Management</h1>
        <button 
          onClick={saveToBackend}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          <IoSwapVerticalOutline size={16} />
          Save All Changes
        </button>
      </div>

      {/* Edit Form Modal */}
      {editMode.active && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editMode.type === "module" ? "Edit Module" : "Edit Category"}
              </h2>
              <button onClick={cancelEdit} className="text-gray-500 hover:text-gray-700">
                <FaCross size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {editMode.type === "module" ? "Module Name" : "Category Name"}
                </label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {editMode.type === "module" ? "Module Icon URL" : "Category Icon URL"}
                </label>
                <input
                  type="text"
                  name="icon"
                  value={editForm.icon}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Module List */}
      <div className="space-y-6">
        {modules.map((module, moduleIndex) => (
          <div key={moduleIndex} className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={module.moduleIcon || "/api/placeholder/48/48"}
                  alt={module.moduleName}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <h2 className="text-lg font-semibold">{module.moduleName}</h2>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEditClick(moduleIndex)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <MdEditNotifications size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(moduleIndex)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
            
            {/* Categories */}
            <div className="pl-6 border-l-2 border-gray-100 ml-6">
              <div className="mb-3 text-sm font-medium text-gray-500">Categories</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {module.categories.map((category, categoryIndex) => (
                  <div 
                    key={category.categoryId} 
                    className="flex items-center justify-between p-3 border border-gray-100 rounded-md bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={category.categoryIcon || "/api/placeholder/32/32"}
                        alt={category.categoryName}
                        className="w-8 h-8 object-cover rounded-md"
                      />
                      <span>{category.categoryName}</span>
                    </div>
                    
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleEditClick(moduleIndex, categoryIndex)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded-full"
                      >
                        <MdEditNotifications size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(moduleIndex, categoryIndex)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Add Category Button */}
                <button 
                  onClick={() => handleAddCategory(moduleIndex)}
                  className="flex items-center justify-center gap-2 p-3 border border-dashed border-gray-300 rounded-md hover:bg-gray-50 text-gray-600"
                >
                  <FaPlusCircle size={16} />
                  <span>Add Category</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Add Module Button */}
        <button 
          onClick={handleAddModule}
          className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600"
        >
          <FaPlusCircle  size={20} />
          <span className="font-medium">Add New Module</span>
        </button>
      </div>
    </div>
  );
}