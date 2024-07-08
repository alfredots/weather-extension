import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('A truthy statement', () => {
  it('should be equal to 2', () => {
    expect(1 + 1).toEqual(2);
  });
});

describe('App', () => {
  it('renders the App component', () => {
    render(<div>Test</div>);

    screen.debug(); // prints out the jsx in the App component unto the command line
  });
});
