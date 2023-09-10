import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chat from '../Chat';
import createTheme from '@mui/material/styles/createTheme';

import DataGrid from '../DataGrid';
import Results from '../Results';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Typography from '@mui/material/Typography';
import styles from './styles.module.css';

const stepStyle = {
  color: '#fff',
};
const theme = createTheme({
  typography: {
    fontFamily: ['Karla', 'sans-serif'].join(','),
    fontSize: 16,
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
const steps = ['Chat with your database', 'Review and Run Your SQL Query', 'Results'];
const handleSteps = (step: number) => {
  switch (step) {
    case 0:
      return <Chat />;
    case 1:
      return <Results />;
    case 2:
      return <DataGrid />;
  }
};
export default function NavStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className={styles.load}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: '80%',
            my: 8,
            mx: 'auto',
            p: 2,
            bgcolor: '#333',
            color: 'primary',
            borderRadius: '5px',
          }}
        >
          <Box sx={{ width: '90%', mx: 'auto', py: 2 }}>
            <Stepper className={styles.stepLabel} nonLinear activeStep={activeStep} sx={stepStyle}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton onClick={handleStep(index)}>{label}</StepButton>
                </Step>
              ))}
            </Stepper>
            {handleSteps(activeStep)}
          </Box>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1, color: '#fff' }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, color: '#fff' }}>
                <Button color="primary" onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto', color: '#fff' }} />
                <Box sx={{ flexDirection: 'column', color: '#fff' }} />
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
                <Button onClick={handleReset} sx={{ mr: 1 }}>
                  Reset
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </ThemeProvider>
    </div>
  );
}
