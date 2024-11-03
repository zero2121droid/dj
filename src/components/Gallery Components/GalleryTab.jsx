// GalleryTab.js

import React, { useState } from 'react';
import GalleryComponent from './GalleryComponent';
import safariImages from './ModelImages'; // Adjust this import based on your image data location

const GalleryTab = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 border-b border-gray-700 pb-4 mb-8">
        {['Safari', 'Tab 2', 'Tab 3', 'Tab 4'].map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`text-sm sm:text-lg px-2 sm:px-4 py-2 rounded-t-lg transition-colors duration-200 ${
              activeTab === index
                ? 'text-white border-b-2 border-[#bd2025]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 bg-gray-900 rounded-lg text-white">
        {activeTab === 0 && (
          <div className='max-h-[800px] overflow-auto'>
            <h2 className="text-xl sm:text-2xl mb-4">Safari Gallery</h2>
            <GalleryComponent images={safariImages} />
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <h2 className="text-xl sm:text-2xl mb-4">Tab Content 2</h2>
            <p>This is the content for Tab 2. You can add any other details or components here.</p>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <h2 className="text-xl sm:text-2xl mb-4">Tab Content 3</h2>
            <p>This is the content for Tab 3. Add your desired content or components.</p>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <h2 className="text-xl sm:text-2xl mb-4">Tab Content 4</h2>
            <p>This is the content for Tab 4. Customize this tab with your own information.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryTab;
