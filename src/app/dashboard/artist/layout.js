import { requireRole } from '@/lib/core/session';
import React from 'react';

const ArtistLayout = async  ({children}) => {


    await requireRole('artist');
    return (
        <div>
            {children}
        </div>
    );
};

export default ArtistLayout;