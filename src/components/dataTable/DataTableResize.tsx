import { useEffect, useRef, useState } from 'react';

function useResize() {
    const [key, setKey] = useState(0);
    const resizeRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setKey((prev) => prev + 1);
        };

        const observer = new ResizeObserver(handleResize);

        if (resizeRef.current) {
            observer.observe(resizeRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return { resizeRef, key };
}

export default useResize;