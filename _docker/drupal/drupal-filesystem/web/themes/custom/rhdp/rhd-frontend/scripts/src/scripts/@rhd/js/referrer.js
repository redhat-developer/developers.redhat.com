(function () {
    $(function () {
        var referrerHTML = $('<section id="referral-alert"><div class="row alert-box alert-xl"><div class="row"><div class="icon"></div><div class="alert-content"><h3>You have been redirected from JBoss.org to Red Hat Developers.</h3><p>It' + "'" + 's true — JBoss Developer and Red Hat Developers are one and the same, and you can find all the great stuff you were looking for right here on <a href="https://developers.redhat.com/">developers.redhat.com.</a></p><a class="close"></a></div></div></div></section>');
        var jbdReferrerHTML = $('<section id="referral-alert"><div class="row alert-box alert-xl"><div class="row"><div class="icon"></div><div class="alert-content"><h3>Welcome jboss.org members!</h3><p>It' + "'" + 's true — JBoss Developer and Red Hat Developer Program are joining forces. You can find all the great Middleware information that you were looking for right here on developers.redhat.com.<a href="https://developer.jboss.org/blogs/mark.little/2017/08/31/we-are-moving?_sscc=t"> Read more about this on our blog.</a></p></div></div></div></section>');
        if (isReferrer('jbd')) {
            switch (getPrimaryCategory()) {
                case 'products':
                    if ($('.mobile.product-header').length > 0) {
                        referrerHTML.insertBefore('.mobile.product-header');
                    }
                    else {
                        referrerHTML.insertAfter('.hero');
                    }
                    break;
                case 'downloads':
                    referrerHTML.insertBefore('.most-popular-downloads');
                    break;
                case 'topics':
                    referrerHTML.insertBefore('.topics-main div:first');
                    break;
                case 'community':
                    referrerHTML.insertAfter('.contributors-main');
                    break;
                case 'about':
                case 'books':
                case 'quickstarts':
                    referrerHTML.insertBefore('.node__content');
                    break;
                case 'articles':
                case 'spotlights':
                case 'variants':
                case 'vjbug':
                case 'terms-and-conditions':
                case 'ticket-monster':
                case 'archetypes':
                case 'boms':
                case 'demos':
                case 'general-error':
                case 'video':
                case 'promotions':
                case 'webinars':
                case 'devnation2015':
                case 'forums':
                case 'events':
                    if ($('.hero').length > 0) {
                        referrerHTML.insertAfter('.hero');
                    }
                    else if ($('.wide-hero').length > 0) {
                        referrerHTML.insertAfter('.wide-hero');
                    }
                    else {
                        referrerHTML.insertBefore('#page');
                    }
                    break;
                case 'projects':
                case 'resources':
                case 'stack-overflow':
                    referrerHTML.insertAfter('header:first');
                    break;
                case 'middleware':
                    jbdReferrerHTML.insertBefore('.rh-jboss-middleware');
                    break;
                case '':
                    referrerHTML.insertAfter('.spotlights-wrap');
                    break;
            }
            $('#referral-alert .close').on("click", function () {
                $('#referral-alert').addClass('hide');
            });
        }
    });
    function isReferrer(ref) {
        var referrer = false, url = window.location.href, querystring = url.split('?').pop(), qsList = [], vals = {};
        if (querystring !== url) {
            qsList = querystring.split('&');
            for (var i = 0, o = qsList.length; i < o; i++) {
                vals[qsList[i].split('=')[0]] = qsList[i].split('=')[1];
            }
            referrer = vals['referrer'] === ref;
        }
        return referrer;
    }
    function getPrimaryCategory() {
        prtcl = /https?:\/\//;
        category = window.location.href.replace(prtcl, '').replace(drupalSettings.rhd.urls.base_url, '').replace(drupalSettings.rhd.urls.final_base_url, '').replace(/\/$/, '').split('?')[0].split('#')[0].split(/\//);
        return category.length > 1 ? category[1] : category[0];
    }
}());
