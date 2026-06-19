import { requireRole } from '@/lib/core/session';
import React from 'react';

const BuyerLayout = async ({children}) => {


    await requireRole('buyer');


    return (
        <div>
            {children}
        </div>
    );
};

export default BuyerLayout;