import { Box, Button, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Delete, ModeEdit } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployyes, removeEmployee } from '../store/Actions';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#1a1717',
  border: '1px solid #232323',
  boxShadow: 24,
  p: 4,
  color: 'white',
  textAlign: 'center',
};

const List = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [removeId, setRemoveId] = useState('');
  const handleClose = () => setOpen(false);
  const employees = useSelector((state) => state.employeesFetch.employees);
  const delEmployee = useSelector(
    (state) => state.employeesFetch.deleteEmployee
  );
  const dispatch = useDispatch();
  const data = employees.data;
  const message = employees.message;
  const notify = () =>
    toast.success(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  const deleteMessage = delEmployee.message;
  const notifyDelete = () =>
    toast.info(deleteMessage, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };
  const handleDelete = (id) => {
    setOpen(true);
    setRemoveId(id);
  };
  const handleDeleteEmployee = () => {
    dispatch(removeEmployee(removeId));
    handleClose();
    setRemoveId('');
    notifyDelete();
  };

  useEffect(() => {
    dispatch(getEmployyes());
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [data]);

  useEffect(() => {
    const notifyTimeout = setTimeout(() => {
      notify();
    }, 2000);
    return () => clearTimeout(notifyTimeout);
  }, []);

  const renderEmployees = data
    ? data.map((data, index) => {
        const { _id, name, age, salary } = data;
        return (
          <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            key={_id}
          >
            <TableCell component='th' scope='row'>
              {index + 1}
            </TableCell>

            <TableCell align='right'>{name}</TableCell>
            <TableCell align='right'>{age}</TableCell>
            <TableCell align='right'>{salary}</TableCell>
            <TableCell align='right'>
              <a onClick={() => handleEdit(_id)}>
                <ModeEdit color='primary' />
              </a>
            </TableCell>
            <TableCell align='right'>
              <a onClick={() => handleDelete(_id)}>
                <Delete color='error' />
              </a>
            </TableCell>
          </TableRow>
        );
      })
    : null;

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Are You Sure?
          </Typography>
          <Box
            sx={{
              mt: 2,
            }}
          >
            <Button
              color='secondary'
              variant='outlined'
              sx={{ mr: 1 }}
              onClick={handleDeleteEmployee}
            >
              Yes
            </Button>
            <Button
              variant='outlined'
              color='error'
              sx={{ ml: 1 }}
              onClick={handleClose}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      {isLoading ? (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      ) : data && data.length > 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
          }}
        >
          <Box
            sx={{
              width: 600,
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 200 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align='right'>NAME</TableCell>
                    <TableCell align='right'>AGE</TableCell>
                    <TableCell align='right'>SALARY</TableCell>
                    <TableCell align='right'>EDIT</TableCell>
                    <TableCell align='right'>DELETE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{renderEmployees}</TableBody>
              </Table>
              <Divider />
            </TableContainer>
          </Box>
        </Box>
      ) : (
        // Display a message when data is empty or undefined
        <Box sx={{ width: '100%' }}>
          <Typography variant='h6' textAlign='center' mt={5}>
            No Data Availble
          </Typography>
        </Box>
      )}
    </>
  );
};

export default List;
