import {useState, useEffect} from 'react';


function getHeight() {
    const header = document.getElementById('header');
    return (header ? header.offsetHeight : 0);
}

export default function HeaderHeight() {

    const [height, setHeight] = useState(getHeight());

    useEffect(() => {
        function handleResize() {
            setHeight(getHeight());
        }

        console.log('resized');
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);


    }, []);
    return height;
}