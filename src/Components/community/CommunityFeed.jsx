"use client";
import React, { useState } from "react";
import PostComposer from "./PostComposer";
import PostCard from "./PostCard";
import { Loader2, Users2 } from "lucide-react";
import toast from "react-hot-toast";


export default function CommunityFeed({ user, initialPosts = [] }) {
   
    const [posts, setPosts] = useState(initialPosts);
    const [isRefreshing, setIsRefreshing] = useState(false);

   
    const refreshFeed = async () => {
        try {
            setIsRefreshing(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/posts`);
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            } else {
                throw new Error("Failed to fetch feed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Could not refresh community posts.");
        } finally {
            setIsRefreshing(false);
        }
    };

  

    return (
        <div className="w-full bg-[#f2f9ea] min-h-screen pb-20">
           
            <header className="w-full bg-white border-b border-[#CFE1B9]/50 pt-10 pb-8 px-6 shadow-sm">
                <div className="max-w-3xl mx-auto flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#E9F5DB] text-[#718355] rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                        <Users2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">
                            Welcome to <span className="text-[#0c8a29] text-xl md:text-4xl italic">ArtHub</span> Community
                        </h1>
                        <p className="text-zinc-500 text-sm md:text-base leading-relaxed mt-1">
                            Connect, share studio updates, your thoughts and get feedback from the ArtHub family members. Engage in meaningful discussions and be part of our growing community.
                        </p>
                    </div>
                </div>
            </header>

            <main className="w-full max-w-3xl mx-auto px-4 md:px-0 mt-8 space-y-6">
                
         
                {user ? (
                    <PostComposer 
                        user={user} 
                        onPostCreated={refreshFeed} 
                    />
                ) : (
                    <div className="w-full bg-white/60 border border-[#CFE1B9] rounded-2xl p-6 text-center shadow-sm">
                        <p className="text-[#5A6B42] font-medium text-sm">Please log in to join the conversation.</p>
                    </div>
                )}

              
                <div className="pt-4">
                    <div className="flex justify-between items-center px-2 mb-4">
                        <h3 className="font-bold text-zinc-400 uppercase tracking-widest text-xs">
                            Latest Conversations
                        </h3>
                      
                        {isRefreshing && <Loader2 className="animate-spin text-[#718355] size-4" />}
                    </div>
                    
                    {posts.length === 0 ? (
                        <div className="text-center py-20 bg-white border border-[#CFE1B9]/40 rounded-3xl shadow-sm">
                            <p className="text-zinc-500 font-medium">Its quiet in here. Be the first to start a conversation!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {posts.map((post) => (
                                <PostCard 
                                    key={post._id} 
                                    post={post} 
                                    user={user} 
                                    onPostDeleted={refreshFeed} 
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}