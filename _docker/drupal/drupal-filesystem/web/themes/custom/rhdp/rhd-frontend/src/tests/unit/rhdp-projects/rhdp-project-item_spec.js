"use strict";
// RHDP Project Items Component Unit Tests
describe('RHDP Project Items Component', function() {
    var wc;

    beforeEach(function() {
        wc = new RHDPProjectItem();
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });

    describe('properties', function() {

        beforeEach(function() {
            document.body.appendChild(wc);
        });

        it('should update all attributes', function() {
            var imageUrl = 'http://imageUrl.com',
            projectName = 'Test Project',
            downloadsLink = 'http://downloadsLink.com',
            sys_url_view = 'http://sysurlview.com',
            twitterLink = 'http://twitterLink.com',
            descriptions = 'http://descriptions.com',
            docsLink = 'http://docsLink.com',
            issueTracker = 'http://issueTracker.com',
            githubLink = 'http://githubLink.com',
            communityLink = 'http://communityLink.com',
            knowledgebaseLink = 'http://knowledgebaseLink.com',
            userForumLink = 'http://userForumLink.com',
            devForumLink = 'http://devForumLink.com',
            mailingListLink = 'http://mailingListLink.com',
            chatLink = 'http://chatLink.com',
            blogLink = 'http://blogLink.com',
            jiraLink = 'http://jiraLink.com',
            srcLink = 'http://srcLink.com',
            anonymousLink = 'http://anonymousLink.com',
            commiterLink = 'http://commiterLink.com',
            fisheyeLink = 'http://fisheyeLink.com',
            viewvcLink = 'http://viewvcLink.com',
            committerGitLink = 'http://committerGitLink.com',
            buildLink = 'http://buildLink.com',
            hudsonLink = 'http://hudsonLink.com';
            wc.imageUrl = imageUrl;
            wc.projectName = projectName;
            wc.downloadsLink = downloadsLink;
            wc.sys_url_view = sys_url_view;
            wc.twitterLink = twitterLink;
            wc.descriptions = descriptions;
            wc.docsLink = docsLink;
            wc.issueTracker = issueTracker;
            wc.githubLink = githubLink;
            wc.communityLink = communityLink;
            wc.knowledgebaseLink = knowledgebaseLink;
            wc.userForumLink = userForumLink;
            wc.devForumLink = devForumLink;
            wc.mailingListLink = mailingListLink;
            wc.chatLink = chatLink;
            wc.blogLink = blogLink;
            wc.jiraLink = jiraLink;
            wc.srcLink = srcLink;
            wc.anonymousLink = anonymousLink;
            wc.commiterLink = commiterLink;
            wc.fisheyeLink = fisheyeLink;
            wc.viewvcLink = viewvcLink;
            wc.committerGitLink = committerGitLink;
            wc.buildLink = buildLink;
            wc.hudsonLink = hudsonLink;

            expect(wc.imageUrl).toEqual(imageUrl);
            expect(wc.projectName).toEqual(projectName);
            expect(wc.downloadsLink).toEqual(downloadsLink);
            expect(wc.sys_url_view).toEqual(sys_url_view);
            expect(wc.twitterLink).toEqual(twitterLink);
            expect(wc.descriptions).toEqual(descriptions);
            expect(wc.docsLink).toEqual(docsLink);
            expect(wc.issueTracker).toEqual(issueTracker);
            expect(wc.githubLink).toEqual(githubLink);
            expect(wc.communityLink).toEqual(communityLink);
            expect(wc.knowledgebaseLink).toEqual(knowledgebaseLink);
            expect(wc.userForumLink).toEqual(userForumLink);
            expect(wc.devForumLink).toEqual(devForumLink);
            expect(wc.mailingListLink).toEqual(mailingListLink);
            expect(wc.chatLink).toEqual(chatLink);
            expect(wc.blogLink).toEqual(blogLink);
            expect(wc.jiraLink).toEqual(jiraLink);
            expect(wc.srcLink).toEqual(srcLink);
            expect(wc.anonymousLink).toEqual(anonymousLink);
            expect(wc.commiterLink).toEqual(commiterLink);
            expect(wc.fisheyeLink).toEqual(fisheyeLink);
            expect(wc.viewvcLink).toEqual(viewvcLink);
            expect(wc.committerGitLink).toEqual(committerGitLink);
            expect(wc.buildLink).toEqual(buildLink);
            expect(wc.hudsonLink).toEqual(hudsonLink);

        });
        it('should get expected results from class functions', function() {
            expect(wc.getCorrectUrl('/test/url')).toEqual("https://developers.redhat.com/test/url");
            expect(wc.getCorrectUrl(['/test/url'])).toEqual("https://developers.redhat.com/test/url");
            expect(wc.generateViewLink('https://developers.redhat.com/test/url')).toEqual("developers.redhat.com/test/url");

        });
    });
    describe('innerHTML', function() {
        var imageUrl = 'http://imageUrl.com/',
            projectName = 'Test Project',
            downloadsLink = 'http://downloadsLink.com/',
            sys_url_view = 'http://sysurlview.com/',
            twitterLink = 'http://twitterLink.com/',
            descriptions = 'http://descriptions.com/',
            docsLink = 'http://docsLink.com/',
            issueTracker = 'http://issueTracker.com/',
            githubLink = 'http://githubLink.com/',
            communityLink = 'http://communityLink.com/',
            knowledgebaseLink = 'http://knowledgebaseLink.com/',
            userForumLink = 'http://userForumLink.com/',
            devForumLink = 'http://devForumLink.com/',
            mailingListLink = 'http://mailingListLink.com/',
            chatLink = 'http://chatLink.com/',
            blogLink = 'http://blogLink.com/',
            jiraLink = 'http://jiraLink.com/',
            srcLink = 'http://srcLink.com/',
            anonymousLink = 'http://anonymousLink.com/',
            commiterLink = 'http://commiterLink.com/',
            fisheyeLink = 'http://fisheyeLink.com/',
            viewvcLink = 'http://viewvcLink.com/',
            committerGitLink = 'http://committerGitLink.com/',
            buildLink = 'http://buildLink.com/',
            hudsonLink = 'http://hudsonLink.com/';

        beforeEach(function() {
            wc.imageUrl = imageUrl;
            wc.projectName = projectName;
            wc.downloadsLink = downloadsLink;
            wc.sys_url_view = sys_url_view;
            wc.twitterLink = twitterLink;
            wc.descriptions = descriptions;
            wc.docsLink = docsLink;
            wc.issueTracker = issueTracker;
            wc.githubLink = githubLink;
            wc.communityLink = communityLink;
            wc.knowledgebaseLink = knowledgebaseLink;
            wc.userForumLink = userForumLink;
            wc.devForumLink = devForumLink;
            wc.mailingListLink = mailingListLink;
            wc.chatLink = chatLink;
            wc.blogLink = blogLink;
            wc.jiraLink = jiraLink;
            wc.srcLink = srcLink;
            wc.anonymousLink = anonymousLink;
            wc.commiterLink = commiterLink;
            wc.fisheyeLink = fisheyeLink;
            wc.viewvcLink = viewvcLink;
            wc.committerGitLink = committerGitLink;
            wc.buildLink = buildLink;
            wc.hudsonLink = hudsonLink;

            document.body.appendChild(wc);
        });

        it('should have text in innerHTML', function() {

            expect(wc.innerHTML.length).toBeGreaterThan(0);

        });
        it('should have all attributes populated with text', function() {
            var projectsListHTML = wc.querySelector('.project-details-list').querySelectorAll('li');

            expect(wc.querySelector('.image-link img').src).toEqual(imageUrl.toLowerCase());
            expect(wc.querySelector('.image-link img').alt).toEqual(projectName);
            expect(wc.querySelector('.solution-name-link').innerText).toEqual(projectName);
            expect(wc.querySelectorAll('a.link-sm')[1].href).toEqual(downloadsLink.toLowerCase());
            expect(wc.querySelector('.project-content.row .large-6.project-content-left img').src).toEqual(imageUrl.toLowerCase());
            expect(wc.querySelector('.project-content.row .large-6.project-content-left img').alt).toEqual(projectName);
            expect(wc.querySelector('.upstream-download').href).toEqual(downloadsLink.toLowerCase());
            expect(wc.querySelectorAll('.project-content.row p a')[1].href).toEqual(sys_url_view.toLowerCase());
            expect(wc.querySelector('.project-social a').href).toEqual(twitterLink.toLowerCase());
            expect(wc.querySelector('.large-18.project-content-right.columns a').href).toEqual(sys_url_view.toLowerCase());
            expect(wc.querySelector('.large-18.project-content-right.columns a').innerText).toEqual(projectName);
            expect(wc.innerText).toContain(descriptions);
            expect(projectsListHTML[0].innerHTML).toEqual('Docs: <a href="http://docsLink.com/">Documentation</a>');
            expect(projectsListHTML[1].innerHTML).toEqual('Community: <a href="http://communityLink.com/">communityLink.com/ <i class="fas fa-external-link"></i></a>');
            expect(projectsListHTML[2].innerHTML).toEqual('Mailing List: <a href="http://mailingListLink.com/">mailingListLink.com/ <i class="fas fa-external-link"></i></a>');
            expect(projectsListHTML[3].innerHTML).toEqual('Chat: <a href="http://chatLink.com/">chatLink.com/ <i class="fas fa-external-link"></i></a>');
            expect(projectsListHTML[4].innerHTML).toEqual('JIRA: <a href="http://jiraLink.com/">jiraLink.com/ <i class="fas fa-external-link"></i></a>');
            expect(projectsListHTML[5].innerHTML).toEqual('Source: <a href="http://srcLink.com/">srcLink.com/ <i class="fas fa-external-link"></i></a>');
            expect(projectsListHTML[6].innerHTML).toEqual('Github: <a href="http://githubLink.com/">githubLink.com/ <i class="fas fa-external-link"></i></a>');
            expect(projectsListHTML[7].innerHTML).toEqual('Build: <a href="http://buildLink.com/">buildLink.com/ <i class="fas fa-external-link"></i></a>');
            expect(projectsListHTML[8].innerHTML).toEqual('Issue: <a href="http://issueTracker.com/">issueTracker.com/ <i class="fas fa-external-link"></i></a>');
            expect(projectsListHTML[9].innerHTML).toEqual('User Forum: <a href="http://userForumLink.com/">userForumLink.com/ <i class="fas fa-external-link"></i></a>');
            expect(projectsListHTML[10].innerHTML).toEqual('Dev Forum: <a href="http://devForumLink.com/">devForumLink.com/ <i class="fas fa-external-link"></i></a>');
            expect(projectsListHTML[11].innerHTML).toEqual('KnowledgeBase: <a href="http://knowledgebaseLink.com/">knowledgebaseLink.com/ <i class="fas fa-external-link"></i></a>');
            expect(projectsListHTML[12].innerHTML).toEqual('Blog: <a href="http://blogLink.com/">blogLink.com/ <i class="fas fa-external-link"></i></a>');
            expect(projectsListHTML[13].innerHTML).toEqual('Anonymous Source: <a href="http://anonymousLink.com/">anonymousLink.com/ <i class="fas fa-external-link"></i></a>');

        });
    });
});