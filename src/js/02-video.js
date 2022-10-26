import vimeoPlayer from "@vimeo/player";
import throttle from "lodash.throttle";

const STORAGE_KEY = "videoplayer-current-time";

const iframe = document.querySelector('iframe');
const player = new vimeoPlayer(iframe);

const onTimeRecord = function (data) {    
    const recordTime = data.seconds;
    localStorage.setItem(STORAGE_KEY, recordTime)
};

player.on('timeupdate', throttle(onTimeRecord, 1000));

checkStorageData();

function checkStorageData() {
    const lastPlayTimeRecord = localStorage.getItem(STORAGE_KEY);    

    if (lastPlayTimeRecord) {

    player.setCurrentTime(lastPlayTimeRecord).then(function(seconds) {
        // seconds = the actual time that the player seeked to
    }).catch(function(error) {
        switch (error.name) {
            case 'RangeError':
                // the time was less than 0 or greater than the video’s duration
                break;

            default:
                // some other error occurred
                break;
        }
    });
};  
};



// ===============================================================

// function checkStorageData() {
//     const lastPlayTimeRecord = localStorage.getItem(STORAGE_KEY);    

//     if (lastPlayTimeRecord) {
//         setRestoreTime(lastPlayTimeRecord);
//     };   
// };

// function setRestoreTime(lastPlayTimeRecord) {
//     player.setCurrentTime(ch).then(function(seconds) {
//     // seconds = the actual time that the player seeked to
// }).catch(function(error) {
//     switch (error.name) {
//         case 'RangeError':
//             // the time was less than 0 or greater than the video’s duration
//             break;

//         default:
//             // some other error occurred
//             break;
//     }
// });
// };