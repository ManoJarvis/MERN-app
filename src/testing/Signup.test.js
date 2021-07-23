import { render, screen } from '@testing-library/react';
import Signup from '../components/registration/Signup';

test('renders the signup correctly', () => {
  render(<Signup />);
  const inputtxt=screen.getByLabelText('Username')
  expect(inputtxt).toHaveAttribute('type','text');
const input=screen.getByLabelText('Password')
expect(input).toHaveAttribute('type','password');

const email=screen.getByLabelText('Email')
expect(email).toHaveAttribute('type','email');

const mb=screen.getByLabelText('Mobile Number')
expect(mb).toHaveAttribute('type','number');

const news=screen.getByLabelText('signin for Newsletter')
expect(news).toHaveAttribute('type','checkbox');

const submitBtn = screen.getByRole('button', { name: 'REGISTER' });
expect(submitBtn).toHaveAttribute('type','submit');
});