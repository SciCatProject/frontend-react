import React from "react";
import Paper from "@mui/material/Paper";

import MUIDataTable from "mui-datatables";
import { Column } from "./DataTableColumns";

import { usePagination } from "./pagination/PaginationContext";

import { createTheme, ThemeProvider } from '@mui/material/styles';

import useResize from '../hooks/DataTableResize'

const customTheme = createTheme({
    components: {
        MUIDataTableHeadCell: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0099C8;',
                    color: 'white !important',
                    whiteSpace: 'nowrap'
                },
            },
        },
        MuiTablePagination: {
            styleOverrides: {
                root: {
                    position: 'absolute',
                    top: 15,
                    left: 20
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    width: '150px',
                    paddingLeft: 10
                },
            },
        },
    },
});

interface Data {
    [key: string]: any;
}

interface TableProps {
    data: Data[];
    columns: Column[];
}


const DataTable: React.FC<TableProps> = ({ data, columns }) => {

    const { count, page, rowsPerPage, setPage, setRowsPerPage } = usePagination();
    const { resizeRef } = useResize();

    // console.log(data)

    const handleChangePage = (_event: unknown, newPage: number) => {
        console.log('new page: ', newPage)
        console.log('this is the next page data: ')
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (newRowsPerPage: number) => {
        console.log('New rows per page:', newRowsPerPage);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };


    const options: any = {
        pagination: true,
        paginationPosition: 'top',
        rowsPerPageOptions: [5, 10, 25, 50, 100, 500, 1000],
        serverSide: true,
        page: page,
        rowsPerPage: rowsPerPage,
        count: count,
        onChangePage: (newPage: number) => handleChangePage(null, newPage),
        onChangeRowsPerPage: handleChangeRowsPerPage,
        selectableRows: 'none',
        resizableColumns: true,
        draggableColumns: {
            enabled: true,
        },
        sort: false,
        filter: false,
        download: false,
        print: false,
        search: false,
    };

    return (
        <div style={{ position: 'relative', top: '10rem', overflowX: "auto", width: '100%' }}
            ref={resizeRef}>
            <ThemeProvider theme={customTheme}>
                <Paper elevation={1} style={{ padding: '2px' }}>
                    <MUIDataTable
                        title={''}
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </Paper>
            </ThemeProvider>
        </div>
    );
};

export default DataTable;
