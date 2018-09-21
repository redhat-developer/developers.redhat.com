class RHDPProjectItem extends HTMLElement {

    private _imageUrl : String;
    private _projectName : String;
    private _downloadsLink : String;
    private _sys_url_view : String;
    private _twitterLink : String;
    private _descriptions : String;
    private _docsLink : String;
    private _issueTracker : String;
    private _githubLink : String;
    private _communityLink : String;
    private _knowledgebaseLink : String;
    private _userForumLink : String;
    private _devForumLink : String;
    private _mailingListLink : String;
    private _chatLink : String;
    private _blogLink : String;
    private _jiraLink : String;
    private _srcLink : String;
    private _anonymousLink : String;
    private _commiterLink : String;
    private _fisheyeLink : String;
    private _viewvcLink : String;
    private _committerGitLink : String;
    private _buildLink : String;
    private _hudsonLink : String;

    get userForumLink(): String {
        return this._userForumLink;
    }

    set userForumLink(value) {
        value = this.getCorrectUrl(value);
        if (this._userForumLink === value) return;
        this._userForumLink = value;
    }

    get devForumLink(): String {
        return this._devForumLink;
    }

    set devForumLink(value) {
        value = this.getCorrectUrl(value);
        if (this._devForumLink === value) return;
        this._devForumLink = value;
    }

    get mailingListLink(): String {
        return this._mailingListLink;
    }

    set mailingListLink(value) {
        value = this.getCorrectUrl(value);
        if (this._mailingListLink === value) return;
        this._mailingListLink = value;
    }

    get chatLink(): String {
        return this._chatLink;
    }

    set chatLink(value) {
        value = this.getCorrectUrl(value);
        if (this._chatLink === value) return;
        this._chatLink = value;
    }

    get blogLink(): String {
        return this._blogLink;
    }

    set blogLink(value) {
        value = this.getCorrectUrl(value);
        if (this._blogLink === value) return;
        this._blogLink = value;
    }

    get jiraLink(): String {
        return this._jiraLink;
    }

    set jiraLink(value) {
        value = this.getCorrectUrl(value);
        if (this._jiraLink === value) return;
        this._jiraLink = value;
    }

    get srcLink(): String {
        return this._srcLink;
    }

    set srcLink(value) {
        value = this.getCorrectUrl(value);
        if (this._srcLink === value) return;
        this._srcLink = value;
    }

    get anonymousLink(): String {
        return this._anonymousLink;
    }

    set anonymousLink(value) {
        value = this.getCorrectUrl(value);
        if (this._anonymousLink === value) return;
        this._anonymousLink = value;
    }

    get commiterLink(): String {
        return this._commiterLink;
    }

    set commiterLink(value) {
        value = this.getCorrectUrl(value);
        if (this._commiterLink === value) return;
        this._commiterLink = value;
    }

    get fisheyeLink(): String {
        return this._fisheyeLink;
    }

    set fisheyeLink(value) {
        value = this.getCorrectUrl(value);
        if (this._fisheyeLink === value) return;
        this._fisheyeLink = value;
    }

    get viewvcLink(): String {
        return this._viewvcLink;
    }

    set viewvcLink(value) {
        value = this.getCorrectUrl(value);
        if (this._viewvcLink === value) return;
        this._viewvcLink = value;
    }

    get committerGitLink(): String {
        return this._committerGitLink;
    }

    set committerGitLink(value) {
        value = this.getCorrectUrl(value);
        if (this._committerGitLink === value) return;
        this._committerGitLink = value;
    }

    get buildLink(): String {
        return this._buildLink;
    }

    set buildLink(value) {
        value = this.getCorrectUrl(value);
        if (this._buildLink === value) return;
        this._buildLink = value;
    }

    get hudsonLink(): String {
        return this._hudsonLink;
    }

    set hudsonLink(value) {
        value = this.getCorrectUrl(value);
        if (this._hudsonLink === value) return;
        this._hudsonLink = value;
    }

    get knowledgebaseLink(): String {
        return this._knowledgebaseLink;
    }

    set knowledgebaseLink(value) {
        value = this.getCorrectUrl(value);
        if (this._knowledgebaseLink === value) return;
        this._knowledgebaseLink = value;
    }

    get communityLink(): String {
        return this._communityLink;
    }

    set communityLink(value) {
        value = this.getCorrectUrl(value);
        if (this._communityLink === value) return;
        this._communityLink = value;
    }

    get imageUrl(): String {
        return this._imageUrl;
    }

    set imageUrl(value) {
        value = this.getCorrectUrl(value);

        if (this._imageUrl === value) return;
        this._imageUrl = value;

    }

    get projectName(): String {
        return this._projectName;
    }

    set projectName(value) {
        if (this._projectName === value) return;
        this._projectName = value;
    }

    get downloadsLink(): String {
        return this._downloadsLink;
    }

    set downloadsLink(value) {
        this.getCorrectUrl(value);
        if (this._downloadsLink === value) return;
        this._downloadsLink = value;
    }

    get sys_url_view(): String {
        return this._sys_url_view;
    }

    set sys_url_view(value) {
        value = this.getCorrectUrl(value);
        if (this._sys_url_view === value) return;
        this._sys_url_view = value;
    }

    get twitterLink(): String {
        return this._twitterLink;
    }

    set twitterLink(value) {
        value = this.getCorrectUrl(value);
        if (this._twitterLink === value) return;
        this._twitterLink = value;
    }

    get descriptions(): String {
        return this._descriptions;
    }

    set descriptions(value) {
        if (this._descriptions === value) return;
        this._descriptions = value;
    }

    get docsLink(): String {
        return this._docsLink;
    }

    set docsLink(value) {
        value = this.getCorrectUrl(value);
        if (this._docsLink === value) return;
        this._docsLink = value;
    }

    get issueTracker(): String {
        return this._issueTracker;
    }

    set issueTracker(value) {
        value = this.getCorrectUrl(value);
        if (this._issueTracker === value) return;
        this._issueTracker = value;
    }

    get githubLink(): String {
        return this._githubLink;
    }

    set githubLink(value) {
        value = this.getCorrectUrl(value);
        if (this._githubLink === value) return;
        this._githubLink = value;
    }

    constructor() {
        super();
    }

    getCorrectUrl(url) {
        if (url == null) return;
        if (url.constructor === Array && url.length > 0) {
            url = url[0];
        }
        if (url.indexOf("/") > 0) {
            return url;
        } else {
            return "https://developers.redhat.com" + url;
        }

    }
    connectedCallback() {
        this.innerHTML = this.template`${this}`;
    }

    getTemplateHTML(){
        this.innerHTML = this.template`${this}`;
        return this.innerHTML;
    }
    generateViewLink(viewLink){
       return viewLink.replace(/https?:\/\//,'');
    }
    static get observedAttributes() {
        return ['type', 'size', 'heading', 'text'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
        this.innerHTML = this.template`${this}`;
    }


    template = (strings, project) => {
        return `
        
            <div class="defaultprojectimage">
                <p class="image-link"><img src="${project.imageUrl}" alt="${project.projectName}"></p></div>
            <h5 class="solution-name">
                <p class="solution-name-link">${project.projectName}</p>
            </h5>
            <p>
                <a class="solution-overlay-learn link-sm">Learn more</a> ${project.downloadsLink ? `| <a href="${project.downloadsLink}" class="link-sm">Download</a>` : ''}
            </p>
            <div class="project-content row">
                <div class="large-6 project-content-left columns"><img src="${project.imageUrl}" alt="${project.projectName}">
                    ${project.downloadsLink ? `<p><a class="upstream-download" href="${project.downloadsLink}"><i class="fa fa-download"></i> Download</a></p>` : ''}
                    ${project.sys_url_view ? `<p><a href="${project.sys_url_view}">Visit home page</a></p>` : ''}
                    <ul class="project-social"> 
                        ${project.twitterLink ? `<li><a href="${project.twitterLink}"><i class="fa fa-twitter"></i></a></li>` : ''}
                    </ul>
                </div>
                <div class="large-18 project-content-right columns">
                    <h3>
                        ${project.sys_url_view ?  `<a href="${project.sys_url_view}">${project.projectName}</a>` : `${project.projectName}`}
                    </h3>
                    <p>${project.descriptions}</p>
                    <div class="upstream-more-content">
                        <ul class="project-details-list">
                            ${project.docsLink ? `<li>Docs: <a href="${project.docsLink}">Documentation <i class="fas fa-external-link"></i></a></li>` : ''}
                            ${project.communityLink ? `<li>Community: <a href="${project.communityLink}">${project.generateViewLink(project.communityLink)} <i class="fas fa-external-link"></i></a></li>` : ''}
                            ${project.mailingListLink ? `<li>Mailing List: <a href="${project.mailingListLink}">${project.generateViewLink(project.mailingListLink)} <i class="fas fa-external-link"></i></a></li>` : ''}
                            ${project.chatLink ? `<li>Chat: <a href="${project.chatLink}">${project.generateViewLink(project.chatLink)} <i class="fas fa-external-link"></i></a></li>` : ''}
                            ${project.jiraLink ? `<li>JIRA: <a href="${project.jiraLink}">${project.generateViewLink(project.jiraLink)} <i class="fas fa-external-link"></i></a></li>` : ''}
                            ${project.srcLink ? `<li>Source: <a href="${project.srcLink}">${project.generateViewLink(project.srcLink)} <i class="fas fa-external-link"></i></a></li>` : ''}
                            ${project.githubLink ? `<li>Github: <a href="${project.githubLink}">${project.generateViewLink(project.githubLink)} <i class="fas fa-external-link"></i></a></li>` : ''}
                            ${project.buildLink ? `<li>Build: <a href="${project.buildLink}">${project.generateViewLink(project.buildLink)} <i class="fas fa-external-link"></i></a></li>` : ''}
                            ${project.issueTracker ? `<li>Issue: <a href="${project.issueTracker}">${project.generateViewLink(project.issueTracker)} <i class="fas fa-external-link"></i></a></li>` : ''}
                            ${project.userForumLink ? `<li>User Forum: <a href="${project.userForumLink}">${project.generateViewLink(project.userForumLink)} <i class="fas fa-external-link"></i></a></li>` : ''}  
                            ${project.devForumLink ? `<li>Dev Forum: <a href="${project.devForumLink}">${project.generateViewLink(project.devForumLink)} <i class="fas fa-external-link"></i></a></li>` : ''}  
                            ${project.knowledgebaseLink ? `<li>KnowledgeBase: <a href="${project.knowledgebaseLink}">${project.generateViewLink(project.knowledgebaseLink)} <i class="fas fa-external-link"></i></a></li>` : ''} 
                            ${project.blogLink ? `<li>Blog: <a href="${project.blogLink}">${project.generateViewLink(project.blogLink)} <i class="fas fa-external-link"></i></a></li>` : ''} 
                            ${project.anonymousLink ? `<li>Anonymous Source: <a href="${project.anonymousLink}">${project.generateViewLink(project.anonymousLink)} <i class="fas fa-external-link"></i></a></li>` : ''} 
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
}

window.addEventListener('WebComponentsReady', function() {
    customElements.define('rhdp-project-item', RHDPProjectItem);
});