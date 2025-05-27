// src/components/FetchedImg.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/features/auth/authSlice";

interface FetchedImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imgId: string;
}

const FetchedImg: React.FC<FetchedImgProps> = ({ imgId, alt, ...props }) => {
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    let isMounted = true;
    let objectUrl: string;

    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/rest/images/${imgId}`,
          {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (isMounted) {
          objectUrl = URL.createObjectURL(response.data);
          setSrc(objectUrl);
        }
      } catch (err) {
        console.error("Error loading image", err);
        setError(true);
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [imgId, token]);

  if (error) {
    return <span className="text-sm text-red-500">Image failed to load</span>;
  }

  if (!src) {
    return <span className="text-sm text-gray-400">Loading image...</span>;
  }

  return <img src={src} alt={alt ?? "Loaded image"} {...props} />;
};

export default FetchedImg;
