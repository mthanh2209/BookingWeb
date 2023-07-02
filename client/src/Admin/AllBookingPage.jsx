import { useEffect, useState } from "react";
import AdminPage from "./AdminPage";
import axios from "axios";
import StatisticalPage from "./statisticalPage";
import BookingNav from "./BookingNav";


export default function AllBookingPage() {
    const [bookings, setBookings] = useState([]);
    const [places, setPlaces] = useState([]);
   

    useEffect(() => {
      axios.get('/bookings1').then(response => {
        setBookings(response.data);
      });
    }, []);

      useEffect(() => {
        axios.get('/places').then(response => {
          setPlaces(response.data);
        });
      }, []);


      const findPlaceName = (bookingPlaceId) => {
        const place = places.find(place => place._id === bookingPlaceId);
        return place ? place.title : 'Unknown place';
      };

      const findPlacePhotos = (bookingPlaceId) => {
        const place = places.find(place => place._id === bookingPlaceId);
        return place ? place.photos[0] : 'Unknown place';
      };

    return(
    <div>
            <AdminPage />
            
            <BookingNav />

            <div className="mt-8 ml-20 mr-20 grid gap-x-6 gap-y-8 ">
            {bookings.length > 0 && bookings.map(booking => (
            <div className="ml-20 mr-20 mt-4 mb-10 bg-gray-100 -mx-8 px-8 py-4 rounded-2xl">
            <div className="grid gap-2 grid-cols-[3fr_1fr]"> 
               <div className="w-90 grid grid-gap-2 ">
                    <h2 style={{ fontSize: "20px" }}><b>Place: {findPlaceName(booking.place)}</b></h2>  
                    <h2>Name: {booking.name}</h2>
                    <h2>Phone: {booking.phone}</h2>
                    <h2>CheckIn: {booking.checkIn}</h2>
                    <h2>CheckOut: {booking.checkOut}</h2>
                    <h2>Price:{booking.price}</h2>
                </div>
                <div>
                    <img className="rounded-2xl" src={'http://localhost:4000/'+findPlacePhotos(booking.place)} alt="" />
                </div>
            </div>
            </div>
            ))}

           </div>
    </div>
    );
}