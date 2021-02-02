import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

export const breakpointsValues= {
    xs: 650,
    sm: 875,
    md: 1100,
    lg: 1800,
    //xl
};

const theme = createMuiTheme({
    breakpoints: {values: breakpointsValues}
});


function checkSmall() {
    const width = window.innerWidth;
    return {
        small: width <= breakpointsValues.sm,
        extraSmall: width <= breakpointsValues.xs,
    };

}


export function SmallView() {

    const [isSmall, setSmall] = React.useState(checkSmall());

    React.useEffect(() => {

        function handleResize() {
            setSmall(checkSmall());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return isSmall;
}

export default function Breakpoints(props) {
    return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
}