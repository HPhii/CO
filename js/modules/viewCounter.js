// View Counter Module
export class ViewCounter {
  constructor() {
    this.viewCounterKey = "sap-co-view-count";
    this.lastVisitKey = "sap-co-last-visit";
    this.oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
  }

  init() {
    let viewCount = parseInt(localStorage.getItem(this.viewCounterKey) || "0");
    const lastVisit = localStorage.getItem(this.lastVisitKey);
    const now = new Date().getTime();

    // Only increment if more than 1 hour has passed since last visit
    if (!lastVisit || now - parseInt(lastVisit) > this.oneHour) {
      viewCount++;
      localStorage.setItem(this.viewCounterKey, viewCount.toString());
      localStorage.setItem(this.lastVisitKey, now.toString());
    }

    this.displayViewCount(
      viewCount,
      !lastVisit || now - parseInt(lastVisit) > this.oneHour
    );
  }

  displayViewCount(count, shouldAnimate = false) {
    const viewCounterElement = document.getElementById("view-counter");
    if (viewCounterElement) {
      viewCounterElement.textContent = count.toLocaleString("vi-VN");

      // Add a subtle animation when count updates
      if (shouldAnimate) {
        this.animateCounter(viewCounterElement);
      }
    }
  }

  animateCounter(element) {
    element.style.transform = "scale(1.2)";
    element.style.color = "#0a4d68";
    setTimeout(() => {
      element.style.transform = "scale(1)";
      element.style.color = "";
    }, 300);
  }
}
