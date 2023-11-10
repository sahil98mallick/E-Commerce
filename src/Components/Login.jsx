import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Facebook, LinkedIn, Google } from '@mui/icons-material';
import { Link, useNavigate, } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { loginstyles } from './Additional/Style';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { loginfunction } from '../ApiManager/AxiosManage';
import { useAuth } from './Context/Authentication';
import Layout from '../Layout/Layout';
import Swal from 'sweetalert2';
const Login = () => {
  const [auth, setauth] = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true)
    try {
      const response = await loginfunction(data);
      const logindata = response.data;
      if (logindata.success) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: logindata.message,
          timer: 1000,
          showConfirmButton: false,
        }).then(() => {
          setauth({
            ...auth,
            user: logindata.user,
            token: logindata.token,
          });
          localStorage.setItem('auth', JSON.stringify(logindata));
          navigate('/');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: logindata.message,
          timer: 1000,
          showConfirmButton: false,
        })
        toast.error(logindata.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Layout title={"Login"}>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1,
        background: `url('https://wallpaperset.com/w/full/7/5/a/545589.jpg')`,
        backgroundSize: 'cover',
      }}
      >
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container style={loginstyles.container}>
          <Typography variant="h4" style={{ marginBottom: '20px', color: '#333' }}>
            Welcome to ShopNest
          </Typography>
          <TextField
            variant="outlined"
            label="Email"
            placeholder='Enter Your Email'
            fullWidth
            margin="normal"
            style={loginstyles.textField}
            {...register("email", { required: "true" })}
            InputProps={{
              startAdornment: (
                <EmailIcon style={loginstyles.inputIcon} />
              ),
            }}
          />
          {errors.email?.type === "required" && <p>Email is Required</p>}
          <TextField
            variant="outlined"
            label="Password"
            fullWidth
            type="password"
            placeholder='Enter Your Password'
            margin="normal"
            style={loginstyles.textField}
            {...register("password", { required: "true" })}
            InputProps={{
              startAdornment: (
                <LockIcon style={loginstyles.inputIcon} />
              ),
            }}
          />
          {errors.password?.type === "required" && <p>Password is Required</p>}
          <Button type='submit' style={loginstyles.button}>
            Login
          </Button>
          <Link to='/register' style={loginstyles.link}>
            <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
              Do not have an account? Sign up here.
            </Typography>
          </Link>
          <Box style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
            <Facebook style={loginstyles.icon} color="primary" />
            <LinkedIn style={loginstyles.icon} color="secondary" />
            <Google style={loginstyles.icon} color="warning" />
          </Box>
        </Container>
      </form>
    </Layout>
  );
};

export default Login;
