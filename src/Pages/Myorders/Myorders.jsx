import React, { useContext, useState } from "react";
import { Auth } from "../../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../SharedComponents/Loading/Loading";
import OrdersRow from "./OrdersRow";

const Myorders = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(Auth);
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      if (!user) return [];
      const res = await fetch(
        `http://localhost:7000/orders?email=${user?.email}`
      );
      const data = await res.json();
      setLoading(false);
      return data;
    },
  });
  if (loading || isLoading) {
    return <Loading />;
  }
  return (

    <div className="p-5">
      <h1 className="text-black text-3xl font-primary font-bold mb-4">My Orders</h1>
        <div className="overflow-x-auto text-black ">
          <table className="table">
      
            <thead>
              <tr className="text-black">
                <th></th>
                <th>Name</th>
                <th>Product Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
      {orders.map((order, i) =><OrdersRow key={i} i={i} order={order}/> )}
            </tbody>
          </table>
        </div>
    </div>

  );
};

export default Myorders;
