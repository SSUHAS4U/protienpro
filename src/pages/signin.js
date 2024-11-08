import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import img from '../images/heart.png';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar'; // For showing success/error messages
import Alert from '@mui/material/Alert'; // For success/error alerts

// Updated color theme to sky blue
const skyBlueTheme = createTheme({
  palette: {
    primary: {
      main: '#00bfff', // Sky Blue
    },
    secondary: {
      main: '#00bfff', // Sky Blue
    },
    text: {
      primary: '#000',
    },
    background: {
      default: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#fff',
          backgroundColor: '#00bfff', // Sky Blue
          '&:hover': {
            backgroundColor: '#0095e8', // Darker Blue on hover
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            color: '#000',
          },
          '& .MuiInputLabel-root': {
            color: '#000',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#000',
            },
            '&:hover fieldset': {
              borderColor: '#000',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#000',
            },
          },
        },
      },
    },
  },
});

export default function SignIn() {
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({});
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: '' });

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSnackbar({ open: true, message: 'Please fix the errors', severity: 'error' });
    } 
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  React.useEffect(() => {
    // Apply overflow-x: hidden to the body when the component mounts
    document.body.style.overflowX = 'hidden';
    
    // Cleanup the style when the component unmounts
    return () => {
      document.body.style.overflowX = 'auto';
    };
  }, []);

  return (
    <ThemeProvider theme={skyBlueTheme}>
      <div style={{ overflowX: 'hidden', width: '100vw' }}> {/* Apply full width */}
        <Navbar />

        {/* Circles on the left bottom corner */}
        <div style={{ position: 'absolute', bottom: '0', left: '0', zIndex: '-1', top: '-50px' }}>
          <div style={{
            width: '300px',
            height: '300px',
            backgroundColor: 'skyblue',
            borderRadius: '50%',
            position: 'absolute',
            left: '-150px',
            bottom: '50px',
            zIndex: '-1',
          }} />
          <div style={{
            width: '400px',
            height: '400px',
            backgroundColor: 'skyblue',
            borderRadius: '50%',
            position: 'absolute',
            left: '-200px',
            top: '100px',
            bottom: '250px',
            zIndex: '-1',
          }} />
        </div>

        {/* Circles on the right bottom corner */}
        <div style={{ position: 'absolute', bottom: '0', right: '0', zIndex: '-1', top: '0' }}>
          <div style={{
            width: '300px',
            height: '300px',
            backgroundColor: 'skyblue',
            right: '-150px',
            borderRadius: '50%',
            position: 'absolute',
            bottom: '50px',
            zIndex: '-1',
            clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)', // Cuts right half
          }} />
          <div style={{
            width: '400px',
            height: '400px',
            backgroundColor: 'skyblue',
            borderRadius: '50%',
            position: 'absolute',
            bottom: '250px',
            right: '-200px',
            top: '60px',
            zIndex: '-1',
            clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)', // Cuts right half
          }} />
        </div>

        <div style={{ minHeight: 'calc(100vh - 100px)', paddingBottom: '10px', marginTop: '100px' }}>
          <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Card 
              sx={{ 
                boxShadow: 3, 
                borderRadius: 2, 
                display: 'flex', 
                height: '500px',
                maxWidth: '900px',
                transition: 'transform 0.3s, box-shadow 0.3s',
                marginLeft: '140px',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 4px 20px skyblue',
                }
              }}
            >
              <Grid container>
                <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography component="h1" variant="h5" color="primary">
                        Sign In
                      </Typography>
                      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          value={formData.email}
                          onChange={handleChange}
                          error={!!errors.email}
                          helperText={errors.email}
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          value={formData.password}
                          onChange={handleChange}
                          error={!!errors.password}
                          helperText={errors.password}
                        />
                        <FormControlLabel
                          control={<Checkbox value="remember" color="primary" />}
                          label="Remember me"
                        />
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Sign In
                        </Button>
                        <Grid container>
                          <Grid item xs>
                            <Link href="#" variant="body2">
                              Forgot password?
                            </Link>
                          </Grid>
                          <Grid item>
                            <Link href="/signup" variant="body2">
                              {"Don't have an account? Sign Up"}
                            </Link>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </CardContent>
                </Grid>
                <Grid item xs={6}>
                  <CardMedia
                    component="img"
                    image={img}
                    alt="Sign In Image"
                    sx={{ objectFit: 'cover', height: '100%' }}
                  />
                </Grid>
              </Grid>
            </Card>
          </Container>
        </div>
        <Footer />
      </div>

      {/* Snackbar for success and error messages */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
