import HttpService from './HttpService'

const httpService = HttpService('/account')
const paymentService = HttpService('/payment')


export const withdraw = (value) => httpService.post('/withdraw', { value })
export const deposit = (value) => httpService.post('/deposit', { value })
export const payment = ({ value, description = 'teste', accountId }) => paymentService.post('', {
    value: parseFloat(value),
    description,
    destinationAccount: accountId
})

export const getAccountInfo = () => httpService.get('/info')
export const getAccounts = () => httpService.get('')
