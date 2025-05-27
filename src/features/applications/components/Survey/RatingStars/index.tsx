import React from "react";
import {
  Star as FilledStar, // for FaStar (solid)
  Star as OutlinedStar, // for FaRegStar (Lucide has only outlined by default)
} from "lucide-react";

type RatingStarsProps = {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: number;
  readOnly?: boolean;
};

const RatingStars: React.FC<RatingStarsProps> = ({
  value,
  onChange,
  max = 10,
  size = 22,
  readOnly = false,
}) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: max }, (_, index) => {
        const starValue = index + 1;
        const isFilled = value >= starValue;
        const StarIcon = isFilled ? FilledStar : OutlinedStar;

        return readOnly ? (
          <span key={starValue} className="mr-1">
            <StarIcon size={size} className={isFilled ? "fill-yellow-500 stroke-none" : "text-yellow-500"} />
          </span>
        ) : (
          <button
            key={starValue}
            type="button"
            onClick={() => onChange?.(starValue)}
            className="mr-1"
            tabIndex={0}
          >
            <StarIcon size={size} className={isFilled ? "fill-yellow-500 stroke-none" : "text-yellow-500"} />
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;
