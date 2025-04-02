import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto text-center px-5">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Welcome to PrepPortal
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Your go-to platform for blogs, QnA, and learning resources. Access
            free notes, previous year questions, and placement resources.
          </p>
          <div className="mt-6">
            <Link
              to="/login"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold mr-4 hover:bg-gray-200 transition">
              Get Started
            </Link>
            <Link
              to="/blogs"
              className="bg-transparent border-2 border-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Explore Blogs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
