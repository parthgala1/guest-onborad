import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const GuestAdminDashboard = () => {
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({
    fullName: "",
    mobileNumber: "",
    purposeOfVisit: "",
    stayDateFrom: "",
    stayDateTo: "",
  });

  const handleAddHotel = async (e) => {
    e.preventDefault();
    // Add API call logic here
    setGuests([...guests, newGuest]);
    console.log("Adding Guests:", guests);
  };

  return (
    <div className="p-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Guest Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
