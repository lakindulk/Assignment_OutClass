import {createTheme  } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      
      main: '#3F51B5',   
    },
    secondary: { 
      main: '#FFC107',  
    },
  },
typography : {

	fontFamily : ['Roboto']
},
Alert:{
  color: "#ffffff",
    backgroundColor: "#000000"
}
});

export default theme;