// Dependencies: vendor/jQuery.js, vendor/jQuery.XDomainRequest.js, namespace.js

app.sso = function() {
  jbssoserverbase = "https://sso.jboss.org";

  // you can uncomment and fill next variable with another URL to be used for return from SSO login.
  // Full URL of current page is used normally. 
  var _jbssobackurl = window.location.href;
  // you can uncomment and fill next variable with another URL to be used for logout link.
  // Global SSO logout URL is used normally if not defined. 
  var _jbssologouturl = window.location.origin + '/login';
  // postfix appended to returned info snippets before they are placed into HTML 
  var _jbssoinfopostfix = ' |';
  
  // Loads this..
  $.ajax({
    // https://sso.jboss.org/logininfo
    url : jbssoserverbase + "/logininfo?backurl=" + escape(_jbssobackurl) +"&lourl="+ escape(_jbssologouturl),
    context : document.body,
    dataType : "jsonp",
    type : "GET",
    success : function(data, textStatus) {
      
      if (data && data.session) {
        // user is logged in!
        var response = $(data.part1),
            img = response.find('img'),
            profileUrl = response[2].getAttribute('href'),
            name = response[2].innerText;
        $('a.logged-in-name')
          .text(name)
          .attr('href', profileUrl)
          .prepend(img)
          .show();
        $('dd.logged-in').show();
        $('dd.login').hide();
        $('dd.register').hide();
      } else {
        $('dd.login').show();
        $('dd.register').show();
        $('dd.logged-in').hide();        
      }
    }
  });
};

// Call app.sso() straight away, the call is slow, and enough of the DOM is loaded by this point anyway
app.sso();

