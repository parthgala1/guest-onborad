import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation, useNavigate } from "react-router-dom";

export const GuestLandingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    mobileNumber: "",
    address: "",
    purposeOfVisit: "",
    stayDateFrom: null,
    stayDateTo: null,
    emailId: "",
    idProofType: "",
    idProofNumber: "",
    hotelId: "",
  });

  useEffect(() => {
    const hotelId = location.pathname.split("/")[2];
    setGuestInfo((prev) => ({
      ...prev,
      hotelId: hotelId,
    }));
    console.log("hotelId", hotelId);
  }, [location.pathname]);

  // Get today's date at midnight for consistent comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate maximum date (6 months from today)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);

  const handleFromDateSelect = (date) => {
    setGuestInfo((prev) => {
      // If "To" date exists and is before the new "From" date, clear it
      const newToDate =
        prev.stayDateTo && prev.stayDateTo < date ? null : prev.stayDateTo;
      return {
        ...prev,
        stayDateFrom: date,
        stayDateTo: newToDate,
      };
    });
  };

  const handleToDateSelect = (date) => {
    setGuestInfo((prev) => ({
      ...prev,
      stayDateTo: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "name",
      "mobileNumber",
      "emailId",
      "address",
      "idProofType",
      "idProofNumber",
      "purposeOfVisit",
      "stayDateFrom",
      "stayDateTo",
    ];

    const missingFields = requiredFields.filter((field) => !guestInfo[field]);

    if (missingFields.length > 0) {
      alert("Please fill in all required fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guestInfo.emailId)) {
      alert("Please enter a valid email address");
      return;
    }

    // Validate mobile number (assuming 10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(guestInfo.mobileNumber)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    // API call to submit guest info
    const response = await fetch(
      "https://guest-onborad.vercel.app/guests/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(guestInfo),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || "Failed to submit guest info");
      return;
    }

    navigate(`/hotel/${guestInfo.hotelId}`);
    alert("Guest info submitted successfully");

    console.log("Submitting guest info:", guestInfo);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
          Guest Registration
        </h2>
      </div>

      <div className="mt-4 sm:mt-8 sm:mx-auto sm:max-w-md">
        <Card className="p-4 sm:p-8 min-w-screen mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                required
                className="mt-1"
                value={guestInfo.name}
                onChange={(e) =>
                  setGuestInfo({ ...guestInfo, name: e.target.value })
                }
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                type="tel"
                required
                className="mt-1"
                value={guestInfo.mobileNumber}
                onChange={(e) =>
                  setGuestInfo({ ...guestInfo, mobileNumber: e.target.value })
                }
                placeholder="10-digit mobile number"
                maxLength={10}
              />
            </div>

            <div>
              <Label htmlFor="emailId">Email Address</Label>
              <Input
                id="emailId"
                type="email"
                required
                className="mt-1"
                value={guestInfo.emailId}
                onChange={(e) =>
                  setGuestInfo({ ...guestInfo, emailId: e.target.value })
                }
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                required
                className="mt-1"
                value={guestInfo.address}
                onChange={(e) =>
                  setGuestInfo({ ...guestInfo, address: e.target.value })
                }
                placeholder="Enter your current address"
              />
            </div>

            <div className="space-y-4">
              <Label htmlFor="idProofType">ID Proof Type</Label>
              <Select
                value={guestInfo.idProofType}
                onValueChange={(value) =>
                  setGuestInfo({ ...guestInfo, idProofType: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select ID proof type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="drivingLicense">
                    Driving License
                  </SelectItem>
                  <SelectItem value="aadharCard">Aadhar Card</SelectItem>
                  <SelectItem value="voterCard">Voter Card</SelectItem>
                </SelectContent>
              </Select>

              <div>
                <Label htmlFor="idProofNumber">ID Proof Number</Label>
                <Input
                  id="idProofNumber"
                  type="text"
                  required
                  className="mt-1"
                  value={guestInfo.idProofNumber}
                  onChange={(e) =>
                    setGuestInfo({
                      ...guestInfo,
                      idProofNumber: e.target.value,
                    })
                  }
                  placeholder="Enter ID proof number"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="purposeOfVisit">Purpose of Visit</Label>
              <Select
                value={guestInfo.purposeOfVisit}
                onValueChange={(value) =>
                  setGuestInfo({ ...guestInfo, purposeOfVisit: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="tourist">Tourist</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Stay Dates</Label>
              <div className="mt-1 flex flex-col sm:grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-500">From</Label>
                  <Calendar
                    mode="single"
                    selected={guestInfo.stayDateFrom}
                    onSelect={handleFromDateSelect}
                    disabled={(date) => {
                      return date < today || date > maxDate;
                    }}
                    className="rounded-md border"
                  />
                  {!guestInfo.stayDateFrom && (
                    <p className="text-sm text-red-500 mt-1">
                      Please select check-in date
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm text-gray-500">To</Label>
                  <Calendar
                    mode="single"
                    selected={guestInfo.stayDateTo}
                    onSelect={handleToDateSelect}
                    disabled={(date) => {
                      return (
                        !guestInfo.stayDateFrom ||
                        date < guestInfo.stayDateFrom ||
                        date > maxDate
                      );
                    }}
                    className="rounded-md border"
                  />
                  {guestInfo.stayDateFrom && !guestInfo.stayDateTo && (
                    <p className="text-sm text-red-500 mt-1">
                      Please select check-out date
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!guestInfo.stayDateFrom || !guestInfo.stayDateTo}
            >
              Submit Registration
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default GuestLandingPage;
