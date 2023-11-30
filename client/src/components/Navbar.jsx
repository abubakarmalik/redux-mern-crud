import React from 'react';
import styled from '@emotion/styled';
import { LogoDev } from '@mui/icons-material';
import {
  AppBar,
  Button,
  ButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StyledToolBar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});
const WhiteTextBtn = styled(Button)({
  color: 'white',
});

const Navbar = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  };
  const navigateAdd = () => {
    navigate('/add');
  };
  return (
    <AppBar position='sticky'>
      <StyledToolBar>
        <LogoDev />
        <Typography variant='h6'>CURD APP</Typography>
        <ButtonGroup variant='text' aria-label='text button group'>
          <WhiteTextBtn onClick={navigateHome}>Home</WhiteTextBtn>
          <WhiteTextBtn onClick={navigateAdd}>Add</WhiteTextBtn>
        </ButtonGroup>
      </StyledToolBar>
    </AppBar>
  );
};

export default Navbar;
