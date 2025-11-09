'use client';
import { useState } from 'react';

export default function ImageUpload({ images, onChange, label = "Images" }) {
  const [uploading, setUploading] = useState(false);

  const handleMultipleFileUpload = async (files) => {
    setUploading(true);
    const uploadPromises = Array.from(files).map(async (file) => {
      return new Promise((resolve, reject) => {
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
              resolve(data.dataUrl);
            } else {
              throw new Error('Upload failed');
            }
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    try {
      const uploadedImages = await Promise.all(uploadPromises);
      const newImages = [...images.filter(img => img), ...uploadedImages];
      onChange(newImages);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          if (e.target.files.length > 0) {
            handleMultipleFileUpload(e.target.files);
          }
        }}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
        disabled={uploading}
      />
      
      {uploading && (
        <div className="text-blue-600 mb-4">Uploading images...</div>
      )}
      
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img 
                src={image} 
                alt={`Image ${index + 1}`} 
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}