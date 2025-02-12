"use client";

import React, { useState } from 'react';
import { ReactNode } from 'react';
import Navigation from './Navigation';
import PageHeader from './PageHeader';


const PatientLayout = ({ children }: { children: ReactNode }) => {

    return (
        <>
            {/* main div */}
            <div className="flex flex-col md:flex-row min-h-screen ">
                {/* Navigation */}
                <div className="w-full md:w-64 fixed bottom-0 md:top-0 left-0 md:h-screen z-20 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200">
                    <Navigation />
                </div>
                {/* Main Content */}
                <div className="flex-1 flex flex-col md:ml-64 h-screen">
                    {/* Content header */}
                    <div className="fixed top-0 left-0 md:left-64 right-0 bg-white z-10 hidden md:block">
                        <PageHeader />
                    </div>
                    {/* children */}
                    <div className="p-4 md:mt-16 mb-16 md:mb-0 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientLayout;
