import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { isAdmin } from "../../utils/roles";
import { Navigate } from "react-router-dom";
import { Box, Button, Divider, Grid, Input, InputAdornment, MenuItem, Modal, Stack, TextField, Typography } from "@mui/material";
import { categories } from "../../utils/data";
import "./AdminDash.css";
import CloseIcon from '@mui/icons-material/Close';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import beachBack from "../../Assets/categoriesBackground.png";
import { new_collections } from "../../data/new_collections";
import Swal from "sweetalert2";
export const AdminDash:FC = ()=> {
    const refs = useRef<(null | HTMLDivElement)[]>([]);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
   const [modalOpen, setModalOpen] = useState<boolean>(false);
   const [fileName, setFileName] = useState<string>('');

   const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files![0];
     if (file) {
       setFileName(file.name);
       console.log(file);
     } else {
       setFileName(''); 
     }
   };
  const handleClose = ()=> {
    setModalOpen(false);
  }

const handleOpen  = ()=> {
  setModalOpen(true);
}

    const scrollToRef = (index: number) => {
        refs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };

      const handleScroll = () => {
        if (window.scrollY > 300) { 
          setShowScrollToTop(true);
        } else {
          setShowScrollToTop(false);
        }
      };
    
      const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);


      const fieldStyle = {
        width:'100%',
        input: {
          color: 'black',  // Keeps input text color black
        },
        '& label': {
          color: 'black',  // Keeps label color black
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'black',  // Border color when not focused
          },
          '&:hover fieldset': {
            borderColor: 'black',  // Border color on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: 'black',  // Border color when focused
          },
        },
        '& .MuiFormLabel-root.Mui-focused': {
          color: 'black',  // Ensures the label stays black when focused
        },
      }
    return !isAdmin()? <Navigate to="/"/>:(
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
          width: '100%',
          marginTop: '4vh',
     
        }}
      >
      <Box 
  sx={{ 
    width: '40%', 
    height: '40vh',
    position: 'relative',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
         marginBottom:'7vh'
  }}
>
  <img 
    src={beachBack} 
    alt="Background" 
    style={{ 
      width: '100%', 
      height: '100%', 
      zIndex: -1,
      borderRadius: '20px'
    }} 
  />
   <Box sx={{ width: '95%',
   height:'80%', 
      position: 'absolute',  
      right: 0, 
      bottom: 0,
      left: '50%',
      top:'50%',
      transform: 'translate(-50%, -50%)'}}>
  <Grid 
    container 
    spacing={2} 
    sx={{ 
     height:'100%'
    }}
    alignItems={'center'}
  >
    {
      categories.map((category, index) => (
        <Grid item sm={4} xs={4} md={4} key={category.name} sx={{ height: '100%' }}>
          <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }} className="category-card">
    <img className="category-img" style={{ borderRadius: '20px' }}  src={category.pic} alt="" />

    <Button 
    onClick={()=> scrollToRef(index)}
    sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        color: 'white', 
        fontSize: '24px', 
        opacity: 0, 
        transition: 'opacity 0.3s ease', 
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        padding: '10px 20px', 
        borderRadius: '10px', 
        textAlign: 'center',
         
    }} 
    className="category-name"
>
    {category.name}
</Button>

</Box>

        </Grid>
      ))
    }
  </Grid>
 </Box>
</Box>


<Box sx={{marginTop:'4vh',  width: '40%'}}>

{
    categories.map((category,index)=> (
        <Box key={index} sx={{marginBottom:'15vh'}} ref={(el:HTMLDivElement|null) => (refs.current[index] = el)}>
<Typography sx={{fontFamily: '"Comic Sans MS", "Comic Sans", cursive'}} textAlign={'center'} variant="h3">{category.name}</Typography>
<Box sx={{display:'flex', justifyContent:'center', paddingTop:2}}>
<Divider
          sx={{
            borderBottomWidth: '0.3em',
            borderColor: 'lightBlue',
            width: '3em',
          }}
        />
        </Box>

<Grid sx={{marginTop:'1vh'}} container spacing={2}>
          <Grid item xs={3}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>Products</Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>Title</Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>Price</Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>Remove</Box>
          </Grid>
        </Grid>

        <Divider
          sx={{
            borderBottomWidth: 2,
            borderColor: '#D4AF37',
            width: '100%',
          }}
        />


{/* products */}
{
    new_collections.filter((cat)=> cat.category === category.name.toLowerCase()).map((item, index)=> (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'} key={index}>
     <Grid sx={{marginTop:'1vh'}} container spacing={2}>
          <Grid item xs={3}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}> <img height={'100%'} width={'100%'} src={item.image} alt={item.name} /></Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>{item.name}</Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>${item.price.toFixed(2)}</Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ padding: 2, fontFamily: 'cursive' }}>

            <Box
                  sx={{ padding: 2, fontFamily: 'cursive', cursor: 'pointer' }}
                  onClick={() => alert('remove')} 
                >
                  <CloseIcon />
                </Box>

            </Box>
          </Grid>
        </Grid>

        <Divider
          sx={{
            borderBottomWidth: 2,
            borderColor: '#D4AF37',
            width: '100%',
          }}
        />
     </Box>
    ))
    
}


        </Box>
    ))
}


        

</Box>

{showScrollToTop && (
        <Button
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            color: 'black',
            width:'50px',
            height:'2em',
            padding: '2em',
            borderRadius:'100%',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: 'whiteSmoke',
            },
          }}
        >
        <SwitchAccessShortcutIcon sx={{fontSize:"3em"}}/>
        </Button>
      )}




<Button
onClick={handleOpen}
          sx={{
            position: 'fixed',
            bottom: '10%',
            right: '5%',
            color: 'black',
            background: 'linear-gradient(130deg, red, white)',
            width:'6em',
            height:'6em',
            borderRadius:'100%',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: 'whiteSmoke',
            },
          }}
        >
        <AddIcon sx={{fontSize:'4em'}}/>
        </Button>



        <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={{ position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height:500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:'20px'
}}>
      
      <img 
    src={beachBack} 
    alt="Background" 
    style={{ 
      width: '100%', 
      height: '100%', 
      zIndex: -1,
        borderRadius:'20px'
    }} 
  />


<Box sx={{ width: '100%', height:'100%', 
     position: 'absolute',  
     right: 0, 
     bottom: 0,
     top:0,
     left: '50%',
     transform: 'translate(-50%, 0)'}} component={'form'} display={'flex'} justifyContent={'center'}>
        <Stack
          direction="column"
          spacing={'10%'}
          sx={{
            justifyContent: "flex-start",
            alignItems: "center",
            width: '50%',
            padding:3,
          }}
        >

<Box
            sx={{
              padding: '3px 10px', 
              backgroundColor: 'transparent', 
              borderRadius: '8px', 
              textAlign: 'center',
              width: '300px',
              transition: 'background-color 0.3s ease',
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
              Add product
            </Typography>
          </Box>

     <TextField
  id="outlined-required"
  label="Name"
  sx={fieldStyle}
/>

<TextField
  id="outlined-required"
  label="Price"
  sx={fieldStyle}
/>


<TextField
          select
          label="Category"
          defaultValue="Men"
          sx={fieldStyle}
        >
          {categories.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>


      



        <TextField
        disabled
  id="file-upload-textfield"
  label={fileName? '1 File uploaded': 'Upload File'}
  InputProps={{

    endAdornment: (
      <InputAdornment position="end">
        <label htmlFor="file-upload-button">
          <Button
            component="span"
            sx={{
              backgroundColor: 'transparent',  // Transparent background
              border: '2px solid black',       // Black border
              color: 'black',                  // Button text color
              borderRadius: '20px',            // Rounded corners
              padding: '8px 16px',             // Padding around text
              cursor: 'pointer',               // Pointer cursor
              '&:hover': {
                backgroundColor: '#f0f0f0',    // Light gray background on hover
              },
            }}
          >
            <FileUploadIcon/>
          </Button>
        </label>
      </InputAdornment>
    ),
  }}
  sx={{
    ...fieldStyle,
    '& .MuiOutlinedInput-root': {
    
      '&.Mui-disabled fieldset': {
        borderColor: 'black', 
      },
    },
    '& .MuiFormLabel-root': {
      color: 'black', 
    },
  }}
/>
<input
  accept="image/*"
  id="file-upload-button"
  type="file"
  style={{ display: 'none' }}  // Hide the actual file input
  onChange={handleFileChange}  // Handle file change if needed
/>
  
<Button type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#f44336',
              color: 'white',
              borderRadius: '20px',
              padding: { xs: '8px 16px', md: '10px 20px' },
              fontSize: { xs: '14px', md: '18px' },
              fontWeight: 'bold',
              width:'100%',
              boxShadow: 3,
              marginTop: '7vh',
              marginBottom: '5vh',
              '&:hover': {
                backgroundColor: '#d32f2f',
                boxShadow: 6,
              },
            }}
          >
            Add
          </Button>


</Stack>
</Box>
        </Box>
      </Modal>
      </Box>
      
    )
}