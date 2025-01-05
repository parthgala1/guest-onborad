import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthContext } from "../context/AuthContext";
import { QRCode } from "react-qr-code";

export const GuestAdminDashboard = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const [guests, setGuests] = useState([]);
  const [showQRModal, setShowQRModal] = useState(false);

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

      localStorage.removeItem("guest-user");
      setAuthUser(null);
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  const generateHotelDetailsUrl = (hotelId) => {
    // Replace this with your actual frontend URL where hotel details will be displayed
    return `https://guest-onborad-client.vercel.app/guest-registration/${hotelId}`;
  };

  const handleShowQRCode = (user) => {
    user.detailsUrl = generateHotelDetailsUrl(user._id);
    setShowQRModal(true);
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
            onClick={() => handleShowQRCode(authUser)}
            variant="outline"
            size="sm"
            className="mr-2"
          >
            View QR
          </Button>
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

      {/* Add New Guest Form */}
      <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">
                {authUser.hotelName} QR Code
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center p-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <QRCode
                value={authUser.detailsUrl}
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
