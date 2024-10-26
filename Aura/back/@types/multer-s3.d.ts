import 'multer';

declare module 'multer' {
    export interface File {
        location?: string;
        key?: string; 
    }
}
