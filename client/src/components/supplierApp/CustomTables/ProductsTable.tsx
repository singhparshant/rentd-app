import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import TablePagination from '@mui/material/TablePagination';
import { CircularProgress, makeStyles, TableFooter, TablePagination } from '@mui/material';
import './CustomTable.css';
import useProducts from '../../../hooks/useProducts';
import useFilters from '../../../zustand/useFilters';
import './CustomTable.css';

function createData(
  name: string,
  trackingId: number,
  date: string,
  status: string,
) {
  return { name, trackingId, date, status };
}

const rows = [
  createData("Moutain Bike", 18908424, "1 March 2022", "Approved"),
  createData("Couch", 18908425, "3 May 2022", "Pending"),
  createData("Gold Equipment", 18908426, "5 June 2022", "Approved"),
  createData("Bed", 18908421, "22 June 2022", "Delivered"),
];

const makeStyle = (status: any)=>{
  if(status === 'Approved')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Pending')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function ProductsTable() {
  const filters = useFilters((state) => state.filters);
  const setFilters = useFilters((state: any) => state.setFilters);
  const { products: data, loading, error, pages } = useProducts(filters);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); 

  const handlePageClick = (d: any, pageNumber: any) => {
    setFilters("page", pageNumber);
    setPage(pageNumber);
  };

  const handleChangeRowsPerPage = (e: any) => {
    console.log(e.target.value)
    var limit = parseInt(e.target.value, 5)
    setFilters("limit", limit);
    setRowsPerPage(limit);
    setPage(1)
  }

  const emptyRows = page > 1 ? Math.max(1, (1 + page) * rowsPerPage - rows.length) : 1;
  
  return (
    <div className="CustomTable">
        <TableContainer component={Paper}
        style={{boxShadow: '8px 13px 20px 0px' }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Monthly Price</TableCell>
                <TableCell align="left">Supplier Id</TableCell>
                <TableCell align="left">Deposit</TableCell>
                {/* <TableCell align="left"></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <CircularProgress
                sx={{
                marginLeft: "50%",
                marginTop: "20px",
                marginBottom: "20px",
                color: "#2b0245",
                }}
                />
              ) : (
              data?.data?.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.category}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  {/* <TableCell align="left">
                    <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                  </TableCell> */}
                  {/* <TableCell align="left" className="Details"></TableCell> */}
                  <TableCell align="left">{row.monthlyPrice}</TableCell>
                  <TableCell align="left">{row.supplierId}</TableCell>
                  <TableCell align="left">{row.deposit}</TableCell>
                </TableRow>
              )))
              } {
                emptyRows > 0 && (
                  <TableRow style={{height: 53 * emptyRows}}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )
              }
              <TablePagination 
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                count={data?.data?.paging?.total} 
                rowsPerPage={rowsPerPage}
                page={page} 
                onRowsPerPageChange={handleChangeRowsPerPage}
                onPageChange={handlePageClick} 
                // nextIconButtonText=">"
                // backIconButtonText="<"
                />
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Box justifyContent={"center"} alignItems="center" display={"flex"}>
        <Pagination
          count={pages}
          defaultPage={1}
          onChange={handlePageClick}
          size="large"
          color="primary"
        />
      </Box> */}
    </div>
  )}
