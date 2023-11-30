import API from '../api/ApiConnection';
import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  DELETE_EMPLOYEE,
} from './Keys';

let allemployees;

export const getEmployyes = () => async (dispatch) => {
  API.get('/')
    .then((response) => {
      allemployees = response.data;
      dispatch({
        type: GET_EMPLOYEES,
        payload: allemployees,
      });
    })
    .catch((error) => console.log(error));
};

export const addEmployee = (employee) => async (dispatch) => {
  API.post('/add', employee)
    .then((response) => {
      let data = response.data;
      dispatch({
        type: ADD_EMPLOYEE,
        payload: data,
      });
    })
    .catch((error) => console.log(error));
};

export const editExistingEmployee = (id, employee) => async (dispatch) => {
  API.put(`/edit/${id}`, employee)
    .then((response) => {
      let data = response.data;
      dispatch({
        type: EDIT_EMPLOYEE,
        payload: data,
      });
    })
    .catch((error) => console.log(error));
};

export const removeEmployee = (id) => async (dispatch) => {
  API.delete(`/delete/${id}`)
    .then((response) => {
      let data = response.data;
      let deleted_id = data.data._id;
      let exsitingEmployees = allemployees.data;
      exsitingEmployees = exsitingEmployees.filter(
        (item) => item._id !== deleted_id
      );
      dispatch({
        type: DELETE_EMPLOYEE,
        payload: data,
      });
      dispatch({
        type: GET_EMPLOYEES,
        payload: exsitingEmployees,
      });
    })
    .catch((error) => console.log(error));
};
