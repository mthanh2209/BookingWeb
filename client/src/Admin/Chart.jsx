import AdminPage from "./AdminPage";
import BookingNav from "./BookingNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function ChartPage()
{
    const [bookings, setBookings] = useState([]);
    const [places, setPlaces] = useState([]);
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

  const data = counts.map((count, index) => ({ month: index + 1, quantity: count }));
  const data2 = countsByQuater.map((count, index) => ({ month: index + 1, quantity: count }));
  
  return (
    <div>
        <AdminPage />
        <BookingNav />
        <p className="sloganChart">Chart by months and quater </p>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <LineChart width={600} height={300} data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="quantity" stroke="#F75532" />
              <Tooltip />
              <Legend />
            </LineChart>
             
            <LineChart width={600} height={300} data={data2}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="quantity" stroke="#F3350C" />
              <Tooltip />
              <Legend />
            </LineChart>
        </div>
    </div>
  );
}