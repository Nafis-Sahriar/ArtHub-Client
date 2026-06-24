import React from "react";
import { Modal, Button } from "@heroui/react";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";

export default function DeleteConfirmModal({ onConfirm, isDeleting }) {
    return (
        <Modal>
            
            <Button
                isIconOnly
                size="sm"
                variant="light"
                className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                isDisabled={isDeleting}
            >
                {isDeleting ? <Loader2 className="animate-spin size-4" /> : <Trash2 size={18} />}
            </Button>

         
            <Modal.Backdrop className="bg-zinc-900/20 backdrop-blur-sm">
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[380px] rounded-3xl overflow-hidden shadow-xl border border-zinc-100">
                        <Modal.CloseTrigger />
                        
                        <Modal.Header>
                            <Modal.Icon className="bg-red-50 text-red-500 border border-red-100">
                                <AlertTriangle className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading className="text-zinc-900 font-black tracking-tight">
                                Delete Post?
                            </Modal.Heading>
                        </Modal.Header>
                        
                        <Modal.Body>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                Are you sure you want to permanently remove this conversation? This action cannot be undone, and all associated comments will also be wiped.
                            </p>
                        </Modal.Body>
                        
                        <Modal.Footer className="flex gap-3 pt-2">
                          
                            <Button 
                                slot="close" 
                                variant="flat" 
                                className="bg-zinc-100 text-zinc-700 hover:bg-zinc-200 font-bold rounded-xl flex-1"
                            >
                                Cancel
                            </Button>
                            
                            <Button 
                                slot="close" 
                                onPress={onConfirm}
                                className="bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-md shadow-red-500/20 flex-1"
                            >
                                Delete 
                            </Button>
                        </Modal.Footer>
                        
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}