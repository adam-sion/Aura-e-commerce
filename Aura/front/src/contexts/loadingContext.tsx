import { Box, CircularProgress } from "@mui/material";
import { createContext, FC, ReactNode, useContext, useState } from "react";


interface LoadingContextType {
    setIsLoading: (isLoading: boolean) => void;
    loading: boolean;
    loadingSpinner: ReactNode;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);


const LoadingProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const setIsLoading = (isLoading: boolean) => {
        setLoading(isLoading);
    };

    const loadingSpinner: ReactNode = (
        <Box
            sx={{
                display: 'flex',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)', 
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                width: '100%', 
                overflow:'hidden'
            }}
        >
            <CircularProgress color={"secondary"} size={250} />
        </Box>
    );
    

    return (
        <LoadingContext.Provider value={{ setIsLoading, loadingSpinner,loading }}>
            {loading? loadingSpinner: children}
        </LoadingContext.Provider>
    );
};

const useLoading = () => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};

export { LoadingProvider, useLoading };
