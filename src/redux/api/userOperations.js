import instance from './instance';

export async function signUpRequest(username, password, isAdmin) {
  try {
    const result = await instance.post('/signup', {
      username,
      password,
      password_confirmation: password,
      is_admin: isAdmin,
    });

    return { isSuccess: true, user: result.data };
  } catch (error) {
    return error.response.data;
  }
}
