---
title: "Responsive Grid"
date: 2017-08-03T14:22:23-04:00
draft: false
tags: ["layout"]
categories: ["layout"]
---

<style>
  nav.pf-c-nav.jump-nav {
    position: sticky;
    top: 0;
    background-color: #fff;
    margin-bottom: 25px;
  }
  .pf-l-grid > * {
    border: 1px dashed #000;
    font-weight: 700;
    padding: 1em;
  }
  hr {
    margin: 3em 0;
  }
</style>

<nav class="pf-c-nav jump-nav" aria-label="Local">
  <ul class="pf-c-nav__tertiary-list">
    <li class="pf-c-nav__item">
      <a href="#base-grid" class="pf-c-nav__link">
        <i class="fad fa-circle"></i> Base grid
      </a>
    </li>
    <li class="pf-c-nav__item">
      <a href="#base-grid-with-gutters" class="pf-c-nav__link">
        <i class="fad fa-circle"></i> Base grid with gutters
      </a>
    </li>
    <li class="pf-c-nav__item">
      <a href="#smart-grid" class="pf-c-nav__link">
        <i class="fad fa-circle"></i> Smart grid
      </a>
    </li>
    <li class="pf-c-nav__item">
      <a href="#row-span" class="pf-c-nav__link">
        <i class="fad fa-circle"></i> Row span
      </a>
    </li>
    <li class="pf-c-nav__item">
      <a href="#example" class="pf-c-nav__link">
        <i class="fad fa-circle"></i> Example
      </a>
    </li>
  </ul>
</nav>

## Base grid
{{< code >}}
<section class="pf-l-grid">
  <div class="pf-l-grid__item pf-m-12-col">12 col</div>
  <div class="pf-l-grid__item pf-m-11-col">11 col</div><div class="pf-l-grid__item pf-m-1-col">1 col</div>
  <div class="pf-l-grid__item pf-m-10-col">10 col</div><div class="pf-l-grid__item pf-m-2-col">2 col</div>
  <div class="pf-l-grid__item pf-m-9-col">9 col</div><div class="pf-l-grid__item pf-m-3-col">3 col</div>
  <div class="pf-l-grid__item pf-m-8-col">8 col</div><div class="pf-l-grid__item pf-m-4-col">4 col</div>
  <div class="pf-l-grid__item pf-m-7-col">7 col</div><div class="pf-l-grid__item pf-m-5-col">5 col</div>
  <div class="pf-l-grid__item pf-m-6-col">6 col</div><div class="pf-l-grid__item pf-m-6-col">6 col</div>
</section>
{{< /code >}}

<hr>

## Base grid with gutters
{{< code >}}
<section class="pf-l-grid pf-m-gutter">
  <div class="pf-l-grid__item pf-m-12-col">12 col</div>
  <div class="pf-l-grid__item pf-m-11-col">11 col</div><div class="pf-l-grid__item pf-m-1-col">1 col</div>
  <div class="pf-l-grid__item pf-m-10-col">10 col</div><div class="pf-l-grid__item pf-m-2-col">2 col</div>
  <div class="pf-l-grid__item pf-m-9-col">9 col</div><div class="pf-l-grid__item pf-m-3-col">3 col</div>
  <div class="pf-l-grid__item pf-m-8-col">8 col</div><div class="pf-l-grid__item pf-m-4-col">4 col</div>
  <div class="pf-l-grid__item pf-m-7-col">7 col</div><div class="pf-l-grid__item pf-m-5-col">5 col</div>
  <div class="pf-l-grid__item pf-m-6-col">6 col</div><div class="pf-l-grid__item pf-m-6-col">6 col</div>
</section>
{{< /code >}}

<hr>

## Smart grid
{{< code >}}
<div class="pf-l-grid pf-m-all-6-col-on-sm pf-m-all-4-col-on-md pf-m-all-2-col-on-lg pf-m-all-1-col-on-xl">
  <div class="pf-l-grid__item">
    item 1
  </div>
  <div class="pf-l-grid__item">
    item 2
  </div>
  <div class="pf-l-grid__item">
    item 3
  </div>
  <div class="pf-l-grid__item">
    item 4
  </div>
  <div class="pf-l-grid__item">
    item 5
  </div>
  <div class="pf-l-grid__item">
    item 6
  </div>
  <div class="pf-l-grid__item">
    item 7
  </div>
  <div class="pf-l-grid__item">
    item 8
  </div>
  <div class="pf-l-grid__item">
    item 9
  </div>
  <div class="pf-l-grid__item">
    item 10
  </div>
  <div class="pf-l-grid__item">
    item 11
  </div>
  <div class="pf-l-grid__item">
    item 12
  </div>
</div>
{{< /code >}}

<hr>

## Row span
{{< code >}}
<div class="pf-l-grid pf-m-gutter">
  <div class="pf-l-grid__item pf-m-8-col">
    8 col
  </div>
  <div class="pf-l-grid__item pf-m-4-col pf-m-2-row">
    4 col, 2 row
  </div>
  <div class="pf-l-grid__item pf-m-2-col pf-m-3-row">
    2 col, 3 row
  </div>
  <div class="pf-l-grid__item pf-m-2-col">
    2 col
  </div>
  <div class="pf-l-grid__item pf-m-4-col">
    4 col
  </div>
  <div class="pf-l-grid__item pf-m-2-col">
    2 col
  </div>
  <div class="pf-l-grid__item pf-m-2-col">
    2 col
  </div>
  <div class="pf-l-grid__item pf-m-2-col">
    2 col
  </div>
  <div class="pf-l-grid__item pf-m-4-col">
    4 col
  </div>
  <div class="pf-l-grid__item pf-m-2-col">
    2 col
  </div>
  <div class="pf-l-grid__item pf-m-4-col">
    4 col
  </div>
  <div class="pf-l-grid__item pf-m-4-col">
    4 col
  </div>
</div>
{{< /code >}}

<hr>

## Example
{{< code >}}
<div class="pf-l-grid">
  <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md">
    <div class="pf-l-grid">
      <div class="pf-l-grid__item pf-m-12-col pf-u-mx-auto pf-u-my-0">
        <img src="https://via.placeholder.com/350x200.png?text=Red+Hat" alt="Red Hat">
      </div>
      <div class="pf-l-grid__item pf-m-12-col pf-u-text-align-center">
        Learn about the Developer program
      </div>
    </div>
  </div>
  <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md">
    <div class="pf-l-grid">
      <div class="pf-l-grid__item pf-m-12-col pf-u-mx-auto pf-u-my-0">
        <img src="https://via.placeholder.com/350x200.png?text=IBM" alt="IBM">
      </div>
      <div class="pf-l-grid__item pf-m-12-col pf-u-text-align-center">
        Learn about the Red Hat and Communities
      </div>
    </div>
  </div>
  <div class="pf-l-grid__item pf-m-12-col pf-m-3-col-on-md pf-m-3-row-on-md">
    <h2>Latest articles on topic</h2>
    article text
  </div>
  <div class="pf-l-grid__item pf-m-12-col pf-m-9-col-on-md">
    <div class="pf-l-grid">
      <div class="pf-l-grid__item">
        <img src="https://via.placeholder.com/350x200?text=Hello+world" alt="Hello World">
      </div>
      <div class="pf-l-grid__item">
        Body content
      </div>
      <div class="pf-l-grid__item">
        Cards
      </div>
    </div>
  </div>
  <div class="pf-l-grid__item pf-m-12-col">
    <h2>Build here, go anywhere</h2>
  </div>
  <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md">
    <div class="pf-l-grid">
      <div class="pf-l-grid__item pf-m-12-col">
        Full width card
      </div>
      <div class="pf-l-grid__item pf-m-6-col">
        Half width card
      </div>
      <div class="pf-l-grid__item pf-m-6-col">
        Half width card
      </div>
    </div>
  </div>
  <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md">
    <div class="pf-l-grid">
      <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md pf-m-2-row-on-md">
        Card that extends over two rows on medium, 1 row on small
      </div>
      <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md">
        Single row card
      </div>
      <div class="pf-l-grid__item pf-m-12-col pf-m-6-col-on-md">
        Single row card
      </div>
    </div>
  </div>
  <div class="pf-l-grid__item pf-m-12-col">
    <h2>Featured resources</h2>
  </div>
  <div class="pf-l-grid__item pf-m-12-col pf-m-3-col-on-md pf-m-2-row-on-md">
    <div class="pf-l-grid">
      <div class="pf-l-grid__item pf-m-12-col">
        <h3>2 min videos to get started</h3>
      </div>
    </div>
    <div class="pf-l-grid">
      <div class="pf-l-grid__item">
        Vertical card list
      </div>
    </div>
  </div>
  <div class="pf-l-grid__item pf-m-12-col pf-m-9-col-on-md">
    <div class="pf-l-grid">
      <div class="pf-l-grid__item pf-m-12-col">
        <h3>eBooks and cheat sheets</h3>
      </div>
    </div>
    <div class="pf-l-grid">
      <div class="pf-l-grid__item pf-m-12-col pf-m-4-col-on-md">
        Card
      </div>
      <div class="pf-l-grid__item pf-m-12-col pf-m-4-col-on-md">
        Card
      </div>
      <div class="pf-l-grid__item pf-m-12-col pf-m-4-col-on-md">
        Vertical card list
      </div>
    </div>
  </div>
</div>
{{< /code >}}
