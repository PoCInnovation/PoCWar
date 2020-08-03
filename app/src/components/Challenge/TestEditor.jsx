import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  input: {
    color: theme.palette.primary.A100,
    borderColor: theme.palette.primary.A100,
  }
}));

function getValueFromFields(className) {
  let data = [];

  for (let child of document.getElementsByClassName(className)) {
    data.push(child.childNodes[0].value);
  }
  return (data);
}

export function getTestEditorValues() {
  const inputs = getValueFromFields('testInputs');
  const outputs = getValueFromFields('testOutputs');
  let data = [];

  for (let i = 0; i < inputs.length && i < outputs.length; i += 1) {
    data.push({input: inputs[i], output: outputs[i]});
  }
  return (data);
}

export default function TestEditor(props) {
  const [theme, setTheme] = useState('dracula');
  const classes = useStyles(theme);

  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
      <TextField
        variant='outlined'
        margin='normal'
        label='Input'
        name='input'
        autoComplete='input'
        multiline
        autoFocus
        InputProps={{
          className: `${classes.input} testInputs`
        }}
        style={{
          width: '45%'
        }}
      />
      <TextField
        variant='outlined'
        margin='normal'
        label='Output'
        name='output'
        autoComplete='output'
        autoFocus
        multiline
        InputProps={{
          className: `${classes.input} testOutputs`
        }}
        style={{
          width: '45%'
        }}
      />
      <Fab color="primary" aria-label="delete" style={{marginTop: '15px'}} onClick={props.deleteFunction}>
        <DeleteIcon />
      </Fab>
    </div>
  );
}