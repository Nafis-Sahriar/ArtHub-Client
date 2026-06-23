"use client";
import React, { useState } from "react";
import { Button, Modal } from "@heroui/react";
import { AlertTriangle, Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteArtwork } from "@/lib/actions/artworks";
import toast from "react-hot-toast";

export default function DeleteArtistArtworkModal({ artwork, isIconOnly = false, redirectOnSuccess = null }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true);
        const loadingToast = toast.loading("Deleting artwork...");
        
        try {
            const artworkId = artwork._id || artwork.id;
            await deleteArtwork(artworkId); 
            
            toast.success("Artwork deleted successfully", { id: loadingToast });

          
            if (redirectOnSuccess) {
                router.push(redirectOnSuccess);
            } else {
                router.refresh(); 
            }
            
        } catch (error) {
            console.error("Error deleting artwork:", error);
            toast.error("Failed to delete artwork", { id: loadingToast });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Modal>
           
            {isIconOnly ? (
                <Button 
                    isIconOnly 
                    size="sm" 
                    variant="light" 
                    aria-label="Delete artwork"
                    isDisabled={artwork.status === 'sold'}
                >
                    <Trash2 className={`${artwork.status === 'sold' ? 'text-gray-300' : 'text-red-400 hover:text-red-600'} w-4 h-4 transition-colors`} />
                </Button>
            ) : (
                <Button 
                    isDisabled={artwork.status === 'sold'}
                    className="bg-red-50 text-red-600 hover:bg-red-100 font-semibold rounded-xl transition-colors"
                >
                    <Trash2 size={16} /> Delete Artwork
                </Button>
            )}
            
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-100">
                        <Modal.CloseTrigger />
                        
                        <Modal.Header>
                            <Modal.Icon className="bg-red-100 text-red-600">
                                <AlertTriangle className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Delete Artwork?</Modal.Heading>
                        </Modal.Header>
                        
                        <Modal.Body>
                            <p className="text-zinc-600 text-sm">
                                Are you sure you want to permanently delete <strong>{artwork.title}</strong>? This action cannot be undone and will remove it from your portfolio entirely.
                            </p>
                        </Modal.Body>
                        
                        <Modal.Footer className="flex gap-3">
                            <Button className="w-full bg-gray-100 text-gray-700 font-semibold" slot="close" isDisabled={isDeleting}>
                                Cancel
                            </Button>
                            
                            <Button 
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold" 
                                onPress={handleDelete}
                                isDisabled={isDeleting}
                            >
                                {isDeleting ? <Loader2 className="animate-spin size-5 mx-auto" /> : "Yes, Delete"}
                            </Button>
                        </Modal.Footer>
                        
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}