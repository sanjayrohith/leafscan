import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ImageUploader from '../components/ImageUploader';
import { extractClasses, extractShadowUtilities, extractTransitionDurations } from './tailwind-utils';

describe('ImageUploader Component', () => {
  const mockOnImageSelected = vi.fn();

  it('should render with enhanced upload icon size', () => {
    render(<ImageUploader onImageSelected={mockOnImageSelected} />);
    
    const uploadIcon = screen.getByRole('button');
    const classes = extractClasses(uploadIcon.className);
    
    // Check for w-20 h-20 in the icon container
    const iconContainer = uploadIcon.querySelector('.w-20');
    expect(iconContainer).toBeTruthy();
    expect(iconContainer.className).toContain('h-20');
  });

  it('should have hover shadow utilities', () => {
    render(<ImageUploader onImageSelected={mockOnImageSelected} />);
    
    const dropZone = screen.getByRole('button');
    const classes = extractClasses(dropZone.className);
    const shadows = extractShadowUtilities(classes.join(' '));
    
    // Should have hover shadow utilities
    expect(shadows.some(shadow => shadow.includes('hover:shadow-2xl'))).toBe(true);
    expect(shadows.some(shadow => shadow.includes('shadow-leaf-500/10'))).toBe(true);
  });

  it('should have focus-within ring effects for accessibility', () => {
    render(<ImageUploader onImageSelected={mockOnImageSelected} />);
    
    const dropZone = screen.getByRole('button');
    const classes = extractClasses(dropZone.className);
    
    // Should have focus-within ring classes
    expect(classes.some(cls => cls.includes('focus-within:ring-2'))).toBe(true);
    expect(classes.some(cls => cls.includes('focus-within:ring-leaf-400/50'))).toBe(true);
  });

  it('should have proper transition duration', () => {
    render(<ImageUploader onImageSelected={mockOnImageSelected} />);
    
    const dropZone = screen.getByRole('button');
    const classes = extractClasses(dropZone.className);
    const durations = extractTransitionDurations(classes.join(' '));
    
    // Should have 300ms transition duration
    expect(durations).toContain(300);
  });

  it('should have pulse animation on upload icon', () => {
    render(<ImageUploader onImageSelected={mockOnImageSelected} />);
    
    const dropZone = screen.getByRole('button');
    const iconContainer = dropZone.querySelector('.animate-pulse');
    
    expect(iconContainer).toBeTruthy();
  });
});