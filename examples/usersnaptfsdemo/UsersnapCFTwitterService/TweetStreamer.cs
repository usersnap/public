using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace UsersnapCFTwitterService
{
    public class TweetStreamer
    {
        private static TweetStreamer instance = null;

        private string queryStr;
        private int cacheSize;
        List<Tweet> tweets;

        private TweetStreamer(string query, int cs)
        {
            queryStr = query;
            cacheSize = cs;
            tweets = new List<Tweet>();
        }

        public static TweetStreamer getInstance(string baseQuery, int cacheSize)
        {
            if (TweetStreamer.instance == null)
            {
                TweetStreamer.instance = new TweetStreamer("http://search.twitter.com/search.atom" + baseQuery, cacheSize);
            }
            return TweetStreamer.instance;
        }

        public List<Tweet> getTweets(int fromIdx)
        {
            this.doRefresh();
            if (this.tweets.Count > this.cacheSize)
            {
                fromIdx -= (this.tweets.Count - this.cacheSize);
                this.tweets.RemoveRange(0, this.tweets.Count - this.cacheSize);
            }
            if (fromIdx < 0)
            {
                fromIdx = 0;
            }
            return this.tweets.GetRange(fromIdx, this.getLastIdx()-fromIdx);
        }

        public int getLastIdx()
        {
            return this.tweets.Count;
        }

        private void doRefresh()
        {
            XDocument feed = XDocument.Load(queryStr);
            XNamespace atomNS = "http://www.w3.org/2005/Atom";

            List<Tweet> tmp = (from tweet in feed.Descendants(atomNS + "entry")
                               select new Tweet
                               {
                                   Text = (string)tweet.Element(atomNS + "title"),
                                   Published = DateTime.Parse((string)tweet.Element(atomNS + "published")),
                                   Id = (string)tweet.Element(atomNS + "id"),

                                   Author = (from author in tweet.Descendants(atomNS + "author")

                                      select new TweetAuthor

                                      {

                                          Name = (string)author.Element(atomNS + "name"),

                                          Uri = (string)author.Element(atomNS + "uri"),

                                      }).First(),
                               }).ToList<Tweet>();
            if (tmp.Count > 0) {
                queryStr = feed.Descendants(atomNS + "link").Where(link => link.Attribute("rel").Value == "refresh").Select(link => link.Attribute("href").Value).First();
            }
            tmp.Reverse();
            this.tweets.AddRange(tmp);
        }

        
    }
}