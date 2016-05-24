# Contributing to Red Hat Developers
This document covers the various ways that a contribution can be made to Red Hat Developers.
If you need any help understanding any of the steps, or you want to discuss you contribution, then [contact us](#contact).

# <a name="contact"></a> Contact the Red Hat Developers Team
* IRC: `#jboss-developer` room on the `irc.freenode.net` IRC server
* Mailing list: [Subscribe](https://lists.jboss.org/mailman/listinfo/jbossdeveloper) to the jbossdeveloper@lists.jboss.org mailing list.

## <a name="fixing"></a> Fixing an Issue
To fix an issue:

1. Assign the JIRA issue to yourself if it isn't already

2. [Fork](https://github.com/redhat-developer/developers.redhat.com/fork) the project. This creates the `developers.redhat.com` project in your own Git with the default remote name 'origin'.

3. Clone your fork. This creates and populates a directory in your local file system.

        git clone https://github.com/<your-username>/developers.redhat.com.git

4. Change to the `developers.redhat.com` directory.

5. Add the remote `upstream` repository so you can fetch any changes to the original forked repository.

        git remote add upstream https://github.com/jboss-developer/developers.redhat.com.git

6. Get the latest files from the `upstream` repository.

        git fetch upstream

7. Create a local topic branch to work with your new quickstart, features, changes, or fixes. 
   
        git checkout -b  <topic-branch-name>
   * If you are fixing a Bugzilla or JIRA, it is a good practice to use the number in the branch name. For new quickstarts or other fixes, try to use a good description for the branch name. 
   * The following are examples of Git checkout commands:

            git checkout -b DEVELOPER-123
            
8. Contribute new code or make changes to existing files.

9. Use the `git add` command to add new or changed file contents to the staging area.
     
10. Use the git status command to view the status of the files in the directory and in the staging area and ensure that all modified files are properly staged:

        git status      
          
11. Commit your changes to your local topic branch. Make sure you put the JIRA ID in the commit message. This is used by our CI automation to comment and transition the JIRA Issue.

        git commit -m 'DEVELOPER-123 Description of change...'
        
12. Update your branch with any changes made upstream since you started.
   * Fetch the latest changes from upstream

        git fetch upstream
        
   * Apply those changes to your branch
   
        git rebase upstream/master
        
   * If anyone has commited changes to files that you have also changed, you may see conflicts. 
   Resolve the conflicted files, add them using `git add`, and continue the rebase:
   
        git add <conflicted-file-name>
        git rebase --continue
        
   * If there were conflicts, it is a good idea to test your changes again to make they still work.
        
13. Push your local topic branch to your GitHub forked repository. This will create a branch on your Git fork repository with the same name as your local topic branch name. 

        git push origin HEAD            
   _Note:_ The above command assumes your remote repository is named 'origin'. You can verify your forked remote repository name using the command `git remote -v`.
   
14. Raise a Pull Request by:
 1. Visit https://github.com/redhat-developer/developers.redhat.com
 2. Click on the "Compare and Pull Request" button next to your topic branch.
 3. Review your code changes and check that only the commit(s) you expect are present.
 4. Check that the PR title contains the JIRA ID and a short description.
 5. Click "Create Pull Request"

The Pull request will then be reviewed by the Red Hat Developers team, and you may be requested to make changes. To make a change:

1. Ensure the clone on your computer is on the topic branch for this issue
2. Make the requested changes and commit them.
3. Push your branch to your fork on GitHub:

    git push origin DEVELOPER-123

4. Comment on the PR to indicate that you think you have made the requested changes.


## Developer Materials
Currently we have a number of different types of developer materials that can be searched from http://developers.redhat.com/resources and `http://developers.redhat.com/<product code>/learn`. These are described as follows:

1. Quickstarts. These demonstrate a small number of technologies in as simple a way as possible. The guidelines are quite strict around the structure and scope of the quickstarts. This makes it easier for the Red Hat Developer team to maintain the large quantity of quickstarts that we have and also gives the user a consistent experience. Currently we only support quickstarts that are located in one of the JBoss Developer quickstarts repositories on https://github.com/jboss-developer.
2. Demos. These are larger applications than quickstarts and don't have as strict guidelines. They can also be located in external repositories outside of the JBoss Developer GitHub organization.
3. Tutorials. These are much larger applications with thorough, high-quality documentation that steps the user through how to develop the application from scratch. Currently we just have [Ticket Monster](https://github.com/jboss-developer/ticket-monster) in this group. There are plans to add more in the future.

The following sections summarise how to contribute developer materials.

### How to Contribute a New Quickstart to an Existing Red Hat Developers Repository
To contribute a new Quickstart to Red Hat Developers:

1. Identify which Product or upstream Project it targets.
2. Find the appropriate quickstart repository. Most of the JBoss Product quickstart repositories are located in the [Jboss Developer GitHub organisation](https://github.com/jboss-developer). For example, see the [JBoss EAP quickstart repository](https://github.com/jboss-developer/jboss-eap-quickstarts).
3. Now follow the [Contribution guide](https://github.com/jboss-developer/jboss-developer-shared-resources/blob/master/guides/CONTRIBUTING.md).
4. The Quickstart will typically appear on the Red Hat Developers site shortly after the next Product or Project release containing your contribution.

### How to Contribute a Change to an Existing Quickstart
To contribute an update (e.g bug-fix, typo-fix etc) to an existing quickstart:

1. Follow the [Contribution guide](https://github.com/jboss-developer/jboss-developer-shared-resources/blob/master/guides/CONTRIBUTING.md).
2. The Quickstart change will appear on the Red Hat Developers site shortly after the next Product or Project release containing your contribution.

### How to contribute an Entire Repository of Quickstarts
If you have a repository of quickstarts that you think would be appropriate for Red Hat Developers, then [contact us](#contact).

### How to Contribute a New Demo
A demo is aimed more at demonstrating the features of a product, than at showing how to use a single API or use case. 
It is also more flexible in its structure and scope.
This is in contrast to a quickstart that must follow a very strict structure and needs to be limited to using a minimal amount of technologies.

See the [Demos contributing guide](https://github.com/jboss-developer/jboss-developer-demos/blob/master/CONTRIBUTING.md) for more details.


### How to Contribute a Tutorial
If you have a Tutorial that you think would be appropriate for Red Hat Developers, then [contact us](#contact).

### How to Contribute an Existing Vimeo or YouTube Video
This process is used for contributing details of a Vimeo or YouTube video.

#### To add a Vimeo video to the site:

1. Visit https://vimeo.com/
2. Login with the `JBoss Developer` account.
3. Browse to the video you want to add to the site.
4. Click on `+ Collections`
5. In the albums area, tick each product that the video is related to. Just tick the `Miscellaneous` if it relates to no product. __Note:__ You will see several albums, only those entitled `Red Hat JBoss ...` are product albums.
6. The video should appear on the site within 6 hours.
7. If the related product doesn't have a learn page yet, then raise a [JIRA issue](https://issues.jboss.org/secure/RHD/CreateIssue!default.jspa) requesting that the learn page be added for the product.

#### To add a YouTube video to the site:
If you don't yet have access to the `Red Hat Developers` YouTube account:

1. Visit https://plus.google.com/settings
2. Ensure `Email` is ticked on `Comunications about Google+ Pages -> Invites you to manage Google+ pages`
3. Email paul.robinson@redhat.com to request access
4. Accept the manager invite when you receive the email

Once you have access to the `Red Hat Developers` YouTube account:

1. Visit https://www.youtube.com/channel/UC7noUdfWp-ukXUlAsJnSm-Q/playlists
2. Switch to the `Red Hat Developers` account, using the account switcher in the top-right corner. 
3. Select the playlist for the product that the video relates to. Select the `Miscellaneous` playlist if it relates to no product.
4. Click `Add Videos`.
5. Find the video you want to add, and select it.
6. The video should appear on the site within 6 hours.
7. If the related product doesn't have a learn page yet, then raise a [JIRA issue](https://issues.jboss.org/secure/RHD/CreateIssue!default.jspa) requesting that the learn page be added for the product.


#### If you can't add the video yourself, create a JIRA issue:

1. Visit: https://issues.jboss.org/secure/RHD/CreateIssue!default.jspa
2. Select: Project="Red Hat Developer" and Issue Type = "Content Change"
3. Provide a summary
4. Provide a description, including:
4.1 The link to the video you want to add
4.2 The name of the JBoss product it relates to (if any)
5. Click `create`

### Updating Developer Materials Versions
Developer materials, such as quickstarts and tutorials (Ticket Monster) can be updated to use a new version by completing the following steps. 
EAP quickstarts are used here as an example:

1. Ensure that a tag exists for the new version in the quickstart repo. E.g. for EAP 6.2.0.GA there is [this quickstart tag](https://github.com/jboss-developer/jboss-eap-quickstarts/tree/6.2.0.GA).
2. [Create a JIRA issue](https://issues.jboss.org/secure/RHD/CreateIssue!default.jspa) for your change.
3. If you intend to make the change, assign to yourself. Otherwise leave unassigned and skip the following steps.
4. Go to your checkout of this repo and create a new branch for the change:

        git checkout -b DEVELOPER-123

4. Change to the directory containing the developer materials to update:

        cd _eap-quickstarts

5. Fetch the changes to the quickstart repo

        git fetch origin --tags

6. Checkout the new tag

        git checkout 6.2.0.GA

7. Move back to root directory

        cd ..

7. Add and commit the changes

        git add .
        git commit -m "DEVELOPER-123 Update EAP quickstarts t0 version 6.2.0.GA"

8. Push the branch to your fork of this repo. Assumed to be 'orgin'

        git push origin DEVELOPER-123

9. Go to GitHub and raise a PR for your change.

#### Updating Ticket Monster download version
If Ticket Monster has released a new version, the download link in `ticket-monster.adoc` and the documentation link in `_layouts/ticket-monster.html.slim` need to be manually updated as well. Follow the above process for creating a git branch and assigning a JIRA ticket. Open the `ticket-monster.adoc` file and find the correct `DOWNLOAD IT` link, retreive the new link from GitHub and modify the document. Then follow the above instructions for adding the change, pushing the branch and creating a new pull request.  


## How to Make Changes to the Product Pages
The product pages are those linked from http://developers.redhat.com/products.
This section covers the various contributions that can be made to these pages.

### How to Request a new product download

1. [Create a JIRA issue](https://issues.jboss.org/secure/RHD/CreateIssue!default.jspa) for the change request, specifying:
 1. The product and version to be released
 2. The `description` for the release. E.g: `Minor release of JBoss EAP 6.x series`
 3. The `tag_line` for the release. E.g: `Features an updated administrative console that includes a new homepage and exposes the new JBoss EAP patching feature.  Also includes domain recovery improvements and support for CDI injection with PicketLink.  Try it today!`
 4. The `date` of the release.
 5. The CDN links to each of the download files. E.g: ` /content/origin/files/sha256/3e/4ed3ea35b5c70f52ad8a7f2cdb40d3ab1a42752c1d3f5f78c76ed571f31g2c60/my_product.1.2.3.GA.zip`
 5. The date when you want this change to go live. Typically 'now', but in some case it might be a time in the future.
2. If the product download has a non-zero micro/patch version (e.g 2.0.1), then the Product Manager will need to approve the change.


### How to add a new product download

First add the downloads to the [Download Manager](http://developers.redhat.com/download-manager/).

The following steps are currently required, but will no longer be when the downloads are automatically fetched from the download manager.

1. Ensure the download is available in the [Download Manager](http://developers.redhat.com/download-manager).
2. Add a download item to the associated product's `product.yml` file. As an example here is [JBoss EAP's product.yml](https://github.com/redhat-developer/developers.redhat.com/blob/master/products/eap/_common/product.yml)
3. Update the `current_version:` field in the `product.yml` **only** if you are adding a GA release (i.e. not an Alpha or Beta).
4. Build the site locally
5. Visit the download page on your local build to verify the download is appearing correctly
6. Inspect each of the download links and paste the part after `http://developers.redhat.com/download-manager/file` into the associated `Short URL` field of the download item in the [Download Manager](http://developers.redhat.com/download-manager). Take a look at existing downloads for examples. Remember the preceding `/` character. 
7. [Raise a PR](#fixing) for your change.


### How to Highlight a particular Developer material
A particular developer material can be highlighted on each product's developer materials page.
For example, notice the banner visible on [the EAP Developer Materials page](http://developers.redhat.com/products/eap/learn/#!projectCode=eap).
To change this:

1. [Create a JIRA issue](https://issues.jboss.org/secure/RHD/CreateIssue!default.jspa) for your change. Include:
1.1 When you would like the new banner should go live, and when it should expire.
1.2 Any existing image or idea of what the image should look like.
1.3 The link to the developer material that should be associated with the image. This needs to be a link to the details page. See existing banners for examples.

On approval of the change:

1. Create a DESIGN issue to have a graphic created.
1.2 On completion of graphic creation, a link to the graphic (hosted on http://design.jboss.org/) should be added to the DEVELOPER issue.
2. Update the `featured_items` entry in the product's `product.yml` file (e.g. for EAP: `/products/eap/_common/product.yml`). Changing:
2.1 `image_url`: This is the address of the graphic created by the DESIGN JIRA issue and linked in the DEVELOPER issue.
2.2 `title`: The title of the item being linked to.
2.3 `text`: A short description of the item being linked to.
2.4 `url`: A url to the developer material's details page on developers.redhat.com.
3. [Raise a PR](#fixing) for your change.


### How to Make a General Change to The Product Pages
Other changes to the product pages should go through the following process.
Multiple changes should be done separately, rather than grouped together as one big change.
This makes it easier to discuss the changes individually and aids scheduling of non-trivial changes.
If you are requesting a series of text changes, then putting them in a single issue will probably be fine.

1. Raise a JIRA issue for the change request.
2. If you intend to make the code change, assign to yourself. Otherwise leave unassigned and skip the following steps.
3. The Product Marketing Manager (PMM) of the related product approves/rejects the change.
4. Make the changes to the code.
5. [Raise a PR](#fixing) for your change.
6. The PMM and Red Hat Developers team review the PR
7. The PR is merged.

### How to add/remove an item to the Training section
See the [EAP Product Overview Page](http://developers.redhat.com/products/eap/overview/) on the right-hand-side for an example of the training links.

1. Raise a [JIRA issue](https://issues.jboss.org/secure/RHD/CreateIssue!default.jspa) for the change request. Include:
 1. The link to the training overview page.
 2. The link text to display on the product overview page.
2. If you intend to make the code change, assign to yourself. Otherwise leave unassigned and skip the following steps.
3. Add the Link to the product's `featured_training.adoc` file. E.g. see [EAP's featured_training.adoc file](https://github.com/redhat-developer/developers.redhat.com/blob/master/products/eap/_common/featured_training.adoc).
4. [Raise a PR](#fixing) for your change.

### How to add/remove an item to the Webinars section
See the [EAP Product Overview Page](http://developers.redhat.com/products/eap/overview/) on the right-hand-side for an example of the Webinars links.

1. Raise a [JIRA issue](https://issues.jboss.org/secure/RHD/CreateIssue!default.jspa) for the change request. Include:
 1. The link to the Webinar overview page.
 2. The link text to display on the product overview page.
2. If you intend to make the code change, assign to yourself. Otherwise leave unassigned and skip the following steps.
3. Create a thumbnail image for the webinar and add it to the associated product's directory under `/images/products/`. You can probably grab a thumbnail from the webinar's details page.
4. Add the details to the product's `featured_webinar.adoc` file. E.g. see [EAP's featured_webinar.adoc file](https://github.com/redhat-developer/developers.redhat.com/blob/master/products/eap/_common/featured_webinar.adoc). Use existing links as an example of the format.
5. [Raise a PR](#fixing) for your change.


### How to add/remove an upstream project from the Community page
See the [EAP Community Page](http://developers.redhat.com/products/eap/overview/), towards the bottom is a list of all upstream projects included in this product. 
To add or remove from this list:

1. Raise a [JIRA issue](https://issues.jboss.org/secure/RHD/CreateIssue!default.jspa) for the change request. Include:
 1. The name of the project(s) to add/remove
 2. The name of the product you want modifying
2. If you intend to make the code change, assign to yourself. Otherwise leave unassigned and skip the following steps.
3. Edit the value of the `upstream_projects` key in the product's `product.yml` file. As an example, here is [JBoss EAP's product.yml](https://github.com/redhat-developer/developers.redhat.com/blob/master/products/eap/_common/product.yml)
4. [Raise a PR](#fixing) for your change.

### How to fix a broken link in an upstream project in Magnolia
Access to magnolia needs to be granted by an administrator before changes can be made to the project file. Super user status is required to make the necessary changes.

1. Raise a [JIRA issue](https://issues.jboss.org/secure/RHD/CreateIssue!default.jspa) for the change request. Include:
 1. The name of the project(s) to add/remove
 2. The name of the product you want modifying
2. If you intend to make the code change, assign to yourself. Otherwise leave unassigned and skip the following steps.
3. Log into magnolia and navigate to the project that contains the broken link
 1. Right click on the product and click open page.
 2. Select the edit button above the navigation bar (you may need to manipulate the css to see the edit button).
 3. Select the tab that contains the broke link.
 4. Remove the broken link and save your changes.
 5. From the magnolia admin console, highlight the product page that you changed and click "Activate changes"
4. Contact Paul Robinson and ask to have the cache reset.
5. Once the cache has been reset, check Blinkr report on a new PR to make sure invalid links were removed.

### How to add/remove 'Featured Video' to the 'Resources' page
Upto three videos can be added to the 'Featured Videos' area.
To add/remove them:

1. Open the "Featured Videos" sheet of the [Videos spreadsheet](https://docs.google.com/spreadsheets/d/1QbjVeU9avP8hcnaruiLtuanQVpkdClIYtgFSmaC_K9c/edit#gid=1504333800)
2. Find the product's column.
3. Notice the three available slots. Modify these slots, such that there is a URL to each video you want to be displayed on the page.
4. The change will take effect on the next site build. This is typically within a maximum of 6 hours.

### How to add/remove 'More Resources' to the 'Resources' page
To add/remove item(s) in the 'More Resources' area of the 'Resources' page:

1. Raise a [JIRA issue](https://issues.jboss.org/secure/RHD/CreateIssue!default.jspa) for the change request. Include:
 1. The URL of the resource to add/remove
 2. The text to appear in the link
 3. The text to appear in the short description
2. If you intend to make the code change, assign to yourself. Otherwise leave unassigned and skip the following steps.
3. Edit the product's `resources.adoc` file to add/remove the item. See [JBoss EAP's resources.adoc file](https://github.com/redhat-developer/developers.redhat.com/blob/master/products/eap/resources.adoc) for an example.
4. [Raise a PR](#fixing) for your change.


## Upstream Projects
The upstream projects page is located at http://developers.redhat.com/projects.
This section covers details on how to make changes to the data visible on this page.

## How to Add a New Upstream Project

1. Create a properties file for your project. For example, see the [Netty properties file](https://github.com/jboss-developer/project-properties/blob/master/netty.properties).
2. Upload the file to some externally visible location. For example, the projects source repository.
3. Send a link to the properties file to help@jboss.org, asking for it to be added to http://developers.redhat.com/projects.
4. Once the project appears on the projects page, check to see if it has an icon. If it doesn't, follow [these instructions](#icon) .

### How to Update an Upstream Project's details
If you provided a project properties file:

1. Make a change to the project's properties file.
2. Email help@jboss.org telling them that there is a change in the properties file that you would like reflecting on the `projects` page.

Otherwise, the data is being pulled from the project's Magnolia page:

1. Make the change on the project's Magnolia page.
2. Email help@jboss.org telling them that there is a change on the project's Magnolia page that you would like reflecting on the `projects` page.

### How to start using a project.properties file for an upstream project

By default, project data is pulled from the project's Magnolia page. To start using a project.properties file for your project:

1. Produce a properties file for your project and host it somewhere. For example, in GitHub.
 1. See the [Netty properties file](https://github.com/jboss-developer/project-properties/blob/master/netty.properties) for an example. 
 2. If your project is not on here: http://www-beta.jboss.org/projects/ and you think it should be, make sure to tell us when you submit your data.
 3. Send a url to your properties file to help@jboss.org


### <a name="icon"></a> How to Change an Upstream Project's Icon
To change the icon currently displayed for a project on http://developers.redhat.com/projects:

1. [Create a DESIGN JIRA issue](https://issues.jboss.org/secure/DESIGN/CreateIssue!default.jspa)
2. If you intend to do the following steps, assign to yourself. Otherwise leave unassigned and skip the following steps.
3. Create a new image for the project
4. Using the `design` account, upload it to the project's directory on filemgmt.jboss.org. For example, the AeroGear logo is located at: `filemgmt.jboss.org:/static_htdocs/aerogear/images/aerogear_200x150.png`. Take care to follow the exact format as the image links are generated.
5. Wait a short while for caches to clear before it appears on http://developers.redhat.com/projects.

## Other Site changes
This section covers miscellaneous contributions that can be made.

### How to add an Event
To have a new Event added to the Events page and (optionally) the homepage:

1. Open the [Events spreadsheet](https://docs.google.com/spreadsheets/d/12ZRFSz8TAay-GnNuF_5LipICmuns-HB_RcjGEPDi67k/edit#gid=1609962398)
  1. Scroll to the bottom and add a row for each event you want to add. Make sure you don't partially enter the event as the data will go live on the next build
  2. Wait for upto 6hrs and then check the event is present.

If you don't have access to the spreadsheet:

1. Raise a [JIRA issue](https://issues.jboss.org/secure/RHD/CreateIssue!default.jspa)

### How to Request a New Image to be Added to the Events Page Slider
1. [Create a JIRA issue](https://issues.jboss.org/secure/RHD/CreateIssue!default.jspa) for the change request, specifying the images’ URLs
  1. Images must be uploaded to filemgmt.jboss.org:/static_htdocs/_root/images/rhd/events
  2. One image must be desktop size: 1175px × 250px
  3. The second image must be mobile size: 480px × 500px
2. Specify the URL that the image must link to

Note: Please specify if the new slider image is supposed to replace one of the existing ones, or just to be added as an extra one.

### How to Add a New Image to the Events Page Slider
1. Create the two new PNG images: desktop size (1175px × 250px) and mobile size (480px × 500px)
2. Upload the images to filemgmt.jboss.org:/static_htdocs/_root/images/rhd/events
3. In GitHub, go [to the events template](https://github.com/redhat-developer/developers.redhat.com/blob/master/events.html.slim) and edit the image links under the desired .slide

        a(href="#{site.base_url}/events/msbuild/2016/")
          img.mobile(src=“http://static.jboss.org/PATH-TO-IMAGE” alt="ADD IMAGE ALT TEXT HERE")
          img.desktop(src=“http://static.jboss.org/PATH-TO-IMAGE” alt="ADD IMAGE ALT TEXT HERE")

4. Raise a pull request for your change.

### How to add a Event Card Graphic
In the event spreadsheet there are several event card graphics to choose from. This section describes how to add a new one. This process should be completed by the visual design team.

First, create the graphics and upload them:

1. Create two header PNG graphics. One for JBoss Developer (http://www.jboss.org/events) and one for Red Hat Developers (http://developers.redhat.com/events). NOTE: they MUST be PNG graphics, JPEG is not supported.
2. Upload the JBoss Developer graphic to `filemgmt.jboss.org:/static_htdocs/_root/images/events/event_<image id>.png`. It is important that you follow the same naming convention as used by the other images. This is because the page that will display the image uses this pattern to predict the image's URL.
3. Upload the Red Hat Developers graphic to `filemgmt.jboss.org:/static_htdocs/_root/images/rhd/events/event_<image id>.png`. It is important that you follow the same naming convention as used by the other images. This is because the page that will display the image uses this pattern to predict the image's URL.

Now update the Spreadsheet to make the new header graphic option available. 

1. Open the [Events spreadsheet](https://docs.google.com/spreadsheets/d/12ZRFSz8TAay-GnNuF_5LipICmuns-HB_RcjGEPDi67k/edit#gid=1609962398)
2. Select the *entire* image column, by clicking on the Column's label at the top. Most likely this will be 'F'.
3. Right-click on one of the selected cells and select 'Data Validation...'
4. Check 'Events!F:F' is set in the 'Cell Selection' field
5. Add the `<image id>` part of the image path to the `Criteria` field. Remember to prefix with a comma character. If you are confused, take a look at how the other images are configured.
6. Click `ok`
7. You should see a warning: `You’re trying to edit part of this sheet that shouldn’t be changed accidentally. Edit anyway?`. Select `OK` as this type of change is allowed.
8. Update the `image` field of any events that should use the new image.

This update will be visable after the next site build. Typically this takes upto 6hrs.

### How to add a book
To add a book to http://developers.redhat.com/books:

1. Check that Google Books knows about the book, by searching for the ISBN13 at http://books.google.com/ 
 1. If it doesn’t appear, the details will need filling in manually in a later step. Alternatively the author, or contributor, can work with the publisher as described [here](https://support.google.com/books/answer/43782?hl=en).
2. Open the [Books Spreadsheet]( https://docs.google.com/spreadsheets/d/1QdE32458GN8v-sDGOqoBx5RJ3X44P_W-umxsCHMxL0g/edit?usp=sharing) and add the ISBN13 for the book in the next cell in the list. 
 1. This spreadsheet can be shared with anyone who requests it using their Red Hat Google Drive account.
3. If the book is missing from http://books.google.com, or some specific data is missing/incorrect; the fields can be overridden in the spreadsheet row for the book.
3. Wait 6hrs and check http://developers.redhat.com/books to make sure the book appears.
 1. If it doesn't [Create a DEVELOPER JIRA issue](https://issues.jboss.org/secure/RHD/CreateIssue!default.jspa)

### How to fix data associated with a book
If a book entry on http://developers.redhat.com/books is missing data or is displaying incorrect data, then:

1. Open the [Books Spreadsheet]( https://docs.google.com/spreadsheets/d/1QdE32458GN8v-sDGOqoBx5RJ3X44P_W-umxsCHMxL0g/edit?usp=sharing) and add the ISBN13 for the book in the next cell in the list. 
 1. This spreadsheet can be shared with anyone who requests it using their Red Hat Google Drive account.
2. Find the book's row, keyed on ISBN13.
3. Fill in or change the data by adding it into the appropriate cell in the row.


### How to Change the Homepage Banner
To request a change to the banner on the homepage:

1. Raise a [JIRA issue](https://issues.jboss.org/secure/RHD/CreateIssue!default.jspa)
 1. Specify when you would like the new banner to go live, and when it should expire.
 2. If you have an existing image or an idea of what the image should look like, attach or link to it in the issue
 3. Provide the link that should be followed when the user clicks on the banner.

On approval of the change:

1. [Create a DESIGN JIRA issue](https://issues.jboss.org/secure/DESIGN/CreateIssue!default.jspa) to have a desktop and mobile banner graphic created.
2. On completion of graphic creation, a link to the graphic (hosted on http://design.jboss.org/) should be added to the DEVELOPER issue (created above).
2. To change the image:
  1. Add the mobile and desktop images to https://github.com/redhat-developer/developers.redhat.com/tree/master/images/branding
  2. Open https://github.com/redhat-developer/developers.redhat.com/blob/master/index.html.slim
  3. Change the '/ Hero Slider' section of the code:
    1. Each `.large-24.slide` section represents an individual banner in the carousel in the order it shows on the site.
    2. Either replace an existing item, or add a new one in the right place.
    3. Remember to remove any old images if you remove the item from the carousel.
    4. Remember to set the link, image and alt text for the banner you are adding.
3. [Raise a PR](#fixing) for your change.

### How to Request a Change to One of the Homepage Promo Items
The homepage’s Promo Items are the five items located under the main hero in the homepage. Each one has an image, a URL to link to, and a small description or caption.

1. [Create a JIRA issue](https://issues.jboss.org/secure/DEVELOPER/CreateIssue!default.jspa) for the change request, specifying:
  1. The URL for the image. Note: the image must be uploaded to filemgmt.jboss.org:/static_htdocs/_root/images/rhd/promo
  2. The text that will be placed below the image.
  3. The URL to the page that will be linked from the image and the text below it.
2. If the person creating the Jira issue is not the same person who will be reviewing the change, please specify who the reviewer will be.

### How to Change One of the Homepage Promo Items
1. Create the PNG image 465px × 300px
2. Upload it to filemgmt.jboss.org:/static_htdocs/_root/images/rhd/promo
3. Go to the ‘spotlights-container’ section in  the [homepage's layout](https://github.com/redhat-developer/developers.redhat.com/blob/master/index.html.slim)
4. Edit the promo item that will be replaced. Update the URL to the page that will be linked from the image, the text below the image, and the URL to the image

        a.spotlight-item href='#{site.base_url}/path/to/site'
          img(src=”LINK TO IMAGE” alt="UPDATE THE IMAGES ALT TEXT")
          span TEXT UNDER THE IMAGE GOES HERE
5. Raise a pull request for your change.


### How to Request a Change in the Homepage Featured Content Section
[Create a JIRA issue](https://issues.jboss.org/secure/DEVELOPER/CreateIssue!default.jspa) for the change request, specifying:

1. Date, title, author
2. Type (article-blog, book, or video)
3. Link to the thumbnail image. Note: the image must be uploaded to filemgmt.jboss.org:/static_htdocs/_root/images/rhd/feature
4. The text that will be placed next to the image.
5. The URL to the page that will be linked from the image and the text below it.

### How to Change One of the Items in the Homepage Featured Content Section
1. Open the [Featured Content spreadsheet](https://docs.google.com/spreadsheets/d/1al_cs2glMaSBymmNFCiy1OboxAD6jv3YAwB1FrMVffE/edit#gid=1609962398)
  1. If you don't have access to the spreadsheet: [Create a JIRA issue](https://issues.jboss.org/secure/DEVELOPER/CreateIssue!default.jspa)
2. To add a new Featured Content item, create a new row and fill out all of the fields in the row (Date, Title, Type, Author, URL, Thumbnail, Description). 
Make sure you don't partially fill out the fields as the data will go live on the next build.
3. Wait for upto 6hrs and then check the new item is present in the homepage.

Note: only the first three row items will be displayed on the homepage, so one of the rows already in the spreadsheet will need to be removed/replaced.

## How to Create a 'Solution'
The simplest way to create a solution is to use the default template and drop in pieces of text and images into the place-holders. Look at the [example solution code](https://github.com/redhat-developer/developers.redhat.com/commit/980430df61951bd6f77ea6cadf1c6a065ac711cb) for what is required.

See the [Unified Push Solution's code](https://github.com/redhat-developer/developers.redhat.com/tree/master/solutions/unifiedpush) for an example that uses an entirely custom layout. The [Docker Solution code](https://github.com/redhat-developer/developers.redhat.com/blob/master/solutions/docker/index.adoc) provides an example of where the default layout was used, but with an additional custom layout section at the bottom. Look at the [live Docker page](http://developers.redhat.com/docker/) and notice that above the "Available Docker Images" title is using the default layout and under this title is a custom layout.

To create a solution:

1. Create your initial layout by copying the [example solution code](https://github.com/redhat-developer/developers.redhat.com/commit/980430df61951bd6f77ea6cadf1c6a065ac711cb).
2. Think of an ID for your solution. This will be used to identify it in several place and will become part of the URL of its page. E.g: http://developers.redhat.com/mysolution.
  1. Good names are short, descriptive and contain just lower-case alpha-numeric characters.
2. Rename the solution's directory to that of your solution:
    mv ./solution/example ./solution/mysolution
3. Modify the example Solution to create your solution. See below for documentation on what can be edited.
4. When your solution is ready for review, [raise a PR](#fixing) for your change.

### The `solution.yml` file
This file is used to configure various aspects of your solution.

The following table describes the purpose of each key. __Note:__ items marked with a (*) are required.

|Key|Value|
|----|-------|
|name*|The name is used as a short title to identify your solution in a variety of places on the site. Keep it short and human readable. 
|sub_title|An optional sub-title that will appear under the main title on the Solution's main page.
|long_description*|A long description to show when the user clicks on the Solution in the [all Solutions page](http://developers.redhat.com/solutions/).
|overview_links|An optional list of links to show when the user clicks on the Solution in the [all Solutions page](http://developers.redhat.com/solutions/).
|speech_bubble|An optional speech bubble to show towards the top of the Solution's main page. 
|image_link|An optional link to display under the Solution's logo towards the top of the Solution's main page.
|related_solutions|An optional list of related solutions to show down the right-hand side of the Solution's main page. Solution IDs are used to identify each related Solution.

### The `index.adoc` File
This file provides the majority of the content to that is displayed on the Solution's main page. A default layout is used.

Note that level two headings (identified by the preceding '==') are keys used to identify fragments of content. Headings at a greater level than two (E.g '===') can be used to place headings in your content. The following table describes the purpose of each key. __Note:__ all items are optional.

|Key|Value|
|----|-------|
|Overview|Content to replace the 'speech bubble' if it was removed from the `solution.yml` file.
|Left Section|Content to be placed in the left-hand side of the double column area. 
|Right Section|Content to be placed in the right-hand side of the double column area. 
|Extra Section Title| The title to use for an extra section that is displayed under the double column area
|Extra Section|The content to place under the extra section title

_Note:_ The solution logo will only appear on the Solution's main page if either the 'speech bubble' or 'overview text' is provided. 

### Custom Layouts
Custom layouts can be added below the content displayey by the default template. This is automatically added when the Solution's template is present. For example, create:  `_partials/solution-partial-mysolution.html.slim`. See the other  `_partials/solution-partial-*.html.slim` files for examples.

You can fully customise the layout of the Solution's main page by removing all the optional sections from the `index.adoc` file and the `speech_bubble` from the `solution.yml` file and then provide a layout file in the `_partials` directory.

## How to create a Microsite
Microsites can either be single paged or multi-paged. Take a look at the following mockups to see which variation meets your needs. 

|Type|Description|Resources|
|----|-----------|---------|
|Single Page|A single page microsite, with no sub-navigation|[Live](http://developers.redhat.com/microsite), [Source](https://github.com/redhat-developer/developers.redhat.com/blob/master/microsite.html.slim)
|Multi-page|A multiple-page microsite with a single level of sub-navigation|[Live](http://developers.redhat.com/microsite-multi-page/), [Source](https://github.com/redhat-developer/developers.redhat.com/blob/master/microsite-multi-page.html.slim)

Before creating a Microsite, please [contact us](#contact) to ensure that a 'Microsite' is the right place for your content.

### Microsite Constraints
The following constraints are imposed on Red Hat Developers Microsites in order to retain consistency and to make them fit within the Red Hat Developers brand.

1. The Red Hat Developers header must remain present
2. Microsites may have 0 or 1 levels of navigation. 

### Single Page Microsites
To create a new single page microsite at `developers.redhat.com/<microsite_id>`:

1. Copy `microsite.html.slim` to `<microsite_id>.html.slim`
2. [Configure the banner graphic](#banner)
3. Edit the page further to suite your needs
4. When your microsite is ready for review, [raise a PR](#fixing) for your change.

### Multiple Page Microsites

To create a new multi-page microsite at `developers.redhat.com/<microsite_id>`:

1. Create a `<microsite_id>` directory
2. Copy `microsite-multi-page.html.slim` to `<microsite_id>/index.html.slim`
3. [Configure the banner graphic](#banner)
4. Edit the `nav:` section of `<microsite_id>/index.html.slim` to specify the navigation to each of the sub pages
5. Make a copy of  `<microsite_id>/index.html.slim` for each of the sub-pages. E.g. `<microsite_id>/my_subpage.html.slim`.
  1. Ensure the sub-pages match those specified in the navigation.
6. Edit the pages further to suite your needs
7. When your microsite is ready for review, [raise a PR](#fixing) for your change.

### <a name="banner"></a> Configure the Banner Graphic

1. Create a 2000x500 pixel banner graphic and place it at `/images/<microsite_id>/<microsite_id>_microsite_hero.jpg`
2. Create a Sass Stylesheet at `stylesheets/_<microsite_id>.scss`. You can add your own styles here, but do so with care as this stylesheet will be loaded for the entire Red Hat Developers site. Minimally, this stylesheet needs to specify the banner graphic and should contain the following. Replace the `<microsite_id>` text with the id of your Microsite. 

        .wide-hero.<microsite_id> {
                background: cdn('../images/<microsite_id>/<microsite_id>_microsite_hero.jpg');
        }

3. Import the stylesheet into `stylesheets/app.scss` by adding the following import line after the existing imports:

        @import "<microsite_id>";

4. Add the following line to the header section of `<microsite_id>.html.slim` (for single page microsites) or `<microsite_id>/index.html.slim` for multi-page microsites. 

        hero_class: <microsite_id>


## General changes
If you have a general change that doesn't fall into the categories above, create a [JIRA issue](https://issues.jboss.org/secure/RHD/CreateIssue!default.jspa).

## Images

1. Images below 20kb should normally be saved as PNGs. The site build automatically compresses PNGs, so just save the PNG out.
2. Images above 20kb should normally be saved as JPEGs, however if you have a text, or line, heavy image, consider using a PNG - save both and look at the file size. The site build does not automatically compress JPEGs, so run them through kraken.io first.
3. Images should normally be 100kb or less.

## General Feedback
[contact us](#contact) for general feedback that doesn't constitute a bug report or feature request.

## Feature Requests and Bug reporting
If you find a bug on developers.redhat.com or if you have a feature request, please file a [JIRA issue](https://issues.jboss.org/secure/RHD/CreateIssue!default.jspa).
