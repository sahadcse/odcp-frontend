"use client"
import React, { useState } from 'react';

interface PdfViewerProps {
    fileUrl: string;
    fileName?: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl, fileName = 'document' }) => {
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    console.log("PdfViewerProps", fileUrl, fileName);

    return (
        <div className="">
            <div className="">
                <button onClick={() => setIsViewerOpen(!isViewerOpen)} className="bg-color-primary text-white px-2 py-1 rounded-md">
                    {isViewerOpen ? 'Close' : 'View'}
                </button>
            </div>

            {isViewerOpen && (
                <div className="overlay">
                    <div className="pdf-frame-container">
                        <button
                            className="close-button absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-md w-8 h-8 flex items-center justify-center transition-colors duration-200 shadow-md"
                            onClick={() => setIsViewerOpen(false)}
                            aria-label="Close viewer"
                        >
                            <span className="text-2xl leading-none">&times;</span>
                        </button>
                        <iframe
                            src={fileUrl}
                            title="PDF Viewer"
                            width="100%"
                            height="600px"
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                            }}
                        />
                    </div>
                </div>
            )}

            <style jsx>{`
                .pdf-viewer-container {
                    padding: 1rem;
                }
                .button-group {
                    display: flex;
                    gap: 1rem;
                }
                .button-group button {
                    padding: 0.5rem 1rem;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .button-group button:hover {
                    background-color: #0056b3;
                }
                .overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .pdf-frame-container {
                    width: 80%;
                    background-color: white;
                    padding: 1rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    position: relative;
                }
                .pdf-frame-container {
                    width: 80%;
                    background-color: white;
                    padding: 1rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    position: relative;
                }
            `}</style>
        </div>
    );
};

export default PdfViewer;