var scraper = require("youtube-comment-scraper");
const youtubeRoot = 'https://www.youtube.com/watch?v=';
class YoutubeCommentScraper {

    static getCommentsAsync(ytID, next) {
        console.log("About to scarpe youtube comments for the following link: " + youtubeRoot + ytID);
        scraper.comments(youtubeRoot+ytID).then(function(result) {
            result.comments.forEach(comment=> {
                next({ author: comment.author, content: comment.root });
            });
            scraper.close();
        });
    }

    static test() {
        YoutubeCommentScraper.getCommentsAsync('d5jSa3SA0Qo', function(result){
            result.comments.forEach(c=>{
                console.log(c);
            });
        });

    }
}

module.exports = YoutubeCommentScraper;