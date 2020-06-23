app.sso = function () {
    function updateUser() {
        // Push it onto the event array of the digitalData object.
        window.digitalData = window.digitalData || {};

        // Update digitalData.page.listing objects.
        digitalData.user = digitalData.user || [{ profile: [{ profileInfo: {} }] }];
        var usr = digitalData.user[0].profile[0].profileInfo || {};

        if (window.location.href.toLowerCase().indexOf('/login') >= 0 && window.location.href.toLowerCase().indexOf('/user') < 0) {
            keycloak.login({ "redirectUri": app.ssoConfig.logout_url });
        }

        if (keycloak.authenticated) {
            keycloak.updateToken().success(function () {
                saveTokens();

                var logged_in_user = keycloak.tokenParsed.name || "My Account";

                // Show username if full name is empty or blank (only space character).
                if (logged_in_user.replace(/\s/g, "").length < 1) {
                    logged_in_user = "My Account";
                }

                $('span.logged-in-name')
                    .text(logged_in_user)
                    .show();

                $('a.account-info').attr('href', app.ssoConfig.account_url);

                showAudienceSelectionContent(true);

                $('li.login a, a.keycloak-url').attr("href", keycloak.createAccountUrl());

                // Once the promise comes back, listen for a click on logout.
                $('a.logout').on('click', function (e) {
                    e.preventDefault();
                    keycloak.logout({ "redirectUri": app.ssoConfig.logout_url });
                });

                // Update digitalData object.
                usr.loggedIn = true;
                usr.keyCloakID = keycloak.tokenParsed.id;
                usr.daysSinceRegistration = daysDiff(Date.now(), keycloak.tokenParsed.createdTimestamp);

                if (typeof Object.keys == "function") {
                    usr.socialAccountsLinked = Object.keys(keycloak.tokenParsed['user-social-links'])
                } else {
                    for (social in keycloak.tokenParsed['user-social-links']) {
                        usr.socialAccountsLinked.push(social);
                    }
                }

                if (Headers && app.keycloak.token && drupalSettings.rhd.swel) {
                    var swelHeaders = new Headers();
                    swelHeaders.append('Authorization', 'Bearer ' + app.keycloak.token);
                    fetch(drupalSettings.rhd.swel.url + '/api/analytics/usr/v1/websiteregstatus/rhd', {
                        method: 'GET',
                        headers: swelHeaders,
                        mode: 'cors'
                    })
                    .then(function (req) { return req.json(); })
                    .then(function (resp) {
                        if (resp && resp.registrationTimestamp) {
                            var dt = new Date();
                            var ck = getCookie('rhd_logged');
                            if (dt - (new Date(resp.registrationTimestamp)) < 86400000 && ck.length === 0) {
                                document.cookie = "rhd_logged=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
                                document.cookie = "rhd_registered=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
                            }
                        }
                    });
                }

            }).error(clearTokens);
        } else {

            showAudienceSelectionContent(false);

            $('li.login a').on('click', function (e) {
                e.preventDefault();
                keycloak.login();
            });

            $('li.register a, a.keycloak-url').on('click', function (e) {
                e.preventDefault();
                keycloak.login({ action: 'register', redirectUri: app.ssoConfig.confirmation });
            });

        }

        processPageForGatedContent(keycloak.authenticated);

        updateAnalytics(usr);
    }

    // Process all gated content for page will either remove or show depending on passed "isAuthenticated".
    function processPageForGatedContent(isAuthenticated) {
        if (typeof isAuthenticated === 'undefined') {
            isAuthenticated = false;
        }
        var authenticationValueShow = isAuthenticated ? "authenticated" : "unauthenticated";
        var authenticationValueRemove = isAuthenticated ? "unauthenticated" : "authenticated";

        // Remove 'authenticationValue' links from an on_page_navigation assembly, if one exists on the page.
        var onPageNav = document.querySelector('.assembly-type-on_page_navigation');
        if (onPageNav !== null) {
            document.querySelectorAll('[data-audience="' + authenticationValueRemove + '"]').forEach(function (e) {
                var hrefVal = '#' + e.id;
                $(onPageNav.querySelector('a[href^="' + hrefVal + '"')).detach();
            });
            //set all nav items to visable
            var onPageNavItems = onPageNav.querySelectorAll("a");
            onPageNavItems.forEach(function (e) {
                e.style.visibility = "visible";
            });
        }

        // Remove/Show gated content.
        $('[data-audience="' + authenticationValueShow + '"]').show();
        $('[data-audience="' + authenticationValueRemove + '"]').detach();

    }

    // Toggles data-audience and other elements based on SSO status.
    function showAudienceSelectionContent(status) {
      var skipAudienceCheck = false;

        // The disableAudienceSelection flag is for users with the 'View any unpublished content' permission.
        // See rhd_admin moduel for how it is set in drupalSettings.
      if (drupalSettings.rhd_admin && drupalSettings.rhd_admin['disable-audience-selection-display']) {
        skipAudienceCheck = true;
        $('.assembly[data-audience]').css('display', 'block');
      }

      // The user is logged in.
      if (status == true) {

        // Hide and show the non-audience elements.
        $('li.login, li.register, li.login-divider, section.register-banner, .hidden-after-login').hide();
        $('section.contributors-banner, .shown-after-login, li.logged-in').show();

        if (!skipAudienceCheck) {
          $('[data-audience="authenticated"]').show();
          $('[data-audience="unauthenticated"]').hide();
        }
      }

      // The user is not logged in.
      if (status == false) {
        $('li.login, section.register-banner, .hidden-after-login').show();

        if (!skipAudienceCheck) {
          $('[data-audience="unauthenticated"]').show();
          $('[data-audience="authenticated"]').detach();
        }

        $('li.logged-in, section.contributors-banner, .shown-after-login').hide();
      }
    }

    function daysDiff(dt1, dt2) {
        return Math.floor(Math.abs(dt1 - dt2) / (1000 * 60 * 60 * 24))
    }

    function updateAnalytics(usr) {
        var ddUserAuthEvent = {
            eventInfo: {
                eventName: 'user data',
                eventAction: 'available',
                user: [{
                    profile: [{
                        profileInfo: usr
                    }]
                }],
                timeStamp: new Date(),
                processed: {
                    adobeAnalytics: false
                }
            }
        };

        // Push it onto the event array of the digitalData object.
        window.digitalData = window.digitalData || {};
        digitalData.event = digitalData.event || [];
        digitalData.event.push(ddUserAuthEvent);

        // Update digitalData.page.listing objects.
        digitalData.user = digitalData.user || [{ profile: [{ profileInfo: {} }] }];
        digitalData.user[0].profile[0].profileInfo = usr;
        //Create and dispatch an event trigger using the predefined function
        sendCustomEvent('ajaxAuthEvent');
    }

    function saveTokens() {
        if (keycloak.authenticated) {
            var tokens = { token: keycloak.token, refreshToken: keycloak.refreshToken };
            if (storageAvailable('localStorage')) {
                window.localStorage.token = JSON.stringify(tokens);
            } else {
                document.cookie = 'token=' + btoa(JSON.stringify(tokens));
            }
        } else {
            if (storageAvailable('localStorage')) {
                delete window.localStorage.token;
            } else {
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            }
        }
    }

    function loadTokens() {
        if (storageAvailable('localStorage')) {
            if (window.localStorage.token) {
                return JSON.parse(window.localStorage.token);
            }
        } else {
            var name = 'token=';
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];

                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }

                if (c.indexOf(name) == 0) {
                    return JSON.parse(atob(c.substring(name.length, c.length)));
                }
            }
        }
    }

    function clearTokens() {
        keycloak.clearToken();
        if (storageAvailable('localStorage')) {
            window.localStorage.token = "";
        } else {
            document.cookie = 'token=' + btoa("");
        }
    }

    function checkIfProtectedPage() {
        if ($('.protected').length) {
            if (!keycloak.authenticated) {
                keycloak.login();
            }
        }
    }

    var keycloak = Keycloak({
        url: app.ssoConfig.auth_url,
        realm: app.ssoConfig.realm,
        clientId: app.ssoConfig.client_id
    });
    app.keycloak = keycloak;

    var tokens = loadTokens();
    var init = { onLoad: 'check-sso', checkLoginIframeInterval: 10 };
    if (tokens) {
        init.token = tokens.token;
        init.refreshToken = tokens.refreshToken;
    }

    keycloak.onAuthLogout = updateUser;

    keycloak.init(init).success(function (authenticated) {
        updateUser(authenticated);
        saveTokens();
        checkIfProtectedPage();

        if (app.termsAndConditions) {
            // app.termsAndConditions.isDownloadPage() test for tcDownloadURL is not empty, tcDownloadFileName is not empty and tcSourceLink (contains 'download-manager')
            if (app.termsAndConditions.isDownloadPage()) {
                app.termsAndConditions.download();
            }
        }

    }).error(function () {
        updateUser();
    });
};

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return false;
    }
}

function getCookie(name) {
    var re = new RegExp('(?:(?:^|.*;\\s*)' + name + '\\s*\\=\\s*([^;]*).*$)|^.*$');
    return document.cookie.replace(re, "$1");
}

// Call app.sso() straight away.
if (typeof Keycloak !== 'undefined') {
    app.sso();
}

