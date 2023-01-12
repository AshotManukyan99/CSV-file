import React from "react";
import CsvLink from "../../react-csv-export/src/CsvLink";
import {AppDispatch} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {getCSVItems} from "../../store/selectors/selectors";
import {csvFileToArray} from "../../helpers";
import {setCSVConvertData, setFile} from '../../store/reducer/tableReducer'
import {DataGrid, GridToolbarQuickFilter} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const MyTable: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const {items} = useSelector(getCSVItems);
    const {
        tableItem, file, keys
    } = items

    const fileReader = new FileReader();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation()
        if (e.target) {
            const files = e.target.files?.item(0) as File | null
            dispatch(setFile(files))
        }
    };

    const handleCSVItems = (string: string) => {
        dispatch(setCSVConvertData(csvFileToArray(string)))
    }

    const handleOnSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const text = event.target?.result as string;
                handleCSVItems(text);
            };

            fileReader.readAsText(file);
        }
    };


    return (
        <div style={{
            margin: '0 auto',
            maxWidth: '1200px'
        }}>
            <div style={{
                textAlign: 'center'
            }}>
                <h1> Choose your CSV file </h1>
                <form>

                    <input
                        style={{display: 'none'}}
                        id="raised-button-file"
                        multiple
                        type={"file"}
                        accept={".csv"}
                        onChange={handleOnChange}
                    />
                    <label htmlFor="raised-button-file">
                        <Button style={{
                            marginRight: '20px'
                        }} color="secondary" component="span">
                            Upload
                        </Button>
                    </label>

                    <Button disabled={!file} onClick={handleOnSubmit} variant="outlined">Create Table</Button>

                    <CsvLink data={tableItem} fileName="ExportedData">
                        <Button disabled={!keys.length} style={{
                            marginLeft: '20px'
                        }} variant="contained">EXPORT</Button>
                    </CsvLink>

                </form>

                <br/>
            </div>

            {
                !!keys.length &&
                <Box sx={{height: 400, width: '1200px'}}>
                    <DataGrid
                        components={{
                            Toolbar: () => <div
                                style={{
                                    margin: '15px'
                                }}
                            ><GridToolbarQuickFilter/></div>
                        }}
                        rows={tableItem}
                        columns={keys}
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        componentsProps={{
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: {debounceMs: 500},
                            },
                        }}
                    />
                </Box>
            }

        </div>
    );
}

export default MyTable;
