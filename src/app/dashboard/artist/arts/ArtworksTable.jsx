"use client";
import React from 'react';
import { Table, Chip, Button, Tooltip } from "@heroui/react";
import { Eye, Edit2, Image as ImageIcon } from "lucide-react"; 
import { useRouter } from "next/navigation";
import DeleteArtistArtworkModal from '../DeleteArtistArtworkModal';


const ArtworksTable = ({ artworks }) => {
    const router = useRouter();
    
    const handleView = (id) => {
        router.push(`/dashboard/artist/arts/${id}`);
    };

    const handleEdit = (id) => {
        router.push(`/dashboard/artist/arts/${id}/edit`);
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'available':
                return 'success';
            case 'sold':
                return 'secondary';
            default:
                return 'warning';
        }
    };

    return (
        <Table aria-label="Artist artworks management table" className="mt-4 shadow-sm border border-[#CFE1B9]/50 rounded-2xl">
            <Table.ResizableContainer>
                <Table.Content className="min-w-200">
                    <Table.Header>
                        <Table.Column isRowHeader defaultWidth="2.5fr" id="artwork" minWidth={250}>Artwork Details</Table.Column>
                        <Table.Column defaultWidth="1fr" id="category" minWidth={120}>Medium</Table.Column>
                        <Table.Column defaultWidth="1.2fr" id="details" minWidth={150}>Price & Size</Table.Column>
                        <Table.Column defaultWidth="1fr" id="status" minWidth={100}>Status</Table.Column>
                        <Table.Column defaultWidth="1fr" id="actions" minWidth={120}>Actions</Table.Column>
                    </Table.Header>

                    <Table.Body emptyContent={"No artworks found in your portfolio."}>
                        {artworks.map((art) => (
                            <Table.Row key={art._id}>
                                
                                <Table.Cell>
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border border-[#CFE1B9]">
                                            {art.imageUrl ? (
                                                <img src={art.imageUrl} alt={art.title} className="h-full w-full object-cover" />
                                            ) : (
                                                <ImageIcon className="text-[#97A97C] size-5" />
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-gray-800 line-clamp-1">{art.title}</span>
                                            <span className="text-xs text-gray-500 line-clamp-1">{art.description}</span>
                                        </div>
                                    </div>
                                </Table.Cell>

                                <Table.Cell>
                                    <span className="text-sm font-medium text-gray-700 capitalize">{art.category}</span>
                                </Table.Cell>

                                <Table.Cell>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-sm font-bold text-[#718355]">${art.price}</span>
                                        <span className="text-xs text-gray-400">{art.dimensions}</span>
                                    </div>
                                </Table.Cell>

                                <Table.Cell>
                                    <Chip color={getStatusColor(art.status)} size="sm" variant="flat" className="capitalize font-medium">
                                        {art.status || "Unknown"}
                                    </Chip>
                                </Table.Cell>

                                <Table.Cell>
                                    <div className="relative flex items-center gap-2">
                                        <Tooltip content="View Artwork">
                                            <Button isIconOnly size="sm" variant="light" aria-label="View artwork details" onClick={() => handleView(art._id)}>
                                                <Eye className="text-gray-500 w-4 h-4 hover:text-[#718355] transition-colors" />
                                            </Button>
                                        </Tooltip>

                                        <Tooltip content={art.status === 'sold' ? "Cannot edit sold artwork" : "Edit Artwork"}>
                                            <Button isIconOnly size="sm" variant="light" aria-label="Edit artwork" isDisabled={art.status === 'sold'} onClick={() => handleEdit(art._id)}>
                                                <Edit2 className={`${art.status === 'sold' ? 'text-gray-300' : 'text-gray-500 hover:text-[#718355]'} w-4 h-4 transition-colors`} />
                                            </Button>
                                        </Tooltip>

                                        {/* NEW: Replaced standard button with the Icon Modal */}
                                        <Tooltip content={art.status === 'sold' ? "Cannot delete sold artwork" : "Delete Artwork"} color={art.status === 'sold' ? "default" : "danger"}>
                                            <div className="inline-block">
                                                <DeleteArtistArtworkModal artwork={art} isIconOnly={true} />
                                            </div>
                                        </Tooltip>
                                    </div>
                                </Table.Cell>

                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Content>
            </Table.ResizableContainer>
        </Table>
    );
};

export default ArtworksTable;