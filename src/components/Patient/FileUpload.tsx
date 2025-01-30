"use client"
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

interface FileUploadProps {
  consultationId: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ consultationId }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("medical_reports", file));

    try {
      const token = Cookies.get("token");
      await axios.post(
        `${baseURL}/api/users/patient/consultations/${consultationId}/files`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Files uploaded successfully");
      setFiles([]); // Clear files after successful upload
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Upload Medical Reports
        </label>
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          className="w-full text-sm text-gray-800 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
          onChange={handleFileChange}
        />
      </div>
      
      {files.length > 0 && (
        <div className="text-sm text-gray-600">
          {files.length} file(s) selected
        </div>
      )}

      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        onClick={handleUpload}
        disabled={isUploading || files.length === 0}
      >
        {isUploading ? "Uploading..." : "Upload Medical Reports"}
      </button>
    </div>
  );
};

export default FileUpload;