'use client';
import { useEffect, useState } from 'react';
import API from '@/api';
type Forum = {
  id: string;
  title: string;
  description: string;
  tags?: string[] | string | null; // can be array, string, or null
  createdAt: string;
  user: {
    name: string;
  };
};

export default function ForumFeed() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/forums')
      .then((res) => setForums(res.data))
      .catch((err) => {
        console.error("Failed to load forums:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-8">Loading forums...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Forums</h1>
      {forums.map((forum) => {
        let parsedTags: string[] = [];

        if (Array.isArray(forum.tags)) {
          parsedTags = forum.tags;
        } else if (typeof forum.tags === 'string') {
          try {
            const tryJson = JSON.parse(forum.tags);
            if (Array.isArray(tryJson)) {
              parsedTags = tryJson;
            } else {
              parsedTags = forum.tags.split(',').map(tag => tag.trim());
            }
          } catch {
            parsedTags = forum.tags.split(',').map(tag => tag.trim());
          }
        }

        return (
          <div key={forum.id} className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-lg font-semibold">{forum.title}</h2>
            <p className="text-gray-700">{forum.description}</p>
            {parsedTags.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {parsedTags.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-600">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-400 mt-2">
              by {forum.user?.name || 'Unknown'} • {new Date(forum.createdAt).toLocaleString()}
            </p>
          </div>
        );
      })}
    </div>
  );
}
