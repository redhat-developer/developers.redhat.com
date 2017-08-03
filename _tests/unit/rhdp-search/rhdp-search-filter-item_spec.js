"use strict";
// Test rhdp-search-filter-item component

describe('Search Filter Item', function() {
    var wc;
    var name = 'Test1', key = 'test1', value = 'jbossdeveloper_test1';
    beforeEach(function() {
        wc = document.createElement('rhdp-search-filter-item');
        wc.name = name;
        wc.key = key;
        wc.value = value;

    });

    afterEach(function() {
        document.removeEventListener('facetChange', function(e) {
            return;
        });
        document.body.removeChild(wc);

    });

    describe('properties', function() {
        it('should show the name field', function() {
            document.body.insertBefore(wc, document.body.firstChild);
            wc = document.body.firstChild;
            expect(wc.querySelector('span').innerText).toEqual(name);
            expect(wc.querySelector('label').innerText).toEqual(name);
        });

        it('should update the appropriate fields', function() {
            document.body.insertBefore(wc, document.body.firstChild);
            wc = document.body.firstChild;
            expect(wc.getAttribute('name')).toEqual(name);
            expect(wc.getAttribute('value')).toEqual(value);
            expect(wc.getAttribute('key')).toEqual(key);
        });

    });

    describe('Checkbox', function() {
        it('should set the active state', function() {
            document.body.insertBefore(wc, document.body.firstChild);
            wc = document.body.firstChild;

            wc.querySelector('input[id="filter-item-test1"]').click();
            expect(wc.active).toBe(true);
            wc.querySelector('input[id="filter-item-test1"]').click();
            expect(wc.active).toBe(null);
        });

    });

    describe('Active', function() {
        it('should modify the active state', function() {
            document.body.insertBefore(wc, document.body.firstChild);
            wc = document.body.firstChild;
            document.addEventListener('facetChange', function(e) {
                return;
            });
            wc.active = true;
            expect(wc.active).toBe(true);
            wc.active = false;
            expect(wc.active).toBe(null);
        });
    });

    /**
     * TODO: Test all of the inline components for search to make sure they work properly
      */
    describe('Inline properties', function() {

        it('should set inline innertext', function() {
            wc.setAttribute('inline', true);
            document.body.insertBefore(wc, document.body.firstChild);
            wc = document.body.firstChild;
            document.addEventListener('facetChange', function(e) {
                return;
            });
            expect(wc.innerText.trim()).toBe(name);
        });
        it('should clear inline element on clearItem click', function() {
            wc.setAttribute('inline', true);
            document.body.insertBefore(wc, document.body.firstChild);
            wc = document.body.firstChild;
            document.addEventListener('facetChange', function(e) {
                return;
            });
            wc.querySelector('.clearItem').click();
            expect(wc.querySelector('.inline')).toBe(null);

        });
        it('should set active on clearItem click', function() {
            wc.setAttribute('active', true)
            wc.setAttribute('inline', true);
            document.body.insertBefore(wc, document.body.firstChild);
            wc = document.body.firstChild;
            document.addEventListener('facetChange', function(e) {
                return;
            });
            wc.querySelector('.clearItem').click();
            expect(wc.active).toBe(null);

        });

    });

});