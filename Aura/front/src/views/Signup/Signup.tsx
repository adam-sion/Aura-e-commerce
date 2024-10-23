import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, FormControl, Input, InputAdornment, InputLabel, Stack, Typography } from "@mui/material";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import { User } from '../../types/User';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../../contexts/AuthContext';
import { didUserSign } from '../../utils/roles';
import { useLoading } from '../../contexts/loadingContext';




type ValidationRulesType = {
  username: {
    rule: (x: string) => boolean;
    userTyped: boolean;
  };
  password: {
    rule: (x: string) => boolean;
    userTyped: boolean;
  };
};

export const Signup:FC = ()=> {

 const api = axios.create({
  baseURL:'http://localhost:4000/auth/signup'
 })

  const [formData, setFormData] = useState<User>({
    username: '',
    password:''
  });

  const {login} = useAuth();
  const {setIsLoading} = useLoading();
  
  const [validationRules, setValidationRules] = useState<ValidationRulesType>({
    username: {
      rule: (x: string) =>
        /^[a-zA-Z0-9](?!.*[_.]{2})[a-zA-Z0-9._]{1,14}[a-zA-Z0-9]$/.test(x),
      userTyped: false,
    },
    password: {
      rule: (x: string) =>
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&#]{6,}$/.test(x),
      userTyped: false,
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    const keyName = name as keyof ValidationRulesType;
  
    if (!validationRules[keyName].userTyped) {
      setValidationRules((prev) => ({
        ...prev,
        [keyName]: {
          ...prev[keyName],
          userTyped: true,
        },
      }));
    }
  
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =  async (e:FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    try {
      setIsLoading(true);
     const {data} = await api.post('',formData);
     

      setFormData({ username: '', password: '' });
      setValidationRules({
        username: { ...validationRules.username, userTyped: false },
        password: { ...validationRules.password, userTyped: false }
      });
    
     await login(formData);

     Swal.fire({
      title: 'Success',
      text: data,
      icon: 'success',
      confirmButtonText: 'Great',
    });
    
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Can't sign up, something went wrong";
      
      Swal.fire({
          title: 'Failed',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Okay',
      });
  }
  }
  
  const isFormValid = () => {
    return Object.keys(validationRules).every((key) => {
      const rule = validationRules[key as keyof ValidationRulesType].rule;
      return rule(formData[key as keyof User]);
    });
  };


    return didUserSign() ? <Navigate to="/"/> :(
        <Box component={'form'} display={'flex'} justifyContent={'center'} onSubmit={handleSubmit}>
        <Stack
          direction="column"
          spacing={4}
          sx={{
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: '7vh',
            width: '300px',
            background: 'linear-gradient(to bottom, #add8e6, #ffcccb)',
            borderRadius: '8px', 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            padding: 10
          }}
        >
          <Box
            sx={{
              padding: '3px 10px', 
              backgroundColor: 'transparent', 
              borderRadius: '8px', 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
              width: '300px',
              transition: 'background-color 0.3s ease', 
              '&:hover': {
                backgroundColor: 'white', 
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: 'black',
                fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
              }}
            >
              Sign up
            </Typography>
          </Box>
      

          {Object.keys(validationRules).map((name) => (
          <FormControl key={name}>
            <InputLabel
              htmlFor={name}
              sx={{
                color: 'grey',
                '&.Mui-focused': {
                  color: 'grey',
                },
              }}
            >
              {name}
            </InputLabel>
            <Input
              key={name}
              id={name}
              name={name}
              type={name === 'password' ? 'password': 'text'} // Toggle type based on state
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  {!validationRules[name as keyof typeof formData].userTyped ? null : validationRules[name as keyof typeof formData].rule(formData[name as keyof typeof formData]) ? (
                    <CheckIcon sx={{ color: 'green' }} />
                  ) : (
                    <CloseIcon sx={{ color: 'red' }} />
                  )}
                </InputAdornment>
              }
            />
          </FormControl>
        ))}

      

      
          <Button
            type="submit" 
            variant="contained"
            sx={{ borderRadius: 20, fontFamily: 'monospace', width: '50%', fontWeight:'bold'}}
            disabled={!isFormValid()}
          >
            Sign up
          </Button>
      <Typography fontFamily={'"Comic Sans MS", "Comic Sans", cursive'}>Already have an account? <Link to={'/login'}>sign in</Link></Typography>
        </Stack>
      </Box>
      
    )
}