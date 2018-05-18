/* Source: http://yvoschaap.com */
/* Build first in '06 */
/* 1/4/2015: upgraded to YouTube API v3 */
/* 6/5/2015: added back views and duration  */
/* 9/9/2015: Modifed by Wes Bos → Changed youtube links to redhat links */
/* 4/6/2016: Modified by Jason Porter - commented out the function binding, it doesn't appear needed and breaks Drupal quickedit */

//Function.prototype.bind = function(obj, args) {
//    var method = this,
//        temp = function() {
//            return method.call(obj, args);
//        };
//
//    return temp;
//};

var ytEmbed = {

    ytQuery: 0,
    cl: 0,
    callback: {},
    cfg: {},
    player: false,

    /**
     * Main Init Method
     */
    init: function(cfg) {

        this.cfg = cfg || {};

        // temp hardcode our own key if not provided
        if (!this.cfg.key) {
                this.cfg.key = 'AIzaSyA8OmKcw2DMNkJicyCJ0vqvf90xgeH52zE';
        }

        if (!this.cfg.block) {
            this.message('Please set the block element in the config file.');
        } else {
            if (!this.cfg.type) {
                this.message('You must provide a type: search, user, playlist, featured in the insertVideos function.');
            } else if (!this.cfg.q && !this.cfg.id) {
                this.message('You must provide a query: search keywords, playlist ID, or username.');
            } else if (!this.cfg.key) {
                this.message('New: You must provide a Google Developer API key: <strong><a href="https://developers.google.com/youtube/registering_an_application">get key</a></strong>.');
            } else {
                //this.message('Loading YouTube videos. Please wait...');

                //create a javascript element that returns our JSONp data.
                var script = document.createElement('script');
                script.setAttribute('type', 'text/javascript');

                //a counter
                this.ytQuery++;

                //settings

                if (!this.cfg.paging) {
                    this.cfg.paging = true;
                }
                if (!this.cfg.results) {
                    this.cfg.results = 10;
                }
                if (!this.cfg.meta) {
                    this.cfg.meta = false;
                }

                if (!this.cfg.order) {
                    //deprecated in v3
                    this.cfg.orderby = 'relevance';
                    this.cfg.sortorder = 'descending';
                }
                if (!this.cfg.thumbnail) {
                    this.cfg.thumbnail = 200;
                }
                if (!this.cfg.height) {
                    this.cfg.height = 390;
                }
                if (!this.cfg.width) {
                    this.cfg.width = 640;
                }


                switch (this.cfg.order) {
                    case "new_first":
                        this.cfg.orderby = 'date';
                        //this.cfg.sortorder = 'ascending';
                        break;

                    case "highest_rating":
                        this.cfg.orderby = 'rating';
                        //this.cfg.sortorder = 'descending';
                        break;

                    case "most_relevance":
                        this.cfg.orderby = 'relevance';
                        //this.cfg.sortorder = 'descending';
                        break;
                }
                var url = "https://www.googleapis.com";

                //what data do we need: a search, a user search, a playlist
                switch (this.cfg.type) {
                    case "search":
                        url += '/youtube/v3/search?q=' + this.cfg.q + '&type=video&callback=ytEmbed.callback[' + this.ytQuery + ']&order=' + this.cfg.orderby;
                        break;

                    case "user":
                        url += '/youtube/v3/channels?forUsername=' + this.cfg.q + '&callback=ytEmbed.callback[' + this.ytQuery + ']';
                        break;

                    case "playlist":
                        url += '/youtube/v3/playlistItems?playlistId=' + this.cfg.q + '&callback=ytEmbed.callback[' + this.ytQuery + ']&order=' + this.cfg.orderby;
                        break;

                    case "videos":
                        url += '/youtube/v3/videos?id=' + this.cfg.q + '&callback=ytEmbed.callback[' + this.ytQuery + ']&order=' + this.cfg.orderby;
                        break;

                    case "featured":
                        url += '/youtube/v3/videos?chart=mostPopular&callback=ytEmbed.callback[' + this.ytQuery + ']';
                        break;

                    case "channel":
                        url += '/youtube/v3/channels?id=' + this.cfg.q + '&callback=ytEmbed.callback[' + this.ytQuery + ']';
                        break;

                    default:
                        this.message('Unknown setting type. Use: search, playlist or user.');
                        return;
                        break;
                }

                if (this.cfg.type == "user"||this.cfg.type == "channel") {
                    url += '&part=contentDetails';
                } else if (this.cfg.type == "search" && this.cfg.meta) {
                    url += '&part=id'; //note part=id doesnt work for playlist. get list /videos with metadata
                } else if (this.cfg.type == "search") {
                    url += '&part=snippet'; //only thing it returns
                } else if (this.cfg.type == "videos") {
                    url += '&part=snippet,contentDetails,statistics'; //all details
                } else {
                    url += '&part=snippet,contentDetails';
                }

                if (this.cfg.type == "user"||this.cfg.type == "channel") {
                    url += '&maxResults=1';
                } else if (this.cfg.results) {
                    url += '&maxResults=' + this.cfg.results;
                }

                if (this.cfg.pageToken) {
                    url += '&pageToken=' + this.cfg.pageToken;
                }

                url += '&key=' + this.cfg.key;
                url += '&prettyPrint=false';

                script.setAttribute('src', url);


                cfg.mC = this.ytQuery;
                if (this.cfg.type == "user"||this.cfg.type == "channel") {
                    this.callback[this.ytQuery] = function(json) {
                        //get the first result for username, and create a channelId request
                        if (json.pageInfo.totalResults == 1) {
                            var playlistId = json.items[0].contentDetails.relatedPlaylists.uploads;
                            cfg.type = 'playlist';
                            cfg.q = playlistId;
                            ytEmbed.init(cfg);
                        } else {
                            ytEmbed.message('Can\'t find this user defined in q');
                        }
                    }
                } else if ((this.cfg.type == "playlist" || this.cfg.type == "search") && this.cfg.meta) {
                    this.callback[this.ytQuery] = function(json) {
                        //get meta data of playlist videos


                        //grab IDs of playlist. /playlist needs extract id from snippet, else default on id
                        if (json.items) {
                            var ids = '';
                            for (var i = 0; i < json.items.length; i++) {

                                if (json.items[i].snippet) {
                                    ids += json.items[i].snippet.resourceId.videoId + ",";
                                } else if (json.items[i].id) {
                                    ids += json.items[i].id.videoId + ",";
                                }

                            }

                            //request video details
                            cfg.type = 'videos';
                            cfg.q = ids;
                            ytEmbed.init(cfg);
                        } else {
                            ytEmbed.message('An error occured:<br>' + json.error.message);
                        }
                    }
                } else {
                    this.callback[this.ytQuery] = function(json) {
                        ytEmbed.listVideos(json, cfg);
                    }
                }


                //attach script to page, this will load the data into our page and call the funtion ytInit[ytQuery]
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        }

    },


    /**
     * Build videos (static)
     */
    listVideos: function(json, cfg) {
        this.cfg = cfg;
        if (!this.cfg.player) {
            this.cfg.player = 'embed';
        }
        if (!this.cfg.layout) {
            this.cfg.layout = 'full';
        }

        var div = document.getElementById(this.cfg.block);

        var children = div.childNodes;
        for (var i = children.length; i > -1; i--) {
            if (children[i] && (children[i].className.indexOf("error") !== -1 || children[i].tagName === "UL")) { /* is error message or result list */
                div.removeChild(children[i]);
            }
        }


        //div.innerHTML = ''; //clear ul
        if (json.error) {
            this.message('An error occured:<br>' + json.error.message);
        } else if (json.items) {
            var ul = document.createElement('ul');
            ul.className = 'ytlist';

            var playlist = "";

            for (var i = 0; i < json.items.length; i++) {
                var entry = json.items[i];

                //playlist need this

                if (entry.snippet && entry.snippet.resourceId) {
                    var id = entry.snippet.resourceId.videoId;
                } else if (entry.id.videoId) {
                    var id = entry.id.videoId;
                } else {
                    var id = entry.id;
                }

                if (id) {
                    playlist += id + ",";
                }

                var li = document.createElement('li');

                //a link to our javascript overlay function
                var a = document.createElement('a');
                a.className = 'clip';

                if (this.cfg.player == 'embed') {
                    if (this.cfg.parent) {
                        //a.setAttribute('href','#'+this.cfg.parent+'Player');
                    } else {
                        //a.setAttribute('href','#'+this.cfg.block+'Player');
                    }
                    a.style.cursor = 'pointer';

                    if (a.addEventListener) {
                        a.addEventListener('click', this.playVideo.bind(this, {
                            'id': id,
                            'cfg': cfg
                        }), false);
                    } else if (a.attachEvent) {
                        a.attachEvent('onclick', this.playVideo.bind(this, {
                            'id': id,
                            'cfg': cfg
                        }));
                    }
                } else {
                    a.setAttribute('href', app.baseUrl + '/video/youtube/' + id);
                }

                var span = document.createElement('span');
                a.appendChild(span);
                var img = document.createElement('img');
                img.setAttribute('src', (entry.snippet.thumbnails ? entry.snippet.thumbnails.medium.url : ''));
                span.appendChild(img);
                var em = document.createElement('em');
                span.appendChild(em);

                //uploaded
                if (this.cfg.layout == 'thumbnails') {
                    li.className = 'small';
                    li.appendChild(a);
                } else {
                    //this.cfg.layout = full
                    li.innerHTML = '<table cellspacing="0" cellpadding="0" border="0"><tr><td valign="top" rowspan="2"></td><td valign="top"><h3>' + entry.snippet.title + '</h3><span>' + this.formatDescription(entry.snippet.description) + '</span></td><td valign="top" style="width: 150px" class="meta"><div>' + (entry.contentDetails ? 'Duration: ' + ytEmbed.formatDuration(entry.contentDetails.duration) + '<br>' : '') + (entry.statistics ? 'Views: ' + entry.statistics.viewCount + '<br>' : '') + 'From: <a href="http://www.youtube.com/channel/' + entry.snippet.channelId + '">' + entry.snippet.channelTitle + '</a></div></td></tr></table>';
                    li.firstChild.firstChild.firstChild.firstChild.appendChild(a);
                }
                ul.appendChild(li);
            }

            //for fixed to bottom videos
            if (this.cfg.position == "fixed_bottom") {
                div.style.position = "fixed";
                div.style.bottom = '0px';
                div.style.left = '0px';
                //document bottom add X (height) pixels margin
            }
            div.innerHTML = ""; // clear "Loading videos..."
            div.appendChild(ul);

            //playlist
            if (this.cfg.playlist == true) {
                this.cfg.playerVars.playlist = playlist.substr(0, playlist.length - 1);
            }

            if (this.cfg.player == "embed" && this.cfg.display_first == true) {
                //set settings

                ytPlayerParams.videoId = id;


                //other settings
                if (this.cfg.playerVars) {
                    ytPlayerParams.playerVars = this.cfg.playerVars;
                }

                this.player = this.createPlayer(this.cfg);
            }

            if (this.cfg.paging == true && json.nextPageToken) {
                this.cfg.display_first = false;
                var pul = document.createElement('ul');
                pul.setAttribute('id', 'ytPage');
                if (json.nextPageToken) {
                    var li = document.createElement('li');

                    var a = document.createElement('a');
                    a.className = 'ytNext';
                    a.style.cursor = 'pointer';

                    li.appendChild(a);
                    if (a.addEventListener) {
                        a.addEventListener('click', ytEmbed.loadNext.bind(this, {
                            cfg: cfg,
                            token: json.nextPageToken
                        }), false);
                    }
                    a.innerHTML = 'Load next...';
                    li.appendChild(a); //do through bind
                    pul.appendChild(li);
                }

                if (json.prevPageToken) {
                    var li = document.createElement('li');

                    var a = document.createElement('a');
                    a.setAttribute('class', 'ytPrev');
                    a.style.cursor = 'pointer';

                    if (a.addEventListener) {
                        a.addEventListener('click', ytEmbed.loadPrevious.bind(this, {
                            cfg: cfg,
                            token: json.prevPageToken
                        }), false);
                    }
                    a.innerHTML = 'Load previous...';
                    li.appendChild(a);
                    pul.appendChild(li);
                }

                div.appendChild(pul);
            }

        } else {
            this.message('No YouTube videos found for your query:<br>Type:\'' + this.cfg.type + '\'<br>Query: \'' + this.cfg.q + '\'');
        }
    },
    /**
     * Create the inline player supporting html5 and flash through iframe
     */
    createPlayer: function(cfg) {
        var div = document.getElementById(cfg.block);

        var hold = document.createElement('div');
        hold.className = 'ytPlayer';

        var iframe = document.createElement('iframe');
        iframe.setAttribute('id', cfg.block + 'Player');
        iframe.setAttribute('width', cfg.width);
        iframe.setAttribute('height', cfg.height);
        iframe.setAttribute('frameBorder', '0');
        iframe.setAttribute('src', 'http://www.youtube.com/embed/' + ytPlayerParams.videoId + '?autoplay=' + ytPlayerParams.autoplay + '&modestbranding=1'); //controlbar set

        hold.appendChild(iframe);
        div.insertBefore(hold, div.firstChild);

        return iframe;
    },
    /**
     * Format rating (rating/ratingCount)
     */
    formatRating: function(rt, rc) {

    },

    /**
     * Format duration (sec to min) using videos#contentDetails.duration
     */
    formatDuration: function(dr) {
        return dr.replace(/(M|H)/g, ':').replace("S", "").substr(2);
    },

    /**
     * Format description (description to snippet) (read more expand)
     */
    formatDescription: function(ds) {
        if (ds) {
            if (ds.length > 255) {
                return ds.substr(0, 252) + '...';
            } else {
                return ds;
            }
        } else {
            return "No description available.";
        }
    },

    /**
     * Format date (2009-08-10T09:04:20.000Z to time)
     */
    formatDate: function(dt) {
        if (dt) {
            return dt.substr(0, 10)
        } else {
            return "unknown";
        }
    },
    /**
     * Depreciated
     */
    mousOverImage: function(a, b, c) {

    },
    /**
     * Depreciated
     */
    mouseOutImage: function(a, b) {

    },
    /**
     * Load next (page)
     */
    loadNext: function(data) {
        data.cfg.pageToken = data.token;
        ytEmbed.init(data.cfg);
    },
    /**
     * Load previous (page)
     */
    loadPrevious: function(data) {
        data.cfg.pageToken = data.token;
        ytEmbed.init(data.cfg);
    },
    /**
     * Sorting by commtns, views, date
     */
    sortList: function(json) {

    },

    /**
     * Play video (static)
     */
    playVideo: function(data) {
        console.log(data);
        if (data.cfg.parent) {
            var player = document.getElementById(data.cfg.parent + "Player");
        } else {
            var player = document.getElementById(data.cfg.block + "Player");
        }

        if (!player) {
            ytPlayerParams.videoId = data.id;
            ytPlayerParams.autoplay = 1;

            this.createPlayer(data.cfg);
        } else {
            player.setAttribute('src', 'http://www.youtube.com/embed/' + data.id + '?autoplay=1&modestbranding=1&origin=' + document.location.protocol + '//' + document.location.hostname);
        }
    },
    /**
     * Test
     */
    test: function(e, b) {
        console.log(e);
        console.log(b);
        console.log(this.cfg.block);
    },

    /**
     * onPlayerReady video
     */
    onPlayerReady: function(id) {
        //set flag
    },

    /**
     * onPlayerStateChange video
     */
    onPlayerStateChange: function(id) {
        //
    },

    /**
     * Messages log
     */
    message: function(msg) {
        if (!ytEmbed.cfg.block) {
            //attach message to body?
        } else {
            document.getElementById(ytEmbed.cfg.block).innerHTML = '<div class="error">' + msg + '</div>';
        }
    }
};

/**
 * Using the embed player
 */
var ytPlayer;
var ytPlayerParams = {
    autoplay: 0,
    modestbranding: 1,
    events: {
        'onReady': ytEmbed.onPlayerReady,
        'onStateChange': ytEmbed.onPlayerStateChange
    }
};
