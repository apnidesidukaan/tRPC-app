import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { FaCamera, FaSpinner } from 'react-icons/fa';

function EditableLogo({
  entity,               // The object containing logo + name
  onUpdate,             // Function to handle update (passed as prop)
  updateKey,
  defaultImage = './default-business-icon.png'
}) {
  // console.log('entity[updateKey]', entity[updateKey]);

  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(entity[updateKey] || defaultImage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview instantly
    const tempUrl = URL.createObjectURL(file);
    setPreview(tempUrl);
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('icon', file);

      const res = await onUpdate(entity?._id, formData);

      if (!res || res.status !== 201) throw new Error('Upload failed');
      if (res.data.business) {

        setPreview(res.data.business[updateKey]);
      } else if (res.data.module) {
        setPreview(res.data.module[updateKey]);

      } else {

        setPreview(res.data.category[updateKey]);
      }
    } catch (err) {
      setError(err.message || 'Failed to update');
      setPreview(entity[updateKey] || defaultImage); // revert
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-16 h-16 mb-4 relative rounded-full overflow-hidden border bg-white group cursor-pointer"
      onClick={handleClick}
    >
      <Image
        src={preview}
        alt={entity.name || 'Image'}
        fill
        className="object-contain transition-transform duration-300 group-hover:scale-105"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        {loading ? (
          <FaSpinner className="animate-spin text-white" />
        ) : (
          <FaCamera className="text-white text-lg" />
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default EditableLogo;
