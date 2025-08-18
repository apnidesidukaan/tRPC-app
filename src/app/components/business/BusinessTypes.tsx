"use client";
import React, { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { Building2, Plus, Edit3, Trash2, Globe, Instagram, Facebook, Linkedin, Save, X, Calendar, User } from "lucide-react";
// =================================================================================================
const BUSINESS_TYPES = [
  "agriculture",
  "mining",
  "manufacturing",
  "wholesale",
  "retail",
  "logistics",
  "service",
  "financial_services",
  "transportation",
  "utilities",
  "entertainment",
  "media",
  "sports",
  "real_estate",
  "construction",
  "technology",
  "healthcare",
  "education",
  "hospitality",
  "legal_services",
  "consulting",
  "non_profit",
  "government",
  "other",
];
// =================================================================================================
const getBusinessTypeColor = (type) => {
  const colors = {
    technology: "bg-blue-500",
    healthcare: "bg-green-500",
    retail: "bg-purple-500",
    financial_services: "bg-yellow-500",
    education: "bg-indigo-500",
    construction: "bg-orange-500",
    agriculture: "bg-emerald-500",
    manufacturing: "bg-red-500",
    default: "bg-gray-500"
  };
  return colors[type] || colors.default;
};
// =================================================================================================
export default function BusinessDashboard() {
  // =================================================================================================
  // const { data: session } = useSession();
  // const defaultOwner = session?.user?.id ?? "";
  const defaultOwner = '68972283a4062e831546e6f2';

  // form state for create
  const [name, setName] = useState("");
  const [type, setType] = useState("retail");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [ownerId, setOwnerId] = useState(defaultOwner);
  // edit state
  const [editingId, setEditingId] = useState(null);
  const [isLoadingId, setIsLoadingId] = useState(null);

  // =================================================================================================
  const utils = api.useContext();

  const createMutation = api.business.create.useMutation({
    onSuccess() {
      utils.business.getById.invalidate();
      resetForm();
    },
  });

  const getByOwnerQuery = api.business.getById.useQuery(
    ownerId ,
    { enabled: !!ownerId }
  );

  const updateMutation = api.business.update.useMutation({
    onSuccess() {
      utils.business.getById.invalidate();
      setEditingId(null);
    },
  });

  const deleteMutation = api.business.delete.useMutation({
    onSuccess() {
      utils.business.getAll.invalidate();
    },
  });
  // =================================================================================================
  useEffect(() => {
    if (defaultOwner) setOwnerId(defaultOwner);
  }, [defaultOwner]);

  function resetForm() {
    setName("");
    setType("retail");
    setDescription("");
    setWebsite("");
    setInstagram("");
    setFacebook("");
    setLinkedin("");
  }
  // =================================================================================================
  async function handleCreate(e) {
    e.preventDefault();
    setIsLoadingId("create");
    try {
      await createMutation.mutateAsync({
        name,
        type,
        description,
        ownerId,
        logo: undefined,
        bannerImage: undefined,
        website: website || undefined,
        socialLinks: {
          instagram: instagram || undefined,
          facebook: facebook || undefined,
          linkedin: linkedin || undefined,
        },
      });
    } catch (err) {
      alert(err?.message || "Create failed");
    } finally {
      setIsLoadingId(null);
    }
  }

  async function handleUpdate(id, payload) {
    setIsLoadingId(id);
    try {
      console.log('handleUpdate payload =========================', payload);

      await updateMutation.mutateAsync({
        id,
        ownerId, // send from state
        ...payload
      });
    } catch (err) {
      alert(err?.message || "Update failed");
    } finally {
      setIsLoadingId(null);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Soft-delete this business?")) return;
    setIsLoadingId(id);
    try {
      await deleteMutation.mutateAsync({ id });
    } catch (err) {
      alert(err?.message || "Delete failed");
    } finally {
      setIsLoadingId(null);
    }
  }
  // =================================================================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Business Dashboard
                </h1>
                <p className="text-gray-500 mt-1">Manage and grow your business portfolio</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">Owner: </span>
              <span className="font-semibold text-gray-800">{ownerId?.slice(-8) || "—"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Create Business Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl shadow-blue-500/10 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600/5 to-purple-600/5 p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-xl">
                <Plus className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Create New Business</h2>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleCreate} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Business Name *</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter business name"
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Business Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 capitalize"
                  >
                    {BUSINESS_TYPES.map((t) => (
                      <option key={t} value={t} className="capitalize">
                        {t.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="w-full pl-12 pr-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of your business"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Social Media Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Instagram className="absolute left-3 top-3 w-5 h-5 text-pink-500" />
                    <input
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="Instagram URL"
                      className="w-full pl-12 pr-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div className="relative">
                    <Facebook className="absolute left-3 top-3 w-5 h-5 text-blue-600" />
                    <input
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                      placeholder="Facebook URL"
                      className="w-full pl-12 pr-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div className="relative">
                    <Linkedin className="absolute left-3 top-3 w-5 h-5 text-blue-700" />
                    <input
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="LinkedIn URL"
                      className="w-full pl-12 pr-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Owner ID *</label>
                <input
                  value={ownerId}
                  onChange={(e) => setOwnerId(e.target.value)}
                  placeholder="Owner ID (auto-filled if logged in)"
                  className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={createMutation.isLoading || isLoadingId === "create"}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {createMutation.isLoading || isLoadingId === "create" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Create Business
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Businesses List Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl shadow-blue-500/10 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600/5 to-purple-600/5 p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Your Businesses</h2>
            <p className="text-gray-600 mt-1">Manage your existing business portfolio</p>
          </div>

          <div className="p-6">
            {getByOwnerQuery.isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <span className="text-gray-600 font-medium">Loading your businesses...</span>
                </div>
              </div>
            ) : getByOwnerQuery.isError ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <X className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800">Error loading businesses</h3>
                    <p className="text-red-600">{getByOwnerQuery.error?.message}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {getByOwnerQuery.data?.length ? (
                  getByOwnerQuery.data.map((b) => (
                    <div key={b.id} className="bg-white/70 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-3 h-3 rounded-full ${getBusinessTypeColor(b.type)}`}></div>
                            <h3 className="text-xl font-bold text-gray-800">{b.name}</h3>
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium capitalize">
                              {b.type.replace('_', ' ')}
                            </span>
                          </div>

                          <p className="text-gray-600 mb-3">{b.description}</p>

                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Created: {new Date(b.createdAt).toLocaleDateString()}
                            </div>
                            {b.website && (
                              <a href={b.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                                <Globe className="w-4 h-4" />
                                Website
                              </a>
                            )}
                          </div>

                          {(b.socialLinks?.instagram || b.socialLinks?.facebook || b.socialLinks?.linkedin) && (
                            <div className="flex items-center gap-3 mt-3">
                              {b.socialLinks?.instagram && (
                                <a href={b.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600">
                                  <Instagram className="w-5 h-5" />
                                </a>
                              )}
                              {b.socialLinks?.facebook && (
                                <a href={b.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                                  <Facebook className="w-5 h-5" />
                                </a>
                              )}
                              {b.socialLinks?.linkedin && (
                                <a href={b.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                                  <Linkedin className="w-5 h-5" />
                                </a>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => setEditingId(b.id)}
                            className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
                          >
                            <Edit3 className="w-4 h-4" />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(b.id)}
                            disabled={deleteMutation.isLoading || isLoadingId === b.id}
                            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            {deleteMutation.isLoading && isLoadingId === b.id ? (
                              <>
                                <div className="w-4 h-4 border-2 border-red-300 border-t-red-700 rounded-full animate-spin"></div>
                                Deleting...
                              </>
                            ) : (
                              <>
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Inline edit area */}
                      {editingId === b.id && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <EditForm
                            business={b}
                            onCancel={() => setEditingId(null)}
                            onSave={(payload) => handleUpdate(b.id, payload)}
                            loading={isLoadingId === b.id}
                          />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No businesses found</h3>
                    <p className="text-gray-600">Create your first business to get started</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
// =================================================================================================
function EditForm({ business, onCancel, onSave, loading }) {
  const [name, setName] = useState(business.name || "");
  const [type, setType] = useState(business.type || "retail");
  const [description, setDescription] = useState(business.description || "");
  const [website, setWebsite] = useState(business.website || "");
  const [instagram, setInstagram] = useState(business.socialLinks?.instagram || "");
  const [facebook, setFacebook] = useState(business.socialLinks?.facebook || "");
  const [linkedin, setLinkedin] = useState(business.socialLinks?.linkedin || "");

  return (
    <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-2xl p-6 border border-blue-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Edit3 className="w-5 h-5" />
        Edit Business Details
      </h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave({
            name,
            type,
            description,
            website,
            socialLinks: {
              instagram: instagram || undefined,
              facebook: facebook || undefined,
              linkedin: linkedin || undefined
            },
          });
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Business Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Business Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 capitalize"
            >
              {BUSINESS_TYPES.map((t) => (
                <option key={t} value={t} className="capitalize">{t.replace('_', ' ')}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Website</label>
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            rows={3}
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-700">Social Media</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="Instagram URL"
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
            />
            <input
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="Facebook URL"
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
            />
            <input
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="LinkedIn URL"
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// =================================================================================================