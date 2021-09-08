import { render, screen } from '@testing-library/react';
import DishForm from '../DishForm';

test('renders learn react link', () => {
  render(<DishForm />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
