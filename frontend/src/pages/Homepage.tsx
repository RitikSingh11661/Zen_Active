import React from 'react';
import { Link } from 'react-router-dom';
import fitness_gif from '../assets/fitness_gif.gif'

export const Homepage: React.FC = () => {
  return (
  <div className="relative flex items-center justify-center min-h-screen">
      <img src={fitness_gif} alt="Fitness GIF" className="absolute inset-0 h-screen w-screen object-cover"/>
      <div className="relative max-w-5xl mx-auto padding-top-2vh px-4 sm:px-6 lg:px-8">
        <div className="my-8 p-6 pt-2vh rounded-lg shadow-lg text-white">
          <h1 className="text-4xl font-bold mb-4 text-center">Welcome to our Health & Wellness Platform</h1>
          <p className="text-lg mb-6 text-center">
            Start your fitness journey today and achieve your goals with our personalized workout routines and nutritional guidance.
          </p>
          <Link to="/signup" className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-md shadow-lg hover:bg-blue-600">
            Get Started
          </Link>
        </div>
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Recommended for You</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Recommended sections */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Workout Routines</h3>
              <p className="text-gray-600">
                Choose from a variety of workout routines designed to help you achieve your fitness goals.
              </p>
              <Link to="/workouts" className="text-blue-500 hover:text-blue-600 mt-4">
                Explore Workouts
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Nutritional Guidance</h3>
              <p className="text-gray-600">
                Get personalized meal plans and nutritional advice to support your fitness journey.
              </p>
              <Link to="/nutrition" className="text-blue-500 hover:text-blue-600 mt-4">
                Explore Nutrition
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Community and Challenges</h3>
              <p className="text-gray-600">
                Join our community, participate in fitness challenges, and connect with like-minded individuals.
              </p>
              <Link to="/community" className="text-blue-500 hover:text-blue-600 mt-4">
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};