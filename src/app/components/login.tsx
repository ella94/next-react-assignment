'use client';
import { ModalContext } from '../context/modal-provider';
import { useRouter } from 'next/navigation';

// Hooks
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';

// Material UI Imports
import { TextField, InputAdornment, IconButton, Button } from '@mui/material';

// Metarial UI Icon Imports
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';

export default function login() {
  const {
    register /* register: input 요소를 React hook form과 연결해 검증 규칙을 적용할 수 있게 하는 메소드 */,
    handleSubmit /* handleSubmit : form을 submit했을 때 실행할 함수 */,
    formState: {
      isSubmitting,
      isSubmitted,
      errors,
    } /* form state에 관한 정보를 담고 있는 객체 */,
  } = useForm();

  const router = useRouter();
  const { show } = useContext(ModalContext);

  const onSubmit = async (data: any) => {
    await new Promise((r) => setTimeout(r, 1000));

    if (data.id == 'helloworld' && data.password == 'Qwer!234') {
      console.log('Login Success.');
      router.push('/jobDetails');
    } else {
      show({
        title: 'Login Fail !',
        description: 'ID or Password is not matching.',
        confirmButton: 'ok',
        useCancelButton: false,
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-1">
        <TextField
          label="ID"
          fullWidth
          id="userId"
          variant="standard"
          sx={{ width: '100%' }}
          InputProps={{}}
          size="small"
          aria-invalid={
            isSubmitted ? (errors.id ? 'true' : 'false') : undefined
          }
          {...register('id', {
            required: true,
          })}
          helperText={errors?.id && 'ID is required'}
        />
      </div>
      <div className="mt-1">
        <TextField
          label="password"
          fullWidth
          id="userPassword"
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
          {...register('password', {
            required: true,
            minLength: 8,
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-])/,
              message: '',
            },
          })}
          helperText={errors?.password && 'Password is not valid.'}
        />
      </div>
      <div className="mt-2">
        <Button
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          type="submit"
          disabled={isSubmitting}
        >
          LOGIN
        </Button>
      </div>
    </form>
  );
}
