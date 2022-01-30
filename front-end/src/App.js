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
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
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
  const [newuid, setNewuid] = useState('')
  const [error, setError] = useState(false);
  const [uid, setUid] = useState('');
  

  const changeName = (value) => {
    setName(value);
  }
  
  const changeEmail= (value) => {
    setEmail(value);
  }

  const changeUid= (value) => {
    setUid(value);
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
    // const json_data = JSON.stringify(data)
    axios.post('/generator', data)
        .then(response => {
              console.log(response);
              console.log("response");
              console.log(data);
              console.log(result);
              console.log(_.isEmpty(response.data));
              if (!_.isEmpty(response.data)){
                console.log(response.data);
                console.log("no error");
                setResult(response.data["pairing"]);
                setNewuid(response.data["uid"]);
                const show_result = {};
                for (const key in response.data) {
                  show_result[key] = false;
                }
                setShow(show_result);
                console.log(newuid)
              }else{
                console.log("error");
                setError(true);
              }                
            })     
  }
  
  const searchUid = () => {
    console.log("search")
    console.log(uid)
    axios.post('/searchhistory', uid)
        .then(response => {
              console.log(response);
              console.log(data);
              console.log(result);
              setData(response.data["data"]);
              setResult(response.data["result"]);
              console.log(data);
              console.log(result);
              const show_result = {};
              for (const key in response.data) {
                show_result[key] = false;
              }
              setShow(show_result);
          //   if (!_.isEmpty(response.data)){

          //   }else{
          //   console.log("No record found");
          // }                
          }
        )
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
        <h1 style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: "20px"
        }}>Secret Santa Generator</h1>

        <TableContainer component={Paper} style={{marginBottom: "50px", marginTop: "50px"}}>
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
        {newuid && <Alert severity="info" style={{marginBottom: "10px"}}>Please keep a note of your Unique ID: {newuid}</Alert>}
        <form style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "30px"
        }}> 
          <label>            
            Name
            <AccountCircle />
            :
            <input 
            type="text" 
            id="name"
            value={name}
            required
            onChange={(e) => changeName(e.target.value)} />
          </label>
          <label>
            Email
            <EmailIcon/>
            :
            <input type="text" id="email" value={email} required onChange={(e) => changeEmail(e.target.value)} />
          </label>
          <Fab color="primary" aria-label="add" size="small" style={{marginRight: "10px", marginLeft: "10px"}}>
            <AddIcon onClick={submitFormHandler}/>
          </Fab>
          <Fab color="primary" aria-label="restart" size="small" style={{marginRight: "10px"}}>
            <RestartAltIcon onClick={()=>{setData({});setResult(null)}}/>
          </Fab>
          <Button variant="contained" onClick={sendDataBE} style={{justifyContent: 'center'}}>Generate Now!
        </Button>
        </form>
        <form style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <label>           
            Unique ID<ContentPasteSearchIcon/>:           
            <input type="text" 
            id="uid"
            value={uid}
            required
            onChange={(e) => changeUid(e.target.value)}>
            </input>
          </label>
          <Fab color="primary" aria-label="search" size="small" style={{marginLeft: "10px"}}>
          <SearchIcon onClick={searchUid}/>
          </Fab>
        </form>
        {error && <Alert severity="error">Generate failed. Please try it again.</Alert>}
        <br></br>
      </Container>
      </ThemeProvider>
      </>
  );
}

export default App;
