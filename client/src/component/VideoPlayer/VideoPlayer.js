import axios from 'axios';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import videojs from 'video.js'

const VideoPlayer = ({match}) =>{

    const [stream,setStream] = useState({stream:false,
    videoJsOptions:null});
    const [videoNode,setVideoNode] = useState('');
    const playerRef = useRef();

    useEffect(()=>{
       
        axios.get('/user',{
            params:{
                username:match.params.username
            }
        }).then((res)=>{
         
            if(!stream.stream){;
            setStream({
                stream:true,
                videoJsOptions:{
                    autoplay:false,
                    controls:true,
                    sources:[{
                        src:`http://127.0.0.1:8888/live/${res.data.stream_key}/index.m3u8`,
                        type:'application/x-mpegURL'
                    }],
                    fluid:true,
                }
            }
            )
            }
           
                
             const player = videojs(playerRef.current,stream.videoJsOptions,function onPlayerReady(){
                    console.log('onPlyaerReady',this)
            })
            return ()=>{
                player.dispose();
            }
           
        },[stream.stream])
        
        console.log(match.params.username)
    })

    return ( <div className="row">
     <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto mt-5">
                    {stream.stream ? (
                        <div data-vjs-player>
                            <video ref={playerRef} className="video-js vjs-big-play-centered"/>
                        </div>
                    ) : ' Loading ... '}
                </div>
</div>)
}

export default VideoPlayer;