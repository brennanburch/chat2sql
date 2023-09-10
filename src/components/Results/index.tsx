/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable sort-imports */
import { Typography, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { selectCurrentSqlQuery } from '../../slices/currentSqlQuerySlice';
import { update } from '../../slices/sqlQuerySlice';
import { useAppDispatch, useAppSelector } from '../../App/hooks';

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

const transformResponse = (rawResponse: string): string => {
  const queryArray = rawResponse.split('```')[1].slice(3).split('WHERE');
  const query = queryArray[0] + '\nWHERE' + queryArray[1];
  console.log(query);
  return query;
};

export default function Results() {
  const currentSqlQuery = useAppSelector(selectCurrentSqlQuery);
  const dispatch = useAppDispatch();
  const query = transformResponse(currentSqlQuery.rawResponse);
  console.log(query);
  dispatch(update({ query: query }));

  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography sx={{ p: 4, color: 'palette.primary.text' }}>Your Query</Typography>
        <div>
          <SyntaxHighlighter language="sql" style={oneLight}>
            {query}
          </SyntaxHighlighter>
        </div>
      </ThemeProvider>
    </>
  );
}
