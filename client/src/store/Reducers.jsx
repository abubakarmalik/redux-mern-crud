import {
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  GET_EMPLOYEES,
  DELETE_EMPLOYEE,
} from './Keys';

const initialState = {
  employees: [],
  addEmployee: '',
  editEmployee: '',
  deleteEmployee: '',
};

export default function employeesFetch(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEES: {
      return {
        ...state,
        employees: action.payload,
      };
    }
    case ADD_EMPLOYEE: {
      return {
        ...state,
        addEmployee: action.payload,
      };
    }
    case EDIT_EMPLOYEE: {
      return {
        ...state,
        editEmployee: action.payload,
      };
    }
    case DELETE_EMPLOYEE: {
      return {
        ...state,
        deleteEmployee: action.payload,
      };
    }
    default:
      return state;
  }
}
