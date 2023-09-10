/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable sort-imports */
import {
  Box,
  Button,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { selectFormData, update } from '../../slices/dbConnectionSlice';
import { useAppDispatch, useAppSelector } from '../../App/hooks';
import ThumbUp from '@mui/icons-material/ThumbUp';
import { Link } from 'react-router-dom';
import { instance } from '../../Config';
import styles from './styles.module.css';

const theme = createTheme({
  typography: {
    fontFamily: ['Karla', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#fff',
    },
    text: {
      primary: '#fff',
    },
  },
});

interface FormData {
  host: string;
  database: string;
  password: string;
  user: string;
  port: string;
}

export const DatabaseForm = () => {
  const dispatch = useAppDispatch();
  const currentStoreState = useAppSelector(selectFormData);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    console.log(formdata);

    const data: FormData = {
      host: formdata.get('host') as string,
      database: formdata.get('database') as string,
      password: formdata.get('password') as string,
      user: formdata.get('user') as string,
      port: formdata.get('port') as string,
    };

    console.log(data);
    dispatch(update(data));

    instance
      .post('/test-connection', data)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log(res.status);
        if (res.status === 200) {
          setIsConnected(true);
          console.log('connected');
        }
      })
      .catch((err) => {
        console.error('something is wrong', err);
        if (err) {
          setIsConnected(false);
          console.log('not connected');
        }
      });
  };
  const handleReset = () => {
    setHost('');
    setDatabase('');
    setPassword('');
    setUser('');
    setPort('');
  };

  const [host, setHost] = useState(currentStoreState.host);
  const [database, setDatabase] = useState(currentStoreState.database);
  const [password, setPassword] = useState(currentStoreState.password);
  const [user, setUser] = useState(currentStoreState.user);
  const [port, setPort] = useState(currentStoreState.port);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Load from local storage
    const storedHost = localStorage.getItem('host');
    const storedDatabase = localStorage.getItem('database');
    const storedPassword = localStorage.getItem('password');
    const storedUser = localStorage.getItem('user');
    const storedPort = localStorage.getItem('port');

    // Set component state, not global state
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (storedHost) setHost(JSON.parse(storedHost));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (storedDatabase) setDatabase(JSON.parse(storedDatabase));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (storedPassword) setPassword(JSON.parse(storedPassword));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (storedUser) setUser(JSON.parse(storedUser));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (storedPort) setPort(JSON.parse(storedPort));
  }, []);

  useEffect(() => {
    // set local storage from local state as it changes
    if (host) localStorage.setItem('host', JSON.stringify(host));
    if (database) localStorage.setItem('database', JSON.stringify(database));
    if (password) localStorage.setItem('password', JSON.stringify(password));
    if (user) localStorage.setItem('user', JSON.stringify(user));
    if (port) localStorage.setItem('port', JSON.stringify(port));
  }, [host, database, password, user, port]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <>
          <div className={styles.load}>
            <Box
              component="form"
              sx={{
                background: '#012840',
                // background: '#2A73A1',
                color: '#fff',
                fontFamily: 'Karla',
                m: 'auto',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '5px',
                width: '100%',
                height: 'auto',
                '& .MuiTextField-root': {
                  width: 'auto',
                  display: 'flex',
                  flexDirection: 'row',
                  color: 'primary.main',
                  '& ::placeholder': {
                    color: '#fff',
                    opacity: 0.7,
                    p: 1,
                  },
                  '& ::active': {
                    borderColor: '#fff',
                    color: 'primary.main',
                    opacity: 0.7,
                  },
                },
                '& .MuiInputLabel-root': {
                  m: 1,
                  width: 'auto',
                  display: 'flex',
                  flexDirection: 'row',
                  color: '#fff',
                },
                '& .MuiGrid-container': {
                  display: 'flex',
                  flexDirection: 'column',
                  m: 'auto',
                  width: '100%',
                },
                '& .MuiGrid-item': {
                  display: 'flex-start',
                  flexDirection: 'column',
                  m: 1,
                  width: 'auto',
                  alignItems: 'center',
                  color: '#fff',
                },
                '& .MuiButton-root': {
                  backgroundColor: '#000',
                  color: '#fff',
                  m: 2,
                },
              }}
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className={styles.column}>
                <div className={styles.innerColumn}>
                  <Typography variant="h4" gutterBottom sx={{ pt: 1 }}>
                    Connect To Your Database
                  </Typography>
                  {isConnected
                    ? 'Successfully connected to database'
                    : 'Please enter your database credentials.'}
                  <Grid item xs={6}>
                    <Grid item xs={8}>
                      <TextField
                        type="text"
                        placeholder="Hostname"
                        required
                        fullWidth
                        name="host"
                        value={host}
                        variant="standard"
                        color="primary"
                        onChange={(e) => setHost(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        type="text"
                        placeholder="Database Name"
                        required
                        fullWidth
                        name="database"
                        value={database}
                        variant="standard"
                        onChange={(e) => setDatabase(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        type="password"
                        placeholder="Password"
                        required
                        fullWidth
                        name="password"
                        value={password}
                        variant="standard"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        type="text"
                        placeholder="User"
                        required
                        fullWidth
                        name="user"
                        value={user}
                        variant="standard"
                        onChange={(e) => setUser(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        type="text"
                        placeholder="Port Number"
                        required
                        fullWidth
                        name="port"
                        value={port}
                        variant="standard"
                        onChange={(e) => setPort(e.target.value)}
                      />
                      <br />
                      {isConnected ? (
                        <Grid item xs={4}>
                          <Link className={styles.link} to="/chat-ui">
                            <ThumbUp className={styles.thumb} /> Success! Click here to continue.
                          </Link>
                        </Grid>
                      ) : (
                        <>
                          <Button type="submit">Submit</Button>
                          <Button onClick={handleReset} type="submit">
                            Reset
                          </Button>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Box>
          </div>
        </>
      </ThemeProvider>
    </>
  );
};
export default DatabaseForm;
