import React from 'react';
import { Typography } from '@material-tailwind/react';
import { ClockIcon } from '@heroicons/react/24/solid';

function ArtCard({ art, onClick }) {
  return (
    <div className="relative overflow-hidden rounded-lg group cursor-pointer" onClick={onClick}>
      <img
        src={`http://localhost:8000${art.image}`}
        alt={art.title}
        className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:brightness-75"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/placeholder.jpg'; // Path to your placeholder image
        }}
      />
<figcaption className="absolute bottom-4 left-2/4 flex w-[calc(100%-3rem)] -translate-x-2/4 justify-between rounded-lg border border-white bg-white/75 py-2 px-4 shadow-md shadow-black/5 saturate-200 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        <div>
          <Typography variant="h6" color="blue-gray" className="text-sm font-semibold">
            {art.title}
          </Typography>
          <Typography color="gray" className="mt-1 font-normal text-xs">
            {art.description}
          </Typography>
        </div>
        <div className="flex text-gray-600 space-x-1">
          <ClockIcon className="h-3 w-3 text-gray-500" />
          <Typography variant="small" color="gray" className="text-xs">
            {new Date(art.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </Typography>
        </div>
      </figcaption>
    </div>
  );
}

export default ArtCard;

