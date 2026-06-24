"use client";
import React, { useState } from "react";
import { Button } from "@heroui/react";
import { Heart, MessageCircle, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import CommentSection from "./CommentSection";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function PostCard({ post, user, onPostDeleted }) 
{
    const [showComments, setShowComments] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

   
    const currentUserId = user?.id || user?._id;

   
    const initialIsLiked = post.likes?.includes(currentUserId) || false;
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likeCount, setLikeCount] = useState(post.likes?.length || 0);

    const handleToggleLike = async () => {
        if (!user) {
            toast.error("Please log in to like posts.");
            return;
        }

        // 1. Optimistic UI Update (Instant feedback!)
        const previousIsLiked = isLiked;
        const previousCount = likeCount;

        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

        // 2. Background API Call
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/posts/${post._id}/like`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: currentUserId })
            });

            const result = await res.json();

            // 3. Rollback if the server fails
            if (!res.ok || !result.success) {
                setIsLiked(previousIsLiked);
                setLikeCount(previousCount);
                toast.error("Could not update like.");
            }
        } catch (error) {
            console.error("Error toggling like:", error);
            // Rollback on network error
            setIsLiked(previousIsLiked);
            setLikeCount(previousCount);
            toast.error("Network error.");
        }
    };

    // Security check: Only the post creator OR an Admin can delete the post
    const canDelete = user && (currentUserId === post.userId || user.role === 'admin');

    const handleDelete = async () => {
        // if (!window.confirm("Are you sure you want to delete this post?")) return;

        setIsDeleting(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/posts/${post._id}`, {
                method: "DELETE",
            });

            const result = await res.json();
            
            if (res.ok && result.success) {
                toast.success("Post removed.");
                if (onPostDeleted) onPostDeleted(); // Triggers parent to refresh feed
            } else {
                throw new Error(result.message || "Failed to delete post.");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Error deleting post.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <article className="w-full bg-white border border-[#CFE1B9]/40 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            
   
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3 items-center">
                    {post.userAvatar ? (
                        <img 
                            src={post.userAvatar} 
                            alt={post.userName} 
                            className="w-10 h-10 rounded-full object-cover border-2 border-[#CFE1B9] shrink-0"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-[#E9F5DB] text-[#718355] font-bold flex items-center justify-center border border-[#CFE1B9]/50 shrink-0">
                            {post.userName?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                    )}
                    <div>
                        <div className="flex items-center gap-2">
                            <h4 className="font-bold text-zinc-900 text-sm">{post.userName}</h4>
                            <span className="text-[10px] bg-[#718355] text-white px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                                {post.userRole}
                            </span>
                        </div>
                        <span className="text-xs text-zinc-400">
                            {new Date(post.createdAt).toLocaleDateString(undefined, { 
                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                            })}
                        </span>
                    </div>
                </div>

              
             {canDelete && (  <DeleteConfirmModal  onConfirm={handleDelete}  isDeleting={isDeleting} /> )}


            </div>

     
            <p className="text-zinc-700 leading-relaxed mb-4 text-sm md:text-base whitespace-pre-wrap">
                {post.content}
            </p>

          
            {post.imageUrl && (
                <div className="w-full rounded-2xl mb-4 overflow-hidden border border-[#CFE1B9]/30 bg-zinc-50">
                    <img
                        src={post.imageUrl}
                        alt="Post attachment"
                        className="w-full h-auto max-h-[500px] object-cover"
                        loading="lazy"
                    />
                </div>
            )}

        
            <div className="flex items-center gap-6 pt-3 border-t border-[#CFE1B9]/30">
                <button
                    onClick={handleToggleLike}
                    className={`flex items-center gap-2 transition-colors text-sm font-medium ${
                        isLiked ? 'text-rose-500' : 'text-zinc-500 hover:text-rose-500'
                    }`}
                >
                    <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                    <span>{likeCount}</span>
                </button>

                <button
                    onClick={() => setShowComments(!showComments)}
                    className={`flex items-center gap-2 transition-colors text-sm font-medium ${
                        showComments ? 'text-[#718355]' : 'text-zinc-500 hover:text-[#718355]'
                    }`}
                >
                    <MessageCircle size={18} fill={showComments ? "currentColor" : "none"} />
                    <span>Comments</span>
                </button>
            </div>

      
            {showComments && (
                <div className="mt-4 pt-4 border-t border-[#CFE1B9]/20 animate-in slide-in-from-top-2 duration-300">
                    
                 
                    <CommentSection postId={post._id} user={user} />

                </div>
            )}
        </article>
    );
}