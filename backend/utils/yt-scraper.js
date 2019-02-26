var scraper = require("youtube-comment-scraper");
const ytlist = require('youtube-playlist');

const youtubePlaylistRoot = 'https://www.youtube.com/playlist?list=';
const youtubeVideoRoot = 'https://www.youtube.com/watch?v=';
class YoutubeScraper {

    static getCommentsAsync(ytID, next) {
        console.log("About to scarpe youtube comments for the following link: " + youtubeVideoRoot + ytID);
        scraper.comments(youtubeVideoRoot+ytID).then(function(result) {
            result.comments.forEach(comment=> {
                next({ author: comment.author, content: comment.root });
            });
            scraper.close();
        });
    }

    static getPlaylistAsync(playlistID, next) {

        ytlist(youtubePlaylistRoot + playlistID, ['name','id']).then(res => {
            next(res.data.playlist);
        });
    }

    static test() {
        YoutubeScraper.getPlaylistAsync('PLh0oCh0ni1VPNyAyKw6yN8ws8sE74tvu_', (data)=>console.log(data));
    }
}


module.exports = YoutubeScraper;