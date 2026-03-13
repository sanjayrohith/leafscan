import { describe, it, expect } from 'vitest';
import {
  extractClasses,
  extractTransitionDurations,
  extractSpacingUtilities,
  extractShadowUtilities,
  extractShadowColors,
  hasGlassClass,
  extractBackdropFilters,
  extractAnimationDelays,
  extractEasingFunctions,
  extractTransitionProperties,
  isValidTailwindSpacing,
  isGPUAccelerated
} from './tailwind-utils';

describe('Tailwind Utilities', () => {
  describe('extractClasses', () => {
    it('should extract classes from a string', () => {
      const classes = extractClasses('text-xl font-bold text-leaf-400');
      expect(classes).toEqual(['text-xl', 'font-bold', 'text-leaf-400']);
    });

    it('should handle empty strings', () => {
      expect(extractClasses('')).toEqual([]);
      expect(extractClasses(null)).toEqual([]);
    });

    it('should handle arrays of class strings', () => {
      const classes = extractClasses(['text-xl font-bold', 'text-leaf-400']);
      expect(classes).toEqual(['text-xl', 'font-bold', 'text-leaf-400']);
    });
  });

  describe('extractTransitionDurations', () => {
    it('should extract duration values', () => {
      const durations = extractTransitionDurations('transition duration-300 ease-out');
      expect(durations).toEqual([300]);
    });

    it('should extract multiple durations', () => {
      const durations = extractTransitionDurations('duration-200 hover:duration-400');
      expect(durations).toEqual([200, 400]);
    });
  });

  describe('extractSpacingUtilities', () => {
    it('should extract gap utilities', () => {
      const spacing = extractSpacingUtilities('gap-4 gap-x-6');
      expect(spacing.gap).toContain('gap-4');
      expect(spacing.gap).toContain('gap-x-6');
    });

    it('should extract margin utilities', () => {
      const spacing = extractSpacingUtilities('mt-4 mx-6 -mb-2');
      expect(spacing.margin).toContain('mt-4');
      expect(spacing.margin).toContain('mx-6');
      expect(spacing.margin).toContain('-mb-2');
    });

    it('should extract padding utilities', () => {
      const spacing = extractSpacingUtilities('p-4 px-6 py-8');
      expect(spacing.padding).toContain('p-4');
      expect(spacing.padding).toContain('px-6');
      expect(spacing.padding).toContain('py-8');
    });
  });

  describe('extractShadowUtilities', () => {
    it('should extract shadow classes', () => {
      const shadows = extractShadowUtilities('shadow-lg hover:shadow-xl');
      expect(shadows).toContain('shadow-lg');
      expect(shadows).toContain('hover:shadow-xl');
    });

    it('should extract shadow with colors', () => {
      const shadows = extractShadowUtilities('shadow-leaf-500/10');
      expect(shadows).toContain('shadow-leaf-500/10');
    });
  });

  describe('extractShadowColors', () => {
    it('should extract color names from shadows', () => {
      const colors = extractShadowColors(['shadow-leaf-500', 'shadow-black/10']);
      expect(colors).toContain('leaf');
      expect(colors).toContain('black');
    });
  });

  describe('hasGlassClass', () => {
    it('should detect glass class', () => {
      expect(hasGlassClass('glass rounded-xl p-5')).toBe(true);
      expect(hasGlassClass('rounded-xl p-5')).toBe(false);
    });
  });

  describe('extractBackdropFilters', () => {
    it('should extract backdrop filter utilities', () => {
      const filters = extractBackdropFilters('backdrop-blur-md backdrop-brightness-110');
      expect(filters).toContain('backdrop-blur-md');
      expect(filters).toContain('backdrop-brightness-110');
    });
  });

  describe('extractAnimationDelays', () => {
    it('should extract delay values', () => {
      const delays = extractAnimationDelays('delay-100 delay-200');
      expect(delays).toEqual([100, 200]);
    });
  });

  describe('extractEasingFunctions', () => {
    it('should extract easing functions', () => {
      const easings = extractEasingFunctions('ease-out ease-in-out');
      expect(easings).toContain('out');
      expect(easings).toContain('in-out');
    });
  });

  describe('extractTransitionProperties', () => {
    it('should extract transition properties', () => {
      const props = extractTransitionProperties('transition-all transition-opacity');
      expect(props).toContain('all');
      expect(props).toContain('opacity');
    });
  });

  describe('isValidTailwindSpacing', () => {
    it('should validate Tailwind spacing values', () => {
      expect(isValidTailwindSpacing('gap-4')).toBe(true);
      expect(isValidTailwindSpacing('p-6')).toBe(true);
      expect(isValidTailwindSpacing('m-0.5')).toBe(true);
      expect(isValidTailwindSpacing('gap-999')).toBe(false);
    });
  });

  describe('isGPUAccelerated', () => {
    it('should identify GPU-accelerated properties', () => {
      expect(isGPUAccelerated('scale-105')).toBe(true);
      expect(isGPUAccelerated('translate-x-4')).toBe(true);
      expect(isGPUAccelerated('opacity-50')).toBe(true);
      expect(isGPUAccelerated('hover:scale-110')).toBe(true);
      expect(isGPUAccelerated('text-xl')).toBe(false);
    });
  });
});
