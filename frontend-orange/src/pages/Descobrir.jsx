import {theme} from '../utils/Theme'
import {useMediaQuery} from '@mui/material/';
import DescobrirDesktop from './DescobrirDesktop';
import DescobrirMobile from './DescobrirMobile';
import { mock, mockBdResponseAllProjects } from '../utils/mock';
import {useState, useEffect} from "react"
import Loading from '../components/loading/Loading';
import axios from 'axios'

export default function Descobrir(){
  const responsivo1 = useMediaQuery(theme.breakpoints.up('md'))
  const responsivo2 = useMediaQuery(theme.breakpoints.up('lg'))

  
  const [listaDeProjetos, setListaDeProjetos] = useState([])
  
  const [openDescobrir, setOpenDescobrir] = useState(true);
  const [cardSelecionado, setCardSelecionado] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpenDesk = () => setOpen(true);
  const handleOpenMobile = () => {
    setOpen(true)
    setOpenDescobrir(false)
  };  
  const handleCloseDesk = () => setOpen(false);
  const handleCloseMobile = () => setOpen(false);
  const [tagProjeto, setTagProjeto] = useState(listaDeProjetos);
  const [tagsSelecionadas, setTagsSelecionadas] = useState([]);
  const arrayTags = []

  tagProjeto.map(item => arrayTags.push(item.tags))

  const tagUnicas = arrayTags.filter((item, index, self) => {
    return self.indexOf(item) === index
  });

  const reqRespostaBdList = async (token) =>{    
    
    await axios.get('https://orange-9dj9.onrender.com/project/list',{ headers:{'Authorization':`${token}`}})  
    
                .then((response) => setListaDeProjetos(response.data))                 
                .catch((e)=> console.log(e))  
    };
  

  useEffect(()=>{
    const token = localStorage.getItem('token')
    reqRespostaBdList(token)
  },[]) 


  if(responsivo2){
  return(
    <>
    
      <DescobrirDesktop
        respBk1={responsivo1}
        respBk2={responsivo2}        
        open={open}
        setOpen={setOpen}
        handleOpenDesk={handleOpenDesk}
        cardSelecionado={cardSelecionado}
        setCardSelecionado={setCardSelecionado}
        handleCloseDesk={handleCloseDesk}
        tagProjeto={tagProjeto}
        setTagProjeto={setTagProjeto}
        tagsSelecionadas={tagsSelecionadas}
        setTagsSelecionadas={setTagsSelecionadas}
        arrayTags={arrayTags}
        tagUnicas={tagUnicas}
        listaDeProjetos={listaDeProjetos}
        setListaDeProjetos={setListaDeProjetos}

      />
      
    </>
      )
    }  
    else{
      return(
        <>
       
        <DescobrirMobile
          respBk1={responsivo1}          
          openDescobrir={openDescobrir}
          setOpenDescobrir={setOpenDescobrir}
          cardSelecionado={cardSelecionado}
          setCardSelecionado={setCardSelecionado}
          open={open}
          setOpen={setOpen}
          handleOpenMobile={handleOpenMobile}
          handleCloseMobile={handleCloseMobile}
          tagProjeto={tagProjeto}
          setTagProjeto={setTagProjeto}
          tagsSelecionadas={tagsSelecionadas}
          setTagsSelecionadas={setTagsSelecionadas}
          arrayTags={arrayTags}
          tagUnicas={tagUnicas}
          listaDeProjetos={listaDeProjetos}
          setListaDeProjetos={setListaDeProjetos} 
          
          />    
     </>
        ) }}
                 
      
       
      
  