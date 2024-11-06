// src/pages/Branch.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const branches = [
    { name: 'Computer Science & Engineering', short: 'CSE' },
    { name: 'Electronics & Communication Engineering', short: 'ECE' },
    { name: 'Electrical Engineering', short: 'EE' },
    { name: 'Electronics & Instrumentation Engineering', short: 'EIE' },
    { name: 'Civil Engineering', short: 'CE' },
    { name: 'Mechanical Engineering', short: 'ME' },
    { name: 'Chemical Engineering', short: 'CHE' },
    { name: 'Biotechnology Engineering', short: 'BE' },
    { name: 'Production Engineering', short: 'PE' },
    // Add more branches...
];

const Branch = () => {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-3xl font-bold text-center pt-12 mb-8">Select Your Branch</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {branches.map((branch) => (
                <div key={branch.short} className="p-6 border rounded-lg shadow hover:shadow-lg transition">
                <h2 className="text-xl font-bold">{branch.name}</h2>
                <p>{branch.short}</p>
                <Link to={`/branch/${branch.short}`} className="text-blue-600 mt-4 inline-block">
                    Explore Resources
                </Link>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Branch;
