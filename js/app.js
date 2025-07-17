// Main Application Module
import { ViewCounter } from "./modules/viewCounter.js";
import { Navigation } from "./modules/navigation.js";
import { OrgStructure } from "./modules/orgStructure.js";
import { CostAllocation } from "./modules/costAllocation.js";
import { ProductCosting } from "./modules/productCosting.js";

class SapCoApp {
  constructor() {
    this.modules = {
      viewCounter: new ViewCounter(),
      navigation: new Navigation(),
      orgStructure: new OrgStructure(),
      costAllocation: new CostAllocation(),
      productCosting: new ProductCosting(),
    };
  }

  init() {
    // Initialize all modules
    Object.values(this.modules).forEach((module) => {
      if (module.init) {
        module.init();
      }
    });

    console.log("SAP CO Deep Dive App initialized successfully!");
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const app = new SapCoApp();
  app.init();
});
