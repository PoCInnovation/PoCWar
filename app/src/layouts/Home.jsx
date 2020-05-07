import React from "react";
import { Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import NavBar from "../containers/NavBar";
import { editorRoute } from "../consts/routes";

export default function Home({ user }) {
  const history = useHistory();
  const redirectEditor = () => {
    history.push(editorRoute);
  };

  return (
    <div>
      <NavBar user={user} />
      <Grid container spacing={0} direction='column' alignItems='center' justify='center' style={{ minHeight: '100vh' }}>
        <Grid item xs={3}>
          <Button onClick={redirectEditor}>Go to Editor</Button>
        </Grid>
      </Grid>
    </div>
  );
}
