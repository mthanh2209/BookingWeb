import { useEffect, useState } from "react";
import axios from "axios";
import AdminPage from "./AdminPage";
import BookingNav from "./BookingNav";

export default function StatisticalPage() {
  const [bookings, setBookings] = useState([]);
  const [counts, setCounts] = useState(Array(12).fill(0));
  const [countsByQuater, setCountsByQuater] = useState(Array(4).fill(0));
 

  useEffect(() => {
    axios.get('/bookings1').then(response => {
      setBookings(response.data);
      // Tính toán giá trị mới cho mảng counts
      const newCounts = response.data.reduce((acc, booking) => {
        const checkInDate = new Date(booking.checkIn);
        const checkInMonth = checkInDate.getMonth();
        acc[checkInMonth]++;
        return acc;
      }, new Array(12).fill(0));
      // Cập nhật state cho mảng counts
      setCounts(newCounts);
    });
  }, []);

  useEffect(() => {
    axios.get('/bookings1').then(response => {
      setBookings(response.data);
      // Tính toán giá trị mới cho mảng counts
      const newCounts = response.data.reduce((acc, booking) => {
        const checkInDate = new Date(booking.checkIn);
        const checkInQuarter = Math.floor(checkInDate.getMonth() / 3); // tính toán quý
        acc[checkInQuarter]++;
        return acc;
      }, new Array(4).fill(0));
      // Cập nhật state cho mảng counts
      setCountsByQuater(newCounts);
    });
  }, []);

  return(
  <div>
          <AdminPage />
          <BookingNav />
     
      <div className="slogan"><b>Statistical by months</b></div>
      <div className="statis">  
         {counts.map((count, index) => (
        <div className="cal" key={index}>
            <p className="month">
              {index+1}
              </p>
            <p className="quan"><b>{count}</b></p>
        </div>
           ))}
      </div>

      <div className="slogan mt-10"><b>Statistical by Quater</b></div>
      <div className="quater">  
         {countsByQuater.map((count, index) => (
        <div className="cal" key={index}>
            <p className="month">
              {index+1}
              </p>
              <p className="quan"><b>{count}</b></p>
        </div>
           ))}
      </div>

  </div>
  );
}