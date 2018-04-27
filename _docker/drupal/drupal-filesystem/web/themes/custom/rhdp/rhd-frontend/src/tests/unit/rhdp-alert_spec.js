
// Alert component testing
describe('Alert component', function() {
    var wc, rdy = false;
    
    beforeEach(function() {
            wc = new RHDPAlert();
            document.body.appendChild(wc);
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });

    it('should have the right structure', function() {
        expect(wc.querySelectorAll('.alert-box').length).toBe(1);
    });

});