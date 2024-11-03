import React from 'react'
import GalleryComponent from './GalleryComponent';
import safariImages from './ModelImages';

const GalleryTab = () => {

  return (
    <div role="tablist" className="tabs tabs-lifted">
    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Safari" defaultChecked/>
    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
    <GalleryComponent images={safariImages} />
    </div>
  
    <input
      type="radio"
      name="my_tabs_2"
      role="tab"
      className="tab"
      aria-label="Tab 2"
       />
    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
      Tab content 2
    </div>
  
    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 3" />
    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
      Tab content 3
    </div>
    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 4" />
    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
      Tab content 4
    </div>
  </div>
  )
}

export default GalleryTab
