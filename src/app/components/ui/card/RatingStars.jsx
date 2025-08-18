// components/ui/RatingStars.jsx
import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
            {hasHalfStar && (
                <Star key="half" className="w-4 h-4 text-yellow-400 fill-yellow-400/50" /> // Half-filled or just outline
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
            ))}
        </div>
    );
};

export default RatingStars;