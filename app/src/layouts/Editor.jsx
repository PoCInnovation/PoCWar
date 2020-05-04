import React from "react";
import NavBar from "../containers/NavBar/NavBar";
import Editor from "../components/Editor/Editor";

export default function EditorLayout() {
  return (
    <div>
      <NavBar />
      <Editor language="python" theme="monokai" />
    </div>
  );
}
