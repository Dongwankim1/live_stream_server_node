import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './LiveStreams.scss';
const LiveStreams = () =>{

    const [liveStreams,setLiveStreams] = useState([]);

    const getLiveStream = () =>{
        axios.get("http://localhost:8888/api/streams").then(res=>{
            let streams = res.data;
            if(typeof (streams['live']!=='undefined')){
                getStreamsInfo(streams['live']);
            }
        })

    }

    const getStreamsInfo = (live_streams) =>{
        axios.get('http://localhost:3333/streams/info',{
            params:{
                streams:live_streams
            }
        }).then(res =>{
            setLiveStreams(
                res.data
            )
        })
    }

    useEffect(() => {
        getLiveStream();
    }, [])


    {let streams = liveStreams.map((stream,index)=>{
            return(
                <div className="stream col-xs-12 col-sm-12 col-md-3 col-lg-4" key={index}>
                    <span className="live-label">LIVE</span>
                    <Link to={'/stream/' + stream.username}>
                        <div className="stream-thumbnail">
                            <img src={'http://localhost/thumbnails/' + stream.stream_key + '.png'}/>
                        </div>
                    </Link>
 
                    <span className="username">
                        <Link to={'/stream/' + stream.username}>
                            {stream.username}
                        </Link>
                    </span>
                </div>
            )
        })
        console.log(streams);
            return (  <div className="container mt-5">
            <h4>Live Streams</h4>
            <hr className="my-4"/>
    
            <div className="streams row">
                {streams}
            </div>
        </div>)
    }
       
    
}

export default LiveStreams;