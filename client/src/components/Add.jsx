import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEmployee, editExistingEmployee } from '../store/Actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';

const Add = () => {
  const addEmp = useSelector((state) => state.employeesFetch.addEmployee);
  const employees = useSelector((state) => state.employeesFetch.employees);
  const updateEmp = useSelector((state) => state.employeesFetch.editEmployee);
  const dispatch = useDispatch();
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [employee, setEmployee] = useState({
    name: '',
    age: '',
    salary: '',
  });
  const [editEmployee, setEditEmployee] = useState({
    name: '',
    age: '',
    salary: '',
  });

  const notify = () => {
    const resMessage = addEmp.message;
    const resEditMessage = updateEmp.message;
    if (!id) {
      toast.success(resMessage, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } else {
      toast.success(resEditMessage, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (id && employees && employees.data) {
      const allEmployees = employees.data;
      const findEmployee = allEmployees.find((item) => item._id === id);

      if (findEmployee) {
        setEditEmployee({
          name: findEmployee.name,
          age: findEmployee.age,
          salary: findEmployee.salary,
        });
      } else {
        console.log('Employee not found with ID:', id);
      }
    }
  }, []);

  // const editEmpyloyee = () => {};

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (id) {
      setEditEmployee({ ...editEmployee, [name]: value });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const reset = () => {
    if (!id) {
      setEmployee({
        name: '',
        age: '',
        salary: '',
      });
    } else {
      setEditEmployee({
        name: '',
        age: '',
        salary: '',
      });
    }
  };
  const validate = () => {
    if (!id) {
      if (!employee.name) {
        setError1(true);
      } else {
        setError1(false);
      }

      if (!employee.age) {
        setError2(true);
      } else {
        setError2(false);
      }

      if (!employee.salary) {
        setError3(true);
      } else {
        setError3(false);
      }
      return !employee.name || !employee.age || !employee.salary;
    } else {
      if (!editEmployee.name) {
        setError1(true);
      } else {
        setError1(false);
      }

      if (!editEmployee.age) {
        setError2(true);
      } else {
        setError2(false);
      }

      if (!editEmployee.salary) {
        setError3(true);
      } else {
        setError3(false);
      }
      return !editEmployee.name || !editEmployee.age || !editEmployee.salary;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      if (!id) {
        dispatch(addEmployee(employee));
        setTimeout(() => {
          notify();
        }, 2000);
      } else {
        dispatch(editExistingEmployee(id, editEmployee));
        setTimeout(() => {
          notify();
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }, 2000);
      }

      reset();
    }
  };

  return (
    <>
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5,
        }}
      >
        <Paper sx={{ padding: 2, width: 280 }}>
          <form>
            <Box>
              <Typography variant='h6' fontWeight={500} color='primary'>
                Add Employee
              </Typography>
            </Box>
            <Box mb={1}>
              <TextField
                name='name'
                value={!id ? employee.name : editEmployee.name}
                onChange={handleOnChange}
                id='standard-error-helper-text'
                label='Name'
                placeholder='Enter Name'
                variant='standard'
                error={error1}
                helperText={error1 ? 'Required' : ''}
                fullWidth
              />
            </Box>
            <Box mb={1}>
              <TextField
                name='age'
                value={!id ? employee.age : editEmployee.age}
                onChange={handleOnChange}
                id='standard-error-helper-text'
                label='Age'
                placeholder='Enter Age'
                variant='standard'
                type='number'
                error={error2}
                helperText={error2 ? 'Required' : ''}
                fullWidth
              />
            </Box>
            <Box mb={2}>
              <TextField
                name='salary'
                value={!id ? employee.salary : editEmployee.salary}
                onChange={handleOnChange}
                id='standard-error-helper-text'
                label='Salary'
                placeholder='Enter Salary'
                variant='standard'
                type='number'
                error={error3}
                helperText={error3 ? 'Required' : ''}
                fullWidth
              />
            </Box>

            <Box m={1}>
              <Button
                variant='contained'
                sx={{ float: 'right', mb: 2 }}
                onClick={handleSubmit}
                type='submit'
              >
                Add
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Add;
