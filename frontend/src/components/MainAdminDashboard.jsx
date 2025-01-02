import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload, LogOut, Plus, X, Download } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import { QRCode } from "react-qr-code";

export const MainAdminDashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [showAddHotelModal, setShowAddHotelModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [newHotel, setNewHotel] = useState({
    name: "",
    address: "",
    image: null,
  });

  const { authUser, setAuthUser } = useAuthContext();

  const admin = {
    name: authUser.hotelName,
    email: authUser.email,
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const getHotelById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4224/hotel/get-hotel-by-id/${id}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching hotel by ID:", error);
    }
    return null;
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(
          "http://localhost:4224/hotel/get-all-hotels"
        );
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  const handleAddHotel = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newHotel.name);
    formData.append("address", newHotel.address);
    formData.append("image", newHotel.logo);

    try {
      const response = await fetch("http://localhost:4224/hotel/create", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setNewHotel({ name: "", address: "", logo: null });
        setShowAddHotelModal(false);
        // Refresh the hotels list
        const updatedResponse = await fetch(
          "http://localhost:4224/hotel/get-all-hotels"
        );
        const updatedData = await updatedResponse.json();
        setHotels(updatedData);
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4224/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

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

  const generateHotelDetailsUrl = (hotelId) => {
    // Replace this with your actual frontend URL where hotel details will be displayed
    return `https://m3gg620n-5173.inc1.devtunnels.ms/hotel/${hotelId}`;
  };

  const handleShowQRCode = async (hotel) => {
    const hotelData = await getHotelById(hotel._id);

    if (hotelData) {
      setSelectedHotel({
        ...hotelData,
        detailsUrl: generateHotelDetailsUrl(hotel._id),
      });

      console.log("Selected Hotel:", selectedHotel);

      setShowQRModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={admin.avatar} alt={admin.name} />
                <AvatarFallback>{getInitials(admin.name)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {admin.name}
                </div>
                <div className="text-xs text-gray-500">{admin.email}</div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Hotel Management</h1>
          <Button
            onClick={() => setShowAddHotelModal(true)}
            className="flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Hotel
          </Button>
        </div>

        {/* Hotels Table */}
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hotel Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Logo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {hotels.map((hotel, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {hotel.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {hotel.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={hotel.logo}
                          alt={`${hotel.name} Logo`}
                        />
                        <AvatarFallback>
                          {getInitials(hotel.name)}
                        </AvatarFallback>
                      </Avatar>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        onClick={() => handleShowQRCode(hotel)}
                        variant="outline"
                        size="sm"
                        className="mr-2"
                      >
                        View QR
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
        </Card>
      </div>

      {/* Add Hotel Modal */}
      <Dialog open={showAddHotelModal} onOpenChange={setShowAddHotelModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader className="px-4 py-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold">
                Add New Hotel
              </DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAddHotelModal(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>

          <div className="p-6">
            <form onSubmit={handleAddHotel} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="hotelName">Hotel Name</Label>
                <Input
                  id="hotelName"
                  value={newHotel.name}
                  onChange={(e) =>
                    setNewHotel({ ...newHotel, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newHotel.address}
                  onChange={(e) =>
                    setNewHotel({ ...newHotel, address: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <div className="mt-1">
                  <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Upload className="w-5 h-5 mr-2" />
                    Choose File
                    <input
                      type="file"
                      className="sr-only"
                      onChange={(e) =>
                        setNewHotel({ ...newHotel, logo: e.target.files[0] })
                      }
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddHotelModal(false)}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button type="submit">Add Hotel</Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* QR Code Modal */}
      <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold">
                {selectedHotel?.name} QR Code
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center p-6">
            {selectedHotel && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <QRCode
                  value={selectedHotel.detailsUrl}
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MainAdminDashboard;
