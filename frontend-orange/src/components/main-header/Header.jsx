
import { Box, ThemeProvider, Typography,
         Button, Menu, MenuItem, Divider, useMediaQuery} from "@mui/material";
import {theme} from '../../utils/Theme';
import * as React from 'react'
import { Link } from "react-router-dom";
import {useState, useEffect, useContext} from 'react'
import profilePicture from '../../assets/profile-picture/user-orange.png'
import logoOrange from '../../assets/logo-orange/logo-orange.svg';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios'
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

export default function MainHeader(props){

  const responsivo = useMediaQuery(theme.breakpoints.up('sm'))
  const navigate = useNavigate()

  const {dadosDoUsuario, setDadosDoUsuario, reqRespostaBdUser, openVisMobile, setOpenVisMobile} = useContext(UserContext)

  const {nome, email, sobrenome} = dadosDoUsuario

  const [botaoSair, setBotaoSair] = useState(false)

  const handleBotaoSair = () => {
    setBotaoSair(true)
    localStorage.removeItem('token')
  }
  
  
  useEffect(()=>{
    const token = localStorage.getItem('token')
    reqRespostaBdUser(token)
  },[]) 

  useEffect(()=>{
    if(botaoSair){
      navigate('/login')
    }
  },[botaoSair])
 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <ThemeProvider theme={theme}>

      {dadosDoUsuario && (
      <Box component='header'
        sx={{
          backgroundColor:'primary.main',
          height:'41px',
          padding:'16px 30px 16px 30px',
          border:'0px 0px 1px 0px',
          display:'flex',
          justifyContent:'space-between'
          }}>

        <Box       
          sx={{
            display: 'flex',
            gap: '100px',
            width:'712px',
            height: '41px',
            alignItems:'center'              
          }}>
          <Box sx={{display:'flex', gap:'16px', alignItems:'center'}}>
            {!responsivo ?
            <Box >

                <Button                  
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}                  
                >
                  <MenuIcon sx={{color:'neutral.lightest'}}/>
                </Button>
                <Menu
               
                transformOrigin={{horizontal:'left'}}
                slotProps={{
                  paper: {
                    sx: {
                      width: '250px',
                                           
                    },
                  }
                }}
                  sx={{marginTop:'18px'}}
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  
                > 
                <Box sx={{margin:'15px 0px 15px 15px'}}>
                  <Typography fontWeight='600'>{nome}</Typography> 
                  <Typography>{email}</Typography> 
                </Box>
                  <Divider/>
                  <MenuItem onClick={() => {handleClose(), setOpenVisMobile(false)}}><Typography variant='body1' ><Link to='/' style={{textDecoration:'none', color:'#0B0C0D', cursor:'pointer'}}>Descobrir</Link></Typography></MenuItem>
                  <MenuItem onClick={() => handleClose()}><Typography variant='body1' ><Link to='/meus-projetos' style={{textDecoration:'none', color:'#0B0C0D', cursor:'pointer'}}>Meus projetos</Link></Typography></MenuItem>
                  <Divider/>
                  <MenuItem onClick={handleClose} sx={{gap:'10px'}}>
                    <LogoutIcon/>
                    <Typography>
                    <Link
                      onClick={()=>{handleBotaoSair()}} 
                      style={{
                        textDecoration:'none',
                        color:'#0B0C0D',
                        cursor:'pointer'
                        }}
                        >Sair</Link>
                    </Typography>                    
                  </MenuItem>
                </Menu>  
                
              

            </Box>
              : null}
            <Box>
              <img src={logoOrange} alt="Logo Orange Juice" width='111px' height='41px'/>  
            </Box>
            </Box>

          { responsivo ? <Box 
            sx={{
              display:'flex',
              gap: '24px',
              alignItems:'center',
              width:'242px',
            }}
              >
            <Typography 
              color='neutral.lightest'
              variant='h6' 
              sx={{
                width:'130px',
                
                }}
            >
              <Link 
              to='/meus-projetos'
              style={{textDecoration:'none', color:'#FCFDFF'}}
              
              >
              
              Meus projetos
              </Link>
            </Typography>
            <Typography 
              color='neutral.lightest'
              variant='h6'
              
              sx={{
                width:'88px',
                fontWeight:'500'               
                }}
            >
              <Link 
                to='/'
                style={{textDecoration:'none', color:'#FCFDFF'}}
                >
              Descobrir
              </Link>
            </Typography>
          </Box> : null}      
        </Box>
        
        
        

        {responsivo ? 
        (<Box
          sx={{display:'flex', alignItems:'center', gap:'16px'}}>
          <Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >

            <Tooltip
              title="Menu"
            >

              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <img src={profilePicture} alt="Figura de perfil" width='40px' height='40px' />

              </IconButton>
            </Tooltip>
          </Box>

          <Menu
               
                transformOrigin={{horizontal:'right'}}
                slotProps={{
                  paper: {
                    sx: {
                      width: '250px',
                                           
                    },
                  }
                }}
                  sx={{marginTop:'12px', marginLeft: '50px'}}
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  
                > 
                <Box sx={{margin:'15px 0px 15px 15px'}}>
                  <Typography fontWeight='600'>{nome}</Typography> 
                  <Typography>{email}</Typography> 
                </Box>
                  <Divider/>
                  <MenuItem onClick={handleClose} sx={{gap:'10px'}}>
                    <LogoutIcon/>
                    <Typography>
                    <Link
                      onClick={()=>{handleBotaoSair()}} 
                      style={{
                        textDecoration:'none',
                        color:'#0B0C0D',
                        cursor:'pointer'
                        }}
                        >Sair</Link>
                    </Typography>                    
                  </MenuItem>
                </Menu>  

          </Box>
          <Box color='neutral.lightest'>
            <NotificationsIcon/>
          </Box>
        </Box>) : 
        (<Box>
          <img src={profilePicture} alt="Figura de perfil" width='40px' height='40px' />
          </Box>
          )}




            
      </Box>
      )}
    </ThemeProvider>
  )
}