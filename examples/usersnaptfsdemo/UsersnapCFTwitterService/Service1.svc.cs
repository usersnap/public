using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace UsersnapCFTwitterService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class Service1 : IService1
    {
        public UsersnapResponse GetUsersnapTweets(UsersnapRequest req)
        {
            //%23pope
            TweetStreamer streamer = TweetStreamer.getInstance("?q=usersnap&rpp=10&include_entities=true&with_twitter_user_id=true&result_type=recent", 100);
            //TweetStreamer streamer = TweetStreamer.getInstance("?q=\"Pope+Benedict+XVI\"&rpp=10&include_entities=true&with_twitter_user_id=true&result_type=recent", 100);
            List<Tweet> list = streamer.getTweets(req.FromIdx);
            UsersnapResponse res = new UsersnapResponse();
            res.LastIdx = streamer.getLastIdx();
            res.Tweets = list;
            return res;
        }
    }
}
