"use client";
import React, { useState } from "react";
import { Button, Modal } from "@heroui/react";
import { AlertTriangle, Trash2, Loader2 } from "lucide-react";
import { serverMutation } from "@/lib/core/server";

export default function DeleteArtworkModal({ artwork, onDeleteSuccess }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const artworkId = artwork._id || artwork.id;
           
            const result = await serverMutation(`/api/artworks/${artworkId}`, null, 'DELETE');
            
            if (result.success) {
                onDeleteSuccess(artworkId); 
            } else {
                alert("Failed to delete artwork: " + result.message);
            }
        } catch (error) {
            console.error("Error deleting artwork:", error);
            alert("An error occurred while trying to delete the artwork.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Modal>
       
            <Button size="sm" className="bg-red-50 text-red-600 hover:bg-red-100 font-semibold rounded-xl px-3 min-w-0">
                <Trash2 size={16} />
            </Button>
            
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[400px]">
                        <Modal.CloseTrigger />
                        
                        <Modal.Header>
                            <Modal.Icon className="bg-red-100 text-red-600">
                                <AlertTriangle className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Delete Artwork?</Modal.Heading>
                        </Modal.Header>
                        
                        <Modal.Body>
                            <p className="text-zinc-600 text-sm">
                                Are you sure you want to permanently delete <strong>{artwork.title}</strong>? This action cannot be undone and will remove it from the platform entirely.
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