import React from 'react';
import { Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function ContactForm() {
    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                Contact Us
            </h2>
            <form className="space-y-4">
                {/* Name Field */}
                <div>
                <Label className="block text-sm font-medium text-gray-600">Name</Label>
                <Input
                    type="text"
                    placeholder="Your name"
                    className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                />
                </div>

                {/* Email Field */}
                <div>
                <Label className="block text-sm font-medium text-gray-600">Email</Label>
                <Input
                    type="email"
                    placeholder="Your email"
                    className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                />
                </div>

                {/* Message Field */}
                <div>
                <Label className="block text-sm font-medium text-gray-600">Message</Label>
                <Textarea
                    placeholder="Your message"
                    className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                <Button variant="default" className="w-full bg-blue-600 text-white hover:bg-blue-700 mt-4">
                    Send Message
                </Button>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;
