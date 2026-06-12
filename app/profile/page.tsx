"use strict";

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { doc, updateDoc, onSnapshot, collection, query, where } from "firebase/firestore";
import { onAuthStateChanged, updateProfile, User } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Plus,
  Trash2,
  Save,
  ShoppingBag,
  Heart,
  LogOut,
  Lock,
  ShieldCheck,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// --- TYPES ---
interface UserAddress {
  id: string;
  label: "Home" | "Work" | "Other" | string;
  fullName: string;
  phone: string;
  streetAddress: string;
  city: string;
  landmark?: string;
  isDefault: boolean;
}

interface UserProfileData {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  addresses: UserAddress[];
  totalOrdersCount: number;
}

export default function UserProfilePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // EDIT STATE FOR PERSONAL DETAILS
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formName, setFormName] = useState<string>("");
  const [formPhone, setFormPhone] = useState<string>("");

  // ADDRESS FORM MANAGEMENT STATE
  const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
  const [addrLabel, setAddrLabel] = useState<string>("Home");
  const [addrName, setAddrName] = useState<string>("");
  const [addrPhone, setAddrPhone] = useState<string>("");
  const [addrStreet, setAddrStreet] = useState<string>("");
  const [addrCity, setAddrCity] = useState<string>("");
  const [addrLandmark, setAddrLandmark] = useState<string>("");

  // UI ALERT TOAST STATES
  const [alertMessage, setAlertMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // 6 Premium FamPay-Style AI Avatars List
  const aiAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80", // Cyber Punk Girl
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80", // Urban Tech Guy
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80", // Vibrant Aesthetic Girl
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80", // Minimalist Modern Guy
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80", // Neon Style Creator
    "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&h=150&q=80"  // Casual Trendy Male
  ];

  // Helper function to auto-assign avatar deterministically using User ID string hash
  const getAutoAvatar = (uid: string): string => {
    if (!uid) return aiAvatars[0];
    let hash = 0;
    for (let i = 0; i < uid.length; i++) {
      hash = uid.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % aiAvatars.length;
    return aiAvatars[index];
  };

  const triggerNotification = (text: string, type: "success" | "error" = "success") => {
    setAlertMessage({ type, text });
    setTimeout(() => setAlertMessage(null), 4000);
  };

  // 1. Listen to Authentication State Changes
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (userInstance) => {
      setCurrentUser(userInstance);
      setAuthLoading(false);
      if (!userInstance) {
        setLoading(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // 2. Setup Real-time Profile & Orders Count Subscriptions from Firestore
  // 2. Setup Real-time Profile & Orders Count Subscriptions from Firestore
useEffect(() => {
  if (authLoading) return;
  if (!currentUser) return;

  const userDocRef = doc(db, "users", currentUser.uid);
  const ordersRef = collection(db, "orders");
  const ordersQuery = query(ordersRef, where("userId", "==", currentUser.uid));

  let activeOrdersCount = 0;

  // Listen to orders count in real-time
  const unsubscribeOrders = onSnapshot(ordersQuery, (ordersSnapshot) => {
    activeOrdersCount = ordersSnapshot.size;
    setProfileData((prev) => prev ? { ...prev, totalOrdersCount: activeOrdersCount } : null);
  }, (err) => console.error(err));

  // Listen to user document fields in real-time
  const unsubscribeDoc = onSnapshot(
    userDocRef,
    async (docSnapshot) => {
      const assignedAvatar = getAutoAvatar(currentUser.uid);

      // CRITICAL FIX: Agar Firebase Auth ya Firestore mein avatar linked nahi hai, to ise permanent sync karein
      if (!currentUser.photoURL || currentUser.photoURL !== assignedAvatar) {
        try {
          await updateProfile(currentUser, { photoURL: assignedAvatar });
          await updateDoc(userDocRef, { photoURL: assignedAvatar });
        } catch (e) {
          console.error("Auto-avatar sync bypass error:", e);
        }
      }

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const parsedProfile: UserProfileData = {
          uid: currentUser.uid,
          displayName: data.displayName || currentUser.displayName || "Valued Foodie",
          email: data.email || currentUser.email || "",
          phoneNumber: data.phoneNumber || data.phone || "", // handles variations
          photoURL: assignedAvatar, 
          addresses: Array.isArray(data.addresses) ? data.addresses : [],
          totalOrdersCount: activeOrdersCount
        };
        setProfileData(parsedProfile);
        setFormName(parsedProfile.displayName);
        setFormPhone(parsedProfile.phoneNumber);
      } else {
        const initialProfile: UserProfileData = {
          uid: currentUser.uid,
          displayName: currentUser.displayName || "Valued Foodie",
          email: currentUser.email || "",
          phoneNumber: currentUser.phoneNumber || "",
          photoURL: assignedAvatar,
          addresses: [],
          totalOrdersCount: activeOrdersCount
        };
        setProfileData(initialProfile);
        setFormName(initialProfile.displayName);
        setFormPhone(initialProfile.phoneNumber);
      }
      setLoading(false);
    },
    (error) => {
      console.error("Error subscribing to profile stream:", error);
      setLoading(false);
    }
  );

  return () => {
    unsubscribeDoc();
    unsubscribeOrders();
  };
}, [currentUser, authLoading]);

  // 3. Handle Profile Info Updates
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !profileData) return;

    if (formPhone && formPhone.length !== 10) {
      triggerNotification("Phone number must be exactly 10 digits", "error");
      return;
    }

    setIsSaving(true);
    try {
      const assignedAvatar = getAutoAvatar(currentUser.uid);

      await updateProfile(currentUser, {
        displayName: formName,
        photoURL: assignedAvatar
      });

      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        displayName: formName,
        phoneNumber: formPhone,
        photoURL: assignedAvatar
      });

      setEditMode(false);
      triggerNotification("Profile details updated successfully!");
    } catch (err) {
      console.error(err);
      triggerNotification("Failed to update profile settings", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // 4. Append New Delivery Location Segment
  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !profileData) return;

    if (!addrName || !addrPhone || !addrStreet || !addrCity) {
      triggerNotification("Please fill in all mandatory fields", "error");
      return;
    }

    if (addrPhone.length !== 10) {
      triggerNotification("Delivery phone number must be 10 digits", "error");
      return;
    }

    const newAddress: UserAddress = {
      id: "addr_" + Date.now(),
      label: addrLabel,
      fullName: addrName,
      phone: addrPhone,
      streetAddress: addrStreet,
      city: addrCity,
      landmark: addrLandmark,
      isDefault: profileData.addresses.length === 0
    };

    const updatedAddressesList = [...profileData.addresses, newAddress];

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        addresses: updatedAddressesList
      });

      setAddrName("");
      setAddrPhone("");
      setAddrStreet("");
      setAddrCity("");
      setAddrLandmark("");
      setShowAddressForm(false);
      triggerNotification("New address added successfully!");
    } catch (err) {
      console.error(err);
      triggerNotification("Failed to save address details", "error");
    }
  };

  // 5. Delete Registered Location Address
  const handleDeleteAddress = async (addressId: string) => {
    if (!currentUser || !profileData) return;
    if (!confirm("Are you sure you want to remove this address?")) return;

    const filteredAddresses = profileData.addresses.filter((item) => item.id !== addressId);

    if (filteredAddresses.length > 0 && !filteredAddresses.some((a) => a.isDefault)) {
      filteredAddresses[0].isDefault = true;
    }

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        addresses: filteredAddresses
      });
      triggerNotification("Address removed successfully");
    } catch (err) {
      console.error(err);
      triggerNotification("Failed to remove address", "error");
    }
  };

  // 6. Set Default Delivery Endpoint
  const handleSetDefaultAddress = async (addressId: string) => {
    if (!currentUser || !profileData) return;

    const mappedAddresses = profileData.addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === addressId
    }));

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        addresses: mappedAddresses
      });
      triggerNotification("Primary delivery address set.");
    } catch (err) {
      console.error(err);
    }
  };

  // 7. Handle System Logout
  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out?")) {
      await auth.signOut();
      window.location.href = "/login";
    }
  };

  // --- RENDER CONDITIONALS ---
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100 dark:border-gray-800">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-950/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please log in to your account to view profile settings and manage your saved delivery addresses.
          </p>
          <Link
            href="/login"
            className="block w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl tracking-wide transition shadow-lg shadow-orange-500/20"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200 pb-16">
      
      {/* FLOATING STATUS TOAST */}
      {alertMessage && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-white font-medium text-sm animate-fade-in ${
          alertMessage.type === "success" ? "bg-emerald-600" : "bg-rose-600"
        }`}>
          {alertMessage.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{alertMessage.text}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 pt-8 md:pt-12">
        
        {/* TOP PANEL SECTION */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              My Profile
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your profile configurations, active communication nodes, and delivery paths.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-xl text-sm font-semibold transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* PROFILE STRUCTURE MAIN CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* PROFILE SUMMARY HUB CARD */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-30 bg-linear-to-r from-orange-500 to-amber-500" />
              
              {/* FIXED AI PHOTO AVATAR DISPLAY CONTAINER */}
              <div className="w-24 h-24 mx-auto relative rounded-full overflow-hidden mb-4 border-4 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 mt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profileData?.photoURL || aiAvatars[0]}
                  alt="Auto assigned AI Avatar Node"
                  className="w-full h-full object-cover select-none"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = aiAvatars[0];
                  }}
                />
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                {profileData?.displayName}
              </h3>
              {/* <p className="text-xs text-gray-400 dark:text-gray-500 truncate mb-4">
                ID: {currentUser.uid.slice(0,8)}...
              </p> */}

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 text-xs font-semibold rounded-full border border-orange-100 dark:border-orange-900/40 mb-6">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Profile
              </div>

              {/* NAVIGATION LINKS GRID TABS */}
              <div className="border-t border-gray-100 dark:border-gray-800 pt-6 grid grid-cols-2 gap-2 text-center">
                <Link
                  href="/myorders"
                  className="p-3 bg-gray-50 dark:bg-gray-900/60 rounded-xl hover:bg-orange-50/50 dark:hover:bg-orange-950/10 transition group border border-transparent hover:border-orange-100 dark:hover:border-orange-900/30"
                >
                  <ShoppingBag className="w-5 h-5 text-orange-500 mx-auto mb-1.5 group-hover:scale-110 transition" />
                  <span className="text-xs font-bold block text-gray-700 dark:text-gray-300">My Orders</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5 font-semibold">
                    {profileData?.totalOrdersCount ?? 0} Records
                  </span>
                </Link>

                <Link
                  href="/favorites"
                  className="p-3 bg-gray-50 dark:bg-gray-900/60 rounded-xl hover:bg-orange-50/50 dark:hover:bg-orange-950/10 transition group border border-transparent hover:border-orange-100 dark:hover:border-orange-900/30"
                >
                  <Heart className="w-5 h-5 text-rose-500 mx-auto mb-1.5 group-hover:scale-110 transition" />
                  <span className="text-xs font-bold block text-gray-700 dark:text-gray-300">Favorites</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">Saved Items</span>
                </Link>
              </div>
            </div>
          </div>

          {/* EDITABLE PERSONAL IDENTITIES AND ADDRESS SETTINGS PANEL */}
          <div className="space-y-6 lg:col-span-2">
            
            {/* BOX CARD: PERSONAL DETAILS FORM INTEGRATION */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 mb-4">
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-orange-500" /> Account Information
                </h4>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-xs font-bold text-orange-500 hover:text-orange-600 transition"
                  >
                    Edit Info
                  </button>
                )}
              </div>

              {!editMode ? (
                /* VIEW DETAILS ROUTINE BLOCK */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <span className="text-xs text-gray-400 block font-medium">Full Name</span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{profileData?.displayName}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-gray-400 block font-medium">Email Address</span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-gray-400" /> {profileData?.email}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-gray-400 block font-medium">Phone Number</span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gray-400" /> {profileData?.phoneNumber || "Not Configured"}
                    </span>
                  </div>
                </div>
              ) : (
                /* FORM EDIT DATA ROUTINE BLOCK */
                <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">Full Name *</label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full text-sm border border-gray-200 dark:border-gray-800 bg-transparent p-3 rounded-xl focus:ring-2 focus:ring-orange-500 dark:text-white outline-none font-medium"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5 font-medium">Phone Number</label>
                      <input
                        type="text"
                        placeholder="10-digit number"
                        value={formPhone}
                        maxLength={10}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, ""); // strip non-numeric character lines
                          setFormPhone(value.slice(0, 10));
                        }}
                        className="w-full text-sm border border-gray-200 dark:border-gray-800 bg-transparent p-3 rounded-xl focus:ring-2 focus:ring-orange-500 dark:text-white outline-none font-medium font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode(false);
                        if (profileData) {
                          setFormName(profileData.displayName);
                          setFormPhone(profileData.phoneNumber);
                        }
                      }}
                      className="px-4 py-2 text-xs font-semibold border border-gray-200 dark:border-gray-800 rounded-xl text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white text-xs font-semibold rounded-xl transition"
                    >
                      <Save className="w-3.5 h-3.5" />
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* BOX CARD: ADDRESS CONFIGURATION WALLET MANAGEMENT SECTION */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 mb-4">
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-500" /> Saved Addresses
                </h4>
                {!showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-xl transition shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Address
                  </button>
                )}
              </div>

              {/* SAVED DELIVERIES ADD FORM INPUT SUB PANEL */}
              {showAddressForm && (
                <form onSubmit={handleAddAddress} className="bg-gray-50 dark:bg-gray-900/60 p-4 border border-gray-200/60 dark:border-gray-800 rounded-xl mb-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider">New Address Details</h5>
                    <button type="button" onClick={() => setShowAddressForm(false)} className="text-xs font-semibold text-gray-400 hover:text-gray-600">✕ Close</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1 font-medium">Address Type *</label>
                      <select
                        value={addrLabel}
                        onChange={(e) => setAddrLabel(e.target.value)}
                        className="w-full text-xs border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2.5 rounded-lg text-gray-800 dark:text-white outline-none font-medium"
                      >
                        <option value="Home">🏡 Home</option>
                        <option value="Work">🏢 Work</option>
                        <option value="Other">📍 Other</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] text-gray-400 mb-1 font-medium">Receiver Name *</label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={addrName}
                        onChange={(e) => setAddrName(e.target.value)}
                        className="w-full text-xs border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2.5 rounded-lg text-gray-800 dark:text-white outline-none font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1 font-medium">Delivery Contact Phone *</label>
                      <input
                        type="text"
                        placeholder="10-digit mobile"
                        value={addrPhone}
                        maxLength={10}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          setAddrPhone(value.slice(0, 10));
                        }}
                        className="w-full text-xs border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2.5 rounded-lg text-gray-800 dark:text-white outline-none font-medium font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1 font-medium">City *</label>
                      <input
                        type="text"
                        placeholder="City name"
                        value={addrCity}
                        onChange={(e) => setAddrCity(e.target.value)}
                        className="w-full text-xs border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2.5 rounded-lg text-gray-800 dark:text-white outline-none font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1 font-medium">Street Address *</label>
                    <textarea
                      placeholder="Flat/House No, Building Layout, Street Address"
                      value={addrStreet}
                      onChange={(e) => setAddrStreet(e.target.value)}
                      className="w-full text-xs border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2.5 rounded-lg text-gray-800 dark:text-white outline-none font-medium"
                      rows={2}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1 font-medium">Landmark (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Near Market Square"
                      value={addrLandmark}
                      onChange={(e) => setAddrLandmark(e.target.value)}
                      className="w-full text-xs border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2.5 rounded-lg text-gray-800 dark:text-white outline-none font-medium"
                    />
                  </div>

                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowAddressForm(false)}
                      className="px-3 py-1.5 text-xs font-semibold border border-gray-200 dark:border-gray-800 rounded-lg text-gray-500 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              {/* RENDERING ADDRESS METADATA SEGMENTS */}
              {(!profileData || profileData.addresses.length === 0) ? (
                <div className="text-center py-8 bg-gray-50/50 dark:bg-gray-900/40 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                  <MapPin className="w-8 h-8 mx-auto text-gray-300 dark:text-gray-700 mb-2" />
                  <p className="text-xs text-gray-400 font-medium">No saved addresses found in your account.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {profileData.addresses.map((addressItem) => (
                    <div
                      key={addressItem.id}
                      className={`p-4 rounded-xl border transition relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 ${
                        addressItem.isDefault
                          ? "border-orange-500 bg-orange-50/10 dark:bg-orange-950/5"
                          : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
                      }`}
                    >
                      <div className="space-y-1 max-w-lg">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                            addressItem.label === "Home" 
                              ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400" 
                              : addressItem.label === "Work" 
                              ? "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400" 
                              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                          }`}>
                            {addressItem.label}
                          </span>
                          {addressItem.isDefault && (
                            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wide">
                              ★ Default
                            </span>
                          )}
                        </div>

                        <h5 className="text-sm font-bold text-gray-900 dark:text-white">{addressItem.fullName}</h5>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                          {addressItem.streetAddress}, {addressItem.city}
                          {addressItem.landmark && ` (Landmark: ${addressItem.landmark})`}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5 font-medium font-mono">Phone: {addressItem.phone}</p>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 dark:border-gray-800">
                        {!addressItem.isDefault && (
                          <button
                            onClick={() => handleSetDefaultAddress(addressItem.id)}
                            className="text-[11px] font-bold text-gray-400 hover:text-orange-500 transition"
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteAddress(addressItem.id)}
                          className="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 transition p-1"
                          title="Delete address segment"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> <span className="sm:hidden text-[11px] font-bold">Remove Address</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}