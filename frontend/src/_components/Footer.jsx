// src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-12">
            <div className="container mx-auto text-center">
                <p>&copy; 2024 NITA PrepPortal. All Rights Reserved.</p>
                <div className="mt-4">
                <a href="/terms" className="text-blue-400">Terms of Service</a>
                <span className="mx-2">|</span>
                <a href="/privacy" className="text-blue-400">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
