import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { extractClasses, isValidTailwindSpacing } from './tailwind-utils';

/**
 * Example property-based tests demonstrating fast-check usage
 * These tests verify universal properties across many randomly generated inputs
 */

describe('Property-Based Testing Examples', () => {
  it('extractClasses should always return an array', () => {
    fc.assert(
      fc.property(
        fc.string(),
        (classString) => {
          const result = extractClasses(classString);
          expect(Array.isArray(result)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('extractClasses should never return classes with whitespace', () => {
    fc.assert(
      fc.property(
        fc.string(),
        (classString) => {
          const result = extractClasses(classString);
          for (const cls of result) {
            expect(cls).not.toMatch(/\s/);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('extractClasses should handle arrays consistently', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string()),
        (classArray) => {
          const result = extractClasses(classArray);
          expect(Array.isArray(result)).toBe(true);
          // Result should be flattened
          for (const cls of result) {
            expect(typeof cls).toBe('string');
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
