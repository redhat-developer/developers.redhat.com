FontAwesome
-----------

To update FontAwesome:

1) Remove existing FontAwesome directory
2) Copy in new FontAwesome directory to `font-awesome/`
3) Remove `font-awesome/css/` and `font-awesome/less/` directories from the FontAwesome directory
4) Move `font-awesome/scss/font-awesome.scss` to `font-awesome/scss/_font-awesome.scss` so that it does not get copied to the generated site
