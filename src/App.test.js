import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app', () => {
  render(<App />);
  const app = screen.getAllByTestId('App');
  expect(app).toBeTruthy();
});
