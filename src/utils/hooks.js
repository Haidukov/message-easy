import { useEffect, useState } from 'react';

export const useSize = () => {
    const [size, setSize] = useState({
       height: window.innerHeight,
       width: window.innerWidth 
    });

    useEffect(() => {
        const handler = () => setSize({ height: window.innerHeight, width: window.innerWidth });
        handler();
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return size;
};