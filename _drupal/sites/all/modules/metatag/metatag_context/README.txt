Metatag Context
---------------
This module is provides a Metatag reaction for Context [1], thus allowing meta
tags to be assigned to specific paths and other conditions.

Configuration can controlled via the normal Context UI module or the new admin
page available at: admin/config/search/metatags/context

Included with the module are default Context configurations that may be enabled
from the Context UI admin page and then customized as necessary. The included
configurations are:
  * user_login - for anonymous users accessing the user and user/login pages.
  * user_register - for anonymous users accessing the user registration page.
  * forum - for the main forum page from the Forum module. Topic pages are
    handled as regular nodes, sub-forum pages are handled as regular term pages.
  * blog - for the main blog page. Note: it does not cover the per-user blog
    pages too.


Credits
------------------------------------------------------------------------------
This module is based on the Context Metadata [2] module. The initial
development was by Marcin Pajdzik [3] (sponsored by Dennis Publishing [4]).


References
------------------------------------------------------------------------------
1: https://www.drupal.org/project/context
2: https://www.drupal.org/project/context_metadata
3: https://www.drupal.org/u/marcin-pajdzik
4: http://www.dennis.co.uk/
