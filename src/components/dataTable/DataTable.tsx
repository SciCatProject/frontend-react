import React, { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import { Switch } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import BuildIcon from '@mui/icons-material/Build';
import { usePagination } from "./pagination/PaginationContext";

interface Data {
    [key: string]: any;
}

interface TableProps {
  data: Data[];
  columns: { id: string; label: string }[];
}

const DataTable: React.FC<TableProps> = ({ data, columns }) => {
  const { count, page, rowsPerPage, setPage, setRowsPerPage } = usePagination();

  // console.log(data)

  const [showColumnPanel, setShowColumnPanel] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<{ [key: string]: boolean }>(() => {
    const initialVisibility: { [key: string]: boolean } = {};
    columns.forEach((column) => {
      initialVisibility[column.id] = true;
    });
    ['sourceFolder', 'metadata', 'ownerGroup', 'dataStatus'].forEach((columnId) => {
      initialVisibility[columnId] = false;
    });
    return initialVisibility;
  });

  // @ts-ignore
  const handleChangePage = (event: unknown, newPage: number) => {
    // console.log('new page: ', newPage)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    // console.log('New rows per page:', newRowsPerPage);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleToggleColumnVisibility = (columnId: string) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [columnId]: !prevVisibility[columnId],
    }));
  };

  return (
    <div
      style={{
        position: 'relative',
        top: '10rem',
        width: '100%',
        paddingRight: '10px',
        paddingBottom: '10px',
        overflowX: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100, 500, 1000]}
          component='div'
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <IconButton onClick={() => setShowColumnPanel(!showColumnPanel)}>
          <BuildIcon></BuildIcon>
        </IconButton>
      </div>
      {showColumnPanel && (
        <Card
          style={{
            position: 'absolute',
            top: '4rem',
            right: '10px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '500px',
            overflowY: 'auto',
          }}
        >
          {columns.map((column) => (
            <FormControlLabel
              key={column.id}
              control={
                <Switch
                  checked={columnVisibility[column.id]}
                  onChange={() => handleToggleColumnVisibility(column.id)}
                />
              }
              label={column.label}
            />
          ))}
        </Card>
      )}
      <Paper variant='outlined'>
        <TableContainer style={{ minHeight: '515px' }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(
                  (column) =>
                    columnVisibility[column.id] && (
                      <TableCell
                        style={{
                          width: '150px',
                          whiteSpace: 'nowrap',
                          fontSize: '14px',
                          backgroundColor: '#0099C8',
                          color: 'white',
                        }}
                        key={column.id}
                      >
                        {column.label}
                      </TableCell>
                    )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id} className='tableRow'>
                  {columns.map(
                    (column) =>
                      columnVisibility[column.id] && (
                        <TableCell
                          style={{
                            maxWidth: '250px',
                            height: '80px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          key={column.id}
                        >
                          {row[column.id]}
                        </TableCell>
                      )
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default DataTable;
