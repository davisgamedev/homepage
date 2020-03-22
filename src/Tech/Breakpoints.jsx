import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import WindowDimensions from './WindowDimensions';


export const breakpointsValues= {
    xs: 500,
    sm: 750,
    md: 975,
    lg: 1400,
    xl: 1520,
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