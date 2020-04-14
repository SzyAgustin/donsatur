import { FormActionTypes } from './form.types'

export const setPosta = posta => ({
    type: FormActionTypes.SET_POSTA,
    payload: posta
});