System.register([], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };
    var RHDPProjectItem, templateObject_1, templateObject_2, templateObject_3;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            RHDPProjectItem = (function (_super) {
                __extends(RHDPProjectItem, _super);
                function RHDPProjectItem() {
                    var _this = _super.call(this) || this;
                    _this.template = function (strings, project) {
                        return "\n        \n            <div class=\"defaultprojectimage\">\n                <p class=\"image-link\"><img src=\"" + project.imageUrl + "\" alt=\"" + project.projectName + "\"></p></div>\n            <h5 class=\"solution-name\">\n                <p class=\"solution-name-link\">" + project.projectName + "</p>\n            </h5>\n            <p>\n        \n            </p>\n            <a class=\"solution-overlay-learn link-sm\">Learn more</a> " + (project.downloadsLink ? "| <a href=\"" + project.downloadsLink + "\" class=\"link-sm\">Download</a>" : '') + "\n            <div class=\"project-content row\">\n                <div class=\"large-6 project-content-left columns\"><img\n                        src=\"" + project.imageUrl + "\" alt=\"" + project.projectName + "\">\n                    <p><a class=\"upstream-download\" href=\"" + project.downloadsLink + "\"><i class=\"fa fa-download\"></i> Download</a></p>\n                    <p>\n                        " + (project.sys_url_view ? "<a href=\"" + project.sys_url_view + "\">Visit home page</a>" : '') + "\n                    </p>\n                    <ul class=\"project-social\"> \n                        " + (project.twitterLink ? "<li><a href=\"" + project.twitterLink + "\"><i class=\"fa fa-twitter\"></i></a></li>" : '') + "\n                    </ul>\n                </div>\n                <div class=\"large-18 project-content-right columns\"><h3><a href=\"" + project.sys_url_view + "\">" + project.projectName + "</a>\n                </h3>\n                    <p>" + project.descriptions + "</p>\n                    <div class=\"upstream-more-content\">\n                        <ul class=\"project-details-list\">\n                            " + (project.docsLink ? "<li>Docs: <a href=\"" + project.docsLink + "\">Documentation</a></li>" : '') + "\n                            " + (project.communityLink ? "<li>Community: <a href=\"" + project.communityLink + "\">" + project.generateViewLink(project.communityLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "\n                            " + (project.mailingListLink ? "<li>Mailing List: <a href=\"" + project.mailingListLink + "\">" + project.generateViewLink(project.mailingListLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "\n                            " + (project.chatLink ? "<li>Chat: <a href=\"" + project.chatLink + "\">" + project.generateViewLink(project.chatLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "\n                            " + (project.jiraLink ? "<li>JIRA: <a href=\"" + project.jiraLink + "\">" + project.generateViewLink(project.jiraLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "\n                            " + (project.srcLink ? "<li>Source: <a href=\"" + project.srcLink + "\">" + project.generateViewLink(project.srcLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "\n                            " + (project.githubLink ? "<li>Github: <a href=\"" + project.githubLink + "\">" + project.generateViewLink(project.githubLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "\n                            " + (project.buildLink ? "<li>Build: <a href=\"" + project.buildLink + "\">" + project.generateViewLink(project.buildLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "\n                            " + (project.issueTracker ? "<li>Issue: <a href=\"" + project.issueTracker + "\">" + project.generateViewLink(project.issueTracker) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "\n                            " + (project.userForumLink ? "<li>User Forum: <a href=\"" + project.userForumLink + "\">" + project.generateViewLink(project.userForumLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "  \n                            " + (project.devForumLink ? "<li>Dev Forum: <a href=\"" + project.devForumLink + "\">" + project.generateViewLink(project.devForumLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + "  \n                            " + (project.knowledgebaseLink ? "<li>KnowledgeBase: <a href=\"" + project.knowledgebaseLink + "\">" + project.generateViewLink(project.knowledgebaseLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + " \n                            " + (project.blogLink ? "<li>Blog: <a href=\"" + project.blogLink + "\">" + project.generateViewLink(project.blogLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + " \n                            " + (project.anonymousLink ? "<li>Anonymous Source: <a href=\"" + project.anonymousLink + "\">" + project.generateViewLink(project.anonymousLink) + " <i class=\"fas fa-external-link\"></a></li>" : '') + " \n                        </ul>\n                    </div>\n                </div>\n            </div>\n        ";
                    };
                    return _this;
                }
                Object.defineProperty(RHDPProjectItem.prototype, "userForumLink", {
                    get: function () {
                        return this._userForumLink;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._userForumLink === value)
                            return;
                        this._userForumLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "devForumLink", {
                    get: function () {
                        return this._devForumLink;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._devForumLink === value)
                            return;
                        this._devForumLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "mailingListLink", {
                    get: function () {
                        return this._mailingListLink;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._mailingListLink === value)
                            return;
                        this._mailingListLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "chatLink", {
                    get: function () {
                        return this._chatLink;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._chatLink === value)
                            return;
                        this._chatLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "blogLink", {
                    get: function () {
                        return this._blogLink;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._blogLink === value)
                            return;
                        this._blogLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "jiraLink", {
                    get: function () {
                        return this._jiraLink;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._jiraLink === value)
                            return;
                        this._jiraLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "srcLink", {
                    get: function () {
                        return this._srcLink;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._srcLink === value)
                            return;
                        this._srcLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "anonymousLink", {
                    get: function () {
                        return this._anonymousLink;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._anonymousLink === value)
                            return;
                        this._anonymousLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "commiterLink", {
                    get: function () {
                        return this._commiterLink;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._commiterLink === value)
                            return;
                        this._commiterLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "fisheyeLink", {
                    get: function () {
                        return this._fisheyeLink;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._fisheyeLink === value)
                            return;
                        this._fisheyeLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "viewvcLink", {
                    get: function () {
                        return this._viewvcLink;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._viewvcLink === value)
                            return;
                        this._viewvcLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "committerGitLink", {
                    get: function () {
                        return this._committerGitLink;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._committerGitLink === value)
                            return;
                        this._committerGitLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "buildLink", {
                    get: function () {
                        return this._buildLink;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._buildLink === value)
                            return;
                        this._buildLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "hudsonLink", {
                    get: function () {
                        return this._hudsonLink;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._hudsonLink === value)
                            return;
                        this._hudsonLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "knowledgebaseLink", {
                    get: function () {
                        return this._knowledgebaseLink;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._knowledgebaseLink === value)
                            return;
                        this._knowledgebaseLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "communityLink", {
                    get: function () {
                        return this._communityLink;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._communityLink === value)
                            return;
                        this._communityLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "imageUrl", {
                    get: function () {
                        return this._imageUrl;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._imageUrl === value)
                            return;
                        this._imageUrl = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "projectName", {
                    get: function () {
                        return this._projectName;
                    },
                    set: function (value) {
                        if (this._projectName === value)
                            return;
                        this._projectName = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "downloadsLink", {
                    get: function () {
                        return this._downloadsLink;
                    },
                    set: function (value) {
                        this.getCorrectUrl(value);
                        if (this._downloadsLink === value)
                            return;
                        this._downloadsLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "sys_url_view", {
                    get: function () {
                        return this._sys_url_view;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._sys_url_view === value)
                            return;
                        this._sys_url_view = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "twitterLink", {
                    get: function () {
                        return this._twitterLink;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._twitterLink === value)
                            return;
                        this._twitterLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "descriptions", {
                    get: function () {
                        return this._descriptions;
                    },
                    set: function (value) {
                        if (this._descriptions === value)
                            return;
                        this._descriptions = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "docsLink", {
                    get: function () {
                        return this._docsLink;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._docsLink === value)
                            return;
                        this._docsLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "issueTracker", {
                    get: function () {
                        return this._issueTracker;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._issueTracker === value)
                            return;
                        this._issueTracker = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(RHDPProjectItem.prototype, "githubLink", {
                    get: function () {
                        return this._githubLink;
                    },
                    set: function (value) {
                        value = this.getCorrectUrl(value);
                        if (this._githubLink === value)
                            return;
                        this._githubLink = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPProjectItem.prototype.getCorrectUrl = function (url) {
                    if (url == null)
                        return;
                    if (url.constructor === Array && url.length > 0) {
                        url = url[0];
                    }
                    if (url.indexOf("/") > 0) {
                        return url;
                    }
                    else {
                        return "https://developers.redhat.com" + url;
                    }
                };
                RHDPProjectItem.prototype.connectedCallback = function () {
                    this.innerHTML = this.template(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["", ""])), this);
                };
                RHDPProjectItem.prototype.getTemplateHTML = function () {
                    this.innerHTML = this.template(templateObject_2 || (templateObject_2 = __makeTemplateObject(["", ""], ["", ""])), this);
                    return this.innerHTML;
                };
                RHDPProjectItem.prototype.generateViewLink = function (viewLink) {
                    return viewLink.replace(/https?:\/\//, '');
                };
                Object.defineProperty(RHDPProjectItem, "observedAttributes", {
                    get: function () {
                        return ['type', 'size', 'heading', 'text'];
                    },
                    enumerable: true,
                    configurable: true
                });
                RHDPProjectItem.prototype.attributeChangedCallback = function (name, oldVal, newVal) {
                    this[name] = newVal;
                    this.innerHTML = this.template(templateObject_3 || (templateObject_3 = __makeTemplateObject(["", ""], ["", ""])), this);
                };
                return RHDPProjectItem;
            }(HTMLElement));
            exports_1("default", RHDPProjectItem);
            window.customElements.define('rhdp-project-item', RHDPProjectItem);
        }
    };
});
