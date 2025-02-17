import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, logout }) => {
    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        E-Commerce
                    </Typography>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    {isAuthenticated ? (
                        <>
                            <Button color="inherit" component={Link} to="/cart">
                                Cart
                            </Button>
                            <Button color="inherit" component={Link} to="/orders">
                                Orders
                            </Button>
                            <Button color="inherit" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Register
                            </Button>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;