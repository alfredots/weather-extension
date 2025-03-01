import './Options.css';
import '@fontsource/roboto';
import { Card, CardContent, Typography, Grid, TextField, Box, Button, Switch } from '@mui/material';
import { useEffect, useState } from 'react';
import { useStorageState } from '@/shared/hooks/use-storage-state';

export const Options = () => {
  const [options, setOptions] = useStorageState('options');
  const [homeCity, setHomeCity] = useState('');
  const handleHomeCitySave = () => {
    if (options === null) return;

    setOptions({
      ...options,
      homeCity: homeCity
    });
  };

  const handleAutoOverlayChange = (hasAutoOverlay: boolean) => {
    if (options === null) return;

    setOptions({
      ...options,
      hasAutoOverlay
    });
  };

  useEffect(() => {
    if (options !== null) {
      setHomeCity(options.homeCity);
    }
  }, [options]);

  return (
    <main>
      <Box mx="10%" my="2%">
        <Card>
          <CardContent>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <Typography variant="h4">Weather Extension Options</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">Home city name</Typography>
                <TextField placeholder="Enter a home city name" fullWidth value={homeCity} onChange={(e) => setHomeCity(e.target.value)} />
              </Grid>
              <Grid item>
                <Typography variant="body1">Auto toggle overlay on webpage load</Typography>
                <Switch color="primary" checked={options?.hasAutoOverlay} onChange={(e, checked) => handleAutoOverlayChange(checked)} />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleHomeCitySave}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </main>
  );
};

export default Options;
