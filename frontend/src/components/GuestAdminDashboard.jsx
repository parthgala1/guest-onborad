import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "../context/AuthContext";

export const GuestAdminDashboard = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({
    fullName: "",
    mobileNumber: "",
    purposeOfVisit: "",
    stayDateFrom: "",
    stayDateTo: "",
  });

  const handleAddGuest = async (e) => {
    e.preventDefault();
    setGuests([...guests, newGuest]);
    console.log("Adding Guests:", guests);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://guest-onborad.vercel.app/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Logout failed");
      }

      localStorage.removeItem("blog-user");
      setAuthUser(null);
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <div className="p-8">
      {/* Admin Header Section */}
      <Card className="p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
            <div className="text-gray-600">
              <p>Name: {authUser?.name || "Admin"}</p>
              <p>Email: {authUser?.email || "admin@example.com"}</p>
              <p>Role: Administrator</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="hover:bg-red-600"
          >
            Logout
          </Button>
        </div>
      </Card>

      {/* Existing Guest Details Card */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Guest Details</h2>
        <div className="overflow-x-auto">
          {/* ... existing table code ... */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text- text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purpose
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stay Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {guests.map((guest, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {guest.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {guest.mobileNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {guest.purposeOfVisit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {guest.stayDateFrom} - {guest.stayDateTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button variant="outline" size="sm" className="mr-2">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="mr-2">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Print
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
