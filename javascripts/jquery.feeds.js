/* Copyright (c) 2012 Camilo Aguilar; Licensed MIT, GPL */
/*jshint evil: true */
( function( $ ) {
	
	var cache = {};
	
	$.fn.feeds = function( options ) {

		var engine = {
			service: '//ajax.googleapis.com/ajax/services/feed/load?v=1.0',
			
			settings: {
				loadingTemplate: '<div class="feeds-loader">Loading entries ...</div>',
				entryTemplate:	'<div class="feeds-entry feeds-source-<!=source!>">' + 
								'<a class="feeds-entry-title" target="_blank" href="<!=link!>" title="<!=title!>"><!=title!></a>' +
								'<div class="feeds-entry-date"><!=publishedDate!></div>' + 
								'<div class="feeds-entry-contentSnippet"><!=contentSnippet!></div>' + 
								'</div>',
				feeds: {},
				max: -1,
				xml: false,
				ssl: 'auto',
				onComplete: function( entries ) {

				},
				preprocess: function( feed ) {

				}
			},
			
			feeds: { },
			entries: [ ],
			
			feedsLength: 0,
			feedsLoaded: 0,
			
			$element: null,
			$loader: null,
			
			init: function( element, options ) {
				this.settings = $.extend( this.settings, options );
				this.feeds = this.settings.feeds;
				
				for ( var i in this.feeds ) {
					if ( this.feeds.hasOwnProperty( i ) ) {
						this.feedsLength++;
					}
				}
				
				var protocol = this.settings.ssl === 'auto' ? document.location.protocol : this.settings.ssl ? 'https:' : 'http:';
				if ( $.inArray( protocol, [ 'http:', 'https' ]) === -1 ) {
					protocol = 'https:';
				}
				
				this.service = protocol + this.service;
				
				this.$element = $( element );
				
				var render = typeof this.settings.loadingTemplate === 'function' ? this.settings.loadingTemplate : this.tmpl( this.settings.loadingTemplate );
				this.$loader = $( render.call( this, { } ) );
				this.$element.html( this.$loader );
				
				var output = this.settings.xml ? 'json_xml' : 'json';
				
				for ( var j in this.feeds ) {
					this.fetchFeed( j, this.feeds[ j ], this.settings.max, output );
				}
			},
			
			fetchFeed: function( key, feed, max, output ) {
				var self = this;
				
				var cacheKey = feed + '**' + max + '**' + output;
				if ( typeof cache[ cacheKey ] !== 'undefined' ) {
					self.processResponse( cache[ cacheKey ], key, feed );
					return;
				}
				
				$.ajax( {
					url: this.service,
					dataType: 'jsonp',
					data: {
						q: feed,
						num: max,
						output: output
					},
					beforeSend: function( ) {
						this.feed = feed;
						this.key = key;
					},
					success: function( data ) {
						cache[ cacheKey ] = data;
						self.processResponse( data, this.key, this.feed );
					}
				} );
			},
			
			processResponse: function( data, key, feed ) {
				if ( data.responseStatus !== 200 ) {
					if ( window.console && window.console.log ) {
						console.log( 'Unable to load feed ' + feed + ': (' + data.responseStatus + ') ' + data.responseDetails );
					}
				} else {
					var currentFeed = data.responseData.feed;
					var feedEntries = currentFeed.entries;
					
					var type = data.responseData.feed.type;
					
					if ( this.settings.xml ) {
						var $xml = $( data.responseData.xmlString );
						
						if ( type.match( /^rss.*/ ) ) {
							$xml = $xml.filter( 'rss' ).find( 'channel' );
						} else if ( type.match( /^atom.*/ ) ) {
							$xml = $xml.filter( 'feed' );
						}
						
						currentFeed.xml = $xml;
					}
					
					for ( var i in feedEntries ) {
						var entry = $.extend( {}, feedEntries[ i ] );
						entry.source = key;
						entry.publishedDateRaw = entry.publishedDate;
						
						entry.feedUrl = currentFeed.feedUrl;
						entry.feedTitle = currentFeed.title;
						entry.feedLink = currentFeed.link;
						entry.feedDescription = currentFeed.description;
						entry.feedAuthor = currentFeed.author;
						
						if ( this.settings.xml ) {
							if ( type.match( /^rss.*/ ) ) {
								entry.xml = currentFeed.xml.find( 'item' ).eq( i );
							} else if ( type.match( /^atom.*/ ) ) {
								entry.xml = currentFeed.xml.find( 'entry' ).eq( i );
							} else {
								entry.xml = { };
							}
						}
						
						if ( this.settings.preprocess.call( entry, currentFeed ) !== false ) {
							this.entries.push( entry );
						}
					}
				}
				
				this.feedsLoaded++;
				this.checkComplete();
			},
			
			checkComplete: function( ) {
				if ( this.feedsLoaded === this.feedsLength ) {
					this.$loader.remove( );
					
					this.entries.sort( function( a, b) {
						var aDate = new Date( a.publishedDateRaw ).getTime( );
						var bDate = new Date( b.publishedDateRaw ).getTime( );

						return bDate - aDate;
					} );
					
					var render = typeof this.settings.entryTemplate === 'function' ? this.settings.entryTemplate : this.tmpl( this.settings.entryTemplate );
					
					for ( var i in this.entries ) {
						var entry = this.entries[ i ];
						
						var html = render.call( this, entry );
						
						this.$element.append( html );
					}
					
					this.settings.onComplete.call( this.$element[ 0 ], this.entries );
				}
			},
			

			// Simple JavaScript Templating (modified)
			// John Resig - http://ejohn.org/ - MIT Licensed
			// @see http://ejohn.org/blog/javascript-micro-templating/
			tmplCache: {},
			tmpl: function tmpl( str, data ) {

				var fn = !/\W/.test( str ) ? this.tmplCache[ str ] = this.tmplCache[ str ] || this.tmpl( document.getElementById( str ).innerHTML ) :

				new Function( "obj",
					"var p=[],print=function(){p.push.apply(p,arguments);};" +

					"with(obj){p.push('" +
					str
						.replace( /[\r\t\n]/g, " " )
						.split( "<!" ).join( "\t" )
						.replace( /((^|!>)[^\t]*)'/g, "$1\r" )
						.replace( /\t=(.*?)!>/g, "',typeof $1 != 'undefined' ? $1 : '','" )
						.split( "\t" ).join( "');" )
						.split( "!>" ).join( "p.push('" )
						.split( "\r" ).join( "\\'" ) +
					"');}return p.join('');"
				);

				return data ? fn( data ) : fn;
			}
		};
		
		return $( this ).each( function( ) {
			engine.init( this, options );
		});
	};
}( jQuery ) );
