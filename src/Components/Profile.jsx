import {  Button, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { useAuth } from './Context/Authentication';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import Layout from '../Layout/Layout';

const Profile = () => {
    const [auth] = useAuth()
    return (
        <Layout title={"Profile"}>
            {
                !auth.user ? (
                    <>
                        No data Found
                    </>
                ) : (
                    <>
                        <div style={{ flexGrow: 1, padding: '20px' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={7} style={{ margin: '0 auto' }}>
                                    <Paper style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f4f6f8', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
                                        <div style={{
                                            width: '120px',
                                            height: '120px',
                                            margin: 'auto',
                                            overflow: 'hidden',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)',
                                            cursor: 'pointer',
                                            transition: 'transform 0.3s ease'
                                        }}
                                            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                        >
                                            <img
                                                alt="Donald McKinney"
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6v-Quj0rUbKfkYkO5xry7QsyV_3dNemjlbw&usqp=CAU"
                                                style={{
                                                    width: '100%',
                                                    height: 'auto'
                                                }}
                                            />
                                        </div>
                                        <Typography variant="h5" gutterBottom style={{ marginTop: '20px', fontWeight: 'bold' }}>
                                            Hello everybody, I am
                                        </Typography>
                                        <Typography variant="h4" gutterBottom style={{ color: '#2196f3', fontWeight: 'bold' }}>
                                            {auth?.user?.name}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom style={{ color: '#757575' }}>
                                            Junior React Developer
                                        </Typography>
                                        <Typography variant="body2" gutterBottom style={{ color: '#424242' }}>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, impedit dolores omnis deleniti labore recusandae repudiandae consequuntur officiis ut, quaerat doloremque corporis vitae, suscipit architecto? Provident, ab quas, veniam harum sit dolores ratione alias tenetur hic dignissimos minus. Odio possimus maiores error, repellendus accusantium voluptatibus. Facilis qui velit quaerat consectetur.
                                        </Typography>
                                        <div style={{ marginTop: '20px' }}>
                                            <Button style={{ margin: '10px', backgroundColor: '#e0e0e0', color: '#424242', boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)' }} startIcon={<LocalPhoneIcon />}>
                                                {auth?.user?.phone}
                                            </Button>
                                            <Button style={{ margin: '10px', backgroundColor: '#e0e0e0', color: '#424242', boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)' }} startIcon={<EmailIcon />}>
                                                {auth?.user?.email}
                                            </Button>
                                            <Button style={{ margin: '10px', backgroundColor: '#e0e0e0', color: '#424242', boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)' }} startIcon={<HomeIcon />}>
                                                {auth?.user?.address}
                                            </Button>
                                        </div>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>

                    </>
                )
            }
        </Layout>
    );
}

export default Profile;
