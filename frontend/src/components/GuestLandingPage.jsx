import { useState } from "react";
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

export const GuestLandingPage = () => {
  const [guestInfo, setGuestInfo] = useState({
    fullName: "",
    mobileNumber: "",
    address: "",
    purposeOfVisit: "",
    stayDateFrom: null,
    stayDateTo: null,
    emailId: "",
    idProofNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add API call logic here
    console.log("Submitting guest info:", guestInfo);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Guest Registration
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                required
                className="mt-1"
                value={guestInfo.fullName}
                onChange={(e) =>
                  setGuestInfo({ ...guestInfo, fullName: e.target.value })
                }
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
              />
            </div>

            <div>
              <Label htmlFor="purposeOfVisit">Purpose of Visit</Label>
              <Select
                value={guestInfo.purposeOfVisit}
                onValueChange={(value) =>
                  setGuestInfo({ ...guestInfo, purposeOfVisit: value })
                }
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
              <div className="mt-1 grid grid-cols-2 gap-4">
                <Calendar
                  mode="single"
                  selected={guestInfo.stayDateFrom}
                  onSelect={(date) =>
                    setGuestInfo({ ...guestInfo, stayDateFrom: date })
                  }
                />
                <Calendar
                  mode="single"
                  selected={guestInfo.stayDateTo}
                  onSelect={(date) =>
                    setGuestInfo({ ...guestInfo, stayDateTo: date })
                  }
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Submit Registration
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
