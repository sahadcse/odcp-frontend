"use client";

import React, { useState } from 'react';
import { ReactNode } from 'react';
import Navigation from './Navigation';
import PageHeader from './PageHeader';


const AdminLayout = ({ children }: { children: ReactNode }) => {

    return (
        <>
            {/* main div */}
            <div className="h-screen flex box-border overflow-hidden">
                {/* Navigation */}
                <div className="w-72 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200">
                    <Navigation />
                </div>
                {/* Main Content */}
                <div className="w-screen">
                    {/* Content header */}
                    <div className="">
                        <PageHeader />
                    </div>
                    {/* children */}
                    <div className="w-full p-8 max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLayout;
