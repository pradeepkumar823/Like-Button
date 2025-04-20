import { useState, useRef } from "react";

export default function LikeButton() {
  const [isLiked, setIsliked] = useState(false);
  const [clicks, setClicks] = useState(0);
  const timeoutRef = useRef(null);

  const toggleLiked = () => {
    if (!isLiked) {
      // Liking the heart
      setIsliked(true);
      setClicks(clicks + 1);

      // Start 20s timer to auto-unlike (but don't change count)
      timeoutRef.current = setTimeout(() => {
        setIsliked(false);
        timeoutRef.current = null;
      }, 2000); // 20 seconds
    } else {
      // Disliking before 20 seconds
      setIsliked(false);
      setClicks(clicks - 1);

      // Cancel the auto-unlike timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  };

  const likeStyle = { color: "red" };

  return (
    <div>
      <p>Like Count = {clicks}</p>
      <p onClick={toggleLiked} style={{ cursor: "pointer" }}>
        {isLiked ? (
          <i className="fa-solid fa-heart" style={likeStyle}></i>
        ) : (
          <i className="fa-regular fa-heart"></i>
        )}
      </p>
    </div>
  );
}
