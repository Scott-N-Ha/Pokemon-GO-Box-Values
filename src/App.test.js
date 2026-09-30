import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the box value calculator heading', () => {
  render(<App />);
  expect(screen.getByText(/Box Value Calculator/i)).toBeInTheDocument();
});
