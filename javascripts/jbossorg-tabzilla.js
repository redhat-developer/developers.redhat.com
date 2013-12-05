/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/**
 * Tabzilla global navigation for Mozilla projects
 *
 * This code is licensed under the Mozilla Public License 1.1.
 *
 * Event handling portions adapted from the YUI Event component used under
 * the following license:
 *
 *   Copyright © 2012 Yahoo! Inc. All rights reserved.
 *
 *   Redistribution and use of this software in source and binary forms,
 *   with or without modification, are permitted provided that the following conditions
 *   are met:
 *
 *   - Redistributions of source code must retain the above copyright notice,
 *     this list of conditions and the following disclaimer.
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *   - Neither the name of Yahoo! Inc. nor the names of YUI's contributors may
 *     be used to endorse or promote products derived from this software
 *     without specific prior written permission of Yahoo! Inc.
 *
 *   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 *   TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 *   PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 *   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 *   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 *   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Portions adapted from the jQuery Easing plugin written by Robert Penner and
 * used under the following license:
 *
 *   Copyright 2001 Robert Penner
 *   All rights reserved.
 *
 *   Redistribution and use in source and binary forms, with or without
 *   modification, are permitted provided that the following conditions are
 *   met:
 *
 *   - Redistributions of source code must retain the above copyright notice,
 *     this list of conditions and the following disclaimer.
 *   - Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *   - Neither the name of the author nor the names of contributors may be
 *     used to endorse or promote products derived from this software without
 *    specific prior written permission.
 *
 *   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 *   TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 *   PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 *   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 *   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 *   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *
 * @copyright 2012 silverorange Inc.
 * @license   http://www.mozilla.org/MPL/MPL-1.1.html Mozilla Public License 1.1
 * @author    Michael Gauthier <mike@silverorange.com>
 * @author    Steven Garrity <steven@silverorange.com>
 */

function Tabzilla()
{
    if (typeof jQuery != 'undefined' && jQuery) {
        jQuery(document).ready(Tabzilla.init);
    } else {
        Tabzilla.run();
    }
}

Tabzilla.READY_POLL_INTERVAL = 40;
Tabzilla.readyInterval = null;
Tabzilla.jQueryCDNSrc =
    '//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';

Tabzilla.hasCSSTransitions = (function() {
    var div = document.createElement('div');
    div.innerHTML = '<div style="'
        + '-webkit-transition: color 1s linear;'
        + '-moz-transition: color 1s linear;'
        + '-ms-transition: color 1s linear;'
        + '-o-transition: color 1s linear;'
        + '"></div>';

    var hasTransitions = (
           (div.firstChild.style.webkitTransition !== undefined)
        || (div.firstChild.style.MozTransition !== undefined)
        || (div.firstChild.style.msTransition !== undefined)
        || (div.firstChild.style.OTransition !== undefined)
    );

    delete div;

    return hasTransitions;
})();

/**
 * Sets up the DOMReady event for Tabzilla
 *
 * Adapted from the YUI Event component. Defined in Tabzilla so we do not
 * depend on YUI or jQuery. The YUI DOMReady implementation is based on work
 * Dean Edwards, John Resig, Matthias Miller and Diego Perini.
 */
Tabzilla.run = function()
{
    var webkit = 0, isIE = false, ua = navigator.userAgent;
    var m = ua.match(/AppleWebKit\/([^\s]*)/);

    if (m && m[1]) {
        webkit = parseInt(m[1], 10);
    } else {
        m = ua.match(/Opera[\s\/]([^\s]*)/);
        if (!m || !m[1]) {
            m = ua.match(/MSIE\s([^;]*)/);
            if (m && m[1]) {
                isIE = true;
            }
        }
    }

    // Internet Explorer: use the readyState of a defered script.
    // This isolates what appears to be a safe moment to manipulate
    // the DOM prior to when the document's readyState suggests
    // it is safe to do so.
    if (isIE) {
        if (self !== self.top) {
            document.onreadystatechange = function() {
                if (document.readyState == 'complete') {
                    document.onreadystatechange = null;
                    Tabzilla.ready();
                }
            };
        } else {
            var n = document.createElement('p');
            Tabzilla.readyInterval = setInterval(function() {
                try {
                    // throws an error if doc is not ready
                    n.doScroll('left');
                    clearInterval(Tabzilla.readyInterval);
                    Tabzilla.readyInterval = null;
                    Tabzilla.ready();
                    n = null;
                } catch (ex) {
                }
            }, Tabzilla.READY_POLL_INTERVAL);
        }

    // The document's readyState in Safari currently will
    // change to loaded/complete before images are loaded.
    } else if (webkit && webkit < 525) {
        Tabzilla.readyInterval = setInterval(function() {
            var rs = document.readyState;
            if ('loaded' == rs || 'complete' == rs) {
                clearInterval(Tabzilla.readyInterval);
                Tabzilla.readyInterval = null;
                Tabzilla.ready();
            }
        }, Tabzilla.READY_POLL_INTERVAL);

    // FireFox and Opera: These browsers provide a event for this
    // moment.  The latest WebKit releases now support this event.
    } else {
        Tabzilla.addEventListener(document, 'DOMContentLoaded', Tabzilla.ready);
    }
};

Tabzilla.ready = function()
{
    if (!Tabzilla.DOMReady) {
        Tabzilla.DOMReady = true;

        var onLoad = function() {
            Tabzilla.init();
            Tabzilla.removeEventListener(
                document,
                'DOMContentLoaded',
                Tabzilla.ready
            );
        };

        // if we don't have jQuery, dynamically load jQuery from CDN
        if (typeof jQuery == 'undefined') {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = Tabzilla.jQueryCDNSrc;
            document.getElementsByTagName('body')[0].appendChild(script);

            if (script.readyState) {
                // IE
                script.onreadystatechange = function() {
                    if (   script.readyState == 'loaded'
                        || script.readyState == 'complete'
                    ) {
                        onLoad();
                    }
                };
            } else {
                // Others
                script.onload = onLoad;
            }
        } else {
            onLoad();
        }
    }
};

Tabzilla.init = function()
{
    if (!Tabzilla.hasCSSTransitions) {
        // add easing functions
        jQuery.extend(jQuery.easing, {
            'easeInOut':  function (x, t, b, c, d) {
                if (( t /= d / 2) < 1) {
                    return c / 2 * t * t + b;
                }
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        });
    }

    Tabzilla.link  = document.getElementById('tab');
    Tabzilla.panel = Tabzilla.buildPanel();

    // add panel as first element of body element
    var body = document.getElementsByTagName('body')[0];
    body.insertBefore(Tabzilla.panel, body.firstChild);

    // set up event listeners for link
    Tabzilla.addEventListener(Tabzilla.link, 'click', function(e) {
        Tabzilla.preventDefault(e);
        Tabzilla.toggle();
    });

    Tabzilla.$panel = jQuery(Tabzilla.panel);
    Tabzilla.$link  = jQuery(Tabzilla.link);

    Tabzilla.$panel.addClass('tabnav-closed');
    Tabzilla.$link.addClass('tabnav-closed');
    Tabzilla.$panel.removeClass('tabnav-opened');
    Tabzilla.$link.removeClass('tabnav-opened');

    Tabzilla.opened = false;

    // initialize search bar now because it is injected into body during document.ready()
    initializeSearchBar();
};

Tabzilla.buildPanel = function()
{
    var panel = document.createElement('div');
    panel.id = 'tabnav-panel';
    panel.innerHTML = Tabzilla.content;
    return panel;
};

Tabzilla.addEventListener = function(el, ev, handler)
{
    if (typeof el.attachEvent != 'undefined') {
        el.attachEvent('on' + ev, handler);
    } else {
        el.addEventListener(ev, handler, false);
    }
};

Tabzilla.removeEventListener = function(el, ev, handler)
{
    if (typeof el.detachEvent != 'undefined') {
        el.detachEvent('on' + ev, handler);
    } else {
        el.removeEventListener(ev, handler, false);
    }
};

Tabzilla.toggle = function()
{
    if (Tabzilla.opened) {
        Tabzilla.close();
    } else {
        Tabzilla.open();
    }
};

Tabzilla.open = function()
{
    if (Tabzilla.opened) {
        return;
    }

    if (Tabzilla.hasCSSTransitions) {
        Tabzilla.$panel.addClass('tabnav-opened');
        Tabzilla.$link.addClass('tabnav-opened');
        Tabzilla.$panel.removeClass('tabnav-closed');
        Tabzilla.$link.removeClass('tabnav-closed');
    } else {
        // jQuery animation fallback
        jQuery(Tabzilla.panel).animate({ height: 225 }, 225, 'easeInOut');
    }

    Tabzilla.opened = true;
};

Tabzilla.close = function()
{
    if (!Tabzilla.opened) {
        return;
    }

    if (Tabzilla.hasCSSTransitions) {
        Tabzilla.$panel.removeClass('tabnav-opened');
        Tabzilla.$link.removeClass('tabnav-opened');
        Tabzilla.$panel.addClass('tabnav-closed');
        Tabzilla.$link.addClass('tabnav-closed');
    } else {
        // jQuery animation fallback
        jQuery(Tabzilla.panel).animate({ height: 0 }, 225, 'easeInOut');
    }

    Tabzilla.opened = false;
};

Tabzilla.preventDefault = function(ev)
{
    if (ev.preventDefault) {
        ev.preventDefault();
    } else {
        ev.returnValue = false;
    }
};

Tabzilla.content =
'<div class="tabnavclearfix" id="tabnav">'
+'<div class="tabcontent">'
+'  <p class="overview"> Like PROJECT NAME? It’s part of the community of Red Hat projects. Learn more about Red Hat and our open source communities:</p>'
+'  <div class="row-fluid">'
+'    <span class="span4 middlewarelogo">'
+'      <img src="http://static.jboss.org/common/images/tabzilla/RHJB_Middleware_Logotype.png" alt="Red Hat JBoss MIDDLEWARE" />'
+'    </span>'
+'    <span class="span4">'
+'      <ul class="level1">'
+'        <li class="leaf"><a href="#">Red Hat JBoss Middleware Overview</a></li>'
+'        <li class="leaf"><a href="#">Red Hat JBoss Middleware Products</a></li>'
+'        <li class="leaf"><a href="#">Red Hat JBoss Projects & Standards</a></li>'
+'      </ul>'
+'    </span>'
+'    <span class="span4">'
+'      <ul class="level1">'
+'        <li class="leaf"><a href="#">redhat.com</a></li>'
+'        <li class="leaf"><a href="#">Red Hat Customer Portal</a></li>'
+'        <li class="leaf"><a href="#">OpenShift</a></li>'
+'      </ul>'
+'    </span>'
+'  </div>'
+'</div>'
+'</div>';

/* search.js - Code for search bar. */
var _srch = window.search = {};

_srch.context = [
    { // community
        description: "Search the Community",
        url: "http://community.jboss.org/search.jspa?"
    },
    { // project
        description: "Search Project Pages",
        url: "http://www.google.com/search?as_sitesearch=jboss.org"
    }
];

// default configuration
_srch.disappearDelay = 250;
_srch.hideMenuOnClick = true;
_srch.selectedContext = 0;
_srch.initialized = false;

_srch.init = function () {

    var searchBar = jQuery("#searchbar");
    if (searchBar.length == 0) {
        // can not initialize now, #searchbar is not available yet
        return;
    }
    if (_srch.initialized) {
    // can be called only once
    return;
    }

    var innerMenuContent =
        // Adding class="selected" to one <a> tag makes this options
        // visually selected by default. Even if there is not selected any option by default
        // there is a default option where the search request will be sent to though.
        // We want by deault not to show the search scope description in the search box.
        "<div><a href='#' context='0'>"+_srch.context[0].description+"</a></div>" +
        "<div><a href='#' context='1'>"+_srch.context[1].description+"</a></div>";

    var searchButton = jQuery("#searchGo");
    var dropDownMenu = jQuery("#dropmenudiv");
    if (dropDownMenu.length == 0) {
        var htmlContent = "<div id='dropmenudiv' style='display: none; position: absolute; left: 0px; top: 0px;' />";
        jQuery('body').prepend(htmlContent);
        dropDownMenu = jQuery("#dropmenudiv");
    }

    // we must define some handlers upfront
    var leaveSearchBarHandler = function (searchBar, dropDownMenu) {
        var text = searchBar.val();
        if (text == undefined || text == "" || equalsAnyDescription(text)) {
            text = dropDownMenu.find('a.selected').text();
            searchBar.val(text);
        }
    };

    var enterSearchBarHandler = function(searchBar, dropDownMenu) {
        var text = searchBar.val();
        if (equalsAnyDescription(text)) {
            searchBar.val("");
        }
    };

    // Returns true is given text equals to description of any search context.
    var equalsAnyDescription = function (text) {
        if (text != undefined) {
            for (var i = 0; i < _srch.context.length; i++) {
                if (text == _srch.context[i].description) {
                    return true;
                }
            }
        }
        return false;
    };

    // @param menu          html element to hide (must be wrapped by jQuery)
    // @param attributes    [optional] json with top, height, left and width properties
    var showDropDownMenu = function (menu, attributes) {
        if (menu) {
            if (attributes) {
                menu.css('top', attributes.top + attributes.height);
                menu.css('left', attributes.left);
                menu.css('width', attributes.width - menu.css('padding-left').replace(/\D+/,"") - menu.css('padding-right').replace(/\D+/,""));
            }
            menu.stop(true, true).show();
        }
    };

    // @param menu      html element to hide (must be wrapped by jQuery)
    // @param delay     [optional] hide delay (default to 250)
    var hideDropDownMenu = function (menu, delay) {
        if (menu) {
            menu.delay(delay != undefined ? delay : _srch.disappearDelay).fadeOut(100);
        }
    };

    // Retrieves the following properties from given element (must be wrapped by jQuery): top, left, height
    // Returns simple JSON [defaults to] {top: 0, left: 0, height: 10, width: 150}
    // @param element
    var getPositionAttributes = function (element) {
        var attr = { top: 0, left: 0, height: 10, width: 150 };
        if (element) {
            attr.height = element.outerHeight();
            var offset = element.offset();
            attr.top = offset.top;
            attr.left = offset.left;
            attr.width = element.outerWidth();
        }
        return attr;
    };

    var executeSearch = function (query) {
        window.location.href = _srch.context[_srch.selectedContext].url + "&q=" + query;
    };

    var catchEnter = function (event){
        if (event.keyCode == '13') {
            event.preventDefault();
            executeSearch(searchBar.val());
        }
    };

    dropDownMenu.html(innerMenuContent);

    // bind click events on menu items
    dropDownMenu.find('a').click(
        function(e) {
            dropDownMenu.find('a').removeClass('selected');
            var target = jQuery(e.target || e.srcElement);
            _srch.selectedContext = parseInt(target.attr('context'),10);
            target.addClass('selected');
            hideDropDownMenu(dropDownMenu, 0);
            leaveSearchBarHandler(searchBar, dropDownMenu);
            return false;
        }
    );

    // call this function to setup default text into search bar
    leaveSearchBarHandler(searchBar, dropDownMenu);

    // setup width of dropdown menu according to searchbar
    dropDownMenu.css('width', searchBar.outerWidth());

    searchBar.unbind(); // remove onmouseover initializetion if any...

    searchBar.keydown(function(e) { catchEnter(e) });
    searchBar.blur(function() { leaveSearchBarHandler(searchBar, dropDownMenu) });
    searchBar.focus(function() { enterSearchBarHandler(searchBar, dropDownMenu) });

    searchBar.hover(
        function() { showDropDownMenu(dropDownMenu, getPositionAttributes(searchBar)) },
        function() { hideDropDownMenu(dropDownMenu) });

    dropDownMenu.hover(
        function() { showDropDownMenu(dropDownMenu, getPositionAttributes(searchBar)) },
        function() { hideDropDownMenu(dropDownMenu) }
    );

    searchButton.click(function() { executeSearch(searchBar.val()) });

    // this functionality was in original code, may be it can be useful for tablet users
    if (_srch.hideMenuOnClick == true) { document.onclick = function() { hideDropDownMenu(dropDownMenu); } }

    _srch.initialized = true;
};

jQuery(document).ready( _srch.init );

// Since the #searchbar may not ba available in DOM when the _srch.init is called in document.ready()
// we also need an option to initialize it later.
var initializeSearchBar = function() {
    _srch.init();
};
/* end of search.js */

// Tabzilla initialization
Tabzilla();
