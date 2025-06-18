import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Split the name into firstName and lastName
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Use email as username if username is not provided
    const usernameToUse = username || email;

    // Prepare data for backend API
    const registrationData = {
      username: usernameToUse,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };

    // Make request to backend API
    const response = await axios.post(
      `${process.env.BACKEND_API_URL}/api/auth/register`,
      registrationData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;

    return res.status(200).json({
      success: true,
      message: 'Account created successfully',
      user: data.user || data,
    });
  } catch (error) {
    console.error('Registration error:', error);

    // Handle axios error response
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status || 400).json({
        success: false,
        message: error.response.data?.message || 'Registration failed',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'An error occurred during registration',
    });
  }
}
