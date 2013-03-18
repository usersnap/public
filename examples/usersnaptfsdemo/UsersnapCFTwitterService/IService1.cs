using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace UsersnapCFTwitterService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract]
    public interface IService1
    {

        [WebInvoke(UriTemplate = "/GetUsersnapTweets",Method="POST", RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        UsersnapResponse GetUsersnapTweets(UsersnapRequest req);

        // TODO: Add your service operations here
    }

    [DataContract]
    public class UsersnapRequest
    {
        int fromIdx;

        [DataMember]
        public int FromIdx
        {
            get { return fromIdx; }
            set { fromIdx = value; }
        }
    }

    [DataContract]
    public class UsersnapResponse
    {
        int lastIdx;
        List<Tweet> tweets;

        [DataMember]
        public int LastIdx
        {
            get { return lastIdx; }
            set { lastIdx = value; }
        }

        [DataMember]
        public List<Tweet> Tweets
        {
            get { return tweets; }
            set { tweets = value; }
        }
    }


    // Use a data contract as illustrated in the sample below to add composite types to service operations.
    [DataContract]
    public class Tweet
    {
        string id;
        string text;
        DateTime published;
        TweetAuthor author;

        [DataMember]
        public string Id
        {
            get { return id; }
            set { id = value; }
        }

        [DataMember]
        public string Text
        {
            get { return text; }
            set { text = value; }
        }

        [DataMember]
        public DateTime Published
        {
            get { return published; }
            set { published = value; }
        }

        [DataMember]
        public TweetAuthor Author
        {
            get { return author; }
            set { author = value; }
        }
    }

    [DataContract]
    public class TweetAuthor
    {
        string name = "";
        string uri = "";

        [DataMember]
        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        [DataMember]
        public string Uri
        {
            get { return uri; }
            set { uri = value; }
        }
    }
}
