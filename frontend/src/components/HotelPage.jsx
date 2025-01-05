import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HotelPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2]; // Extract the ID from the URL
  const [hotel, setHotel] = useState(null); // State to store hotel data
  const [loading, setLoading] = useState(true); // Loading state to show a loading indicator
  const [error, setError] = useState(null); // State to handle errors

  const getHotelById = async (id) => {
    try {
      const response = await fetch(
        `https://guest-onborad.vercel.app/hotel/get-hotel-by-id/${id}`
      );
      if (!response.ok) {
        throw new Error("Hotel not found");
      }
      const data = await response.json();
      setHotel(data); // Set the hotel data
      setLoading(false); // Set loading to false after the data is fetched
    } catch (error) {
      setError(error.message); // Set error if something goes wrong
      setLoading(false); // Set loading to false if there's an error
    }
  };

  useEffect(() => {
    getHotelById(id); // Fetch hotel details when the component is mounted or the id changes
  }, [id]);

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center">Loading...</div>
    ); // Show loading text while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if an error occurs
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">{hotel?.name}</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Address</h3>
        <p>{hotel?.address}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Hotel Description</h3>
        <p>{hotel?.description}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Facilities</h3>
        <ul>
          {hotel?.facilities?.map((facility, index) => (
            <li key={index}>{facility}</li>
          ))}
        </ul>
      </div>
      {hotel?.logo && (
        <div>
          <h3 className="text-xl font-semibold">Hotel Logo</h3>
          <img
            src={hotel?.logo}
            alt="Hotel Logo"
            className="h-40 w-40 rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default HotelPage;
