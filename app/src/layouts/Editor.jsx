import React from "react";
import NavBar from "../containers/NavBar";
import Editor from "../components/Editor/Editor";

export default function EditorLayout({ user }) {
  return (
    <div>
      <NavBar user={user} />
      <Editor language="python" theme="monokai" />
    </div>
  );
}
