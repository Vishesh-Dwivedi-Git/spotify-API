import React from 'react';

const SpotifyAuth = () => {
    const redirectToSpotify = () => {
        const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
        const scopes = 'user-read-private user-read-email playlist-read-private';

        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
        console.log('Auth URL:', authUrl); // debug line
        window.location.href = authUrl;
    };

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Layer */}
            <div className="absolute inset-0 bg-[url('istockphoto-851414042-612x612.jpg')] bg-cover bg-center blur-[8px]"></div>

            {/* Content Layer */}
            <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center p-6 rounded-lg shadow-lg">
                    <h1 className="text-xl text-zinc-100 font-semibold mb-5">Please login to get your Playlist</h1>
                    <button 
                        onClick={redirectToSpotify} 
                        className=" text-zinc-100 rounded-lg p-5 font-mono  hover:bg-slate-800  transition-all">
                        Login with Spotify
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpotifyAuth;
