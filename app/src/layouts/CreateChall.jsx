import React, { useState } from 'react';
import NavBar from '../containers/NavBar';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';
import { server } from '../hooks/server';
import AddIcon from '@material-ui/icons/Add';
import BackupIcon from '@material-ui/icons/Backup';
import TestEditor, { getTestEditorValues } from '../components/Challenge/TestEditor';
import Fab from '@material-ui/core/Fab';
import { app } from '../firebase/core';

const nbOfTests = [1];
const useStyles = makeStyles((theme) => ({
  input: {
    color: theme.palette.primary.A100,
    borderColor: theme.palette.primary.A100,
  }
}));

function submitChallenge() {
  const data = {
    "challenge": {
      "title": document.getElementById('challNameField').value,
      "category": document.getElementById('challCategoryField').value,
      "description": document.getElementById('challDescriptionField').value,
      "input_example": document.getElementById('challInputExampleField').value,
      "output_example": document.getElementById('challOutputExampleField').value,
      "date": Date.now(),
      "tests": getTestEditorValues(),
      "author": app.auth().currentUser.email
    }
  }
  axios.post(server + '/challenge', data);
  console.log(data);
}

function addTests(list, setList) {
  if (list.length === 0) {
    setList(list.concat(1));
  } else {
    setList(list.concat(list[list.length - 1] + 1));
  }
}

function deleteTest(list, setList) {
  list.pop();
  setList(list.concat());
}

function TestList(props) {
  const items = props.tests.map((i) => 
      <div key={i.toString()} id="testList">
        <TestEditor deleteFunction={props.deleteFunction} />
      </div>
    );
  return (
    <div>
      <FormLabel>Tests</FormLabel>
      {items}
    </div>
  );
}

export default function CreateChallLayout() {
  const [theme, setTheme] = useState('dracula');
  let [list, setList] = useState(nbOfTests);
  const classes = useStyles(theme);

  return (
    <div>
      <NavBar />
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: '35%',
          margin: '0px 10px',
        }}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            id='challNameField'
            label='Challenge name'
            name='challName'
            autoComplete='challName'
            autoFocus
            InputProps={{
              className: classes.input
            }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            id='challCategoryField'
            label='Challenge category'
            name='category'
            autoComplete='category'
            autoFocus
            InputProps={{
              className: classes.input
            }}
          />
        </div>
        
        <div style={{marginRight: '10px', width: '100%'}}>
          <TextField
            variant='outlined'
            margin='normal'
            id='challDescriptionField'
            label='Description'
            name='description'
            autoComplete='description'
            autoFocus
            multiline
            fullWidth
            rows={15}
            InputProps={{
              className: classes.input
            }}
          />
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <TextField
                variant='outlined'
                margin='normal'
                id='challInputExampleField'
                label='Input example'
                name='inputExample'
                autoComplete='inputExample'
                required
                autoFocus
                InputProps={{
                  className: classes.input
                }}
                style={{
                  width: '49%'
                }}
              />
              <TextField
                variant='outlined'
                margin='normal'
                id='challOutputExampleField'
                label='Output example'
                name='outputExample'
                autoComplete='outputExample'
                required
                autoFocus
                InputProps={{
                  className: classes.input
                }}
                style={{
                  width: '49%'
                }}
              />
            </div>
            <br/>
            <div>
              <TestList tests={list} deleteFunction={() => deleteTest(list, setList)} />
              <Fab color="primary" aria-label="add" onClick={() => addTests(list, setList)}>
                <AddIcon />
              </Fab>
            </div>
          </div>
        </div>
      </div>
      <Fab color="primary" aria-label="submit" onClick={submitChallenge} style={{position: 'absolute', bottom: '15px', right: '15px'}}>
        <BackupIcon />
      </Fab>
    </div>
  );
}