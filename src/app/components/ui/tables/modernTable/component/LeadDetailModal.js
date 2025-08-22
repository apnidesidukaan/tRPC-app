import React, { useState, useEffect } from 'react';
import {
  FaTimes, // X
  FaUser, // User
  FaEnvelope, // Mail
  FaPhone, // Phone
  FaMapMarkerAlt, // MapPin
  FaBuilding, // Building2
  FaTag, // Tag
  FaCalendarAlt, // Calendar
  FaClock, // Clock
  FaUsers, // Users
  FaFileAlt, // FileText
  FaChartLine, // TrendingUp
  FaCheckCircle, // CheckCircle
  FaArrowRight, // ArrowRight
  FaStar, // Star
  FaGlobe, // Globe
  FaBriefcase, // Briefcase
  FaCar, // Car
  FaHashtag // Hash
} from 'react-icons/fa'; // Using Font Awesome icons as a common choice
// import { useConvertLeadToVendor, useLeads } from "../../../../../controllers/leads";
import SuccessBadge from "../../../status/SuccessBadge";
import ErrorBadge from "../../../status/ErrorBadge";
import ConfirmationDialogueBox from "../../../status/Confirmation";
import { api } from '~/trpc/react';

const LeadDetailModal = ({ rowData, isModalOpen, setIsModalOpen }) => {
  const leads = api.lead.getAll.useQuery()


  // const convertLeadMutation = api.lead.getAll.useMutation({
  //   onSuccess: () => {
  //     leads.refetch(); // Refetch leads after successful deletion 
  //   },
  // });

  // const { convertLead, } = useConvertLeadToVendor()
  // const { refreshLeads } = useLeads()

  const [apiResponse, setApiResponse] = useState(''); // Success pop-up state
  const [isLoading, setIsLoading] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)



  const onConvertLead = async () => {

    if (!rowData) return;
    setIsLoading(true)
    console.log('rowData', rowData)
    const { success, successMessage, errorMessage } = await convertLead(rowData._id);

    if (success) {
      setIsSuccess(true)
      setConfirmDelete(false)
      setApiResponse(successMessage)
      window.location.reload()
      setIsLoading(false)
    } else {
      setIsError(true)

      setConfirmDelete(false)
      setApiResponse(errorMessage)
      console.error('Error CONVERTING LEAD:', errorMessage);
      setIsLoading(false)

    }

  }

  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (rowData) {
      setIsVisible(true);
    }
  }, [rowData]);

  if (!rowData) return null;

  const {
    name,
    email,
    phone,
    address,
    companyName,
    leadType,
    source,
    status,
    details = {},
    modules = [],
    createdAt,
    updatedAt,
  } = rowData;

  const getStatusConfig = (status) => {
    switch (status.toLowerCase()) {
      case 'new':
        return {
          bg: 'bg-gradient-to-r from-emerald-50 to-green-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          icon: '🆕',
          ring: 'ring-emerald-100'
        };
      case 'contacted':
        return {
          bg: 'bg-gradient-to-r from-blue-50 to-cyan-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          icon: '📞',
          ring: 'ring-blue-100'
        };
      case 'pending':
        return {
          bg: 'bg-gradient-to-r from-amber-50 to-yellow-50',
          text: 'text-amber-700',
          border: 'border-amber-200',
          icon: '⏳',
          ring: 'ring-amber-100'
        };
      case 'lost':
        return {
          bg: 'bg-gradient-to-r from-red-50 to-rose-50',
          text: 'text-red-700',
          border: 'border-red-200',
          icon: '❌',
          ring: 'ring-red-100'
        };
      case 'converted':
        return {
          bg: 'bg-gradient-to-r from-purple-50 to-indigo-50',
          text: 'text-purple-700',
          border: 'border-purple-200',
          icon: '✅',
          ring: 'ring-purple-100'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-gray-50 to-slate-50',
          text: 'text-gray-700',
          border: 'border-gray-200',
          icon: '📋',
          ring: 'ring-gray-100'
        };
    }
  };

  const statusConfig = getStatusConfig(status);



  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsError(false);
      setIsSuccess(false);
      setApiResponse('');
      setConfirmDelete(false);
    }, 200);
  };

  const getSourceIcon = (source) => {
    switch (source?.toLowerCase()) {
      case 'website': return <FaGlobe className="w-4 h-4" />;
      case 'social': return <FaUsers className="w-4 h-4" />;
      case 'referral': return <FaStar className="w-4 h-4" />;
      default: return <FaTag className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaUser },
    { id: 'details', label: 'Details', icon: FaFileAlt },
    { id: 'modules', label: 'Modules', icon: FaBriefcase },
    { id: 'documents', label: 'Documents', icon: FaBriefcase },
  ];

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm z-50 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <div
        className={`border-6  border-[#3d2701]  bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative transform transition-all duration-300 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#ffdd8d] via-[#f1cf83] to-[#e3bf70] p-6 text-white shadow shadow-dm shadow-[#3d2701]">
          <div className="absolute inset-0 bg-black/10"></div>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-red transition-all duration-200 z-10"
            aria-label="Close"
          >
            <FaTimes size={20} />
          </button>

          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">{name}</h2>
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="w-4 h-4" />
                    <span className="text-sm">{email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="w-4 h-4" />
                    <span className="text-sm">{phone}</span>
                  </div>
                </div>
              </div>

              <div className={`px-4 py-2 rounded-full ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border backdrop-blur-sm`}>
                <div className="flex items-center gap-2 font-semibold">
                  <span>{statusConfig.icon}</span>
                  <span className="capitalize">{status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 ${activeTab === tab.id
                    ? 'bg-white text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[45vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <FaBuilding className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-700 font-medium">Company</p>
                      <p className="text-lg font-bold text-blue-900">{companyName || 'Individual'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-600 rounded-lg">
                      <FaChartLine className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-green-700 font-medium">Lead Type</p>
                      <p className="text-lg font-bold text-green-900 capitalize">{leadType}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-600 rounded-lg">
                      {getSourceIcon(source)}
                    </div>
                    <div>
                      <p className="text-sm text-purple-700 font-medium">Source</p>
                      <p className="text-lg font-bold text-purple-900 capitalize">{source}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaUser className="w-5 h-5" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <FaEnvelope className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Email</p>
                        <p className="text-gray-900">{email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaPhone className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Phone</p>
                        <p className="text-gray-900">{phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Address</p>
                        <p className="text-gray-900">{address || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaClock className="w-5 h-5" />
                  Timeline
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <FaCalendarAlt className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Lead Created</p>
                      <p className="text-xs text-gray-600">{formatDate(createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <FaClock className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Last Updated</p>
                      <p className="text-xs text-gray-600">{formatDate(updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-6">
              {(details.businessType || details.taxId || details.licenseNumber || details.vehicleType) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {details.businessType && (
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                      <div className="flex items-center gap-3 mb-2">
                        <FaBriefcase className="w-5 h-5 text-orange-600" />
                        <h4 className="font-semibold text-orange-900">Business Type</h4>
                        <p className="text-orange-800">{details.businessType}</p>
                      </div>
                    </div>
                  )}

                  {details.taxId && (
                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-xl border border-teal-200">
                      <div className="flex items-center gap-3 mb-2">
                        <FaHashtag className="w-5 h-5 text-teal-600" />
                        <h4 className="font-semibold text-teal-900">Tax ID</h4>
                        <p className="text-teal-800 font-mono">{details.taxId}</p>
                      </div>
                    </div>
                  )}

                  {details.licenseNumber && (
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl border border-indigo-200">
                      <div className="flex items-center gap-3 mb-2">
                        <FaFileAlt className="w-5 h-5 text-indigo-600" />
                        <h4 className="font-semibold text-indigo-900">License Number</h4>
                        <p className="text-indigo-800 font-mono">{details.licenseNumber}</p>
                      </div>
                    </div>
                  )}

                  {details.vehicleType && (
                    <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-4 rounded-xl border border-rose-200">
                      <div className="flex items-center gap-3 mb-2">
                        <FaCar className="w-5 h-5 text-rose-600" />
                        <h4 className="font-semibold text-rose-900">Vehicle Type</h4>
                        <p className="text-rose-800">{details.vehicleType}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaFileAlt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Additional Details</h3>
                  <p className="text-gray-600">No additional details have been provided for this lead.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'modules' && (
            <div className="space-y-6">
              {modules.length > 0 ? (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Modules of Interest</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {modules.length} {modules.length === 1 ? 'Module' : 'Modules'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {modules.map((mod, i) => (
                      <div key={i} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-600 rounded-lg">
                            <FaBriefcase className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-900">{mod.name}</h4>
                            {mod.description && (
                              <p className="text-sm text-blue-700">{mod.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <FaBriefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Modules Selected</h3>
                  <p className="text-gray-600">This lead hasn't expressed interest in any specific modules yet.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {status.toLowerCase() !== 'converted' && (
          <div className="border-t border-gray-200 p-6 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600 text-center sm:text-left">
              Ready to welcome this lead into our ecosystem?
            </div>

            <button
              // onClick={onConvertLead}
              onClick={() => setConfirmDelete(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  {/* <FaCheckCircle className="w-5 h-5 animate-spin" /> */}
                  Converting...
                  {/* <FaArrowRight className="w-4 h-4" /> */}
                </>
              ) : (
                <>
                  <FaCheckCircle className="w-5 h-5" />
                  Convert Lead
                  <FaArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </div>
        )}


        {confirmDelete && (
          <ConfirmationDialogueBox
            title="Convert This Lead ?"
            description={`Are you sure you want to make "${rowData?.name}" as ${rowData?.leadType === "vendor" ? "Vendor" : "Delivery Agent"}?`}
            onConfirm={onConvertLead}
            onCancel={() => setConfirmDelete(false)} // Close modal if canceled
          />
        )}

        <div className='relative bottom-12'>
          {isSuccess && apiResponse && <SuccessBadge message={apiResponse} />}
          {isError && apiResponse && <ErrorBadge message={apiResponse} />}
          {/* {isError ? <ErrorBadge message={apiResponse} /> : null} */}
        </div>
      </div>

    </div>
  );
};

export default LeadDetailModal;