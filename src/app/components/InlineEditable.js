'use client';
import React, { useState } from 'react';
import { FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

export const InlineEditable = ({
  value,
  onSave,
  type = "text",
  placeholder = "Enter value",
  className = "",
  displayClass = "",
  editClass = "",
  validate,
  saveOnBlur = true
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState(value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    if (validate && !validate(draftValue)) {
      setError("Invalid input");
      return;
    }
    if (draftValue === value) {
      setIsEditing(false);
      return;
    }
    setLoading(true);
    try {
      await onSave(draftValue);
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setDraftValue(value);
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className={`inline-editable ${className}`}>
      {isEditing ? (
        <div className="flex items-center gap-2">
          <input
            type={type}
            value={draftValue}
            onChange={(e) => setDraftValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            onBlur={() => saveOnBlur && handleSave()}
            placeholder={placeholder}
            className={`border-b-2 focus:outline-none ${editClass}`}
            autoFocus
          />
          {loading ? (
            <span className="text-gray-400 text-sm">Saving...</span>
          ) : (
            <>
              <FaCheck className="cursor-pointer text-green-500" onClick={handleSave} />
              <FaTimes className="cursor-pointer text-red-500" onClick={handleCancel} />
            </>
          )}
          {error && <span className="text-red-500 text-xs ml-2">{error}</span>}
        </div>
      ) : (
        <div className={`flex items-center gap-2 ${displayClass}`}>
          <span>{value || placeholder}</span>
          <FaEdit
            size={20}
            className="cursor-pointer text-gray-500 hover:text-black"
            onClick={() => setIsEditing(true)}
          />
        </div>
      )}
    </div>
  );
};

