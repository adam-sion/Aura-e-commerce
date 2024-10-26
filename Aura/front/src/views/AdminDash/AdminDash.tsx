import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import { isAdmin } from "../../utils/roles";
import { Navigate } from "react-router-dom";
import { Box, Button, Divider, Grid, InputAdornment, MenuItem, Modal, Stack, TextField, Typography } from "@mui/material";
import { categories } from "../../utils/data";
import "./AdminDash.css";
import CloseIcon from '@mui/icons-material/Close';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import beachBack from "../../Assets/categoriesBackground.png";
import Swal from "sweetalert2";
import { Product } from "../../types/Product";
import axios from "axios";
import { useFetchCategoryProducts } from "../../api/hooks/useFetchCategoryProducts";
import { useLoading } from "../../contexts/loadingContext";



type ValidationRule = {
  rule: (value: string|File|number|null) => boolean;
  userTyped: boolean;
};

type ValidationRulesType = {
  name: ValidationRule;
  price: ValidationRule;
  image: ValidationRule;
};


export const AdminDash:FC = ()=> {


  const {setIsLoading} = useLoading();
  const handleRemove = async (product:Product)=> {
    const apiRemove = axios.create({baseURL:`${import.meta.env.VITE_API_URL}/api/product/${product.id}`});
    try {
    const {data} = await apiRemove.delete('');
    product.category ==='kids'? fetchKidsProducts(): 
    product.category ==='men'?fetchMenProducts(): fetchWomenProducts();
    Swal.fire({
      title: 'Success',
      text: data,
      icon: 'success',
      confirmButtonText: 'Okay',
  });

    } catch (error:any) {
 const errorMessage = error.message || "Can't remove product";
          
          Swal.fire({
              title: 'Failed',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'Okay',
          });
    }

  }
 
    const [ menProducts, fetchMenProducts ] = useFetchCategoryProducts('men');
    const [ womenProducts, fetchWomenProducts ] = useFetchCategoryProducts('women');
    const [ kidsProducts, fetchKidsProducts ] = useFetchCategoryProducts('kids');

    const [productMap, setProductMap] = useState<{[key:string]:Product[]}>({
      men:[],
      women:[],
      kids:[]
    })

    useEffect(() => {
      setProductMap({
          men: menProducts,
          women: womenProducts,
          kids: kidsProducts,
      });

  }, [menProducts, womenProducts, kidsProducts]);


    const refs = useRef<(null | HTMLDivElement)[]>([]);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
   const [modalOpen, setModalOpen] = useState<boolean>(false);

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
          color: 'black',  
        },
        '& label': {
          color: 'black', 
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'black', 
          },
          '&:hover fieldset': {
            borderColor: 'black',  
          },
          '&.Mui-focused fieldset': {
            borderColor: 'black',  
          },
        },
        '& .MuiFormLabel-root.Mui-focused': {
          color: 'black',  
        },
      }

      const errorStyle = {
        width:'100%',
        input: {
          color: 'black',  
        },
        '& label': {
          color: 'black',  
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'red',  
          },
          '&:hover fieldset': {
            borderColor: 'red',  
          },
          '&.Mui-focused fieldset': {
            borderColor: 'red',  
          },
        },
        '& .MuiFormLabel-root.Mui-focused': {
          color: 'black',  
        },
      }


const api = axios.create({
  baseURL:`${import.meta.env.VITE_API_URL}/api`
 })

const [formData, setFormData] = useState<{name:string, price:number|null, image:File|null, category:Product["category"]}>({
  name:'',
  price:null,
  image: null,
  category: 'men'
});

const [validationRules, setValidationRules] = useState<ValidationRulesType>({
  name: {
    rule: (x) =>
      String(x).length > 0 && String(x).length < 50,
    userTyped: false,
  },
  price: {
    rule: (x) =>
        x!== null && Number(x)>0 && Number(x)<100000,
    userTyped: false,
  },
  image: {
    rule: (x)=> x!==null && x instanceof File ,
    userTyped: false
  }

});


const handleSubmit =  async (e:FormEvent<HTMLFormElement>)=> {
  e.preventDefault();

  try {
    const form = new FormData();
    form.append('product', formData.image!)
   const imgData = await api.post('/upload',form);
   if (imgData.data.image_url === undefined) {
    throw new Error("can't upload image");
   }

   setIsLoading(true);
   const {data} = await api.post('/product', {name:formData.name, price:formData.price, category: formData.category, img:imgData.data.image_url});
   formData.category ==='kids'? fetchKidsProducts(): 
   formData.category ==='men'?fetchMenProducts(): fetchWomenProducts();
   Swal.fire({
    title: 'Success',
    text: data,
    icon: 'success',
    confirmButtonText: 'Great',
  });
  

    setFormData({   name:'',
      price:null,
      image: null,
      category: 'men'});
    setValidationRules({
      name: { ...validationRules.name, userTyped: false },
      price: { ...validationRules.price, userTyped: false },
      image: {...validationRules.image, userTyped:false}
    });

  
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Can't add product, something went wrong";
    
    Swal.fire({
      title: 'Failed',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Great',
    });
} finally {
  setIsLoading(false);
}
}



const isFormValid = () => {
  return Object.keys(validationRules).every((key) => {
    const rule = validationRules[key as keyof ValidationRulesType].rule;
    
    const value:any = formData[key as keyof {name:string, price:number|null, image:File|null}];
 return rule(value);
  })
};


const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

  const { name, value } = e.target;

  if (name !== "category") {
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
}

  setFormData({ ...formData, [name]: name==="image"? e.target.files![0] :name==="category"? value.toLowerCase(): value });
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
    width: { xs: '90%', sm: '70%', md: '60%', lg: '50%' }, 
    height: { xs: '150vh', sm: '100vh', md: '50vh', lg:'60vh' },
    position: 'relative',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '7vh',
    overflow: 'hidden' 
  }}
>
  <img 
    src={beachBack} 
    alt="Background" 
    style={{ 
      width: '100%', 
      height: '100%', 
      zIndex: -1,
      borderRadius: '20px',
      position: 'absolute', 
      top: 0,
      left: 0,
      objectFit: 'cover', 
    }} 
  />
  <Box 
    sx={{ 
      width: '95%',
      height: { xs: '100%', sm: '80%', md:'100%' }, 
      position: 'absolute',  
      right: 0, 
      bottom: 0,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      overflowY: 'auto', 
      padding: '10px' 
    }}
  >
    <Grid 
      container 
      spacing={2} 
      sx={{ 
        height: '100%',
        flexDirection: { xs: 'row', sm: 'row' }, 
      }}
      alignItems={'center'}
      justifyContent={'center'}
    >
      {
        categories.map((category, index) => (
          <Grid 
            item 
            xs={8} sm={6} md={4} 
            key={category.name} 
            sx={{ 
              display: 'flex', 
              flexDirection:{md:'row', lg:'row', sm:'column', xs:'column'},
              justifyContent: {xs:'flex-start',md:'center'}, 
              alignItems: 'center',
              padding: { xs: '5px', sm: '0' } 
            }} 
          >
            <Box 
              sx={{ 
                height: '60%', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                position: 'relative', 
                overflow: 'hidden', 
                padding: '10px', 
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '20px' 
              }} 
              className="category-card"
            >
              <img 
                className="category-img" 
                style={{ 
                  borderRadius: '20px', 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }}  
                src={category.pic} 
                alt="" 
              />

              <Button 
                onClick={() => scrollToRef(index)}
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



<Box sx={{marginTop:'4vh',  width: '60%'}}>

{
  categories.map((category, index) => (
    <Box key={index} sx={{ marginBottom: '15vh' }} ref={(el: HTMLDivElement | null) => (refs.current[index] = el)}>
      <Typography
        sx={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
        textAlign={'center'}
        variant="h3"
      >
        {category.name}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 2 }}>
        <Divider
          sx={{
            borderBottomWidth: '0.3em',
            borderColor: 'lightBlue',
            width: '3em',
          }}
        />
      </Box>

      {/* Header Row */}
      <Grid sx={{ marginTop: '1vh' }} container spacing={2}>
        <Grid item xs={3} sm={3} md={3}>
          <Box sx={{ padding: 2, fontFamily: 'Gill Sans, Verdana' }}>Products</Box>
        </Grid>
        <Grid item xs={3} sm={3} md={3}>
          <Box sx={{ padding: 2, fontFamily: 'Gill Sans, Verdana'}}>Title</Box>
        </Grid>
        <Grid item xs={3} sm={3} md={3}>
          <Box sx={{ padding: 2, fontFamily: 'Gill Sans, Verdana'}}>Price</Box>
        </Grid>
        <Grid item xs={3} sm={3} md={3}>
          <Box sx={{ padding: 2, fontFamily: 'Gill Sans, Verdana' }}>Remove</Box>
        </Grid>
      </Grid>

      <Divider
        sx={{
          borderBottomWidth: 2,
          borderColor: '#D4AF37',
          width: '100%',
        }}
      />

      {/* Product Rows */}
      {productMap !== null
        ? productMap[category.name.toLowerCase()].map((item: Product, index) => (
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'} key={index}>
              <Grid sx={{ marginTop: '1vh' }} container spacing={2}>
                <Grid item xs={6} sm={3} md={3}>
                  <Box sx={{ padding: { xs: 1, sm: 2, md: 2 }, fontFamily: 'cursive' }}>
                    <img height={'100%'} width={'100%'} src={item.img} alt={item.name} />
                  </Box>
                </Grid>
                <Grid item xs={3} sm={3} md={3}>
                  <Box sx={{ padding: { xs: 1, sm: 2, md: 2 },fontFamily: 'Gill Sans, Verdana' }}>{item.name}</Box>
                </Grid>
                <Grid item xs={3} sm={3} md={3}>
                  <Box sx={{ padding: { xs: 1, sm: 2, md: 2 }, fontFamily: 'Gill Sans, Verdana' }}>${item.price.toFixed(2)}</Box>
                </Grid>
                <Grid item xs={3} sm={3} md={3}>
                  <Box sx={{ padding: { xs: 1, sm: 2, md: 2 }, fontFamily: 'Gill Sans, Verdana' }}>
                    <Box
                      sx={{ fontFamily: 'cursive', cursor: 'pointer' }}
                      onClick={() => handleRemove(item)}
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
        : null}
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
  id='modal'
  open={modalOpen}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: { xs: '90%', sm: '70%', md: '50%', lg: '40%' },
      height: {lg:'80vh', md:'60vh', sm:'60vh', xs:'60vh'},
      bgcolor: 'background.paper',
      boxShadow: 24,
      borderRadius: '20px',
      overflow: 'hidden', 
    }}
  >
    <img
      src={beachBack}
      alt="Background"
      style={{
        width: '100%',
        height: '100%',
        zIndex: -1,
        borderRadius: '20px',
      }}
    />

    <Box
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        right: 0,
        bottom: 0,
        top: 0,
        left: '50%',
        transform: 'translate(-50%, 0)',
      }}
      component={'form'}
      display={'flex'}
      justifyContent={'center'}
    >
      <Stack
        direction="column"
        spacing={'13%'}
        sx={{
          justifyContent: "flex-start",
          alignItems: "center",
          width: { xs: '90%', sm: '70%', md: '60%', lg: '50%' },
          maxHeight: '90%', 
          padding: { xs: 2, sm: 3, md: 4, lg: 5 },
          overflowY: 'hidden', 
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
          onChange={handleChange}
          value={formData["name"]}
          name={"name"}
          id="outlined-required"
          label="Name"
          sx={validationRules["name"].userTyped && !validationRules["name"].rule(formData["name"]) ? errorStyle : fieldStyle}
        />

        <TextField
          onChange={handleChange}
          value={!validationRules["price"].userTyped ? "" : formData["price"]}
          name={"price"}
          id="outlined-required"
          label="Price"
          sx={validationRules["price"].userTyped && !validationRules["price"].rule(formData["price"]) ? errorStyle : fieldStyle}
        />

        <TextField
          onChange={handleChange}
          select
          label="Category"
          defaultValue="Men"
          sx={fieldStyle}
          name="category"
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
          label={formData["image"]?.name ? '1 Image uploaded' : 'Upload Image'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <label htmlFor="file-upload-button">
                  <Button
                    component="span"
                    sx={{
                      backgroundColor: 'transparent',
                      border: '2px solid black',
                      color: 'black',
                      borderRadius: '20px',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                      },
                    }}
                  >
                    <FileUploadIcon />
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
          style={{ display: 'none' }}
          onChange={handleChange}
          name={"image"}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#f44336',
            color: 'white',
            borderRadius: '20px',
            padding: { xs: '8px 16px', md: '10px 20px' },
            fontSize: { xs: '14px', md: '18px' },
            fontWeight: 'bold',
            width: '100%',
            boxShadow: 3,
            marginTop: 'auto', 
            marginBottom: '5vh',
            '&:hover': {
              backgroundColor: '#d32f2f',
              boxShadow: 6,
            },
          }}
          disabled={!isFormValid()}
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