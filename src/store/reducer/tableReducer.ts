import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GridColDef} from '@mui/x-data-grid';

const initialState = {
    file: null as File | null,
    tableItem: [] as Array<{ [key: string]: string }>,
    keys: [] as Array<GridColDef>
}

export const tableSlice = createSlice({
    name: "tableList",
    initialState: initialState,
    reducers: {
        setFile: (state, action: PayloadAction<File | null>) => {
            state.file = action.payload
        },
        setCSVConvertData: (state, action: PayloadAction<Array<{ [key: string]: string }>>) => {
            state.tableItem = action.payload.map((item: any, index) => {
                const obj: { [key: string]: string } = {}
                obj.id = String(index)
                Object.keys(item).forEach(el => obj[el] = item[el])
                return obj
            })
            state.keys = Object.keys(action.payload[0]).map(item => (
                {field: item, headerName: item.toUpperCase(), width: 150}
            ))
        },
    }
});

// Action creators are generated for each case reducer function
export const {setFile, setCSVConvertData} = tableSlice.actions;

export default tableSlice.reducer;
