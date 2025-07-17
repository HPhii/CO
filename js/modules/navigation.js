// Navigation Module
export class Navigation {
  constructor() {
    this.navLinks = document.querySelectorAll(".nav-link");
    this.sections = document.querySelectorAll("section");
    this.mobileMenuButton = document.getElementById("mobile-menu-button");
    this.mobileMenu = document.getElementById("mobile-menu");
  }

  init() {
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupActiveNavigation();
  }

  setupMobileMenu() {
    if (this.mobileMenuButton && this.mobileMenu) {
      this.mobileMenuButton.addEventListener("click", () => {
        this.mobileMenu.classList.toggle("hidden");
      });
    }
  }

  setupSmoothScrolling() {
    this.sections.forEach((section) => {
      const links = document.querySelectorAll(
        `.nav-link[href="#${section.id}"]`
      );
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          section.scrollIntoView({ behavior: "smooth" });

          // Close mobile menu if open
          if (
            this.mobileMenu &&
            !this.mobileMenu.classList.contains("hidden")
          ) {
            this.mobileMenu.classList.add("hidden");
          }
        });
      });
    });
  }

  setupActiveNavigation() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activateLink(entry.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -75% 0px" }
    );

    this.sections.forEach((section) => {
      observer.observe(section);
    });
  }

  activateLink(id) {
    this.navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${id}`) {
        link.classList.add("active");
      }
    });
  }
}
