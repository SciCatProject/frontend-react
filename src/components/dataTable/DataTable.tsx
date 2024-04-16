import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Data } from "./FetchDatasets";

import MUIDataTable from "mui-datatables";

import { usePagination } from "./pagination/PaginationContext";

import { createTheme, ThemeProvider } from '@mui/material/styles';

const customTheme = createTheme({
    components: {
        MUIDataTableHeadCell: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0099C8;',
                    color: 'white !important',
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

interface TableProps {
    data: Data[];
    columns: { name: string; label: string, options?: any }[];
}


const DataTable: React.FC<TableProps> = ({ data, columns }) => {
    const { count, page, rowsPerPage, setPage, setRowsPerPage } = usePagination();

    // console.log(data)

    const handleChangePage = (event: unknown, newPage: number) => {
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
        fixedHeader: true,
        viewColumns: true,
    };

    return (
        <div style={{ position: 'relative', top: '13.5rem', overflowX: "auto", width: '100%' }}>
            <ThemeProvider theme={customTheme}>
                <Paper elevation={1} style={{ padding: '5px' }}>
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
