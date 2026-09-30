import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders the box value calculator heading', () => {
  render(<App />);
  expect(screen.getByText(/Box Value Calculator/i)).toBeInTheDocument();
});

test('shows the refresh pricing action and progress modal workflow', () => {
  render(<App />);
  const refreshButton = screen.getByRole('button', { name: /refresh go pricing/i });
  fireEvent.click(refreshButton);
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getAllByText(/fetching live pricing/i).length).toBeGreaterThan(0);
});
