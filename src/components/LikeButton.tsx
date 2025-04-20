// LikeButton.tsx
import React, { useEffect, useState } from 'react';
import { connectWebSocket, sendLike, onLikeUpdate } from '../utils/websocket';
import { FaThumbsUp } from 'react-icons/fa';
import { PostStats } from '@/service/interface/Post';

type LikeButtonProps = {
  postId: number;
  currentUserId: number;
  postLike: PostStats;
};

type LikeResponse = {
    postId: number;
    userId: number;
    totalLikes: number;
    action: 'like' | 'unlike';
  };
  

export const LikeButton: React.FC<LikeButtonProps> = ({ postId, currentUserId, postLike }) => {
  const [likes, setLikes] = useState(postLike.likesCount || 0);
  const [hasLiked, setHasLiked] = useState(postLike.starred || false);

  useEffect(() => {
    connectWebSocket();

    setLikes(postLike.likesCount || 0);

    const handler = (like: LikeResponse) => {
      if (like.postId === postId) {
        setLikes(like.totalLikes);
        if (like.userId === currentUserId) {
          setHasLiked(like.action === 'like');
        }
      }
    };
  
    onLikeUpdate(handler);
  
  }, [postId, currentUserId, postLike]);
  

  const handleLikeToggle = () => {
    const action = hasLiked ? 'unlike' : 'like';
    sendLike(postId, currentUserId, action);
  };

  return (
    <button
      onClick={handleLikeToggle}
      className={`flex items-center gap-2 transition ${
        hasLiked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
      }`}
    >
      <FaThumbsUp className="text-sm" />
      <span className="text-sm">{likes}</span>
    </button>
  );
};
