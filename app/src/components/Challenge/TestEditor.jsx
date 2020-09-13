import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  input: {
    color: theme.palette.primary.A100,
    borderColor: theme.palette.primary.A100,
  },
}));

// TODO: Refacto
function getValueFromFields(className) {
  const data = [];

  for (const child of document.getElementsByClassName(className)) {
    data.push(child.childNodes[0].value);
  }
  return (data);
}

export function getTestEditorValues() {
  const inputs = getValueFromFields('testInputs');
  const outputs = getValueFromFields('testOutputs');
  const names = getValueFromFields('testNames');
  const data = [];

  for (let i = 0; i < inputs.length && i < outputs.length; i += 1) {
    data.push({
      name: names[i], args: inputs[i].split(' '), out: outputs[i], err: '', ret: 0,
    });
  }
  return (data);
}

export default function TestEditor({ deleteFunction, index, value }) {
  const theme = useState('dracula');
  const classes = useStyles(theme);

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
      <TextField
        variant='outlined'
        margin='normal'
        label='Test name'
        name='testName'
        autoComplete='testName'
        multiline
        autoFocus
        InputProps={{
          className: `${classes.input} testNames`,
        }}
        style={{
          width: '30%',
        }}
        defaultValue={value.name}
      />
      <TextField
        variant='outlined'
        margin='normal'
        label='Input'
        name='input'
        autoComplete='input'
        multiline
        autoFocus
        InputProps={{
          className: `${classes.input} testInputs`,
        }}
        style={{
          width: '30%',
        }}
        defaultValue={value.args.join(' ')}
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
          className: `${classes.input} testOutputs`,
        }}
        style={{
          width: '30%',
        }}
        defaultValue={value.out}
      />
      <Fab color='primary' aria-label='delete' style={{ marginTop: '15px' }} onClick={() => deleteFunction(index)}>
        <DeleteIcon />
      </Fab>
    </div>
  );
}
