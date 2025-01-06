import { useEffect, useState, useRef } from "react";
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
  const qrCodeRef = useRef(null);
  const { authUser, setAuthUser } = useAuthContext();
  const [guests, setGuests] = useState([]);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await fetch(
          `https://guest-onborad.vercel.app/guests/get-guest-by-hotel-id/${authUser._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Fetching guests failed");
        }

        const guestsData = await response.json();
        setGuests(guestsData);
      } catch (error) {
        console.error("Error fetching guests:", error.message);
      }
    };

    fetchGuests();
  }, [authUser._id]);

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
    return `https://guest-onborad-client.vercel.app/guest-registration/${hotelId}`;
  };

  const handleShowQRCode = (user) => {
    user.detailsUrl = generateHotelDetailsUrl(user._id);
    setShowQRModal(true);
  };

  // Handle print functionality
  const handlePrint = () => {
    const printContent = document.getElementById("guest-details"); // Content to print
    const printWindow = window.open("", "", "height=800,width=800");
    printWindow.document.write(
      "<html><head><title>Guest Details</title></head><body>"
    );
    printWindow.document.write(printContent.innerHTML); // Inject content to print
    printWindow.document.write("</body></html>");
    printWindow.document.close(); // Close the document for printing
    printWindow.print(); // Open the print dialog
  };

  const handleView = async (id) => {
    setShowGuestModal(true);

    try {
      const response = await fetch(
        `https://guest-onborad.vercel.app/guests/get-guest-by-id/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Fetching guest failed");
      }

      const guestData = await response.json();
      setSelectedGuest(guestData);
    } catch (error) {
      console.error("Error fetching guest details:", error.message);
    }
  };

  return (
    <div className="p-8">
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
            Save QR
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
          <div id="guest-details-table">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                {guests?.map((guest, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {guest.name}
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() => handleView(guest._id)}
                      >
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* <Button onClick={handlePrint} variant="outline" className="mt-4">
          Print Guest Details
        </Button> */}
      </Card>

      {/* QR Code Modal */}
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
                ref={qrCodeRef}
                value={authUser.detailsUrl}
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </div>
          </div>
          <Button
            onClick={() => {
              if (qrCodeRef.current) {
                const qrCodeCanvas = qrCodeRef.current.querySelector("canvas");
                if (qrCodeCanvas) {
                  const dataUrl = qrCodeCanvas.toDataURL("image/png");
                  const link = document.createElement("a");
                  link.href = dataUrl;
                  link.download = `${authUser.hotelName}-QR-Code.png`;
                  link.click();
                }
              }
            }}
          >
            Download
          </Button>
        </DialogContent>
      </Dialog>

      {/* Individual Guest Modal */}
      <Dialog open={showGuestModal} onOpenChange={setShowGuestModal}>
        <DialogContent id="guest-details" className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">
                {selectedGuest?.name || "Guest"} Details
              </DialogTitle>
            </div>
          </DialogHeader>
          <div>
            {selectedGuest && (
              <>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Name</h3>
                  <p>{selectedGuest?.name}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Mobile Number</h3>
                  <p>{selectedGuest?.mobileNumber}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Address</h3>
                  <p>{selectedGuest?.address}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Purpose of Visit</h3>
                  <p>{selectedGuest?.purposeOfVisit}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Stay Dates</h3>
                  <p>
                    {selectedGuest?.stayDateFrom} - {selectedGuest?.stayDateTo}
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Email</h3>
                  <p>{selectedGuest?.email}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">ID Proof Type</h3>
                  <p>{selectedGuest?.idProofType}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">ID Proof Number</h3>
                  <p>{selectedGuest?.idProofNumber}</p>
                </div>
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  className="mt-4"
                >
                  Print Details
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuestAdminDashboard;
