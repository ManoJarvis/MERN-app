import { render, screen } from '@testing-library/react';
import ContactUs from '../components/Home/ContactUs';

test('renders the contactusform correctly', () => {
  render(<ContactUs />);
  const inputtxt1=screen.getByPlaceholderText('username')
  expect(inputtxt1).toHaveAttribute('type','text');
const input1=screen.getByPlaceholderText('email')
expect(input1).toHaveAttribute('type','email');

const submitBtn1 = screen.getByRole('button', { name: 'Submit' });
expect(submitBtn1).toHaveAttribute('type','submit');
});