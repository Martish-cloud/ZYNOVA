/**
 * ZYNOVA 3D Stacked-Scroll Motion Configuration
 * 
 * Centralized configuration to easily adjust the intensity of the
 * 3D stacking card physics, in-panel reveals, and transitions.
 */
export const motionConfig = {
  stack: {
    // Desktop scale & 3D tilt
    scaleTarget: 0.92,       // Target scale when covered (1 -> 0.92)
    rotateXTarget: 4,        // Degrees of backward tilt (0 -> 4deg)
    blurTarget: 8,           // Max blur in px (0 -> 8px)
    opacityTarget: 0.4,      // Dimmed opacity (1 -> 0.4)
    borderRadiusTarget: 48,  // Corner rounding in px when covered (0 -> 48px)
    perspective: 1400,       // Viewport 3D perspective in px

    // Mobile overrides (< 768px) to guarantee 60fps & no jank
    mobile: {
      scaleTarget: 0.96,
      rotateXTarget: 1.5,
      blurTarget: 3,
      opacityTarget: 0.6,
      borderRadiusTarget: 32,
      perspective: 1000,
    },

    // Sheet top corner radius for the rising section
    sheetTopRadiusDesktop: 52, // px
    sheetTopRadiusMobile: 36,  // px

    // Top shadow for rising sheet
    darkShadow: "0 -22px 60px -15px rgba(0, 0, 0, 0.75), 0 -4px 12px rgba(0, 0, 0, 0.4)",
    lightShadow: "0 -20px 50px -15px rgba(41, 39, 32, 0.18), 0 -4px 12px rgba(41, 39, 32, 0.08)",
  },

  // In-panel reveals & micro-animations
  inPanel: {
    headingBlur: 10,         // px blur at start of heading reveal
    cardStaggerDelay: 0.08,  // seconds between card reveals
    cardRiseDistance: 50,    // px vertical rise for cards
    cardInitialScale: 0.96,  // starting scale of staggered cards
    parallaxDefaultSpeed: 0.15,
  },

  // Hero word reveal
  hero: {
    wordStagger: 0.07,       // delay between words
    wordInitialBlur: 8,      // initial blur of headline words
    wordInitialOpacity: 0.22,// initial dimness of unrevealed words
  },

  // Lenis smooth scroll
  lenis: {
    duration: 1.15,          // scroll inertia duration
    wheelMultiplier: 1.0,
    touchMultiplier: 1.25,
  }
} as const;

export type MotionConfig = typeof motionConfig;
export default motionConfig;
