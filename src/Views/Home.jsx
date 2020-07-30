import React from 'react';
import Header from '../Components/Header';
import ContentBody from './ContentBody';
import HeadlineBody from './HeadlineBody';
import Spacer from '../Components/Spacer';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { WarnDebug } from 'Tech/DebugLog';

import CloudinaryContext from 'cloudinary-react/lib/components/CloudinaryContext/CloudinaryContext';
import RouteUpdateHandler from 'Tech/RouteUpdateHandler';


export default function Home(props) {

    const [{isOpen, wasOpen}, setOpen] = React.useState({isOpen: false, wasOpen: false});

    setTimeout(() => { if(!wasOpen) open();}, 1000);

    function open() { setOpen({isOpen: true, wasOpen: true}); }
    function close() {setOpen({isOpen: false, wasOpen: true});}

    return(
        <CloudinaryContext cloudName={'dyzmnhqpr'}>
            
            <RouteUpdateHandler />

            <Header></Header>
            <Spacer></Spacer>

            <ContentBody></ContentBody>

            <WarnDebug></WarnDebug>

            <Snackbar 
            open={isOpen} 
            autoHideDuration={5000} 
            onClose={close}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            >
                <Alert severity="info" onClick={close}>
                    New project docs are being migrated daily. Check back again soon!
                </Alert>
            </Snackbar>
        </CloudinaryContext>
    );
}
