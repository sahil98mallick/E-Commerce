import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { forgotpassword } from '../ApiManager/AxiosManage';
import { useAuth } from './Context/Authentication';
import Layout from '../Layout/Layout';

const ForgotPassword = () => {
  const [auth, setauth] = useAuth()
  const navigate = useNavigate();
  const [loading, setloading] = useState(false)
  const { register, formState: { errors }, handleSubmit, setValue } = useForm();
  const onSubmit = async (data) => {
    data.email = auth?.user?.email
    console.log(data);
    setloading(true)
    try {
      const forgotdata = await forgotpassword(data)
      const response = forgotdata.data
      if (response.success) {
        toast.success(response.message)
        navigate("/profile")
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setloading(false)
    }
  }
  return (
    <Layout title={"Forgot Password"}>
      <Typography gutterBottom variant="h4" align="center" style={{ marginTop: 20, fontFamily: "Times", fontFamily: "800" }}>
        Forgot Your Password
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 480, padding: "0px 5px", margin: "0 auto" }}>
          <CardContent>
            <center>
              <Card style={{ width: 150, height: 150, borderRadius: "50%" }}>
                <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" width={150} height={150} />
              </Card>
            </center>
            <form style={{ marginTop: 20 }} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField type="email" placeholder="Enter Email-Id" variant="outlined" fullWidth
                    value={auth?.user?.email} disabled focused
                  />
                  {errors.email?.type === "required" && <p>Email is Required</p>}
                </Grid>
                <Grid item xs={12}>
                  <TextField type="password" placeholder="Enter New Password" label="New Password" variant="outlined" fullWidth
                    {...register("newPassword", { required: true })} />
                  {errors.newPassword?.type === "required" && <p>Password is Required</p>}
                </Grid>
                <Grid item xs={12}>
                  <TextField type="answer" placeholder="Enter Your Secret Answer" label="Answer" variant="outlined" fullWidth
                    {...register("answer", { required: true })} />
                  {errors.answer?.type === "required" && <p>Asnwer is Required</p>}
                </Grid>
                <Grid item xs={4}>
                  <center>
                    <Button type="submit" variant="contained" color="success" fullWidth>
                      {loading ? <CircularProgress size={20} color="primary" /> : 'Submit'}
                    </Button>
                  </center>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Layout>
  )
}

export default ForgotPassword