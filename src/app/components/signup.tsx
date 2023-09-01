'use client';
import { ModalContext } from '../context/modal-provider';

// Hooks
import { useRef, useState, useReducer, useContext } from 'react';

// Material UI Imports
import { TextField, InputAdornment, IconButton, Button } from '@mui/material';

// Metarial UI Icon Imports
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';

export const validateEmail = (email: string) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return regex.test(email);
};

export const validatePassword = (password: string) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,20}$/;
  return regex.test(password);
};

const initialState = {
  inputs: {
    newUserId: '',
    newUserEmail: '',
    newUserPassword: '',
  },
  errors: {
    idError: false,
    emailError: false,
    passwordError: false,
  },
};

const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'input':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.event.target.id]: action.event.target.value,
        },
      };
    case 'error':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.id]: action.value,
        },
      };
  }
};

export default function signup() {
  const [state, dispatch] = useReducer(inputReducer, initialState);
  const { inputs } = state;
  const { errors } = state;

  const idInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);

  const { show } = useContext(ModalContext);

  const openModal = (errorId: any, message: string) => {
    show({
      title: errorId,
      description: message,
      confirmButton: '확인',
      cancelButton: '취소',
      useCancelButton: false,
    });
  };

  const handleId = () => {
    let isError: boolean = false;
    if (inputs.newUserId.length < 1) {
      isError = true;
    }
    dispatch({ type: 'error', id: 'idError', value: isError });
    return isError;
  };

  const handleEmail = () => {
    let isError: boolean = false;
    if (!validateEmail(inputs.newUserEmail)) {
      isError = true;
    }
    dispatch({ type: 'error', id: 'emailError', value: isError });
    return isError;
  };

  const handlePassword = () => {
    let isError: boolean = false;
    if (!validatePassword(inputs.newUserPassword)) {
      isError = true;
    }
    dispatch({ type: 'error', id: 'passwordError', value: isError });
    return isError;
  };

  // SignUp Button OnClick
  const handleSubmit = () => {
    if (handleId()) {
      openModal('ID Error', 'ID is required.');

      if (idInputRef.current) {
        idInputRef.current.focus();
      }
      return false;
    } else {
      dispatch({ type: 'error', id: 'idError', value: false });
    }

    if (handleEmail()) {
      openModal('Email Error', 'Email is not valid.');

      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return false;
    }

    if (handlePassword()) {
      openModal('Password Error', 'Password is not valid.');

      if (passwordInputRef.current) {
        passwordInputRef.current.focus();
      }
      return false;
    }

    console.log(
      'id : ' +
        inputs.newUserId +
        ' , email: ' +
        inputs.newUserEmail +
        ', password : ' +
        inputs.newUserPassword,
    );

    return true;
  };

  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="mt-2">
        <TextField
          label="ID"
          id="newUserId"
          variant="standard"
          sx={{ width: '100%' }}
          size="small"
          value={inputs.newUserId}
          inputRef={idInputRef}
          onChange={(event) => {
            dispatch({ type: 'input', event });
          }}
          onBlur={handleId}
          error={errors.idError}
          helperText={errors.idError ? 'ID is required.' : ''}
        />
      </div>
      <div className="mt-1">
        <TextField
          label="Email Address"
          fullWidth
          id="newUserEmail"
          variant="standard"
          sx={{ width: '100%' }}
          size="small"
          type="text"
          value={inputs.newUserEmail}
          inputRef={emailInputRef}
          onChange={(event) => {
            dispatch({ type: 'input', event });
          }}
          onBlur={handleEmail}
          error={errors.emailError}
          helperText={errors.emailError ? 'Email is not valid.' : ''}
        />
      </div>
      <div className="mt-1">
        <TextField
          label="password"
          fullWidth
          id="newUserPassword"
          variant="standard"
          sx={{ width: '100%' }}
          size="small"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={inputs.newUserPassword}
          inputRef={passwordInputRef}
          onChange={(event) => {
            dispatch({ type: 'input', event });
          }}
          onBlur={handlePassword}
          error={errors.passwordError}
          helperText={errors.passwordError ? 'Password is not valid.' : ''}
        />
      </div>
      <div className="mt-2">
        <Button
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          onClick={handleSubmit}
        >
          SignUp
        </Button>
      </div>
    </div>
  );
}
