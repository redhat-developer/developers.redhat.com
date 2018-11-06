"use strict";
// Test rhdp-search-filter-item component

describe('Search Filter Item', function() {
    var wc;
    var name = 'Test1', key = 'test1', value = 'jbossdeveloper_test1';
    beforeEach(function() {
        wc = new RHDPSearchFilterItem();
        wc.name = name;
        wc.key = key;
        wc.value = value;
        document.body.insertBefore(wc, document.body.firstChild);
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });

    describe('properties', function() {
        it('should show the name field', function() {
            expect(wc.querySelector('span').innerText).toEqual(name);
            expect(wc.querySelector('label').innerText).toEqual(name);
        });

        it('should update the appropriate fields', function() {
            expect(wc.getAttribute('name')).toEqual(name);
            expect(wc.getAttribute('value')).toEqual(value);
            expect(wc.getAttribute('key')).toEqual(key);
        });

    });

    describe('Checkbox', function() {
        it('should set the active state', function() {
            wc.querySelector('input').click();
            expect(wc.active).toBe(true);
            wc.querySelector('input').click();
            expect(wc.active).toBe(false);
        });

    });

    describe('Active', function() {
        it('should modify the active state', function() {
            wc.active = true;
            expect(wc.active).toBe(true);
            wc.active = false;
            expect(wc.active).toBe(false);
        });
    });

    /**
     * TODO: Test all of the inline components for search to make sure they work properly
      */
    describe('Inline properties', function() {
        beforeEach(function() {
            wc.active = true;
            wc.setAttribute('inline', true);
        });

        it('should set inline innertext', function() {
            expect(wc.innerText.trim()).toBe(name);
        });
        it('should clear inline element on clearItem click', function() {
            var clr = wc.querySelector('.clearItem');
            clr.click();
            setTimeout(function() {
                expect(wc.innerHTML).toBe('');
            }, 2000);
        });
        it('should set active on clearItem click', function() {
            var clr = wc.querySelector('.clearItem');
            clr.click();
            setTimeout(function() {
                expect(wc.active).toBe(true);
            }, 2000);
            
        });

    });

});