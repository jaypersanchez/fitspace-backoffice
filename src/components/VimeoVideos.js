// src/VimeoVideos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VimeoVideos = () => {
    const [videos, setVideos] = useState([]);
    const accessToken = '673a2849983afb87b6824ed4a26789ae'; // Replace with your Vimeo access token

    useEffect(() => {
        axios.get('https://api.vimeo.com/me/videos', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => {
            console.log(`Videos: ${response.data.data}`)
            setVideos(response.data.data);
        })
        .catch(
            error => console.error('Error fetching videos:', error)
        );
    }, []);

    return (
        <div>
            {videos.map(video => (
                <div key={video.uri}>
                    <h3>{video.name} {video.uri} </h3>
                    <iframe 
                        title={`Vimeo Video Player: ${video.name}`}
                        src={`https://player.vimeo.com/video/${video.uri.split('/').pop()}`} 
                        width="640" 
                        height="360" 
                        frameborder="0" 
                        allow="autoplay; fullscreen" 
                        allowfullscreen
                    ></iframe>
                </div>
            ))}
        </div>
    );
};

export default VimeoVideos;
