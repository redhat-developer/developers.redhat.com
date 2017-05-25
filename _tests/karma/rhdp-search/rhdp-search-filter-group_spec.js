// Test rhdp-search-filter-group component

describe('Search Filter Group', function() {
    var wc;
    beforeEach(function() {
        document.body.insertBefore(document.createElement('rhdp-search-filter-group'), document.body.firstChild);
        wc = document.body.firstChild;
    });

    afterEach(function() {
        document.body.removeChild(document.body.firstChild);
    });

    describe('Heading', function() {
        it('should display the name in all CAPS', function() {
            var head = 'Test Heading';
            wc.name = head;
            expect(wc.shadowRoot.querySelector('h4').innerText).toEqual(head.toUpperCase());
        });
    });

    describe('Filter Items', function() {

    });

    describe('Toggle', function() {
        it('should change the class of filters container', function() {
            var t = 'filters show', f = 'filters hide';
            expect(wc.shadowRoot.querySelector('#filters').className).toBe(f);
            wc.showFilters();
            expect(wc.shadowRoot.querySelector('#filters').className).toBe(t);
        });
    });

    it('should be true', function() {
        expect(wc.innerText).toEqual('');
    });
});