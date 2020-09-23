import HttpService from './HttpService'

const httpService = HttpService('/user')

export const authenticate = async ({ email, password }) => {
  try {
    const { data } = await httpService.post('/login', { email, password })
    localStorage.setItem('token', data.token)
    return data.token
  } catch (err) {
    console.error(err)
  }
}
