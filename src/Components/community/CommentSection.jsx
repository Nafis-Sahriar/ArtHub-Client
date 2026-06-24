"use client";
import React, { useState, useEffect } from "react";
import { Input, Button } from "@heroui/react";
import { Send, Loader2, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

export default function CommentSection({ postId, user }) {
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/posts/${postId}/comments`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.error("Failed to fetch comments:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchComments();
    }, [postId]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newCommentText.trim() || !user) return;

        setIsSubmitting(true);
        
        
        const payload = {
            userId: user.id || user._id,
            userName: user.name,
            userImageUrl: user.image || "",
            comment: newCommentText.trim(),
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/posts/${postId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (res.ok && result.success) {
             
                const optimisticComment = {
                    _id: result.insertedId || Date.now().toString(),
                    ...payload,
                    createdAt: new Date().toISOString()
                };

                setComments((prev) => [...prev, optimisticComment]);
                setNewCommentText(""); 
            } else {
                throw new Error(result.message || "Failed to post comment");
            }
        } catch (error) {
            console.error(error);
            toast.error("Could not post reply.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-6 text-[#718355]">
                <Loader2 className="animate-spin size-4 mr-2" />
                <span className="text-xs font-semibold">Loading..</span>
            </div>
        );
    }

    return (
        <div className="space-y-4 pt-2">
          
            {user ? (
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  {user.image ? (
                        <img
                            src={user.image}
                            alt={user.name}
                            className="size-7 shrink-0 rounded-full object-cover border border-[#CFE1B9]"
                        />
                    ) : (
                        <div className="size-7 shrink-0 rounded-full bg-[#E9F5DB] text-[#718355] text-xs font-bold flex items-center justify-center border border-[#CFE1B9]/50">
                            {user.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                    )}

                    <Input
                        size="sm"
                        placeholder="Write a reply..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        className="flex-1"
                        classnames={{ inputWrapper: "rounded-xl border-[#CFE1B9]/60 bg-zinc-50/80 shadow-none" }}
                    />
                    <Button
                        isIconOnly
                        type="submit"
                        size="sm"
                        isDisabled={!newCommentText.trim() || isSubmitting}
                        className="bg-[#718355] text-white rounded-xl hover:bg-[#5A6B42]"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin size-3.5" /> : <Send size={13} />}
                    </Button>
                </form>
            ) : (
                <p className="text-center text-[11px] text-zinc-400 italic">
                    Log in to reply to this conversation.
                </p>
            )}

         
            <div className="space-y-2.5 pl-2 sm:pl-4 border-l-2 border-[#CFE1B9]/40">
                {comments.length === 0 ? (
                    <div className="text-center py-4 text-zinc-400 text-xs flex items-center justify-center gap-1.5">
                        <MessageSquare size={13} />
                        <span>No replies yet. Start the conversation!</span>
                    </div>
                ) : (
                    <>
                    
                        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider pb-1 flex items-center gap-1.5">
                            <MessageSquare size={12} />
                            {comments.length} {comments.length === 1 ? 'Reply' : 'Replies'}
                        </div>

                        
                        {comments.map((c) => (
                            <div key={c._id} className="flex gap-2.5 items-start text-xs animate-in fade-in duration-300">
                                {c.userImageUrl ? (
                                    <img
                                        src={c.userImageUrl}
                                        alt={c.userName}
                                        className="size-6 shrink-0 rounded-full object-cover border border-[#CFE1B9]"
                                    />
                                ) : (
                                    <div className="size-6 shrink-0 rounded-full bg-[#E9F5DB] text-[#718355] text-[10px] font-bold flex items-center justify-center border border-[#CFE1B9]/50">
                                        {c.userName?.charAt(0)?.toUpperCase() || "?"}
                                    </div>
                                )}
                                <div className="flex-1 bg-zinc-50 border border-zinc-200/60 rounded-2xl px-3.5 py-2.5">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-bold text-zinc-800">{c.userName}</span>
                                        <span className="text-[10px] text-zinc-400">
                                            {new Date(c.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                    <p className="text-zinc-600 leading-relaxed wrap-break-words">{c.comment}</p>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}