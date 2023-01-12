import {AppStateType} from "../index";

export const getCSVItems = (state: AppStateType) => ({
    items: state.table
})
