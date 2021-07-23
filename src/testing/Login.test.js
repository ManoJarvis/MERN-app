import { render, screen } from '@testing-library/react';
import Login from '../components/registration/Login';

test('renders the form correctly', () => {
  render(<Login />);
  const inputtxt=screen.getByLabelText('Username')
  expect(inputtxt).toHaveAttribute('type','text');
const input=screen.getByLabelText('Password')
expect(input).toHaveAttribute('type','password');
const submitBtn = screen.getByRole('button', { name: 'Login' });
expect(submitBtn).toHaveAttribute('type','submit');
});