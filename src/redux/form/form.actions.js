import { FormActionTypes } from './form.types'

export const setPosta = posta => ({
    type: FormActionTypes.SET_POSTA,
    payload: posta
});

export const setDate = date => ({
    type: FormActionTypes.SET_DATE,
    payload: date
})

export const setTime = time => ({
    type: FormActionTypes.SET_TIME,
    payload: time
})