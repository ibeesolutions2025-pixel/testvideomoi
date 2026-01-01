
import React, { useRef, useState } from 'react';
import { ProductInput } from '../types';

interface Props {
  onImageSelect: (product: ProductInput) => void;
}

const ImageUploader: React.FC<Props> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        onImageSelect({
          image: base64,
          mimeType: file.type,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div 
        onClick={triggerUpload}
        className={`relative group cursor-pointer border-2 border-dashed rounded-2xl transition-all duration-300 flex flex-col items-center justify-center min-h-[300px] overflow-hidden ${preview ? 'border-indigo-300' : 'border-slate-300 hover:border-indigo-400 bg-white hover:bg-indigo-50'}`}
      >
        {preview ? (
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img src={preview} alt="Product Preview" className="max-h-[250px] object-contain rounded-lg shadow-sm" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-medium">Change Image</span>
            </div>
          </div>
        ) : (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Upload Product Image</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-xs mx-auto">
              PNG, JPG or WebP. Use images with clean backgrounds for best results.
            </p>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
