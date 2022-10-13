import { User, UserCredentials, UserDetails } from '../interfaces/user';

const API_URL = '/api/auth/';

export class AuthenticationError extends Error {

}

export async function loginUser(credentials: UserCredentials): Promise<User> {
  const response: Response = await fetch(`${API_URL}loginUser`, {
    headers: [
      ['Content-Type', 'application/json'],
    ],
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  const responseData = await response.json();
  if (responseData.user && responseData.token) {
    localStorage.setItem('user', JSON.stringify(responseData.user));
    localStorage.setItem('token', responseData.token);
    return responseData.user;
  }
  if (responseData.error) {
    throw new AuthenticationError(responseData.error);
  }
  throw new AuthenticationError('Unknown error');
}

export function logoutUser() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}

export async function registerUser(userDetails: UserDetails) {
  return fetch(`${API_URL}registerUser`, {
    headers: [
      ['Content-Type', 'application/json'],
    ],
    method: 'POST',
    body: JSON.stringify(userDetails),
  });
}

export function getCurrentUser(): User | null {
  const currentUser = localStorage.getItem('user');
  return currentUser ? JSON.parse(currentUser) : null;
}

export function authenticate(headers: string[][]): string[][] {
  const token = localStorage.getItem('token');
  return token
    ? headers.concat([['Authentication', token]])
    : headers;
}
