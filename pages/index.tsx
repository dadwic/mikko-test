import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Footer from "components/Footer";
import PaymentDates from "components/PaymentDates";
import ResponsiveDrawer from "components/ResponsiveDrawer";

const HomePage: NextPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Head>
        <title>Home</title>
      </Head>
      <ResponsiveDrawer />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <PaymentDates />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </Box>
    </Box>
  );
};

export default HomePage;
