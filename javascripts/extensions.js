/*
  jQuery Extensions
*/

jQuery.ajaxSettings.traditional = true;

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};

// String startsWith polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function (searchString, position) {
      position = position || 0;
      return this.lastIndexOf(searchString, position) === position;
    }
  });
}

// String contains polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/contains
if (!String.prototype.contains) {
  String.prototype.contains = function() {
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

Array.prototype.sortJsonArrayByProperty = function sortJsonArrayByProperty(prop, direction){
    if (arguments.length < 1) throw new Error("sortJsonArrayByProperty requires 1 argument");
    var direct = arguments.length > 2 ? arguments[2] : 1; //Default to ascending

    var propPath = (prop.constructor === Array) ? prop : prop.split(".");
    this.sort(function(a,b){
        for (var p = 0; p < propPath.length; p++) {
            if (a[propPath[p]] && b[propPath[p]]){ //Both have the property, so continue
                a = a[propPath[p]];
                b = b[propPath[p]];
            } else if (a[propPath[p]]) { //B doesn't have the property so A comes before B
                return -1 * direct;
            } else if (b[propPath[p]]) { //A doesn't have the property so B comes before A
                return direct;
            } else { //Neither has the property so they are both considered equal
                return 0;
            }
        }
        // convert numeric strings to integers or to lower case strings
        a = isNaN(Math.floor(a)) ? a.toLowerCase() : a;
        b = isNaN(Math.floor(b)) ? b.toLowerCase() : b;
        return ( (a < b) ? ( -1 * direct ) : ((a > b) ? (1 * direct) : 0) );
    });
};

// Taken from http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
Array.prototype.unique = function() {
    var o = {}, i, l = this.length, r = [];
    for(i=0; i<l;i+=1) o[this[i]] = this[i];
    for(i in o) r.push(o[i]);
    return r;
};

Array.prototype.peek = function() {
  var n = this.length;
  if (n > 0) return this[n - 1];
};

// Simple JavaScript Templating (modified)
// Original from John Resig - http://ejohn.org/ - MIT Licensed
// @see http://ejohn.org/blog/javascript-micro-templating/
// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};

  String.prototype.template = function (data) {
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(this) ?
      cache[this] = cache[this] ||
        tmpl(document.getElementById(this).innerHTML) :

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +

        // Convert the template into pure JavaScript
        this
          .replace(/[\r\t\n]/g, " ")
          .split("<!").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)!>/g, "',$1,'")
          .split("\t").join("');")
          .split("!>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();

app.utils = {};

app.utils.getParameterByName = function (name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

app.utils.getFragmentParameterByName = function (name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\!&]" + name + "=([^&?]*)"), results = regex.exec(location.hash);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

app.utils.getParametersFromHash = function() {
  var match,
      pl     = /\+/g,  // Regex for replacing addition symbol with a space
      search = /([^&\!#=]+)=?([^&]*)/g,
      decode = function (s) {
        return decodeURIComponent(s.replace(pl, " "));
      },
      query = window.location.hash || (window.location.search.match(/\?_escaped_fragment_/gi) ? window.location.search.replace('?_escaped_fragment_=','#') : ""),
      urlParams = {};



  while (match = search.exec(query)) {
     urlParams[decode(match[1])] = decode(match[2]);
  }
  return urlParams;
};

app.utils.convertParametersToHash = function(urlParams) {
  var hashArray = [];
  for(k in urlParams){
    // only push params that are actually set
    if(urlParams[k]) {
      hashArray.push(k + "=" + encodeURIComponent(urlParams[k]));
    }
  }
  return hashArray.join("&");
};

app.utils.updatePageHash = function(el) {
  var urlParams = app.utils.getParametersFromHash();
  var name = el.attr('name');
  urlParams[name] = el.val();
  window.location.hash = "!" + app.utils.convertParametersToHash(urlParams);
  // if there is an existing query param, remove it and refresh the page
  if(!!window.location.search) {
    window.location = window.location.href.replace(window.location.search,'');
  }
};

app.utils.restoreFromHash = function(urlParams) {
  var urlParams = urlParams || app.utils.getParametersFromHash();
  for(k in urlParams) {
    var input = $('[name="'+k+'"]');
    var tagName = input.prop('tagName');
    // check if a select box
    if(tagName === "SELECT") {
      input.find('option[value="'+urlParams[k]+'"]').attr('selected','selected').trigger('change');
    }
    else {
      input.val(urlParams[k]).trigger('keyup');
    }
  }
};

app.utils.parseDataAttributes = function() {
  var values = {};
  $('[data-set]').each(function(i,el){
    var el = $(this);
    var data = el.data();
    for(key in data) {
      if(key.match(/^set[A-Z]/g)) {
        var attr = key.replace('set','').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        values[attr] = data[key];
      }
    }
  });
  app.dm.restoreFilter(values);
  app.utils.restoreFromHash(values);
};

// Code pulled from http://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
app.utils.getQueryVariable = function (variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for(var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
};

app.utils.diplayPagination = function(currentPage, totalPages, pagesToShow) {
  if(!pagesToShow) {
    pagesToShow = 4;
  }
  else if(pagesToShow % 2) {
    pagesToShow++; // must be an even number
  }
  // some defaults
  var pagesToShow = pagesToShow || 4;
  var startPage = (currentPage < 5) ? 1 : currentPage - (pagesToShow / 2);
  var endPage = pagesToShow + startPage;
  endPage = (totalPages < endPage) ? totalPages : endPage;
  var diff = startPage - endPage + pagesToShow;
  startPage -= (startPage - diff > 0) ? diff : 0;

  var display = [];
  if (startPage > 1) {
    display.push(1);
    display.push("⋯");
  }
  for(i=startPage; i<=endPage; i++){
    display.push(i);
  }
  if (endPage < totalPages) {
    display.push("⋯");
    display.push(totalPages);
  }
  return display;
};

app.utils.isMobile = {
  Android: function() {
    return !!navigator.userAgent.match(/Android/i);
  },
  iOS: function() {
    return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  any: function() {
    return (app.utils.isMobile.Android() || app.utils.isMobile.iOS());
  }
}


// TODO Move this somewhere else
function roundHalf(num) {
    var num = Math.round(num*2)/2;
    var html = "";
    for (var i = num; i >= 0; i--) {
      if(i >= 1) {
        html += "<i class='fa fa-star'></i>";
      }
      else if (i > 0) {
        html += "<i class='fa fa-star-half-empty'></i>";
      }
    };
    return html;
}

