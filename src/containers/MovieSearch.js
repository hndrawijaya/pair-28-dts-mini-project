import { Box, Card, Container, Grid, Paper, Rating, ThemeProvider, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ResponsiveBar from "../components/ResponsiveBar";
import theme from "../themes/themes";
import Layout from "./Layout";
import Footer from "../components/Footer";
import tmdbapi from "../api/tmdbapi";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

function MovieSearch() {
        const params = useParams();
        const [loading, setLoading] = useState(false);
        const [movieSearch, setSearchMovie] = useState([]);
        const key = params?.key ;
        const url = 'search/movie?query=' + key;

        useEffect(() => {
                const getMovieSearh = async () => {
                        try {
                                const fetchedMovies = await tmdbapi.get(url);
                                console.log(fetchedMovies);
                                setSearchMovie(fetchedMovies.data.results);
                                setLoading(false);
                        } catch (error) {
                                console.log(error);
                        }
                }

                getMovieSearh();
        }, [url]);

  return (
    <>
        <ThemeProvider theme={theme}>
        <Layout>
      <Paper square sx={{ minHeight: '100vh' }}>
        <ResponsiveBar />
        <Container maxWidth='lg' sx={{ marginTop: '100px' }}>
          <Typography fontSize={25} >Search Result Found : {params.key}</Typography>
          <Grid container spacing={2}>
            {loading ?
              'Please wait...'
              : movieSearch.map((movie) => {
                return (
                  <Grid item xs={2}>
                    <Link to={`/moviedetail/${movie.id}`} style={{ textDecoration: 'none' }}>
                      <Card sx={{
                        height: '250px',
                        backgroundImage: `url(${BASE_IMAGE_URL}/${movie.poster_path})`,
                        backgroundPositionX: 'center',
                        backgroundPositionY: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        "&:hover .hidden": {
                          display: "flex"
                        }
                      }}>
                        <Box className="hidden" sx={{
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          height: '100%',
                          display: 'none',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                          <Typography fontSize={16} fontWeight='bold' sx={{ textAlign: 'center' }}>Watch Now</Typography>
                        </Box>
                      </Card>
                    </Link>
                        <Typography variant="subtitle1" color="white" component="div">
                        {movie.title}
                        </Typography>
                        <Typography variant="subtitle1" color="white" component="div">
                        {new Date(movie.release_date).getFullYear()}
                        </Typography>
                        <Box
                        sx={{
                                width: 230,
                                display: "flex",
                                alignItems: "center",
                        }}
                        >
                        <Rating
                                name="read-only"
                                precision={0.1}
                                value={movie.vote_average / 2}
                                max={5}
                                readOnly
                        />
                        <Box sx={{ ml: 2 }}>{movie.vote_average}</Box>
                        </Box>
                  </Grid>
                );
              })
            }
          </Grid>
        </Container>
      </Paper>
      <Footer />
      </Layout>
      </ThemeProvider>
    </>
  );
}

export default MovieSearch;