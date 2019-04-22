/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

/*
 * This file is used/requested by the 'Styles' button.
 * The 'Styles' button is not enabled by default in DrupalFull and DrupalFiltered toolbars.
 */
if(typeof(CKEDITOR) !== 'undefined') {
  CKEDITOR.addStylesSet( 'sitetheme',
  [
    {
      name: 'Large Body',
      element : ['div', 'p', 'ul', 'ol'],
      attributes : { 'class': 'lead' }
    },

    {
      name: 'Small Body',
      element : ['div', 'p', 'ul', 'ol'],
      attributes : { 'class': 'small-body' }
    },

    {
      name: 'Primary Button',
      element: 'a',
      attributes : { 'class' : 'btn btn-primary' },
      group: 'buttons'
    },

    {
      name: 'Small Primary Button',
      element: 'a',
      attributes : { 'class' : 'btn btn-primary btn-sm' },
      group: 'buttons'
    },

    {
      name: 'Primary Outline Button',
      element: 'a',
      attributes : { 'class' : 'btn btn-primary-outline' },
      group: 'buttons'
    },

    {
      name: 'Small Primary Outline Button',
      element: 'a',
      attributes : { 'class' : 'btn btn-primary-outline btn-sm' },
      group: 'buttons'
    },

    {
      name: 'Secondary Button',
      element: 'a',
      attributes : { 'class' : 'btn btn-secondary' },
      group: 'buttons'
    },

    {
      name: 'Small Secondary Button',
      element: 'a',
      attributes : { 'class' : 'btn btn-secondary btn-sm' },
      group: 'buttons'
    },

    {
      name: 'Tertiary Button',
      element: 'a',
      attributes : { 'class' : 'btn btn-tertiary' },
      group: 'buttons'
    },

    {
      name: 'Small Tertiary Button',
      element: 'a',
      attributes : { 'class' : 'btn btn-tertiary btn-sm' },
      group: 'buttons'
    },

    {
      name: 'Heading 1 style',
      element: ['p', 'div', 'h2', 'h3', 'h4', 'h5', 'h6'],
      attributes: { 'class': 'h1' },
      group: 'headings'
    },
    {
      name: 'Heading 2 style',
      element: ['p', 'div', 'h1', 'h3', 'h4', 'h5', 'h6'],
      attributes: { 'class': 'h2' },
      group: 'headings'
    },

    {
      name: 'Heading 3 style',
      element: ['p', 'div', 'h1', 'h2', 'h4', 'h5', 'h6'],
      attributes: { 'class': 'h3' },
      group: 'headings'
    },

    {
      name: 'Heading 4 style',
      element: ['p', 'div', 'h1', 'h2', 'h3', 'h5', 'h6'],
      attributes: { 'class': 'h4' },
      group: 'headings'
    },

    {
      name: 'Heading 5 style',
      element: ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h6'],
      attributes: { 'class': 'h5' },
      group: 'headings'
    },

    {
      name: 'Heading 6 style',
      element: ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5'],
      attributes: { 'class': 'h6' },
      group: 'headings'
    },
  ]);
}
