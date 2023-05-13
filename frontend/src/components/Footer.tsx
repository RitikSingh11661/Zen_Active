import React from 'react';

export const Footer: React.FC = () => {
  return (
    // <footer className="bg-blue-500">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    //     <p className="text-center text-white text-sm">
    //       &copy; {new Date().getFullYear()} Zen Active. All rights reserved.
    //     </p>
    //   </div>
    // </footer>
<footer className="bg-blue-500 py-6 flex justify-center">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <h3 className="text-lg font-bold mb-2 text-white">Contact</h3>
        <p className="text-gray-300">Email: info@example.com</p>
        <p className="text-gray-300">Phone: +1 123 456 7890</p>
      </div>
      <div className="md:col-span-1">
        <h3 className="text-lg font-bold mb-2 text-white">Links</h3>
        <ul className="text-gray-300">
          <li>
            <a href="/" className="hover:text-white transition-colors duration-300">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-white transition-colors duration-300">
              About
            </a>
          </li>
          <li>
            <a href="/services" className="hover:text-white transition-colors duration-300">
              Services
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-white transition-colors duration-300">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="md:col-span-1">
        <h3 className="text-lg font-bold mb-2 text-white">Follow Us</h3>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-5 w-5"
            >
              {/* Add the appropriate path for the social media icon */}
            </svg>
          </a>
          {/* Add additional social media icons here */}
        </div>
      </div>
    </div>
  </div>
</footer>
  );
};


