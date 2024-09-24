"use client";

import { useState, useEffect } from 'react';
import axiosConfig from '@/services/base';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TokenList = () => {
  const [tokens, setTokens] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  const fetchTokens = async (pageNum) => {
    try {
      const response = await axiosConfig.get(`/api/session/otp/token/all/?page=${pageNum}&limit=${rowsPerPage}`);
      const { count, next, previous, results } = response.data;
      setTokens(results);
      setCount(count);
      setNext(next);
      setPrevious(previous);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

  useEffect(() => {
    fetchTokens(page + 1);
  }, [page, rowsPerPage]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Token</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Used At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens.map((token, index) => (
              <TableRow key={index}>
                <TableCell>{token.token_otp}</TableCell>
                <TableCell>{formatDate(token.created_at)}</TableCell>
                <TableCell>
                  {token.is_already_used ? (
                    <CheckCircleIcon style={{ color: 'green' }} />
                  ) : (
                    <CancelIcon style={{ color: 'red' }} />
                  )}
                </TableCell>
                <TableCell>
                  {token.is_already_used ? formatDate(token.date_used) : <AccessTimeIcon style={{ color: 'orange' }} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TokenList;
