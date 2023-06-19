import React, { useContext, useState } from 'react';
import { Auth } from '../../Contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../SharedComponents/Loading/Loading';
import { toast } from 'react-hot-toast';

const MyBuyers = () => {
    const [loading, setLoading] = useState(true);
    const { user } = useContext(Auth);
    const [myBuyers, setMyBuyers] = useState([])
    const { data = [], isLoading } = useQuery({
      queryKey: ["myBuyers", user?.email],
      queryFn: async () => {
        if (!user) return [];
        const res = await fetch(
          `http://localhost:7000/myBuyers?email=${user?.email}`
        );
        const data = await res.json();
        setLoading(false);
        setMyBuyers(data)
        return data;
      },

    });
    if (loading || isLoading) {
      return <Loading />;
    }
    const handleDeleteBuyers = (id)=>{
      fetch(`http://localhost:7000/seller/${id}`,{
        method :"DELETE",
       })
       .then(res=>res.json())
       .then(data=>{
        const finalbuyers = myBuyers.filter((buyer)=>buyer._id !== id)
        setMyBuyers(finalbuyers)
       toast.success(`Deleted Successfully`)
       console.log(data)
       })
    }
    return (
      <div className='p-5'>
      <h1 className="text-black text-3xl font-primary font-bold mb-4">My Buyers</h1>
      <div className="overflow-x-auto text-black">
    <table className="table">

      <thead>
        <tr className="text-black">
          <th></th>
          <th> Name</th>
          <th> Email</th>
          <th>Device</th>
          <th>Price</th>
          <th>Phone</th>
          <th>Location</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
    {
      myBuyers.map((buyer, i)=> <tr key={i}>
        <td>{i+1}</td>
        <td>{buyer.name}</td>
        <td>{buyer.email}</td>
        <td>{buyer.itemName}</td>
        <td>${buyer.itemPrice}</td>
        <td>{buyer.number}</td>
        <td>{buyer.location}</td>
        <td><button onClick={()=>handleDeleteBuyers(buyer._id)} className='btn btn-sm btn-error'>delete</button></td>
      </tr>)
    }

      </tbody>
    </table>
  </div>
  </div>
    );
};

export default MyBuyers;