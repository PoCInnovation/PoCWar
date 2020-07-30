import React, { useState } from 'react';
import NavBar from '../containers/NavBar';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

let nbOfTests = [1];
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
    }
  }
  console.log(document.getElementById('testList').childNodes);
  console.log(data);
}

function addTests() {
  nbOfTests.push(nbOfTests[nbOfTests.length - 1] + 1);
  console.log(nbOfTests);
}

function TestList(props) {
  const [theme, setTheme] = useState('dracula');
  const classes = useStyles(theme);
  const items = props.tests.map((i) => 
      <div key={i.toString()} id="testList" style={{display: 'flex', justifyContent: 'space-between'}}>
        <TextField
          variant='outlined'
          margin='normal'
          label='Input'
          name='input'
          autoComplete='input'
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
          label='Output'
          name='output'
          autoComplete='output'
          autoFocus
          InputProps={{
            className: classes.input
          }}
          style={{
            width: '49%'
          }}
        />
      </div>
    );
  return (
    <div>
      {items}
    </div>
  );
}

export default function AddChallengeLayout() {
  const [theme, setTheme] = useState('dracula');
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
            <TestList tests={nbOfTests} />
          </div>
        </div>
      </div>
      <Button onClick={submitChallenge}>
        Submit
      </Button>
      <Button onClick={addTests}>
        +
      </Button>
    </div>
  );
}