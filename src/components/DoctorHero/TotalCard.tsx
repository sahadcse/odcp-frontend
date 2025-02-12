"use client";
import { StaticImageData } from "next/image";

interface TotalCardProps {
  cardTitle: string;
  cardNumber: number;
  cardDate: string;
  cardImgUrl?: StaticImageData;
}

const TotalCard = ({
  cardTitle,
  cardNumber,
  cardDate,
  cardImgUrl,
}: TotalCardProps) => {
  return (
    <div className="flex items-center p-2 sm:p-3 md:p-4 rounded-lg shadow-sm text-white bg-color-primary">
      <div className="bg-gray-100 p-1 sm:p-2 rounded-lg mr-2 sm:mr-3 md:mr-5 border border-sky-700">
        <img
          src={cardImgUrl?.src}
          alt="card"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
        />
      </div>
      <div>
        <h1 className="text-sm sm:text-base">{cardTitle}</h1>
        <h1 className="text-base sm:text-lg font-semibold">
          {cardNumber < 10 ? `0${cardNumber}` : cardNumber}
        </h1>
        <p className="text-color-secondary text-xs sm:text-sm">{cardDate}</p>
      </div>
    </div>
  );
};

export default TotalCard;
