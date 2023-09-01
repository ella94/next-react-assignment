'use client';
import Login from './components/login';
import SignUp from './components/signup';

// modal
//import { ModalFormProvider } from './context/page';
import ModalProvider from './context/modal-provider';

// Hooks
import { ChangeEvent, useState } from 'react';

// Material UI imorts
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch/Switch';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function App() {
  const [checked, setChecked] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="App">
      <ModalProvider>
        <Paper elevation={3} className="p-2 pb-12">
          {checked ? (
            <Chip
              icon={<AccountCircleIcon />}
              label="login"
              variant="outlined"
              color="info"
            />
          ) : (
            <Chip
              icon={<AccountCircleIcon />}
              label="signup"
              variant="outlined"
              color="info"
            />
          )}
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          {checked ? <Login /> : <SignUp />}
        </Paper>
      </ModalProvider>
    </div>
  );
}
