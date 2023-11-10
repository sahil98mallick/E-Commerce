// =================================================Login Page====================================================
export const loginstyles = {
    container: {
        marginTop: '80px',
        position: 'relative',
        zIndex: 1,
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            boxShadow: '0 12px 60px rgba(0,0,0,0.2)',
        }
    },
    textField: {
        marginBottom: '20px',
        '& label.Mui-focused': {
            color: '#6d6d6d',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#6d6d6d',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#6d6d6d',
            },
        },
        '& .MuiInputAdornment-root .MuiSvgIcon-root': {
            color: '#6d6d6d',
        },
    },
    button: {
        marginTop: '20px',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        fontSize: "16px",
        fontFamily: "Arial, sans-serif",
        textTransform: 'none',
        padding: '10px 30px',
        borderRadius: '25px',
        '&:hover': {
            background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
        },
    },
    link: {
        textDecoration: "none",
        color: '#3f51b5',
        '&:hover': {
            textDecoration: "underline",
        },
    },
    icon: {
        fontSize: '40px',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    inputIcon: {
        color: '#9c9c9c',
        marginRight: '10px',
    },
};
// 
// =================================================Register Page====================================================
export const registerstyles = {
    container: {
        marginTop: '20px',
        position: 'relative',
        zIndex: 1,
        maxWidth: '550px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            boxShadow: '0 12px 60px rgba(0,0,0,0.2)',
        }
    },
    textField: {
        marginBottom: '10px',
        '& label.Mui-focused': {
            color: '#6d6d6d',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#6d6d6d',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#6d6d6d',
            },
        },
        '& .MuiInputAdornment-root .MuiSvgIcon-root': {
            color: '#6d6d6d',
        },
    },
    button: {
        marginTop: '10px',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        fontSize: "16px",
        fontFamily: "Arial, sans-serif",
        textTransform: 'none',
        padding: '10px 30px',
        borderRadius: '25px',
        '&:hover': {
            background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
        },
    },
    link: {
        textDecoration: "none",
        color: '#3f51b5',
        '&:hover': {
            textDecoration: "underline",
        },
    },
    icon: {
        fontSize: '40px',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    inputIcon: {
        color: '#9c9c9c',
        marginRight: '10px',
    },
};

// =================================================Cart Page====================================================
export const cartstyles = {
    paper: {
        padding: '20px',
        margin: '20px 0',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    button: {
        backgroundColor: '#5c6bc0',
        color: 'white',
        padding: '12px 25px',
        margin: '20px 0',
        textTransform: 'none',
        borderRadius: '4px',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: '#3f51b5',
        },
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #eeeeee',
        padding: '15px 0',
    },
    listItemTextHeader: {
        fontWeight: '500',
        color: '#424242',
        fontSize: '0.95rem',
    },
    listItemTextValue: {
        fontWeight: '400',
        color: 'black',
        fontSize: '0.9rem',
        textAlign: 'right',
        width: "200px",
        height: "auto"
    },
};


// =================================================Banner Section====================================================
export const banner = [
    {
        "image": "https://media.istockphoto.com/id/1272326011/fr/vectoriel/banni%C3%A8re-dachat-en-ligne-sc%C3%A8ne-de-magasin-num%C3%A9rique-dinternet-avec-la-femme-sur-le.jpg?s=1024x1024&w=is&k=20&c=NsvDOa1GYXsEsjWwo5v0ujbDYBKFsMk2Z9f9p18Uox0="
    },
    {
        "image": "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/276214775/original/c1b8d55eb9a80f41f3930bf234e03fc1580ce278/make-social-media-banners-for-you.jpg"
    },
    {
        "image": "https://img.freepik.com/premium-vector/new-arrival-sale-banner_79298-58.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696896000&semt=ais"
    },
    {
        "image": "https://img.freepik.com/free-vector/colorful-sale-background_1361-555.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698192000&semt=ais"
    },
    {
        "image": "https://img.freepik.com/free-vector/abstract-colorful-final-sales-memphis-wallpaper_23-2148400548.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1697068800&semt=ais"
    },
    {
        "image": "https://previews.123rf.com/images/vectorgift/vectorgift1803/vectorgift180300022/98077113-green-horizontal-sale-banner-design-for-online-shopping-vector-illustration.jpg"
    },
]

// =================================================Login Page====================================================


