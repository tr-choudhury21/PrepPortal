import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { imge } from "../assets/avatar1.jpeg"
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        name: "Amit Kumar",
        role: "Alumni",
        feedback: "NITA PrepPortal has been a fantastic resource. The notes and previous year questions helped me prepare effectively.",
        avatar: "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    },
    {
        name: "Sneha Patel",
        role: "3rd Year Student",
        feedback: "I found exactly what I needed for my semester exams. It’s an amazing platform created for students, by students!",
        avatar: "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    },
    {
        name: "Amit Sen",
        role: "2nd Year Student",
        feedback: "The placement resources here are top-notch! It’s like having all the important materials in one place.",
        avatar: "https://i.pravatar.cc/100?img=3",
    },
    {
        name: "KC Pandey",
        role: "Placement Coordinator",
        feedback: "The placement resources here are top-notch! It’s like having all the important materials in one place.",
        avatar: "https://i.pravatar.cc/100?img=3",
    },
    {
        name: "Ajay Singh",
        role: "General Secretary (Technical)",
        feedback: "The placement resources here are top-notch! It’s like having all the important materials in one place.",
        avatar: "https://i.pravatar.cc/100?img=3",
    },
];

function TestimonialSection() {

    return (
        <div className="bg-gray-100 py-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What Students Say</h2>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {testimonials.map((testimonial, index) => (
                <Card key={index} className="shadow-lg rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-gray-50">
                    <CardHeader className="flex items-center space-x-4 p-4">
                    <Avatar src={testimonial.avatar} alt="img" className="w-12 h-12 rounded-full" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                    </CardHeader>
                    <CardContent className="p-4 text-gray-600">
                    <p>"{testimonial.feedback}"</p>
                    </CardContent>
                </Card>
                ))}
            </div>
        </div>
    );
}

export default TestimonialSection;
