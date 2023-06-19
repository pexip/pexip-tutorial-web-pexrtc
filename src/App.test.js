import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const app = screen.getAllByTestId('App');
  expect(app).toBeInTheDocument();
});
