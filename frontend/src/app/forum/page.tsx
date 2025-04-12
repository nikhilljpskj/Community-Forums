'use client';

import { useEffect, useState } from 'react';
import ForumCard from '@/components/ForumCard';
import Link from 'next/link';

type Forum = {
  id: number;
  title: string;
  content: string;
  likes: number;
  createdAt: string;
  user?: {
    name: string;
  };
};

export default function ForumPage() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/api/forums`);
        if (!res.ok) throw new Error('Failed to fetch forums');
        const data = await res.json();
        setForums(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchForums();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Forum Discussions</h1>
        <Link
          href="/forum/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Create New
        </Link>
      </div>

      {loading && <p>Loading forums...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="space-y-4">
          {forums.length === 0 ? (
            <p>No forums yet. Be the first to post!</p>
          ) : (
            forums.map((forum) => (
              <ForumCard key={forum.id} forum={forum} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
