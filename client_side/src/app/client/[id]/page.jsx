'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGrip,
  faClipboardList
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;


function NavBar({ ChangePanel }) {
  return (
    <>
      <div className="w-[75px] flex-none flex flex-col gap-3 items-center h-screen pt-2">
        <FontAwesomeIcon onClick={() => ChangePanel('Restaurants')} icon={faGrip} className='text-2xl text-[#C0C0C0] cursor-pointer hover:text-white hover:bg-[#27AE60] px-2 py-2 rounded-lg duration-75' />
        <FontAwesomeIcon onClick={() => ChangePanel('Orders')} icon={faClipboardList} className='text-2xl text-[#C0C0C0] cursor-pointer hover:text-white hover:bg-[#27AE60] px-2 py-2 rounded-lg duration-75' />
      </div>
    </>
  )
}

function RestaurantCard({ restaurantId, resData, setRestaurantId }) {
  console.log("Restaurant ID in Card:", restaurantId);
  return (
    <>
      <div className='bg-white rounded-lg px-3 py-4 w-[200px] flex-none'>
        <Image src='/images/login.png' width={500} height={500} className='' />
        <h3 className='text-lg my-3'>{resData.restaurant_name}</h3>
        <h3 className='text-xs'>{resData.phone}</h3>
        <h3 className='mb-2 text-xs'>{resData.email}</h3>
        <button onClick={() => setRestaurantId(restaurantId)} className='bg-[#27AE60] text-white px-2 py-2 rounded-lg'>See Menu</button>
      </div>
    </>
  )
}

function MealCard({ mealId, mealData }) {
  return (
    <>
      <div className='bg-white rounded-lg px-3 py-4 w-[250px] flex-none'>
        <Image src='/images/signUp.png' width={300} height={300} className='' />
        <h3 className='text-lg my-3'>{mealData.meal_name}</h3>
        <h3 className='my-1'>{mealData.meal_description}</h3>
        <h3 className='my-1'>{mealData.price}</h3>
        <button className='bg-[#27AE60] text-white px-2 py-2 rounded-lg'>Order</button>
      </div>
    </>
  )
}

function Menus() {
  const [restaurants, setRestaurants] = useState([]);
  const [meals, setMeals] = useState([]);
  const [resId, setResId] = useState(null);

  // Fetch Restaurants
  useEffect(() => {
    axios.get('http://localhost:3500/api/client/restaurants').then((res) => {
      setRestaurants(res.data);
      console.log(res.data)
    });
  }, []);

  // Fetch Meals based on selected restaurant
  const GetMeals = async () => {
    try {
      console.log(resId)
      const res = await axios.get(`http://localhost:3500/api/meals/`, {
        restaurant_id: resId
      });
      console.log(res.data);
      setMeals(res.data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  // Fetch meals when `resId` changes
  useEffect(() => {
    console.log('Current resId:', resId);
    if (resId) {
      GetMeals(); // Execute the function when `resId` changes
    }
  }, [resId]);

  return (
    <>
      <div className="relative">
        <h2 className="text-2xl py-3 font-semibold">Restaurants</h2>
        <div className="flex overflow-x-scroll w-full gap-3 py-3 custom-chats-scrollbar">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.restaurant_id}
              restaurantId={restaurant.restaurant_id}
              resData={restaurant}
              setRestaurantId={setResId} // Pass function to set restaurant ID
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl py-3 font-semibold">Meals</h2>
        <div className="grid grid-cols-6 w-full mx-auto gap-4 pb-10">
          {meals.length > 0 ? (
            meals.map((meal) => (
              <MealCard
                key={meal.meal_id} // Use unique key for each meal
                mealId={meal.meal_id} // Pass unique meal ID
                mealData={meal} // Pass meal data as a prop
              />
            ))
          ) : (
            <p className='w-full'>No meals available</p> // Fallback text if no meals are available
          )}
        </div>
      </div>
    </>
  );
}


function OrderCard() {
  return (
    <>
      <div className='bg-white justify-between items-center px-3 py-2 w-full flex rounded-md gap-3'>
        <div>
          Order Id: 5
        </div>
        <div>
          Restaurant Name: Dummy
        </div>
        <div>
          Meal : Dummy
        </div>
        <div>
          Meal : Dummy
        </div>
        <div>
          Status : Dummy
        </div>
        <button>Cancel</button>
      </div>
    </>
  )
}

function Orders() {
  return (
    <>
      <h1 className='py-2 text-2xl font-semibold'>Orders</h1>
      <div className='flex flex-col gap-4 pb-4'>
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>
    </>
  );
}

function Client() {

  const [panel, setPanel] = useState('Restaurants');

  return (
    <>
      <div className="flex overflow-hidden">
        <NavBar ChangePanel={setPanel} />
        <div className="bg-[#F1F1F1] w-full h-screen overflow-y-scroll custom-meals-scrollbar">
          <div className="w-[95%] mx-auto">
            {panel === 'Restaurants' && <Menus />}
            {panel === 'Orders' && <Orders />}
          </div>
        </div>
      </div>
    </>
  )
}

export default Client