import HttpService from './HttpService'

const httpService = HttpService('/history')

export const getHistory = () => {
  return httpService.get('')
}
