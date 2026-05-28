import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img 
            {...props} 
            src={`/image/Logo_Pak_Haji_Elektronik.png?v=${new Date().getTime()}`} 
            alt="Logo Toko Pak Haji Elektronik" 
            style={{ width: '100%', height: '100%', objectFit: 'contain', ...props.style }}
        />
    );
}
