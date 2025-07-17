# SAP CO Deep Dive - Refactored Structure

This project has been refactored into a modular structure for better maintainability and easier expansion.

## 📁 Project Structure

```
web/
├── index.html                    # Main HTML file
├── css/                         # Stylesheets
│   ├── main.css                 # Main styles
│   └── components/              # Component-specific styles
│       ├── flip-card.css        # Flip card animations
│       ├── org-diagram.css      # Organization diagram styles
│       └── steps.css            # Product costing steps styles
├── js/                          # JavaScript modules
│   ├── app.js                   # Main application entry point
│   └── modules/                 # Feature modules
│       ├── viewCounter.js       # View counter functionality
│       ├── navigation.js        # Navigation and menu handling
│       ├── orgStructure.js      # Interactive organization diagram
│       ├── costAllocation.js    # Cost allocation simulation
│       └── productCosting.js    # Product costing steps
├── components/                  # HTML components (for reference)
│   ├── header.html             # Header component
│   └── footer.html             # Footer component
└── README.md                   # This file
```

## 🚀 Features

### Core Modules

1. **ViewCounter** (`viewCounter.js`)

   - Tracks page visits using localStorage
   - Prevents spam counting (1-hour cooldown)
   - Smooth animation on counter updates
   - Vietnamese number formatting

2. **Navigation** (`navigation.js`)

   - Mobile-responsive navigation menu
   - Smooth scrolling between sections
   - Active section highlighting
   - Mobile menu toggle functionality

3. **OrgStructure** (`orgStructure.js`)

   - Interactive organization diagram
   - Node highlighting and information display
   - Hover effects and animations
   - Detailed organizational explanations

4. **CostAllocation** (`costAllocation.js`)

   - Interactive cost allocation simulation
   - Distribution vs Assessment comparison
   - Chart.js integration for visualizations
   - Real-time data updates

5. **ProductCosting** (`productCosting.js`)
   - 9-step product costing process
   - Interactive step navigation
   - Keyboard navigation support (Arrow keys)
   - Horizontal scrolling for mobile devices
   - Detailed step information with T-codes

## 🎨 CSS Architecture

### Main Styles (`main.css`)

- Base typography and layout
- Navigation styles
- Card components
- Chart containers
- Animation transitions

### Component Styles

- **flip-card.css**: 3D flip animations for submodule cards
- **org-diagram.css**: Interactive organizational chart styling
- **steps.css**: Product costing step navigation with custom scrollbars

## 📱 Responsive Design

- Mobile-first approach
- Horizontal scrolling for step navigation on small screens
- Custom scrollbars for better UX
- Touch-friendly interactions

## 🔧 Technical Features

### ES6 Modules

- Clean separation of concerns
- Easy to test and maintain
- Modular imports/exports
- No global namespace pollution

### Local Storage Integration

- Persistent view counting
- User preference storage
- Cross-session data retention

### Interactive Elements

- Keyboard navigation support
- Touch gestures for mobile
- Smooth animations and transitions
- Real-time chart updates

## 🚀 Getting Started

1. Open `index.html` in a modern web browser
2. All modules are automatically initialized
3. No build process required - vanilla JavaScript with ES6 modules

## 📈 Future Enhancements

The modular structure makes it easy to add new features:

1. **New Modules**: Add to `js/modules/` directory
2. **New Styles**: Add component CSS files
3. **New Sections**: Create new HTML sections and corresponding modules
4. **Data Integration**: Easy to connect to APIs or databases

## 🛠️ Development

### Adding a New Module

1. Create a new file in `js/modules/`
2. Export a class with an `init()` method
3. Import and initialize in `app.js`
4. Add corresponding CSS if needed

### Example:

```javascript
// js/modules/newFeature.js
export class NewFeature {
  constructor() {
    // Initialize properties
  }

  init() {
    // Setup functionality
  }
}

// js/app.js
import { NewFeature } from "./modules/newFeature.js";

// Add to modules object in SapCoApp constructor
this.modules = {
  // ...existing modules
  newFeature: new NewFeature(),
};
```

## 📋 Browser Support

- Modern browsers with ES6 module support
- Chrome 61+
- Firefox 60+
- Safari 10.1+
- Edge 16+

## 📝 Notes

- Uses CDN for external libraries (Tailwind CSS, Chart.js)
- No build process required
- Fully self-contained
- Works offline after initial load
