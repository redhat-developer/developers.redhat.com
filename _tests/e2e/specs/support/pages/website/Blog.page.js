const Base = require('../Base.page');

export class Blog extends Base {
    constructor() {
        super({
            path: '/blog',
            pageTitle: 'RHD Blog - Insights and news on Red Hat developer tools, platforms and more',
        });
    }
}
