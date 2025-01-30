"use client";
import { StaticImageData } from 'next/image';

interface TotalCardProps {
  cardTitle: string;
  cardNumber: number;
  cardDate: string;
  cardImgUrl?: StaticImageData;
}

const TotalCard = ({cardTitle, cardNumber, cardDate, cardImgUrl}: TotalCardProps) => {
  return (
    <div className="flex items-center p-4 rounded-lg shadow-sm text-white bg-color-primary">
      <div className="bg-gray-100 p-2 rounded-lg mr-5 border border-sky-700">
        <img src={cardImgUrl?.src} alt="card" className="w-12 h-12" />
      </div>
      <div className=''>
        <h1 className="text-base">{cardTitle}</h1>
        <h1 className="text-lg font-semibold">{cardNumber < 10 ? `0${cardNumber}` : cardNumber}</h1>
        <p className="text-color-secondary text-sm">{cardDate}</p>
      </div>
    </div>
  );
}

export default TotalCard;