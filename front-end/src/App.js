import logo from './logo.svg';

import { useEffect, useState } from 'react';
import axios from "axios";
import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme, withTheme } from '@mui/material/styles';
import {blue, green, red} from '@mui/material/colors' ;
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import { SettingsInputHdmiTwoTone } from '@mui/icons-material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import _ from 'lodash';
import './App.css';





const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});


function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [show, setShow] = useState({})
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);

  const changeName = (value) => {
    setName(value);
  }
  
  const changeEmail= (value) => {
    setEmail(value);
  }

  const submitFormHandler= () => {
    setData({...data, [name]:email}) 
    setName("");
    setEmail("");
  }

  const deleteRecord= (key) => {
    const copyData= {...data}
    delete copyData[key]
    setData(copyData)
  }

  const sendDataBE = () => {
    const json_data = JSON.stringify(data)
    axios.post('/generator', data)
        .then(response => {
              console.log(response);
              console.log(_.isEmpty(response.data));
              if (!_.isEmpty(response.data)){
                console.log(response.data);
                console.log("no error");
                setResult(response.data);
                const show_result = {};
                for (const key in response.data) {
                  show_result[key] = false;
                }
                setShow(show_result);
              }else{
                console.log("error");
                setError(true);
              }
                
            })
        
  }

  const switchHandler = (event) => {
    console.log(event);
    setShow({
      ...show,
      [event.target.name]: event.target.checked,
    });
  };

  const getOption = (n) =>{
    if (result !== null) {
      if (show[n]) {
        return <td> {result[n]} <Switch checked={show[n]} name={n} onChange={switchHandler}></Switch></td>
      }else {
        return <td> *** <Switch checked={show[n]} name={n} onChange={switchHandler}></Switch></td>
      }
    } else {
      return <DeleteIcon onClick={() => {deleteRecord(n)}}/>
    }
  }

  const showError = () => {
    if (error === true){
      return <Alert severity="error">Generate failed. Please try it again.</Alert>
    }
  }
  // useEffect(async () => {
  //   const resp = await axios.get("/test");
  //   console.log(resp);
  // }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
      <Container
        maxWidth={false}
        style={{
          backgroundColor: '#2B4176',
          minHeight : '100vh',
          backgroundSize: "cover",
        }}
      >
        <h1>Secret Santa Generator</h1>
        <h2>Enjoy ~</h2>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell> Name</TableCell>
                <TableCell>Email</TableCell>
                {result && <TableCell> Secret Santa</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(data).map((n, i) => {
                return <TableRow key={i}>
                        <TableCell>{n}</TableCell> 
                        <TableCell>{data[n]}</TableCell> 
                        {getOption(n)}
                    </TableRow>})}
            </TableBody>
          </Table>
        </TableContainer>
        <form style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}> 
          <label>
            <AccountCircle />
            Name:
            <input 
            type="text" 
            id="name"
            value={name}
            onChange={(e) => changeName(e.target.value)} required/>
          </label>
          <label>
            Email:
            <input type="text" id="email" value={email} onChange={(e) => changeEmail(e.target.value)} required/>
          </label>
          <Fab color="primary" aria-label="add">
            <AddIcon onClick={submitFormHandler}/>
          </Fab>
        </form>
        <Button variant="contained" onClick={sendDataBE} style={{justifyContent: 'center'}}>Generate Now!
        </Button>
        {error && <Alert severity="error">Generate failed. Please try it again.</Alert>}
        <br></br>
      </Container>
      </ThemeProvider>
      </>
  );
}

export default App;
