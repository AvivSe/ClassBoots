var scraper = require("youtube-comment-scraper");
const youtubeRoot = 'https://www.youtube.com/watch?v=';
class YoutubeCommentScraper {

    static getCommentsAsync(ytID, next) {
        console.log("About to scarpe youtube comments for the following link: " + youtubeRoot + ytID);
        scraper.comments(youtubeRoot+ytID).then(function(result) {
            next(result);
            scraper.close();
        });
    }

    static test() {
        YoutubeCommentScraper.getCommentsAsync('OKvCV8MFIaw', function(result){
            result.comments.forEach(c=>{
                console.log(c);
            });
        });

    }
}
//YoutubeCommentScraper.test();
module.exports = YoutubeCommentScraper;