/**
 * Test utilities for parsing and validating Tailwind CSS classes
 */

/**
 * Extract all classes from a className string or array
 * @param {string|string[]} classNames - className string or array of strings
 * @returns {string[]} Array of individual class names
 */
export function extractClasses(classNames) {
  if (!classNames) return [];
  
  if (Array.isArray(classNames)) {
    return classNames.flatMap(cn => extractClasses(cn));
  }
  
  return classNames
    .split(/\s+/)
    .filter(Boolean)
    .map(c => c.trim());
}

/**
 * Extract transition duration values from className string
 * @param {string|string[]} classNames - className string or array
 * @returns {number[]} Array of duration values in milliseconds
 */
export function extractTransitionDurations(classNames) {
  const classes = extractClasses(classNames);
  const durations = [];
  
  for (const cls of classes) {
    // Match duration-{value} pattern
    const match = cls.match(/^duration-(\d+)$/);
    if (match) {
      durations.push(parseInt(match[1], 10));
    }
  }
  
  return durations;
}

/**
 * Extract spacing utilities (gap, margin, padding) from className string
 * @param {string|string[]} classNames - className string or array
 * @returns {Object} Object with arrays of spacing values by type
 */
export function extractSpacingUtilities(classNames) {
  const classes = extractClasses(classNames);
  const spacing = {
    gap: [],
    margin: [],
    padding: [],
    space: []
  };
  
  for (const cls of classes) {
    // Gap utilities: gap-{value}, gap-x-{value}, gap-y-{value}
    if (cls.match(/^gap-[xy]?-?\d+(\.\d+)?$/)) {
      spacing.gap.push(cls);
    }
    // Margin utilities: m-{value}, mx-{value}, my-{value}, mt-{value}, etc.
    else if (cls.match(/^-?m[trblxy]?-\d+(\.\d+)?$/)) {
      spacing.margin.push(cls);
    }
    // Padding utilities: p-{value}, px-{value}, py-{value}, pt-{value}, etc.
    else if (cls.match(/^p[trblxy]?-\d+(\.\d+)?$/)) {
      spacing.padding.push(cls);
    }
    // Space utilities: space-x-{value}, space-y-{value}
    else if (cls.match(/^space-[xy]-\d+(\.\d+)?$/)) {
      spacing.space.push(cls);
    }
  }
  
  return spacing;
}

/**
 * Extract shadow utilities from className string
 * @param {string|string[]} classNames - className string or array
 * @returns {string[]} Array of shadow class names
 */
export function extractShadowUtilities(classNames) {
  const classes = extractClasses(classNames);
  const shadows = [];
  
  for (const cls of classes) {
    // Match shadow utilities: shadow, shadow-{size}, shadow-{color}
    if (cls.match(/^(hover:)?shadow(-\w+)?(\/\d+)?$/)) {
      shadows.push(cls);
    }
  }
  
  return shadows;
}

/**
 * Extract shadow colors from shadow utilities
 * @param {string[]} shadowClasses - Array of shadow class names
 * @returns {string[]} Array of color names used in shadows
 */
export function extractShadowColors(shadowClasses) {
  const colors = [];
  
  for (const cls of shadowClasses) {
    // Match shadow-{color}-{shade} or shadow-{color}-{shade}/{opacity}
    const match = cls.match(/shadow-([a-z]+)-\d+/);
    if (match) {
      colors.push(match[1]);
    }
    // Match shadow-black
    else if (cls.includes('shadow-black')) {
      colors.push('black');
    }
  }
  
  return colors;
}

/**
 * Check if element has glass-morphism class
 * @param {string|string[]} classNames - className string or array
 * @returns {boolean} True if glass class is present
 */
export function hasGlassClass(classNames) {
  const classes = extractClasses(classNames);
  return classes.includes('glass');
}

/**
 * Extract backdrop-filter utilities from className string
 * @param {string|string[]} classNames - className string or array
 * @returns {string[]} Array of backdrop-filter class names
 */
export function extractBackdropFilters(classNames) {
  const classes = extractClasses(classNames);
  const filters = [];
  
  for (const cls of classes) {
    if (cls.match(/^backdrop-(blur|brightness|contrast|grayscale|hue-rotate|invert|opacity|saturate|sepia)/)) {
      filters.push(cls);
    }
  }
  
  return filters;
}

/**
 * Extract animation delay values from className string
 * @param {string|string[]} classNames - className string or array
 * @returns {number[]} Array of delay values in milliseconds
 */
export function extractAnimationDelays(classNames) {
  const classes = extractClasses(classNames);
  const delays = [];
  
  for (const cls of classes) {
    // Match delay-{value} pattern
    const match = cls.match(/^delay-(\d+)$/);
    if (match) {
      delays.push(parseInt(match[1], 10));
    }
  }
  
  return delays;
}

/**
 * Extract easing functions from className string
 * @param {string|string[]} classNames - className string or array
 * @returns {string[]} Array of easing function names
 */
export function extractEasingFunctions(classNames) {
  const classes = extractClasses(classNames);
  const easings = [];
  
  for (const cls of classes) {
    // Match ease-{function} pattern
    const match = cls.match(/^ease-(in-out|in|out|linear)$/);
    if (match) {
      easings.push(match[1]);
    } else if (cls === 'ease') {
      easings.push('default');
    }
  }
  
  return easings;
}

/**
 * Extract animated properties from transition utilities
 * @param {string|string[]} classNames - className string or array
 * @returns {string[]} Array of property names being transitioned
 */
export function extractTransitionProperties(classNames) {
  const classes = extractClasses(classNames);
  const properties = [];
  
  for (const cls of classes) {
    if (cls === 'transition') {
      properties.push('default');
    } else if (cls === 'transition-all') {
      properties.push('all');
    } else if (cls === 'transition-colors') {
      properties.push('colors');
    } else if (cls === 'transition-opacity') {
      properties.push('opacity');
    } else if (cls === 'transition-shadow') {
      properties.push('shadow');
    } else if (cls === 'transition-transform') {
      properties.push('transform');
    }
  }
  
  return properties;
}

/**
 * Validate that spacing value follows Tailwind's spacing scale (multiples of 0.25rem)
 * @param {string} spacingClass - Spacing class name (e.g., 'gap-4', 'p-6')
 * @returns {boolean} True if valid Tailwind spacing value
 */
export function isValidTailwindSpacing(spacingClass) {
  // Extract numeric value from class
  const match = spacingClass.match(/-(\d+(\.\d+)?)$/);
  if (!match) return false;
  
  const value = parseFloat(match[1]);
  
  // Tailwind spacing scale: 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96
  const validValues = [
    0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96
  ];
  
  return validValues.includes(value);
}

/**
 * Check if a class uses GPU-accelerated properties
 * @param {string} className - Single class name
 * @returns {boolean} True if class uses GPU-accelerated property
 */
export function isGPUAccelerated(className) {
  // GPU-accelerated properties: transform (scale, translate, rotate) and opacity
  return className.match(/^(scale|translate|rotate|-translate|opacity|hover:scale|hover:translate|hover:rotate|hover:-translate|hover:opacity)/);
}
