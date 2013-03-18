var _currTweets = 0;
function _callback(data) {
    //console.log(data.LastIdx);
    //console.log(data.Tweets.length);
    _currTweets = data.LastIdx;
    var out = '';
    var re = /-?\d+/;
    var m, d;
    jQuery('#loading').remove();
    for (var i = 0; i < data.Tweets.length; i++) {
        m = re.exec(data.Tweets[i].Published);
        d = new Date(parseInt(m[0]));
        out = '<div class="tweet hide table table-bordered"><div class="time">' + d.toLocaleString() + '</div><div class="content"><span><a href="' + data.Tweets[i].Author.Uri + '">' + data.Tweets[i].Author.Name + '</a>:</span><br/>' +
               data.Tweets[i].Text + '</div></div>';
        elm = jQuery(out);
        jQuery('#tweetcontainer').prepend(elm);
        //elm.show();
        elm.fadeIn('slow');
        if (i == 10) {
            break;
        }
    }
    window.setTimeout(_getTweets, 5000);
}
function _getTweets() {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: '/Service1.svc/GetUsersnapTweets',
        dataType: 'json',
        data: JSON.stringify({
            FromIdx: _currTweets
        }),
        success: _callback,
        error: _callback
    });
}
jQuery(function () {
    _getTweets();

    /*jQuery('#tweetform').submit(function () {
        window.open('https://twitter.com/intent/tweet?text=' +escape(this.tweet.value), 'tweetit', 'width=550,height=420');
        return false;
    });*/
    jQuery('#tweetit').click(function () {
        var txt = 'I\'ve tried the #usersnap #tfs example page at http://usersnaptfsdemo.cloudapp.net via @usersnap';
        window.open('https://twitter.com/intent/tweet?text=' + escape(txt), 'tweetit', 'width=550,height=420');
    });
});