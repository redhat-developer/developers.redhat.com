---
title: "Buttons and CTAs"
date: 2019-08-14T11:19:07-04:00
draft: false
type: component
tags: ["component"]
categories: ["component"]
weight: 99
description: ""
component: "cta"
---

<h2 class="pf-c-title pf-m-lg">Button variations</h2>

<div class="pf-l-grid pf-m-gutter">
  <div class="pf-l-grid__item pf-m-10-col pf-m-offset-1-col-on-md pf-u-p-md" style="border: 1px dashed #ddd;">
    <button class="pf-c-button pf-m-heavy">Heavy</button>
    <button class="pf-c-button pf-m-primary">Primary</button>
    <button class="pf-c-button pf-m-secondary">Secondary (blue)</button>
    <button class="pf-c-button pf-m-secondary-alt">Secondary (red)</button>
    <button class="pf-c-button pf-m-tertiary">Secondary (black)</button>
    <button class="pf-c-button pf-m-link">
      Link button (blue)
      <span class="pf-c-button__icon"><i class="fas fa-arrow-right" aria-hidden="true"></i></span>
    </button>
    <button class="pf-c-button pf-m-link--secondary">
      Link button (black)
      <span class="pf-c-button__icon"><i class="fas fa-arrow-right" aria-hidden="true"></i></span>
    </button>
  </div>
</div>
<br/>
<h2 class="pf-c-title pf-m-lg">Button variations - dark background - -on-dark variants of buttons</h2>

<div class="pf-l-grid pf-m-gutter">
  <div class="pf-l-grid__item pf-m-10-col pf-m-offset-1-col-on-md pf-u-p-md" style="background-color: #000;">
    <button class="pf-c-button pf-m-secondary-on-dark">Secondary blue (dark)</button>
    <button class="pf-c-button pf-m-secondary-alt-on-dark">Secondary red (dark)</button>
    <button class="pf-c-button pf-m-tertiary-on-dark">Secondary black (dark)</button>
    <button class="pf-c-button pf-m-link-on-dark">
      Link button
      <span class="pf-c-button__icon"><i class="fas fa-arrow-right" aria-hidden="true"></i></span>
    </button>
    <button class="pf-c-button pf-m-link--secondary-on-dark">
      Link button
      <span class="pf-c-button__icon"><i class="fas fa-arrow-right" aria-hidden="true"></i></span>
    </button>
  </div>
</div>
<br/>
<h2 class="pf-c-title pf-m-lg">Button variations - dark background - dark class on container</h2>

<div class="pf-l-grid pf-m-gutter">
  <div class="pf-l-grid__item pf-m-10-col pf-m-offset-1-col-on-md pf-u-p-md dark" style="background-color: #000;">
    <button class="pf-c-button pf-m-secondary">Secondary blue (dark)</button>
    <button class="pf-c-button pf-m-secondary-alt">Secondary red (dark)</button>
    <button class="pf-c-button pf-m-tertiary">Secondary black (dark)</button>
    <button class="pf-c-button pf-m-link">
      Link button
      <span class="pf-c-button__icon"><i class="fas fa-arrow-right" aria-hidden="true"></i></span>
    </button>
    <button class="pf-c-button pf-m-link--secondary">
      Link button
      <span class="pf-c-button__icon"><i class="fas fa-arrow-right" aria-hidden="true"></i></span>
    </button>
  </div>
</div>
<br/>
<h2 class="pf-c-title pf-m-lg">Legacy Button Styles for existing rich text content</h2>
<div class="pf-l-grid pf-m-gutter">
  <div class="pf-l-grid__item pf-m-10-col pf-m-offset-1-col-on-md pf-u-p-md" style="border: 1px dashed #ddd;">
    <a href="#" title="" class="button heavy-cta">Primary / Heavy CTA</a>
    <a href="#" title="" class="button heavy-cta blue">Primary / Heavy CTA Blue</a>
    <a href="#" title="" class="button medium-cta">Secondary / Medium CTA</a>
    <a href="#" title="" class="button medium-cta blue">Secondary / Medium CTA Blue</a>
    <a href="#" title="" class="button medium-cta red">Secondary / Medium CTA Red</a>
  </div>
</div>
<br/>
<h2 class="pf-c-title pf-m-lg">Legacy Button Styles for existing rich text content on dark</h2>
<div class="pf-l-grid pf-m-gutter">
  <div class="pf-l-grid__item pf-m-10-col pf-m-offset-1-col-on-md pf-u-p-md dark" style="border: 1px dashed #ddd; background-color: #000;">
    <a href="#" title="" class="button heavy-cta">Primary / Heavy CTA</a>
    <a href="#" title="" class="button heavy-cta blue">Primary / Heavy CTA Blue</a>
    <a href="#" title="" class="button medium-cta">Secondary / Medium CTA</a>
    <a href="#" title="" class="button medium-cta blue">Secondary / Medium CTA Blue</a>
    <a href="#" title="" class="button medium-cta red">Secondary / Medium CTA Red</a>
  </div>
</div>
<br/>
<h2 class="pf-c-title pf-m-lg">Button states</h2>

<div class="pf-l-grid pf-m-gutter">
  <div class="pf-l-grid__item pf-m-offset-1-col-on-md">
    <h3 class="pf-c-title pf-m-md">Heavy CTA button styles</h3>
    <button class="pf-c-button pf-m-heavy" type="button">Heavy CTA</button>
    <button class="pf-c-button pf-m-heavy pf-m-active" type="button">Heavy CTA active</button>
    <button class="pf-c-button pf-m-heavy pf-m-focus" type="button">Heavy CTA focus</button>
    <button class="pf-c-button pf-m-heavy pf-m-disabled" type="button">Heavy CTA disabled</button>
  </div>
  <div class="pf-l-grid__item pf-m-offset-1-col-on-md">
    <h3 class="pf-c-title pf-m-md">Primary button styles</h3>
    <button class="pf-c-button pf-m-primary" type="button">Primary</button>
    <button class="pf-c-button pf-m-primary pf-m-active" type="button">Primary active</button>
    <button class="pf-c-button pf-m-primary pf-m-focus" type="button">Primary focus</button>
    <button class="pf-c-button pf-m-primary pf-m-disabled" type="button">Primary disabled</button>
  </div>
  <div class="pf-l-grid__item pf-m-offset-1-col-on-md">
    <h3 class="pf-c-title pf-m-md">Secondary (blue outline) button styles</h3>
    <button class="pf-c-button pf-m-secondary" type="button">Secondary (blue outline)</button>
    <button class="pf-c-button pf-m-secondary pf-m-active" type="button">Secondary (blue outline) active</button>
    <button class="pf-c-button pf-m-secondary pf-m-focus" type="button">Secondary (blue outline) focus</button>
    <button class="pf-c-button pf-m-secondary pf-m-disabled" type="button">Secondary (blue outline) disabled</button>
  </div>
  <div class="pf-l-grid__item pf-m-offset-1-col-on-md">
    <h3 class="pf-c-title pf-m-md">Secondary (red outline) button styles</h3>
    <button class="pf-c-button pf-m-secondary-alt" type="button">Secondary (red outline)</button>
    <button class="pf-c-button pf-m-secondary-alt pf-m-active" type="button">Secondary (red outline) active</button>
    <button class="pf-c-button pf-m-secondary-alt pf-m-focus" type="button">Secondary (red outline) focus</button>
    <button class="pf-c-button pf-m-secondary-alt pf-m-disabled" type="button">Secondary (red outline) disabled</button>
  </div>
  <div class="pf-l-grid__item pf-m-offset-1-col-on-md">
    <h3 class="pf-c-title pf-m-md">Secondary (black outline) button styles</h3>
    <button class="pf-c-button pf-m-tertiary" type="button">Secondary (black outline)</button>
    <button class="pf-c-button pf-m-tertiary pf-m-active" type="button">Secondary (black outline) active</button>
    <button class="pf-c-button pf-m-tertiary pf-m-focus" type="button">Secondary (black outline) focus</button>
    <button class="pf-c-button pf-m-tertiary pf-m-disabled" type="button">Secondary (black outline) disabled</button>
  </div>
  <div class="pf-l-grid__item pf-m-offset-1-col-on-md">
    <h3 class="pf-c-title pf-m-md">Link button (default)</h3>
    <button class="pf-c-button pf-m-link" type="button">
      Link button
      <span class="pf-c-button__icon"><i class="fas fa-arrow-right" aria-hidden="true"></i></span>
    </button>
    <button class="pf-c-button pf-m-link pf-m-active" type="button">
      Link button
      <span class="pf-c-button__icon"><i class="fas fa-arrow-right" aria-hidden="true"></i></span>
    </button>
    <button class="pf-c-button pf-m-link pf-m-focus" type="button">
      Link button
      <span class="pf-c-button__icon"><i class="fas fa-arrow-right" aria-hidden="true"></i></span>
    </button>
    <button class="pf-c-button pf-m-link pf-m-disabled" type="button">
      Link button
      <span class="pf-c-button__icon"><i class="fas fa-arrow-right" aria-hidden="true"></i></span>
    </button>
  </div>
  <div class="pf-l-grid__item pf-m-offset-1-col-on-md">
    <h3 class="pf-c-title pf-m-md">Link button (black)</h3>
    <button class="pf-c-button pf-m-link--secondary">
      Link button
      <span class="pf-c-button__icon"><i class="fas fa-arrow-right" aria-hidden="true"></i></span>
    </button>
    <button class="pf-c-button pf-m-link--secondary pf-m-active">
      Link button
      <span class="pf-c-button__icon"><i class="fas fa-arrow-right" aria-hidden="true"></i></span>
    </button>
    <button class="pf-c-button pf-m-link--secondary pf-m-focus">
      Link button
      <span class="pf-c-button__icon"><i class="fas fa-arrow-right" aria-hidden="true"></i></span>
    </button>
    <button class="pf-c-button pf-m-link--secondary pf-m-disabled">
      Link button
      <span class="pf-c-button__icon"><i class="fas fa-arrow-right" aria-hidden="true"></i></span>
    </button>
  </div>
</div>

