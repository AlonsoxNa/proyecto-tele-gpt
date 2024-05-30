import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/user.store';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Grid } from '@mui/material';

interface Page{
    name:string,
    link:string
}



const pages: Page[] = [
    {
        name:'Noticias',
        link:'noticias'
    },
    {
        name:'Normal',
        link:'crear-anuncio'
    },
    {
        name:'Solo foto',
        link:'Solofoto'
    },
    {
        name:'Solo video',
        link:'Solovideo'
    },
    {
        name:'Solo texto',
        link:'Solotexto'
    }
]
const settings = ['Perfil', 'Cuenta', 'Cerrar sesión'];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTardget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate()

    const goPage = (name:string) => {
        navigate(`/admin/${name}`)
    }

    const { user } = useUserStore();

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
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
                    LOGO
                </Typography>

                {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                    >
                    {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box> */}
                <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    LOGO
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {/* {pages.map((page) => ( */}
                    <Button
                        onClick={() => {handleClose;goPage('noticias')}}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Noticias
                    </Button>
                    <Grid container>
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
                            onClick={() => {handleClose;goPage('Ayuda')}}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Ayuda
                        </Button>
                    </Grid>
                    {/* ))} */}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                    </Tooltip>
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
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                </Toolbar>
            </Container>
        </AppBar>
        // <div style={ { marginBottom: '2rem' } }>
        //     <nav className='navbar navbar-expand-lg custom-navbar-color'>
        //         <div className='container-fluid'>
        //             <button
        //                 className='navbar-toggler'
        //                 data-bs-toggle='collapse'
        //                 data-bs-target='#navbarNavAltMarkup'
        //                 aria-controls='navbarNavAltMarkup'
        //                 aria-expanded='false'
        //                 aria-label='Toggle navigation'
        //             >
        //                 <span className='navbar-toggler-icon' />
        //             </button>
        //             <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
        //                 <div className='navbar-nav'>
        //                     <div className='container'>
        //                         <div className='row'>
        //                             <div className='col-2'>
        //                                 <Link className='navtext' to={'/admin'}>Elementos Mostrados</Link>
        //                             </div>

        //                             <div className='col-2'>
        //                                 <Link className='navtext' to={'/NoticiasOcultas'}>Elementos archivados</Link>
        //                             </div>

        //                             <div className='col-2'>
        //                                 <div className='nav-item dropdown'>
        //                                     <a
        //                                         className='nav-link dropdown-toggle navtext'
        //                                         href='#'
        //                                         id='crearElementoDropdown'
        //                                         role='button'
        //                                         data-bs-toggle='dropdown'
        //                                         aria-expanded='false'
        //                                     >
        //                                         Crear elemento
        //                                     </a>
        //                                     <ul className='dropdown-menu' aria-labelledby='crearElementoDropdown'>
        //                                         <li>
        //                                             <Link className='dropdown-item' to={'/Solofoto'}>Solo foto</Link>
        //                                         </li>
        //                                         <li>
        //                                             <Link className='dropdown-item' to={'/Solovideo'}>Solo video</Link>
        //                                         </li>
        //                                         <li>
        //                                             <Link className='dropdown-item' to={'/Solotexto'}>Publicación</Link>
        //                                         </li>
        //                                         <li>
        //                                             <Link className='dropdown-item' to={'/crear-anuncio'}>Noticia</Link>
        //                                         </li>
        //                                     </ul>
        //                                 </div>
        //                             </div>

        //                             <div className='col-2'>
        //                                 <Link className='navtext' to={'/Ayuda'}>Ayuda</Link>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className=''>
        //                 <div className='container'>
        //                     <div className='row colorTexto'>Bienvenido</div>
        //                     <div className='row colorTextoGris'>
        //                         { user.name }
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className='iconoperfil' />
        //         </div>
        //     </nav>
        // </div>
    );
}

export default Navbar;
