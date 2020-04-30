import React from 'react';
import NavBar from '../../containers/NavBar/NavBar';
import Editor from '../../components/Editor/Editor';

export default function App() {
  return (
    <div>
      <NavBar />
      <Editor language="python" theme="monokai" />
    </div >
  );
}
