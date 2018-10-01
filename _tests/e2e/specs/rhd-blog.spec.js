import {Blog} from './support/pages/website/Blog.page';

describe('Red Hat Blog Page', function () {
    this.retries(2);

    it("@sanity : should contain an embedded hash string for the nagios health check", function () {
        let blog = new Blog();
        blog.open();
        expect(blog.source()).to.include('00fef0cf90c42f3e40921fb3370e520a');
    });
});
