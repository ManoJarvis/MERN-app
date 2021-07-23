import { render, screen } from '@testing-library/react';
import AdminLogin from '../components/admin/AdminLogin';

test('renders the adminform correctly', () => {
  render(<AdminLogin/>);
  const txtnm=screen.getByLabelText('Username')
  expect(txtnm).toHaveAttribute('type','text');
const passad=screen.getByLabelText('Password')
expect(passad).toHaveAttribute('type','password');
const btnad = screen.getByRole('button', { name: 'Login' });
expect(btnad).toHaveAttribute('type','submit');
});