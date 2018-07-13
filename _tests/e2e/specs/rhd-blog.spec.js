import {Blog} from './support/pages/website/Blog.page'

const tags = require('mocha-tags');

describe('Red Hat Blog Page', function () {

    tags('sanity')
        .it("should contain an embedded hash string for the nagios health check", function () {
            this.retries(2);
            let blog = new Blog();
            blog.open('/');
            expect(blog.pageSource()).to.include('00fef0cf90c42f3e40921fb3370e520a')
        });
});
