import React from 'react';
import { useThree } from "react-three-fiber";
import { CubeTextureLoader } from 'three';

/*
Quarry
[
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596560624/Maps/Quarry/px_rhaag9.png', 
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596560625/Maps/Quarry/nx_nf8ewn.png', 
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596560623/Maps/Quarry/py_nozts5.png', 
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596560625/Maps/Quarry/ny_t2u0nh.png', 
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596560625/Maps/Quarry/pz_ixmkud.png', 
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596560625/Maps/Quarry/nz_fts1g9.png',
]
Venice
[
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596560660/Maps/Venice/px_wfxoz0.png',
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596560657/Maps/Venice/nx_vennoj.png',
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596560659/Maps/Venice/py_vrsrmv.png',
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596560660/Maps/Venice/ny_pbaxvl.png',
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596560659/Maps/Venice/pz_etexjm.png',
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596560660/Maps/Venice/nz_uisfql.png',
]
Early Beach
[
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596836459/Maps/Early%20Beach/px_pxosau.png',
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596836459/Maps/Early%20Beach/nx_iqios7.png',
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596836458/Maps/Early%20Beach/py_rkqxbf.png',
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596836459/Maps/Early%20Beach/ny_mqgymg.png',
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596836458/Maps/Early%20Beach/pz_frupjb.png',
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596836459/Maps/Early%20Beach/nz_dt5y1g.png',
]
Blue Beach
[
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596836432/Maps/Blue%20Sunrise/px_fuzanw.png',
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596836432/Maps/Blue%20Sunrise/nx_hkqur2.png',
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596836431/Maps/Blue%20Sunrise/py_lcshrf.png',
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596836431/Maps/Blue%20Sunrise/ny_yaytac.png',
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596836432/Maps/Blue%20Sunrise/pz_jcfzlj.png',
    'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596836431/Maps/Blue%20Sunrise/nz_g1rtcf.png',
]
*/









let skyBox;

export function getSkyBox() { return skyBox; }

export default function SkyBox() {
    const { scene } = useThree();
    const loader = new  CubeTextureLoader();
    // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
    
    const texture = loader.load(
        [
            'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596836432/Maps/Blue%20Sunrise/px_fuzanw.png',
            'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596836432/Maps/Blue%20Sunrise/nx_hkqur2.png',
            'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596836431/Maps/Blue%20Sunrise/py_lcshrf.png',
            'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596836431/Maps/Blue%20Sunrise/ny_yaytac.png',
            'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596836432/Maps/Blue%20Sunrise/pz_jcfzlj.png',
            'https://res.cloudinary.com/dyzmnhqpr/image/upload/v1596836431/Maps/Blue%20Sunrise/nz_g1rtcf.png',
        ]
    );
    // Set the scene background property to the resulting texture.
    scene.background = texture;
    skyBox = texture;

    return null;
  }