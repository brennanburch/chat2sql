/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable sort-imports */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, Button, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { selectFormData } from '../../slices/dbConnectionSlice';
import { update } from '../../slices/currentSqlQuerySlice';
import { useAppDispatch, useAppSelector } from '../../App/hooks';
import styles from './styles.module.css';
import { instance } from '../../Config';
import { useEffect, useState } from 'react';

interface ChatItemProps {
  username: string;
  text: string;
}

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

// eslint-disable-next-line react/prop-types
const ChatItem: React.FC<ChatItemProps> = ({ username, text }) => {
  return (
    <Box display="flex" mb={2}>
      <Box ml={2}>
        <Typography variant="subtitle1" fontWeight="bold">
          {username}
        </Typography>
        <Typography variant="body1">{text}</Typography>
      </Box>
    </Box>
  );
};

const Chat = () => {
  const formData = useAppSelector(selectFormData);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<ChatItemProps>>([]);
  const [loading, setLoading] = useState(false);
  const chatHistoryItems = chatHistory.map((item, index) => {
    return <div key={index}>{ChatItem({ username: item.username, text: item.text })}</div>;
  });

  console.log('form data in chat', formData);

  useEffect(() => {
    setLoading(true);
    const payload = {
      tableName: 'all_fuels_data',
    };
    instance
      .post('/post-pre-prompt', payload)
      .then((res) => {
        setLoading(false);
        // console.log(res);
        const history: Array<ChatItemProps> = [];
        history.push({ username: 'App', text: res.data.prePrompt });
        history.push({ username: 'My Database', text: res.data.prePromptResponse });
        history.push({ username: 'App', text: res.data.errorPrompt });
        history.push({ username: 'My Database', text: res.data.errorPromptResponse });
        history.push({ username: 'App', text: res.data.message });
        setChatHistory(history);
      })
      .catch((err) => {
        console.error('An error occurred: ', err);
      });
  }, []);

  const handleQuery = async () => {
    const history = [...chatHistory, { username: 'Me', text: query }];
    setChatHistory(history);
    setQuery('');
    try {
      setLoading(true);
      const res = await instance.get('/get-sql', {
        params: {
          prompt: query,
        },
      });
      setLoading(false);
      console.log(res.data.response.response);
      dispatch(update({ rawResponse: res.data.response.response }));
      const respHistory = [
        ...chatHistory,
        { username: 'Me', text: query },
        { username: 'My Database', text: res.data.response.response },
      ];
      setChatHistory(respHistory);
    } catch (err) {
      console.error('An error occurred: ', err);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={styles.load}>
          <Box
            component="form"
            sx={{
              p: 2,
              borderRadius: '5px',
              '& .MuiTextField-root': {
                m: 1,
                width: '25ch',

                '& ::placeholder': {
                  color: 'primary',
                  p: 1,
                },
              },
            }}
            noValidate
            autoComplete="off"
          ></Box>
          <div>
            <div className={styles.response}>
              {loading && <CircularProgress color="inherit" />}
              {chatHistoryItems}
            </div>
          </div>
          <form className={styles.form}>
            <TextField
              type="text"
              placeholder="Ask your database a question..."
              fullWidth
              color="primary"
              required
              variant="standard"
              name="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button sx={{ bgcolor: 'black', ml: 1 }} onClick={handleQuery}>
              Submit
            </Button>
          </form>
        </div>
      </ThemeProvider>
    </>
  );
};
export default Chat;
