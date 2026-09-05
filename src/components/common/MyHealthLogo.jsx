import React from 'react';

export default function MyHealthLogo({ size = 'default', showTagline = true, className = '' }) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Icon: Blue Cross + Green Leaf */}
      <div className={`relative ${isLarge ? 'w-24 h-24 mb-4' : isSmall ? 'w-10 h-10 mb-1' : 'w-16 h-16 mb-3'}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Blue Medical Cross */}
          <path
            d="M58 20C58 16.6863 55.3137 14 52 14H40C36.6863 14 34 16.6863 34 20V36H18C14.6863 36 12 38.6863 12 42V54C12 57.3137 14.6863 60 18 60H34V76C34 79.3137 36.6863 82 40 82H52C55.3137 82 58 79.3137 58 76V60H74C77.3137 60 80 57.3137 80 54V42C80 38.6863 77.3137 36 74 36H58V20Z"
            fill="#1B64DA"
          />
          {/* Vibrant Green Leaf Swoosh */}
          <path
            d="M42 62C58 60 76 48 86 28C88 44 80 68 56 78C48 81 42 74 42 62Z"
            fill="#10B981"
          />
          <path
            d="M48 68C60 64 74 52 82 34"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* Brand Name */}
      <h1 className={`font-extrabold tracking-tight text-[#0F172A] flex items-center justify-center ${
        isLarge ? 'text-3xl' : isSmall ? 'text-lg' : 'text-2xl'
      }`}>
        <span>MyHealth</span>
        <span className="text-[#1B64DA] font-black ml-0.5">+</span>
      </h1>

      {/* Optional Tagline */}
      {showTagline && (
        <p className={`text-slate-500 font-medium ${isLarge ? 'text-sm mt-1.5' : 'text-xs mt-0.5'}`}>
          Your Health. Always with You.
        </p>
      )}
    </div>
  );
}
