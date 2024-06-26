import { useUserStore } from '@/stores/user.store';
import { AccountCircle } from '@mui/icons-material';
import AdbIcon from '@mui/icons-material/Adb';
import { Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
    const navigate = useNavigate()

    const {handleLogout} = useUserStore();
    
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
   
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const goPage = (name:string) => {
        navigate(`/admin/${name}`)
    }

    return (
        <AppBar component="nav" sx={{backgroundColor:"#0f2357"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/admin/noticias"
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    ICC-TV
                </Typography>
                <Box  paddingLeft='2rem' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'} }}>
                    
                    <Grid container gap={2}>
                        <Button
                            onClick={() => {handleClose;goPage('noticias')}}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Gestión noticias
                        </Button>
                        <Button sx={{color:"white"}}
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}

                        >
                            Crear noticia
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => {handleClose;goPage('crear-anuncio')}}>Normal</MenuItem>
                            <MenuItem onClick={() => {handleClose;goPage('Solofoto')}}>Solo foto</MenuItem>
                            <MenuItem onClick={() => {handleClose;goPage('Solovideo')}}>Solo video</MenuItem>
                            <MenuItem onClick={() => {handleClose;goPage('Solotexto')}}>Solo texto</MenuItem>
                        </Menu>
                        <Button
                            onClick={() => {handleClose;goPage('crear-categoria')}}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Crear categoría
                        </Button>
                        <Button
                            onClick={() => {handleClose;goPage('gestion-categoria')}}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Gestión categorías
                        </Button>
                        <Button
                            onClick={() => {handleClose;goPage('Ayuda')}}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Ayuda
                        </Button>
                    </Grid>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <IconButton onClick={handleOpenUserMenu}
                        size="large" color="inherit"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true" sx={{ p: 0 }}>
                        <AccountCircle fontSize='large'/>
                    </IconButton>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleLogout}>
                            <Typography textAlign="center">Cerrar Sesión</Typography>
                        </MenuItem>
                    {/* {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))} */}
                    </Menu>
                </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
