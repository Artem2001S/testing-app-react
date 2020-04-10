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

export async function signInRequest(username, password) {
  try {
    const result = await instance.post('/signin', { username, password });

    return { isSuccess: true, user: result.data };
  } catch (error) {
    return { isSuccess: false, errorMessage: error.response.data.error };
  }
}

export async function logoutRequest() {
  try {
    const result = await instance.delete('/logout');

    if (result.data.success) {
      return { isSuccess: true };
    }
  } catch (error) {
    return { isSuccess: false, errorMessage: error.message };
  }
}
