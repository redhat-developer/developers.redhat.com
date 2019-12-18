(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.behaviors.customEvents = {
    attach: function (context, settings) {

      /**
      * Creates and dispatches an event trigger
      * @param {String} evt - The name of the event
      */
      function sendCustomEvent(evt){
        if(document.createEvent && document.body.dispatchEvent){
          var event = document.createEvent('Event');
          event.initEvent(evt, true, true); //can bubble, and is cancellable
          document.body.dispatchEvent(event);
        }
        else if(window.CustomEvent && document.body.dispatchEvent) {
          var event = new CustomEvent(evt, {bubbles: true, cancelable: true});
          document.body.dispatchEvent(event);
        }
      }
      if (settings.rhdp2.rhd_dtm_code) {
        var digitalData = settings.rhdp2.rhd_dtm_script;

        ( function( w, d, dd, undefined ) {
          var bc = window.location.href.replace(/^https?\:\/\/([a-z._-]|[0-9])+(:?[0-9]*)?(\/pr\/[0-9]+\/export)?\//,'').replace(/\/$/,'').split('?')[0].split('#')[0].split(/\//), primary = '', subs = [], pageType = '';
          if (bc.length === 1 && bc[0] === "") {
            primary = "home page";
            subs.push('cms');
            pageType = 'home';
          } else {
            switch(bc[0]) {
              case 'events':
                if (bc.length > 1) {
                  pageType = 'event';
                  primary = bc[0];
                  subs = bc.slice(1);
                } else {
                  pageType = 'events';
                  primary = 'event-list';
                }
                break;
              case 'community':
                pageType = 'contributor';
                primary = bc[0];
                if (bc.length > 1) {
                  subs = bc.slice(1);
                }
                break;
              case 'forums':
                pageType = 'forum-list';
                primary = 'forum-list';
                break;
              case 'about':
                pageType = bc[0];
                primary = 'about_us';
                break;
              case 'stack-overflow':
                pageType = bc[0];
                primary = 'stack-overflow-qa';
                break;
              case 'vjbug':
              case 'devnationlive':
                pageType = 'webinar';
                primary = 'webinar';
                subs.push(bc[0]);
                break;
              case 'articles':
              case 'quickstarts':
              case 'boms':
              case 'archetypes':
              case 'demos':
              case 'promotions':
                pageType = bc[0].replace(/s$/,'');
                primary = bc[0].replace(/s$/,'');
                if (bc.length > 1) {
                  subs = bc.slice(1);
                }
                break;
              case 'products':
                pageType = bc[0];
                if (bc.length > 1) {
                  primary = bc[0];
                  subs = bc.slice(1);
                } else {
                  primary = 'product-list';
                }
              case 'video':
              case 'topics':
              case 'search':
              case 'projects':
              case 'variants':
              case 'downloads':
              case 'ticket-monster':
              case 'terms-and-conditions':
              default:
                pageType = bc[0];
                primary = bc[0];
                if (bc.length > 1) {
                  subs = bc.slice(1);
                }
            }
          }
    
          dd.page.attributes.queryParameters = window.location.href.split('?')[1] ? window.location.href.split('?')[1].replace(/=/g,':').split('&') : "";
          dd.page.category = { primaryCategory: primary, subCategories: subs };
          dd.page.pageInfo.destinationURL = window.location.href;
          dd.page.pageInfo.pageName = bc.length === 1 && bc[0] === "" ? 'home page' : bc[0];
          dd.page.pageInfo.breadCrumbs = [dd.page.category.primaryCategory, dd.page.category.subCategories[0] || ""];
          dd.page.pageInfo.sysEnv = ( w.innerWidth <= 768 ) ? "tablet" : "desktop";
    
          var registered = getCookie("rhd_member");
          dd.user[0].profile[0].profileInfo.registered = registered ? true : false;
    
          if ( d.referrer ) {
            var a = d.createElement( "a" );
            a.href = d.referrer;
    
            dd.page.pageInfo.referringDomain = a.hostname;
            dd.page.pageInfo.referringURL = a.href;
          }
    
          var elqGUID = getCookie( "rh_elqCustomerGUID" );
          if ( elqGUID ) {
            dd.user[ 0 ].profile[ 0 ].profileInfo.eloquaGUID = elqGUID;
          }
    
          var slc = getCookie("rhd-slink-add");
          if(slc){
            sendSocialLinkEvent(slc);
            deleteCookie('rhd-slink-add');
          }
    
          function sendSocialLinkEvent(sprov){
            var ddSocialLinkEvent = {
              eventInfo: {
                eventAction: 'link',
                eventName: 'social account link',
                socialAccount: sprov,
                socialAccountsLinked: dd.user[0].profile[0].profileInfo.socialAccountsLinked,
                timeStamp: new Date(),
                processed: {
                  adobeAnalytics: false
                }
              }
            };
            dd.event.push(ddSocialLinkEvent);
            sendCustomEvent('socialLinkEvent', ddSocialLinkEvent);
          }
    
          document.addEventListener('search-complete', function(e) {
            if (typeof e.detail.invalid === 'undefined') {
              var ddSearchEvent = {
                  eventInfo: {
                    eventName: 'internal search',
                    eventAction: 'search',
                    listing: {
                      browseFilter:  e.detail.filterStr || "internal search",
                      query: e.detail.term,
                      queryMethod: "system generated",
                      resultCount: e.detail.results.hits.total,
                      resultsShown: e.detail.from,
                      searchType: digitalData.page.category.primaryCategory || "",
                      refinement: []
                    },
                    timeStamp: new Date(),
                    processed: {
                      adobeAnalytics: false
                    }
                  }
                };
              digitalData.event.push(ddSearchEvent);
              digitalData.page.listing = ddSearchEvent.eventInfo.listing;
              sendCustomEvent('ajaxSearch');
            }
          });
    
          function getCookie( name ) {
            var value = "; " + document.cookie;
            var parts = value.split( "; " + name + "=" );
            if ( parts.length == 2 ) {
              return parts.pop().split( ";" ).shift();
            }
          }
    
          function deleteCookie(name) {
            document.cookie = name + '=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          };
    
        } )( window, document, digitalData );
      } //End if rhd_dtm_code

    }
  };
})(jQuery, Drupal, drupalSettings);
