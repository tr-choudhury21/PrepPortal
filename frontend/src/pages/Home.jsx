import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/_components/Navbar";
import { Link } from "react-router-dom";
import Hero from "../assets/Study_GIF.gif";
import TestimonialSection from "@/_components/Testimonial";
import ContactForm from "@/_components/ContactForm";
import Banner from "@/_components/Banner";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="mt-16">
        <Banner />
        <section
          id="about"
          className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* About Us Section */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome to NITA PrepPortal!
            </h1>
            <p className="text-lg py-5 text-gray-600">
              Access free notes, previous year questions, and placement
              resources uploaded by alumni and seniors for NIT Agartala
              students.
            </p>
            <Link to="/branches">
              <Button className="hover:bg-blue-800">Get Started</Button>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="w-full lg:w-1/2">
            <img
              src={Hero}
              alt="Hero"
              //   className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </section>
      </main>
      <TestimonialSection />
      <ContactForm />
    </div>
  );
};

export default HomePage;
