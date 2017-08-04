"use strict";
// Test rhdp-search-filter-item component

xdescribe('Search Filter Item', function() {
    var wc;
    beforeEach(function() {
        document.body.insertBefore(document.createElement('rhdp-search-filter-item'), document.body.firstChild);
        wc = document.body.firstChild;
    });

    afterEach(function() {
        document.body.removeChild(document.body.firstChild);
    });

    describe('Text label', function() {
        it('should show the name field', function() {
            wc.set('name', 'Test Name');
            expect(wc.shadowRoot.querySelector('div').innerText).toEqual('Test Name');
        });
        it('should toggle the control when clicked', function() {
            wc.shadowRoot.querySelector('div').click();
            expect(wc.toggle).toBe(true);
            wc.shadowRoot.querySelector('div').click();
            expect(wc.toggle).toBe(false);
        })
    });

    describe('Checkbox', function() {
        it('should set the toggle', function() {
            var t = wc.toggle;
            wc.shadowRoot.querySelector('paper-checkbox').checked = true;
            expect(wc.toggle).toBe(true);
            wc.shadowRoot.querySelector('paper-checkbox').checked = false;
            expect(wc.toggle).toBe(false);
        });
    });

    describe('Toggle', function() {
        it('should set the toggle', function() {
            wc.shadowRoot.querySelector('paper-checkbox').checked = true;
            expect(wc.toggle).toBe(true);
            wc.shadowRoot.querySelector('paper-checkbox').checked = false;
            expect(wc.toggle).toBe(false);
        });
    });

    describe('setToggle Function', function() {
        it('should set the toggle', function() {
            expect(wc.toggle).toBe(false);
            wc.setToggle();
            expect(wc.toggle).toBe(true);
            wc.setToggle();
            expect(wc.toggle).toBe(false);
        })
    });

    describe('clear Function',  function() {
        it('should clear the toggle', function() {
            expect(wc.toggle).toBe(false);
            wc.clear();
            expect(wc.toggle).toBe(false);
            wc.toggle = true;
            wc.clear();
            expect(wc.toggle).toBe(false);
        })
    });

});