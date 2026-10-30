/* ==========================================================
   MICHAEL ANDERSON
   PROFESSIONAL PORTFOLIO

   Mobile navigation and accessibility
   ========================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* ========================================================
     1. MOBILE NAVIGATION
     ======================================================== */

  const menuButton = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector("#mobile-nav");

  if (!menuButton || !mobileNav) {
    return;
  }

  const mobileNavLinks = mobileNav.querySelectorAll("a");

  let previouslyFocusedElement = null;

  /**
   * Check whether the mobile menu is open.
   */
  function isMenuOpen() {
    return menuButton.getAttribute("aria-expanded") === "true";
  }

  /**
   * Open the mobile navigation.
   */
  function openMenu() {

    previouslyFocusedElement = document.activeElement;

    mobileNav.hidden = false;

    menuButton.setAttribute("aria-expanded", "true");

    menuButton.setAttribute(
      "aria-label",
      "Close navigation menu"
    );

    const firstLink = mobileNav.querySelector("a");

    if (firstLink) {
      firstLink.focus();
    }
  }

  /**
   * Close the mobile navigation.
   *
   * @param {boolean} restoreFocus
   */
  function closeMenu(restoreFocus = true) {

    mobileNav.hidden = true;

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.setAttribute(
      "aria-label",
      "Open navigation menu"
    );

    if (
      restoreFocus &&
      previouslyFocusedElement &&
      typeof previouslyFocusedElement.focus === "function"
    ) {
      previouslyFocusedElement.focus();
    }

    previouslyFocusedElement = null;
  }

  /**
   * Toggle the navigation.
   */
  function toggleMenu() {

    if (isMenuOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuButton.addEventListener("click", toggleMenu);


  /* ========================================================
     2. CLOSE MENU WHEN A LINK IS SELECTED
     ======================================================== */

  mobileNavLinks.forEach((link) => {

    link.addEventListener("click", () => {
      closeMenu(false);
    });

  });


  /* ========================================================
     3. KEYBOARD ACCESSIBILITY
     ======================================================== */

  document.addEventListener("keydown", (event) => {

    if (!isMenuOpen()) {
      return;
    }

    /*
     * Allow visitors to close the menu using Escape.
     */

    if (event.key === "Escape") {

      event.preventDefault();

      closeMenu();

      return;
    }

    /*
     * Keep keyboard navigation within the menu
     * while it is open.
     */

    if (event.key === "Tab") {

      const focusableElements = [
        ...mobileNav.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ].filter((element) => {

        return (
          element.getClientRects().length > 0 &&
          !element.hasAttribute("disabled")
        );

      });

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];

      const lastElement =
        focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {

        event.preventDefault();

        lastElement.focus();

      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {

        event.preventDefault();

        firstElement.focus();

      }
    }
  });


  /* ========================================================
     4. CLOSE MENU WHEN CLICKING OUTSIDE
     ======================================================== */

  document.addEventListener("pointerdown", (event) => {

    if (!isMenuOpen()) {
      return;
    }

    const clickedInsideMenu =
      mobileNav.contains(event.target);

    const clickedMenuButton =
      menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
      closeMenu(false);
    }

  });


  /* ========================================================
     5. RESET NAVIGATION ON DESKTOP
     ======================================================== */

  const desktopBreakpoint = window.matchMedia(
    "(min-width: 1101px)"
  );

  function handleViewportChange(event) {

    if (event.matches && isMenuOpen()) {
      closeMenu(false);
    }
  }

  desktopBreakpoint.addEventListener(
    "change",
    handleViewportChange
  );


  /* ========================================================
     6. INITIAL ACCESSIBILITY STATE
     ======================================================== */

  menuButton.setAttribute("aria-expanded", "false");

  menuButton.setAttribute(
    "aria-label",
    "Open navigation menu"
  );

  mobileNav.hidden = true;

});
