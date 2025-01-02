import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Upload } from "lucide-react";

export const MainAdminDashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({
    name: "",
    address: "",
    logo: null,
  });

  const handleAddHotel = async (e) => {
    e.preventDefault();
    // Add API call logic here
    setHotels([...hotels, newHotel]);
    console.log("Adding hotel:", newHotel);
  };

  return (
    <div className="p-8">
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Add New Hotel</h2>
        <form onSubmit={handleAddHotel} className="space-y-4">
          <div>
            <Label htmlFor="hotelName">Hotel Name</Label>
            <Input
              id="hotelName"
              value={newHotel.name}
              onChange={(e) =>
                setNewHotel({ ...newHotel, name: e.target.value })
              }
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={newHotel.address}
              onChange={(e) =>
                setNewHotel({ ...newHotel, address: e.target.value })
              }
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="logo">Logo</Label>
            <div className="mt-1 flex items-center">
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
          <Button type="submit" className="w-full">
            Add Hotel
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Registered Hotels</h2>
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
                  <td className="px-6 py-4 whitespace-nowrap">{hotel.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hotel.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={hotel.logo}
                      alt="Hotel Logo"
                      className="h-10 w-10 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button variant="outline" size="sm" className="mr-2">
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
  );
};
