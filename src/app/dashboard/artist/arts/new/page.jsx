import React from 'react';
import PostArtForm from './PostArtForm';

// LATER: Replace this with your actual DB fetch based on the logged-in user
const getMockArtist = async () => {
    return {
        _id: "artist_123",
        name: "Nafis Sahriar Redwan",
        status: "approved" ,// Try changing to "pending" to see the warning UI!
        email:"nafis.sahriar@university.com"

    };
};

const NewArtPage = async () => {
    const artist = await getMockArtist();

    return (
        <div className="w-full">
            {!artist && (
                <div className='p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-2xl mb-6 shadow-sm'>
                    <h2 className='text-lg font-semibold mb-2 text-yellow-900'>Artist Profile Required</h2>
                    <p className='text-sm text-yellow-700'>To post artworks, you need to set up your artist profile first.</p>
                    <a href="/dashboard/artist/profile" className='inline-block mt-4 px-5 py-2.5 bg-[#718355] text-white font-medium rounded-xl hover:bg-[#87986A] transition-colors'>
                        Go to Profile Settings
                    </a>
                </div>
            )}

            {artist && <PostArtForm artist={artist} />}
        </div>
    );
};

export default NewArtPage;