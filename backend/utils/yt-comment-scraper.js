var scraper = require("youtube-comment-scraper");
var path = 'https://www.youtube.com/watch?v=OKvCV8MFIaw';

scraper.comments(path).then(function(result) {
    console.log(JSON.stringify({
        url: path,
        comments: result
    }));
    scraper.close();
});
