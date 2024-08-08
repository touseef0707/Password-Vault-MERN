import React, { useState, useRef, useEffect } from 'react';
import { TrashIcon, PencilIcon, ClipboardIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

const OptionsMenu = ({ copyToClipboard, onUpdate, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleHover = (buttonName) => {
    setHoveredButton(buttonName);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={toggleMenu} className="text-cyan-400">
        <EllipsisHorizontalIcon className="h-6 w-6" />
      </button>
      {isMenuOpen && (
        <div className="absolute right-0 p-2 bg-gray-800 rounded-lg shadow-lg flex flex-row gap-2 z-10">
          <div className="relative group">
            <button
              onClick={copyToClipboard}
              onMouseEnter={() => handleHover('Copy')}
              onMouseLeave={() => handleHover(null)}
              className="text-gray-300 hover:text-gray-100"
            >
              <ClipboardIcon className="h-6 w-6" />
            </button>
            {hoveredButton === 'Copy' && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-1 bg-white text-black text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Copy
              </div>
            )}
          </div>

          <div className="relative group">
            <button
              onClick={onUpdate} // Call the onUpdate prop when clicked
              onMouseEnter={() => handleHover('Edit')}
              onMouseLeave={() => handleHover(null)}
              className="text-cyan-400 hover:text-cyan-300"
            >
              <PencilIcon className="h-6 w-6" />
            </button>
            {hoveredButton === 'Edit' && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-1 bg-white text-black text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Edit
              </div>
            )}
          </div>

          <div className="relative group">
            <button
              onClick={onDelete}
              onMouseEnter={() => handleHover('Delete')}
              onMouseLeave={() => handleHover(null)}
              className="text-red-500 hover:text-red-400"
            >
              <TrashIcon className="h-6 w-6" />
            </button>
            {hoveredButton === 'Delete' && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-1 bg-white text-black text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Delete
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionsMenu;
