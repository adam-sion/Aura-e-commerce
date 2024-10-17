
import { Box, Button, FormControl, Input, InputLabel, Stack, Typography } from "@mui/material";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";
import { User } from "../../types/User";
import { didUserSign } from "../../utils/roles";
import { HomePage } from "../HomePage/HomePage";

export const Login:FC = ()=> {
    const [formData, setFormData] = useState<User>({
        username: '',
        password:''
      });

    const {login} = useAuth();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value });
      };


    const handleSubmit =  async (e:FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        try {
         const loggedIn = await login(formData);

         if (!loggedIn) {
            throw new Error("Couldn't sign you in");
         }

         Swal.fire({
            title: 'Success',
            text: 'You signed in',
            icon: 'success',
            confirmButtonText: 'Okay',
        });
        
        } catch (error: any) {
          const errorMessage = error.message || "Can't sign in, something went wrong";
          
          Swal.fire({
              title: 'Failed',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'Okay',
          });
      }
      }
    return didUserSign() ? <Navigate to="/"/> : (
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
              Sign in
            </Typography>
          </Box>
      
          {['username', 'password'].map((name) => (
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
        value={formData[name as keyof User]}
        onChange={handleChange}
          key={name}
          id={name}
          name={name}
          type={name==='password'? 'password':'text'}
        />
        </FormControl>
      ))}
      
          <Button
            type="submit" 
            variant="contained"
            sx={{ borderRadius: 20, fontFamily: 'monospace', width: '50%',fontWeight:'bold' }}
          >
            Sign in
          </Button>
      <Typography fontFamily={'"Comic Sans MS", "Comic Sans", cursive'}>Don't have an account? <Link to={'/signup'}>sign up</Link></Typography>
        </Stack>
      </Box>
      
    )
}