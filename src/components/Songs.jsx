import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


const Songs = ({token}) => {
    const [songs, setSongs] = useState([])

    useEffect(() => {
        fetchSongs();
    }, []);

    const { id } = useParams();
    const fetchSongs = async () => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/musicx/song/${id}`, {
                headers: {
                    'accept': 'application/json',
                    'projectID': 'jscjwatei3cb',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setSongs(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#262628] to-[#1a1a1c] text-white pt-[70px] px-4">
        {songs.length === 0 ? (
            <div className="flex justify-center items-center h-[80vh]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
            </div>
        ) : (
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 py-12">
            <div className="w-full md:w-[400px] aspect-square">
                <div className="relative group">
                <img 
                    src={songs.data.thumbnail} 
                    alt={songs.data.title} 
                    className="w-full h-full object-cover rounded-lg shadow-2xl transform transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                </div>
            </div>

            <div className="flex-1 w-full flex flex-col items-center md:items-start">
                <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-medium">
                    <i className="fa-solid fa-star mr-2"></i>
                    {songs.data.featured}
                </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center md:text-left">
                {songs.data.title}
                </h1>

                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                {songs.data.artist.map((artist, index) => (
                    <span 
                    key={index}
                    className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                    {artist.name}
                    {index !== songs.data.artist.length - 1 && ','}
                    </span>
                ))}
                </div>

                <div className="w-full max-w-xl bg-black/30 p-4 rounded-xl backdrop-blur-sm">
                <audio 
                    src={songs.data.audio_url} 
                    controls 
                    className="w-full h-12 [&::-webkit-media-controls-panel]:bg-[#2a2a2c] [&::-webkit-media-controls-current-time-display]:text-white [&::-webkit-media-controls-time-remaining-display]:text-white"
                ></audio>
                </div>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-xl">
                <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                    <span className="block text-gray-400 text-sm">Duration</span>
                    <span className="text-lg font-semibold">3:45</span>
                </div>
                <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                    <span className="block text-gray-400 text-sm">Genre</span>
                    <span className="text-lg font-semibold">Pop</span>
                </div>
                <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                    <span className="block text-gray-400 text-sm">Released</span>
                    <span className="text-lg font-semibold">2024</span>
                </div>
                </div>
            </div>
            </div>
        )}
    </div>
    )
}

export default Songs;
