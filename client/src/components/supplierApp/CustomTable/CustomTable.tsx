import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/material';
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

export default function CustomTable() {
  const pages = [5, 10, 25]
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  return (
    <div className="CustomTable">
        <h2 className="dashboard-heading">Your Orders</h2>
        <TableContainer component={Paper}
        style={{boxShadow: '8px 13px 20px 0px' }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Product</TableCell>
                <TableCell align="left">Tracking ID</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.trackingId}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                  </TableCell>
                  <TableCell align="left" className="Details">Detail</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  );
}
