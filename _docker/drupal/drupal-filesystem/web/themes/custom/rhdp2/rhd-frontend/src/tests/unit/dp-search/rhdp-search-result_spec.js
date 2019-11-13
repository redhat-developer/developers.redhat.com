"use strict";
// Test rhdp-search-result component

describe('Search Result', function() {
    var wc;
    var sys_types = {
        solution: "Knowledge Base",
        blogpost: "Blog",
        forumthread: "Forum",
        stackoverflow_thread: "Stack Overflow",
        quickstart: "Quickstart",
        webpage: "Web Page",
        video: "Video",
        book: "Book"
    };
    var testResult;
    beforeEach(async () => {
        await System.import('./base/src/docs/static/js/@rhd/rhdp-search/rhdp-search-result.js').then(() => {
            testResult = {
                fields: {
                    sys_content_plaintext: ['Test Plain Text'],
                    sys_contributors: ['Test Contributor <test.contributor@redhat.com>'],
                    contributors: ["test.contributor@redhat.com"],
                    duration: [690],
                    sys_created: [new Date('2001-02-03T15:35:33.000Z')],
                    sys_description: ["Test Description"],
                    level: ["Beginner"],
                    thumbnail: ["https://i.ytimg.com/vi/yiJeXw3saM8/mqdefault.jpg"],
                    experimental: [false],
                    sys_tags: ["tag1", "tag2", "tag3"],
                    github_repo_url: ["https://github.com/jboss-fuse/quickstarts"],
                    target_product: ["fuse"],
                    sys_title: ["Test Title"],
                    sys_type: ["blogpost"],
                    sys_url_view: ["https://developers.redhat.com/blog"]
                },
                highlight: {
                    sys_description: [
                        'Test <span class="hlt">Highlight</span> Description 1',
                        'Test <span class="hlt">Highlight</span> Description 2'
                    ],
                    sys_title: [
                        'Test <span class="hlt">Highlight</span> Title'
                    ],
                    sys_content_plaintext: [
                        'Test <span class="hlt">Highlight</span> Plain Text 1',
                        'Test <span class="hlt">Highligh</span> Plain Text 2'
                    ]
                }
            };
            wc = document.createElement('rhdp-search-result');
            document.body.insertBefore(wc, document.body.firstChild);
        });
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });

    xit('should have a created date from resultset', function() {
        wc.result = testResult;
        setTimeout(function() {
            expect(wc.shadowRoot.querySelector('rh-datetime').innerHTML).toEqual('February 3, 2001');
        }, 500);
    });

    it('should have a sys_url_view', function() {
        wc.result = testResult;

        expect(wc.url).toEqual(testResult.fields.sys_url_view);
    });

    describe('Title', function() {
        it('should match highlight.sys_title if present', function() {
            wc.result = testResult;
            expect(wc.title).toEqual(testResult.highlight.sys_title[0]);
        });

        it('should match fields.sys_title by default', function() {
            delete testResult.highlight.sys_title;
            wc.result = testResult;
            expect(wc.title).toEqual(testResult.fields.sys_title[0]);
        });
    });

    describe('Description', function() {
        var tempDiv = document.createElement("div");

        it('should match highlights.sys_description if present', function() {
            wc.result = testResult;

            tempDiv.innerHTML = testResult.highlight.sys_description[0];
            var sanitizedDescription = tempDiv.innerText;

            expect(wc.description).toEqual(sanitizedDescription);
        });

        it('should match highlights.sys_plaintext if present without h.sys_description', function() {
            delete testResult.highlight.sys_description;
            wc.result = testResult;

            tempDiv.innerHTML = testResult.highlight.sys_content_plaintext[0];
            var sanitizedDescription = tempDiv.innerText;

            expect(wc.description).toEqual(sanitizedDescription);
        });

        it('should match fields.sys_description by default', function() {
            delete testResult.highlight.sys_content_plaintext;
            delete testResult.highlight.sys_description;
            wc.result = testResult;

            tempDiv.innerHTML = testResult.fields.sys_description[0];
            var sanitizedDescription = tempDiv.innerText;

            expect(wc.description).toEqual(sanitizedDescription);
        });
    });

    describe('Result Types', function() {
        it('should have "Video" for the corresponding result types', function() {
            var typeTxt = 'Video',
                typeReturn = ['video', 'jbossdeveloper_vimeo', 'jbossdeveloper_youtube'],
                len = typeReturn.length,
                i;
            for (i=0; i < len; i++) {
                testResult.fields.sys_type = [typeReturn[i]];
                wc.result = testResult;
                expect(wc.kind).toEqual(typeTxt);
            }
        });

        it('should have "Blog Post" for the corresponding result types', function() {
            var typeTxt = 'Blog Post',
                typeReturn = ['blogpost', 'jbossorg_blog'],
                len = typeReturn.length,
                i;
            for (i=0; i < len; i++) {
                testResult.fields.sys_type = [typeReturn[i]];
                wc.result = testResult;
                expect(wc.kind).toEqual(typeTxt);
            }
        });

        it('should have "Article" for the right result types', function() {
            var typeTxt = 'Article',
                typeReturn = ['article', 'solution', 'rht_knowledgebase_article', 'rht_knowledgebase_solution'],
                len = typeReturn.length,
                i;
            for (i=0; i < len; i++) {
                testResult.fields.sys_type = [typeReturn[i]];
                wc.result = testResult;
                expect(wc.kind).toEqual(typeTxt);
            }
        });

        it('should have "Demo" for the corresponding result types', function() {
            var typeTxt = 'Demo',
                typeReturn = ['demo', 'jbossdeveloper_demo', 'quickstart_early_access'],
                len = typeReturn.length,
                i;
            for (i=0; i < len; i++) {
                testResult.fields.sys_type = [typeReturn[i]];
                wc.result = testResult;
                expect(wc.kind).toEqual(typeTxt);
            }
        });

        it('should have "Event" for the corresponding result types', function() {
            var typeTxt = 'Event',
                typeReturn = ['event', 'jbossdeveloper_event'],
                len = typeReturn.length,
                i;
            for (i=0; i < len; i++) {
                testResult.fields.sys_type = [typeReturn[i]];
                wc.result = testResult;
                expect(wc.kind).toEqual(typeTxt);
            }
        });

        it('should have "Quickstart" for the corresponding result types', function() {
            var typeTxt = 'Quickstart',
                typeReturn = ['quickstart', 'jbossdeveloper_quickstart'],
                len = typeReturn.length,
                i;
            for (i=0; i < len; i++) {
                testResult.fields.sys_type = [typeReturn[i]];
                wc.result = testResult;
                expect(wc.kind).toEqual(typeTxt);
            }
        });

        it('should have "Quickstart" for the corresponding result types', function() {
            var typeTxt = 'Quickstart',
                typeReturn = ['quickstart', 'jbossdeveloper_quickstart'],
                len = typeReturn.length,
                i;
            for (i=0; i < len; i++) {
                testResult.fields.sys_type = [typeReturn[i]];
                wc.result = testResult;
                expect(wc.kind).toEqual(typeTxt);
            }
        });

        it('should have "Forum Thread" for the corresponding result types', function() {
            var typeTxt = 'Forum Thread',
                typeReturn = ['forumthread', 'jbossorg_sbs_forum'],
                len = typeReturn.length,
                i;
            for (i=0; i < len; i++) {
                testResult.fields.sys_type = [typeReturn[i]];
                wc.result = testResult;
                expect(wc.kind).toEqual(typeTxt);
            }
        });

        it('should have "Stack Overflow" for the corresponding result types', function() {
            var typeTxt = 'Stack Overflow',
                typeReturn = ['stackoverflow_thread', 'stackoverflow_question'],
                len = typeReturn.length,
                i;
            for (i=0; i < len; i++) {
                testResult.fields.sys_type = [typeReturn[i]];
                wc.result = testResult;
                expect(wc.kind).toEqual(typeTxt);
            }
        });

        it('should have "Web Page" for the corresponding result types', function() {
            var typeTxt = 'Web Page',
                typeReturn = ['webpage', ''],
                len = typeReturn.length,
                i;
            for (i=0; i < len; i++) {
                testResult.fields.sys_type = [typeReturn[i]];
                wc.result = testResult;
                expect(wc.kind).toEqual(typeTxt);
            }
        });

        describe('should have "Book" for the corresponding result types', function () {
            it('all books', function () {
                var typeTxt = 'Book',
                    typeReturn = ['book'],
                    len = typeReturn.length,
                    i;
                for (i = 0; i < len; i++) {
                    testResult.fields.sys_type = [typeReturn[i]];
                    wc.result = testResult;
                    expect(wc.kind).toEqual(typeTxt);
                }
            });

            it('externally hosted books', function () {
                var typeTxt = 'foo bar';
                testResult.fields.sys_type = 'book';

                testResult.fields.field_book_url = typeTxt;
                wc.result = testResult;
                expect(wc.url).toEqual(typeTxt);
            });

            it('book with an empty field_book_url', function () {
                testResult.fields.sys_type = 'book';

                testResult.fields.field_book_url = '';
                wc.result = testResult;
                expect(wc.url).toEqual(testResult.fields.sys_url_view);
            });
        });
    });
});