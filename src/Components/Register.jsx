import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Facebook, LinkedIn, Google } from '@mui/icons-material';
import { Link, useNavigate, } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { registerstyles } from './Additional/Style';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useForm } from 'react-hook-form';
import { registerfunction } from '../ApiManager/AxiosManage';
import { toast } from 'react-toastify';
import Layout from '../Layout/Layout';
import Swal from 'sweetalert2';
const Register = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true)
    try {
      const fetchdata = await registerfunction(data);
      console.log(fetchdata.data);
      if (fetchdata.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Register Successful',
          text: fetchdata.message,
          timer: 1000,
          showConfirmButton: false,
        })
        toast.success(fetchdata.data.message);
        navigate("/login")
      } else {
        toast.error(fetchdata.message)
        Swal.fire({
          icon: 'error',
          title: 'Register Failed',
          text: fetchdata.message,
          timer: 1000,
          showConfirmButton: false,
        })
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Layout title={"Register"}>
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
        <Container style={registerstyles.container}>
          <Typography variant="h4" style={{ marginBottom: '20px', color: '#333' }}>
            Welcome to ShopNest
          </Typography>
          <TextField
            type='text'
            variant="outlined"
            label="Name"
            placeholder='Enter Your Name'
            fullWidth
            margin="normal"
            style={registerstyles.textField}
            {...register("name", { required: true })}
            InputProps={{
              startAdornment: (
                <BadgeIcon style={registerstyles.inputIcon} />
              ),
            }}
          />
          {errors.name?.type === "required" && <p>Name is Required</p>}
          <TextField
            type='email'
            variant="outlined"
            label="Email"
            placeholder='Enter Your Email'
            fullWidth
            margin="normal"
            style={registerstyles.textField}
            {...register("email", { required: true })}
            InputProps={{
              startAdornment: (
                <EmailIcon style={registerstyles.inputIcon} />
              ),
            }}
          />
          {errors.email?.type === "required" && <p>Email is Required</p>}
          <TextField
            type='number'
            variant="outlined"
            label="Phone"
            placeholder='Enter Your Phone'
            fullWidth
            margin="normal"
            style={registerstyles.textField}
            {...register("phone", { required: true })}
            InputProps={{
              startAdornment: (
                <PhoneIcon style={registerstyles.inputIcon} />
              ),
            }}
          />
          {errors.phone?.type === "required" && <p>Phone is Required</p>}
          <TextField
            variant="outlined"
            label="Password"
            fullWidth
            type="password"
            placeholder='Enter Your Password'
            margin="normal"
            style={registerstyles.textField}
            {...register("password", { required: true })}
            InputProps={{
              startAdornment: (
                <LockIcon style={registerstyles.inputIcon} />
              ),
            }}
          />
          {errors.password?.type === "required" && <p>Password is Required</p>}
          <TextField
            variant="outlined"
            label="Answer"
            fullWidth
            type="text"
            placeholder='Who is Your favorite Actor'
            margin="normal"
            style={registerstyles.textField}
            {...register("answer", { required: true })}
            InputProps={{
              startAdornment: (
                <QuestionAnswerIcon style={registerstyles.inputIcon} />
              ),
            }}
          />
          {errors.answer?.type === "required" && <p>Answer is Required</p>}
          <TextField
            variant="outlined"
            label="Address"
            fullWidth
            multiline
            rows={3}
            type="text"
            placeholder='Who is Your Address Here'
            margin="normal"
            style={registerstyles.textField}
            {...register("address", { required: true })}
            InputProps={{
              startAdornment: (
                <QuestionAnswerIcon style={registerstyles.inputIcon} />
              ),
            }}
          />
          {errors.address?.type === "required" && <p>Address is Required</p>}
          <Button type='submit' style={registerstyles.button}>
            Login
          </Button>
          <Link to='/login' style={registerstyles.link}>
            <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
              Already Registered? Login here.
            </Typography>
          </Link>
          <Box style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
            <Facebook style={registerstyles.icon} color="primary" />
            <LinkedIn style={registerstyles.icon} color="secondary" />
            <Google style={registerstyles.icon} color="warning" />
          </Box>
        </Container>
      </form>
    </Layout>
  );
};

export default Register;
