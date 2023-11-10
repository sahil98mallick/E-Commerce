import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import React from 'react';
import { useAuth } from './Context/Authentication';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { updateprofile } from '../ApiManager/AxiosManage';
import Layout from '../Layout/Layout';
const cardStyle = {
    maxWidth: 700,
    height: '630px',
    margin: '0 auto',
    marginTop: 30,
    textAlign: 'center',
    background: '#D4E6F1',
    borderRadius: 10,
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
};

const textFieldStyle = {
    margin: '10px 0'
};

// const buttonStyle = {
//     marginTop: 20,
//     marginBottom: 20,
//     background: '#2E86C1',
//     color: 'white',
//     padding: '10px 30px',
//     '&:hover': {
//         background: '#1F618D'
//     }
// };
const UpdateProfile = () => {
    const [auth] = useAuth();
    const { register, formState: { errors }, handleSubmit } = useForm();
    // Use the auth data as initial values
    const onSubmit = async (data) => {
        data.name = auth?.user.name;
        data.email = auth?.user.email;
        console.log(data);
        try {
            const response = await updateprofile(data)
            console.log(response);
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <Layout title={"Update Profile"}>
            <Card style={cardStyle}>
                <CardContent>
                    <Typography variant="h5" style={{ marginBottom: 20 }}>
                        Update Profile Details
                    </Typography>
                    <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Name"
                            value={auth?.user?.name}
                            variant="outlined"
                            fullWidth
                            disabled
                            style={textFieldStyle}
                        />

                        <TextField
                            label="Email"
                            value={auth?.user?.name}
                            variant="outlined"
                            fullWidth
                            disabled
                            style={textFieldStyle}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            style={textFieldStyle}
                            {...register("password", { required: true })}
                        />
                        {errors.password?.type === "required" && <p>Password is Required</p>}
                        <TextField
                            label="Phone"
                            variant="outlined"
                            fullWidth
                            style={textFieldStyle}
                            {...register("phone", { required: true })}
                        />
                        {errors.phone?.type === "required" && <p>Phone is Required</p>}
                        <TextField
                            label="Answer"
                            variant="outlined"
                            fullWidth
                            style={textFieldStyle}
                            {...register("answer", { required: true })}
                        />
                        {errors.answer?.type === "required" && <p>Answer is Required</p>}
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            style={textFieldStyle}
                            {...register("address", { required: true })}
                        />
                        {errors.address?.type === "required" && <p>Address is Required</p>}
                        <Button type='submit' variant="contained">
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Layout>
    );
}

export default UpdateProfile;
