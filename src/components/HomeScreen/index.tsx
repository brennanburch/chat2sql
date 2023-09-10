import { Box, Button, Container, Grid, Link, Stack, Typography } from '@mui/material';
import styles from './styles.module.css';
import videobg from '../../assets/coffee.mp4';
import { Link as RouterLink } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://poetic.io/">
        Poetic Labs
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

console.log('form data in chat', FormData);

export default function HomeScreen() {
  return (
    <>
      <div className={styles.load}>
        <Box sx={{ mt: 2 }}>
          <div className={styles.overlay}></div>
          <video className={styles.video} autoPlay muted loop src={videobg} />
          <Container sx={{ position: 'relative', zIndex: 'tooltip', width: '100%' }}>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    sx={{ pt: 10, fontWeight: 'bold' }}
                    variant="h2"
                    align="left"
                    color="#fff"
                    paragraph
                  >
                    &ldquo;What if we could just talk to them over coffee?&rdquo;
                  </Typography>
                  <Typography sx={{ pt: 4 }} variant="h5" align="left" color="#fff" paragraph>
                    Effortlessly query SQL databases using natural language via AI. Simplify data
                    access and accelerate insights with Poetic Labs Chat2SQL part of our AI Data
                    Insight Platform.
                  </Typography>
                  <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="left">
                    <Button sx={{ bgcolor: '#000', color: '#fff' }} href="/database-setup">
                      Get Started
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Container>

          {/* Footer */}
          <Box sx={{ p: 6 }} component="footer">
            <Copyright />
          </Box>
        </Box>
      </div>

      {/* End footer */}
    </>
  );
}
