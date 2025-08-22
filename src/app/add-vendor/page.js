'use client'
import React, { useState, useEffect } from 'react';
import { User, Building2, Phone, Mail, MapPin, CheckCircle, AlertCircle, Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
// import { useModules } from '../../controllers/modules';
// import { useLeads } from '../../controllers/leads';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { api } from '~/trpc/react';

const VendorOnboardingPage = () => {

  // const { createNewLead, isCreatingLead } = useLeads()

  const [currentStep, setCurrentStep] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [vendorTypeErrorMessage, setVendorTypeErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Removed selectedModule as it will be replaced by formData.modules

  const [selectedCategory, setSelectedCategory] = useState("retailer_service"); // 'service' or 'retail'
  const [serviceVendorTypes, setServiceVendorTypes] = useState([]);
  const [retailVendorTypes, setRetailVendorTypes] = useState([]);
  const [isFetchingVendorTypes, setIsFetchingVendorTypes] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    vendorType: '', // This will now store the ID of the selected service/retail type
    address: '',
    modules: [], // This is already an array, which is correct for multiple selections
  });

  // Fetch modules for service and retail categories
  const { data: modules, } = api.module.getAll.useQuery();
  // console.log(modules);


  const utils = api.useUtils();
  const createLeadMutation = api.lead.create.useMutation({
    onSuccess: async () => {
      await utils.inventory.getAll.invalidate();
      // router.refresh();
    },
  });


  // const { modules: fetchedRetailModules, refetchModules: refetchRetail } = useModules('689722bba4062e831546e710');
  // const { modules: fetchedServiceModules, refetchModules: refetchService } = useModules('6861013af904715ba00ffe08');

  // Define steps inside the component (as per previous correction)
  const steps = [
    { number: 1, title: 'Service Type', description: 'Choose your expertise' },
    { number: 2, title: 'Personal Info', description: 'Tell us about yourself' },
    { number: 3, title: 'Business Details', description: 'Your business information' },
  ];



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModuleSelection = (typeId) => {
    console.log('typeId', typeId);

    setVendorTypeErrorMessage('');

    setFormData(prevFormData => {
      const { modules } = prevFormData;

      const updatedModules = modules.includes(typeId)
        ? modules.filter(id => id !== typeId) // remove if already selected
        : [...modules, typeId]; // add if not selected

      return {
        ...prevFormData,
        vendorType: typeId,
        modules: updatedModules,
      };
    });
  };
  console.log(formData.modules)

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.vendorType) {
        setVendorTypeErrorMessage('Please select a service or retail type to continue.');
        return;
      }
    }
    // Only validate personal info fields if transitioning FROM step 2 to step 3
    if (currentStep === 2) {
      if (!formData.name || !formData.phone || !formData.email) {
        setErrorMessage('Please fill in all personal information fields.');
        return;
      }
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setErrorMessage(''); // Clear general error message on next step
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrorMessage(''); // Clear error message on previous step
      setVendorTypeErrorMessage(''); // Clear vendor type error if going back to step 1
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    // Basic validation for step 3 before submitting
    if (!formData.businessName || !formData.address) {
      setErrorMessage('Please fill in all business details fields.');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    try {
      // await new Promise(resolve => setTimeout(resolve, 2000));

      const vendorData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        leadType: 'vendor',
        status: 'new',
        source: "web",
        vendorType: selectedCategory, // This now holds the selected ID
        companyName: formData.businessName,
        modules: formData.modules, // Correctly sends the array of selected module IDs
      };
      console.log('vendorData to submit', vendorData);

      // createLeadMutation()
      const res = await createLeadMutation.mutateAsync(vendorData);
      // console.log(';res', res);

      if (res.status === 201) {
        setSuccessMessage(successMessage || 'Lead created successfully');
        setFormData({
          name: '',
          email: '',
          phone: '',
          businessName: '',
          address: '',
          vendorType: '',
        });
      } else {
        console.log('vendorError', vendorError);

        setErrorMessage(vendorError || 'Something went wrong. Please try again.');
        console.error('Error adding vendor:', vendorError);
      }
      console.log("Vendor registered:", vendorData);
      // setSuccessMessage('🎉 Welcome to our network! We\'ll review your application and get back to you within 24 hours.');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        address: '',
        vendorType: '',
        modules: [],
      });
      setCurrentStep(1);
      setSelectedCategory("retailer_service"); // Reset to service tab
      // No need to clear serviceVendorTypes and retailVendorTypes here,
      // as the useEffect will re-run with fetched data.

    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // console.log('fetchedServiceModules, fetchedRetailModules', fetchedServiceModules, fetchedRetailModules);

  const renderStepContent = () => {
    const currentVendorTypes = selectedCategory === "retailer_service" ? serviceVendorTypes : retailVendorTypes;
    // Determine which modules to display based on the selected vendorType
    // This assumes modules are associated with vendor types in a way that allows filtering
    // For demonstration, let's assume `currentVendorTypes` contains `modules` array for each type
    // You might need to adjust this logic based on your actual `useModules` hook and data structure.

    // If you want to select modules based on the selected `vendorType`, you would filter `fetchedServiceModules` or `fetchedRetailModules`
    // based on the `formData.vendorType` ID.
    const relevantModules = modules;
    // console.log('relevantModules', relevantModules);


    return (
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-3">
            {currentStep === 1 && "What kind of vendor are you?"}
            {currentStep === 2 && "Personal Information"}
            {currentStep === 3 && "Business Details"}
          </h3>
          <p className="text-lg text-gray-600">
            {currentStep === 1 && "Select one or more area of your expertise or business type"}
            {currentStep === 2 && "Tell us about yourself"}
            {currentStep === 3 && "Information about your business"}
          </p>
        </div>

        {currentStep === 1 && (
          <>
            {/* Category Tabs */}
            <div className="flex justify-center mb-8">
              {/* <button
                type="button"
                onClick={() => setSelectedCategory("retailer_service")}
                className={`px-6 py-3 rounded-l-lg font-semibold transition-colors duration-200 ${selectedCategory === "retailer_service"
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                Service Provider
              </button> */}
              <button
                type="button"
                onClick={() => setSelectedCategory("retailer_product")}
                className={`px-6 py-3 rounded-r-lg font-semibold transition-colors duration-200 ${selectedCategory === "retailer_product"
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                Retail Business
              </button>
            </div>

            {isFetchingVendorTypes ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="animate-spin text-blue-500 mr-2" size={32} />
                <span className="text-lg text-gray-600">Loading {selectedCategory} types...</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {modules?.length > 0 ? (
                  modules?.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleModuleSelection(type.id)}
                      className={`bg-gradient-to-r from-[#ffdd8d] via-[#f1cf83] to-[#e3bf70] p-6 text-[#395953] rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${formData?.modules?.includes(type.id)
                        ? 'border-[#3d2701] bg-[#3d2701] shadow-lg ring-2 ring-[#3d2701]'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                        }`}
                    >
                      {type.icon && type.icon.startsWith('http') ? (
                        <img
                          src={type.icon}
                          alt={type.name}
                          className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto object-cover`}
                        />
                      ) : (
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color || 'from-gray-300 to-gray-500'} flex items-center justify-center text-2xl mb-4 mx-auto`}>
                          { }
                        </div>
                      )}
                      <h4 className="font-semibold text-[#3d2701] text-sm text-center">{type.name}</h4>
                    </button>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-500 py-10">
                    No {selectedCategory} types available. Please try again later.
                  </div>
                )}
              </div>
            )}

            {vendorTypeErrorMessage && (
              <div className="flex items-center justify-center space-x-2 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 max-w-md mx-auto">
                <AlertCircle size={20} />
                <span>{vendorTypeErrorMessage}</span>
              </div>
            )}
          </>
        )}

        {currentStep === 2 && (
          <div className="max-w-md mx-auto space-y-6">
            <div className="relative">
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="fullName"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="mobileNumber" className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  id="mobileNumber"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const onlyDigits = e.target.value.replace(/\D/g, '');
                    if (onlyDigits.length <= 10) {
                      setFormData({ ...formData, phone: onlyDigits });
                    }
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="emailAddress" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  id="emailAddress"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-8">
            <div className="max-w-md mx-auto space-y-6">
              <div className="relative">
                <label htmlFor="businessName" className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your business name"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="businessAddress" className="block text-sm font-semibold text-gray-700 mb-2">Business Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                  <textarea
                    id="businessAddress"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Enter your complete business address"
                    required
                  />
                </div>
              </div>

              {/* NEW: Module Selection */}
              {formData.vendorType && ( // Only show modules if a vendor type is selected
                <div>
                  <h4 className="block text-lg font-semibold text-gray-900 mb-4">Select Modules (Optional)</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {relevantModules.filter(module => module.vendorTypeId === formData.vendorType)?.map((module) => (
                      <button
                        key={module._id}
                        type="button"
                        onClick={() => handleModuleSelect(module._id)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-center flex-col text-center
                          ${formData.modules.includes(module._id)
                            ? 'bg-blue-100 border-blue-600 text-blue-800 shadow-md'
                            : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-blue-300'
                          }`}
                      >
                        {module.icon && module.icon.startsWith('http') ? (
                          <img src={module.icon} alt={module.name} className="w-8 h-8 mb-2 object-cover" />
                        ) : (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xl mb-2 ${module.color || 'bg-gray-300'}`}>
                            {module.icon}
                          </div>
                        )}
                        <span className="text-sm font-medium">{module.name}</span>
                      </button>
                    ))}
                    {relevantModules.filter(module => module.vendorTypeId === formData.vendorType).length === 0 && (
                      <div className="col-span-full text-center text-gray-500">
                        No modules available for the selected vendor type.
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6">
                <div className="text-center">
                  <CheckCircle className="text-blue-600 mx-auto mb-3" size={32} />
                  <h4 className="font-semibold text-blue-900 mb-2">Ready to Join Our Network?</h4>
                  <p className="text-blue-700 text-sm">
                    We'll review your application and get back to you within 24 hours. Start earning with trusted customers today!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };



  // console.log('retailVendorTypes', retailVendorTypes);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      {/* <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                अ
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Apni Madad
                </h1>
                <p className="text-sm text-gray-600">Partner Registration</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-600">Need help?</p>
              <p className="text-sm font-semibold text-blue-600">Call: 1800-XXX-XXXX</p>
            </div>
          </div>
        </div>
      </header> */}
      <Header />
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {successMessage ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Registration Successful!</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{successMessage}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSuccessMessage('');
                  setCurrentStep(1);
                }}
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all font-semibold text-lg"
              >
                Register Another Vendor
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all font-semibold text-lg">
                Go to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Progress Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Join Our Partner Network
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Become a trusted service provider and grow your business
              </p>

              {/* Progress Steps */}
              <div className="flex justify-center items-center space-x-4 mb-8">
                {steps.map((step, index) => (
                  <React.Fragment key={step.number}>
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all ${currentStep >= step.number
                        ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-500'
                        }`}>
                        {currentStep > step.number ? <CheckCircle size={20} /> : step.number}
                      </div>
                      <div className="mt-2 text-center">
                        <p className={`text-sm font-semibold ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-500">{step.description}</p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-20 h-1 rounded-full transition-all ${currentStep > step.number ? 'bg-gradient-to-r from-blue-600 to-green-600' : 'bg-gray-200'
                        }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              {renderStepContent()}

              {errorMessage && (
                <div className="flex items-center justify-center space-x-2 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mt-8 max-w-md mx-auto">
                  <AlertCircle size={20} />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="flex justify-between items-center mt-8 max-w-2xl mx-auto">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
              >
                <ArrowLeft size={20} />
                <span>Previous</span>
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-500">Step {currentStep} of {steps.length}</p>
                <div className="flex space-x-2 mt-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${index + 1 <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {currentStep === 3 ? (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all font-semibold disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Registering...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <CheckCircle size={20} />
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNextStep}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all font-semibold"
                >
                  <span>Next Step</span>
                  <ArrowRight size={20} />
                </button>
              )}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VendorOnboardingPage;