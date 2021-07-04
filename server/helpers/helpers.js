const spawn = require('child_process').spawn,
    config = require('../config/default'),
    cmd = config.rtmp_server.trans.ffmpeg;

const generateStreamThumbnail = (stream_key) => {
    console.log('kkkkkkkk',stream_key)
    const args = [
        '-y',
        '-i', 'http://localhost:8888/live/'+stream_key+'/index.m3u8',
        '-ss', '00:00:01',
        '-vframes', '1',
        '-vf', 'scale=-2:300',
        'server/thumbnails/'+stream_key+'.png',
    ];
    console.log('kkkkkasdkkk',stream_key)
    spawn(cmd, args, {
        detached: true,
        stdio: 'ignore'
    }).unref();
    console.log('kkkasfasfkkasdkkk',stream_key)
};

module.exports = {
    generateStreamThumbnail : generateStreamThumbnail
};