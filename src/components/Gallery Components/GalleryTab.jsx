import React from 'react'
import GalleryComponent from './GalleryComponent';

const GalleryTab = () => {

    const images = [
        [
            'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            'https://images.unsplash.com/photo-1533055640609-24b498cdfd38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            'https://images.unsplash.com/photo-1520694881647-0bbd23f65a39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
          ], // Images for Tab 1
          [
            'https://images.unsplash.com/photo-1498550744920-ea30a65829d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            'https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            'https://images.unsplash.com/photo-1561154464-1e2fd9f7bff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
          ], // Images for Tab 2
          [
            'https://images.unsplash.com/photo-1495592528447-720d5f726ec1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            'https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            'https://images.unsplash.com/photo-1488587362454-6a18fc761ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
          ], // Images for Tab 3
          [
            'https://images.unsplash.com/photo-1533055640609-24b498cdfd38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
            'https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
          ],
      ];

  return (
    <div role="tablist" className="tabs tabs-lifted">
    <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 1" />
    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
    <GalleryComponent images={images[2]} />
    </div>
  
    <input
      type="radio"
      name="my_tabs_2"
      role="tab"
      className="tab"
      aria-label="Tab 2"
      defaultChecked />
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
