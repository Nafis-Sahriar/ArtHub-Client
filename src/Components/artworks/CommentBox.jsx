"use client";
import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { Send } from 'lucide-react';
import { postComment } from '@/lib/api/comments';

export default function CommentBox({ artworkId, session, onCommentAdded }) {
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setIsSubmitting(true);

        const newCommentData = {
            artworkId,
            userId: session.id,
            userName: session.name || "Anonymous User",
            userImageUrl: session.image || "https://ui-avatars.com/api/?name=User&background=CFE1B9&color=4A5D23", 
            comment: comment.trim()
        };

        const savedComment = await postComment(newCommentData);

        if (savedComment) {
            onCommentAdded(savedComment); 
            setComment(""); 
        }

        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-6">
            <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts on this masterpiece..."
                className="w-full bg-[#F4F7F0] border border-[#CFE1B9] text-zinc-800 placeholder-[#97A97C] rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-[#718355] transition-all resize-none h-28"
                required
            />
            <div className="flex justify-end">
                <Button 
                    type="submit" 
                    isLoading={isSubmitting}
                    isDisabled={!comment.trim()}
                    className="bg-[#718355] text-white font-bold rounded-xl px-6 py-2 hover:bg-[#5A6B42] transition-colors"
                >
                    {!isSubmitting && <Send size={16} className="mr-2" />}
                    Post Comment
                </Button>
            </div>
        </form>
    );
}