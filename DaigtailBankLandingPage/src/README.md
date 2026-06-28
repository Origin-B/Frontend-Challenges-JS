# Frontend Mentor - Digital Bank Landing Page Solution

This is a solution to the [Digital Bank landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/digital-bank-landing-page-WaUhkoDN). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My Process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:
- View the optimal layout for the site depending on their device's screen size.
- See hover states for all interactive elements on the page.
- Toggle the mobile menu navigation smoothly without breaking the page layout.

### Screenshot

![Project Screenshot - mobile](/design/mobile-design.png) 
![Project Screenshot - desktop](/design/desktop-design.png) 


### Links
- Solution URL: [GitHub Repository](https://github.com/Origin-B/Frontend-Challenges-JS/tree/main/DigitalBankLandingPage) 
- Live Site URL: [GitHub Pages](https://origin-b.github.io/Frontend-Challenges-JS/DigitalBankLandingPage/)

## My Process

### Built with

- Semantic HTML5 markup
- Mobile-first workflow
- **Tailwind CSS v4.0** (Utilizing the modern `@theme` structure and CSS-based nesting)
- Vanilla JavaScript (Modern State Management approach)

### What I learned

This project was an amazing opportunity to dive deep into **Tailwind CSS v4.0** and clean JavaScript separation of concerns. 

1. **State Management in JS:**
   Instead of hardcoding image `src` replacements inside JavaScript functions, I learned how to use JS strictly for **State Management** (toggling states via class lists) and let HTML/Tailwind handle the visual execution under the hood.

   ```js
   // Clean state toggling without cluttering JS with DOM style mutations
   navbarBtn.addEventListener('click', () => {
     const isExpanded = navbarBtn.getAttribute('aria-expanded') === 'true';
     navbarBtn.setAttribute('aria-expanded', !isExpanded);
     navbarBtn.classList.toggle('active');
     navbar.classList.toggle('hidden');
     navbar.classList.toggle('flex');
   });