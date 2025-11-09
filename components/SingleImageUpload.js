'use client';
import { useState } from 'react';

export default function SingleImageUpload({ image, onChange, label = "Image" }) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file) => {
    setUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              image: reader.result,
              mimeType: file.type
            }),
          });
          
          if (res.ok) {
            const data = await res.json();
            onChange(data.dataUrl);
          } else {
            throw new Error('Upload failed');
          }
        } catch (error) {
          console.error('Upload error:', error);
          alert('Upload failed');
        } finally {
          setUploading(false);
        }
      };
      reader.onerror = () => {
        alert('Upload failed');
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
      setUploading(false);
    }
  };

  const removeImage = () => {
    onChange('');
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
          }
        }}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
        disabled={uploading}
      />
      
      {uploading && (
        <div className="text-blue-600 mb-4">Uploading image...</div>
      )}
      
      {image && (
        <div className="relative inline-block">
          <img 
            src={image} 
            alt="Preview" 
            className="w-32 h-32 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}