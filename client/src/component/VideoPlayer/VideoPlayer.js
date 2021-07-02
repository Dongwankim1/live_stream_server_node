import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';


const VideoPlayer = () =>{

    const [stream,setStream] = useState(false);
    const [videoJsOptions,setVideoJsOptions] = useState(null);

    useEffect(()=>{
        
    })

    return (<div>
        videoplayer
    </div>)
}

export default VideoPlayer;