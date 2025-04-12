'use client';

import { useState } from 'react';

interface ReplyType {
  id: number;
  author: string;
  content: string;
  likes: number;
}

interface CommentType extends ReplyType {
  replies: ReplyType[];
}

export default function Comment({ comment }: { comment: CommentType }) {
  const [likes, setLikes] = useState(comment.likes);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReply = () => {
    console.log('Reply:', replyText);
    setReplyText('');
    setShowReplyBox(false);
  };

  return (
    <div className="mt-4 border-l-2 pl-4">
      <p className="font-medium">{comment.author}</p>
      <p className="text-gray-700">{comment.content}</p>

      <div className="flex items-center gap-4 text-sm mt-2">
        <button onClick={() => setLikes((prev) => prev + 1)} className="text-blue-500">
          👍 {likes}
        </button>
        <button onClick={() => setShowReplyBox(!showReplyBox)} className="text-gray-500">
          💬 Reply
        </button>
      </div>

      {showReplyBox && (
        <div className="mt-2">
          <textarea
            rows={2}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Write your reply..."
          />
          <button onClick={handleReply} className="mt-1 px-3 py-1 bg-blue-500 text-white rounded">
            Post Reply
          </button>
        </div>
      )}

      {/* Replies */}
      {comment.replies.length > 0 && (
        <div className="mt-3 space-y-2 pl-4 border-l-2">
          {comment.replies.map((reply) => (
            <div key={reply.id}>
              <p className="text-sm font-medium">{reply.author}</p>
              <p className="text-sm text-gray-700">{reply.content}</p>
              <div className="text-xs text-gray-500 mt-1">👍 {reply.likes}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
