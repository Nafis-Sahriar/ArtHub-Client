"use client";
import React, { useState, useRef } from "react";
import { Button } from "@heroui/react"; 
import { ImagePlus, Send, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function PostComposer({ user, onPostCreated, token }) {
    const [content, setContent] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isPosting, setIsPosting] = useState(false);
    
    
    const fileInputRef = useRef(null);

    
    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { 
                toast.error("Image size must be less than 5MB");
                return;
            }
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

  
    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim() && !imageFile) return;

        setIsPosting(true);
        const loadingToast = toast.loading("Publishing to the lounge...");

        try {
            let uploadedImageUrl = null;

       
            if (imageFile) {
                const imgFormData = new FormData();
                imgFormData.append("image", imageFile);
                
                const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`, {
                    method: "POST",
                    body: imgFormData,
                });
                
                const imgbbData = await imgbbRes.json();
                if (imgbbData.success) {
                    uploadedImageUrl = imgbbData.data.display_url;
                } else {
                    throw new Error("Failed to upload image to the cloud.");
                }
            }

            
            const postPayload = {
                userId: user.id || user._id,
                userName: user.name,
                userRole: user.role,
                userAvatar: user.image || "", 
                content: content.trim(),
                imageUrl: uploadedImageUrl,
            };

          
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/community/posts`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify(postPayload),
            });

            const result = await res.json();
            
            if (res.ok && result.success) {
                toast.success("Posted successfully!");
                // Reset Form
                setContent("");
                removeImage();
                
                if (onPostCreated) onPostCreated(); 
            } else {
                throw new Error(result.message || "Failed to create post.");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Something went wrong.");
        } finally {
            toast.dismiss(loadingToast);
            setIsPosting(false);
        }
    };

    if (!user) return null; 

    return (
        <div className="w-full bg-white border border-[#CFE1B9]/60 rounded-3xl p-5 md:p-6 shadow-sm relative overflow-hidden transition-all">
            <form onSubmit={handleSubmit} className="flex gap-4 items-start">
                
            
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
                
                <div className="flex-1 space-y-3">
                 
                    <textarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={user.role === 'artist' ? "Showcase your latest studio progress..." : "Start a discussion with the community..."}
                        className="w-full bg-[#F4F7F0] border border-[#CFE1B9] text-zinc-800 placeholder-[#97A97C] rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-[#718355] transition-all resize-none h-28"
                    />
                    
              
                    {imagePreview && (
                        <div className="relative inline-block mt-2">
                            <img 
                                src={imagePreview} 
                                alt="Upload preview" 
                                className="max-h-64 rounded-xl border border-[#CFE1B9]/50 object-cover"
                            />
                            <button 
                                type="button"
                                onClick={removeImage}
                                className="absolute -top-2 -right-2 bg-white text-rose-500 rounded-full p-1 shadow-md border border-zinc-200 hover:scale-110 transition-transform"
                            >
                                <X size={16} strokeWidth={3} />
                            </button>
                        </div>
                    )}
                    
                  
                    <div className="flex items-center justify-between pt-3 border-t border-[#CFE1B9]/30">
                        
                        
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            ref={fileInputRef}
                            onChange={handleImageSelect}
                        />
                        <button 
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 text-xs font-semibold text-[#718355] hover:bg-[#E9F5DB] px-3 py-2 rounded-xl transition-colors disabled:opacity-50"
                            disabled={isPosting}
                        >
                            <ImagePlus size={18} />
                            <span className="hidden sm:inline">Attach Image</span>
                        </button>

                    
                        <Button 
                            type="submit"
                            isDisabled={isPosting || (!content.trim() && !imageFile)}
                            className="bg-[#718355] text-white font-bold rounded-xl px-6 hover:bg-[#5A6B42] shadow-md shadow-[#718355]/20"
                        >
                            {isPosting ? <Loader2 className="animate-spin size-5" /> : "Post"} 
                            {!isPosting && <Send size={16} className="ml-1" />}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}