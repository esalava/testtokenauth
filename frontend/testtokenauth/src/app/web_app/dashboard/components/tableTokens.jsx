"use client";

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
import { useTokens } from '@/services/tokenService/useToken';
import { usePaginationStore } from '../stores/useTokensStore';

const TokenList = () => {
  const page = usePaginationStore((state)=> state.page);
  const rowsPerPage = usePaginationStore((state)=> state.rowsPerPage);
  const { dataAllTokens, isLoadingAllTokens } = useTokens();

  if (isLoadingAllTokens) {
    return <p>Loading...</p>;
  }

  const { count, results } = dataAllTokens;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleChangePage = (event, newPage) => {
    usePaginationStore.setState({page: newPage});
  };

  const handleChangeRowsPerPage = (event) => {
    usePaginationStore.setState({rowsPerPage: parseInt(event.target.value, 10)});
    usePaginationStore.setState({page: 0});
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
            {results.map((token, index) => (
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
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={false}
      />
    </Paper>
  );
};

export default TokenList;
