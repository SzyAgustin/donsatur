import { GeneralActionTypes } from './general.types';

export const setPostas = postas => ({
    type: GeneralActionTypes.SET_POSTAS,
    payload: postas
});

export const setTurnosOfPosta2 = turnosOfPosta2 => ({
    type: GeneralActionTypes.SET_TURNOS_OF_POSTA_2,
    payload: turnosOfPosta2
});

export const setTurnosOfDateSelected = turnosOfDateSelected => ({
    type: GeneralActionTypes.SET_TURNOS_OF_DATE_SELECTED,
    payload: turnosOfDateSelected
});