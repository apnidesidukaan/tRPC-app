"use client";
import React, { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Droplets, 
  MapPin, 
  Phone, 
  Save, 
  X, 
  Calendar, 
  User, 
  Heart,
  Search,
  Filter
} from "lucide-react";

// =================================================================================================
const BLOOD_TYPES = [
  "A_POS",
  "A_NEG",
  "B_POS",
  "B_NEG",
  "AB_POS",
  "AB_NEG",
  "O_POS",
  "O_NEG",
];

const GENDERS = [
  "MALE",
  "FEMALE",
  "OTHER",
  "PREFER_NOT_TO_SAY",
];

const ROLES = [
  "DONOR",
  "RECIPIENT",
];

const REQUEST_STATUSES = [
  "PENDING",
  "ACCEPTED",
  "COMPLETED",
  "CANCELLED",
];

// =================================================================================================
export default function BloodDonationDashboard() {
  // =================================================================================================
  const utils = api.useContext();
  
  // State for user management
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState("MALE");
  const [bloodType, setBloodType] = useState("O_POS");
  const [role, setRole] = useState("DONOR");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  
  // State for blood request management
  const [requestBloodType, setRequestBloodType] = useState("O_POS");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [requestStatus, setRequestStatus] = useState("PENDING");
  
  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [isLoadingId, setIsLoadingId] = useState(null);
  
  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("ALL");
  const [filterBloodType, setFilterBloodType] = useState("ALL");
  
  // =================================================================================================
  // tRPC hooks for user management
  const createUserMutation = api.user.create.useMutation({
    onSuccess() {
      utils.user.getAll.invalidate();
      resetUserForm();
    },
  });
  
  const getAllUsersQuery = api.user.getAll.useQuery();
  
  const updateUserMutation = api.user.update.useMutation({
    onSuccess() {
      utils.user.getAll.invalidate();
      setEditingId(null);
    },
  });
  
  const deleteUserMutation = api.user.delete.useMutation({
    onSuccess() {
      utils.user.getAll.invalidate();
    },
  });
  
  // tRPC hooks for blood request management
  const createBloodRequestMutation = api.bloodRequest.create.useMutation({
    onSuccess() {
      utils.bloodRequest.getAll.invalidate();
      resetBloodRequestForm();
    },
  });
  
  const getAllBloodRequestsQuery = api.bloodRequest.getAll.useQuery();
  
  const updateBloodRequestMutation = api.bloodRequest.update.useMutation({
    onSuccess() {
      utils.bloodRequest.getAll.invalidate();
      setEditingId(null);
    },
  });
  
  const deleteBloodRequestMutation = api.bloodRequest.delete.useMutation({
    onSuccess() {
      utils.bloodRequest.getAll.invalidate();
    },
  });
  
  // =================================================================================================
  function resetUserForm() {
    setName("");
    setEmail("");
    setPhone("");
    setAge(18);
    setGender("MALE");
    setBloodType("O_POS");
    setRole("DONOR");
    setAddress("");
    setCity("");
    setState("");
    setPincode("");
    setLat(0);
    setLng(0);
  }
  
  function resetBloodRequestForm() {
    setRequestBloodType("O_POS");
    setQuantity(1);
    setNotes("");
    setRequestStatus("PENDING");
  }
  
  // =================================================================================================
  async function handleCreateUser(e) {
    e.preventDefault();
    setIsLoadingId("create-user");
    try {
      await createUserMutation.mutateAsync({
        name,
        email,
        phone,
        age,
        gender,
        bloodType,
        role,
        location: {
          lat,
          lng,
          address: address || undefined,
        },
      });
    } catch (err) {
      alert(err?.message || "Create user failed");
    } finally {
      setIsLoadingId(null);
    }
  }
  
  async function handleUpdateUser(id, payload) {
    setIsLoadingId(id);
    try {
      await updateUserMutation.mutateAsync({
        id,
        ...payload
      });
    } catch (err) {
      alert(err?.message || "Update user failed");
    } finally {
      setIsLoadingId(null);
    }
  }
  
  async function handleDeleteUser(id) {
    if (!confirm("Delete this user?")) return;
    setIsLoadingId(id);
    try {
      await deleteUserMutation.mutateAsync({ id });
    } catch (err) {
      alert(err?.message || "Delete user failed");
    } finally {
      setIsLoadingId(null);
    }
  }
  
  async function handleCreateBloodRequest(e) {
    e.preventDefault();
    setIsLoadingId("create-request");
    try {
      await createBloodRequestMutation.mutateAsync({
        bloodType: requestBloodType,
        quantity,
        notes: notes || undefined,
      });
    } catch (err) {
      alert(err?.message || "Create blood request failed");
    } finally {
      setIsLoadingId(null);
    }
  }
  
  async function handleUpdateBloodRequest(id, payload) {
    setIsLoadingId(id);
    try {
      await updateBloodRequestMutation.mutateAsync({
        id,
        ...payload
      });
    } catch (err) {
      alert(err?.message || "Update blood request failed");
    } finally {
      setIsLoadingId(null);
    }
  }
  
  async function handleDeleteBloodRequest(id) {
    if (!confirm("Delete this blood request?")) return;
    setIsLoadingId(id);
    try {
      await deleteBloodRequestMutation.mutateAsync({ id });
    } catch (err) {
      alert(err?.message || "Delete blood request failed");
    } finally {
      setIsLoadingId(null);
    }
  }
  
  // =================================================================================================
  // Filter users based on search term and filters
  const filteredUsers = getAllUsersQuery.data?.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
      
    const matchesRole = filterRole === "ALL" || user.role === filterRole;
    const matchesBloodType = filterBloodType === "ALL" || user.bloodType === filterBloodType;
    
    return matchesSearch && matchesRole && matchesBloodType;
  }) || [];
  
  // Filter blood requests based on search term
  const filteredBloodRequests = getAllBloodRequestsQuery.data?.filter(request => {
    const matchesSearch = 
      request.recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.bloodType.toLowerCase().includes(searchTerm.toLowerCase());
      
    return matchesSearch;
  }) || [];
  
  // =================================================================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl shadow-lg">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-800 to-red-600 bg-clip-text text-transparent">
                  Blood Donation Dashboard
                </h1>
                <p className="text-gray-500 mt-1">Manage donors, recipients, and blood requests</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* User Management Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl shadow-red-500/10 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-red-600/5 to-red-800/5 p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-xl">
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">User Management</h2>
            </div>
          </div>

          <div className="p-6">
            {/* User Form */}
            <form onSubmit={handleCreateUser} className="space-y-6 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email *</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    type="email"
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full pl-12 pr-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Age *</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value))}
                    min="18"
                    max="100"
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  >
                    {GENDERS.map((g) => (
                      <option key={g} value={g}>
                        {g.replace("_", " ").toLowerCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Blood Type *</label>
                  <select
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    {BLOOD_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type.replace("_", "-").replace("POS", "+").replace("NEG", "-")}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Role *</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r.toLowerCase()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">City</label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={createUserMutation.isLoading || isLoadingId === "create-user"}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-900 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {createUserMutation.isLoading || isLoadingId === "create-user" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Create User
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={resetUserForm}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Reset
                </button>
              </div>
            </form>

            {/* User Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search users by name, email, or phone..."
                  className="w-full pl-12 pr-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="flex gap-4">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="ALL">All Roles</option>
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role.toLowerCase()}
                    </option>
                  ))}
                </select>
                
                <select
                  value={filterBloodType}
                  onChange={(e) => setFilterBloodType(e.target.value)}
                  className="px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="ALL">All Blood Types</option>
                  {BLOOD_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type.replace("_", "-").replace("POS", "+").replace("NEG", "-")}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Users List */}
            <div className="space-y-4">
              {getAllUsersQuery.isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
                    <span className="text-gray-600 font-medium">Loading users...</span>
                  </div>
                </div>
              ) : getAllUsersQuery.isError ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <X className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-800">Error loading users</h3>
                      <p className="text-red-600">{getAllUsersQuery.error?.message}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredUsers.length ? (
                    filteredUsers.map((user) => (
                      <div key={user.id} className="bg-white/70 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                                {user.role.toLowerCase()}
                              </span>
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                {user.bloodType.replace("_", "-").replace("POS", "+").replace("NEG", "-")}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                {user.phone}
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Age: {user.age}, {user.gender.replace("_", " ").toLowerCase()}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {user.location?.address || "No address provided"}
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Joined: {new Date(user.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button
                              onClick={() => setEditingId(user.id)}
                              className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
                            >
                              <Edit3 className="w-4 h-4" />
                              Edit
                            </button>

                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              disabled={deleteUserMutation.isLoading || isLoadingId === user.id}
                              className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                              {deleteUserMutation.isLoading && isLoadingId === user.id ? (
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
                        {editingId === user.id && (
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <EditUserForm
                              user={user}
                              onCancel={() => setEditingId(null)}
                              onSave={(payload) => handleUpdateUser(user.id, payload)}
                              loading={isLoadingId === user.id}
                            />
                          </div>
