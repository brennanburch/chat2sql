/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable sort-imports */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import { selectSqlQuery } from '../../slices/sqlQuerySlice';
import { useAppSelector } from '../../App/hooks';
import { useEffect, useState } from 'react';
import { instance } from '../../Config';

interface Results {
  id: number;
  ticker: string;
  commodity: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

function createData(
  id: number,
  ticker: string,
  commodity: string,
  date: string,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number,
) {
  return { id, ticker, commodity, date, open, high, low, close, volume };
}

export default function DataGrid() {
  const sqlQuery = useAppSelector(selectSqlQuery);
  const [results, setResults] = useState<Results[]>([]);

  const rows = results.map((result: Results) =>
    createData(
      result.id,
      result.ticker,
      result.commodity,
      result.date,
      result.open,
      result.high,
      result.low,
      result.close,
      result.volume,
    ),
  );
  console.log(rows);
  useEffect(() => {
    instance
      .get('/run-sql', {
        params: {
          sqlQuery: sqlQuery.query /*.trim().split('\n').join('')*/,
        },
      })
      .then((res) => {
        setResults(res.data.rows);
      })
      .catch((err) => {
        console.error('An error occurred: ', err);
      });
  }, [sqlQuery]);
  return (
    <>
      <Typography variant="h5" sx={{ p: 4, color: '#fff' }}>
        Query Results
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'black' }}>ID</TableCell>
              <TableCell sx={{ color: 'black' }} align="right">
                Ticker
              </TableCell>
              <TableCell sx={{ color: 'black' }} align="right">
                Commodity
              </TableCell>
              <TableCell sx={{ color: 'black' }} align="right">
                Date
              </TableCell>
              <TableCell sx={{ color: 'black' }} align="right">
                Open
              </TableCell>
              <TableCell sx={{ color: 'black' }} align="right">
                High
              </TableCell>
              <TableCell sx={{ color: 'black' }} align="right">
                Low
              </TableCell>
              <TableCell sx={{ color: 'black' }} align="right">
                Close
              </TableCell>
              <TableCell sx={{ color: 'black' }} align="right">
                Volume
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ color: 'black' }} component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell sx={{ color: 'black' }} align="right">
                  {row.ticker}
                </TableCell>
                <TableCell sx={{ color: 'black' }} align="right">
                  {row.commodity}
                </TableCell>
                <TableCell sx={{ color: 'black' }} align="right">
                  {row.date}
                </TableCell>
                <TableCell sx={{ color: 'black' }} align="right">
                  {row.open}
                </TableCell>
                <TableCell sx={{ color: 'black' }} align="right">
                  {row.high}
                </TableCell>
                <TableCell sx={{ color: 'black' }} align="right">
                  {row.low}
                </TableCell>
                <TableCell sx={{ color: 'black' }} align="right">
                  {row.close}
                </TableCell>
                <TableCell sx={{ color: 'black' }} align="right">
                  {row.volume}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
