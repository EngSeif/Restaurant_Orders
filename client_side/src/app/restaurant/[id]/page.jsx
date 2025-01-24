'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

function NavBar({ ChangePanel }) {
  return (
    <div className="w-[75px] flex-none flex flex-col gap-3 items-center h-screen pt-2">
      <FontAwesomeIcon 
        onClick={() => ChangePanel('Meals')} 
        icon={faUtensils} 
        className='text-2xl text-[#C0C0C0] cursor-pointer hover:text-white hover:bg-[#27AE60] px-2 py-2 rounded-lg duration-75' 
      />
      <FontAwesomeIcon 
        onClick={() => ChangePanel('Orders')} 
        icon={faClipboardList} 
        className='text-2xl text-[#C0C0C0] cursor-pointer hover:text-white hover:bg-[#27AE60] px-2 py-2 rounded-lg duration-75' 
      />
    </div>
  );
}

function MealCard({ mealId, mealData, deleteMeal }) {
  const formattedPrice = mealData.price ? parseFloat(mealData.price).toFixed(2) : '0.00';

  return (
    <div className='bg-white rounded-lg px-3 py-4 w-[250px] flex-none'>
      <Image 
        src='/images/signUp.png' 
        width={300} 
        height={300} 
        alt={`Image of ${mealData.meal_name || 'meal'}`}
        sizes="(max-width: 300px) 100vw, 300px"
        className='w-full h-auto object-cover rounded-lg' 
      />
      <h3 className='text-lg my-3 font-semibold'>{mealData.meal_name || 'Unnamed Meal'}</h3>
      <p className='my-1 text-gray-600'>{mealData.meal_description || 'No description available'}</p>
      <div className='my-1 flex gap-1'>
        <span className='text-[#27AE60]'>Price:</span> 
        <span>${formattedPrice}</span>
      </div>
      <button 
        onClick={() => deleteMeal(mealId)} 
        className='bg-red-500 text-white px-2 py-2 rounded-lg hover:bg-red-600 w-full mt-2 transition-colors'>
        Delete
      </button>
    </div>
  );
}

function OrderCard({ orderData, onStatusChange }) {
  const handleStatusChange = async (newStatus) => {
    try {
      await axios.put(`http://localhost:3500/api/orders/${orderData.order_id}/status`, {
        status: newStatus
      });
      onStatusChange(); // Refresh orders after status change
    } catch (error) {
      console.error("Error updating order status:", error);
      //alert("Failed to update order status");
    }
  };

  return (
    <div className="bg-white items-center px-4 py-3 w-full flex rounded-lg gap-4 shadow-sm">
      <div className='flex-1'>
        <div className='flex gap-2'>
          <span className='text-[#b9770e] font-semibold'>Order ID:</span> 
          <span>{orderData.order_id}</span>
        </div>
        <div className='flex gap-2'>
          <span className='text-[#1e8449] font-semibold'>Meal:</span> 
          <span>{orderData.meal_name}</span>
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <div className='flex gap-2 items-center'>
          <span className='text-[#1e8449] font-semibold'>Status:</span>
          <select 
            className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
            value={orderData.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function RestaurantOrders() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3500/api/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      //alert("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Orders</h2>
        <div className="flex gap-2 items-center">
          <span className="text-gray-600">Filter by status:</span>
          <select 
            className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {isLoading ? (
          <div className="text-center py-4">Loading orders...</div>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard 
              key={order.order_id} 
              orderData={order} 
              onStatusChange={fetchOrders}
            />
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">No orders available</div>
        )}
      </div>
    </div>
  );
}

function ManageMeals() {
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState('');
  const [mealDescription, setMealDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axios.get('http://localhost:3500/api/meals');
        const validatedMeals = res.data.map(meal => ({
          ...meal,
          meal_id: meal.meal_id || Date.now(),
          meal_name: meal.meal_name || 'Unnamed Meal',
          meal_description: meal.meal_description || 'No description available',
          price: meal.price || 0
        }));
        setMeals(validatedMeals);
      } catch (error) {
        console.error('Error fetching meals:', error);
        //alert('Failed to fetch meals');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const addMeal = async () => {
    try {
      if (!mealName.trim()) {
        alert('Please enter a meal name');
        return;
      }
      if (!mealDescription.trim()) {
        alert('Please enter a meal description');
        return;
      }
      if (!price || isNaN(price) || Number(price) <= 0) {
        alert('Please enter a valid price');
        return;
      }

      setIsSubmitting(true);
      const newMeal = {
        meal_name: mealName.trim(),
        meal_description: mealDescription.trim(),
        price: Number(price),
      };

      const res = await axios.post('http://localhost:3500/api/meals', newMeal);
      const validatedMeal = {
        ...res.data,
        meal_id: res.data.meal_id || Date.now(),
        meal_name: res.data.meal_name || mealName,
        meal_description: res.data.meal_description || mealDescription,
        price: res.data.price || Number(price)
      };
      
      setMeals(prevMeals => [...prevMeals, validatedMeal]);
      setMealName('');
      setMealDescription('');
      setPrice('');
      //alert('Meal added successfully');
    } catch (error) {
      console.error('Error adding meal:', error);
      //alert('Failed to add meal. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteMeal = async (mealId) => {
    try {
      await axios.delete(`http://localhost:3500/api/meals/${mealId}`);
      setMeals(prevMeals => prevMeals.filter(meal => meal.meal_id !== mealId));
      //alert('Meal deleted successfully');
    } catch (error) {
      console.error('Error deleting meal:', error);
      //alert('Failed to delete meal. Please try again.');
    }
  };

  return (
    <>
      <div className="relative">
        <h2 className="text-2xl py-3 font-semibold">Add a New Meal</h2>
        <div className='flex flex-col gap-3 bg-white rounded-lg p-4 w-[400px] shadow-sm'>
          <input 
            type='text' 
            placeholder='Meal Name' 
            value={mealName} 
            onChange={(e) => setMealName(e.target.value)} 
            className='border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]'
          />
          <textarea 
            placeholder='Meal Description' 
            value={mealDescription} 
            onChange={(e) => setMealDescription(e.target.value)} 
            className='border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60] min-h-[100px]'
          />
          <input 
            type='number' 
            placeholder='Price' 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            className='border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]'
            min="0"
            step="0.01"
          />
          <button 
            onClick={addMeal} 
            disabled={isSubmitting}
            className='bg-[#27AE60] text-white px-4 py-2 rounded-lg hover:bg-[#229652] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'>
            {isSubmitting ? 'Adding...' : 'Add Meal'}
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl py-3 font-semibold">Your Meals</h2>
        <div className="flex overflow-x-scroll w-full gap-3 py-3 custom-chats-scrollbar">
          {isLoading ? (
            <div className='w-full text-center py-4'>Loading meals...</div>
          ) : meals.length > 0 ? (
            meals.map((meal) => (
              <MealCard
                key={meal.meal_id}
                mealId={meal.meal_id}
                mealData={meal}
                deleteMeal={deleteMeal}
              />
            ))
          ) : (
            <div className='w-full text-center py-4 text-gray-500'>No meals available</div>
          )}
        </div>
      </div>
    </>
  );
}

function Restaurant() {
  const [panel, setPanel] = useState('Meals');

  return (
    <div className="flex overflow-hidden">
      <NavBar ChangePanel={setPanel} />
      <div className="bg-[#F1F1F1] w-full h-screen overflow-y-scroll custom-meals-scrollbar">
        <div className="w-[95%] mx-auto py-4">
          {panel === 'Meals' && <ManageMeals />}
          {panel === 'Orders' && <RestaurantOrders />}
        </div>
      </div>
    </div>
  );
}

export default Restaurant;