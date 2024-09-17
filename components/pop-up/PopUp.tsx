'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Banner {
  id: string;
  image_type_code: string;
  image_type: string;
  image_url: string;
  alt: string;
  category: string;
}

interface ApiResponse {
  brands: Banner[];
}

const PopupBanner: React.FC = () => {
  const [popupBanner, setPopupBanner] = useState<Banner | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // sessionStorage.removeItem('hasSeenPopup');


     const handleBeforeUnload = () => {
      sessionStorage.removeItem('hasSeenPopup');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);


    const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
      const fetchPopupBanner = async () => {
        try {
          const response = await axios.get<ApiResponse>(
            'https://www.technicalsewa.com/techsewa/masterconfig/publicmasterconfig/getconfiglist'
          );
          const banners = response.data.brands;

          const popup = banners.find((banner) => banner.image_type === 'POP UP');

          if (popup) {
            setPopupBanner(popup);
            setIsVisible(true);
          }
        } catch (error) {
          console.error('Error fetching popup banner:', error);
        }
      };

      fetchPopupBanner();
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const closePopup = (): void => {
    setIsVisible(false);
    sessionStorage.setItem('hasSeenPopup', 'true');
  };

  if (!popupBanner || !isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white  rounded-lg shadow-lg max-w-md w-full flex justify-center items- center flex-col pt-4 p-2">
        <button
          onClick={closePopup}
          className="absolute top-1 right-2 text-gray-700 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>
        <img
          src={popupBanner.image_url}
          alt={popupBanner.alt}
          className="  w-full h-[400px] lg:h-[550px] object-contain"
          />
        <p className="mt-2 text-center text-gray-700">{popupBanner.category}</p>
      </div>
    </div>
  );
};

export default PopupBanner;
