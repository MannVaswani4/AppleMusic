import React from 'react';

const MusicSectionLoader = () => {
  const loadingItems = Array(6).fill(null);

  return (
    <div className="bg-[#262628] text-white pt-[70px]">
      {Array(4).fill(null).map((_, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          <div className="h-10 w-64 bg-gray-700 rounded animate-pulse mx-5 mb-4" />
          
          <div className="flex flex-row justify-center">
            <div className="flex flex-row overflow-hidden">
              {loadingItems.map((_, index) => (
                <div key={index} className="m-2">
                  <div className="h-[250px] w-[250px] bg-gray-700 rounded animate-pulse" />
                  <div className="h-6 w-48 bg-gray-700 rounded animate-pulse mt-4 mb-2" />
                  <div className="h-4 w-32 bg-gray-700 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MusicSectionLoader;