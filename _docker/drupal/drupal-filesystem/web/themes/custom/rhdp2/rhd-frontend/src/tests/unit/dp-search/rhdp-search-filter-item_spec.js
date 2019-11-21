"use strict";
// Test rhdp-search-filter-item component

describe('Search Filter Item', function() {
    var wc;
    var name = 'Test1', group='testgroup', key = 'test1', value = 'jbossdeveloper_test1';

    beforeEach(async () => {
        await System.import('./base/src/docs/static/js/@rhd/rhdp-search/rhdp-search-filter-item.js').then(() => {
            wc = document.createElement('rhdp-search-filter-item');
            wc.name = name;
            wc.key = key;
            wc.value = value;
            wc.group = group;
            document.body.insertBefore(wc, document.body.firstChild);
        });
    });

    afterEach(function() {
        document.body.removeChild(wc);
    });

    describe('properties', function() {
        it('should show the name field', function() {
            expect(wc.shadowRoot.querySelector('span').innerText).toEqual(name);
            expect(wc.textContent).toEqual(name);
        });

        it('should update the appropriate fields', function() {
            expect(wc.getAttribute('name')).toEqual(name);
            expect(wc.getAttribute('value')).toEqual(value);
            expect(wc.getAttribute('key')).toEqual(key);
        });

    });

    describe('Checkbox', function() {
        it('should set the active state', function() {
            let v = true;
            wc.addEventListener('filter-item-change', (e) => {
                if(!v) { wc.removeEventListener('filter-item-change', this); }
                expect(wc.active).toBe(v);
                v = !v;
                
            });
            wc.shadowRoot.querySelector('input').click();
            wc.shadowRoot.querySelector('input').click();
        });

    });

    describe('Active', function() {
        it('should modify the active state', function() {
            let v = true;
            wc.addEventListener('filter-item-change', (e) => {
                if(!v) { wc.removeEventListener('filter-item-change', this); }
                expect(wc.active).toBe(v);
                v = !v;
            })
            wc.active = true;
            wc.active = false;
        });
    });
});