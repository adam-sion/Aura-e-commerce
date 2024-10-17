const didUserSign = ():boolean=> {
   return (localStorage.getItem('userData')) !== null;
}

const isAdmin = (): boolean => {
    const userData = localStorage.getItem('userData');
    
    if (!userData) return false;
  
    try {
      const parsedUserData = JSON.parse(userData);
  
      return parsedUserData?.username === 'admin';
    } catch (error) {
      console.error("Error parsing userData from localStorage:", error);
      return false;
    }
  };

  const isUser = (): boolean=> {
    return !isAdmin();
  }

  export {didUserSign, isAdmin, isUser}
  