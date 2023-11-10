import React, { useEffect, useState } from 'react'
import { Box, Button, Checkbox, Divider, Grid, Slider, Typography } from '@mui/material'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LabelIcon from '@mui/icons-material/Label';
import { Link } from 'react-router-dom';
import { fetchproductcategories } from '../../ApiManager/AxiosManage';
import { Brandname, Prices, discount, offers } from '../Additional/AllData';
import CategoryIcon from '@mui/icons-material/Category';
function valuetext(value) {
    return `${value}°C`;
}

const ProductSidebar = () => {
    const [open, setOpen] = React.useState(true);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(true);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    const handleClick2 = () => {
        setOpen1(!open1);
    };
    const handleClick3 = () => {
        setOpen2(!open2);
    };
    const handleClick4 = () => {
        setOpen3(!open3);
    };
    const handleClick5 = () => {
        setOpen4(!open4);
    };
    const handleClick6 = () => {
        setOpen5(!open5);
    };
    const [category, setcategory] = useState([]);
    const fetchcategory = async () => {
        const data = await fetchproductcategories();
        setcategory(data.data.category)
    }
    useEffect(() => {
        fetchcategory()
    }, [])
    console.log(category);
    return (
        <>
            <Grid style={{ marginTop: 10, marginLeft: 8, fontSize: "5px", background: "#EAEDED", width: "270px", height: "auto" }}>
                <Grid item xs={4}>
                    <Typography style={{ fontFamily: "Times", padding: 10 }} variant="h6" component="h6">
                        Filter Products
                    </Typography>
                    <Divider style={{ background: "red" }} />
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Product Categories
                            </ListSubheader>
                        }>
                        <Divider />
                        {/* Category */}
                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Category" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {
                                    category.map((item, key) => {
                                        return (
                                            <>
                                                <Link key={key + 1} style={{ textDecoration: "none", color: "black" }}>
                                                    <Link to={`/categorywiseproducts/${item.slug}`} style={{ color: "black", textDecoration: "none" }}>
                                                        <ListItemButton sx={{ pl: 3 }}>
                                                            <ListItemIcon>
                                                                <CategoryIcon style={{ color: "#3498DB" }} />
                                                            </ListItemIcon>
                                                            <ListItemText primary={item.name} />
                                                        </ListItemButton>
                                                    </Link>
                                                </Link>
                                            </>
                                        )
                                    })
                                }
                            </List>
                        </Collapse>
                        {/* Category */}
                        <Divider />
                        <Divider />
                        {/* GST Invoice Avialable */}
                        <ListItemButton onClick={handleClick3}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="GST Invoive" />
                            {open1 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open2} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 5 }}>
                                    <ListItemIcon>
                                        <Checkbox />
                                    </ListItemIcon>
                                    <ListItemText primary="Gst Invoive Included" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                        {/* GST Invoice Avialable */}
                    </List>
                    <Divider style={{ height: 10 }} />
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                    >
                        {/* Price Range */}
                        <ListItemButton onClick={handleClick4}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Price Range" />
                            {open3 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open3} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {
                                    Prices.map((item, key) => {
                                        return (
                                            <>
                                                <ListItemButton key={key + 1} sx={{ pl: 5 }}>
                                                    <ListItemIcon>
                                                        <Checkbox />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.name} />
                                                </ListItemButton>
                                            </>
                                        )
                                    })
                                }
                            </List>
                        </Collapse>
                        {/* Price Range */}
                        <Divider />
                        {/* Offers */}
                        <ListItemButton onClick={handleClick5}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Filter by Category" />
                            {open4 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open4} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {
                                    category.map((item, key) => {
                                        return (
                                            <>
                                                <ListItemButton key={key + 1} sx={{ pl: 5 }}>
                                                    <ListItemIcon>
                                                        <Checkbox />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.name} />
                                                </ListItemButton>
                                            </>
                                        )
                                    })
                                }
                            </List>
                        </Collapse>
                        {/* Offers */}
                        <Divider />
                        {/* Avialability */}
                        <ListItemButton onClick={handleClick6}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Avialbility" />
                            {open5 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open5} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 5 }}>
                                    <ListItemIcon>
                                        <Checkbox />
                                    </ListItemIcon>
                                    <ListItemText primary="Exlcude out of Stock" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                        {/* Avialability */}
                        <Divider />
                        {/* Customer Rating*/}

                        {/* Customer Rating */}
                    </List>
                </Grid >
            </Grid ><br /><br />
        </>
    )
}

export default ProductSidebar