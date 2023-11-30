import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Box, createTheme } from '@mui/material';
import Add from './components/Add';
import List from './components/List';

function App() {
  const [mode, setMode] = useState('dark');
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          bgcolor={'background.default'}
          color={'text.primary'}
          height='100vh'
        >
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<List />} />
              <Route path='/add' element={<Add />} />
              <Route path='/edit/:id' element={<Add />} />
              <Route path='/delete/:id' element={<List />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
