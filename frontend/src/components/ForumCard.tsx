'use client';

import Link from 'next/link';
import { useState } from 'react';

interface ForumCardProps {
  forum: {
    id: number;
    title: string;
    content: string;
    likes: number;
  };
}

export default function ForumCard({ forum }: ForumCardProps) {
  const [likes, setLikes] = useState(forum.likes);
  const [liked, setLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked((prevLiked) => {
      setLikes((prevLikes) => (prevLiked ? prevLikes - 1 : prevLikes + 1));
      return !prevLiked;
    });
  };

  return (
    <div className="p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md transition duration-200 space-y-2">
      <Link href={`/forum/${forum.id}`} className="block space-y-2">
        <h2 className="text-lg font-semibold text-gray-800 hover:text-black">
          {forum.title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2">{forum.content}</p>
      </Link>

      <div className="flex items-center gap-3 text-sm text-gray-500">
        <button
          className={`hover:text-blue-600 transition ${liked ? 'text-blue-600' : ''}`}
          onClick={handleLike}
        >
          👍 {liked ? 'Liked' : 'Like'}
        </button>
        <span>{likes}</span>
      </div>
    </div>
  );
}
