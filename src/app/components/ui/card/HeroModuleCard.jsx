'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const bgColors = [
    'bg-[#E18F2C]', // saffron/orange
    'bg-[#923620]', // deep brown
    'bg-[#75763C]', // olive
    'bg-[#7B2C1F]', // maroon
    'bg-[#1E3A5C]', // deep desi blue
    'bg-[#2563EB]', // vibrant blue (tailwind blue-600)
    'bg-[#0A2647]', // dark navy blue
    'bg-[#3B82F6]', // sky blue (tailwind blue-500)
];
const HeroModuleCard = ({ module, index }) => {
    // console.log(module);

    const router = useRouter();

    if (!module) return null;

    const handleClick = () => {

        if (module?.metadata?.slug) {
            router.push(`/explore-module/${module?.metadata?.slug}/${module?._id}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    // Pick color based on index, fallback to first color
    const bgColorClass = bgColors[index % bgColors.length];

    return (
        <div
            className={`
                w-40 h-48 sm:w-44 sm:h-52 md:w-48 md:h-56
                rounded-xl cursor-pointer flex flex-col items-center justify-center
                px-3 py-4 text-center transition-transform duration-200
                hover:scale-105 focus:scale-105
                ${bgColorClass}
            `}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`Explore ${module.name} module`}
        >
            {/* Badge if present */}
            {module.badge && (
                <span className="absolute top-2 right-2 text-xs bg-red-600 text-white px-2 py-0.5 rounded-full shadow">
                    {module.badge}
                </span>
            )}

            {/* Icon */}
            {module.icon ? (
                <Image
                    src={module.icon}
                    alt={`${module.name} icon`}
                    width={68}
                    height={68}
                    className="mb-3"
                />
            ) : null}

            {/* Hindi Name */}
            <h3 className="text-white font-semibold text-lg leading-snug">
                {module.name}
            </h3>
        </div>
    );
};

export default HeroModuleCard;