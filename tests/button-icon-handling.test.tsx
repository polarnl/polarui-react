import { render, screen } from '@testing-library/react';
import { Button } from '../src/components/Button';

const ComponentIcon = ({ className }: { className?: string }) => (
  <svg data-testid="component-icon" className={className} viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="8" cy="8" r="6" />
  </svg>
);

describe('Button icon handling', () => {
  it('renders a component-type icon via icon', () => {
    render(<Button icon={ComponentIcon}>Action</Button>);
    expect(screen.getByTestId('component-icon')).toBeInTheDocument();
  });

  it('renders a rendered element icon via iconNode', () => {
    render(<Button iconNode={<span data-testid="element-icon">X</span>}>Action</Button>);
    expect(screen.getByTestId('element-icon')).toBeInTheDocument();
  });

  it('renders a plain text or emoji icon via iconNode', () => {
    render(<Button iconNode="🔥">Deploy</Button>);
    expect(screen.getByText('🔥')).toBeInTheDocument();
  });

  it('renders a custom SVG node via iconNode', () => {
    render(
      <Button
        iconNode={
          <svg data-testid="custom-svg-icon" viewBox="0 0 16 16" aria-hidden="true">
            <rect x="3" y="3" width="10" height="10" />
          </svg>
        }
      >
        Custom
      </Button>,
    );

    expect(screen.getByTestId('custom-svg-icon')).toBeInTheDocument();
  });
});
