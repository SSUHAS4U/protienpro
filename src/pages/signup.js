import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  CssBaseline,
  TextField,
  Typography,
  Card,
  Grid,
  Divider,
  createTheme,
  ThemeProvider,
  Snackbar,        
  Alert,
} from '@mui/material';
import Navbar from '../components/Navbar'; // Adjust the path based on your folder structure
import Footer from '../components/Footer'; // Adjust the path based on your folder structure
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { styled } from '@mui/material/styles';
import { MenuItem } from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%', // Ensure full width
  marginTop: theme.spacing(2), // Add margin to match other fields
  '& .MuiInputBase-root': {
    color: '#000', // Ensure text color consistency
  },
  '& .MuiInputLabel-root': {
    color: '#000', // Ensure label color consistency
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#000', // Ensure border color consistency
    },
    '&:hover fieldset': {
      borderColor: '#000', // Hover effect
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000', // Focused state color
    },
  },
}));

// Custom styling for the DatePicker component
const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  width: '100%', // Ensure full width
  '& .MuiInputBase-root': {
    color: '#000', // Text color
  },
  '& .MuiInputLabel-root': {
    color: '#000', // Label color
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#000', // Border color
    },
    '&:hover fieldset': {
      borderColor: '#000', // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000', // Border color on focus
    },
  },
}));

// Theme with sky blue palette
const skyBlueTheme = createTheme({
  palette: {
    primary: {
      main: '#00bfff',
    },
    secondary: {
      main: '#00bfff',
    },
    text: {
      primary: '#000',
    },
    background: {
      default: '#fff',
    },
    defaultProps: {
      disableScrollLock: true,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#fff',
          backgroundColor: '#00bfff',
          '&:hover': {
            backgroundColor: '#0095e8',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#00bfff',
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

export default function SignUp() {
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    birthDate: null,
    heightFeet: '',
    heightInches: '',
    weight: '',
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, birthDate: date });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.Name = formData.Name ? "" : "Name is required.";
    tempErrors.email = /\S+@\S+\.\S+/.test(formData.email) ? "" : "Email is not valid.";
    tempErrors.password = formData.password.length >= 8 ? "" : "Password must be at least 8 characters long.";
    tempErrors.confirmPassword = formData.password === formData.confirmPassword ? "" : "Passwords do not match.";
    tempErrors.gender = formData.gender ? "" : "Gender is required.";
    tempErrors.birthDate = formData.birthDate ? "" : "Birth Date is required.";
    tempErrors.heightFeet = formData.heightFeet ? "" : "Height (Feet) is required.";
    tempErrors.heightInches = formData.heightInches ? "" : "Height (Inches) is required.";
    tempErrors.weight = formData.weight ? "" : "Weight is required.";

    setErrors({ ...tempErrors });
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setSnackbarMessage("Please fix the errors before submitting.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/user', {
        name: formData.Name,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        birthDate: formData.birthDate,
        heightFeet: formData.heightFeet,
        heightInches: formData.heightInches,
        weight: formData.weight,
      });      
      console.log('User registered successfully:', response.data);
      setSnackbarMessage("User registered successfully!");
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // Clear form data
      setFormData({
        Name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        birthDate: null,
        heightFeet: '',
        heightInches: '',
        weight: '',
      });
    } catch (error) {
      console.error('There was an error registering the user:', error);
      setSnackbarMessage("There was an error registering the user.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    const bodyStyle = document.body.style;
    bodyStyle.overflowX = 'hidden';
    bodyStyle.overflowY = 'scroll';
    
    return () => {
      bodyStyle.overflowX = 'unset';
      bodyStyle.overflowY = 'unset';
    };
  }, []);


  return (
    <ThemeProvider theme={skyBlueTheme}>
      <div style={{ overflowX: 'hidden', width: '100vw', position: 'relative' }}></div>
      <Navbar />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {/* Circles on the left bottom corner */}
      <div style={{ position: 'absolute', bottom: '0', left: '0', zIndex: '-1', top: '-50px' }}>
          {/* First Circle (Left) */}
          <div style={{
            width: '300px',
            height: '300px',
            backgroundColor: 'skyblue',
            borderRadius: '50%',
            position: 'absolute',
            left: '-150px', // Half of the width to position it partially outside the page
            bottom: '50px',
            zIndex: '-1',
          }} />
          {/* Second Circle (Left) */}
          <div style={{
            width: '400px',
            height: '400px',
            backgroundColor: 'skyblue',
            borderRadius: '50%',
            position: 'absolute',
            left: '-200px', // Slightly larger and more to the left
            top: '100px',
            bottom: '250px',
            zIndex: '-1',
          }} />
        </div>

        {/* Circles on the right bottom corner */}
        <div style={{ position: 'absolute', bottom: '0', right: '0', zIndex: '-1', top: '0' }}>
          {/* First Circle (Right) */}
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
          {/* Second Circle (Right) */}
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
      <Container component="main" maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <Card
            sx={{
              padding: 4,
              marginTop: -1,
              width: '100%',
              backgroundColor: 'white',
              boxShadow: 3,
              textAlign: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0px 0px 20px 5px rgba(0, 191, 255, 0.5)',
              },
            }}
          >
            <Typography component="h1" variant="h5" color="primary" sx={{ marginBottom: 2 }}>
              SIGN UP
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5}>
                  <Typography component="h2" variant="h6" color="primary">
                    Create a Free Account
                  </Typography>
                  <TextField
                    fullWidth
                    label="Name"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    required
                    margin="normal"
                    error={!!errors.Name}
                    helperText={errors.Name}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    margin="normal"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                  />
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Divider orientation="vertical" flexItem sx={{ height: '100%' }} />
                </Grid>
                <Grid item xs={12} sm={5}>
                <Typography component="h2" variant="h6" color="primary">
                    Personal Details
                </Typography>

                  <Grid container spacing={2}>
                  <Grid item xs={12}>
                  <FormControl fullWidth margin="normal">
                  <TextField
                    select
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    SelectProps={{
                      MenuProps: {
                        disableScrollLock: true,  // Prevents scroll lock on the body
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                        PaperProps: {
                          style: {
                            maxHeight: 48 * 4.5 + 8,  // Set max height for dropdown
                            alignContent: 'right',
                            overflowX: 'hidden',
                            zIndex: 1300,  // Adjust z-index to ensure it's above card but below other overlays
                          },
                        },
                        getContentAnchorEl: null,  // Prevents centering the menu with TextField
                      },
                      disablePortal: true,  // Keeps the dropdown within the form's flow instead of attaching to body
                    }}
                  >
                    <MenuItem value="">Select Gender</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </FormControl>

                  </Grid>

                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <StyledDatePicker
                      label="Birth Date*"
                      value={formData.birthDate}
                      onChange={handleDateChange}
                      renderInput={(params) => (
                        <StyledTextField
                          {...params}
                          required
                          error={!!errors.birthDate}
                          helperText={errors.birthDate}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Height (Feet)"
                        name="heightFeet"
                        value={formData.heightFeet}
                        onChange={handleChange}
                        required
                        margin="normal"
                        error={!!errors.heightFeet}
                        helperText={errors.heightFeet}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Height (Inches)"
                        name="heightInches"
                        value={formData.heightInches}
                        onChange={handleChange}
                        required
                        margin="normal"
                        error={!!errors.heightInches}
                        helperText={errors.heightInches}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        required
                        margin="normal"
                        error={!!errors.weight}
                        helperText={errors.weight}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 3,
                      mb: 2,
                      fontSize: '16px',
                      backgroundColor: '#00bfff',
                      '&:hover': { backgroundColor: '#0095e8' },
                    }}
                  >
                    SIGN UP
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Box>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
