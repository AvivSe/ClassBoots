const Video = require('../models/video');
const History = require('../models/history');
const Apriori = require('apriori');

class MyApriori {

    static async learnNow() {
        let transactions = [];
        let history = await History.find();

        await history.forEach(async history => {
            let row = [];
            await history.watches.forEach(watch=> {
                row.push(watch.video.toString());
            });
            transactions.push(row)
        });

        console.log(transactions);
        return new Apriori.Algorithm(0.4,0.7,false).analyze(transactions);
    }

    static async getRelatedVideos(videoId) {
        let videoIds = [];
        const relevant = ((await this.learnNow()).associationRules.filter(item => item.rhs == videoId));

        await relevant.forEach(item => {
            videoIds = [...videoIds,...item.lhs];
        });

        return await Video.find({_id: {$in: videoIds}});
    }

}

module.exports = MyApriori;