/*
==========================================================
MICHAEL ANDERSON
SHARED WEBSITE JAVASCRIPT

Mobile navigation
==========================================================
*/

document.addEventListener("DOMContentLoaded", function () {

  const menuButton = document.getElementById("menu-button");
  const mobileNav = document.getElementById("mobile-nav");

  if (!menuButton || !mobileNav) {
    return;
  }


  // OPEN MENU

  function openMenu() {

    mobileNav.hidden = false;

    menuButton.setAttribute("aria-expanded", "true");

    menuButton.setAttribute(
      "aria-label",
      "Close navigation menu"
    );

  }


  // CLOSE MENU

  function closeMenu() {

    mobileNav.hidden = true;

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.setAttribute(
      "aria-label",
      "Open navigation menu"
    );

  }


  // TOGGLE MENU

  menuButton.addEventListener("click", function () {

    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    if (isOpen) {

      closeMenu();

    } else {

      openMenu();

    }

  });


  // CLOSE MENU WHEN A LINK IS SELECTED

  mobileNav.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {

      closeMenu();

    });

  });


  // CLOSE MENU USING ESCAPE KEY

  document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

      const isOpen =
        menuButton.getAttribute("aria-expanded") === "true";

      if (isOpen) {

        closeMenu();

        menuButton.focus();

      }

    }

  });


  // CLOSE MENU WHEN TAPPING OUTSIDE

  document.addEventListener("click", function (event) {

    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    if (!isOpen) {
      return;
    }

    if (
      !mobileNav.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {

      closeMenu();

    }

  });


  // CLOSE MENU WHEN SWITCHING TO DESKTOP

  const desktopQuery = window.matchMedia(
    "(min-width: 1101px)"
  );

  function handleDesktopChange(event) {

    if (event.matches) {

      closeMenu();

    }

  }

  if (desktopQuery.addEventListener) {

    desktopQuery.addEventListener(
      "change",
      handleDesktopChange
    );

  } else {

    desktopQuery.addListener(
      handleDesktopChange
    );

  }


  // INITIAL STATE

  closeMenu();

});
