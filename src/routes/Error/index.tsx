/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Header } from '../../components';

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <Header />
        <div id="error-page">
          <h1>Oops! {error.status}</h1>
          <p>{error.statusText}</p>
          {error.data?.message && (
            <p>
              <i>{error.data.message}</i>
            </p>
          )}
        </div>
      </>
    );
  } else if (error instanceof Error) {
    return (
      <>
        <Header />
        <div id="error-page">
          <h1>Oops! Unexpected Error</h1>
          <p>Something went wrong.</p>
          <p>
            <i>{error.message}</i>
          </p>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
