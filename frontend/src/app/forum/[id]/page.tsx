'use client';

import { notFound } from 'next/navigation';
import { useState, useEffect, use } from 'react';

type Forum = {
  id: string;
  title: string;
  content: string;
  likes: number;
  createdAt: string;
  user?: {
    name: string;
  };
  comments: {
    id: string;
    content: string;
    user: {
      id: string;
      name: string;
    };
  }[];
};

interface ForumDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ForumDetailPage({ params }: ForumDetailPageProps) {
  const { id } = use(params);

  const [forum, setForum] = useState<Forum | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchForum = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/api/forums/${id}`);
        if (!res.ok) throw new Error('Forum not found');
        const data = await res.json();
        setForum(data);
      } catch (error) {
        console.error(error);
        setForum(null);
      } finally {
        setLoading(false);
      }
    };

    fetchForum();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-900">
      {loading ? (
        <p>Loading...</p>
      ) : !forum ? (
        <p className="text-red-500">Forum not found.</p>
      ) : (
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <h1 className="text-2xl font-bold mb-3">{forum.title}</h1>
          <p className="text-gray-700 mb-5">{forum.content}</p>
          <LikeSection initialLikes={forum.likes || 0} />
          <CommentSection forumId={forum.id} initialComments={forum.comments} />
        </div>
      )}
    </div>
  );
}

function LikeSection({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);

  return (
    <div className="flex items-center gap-3 text-sm text-gray-600 mt-4">
      <button
        onClick={() => setLikes((prev) => prev + 1)}
        className="hover:text-blue-600 transition"
      >
        👍 Like
      </button>
      <span>{likes}</span>
    </div>
  );
}

function CommentSection({
  forumId,
  initialComments,
}: {
  forumId: string;
  initialComments: any[];
}) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const addComment = async () => {
    if (!newComment.trim()) return;

    if (!isLoggedIn) {
      alert('Sign in to comment');
      return;
    }

    const commentData = {
      content: newComment,
      forumId,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(commentData),
      });

      if (!res.ok) throw new Error('Failed to post comment');

      const newComment = await res.json();
      setComments((prev) => [...prev, newComment]);
      setNewComment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Comments</h2>

      <div className="mb-6">
        <textarea
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={isLoggedIn ? 'Write a comment...' : 'Sign in to write a comment'}
          className="w-full bg-white border border-gray-300 text-gray-800 placeholder-gray-400 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 transition"
          disabled={!isLoggedIn}
        />
        <button
          onClick={addComment}
          disabled={!isLoggedIn}
          className={`mt-2 px-5 py-2 rounded-xl transition ${
            isLoggedIn
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-400 cursor-not-allowed text-white'
          }`}
        >
          Post Comment
        </button>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-4">
            <div className="font-semibold">{comment.user?.name || 'Unknown User'}</div>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
