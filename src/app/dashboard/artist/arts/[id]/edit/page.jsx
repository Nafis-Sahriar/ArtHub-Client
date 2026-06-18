import React from 'react';
import { getArtworkById } from '@/lib/api/artworks';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import PostArtForm from '../../new/PostArtForm'; 

const EditArtworkPage = async ({ params }) => {
  
    const { id } = await params;
    
  
    const user = await getUserSession();
    if (!user || user.role !== 'artist') {
        redirect('/login');
    }

   
    const artwork = await getArtworkById(id);

    
    if (!artwork || artwork.artistId !== user.id) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-2xl font-bold text-red-600">Unauthorized or Not Found</h2>
            </div>
        );
    }

    return (
        <div className="w-full">
            <PostArtForm artist={user} initialData={artwork} />
        </div>
    );
};

export default EditArtworkPage;