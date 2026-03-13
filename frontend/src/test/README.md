# Test Utilities

This directory contains testing infrastructure for the LeafScan UI enhancement project.

## Files

### `setup.js`
Test setup file that configures the testing environment:
- Imports `@testing-library/jest-dom` for DOM matchers
- Configures automatic cleanup after each test
- Loaded automatically by Vitest via `vite.config.js`

### `tailwind-utils.js`
Utility functions for parsing and validating Tailwind CSS classes in tests:

#### Class Extraction
- `extractClasses(classNames)` - Extract individual classes from className strings or arrays

#### Transition & Animation
- `extractTransitionDurations(classNames)` - Extract duration values in milliseconds
- `extractAnimationDelays(classNames)` - Extract animation delay values
- `extractEasingFunctions(classNames)` - Extract easing function names
- `extractTransitionProperties(classNames)` - Extract properties being transitioned

#### Spacing
- `extractSpacingUtilities(classNames)` - Extract gap, margin, padding, and space utilities
- `isValidTailwindSpacing(spacingClass)` - Validate spacing follows Tailwind scale

#### Shadows & Effects
- `extractShadowUtilities(classNames)` - Extract shadow class names
- `extractShadowColors(shadowClasses)` - Extract color names from shadow utilities
- `extractBackdropFilters(classNames)` - Extract backdrop-filter utilities

#### Glass-morphism
- `hasGlassClass(classNames)` - Check if element has glass class

#### Performance
- `isGPUAccelerated(className)` - Check if class uses GPU-accelerated properties

## Running Tests

```bash
# Run all tests once
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui
```

## Property-Based Testing

This project uses [fast-check](https://github.com/dubzzz/fast-check) for property-based testing. Property-based tests verify that universal properties hold across many randomly generated inputs.

### Example Usage

```javascript
import * as fc from 'fast-check';

it('should maintain property across all inputs', () => {
  fc.assert(
    fc.property(
      fc.string(), // Generate random strings
      (input) => {
        const result = myFunction(input);
        expect(result).toSatisfySomeProperty();
      }
    ),
    { numRuns: 100 } // Run 100 iterations
  );
});
```

### Property Test Format

Each property-based test must include a comment tag referencing the design document:

```javascript
/**
 * Feature: leafscan-ui-enhancement, Property 1: Transition duration bounds
 * Validates: Requirements 2.5, 5.2
 */
```

## Writing Tests

### Unit Tests
- Test specific examples and edge cases
- Verify component rendering and behavior
- Use descriptive test names

### Property Tests
- Test universal properties across many inputs
- Configure minimum 100 iterations per test
- Tag with feature name and property number
- Reference requirements being validated

## Test Organization

```
src/test/
├── setup.js                    # Test environment setup
├── tailwind-utils.js           # Tailwind parsing utilities
├── tailwind-utils.test.js      # Unit tests for utilities
├── example-pbt.test.js         # Property-based test examples
└── README.md                   # This file
```

Component tests should be co-located with components:
```
src/components/
├── ImageUploader.jsx
└── ImageUploader.test.jsx
```
