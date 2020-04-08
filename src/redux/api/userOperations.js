import instance from './instance';

export async function signUpRequest(username, password, is_admin) {
  try {
    const result = await instance.post('/signup', {
      username,
      password,
      password_confirmation: password,
      is_admin,
    });

    return { isSuccess: true, user: result.data };
  } catch (error) {
    if (error.response.data.username) {
      return {
        isSuccess: false,
        errorMessage: error.response.data.username[0],
      };
    } else {
      return 'Something went wrong';
    }
  }
}
