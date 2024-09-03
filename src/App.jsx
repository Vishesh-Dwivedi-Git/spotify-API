import React, { useEffect, useState } from 'react';
import SpotifyAuth from './SpotifyAuth';

const App = () => {
  const [token, setToken] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get('access_token');
      console.log("Extracted Token:", token); // Log extracted token
      if (token) {
        window.localStorage.setItem('spotifyAuthToken', token);
        setToken(token);
        window.location.hash = ''; // Clear hash
      }
    } else {
      const storedToken = window.localStorage.getItem('spotifyAuthToken');
      console.log("Stored Token:", storedToken); // Log stored token
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      console.log("Using Token:", token); // Log token before making request
      setLoading(true); // Start loading
      fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          console.log("Fetch Response:", response); // Log the entire response
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log("Playlist Data:", data); // Log the playlist data
          setPlaylists(data.items);
          setLoading(false); // End loading
        })
        .catch(error => {
          console.error('Fetch error:', error);
          setError('Failed to fetch playlists');
          setLoading(false); // End loading
        });
    }
  }, [token]);

  return (
    <div>
      {!token ? (
        <SpotifyAuth />
      ) : (
        <div className='bg-slate-800 min-h-screen p-4'>
          <div className='text-xl text-slate-300'>
            <h1>Your Playlists</h1>
          </div>
          {loading ? (
            <p className="text-slate-300">Loading playlists...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul className='space-y-2'>
              {playlists.map(playlist => (
                <li key={playlist.id} className='flex items-center space-x-4'>
                  {playlist.images[0] && (
                    <img
                      src={playlist.images[0].url}
                      alt={playlist.name}
                      width={50}
                      className='rounded'
                    />
                  )}
                  <span className='text-slate-300'>{playlist.name}</span>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => {
              window.localStorage.removeItem('spotifyAuthToken');
              setToken('');
            }}
            className='mt-4 text-slate-300 hover:text-white transition-colors'
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
