"use client";
import React, { useState, useEffect } from 'react';
import { getCommentsByArtworkId, updateComment, deleteComment } from '@/lib/api/comments';
import CommentBox from './CommentBox';
import { MessageSquare, Edit2, Trash2, X, Check } from 'lucide-react';
import { Button } from '@heroui/react';

export default function CommentSection({ artworkId, session }) {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // States for inline editing
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [isActionLoading, setIsActionLoading] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            const data = await getCommentsByArtworkId(artworkId);
            setComments(data);
            setIsLoading(false);
        };
        fetchComments();
    }, [artworkId]);

    const handleNewComment = (newComment) => {
        setComments((prev) => [newComment, ...prev]);
    };

  
    const handleDelete = async (commentId) => {
     
        
        setIsActionLoading(true);
        const success = await deleteComment(commentId, session.id);
        
        if (success) {
           
            setComments((prev) => prev.filter(c => c._id !== commentId));
        }
        setIsActionLoading(false);
    };

   
    const startEditing = (comment) => {
        setEditingId(comment._id);
        setEditValue(comment.comment);
    };

    
    const handleSaveEdit = async (commentId) => {
        if (!editValue.trim()) return;
        
        setIsActionLoading(true);
        const success = await updateComment(commentId, editValue.trim(), session.id);
        
        if (success) {
            setComments((prev) => prev.map(c => 
                c._id === commentId ? { ...c, comment: editValue.trim(), isEdited: true } : c
            ));
            setEditingId(null); 
        }
        setIsActionLoading(false);
    };

    return (
        <div className="mt-12 bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-[#CFE1B9]/50">
            <h2 className="text-2xl font-black text-[#11140E] mb-6 flex items-center gap-2">
                <MessageSquare className="text-[#718355]" />
                Comments ({comments.length})
            </h2>

            {session ? (
                <CommentBox artworkId={artworkId} session={session} onCommentAdded={handleNewComment} />
            ) : (
                <div className="bg-[#E9F5DB] border border-[#CFE1B9] text-[#4A5D23] px-4 py-4 rounded-xl text-center font-medium mb-8">
                    Please log in to share your thoughts on this artwork.
                </div>
            )}

            <div className="mt-10 flex flex-col gap-6">
                {isLoading ? (
                    <div className="text-center text-[#97A97C] py-4">Loading comments...</div>
                ) : comments.length > 0 ? (
                    comments.map((c) => {
                        const isOwner = session?.id === c.userId;
                        const isCurrentlyEditing = editingId === c._id;

                        return (
                            <div key={c._id} className="flex gap-4 p-4 rounded-2xl hover:bg-[#F4F7F0] transition-colors group">
                                <img 
                                    src={c?.userImageUrl} 
                                    alt={c.userName} 
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-[#CFE1B9]"
                                />
                                <div className="flex flex-col w-full">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-[#11140E]">{c.userName}</span>
                                            <span className="text-xs text-gray-400 font-medium">
                                                {new Date(c.createdAt).toLocaleDateString()} 
                                                {c.isEdited && <span className="italic ml-1">(edited)</span>}
                                            </span>
                                        </div>
                                        
                                        
                                        {isOwner && !isCurrentlyEditing && (
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => startEditing(c)} className="text-gray-400 hover:text-blue-500 transition-colors" disabled={isActionLoading}>
                                                    <Edit2 size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(c._id)} className="text-gray-400 hover:text-red-500 transition-colors" disabled={isActionLoading}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    
                                    {isCurrentlyEditing ? (
                                        <div className="mt-2 flex flex-col gap-2">
                                            <textarea 
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="w-full bg-white border border-[#CFE1B9] text-zinc-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#718355] resize-none h-24"
                                            />
                                            <div className="flex justify-end gap-2">
                                                <Button size="sm" variant="flat" onPress={() => setEditingId(null)} className="rounded-lg">
                                                    <X size={14} className="mr-1" /> Cancel
                                                </Button>
                                                <Button size="sm" isLoading={isActionLoading} onPress={() => handleSaveEdit(c._id)} className="bg-[#718355] text-white rounded-lg">
                                                    <Check size={14} className="mr-1" /> Save
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-gray-600 leading-relaxed wrap-break-words">
                                            {c.comment}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center text-gray-400 py-8 border-2 border-dashed border-[#CFE1B9] rounded-2xl">
                        No comments yet. Be the first to share your thoughts!
                    </div>
                )}
            </div>
        </div>
    );
}