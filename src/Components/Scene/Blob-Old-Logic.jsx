
    // todo: use Camera.scissor
    // todo: Camera.depthBuffer, then we can unblock ThreeWater bs
    useFrame((state, delta) => {

        // gets new sphere position calculations
        UpdateLogic(delta);

        // if the camera moved
        if(
            !previousPosition || !previousPosition.checkEach(tctx.camera.position) ||
            !previousRotation || !previousRotation.checkEach(tctx.camera.rotation) 
            ) {

            // current camera positions
            let currentPosition = new Vector(tctx.camera.position);
            let currentRotation = new Vector(tctx.camera.rotation);

            // distance of previous camera to mesh
            let prevMeshCamDist;

            // if not a previous position, we'll base our future caluations form the current (initial) state
            // otherwise:
            if(previousPosition) {
                // get the previous distance (new target distance)
                prevMeshCamDist = new Vector(mesh.current.position).sub(previousPosition);

                setMesh(mesh, prevMeshCamDist);
                setMesh(meshBufferA, prevMeshCamDist);
                setMesh(meshBufferB, prevMeshCamDist);
                setMesh(meshGaussPrerender, prevMeshCamDist);
                setMesh(meshGaussShaderpass, prevMeshCamDist);

                //meshGaussPrerender.current.position.z -= 1;
            }

            // if this is our first time, we'll grab the distance for future updates
            prevMeshCamDist = prevMeshCamDist || new Vector(mesh.current.position).sub(currentPosition);

            // make the plane take up the full screen viewport width
            // camera view in gl units https://stackoverflow.com/a/13351534
            let vFOV = Three.MathUtils.degToRad( tctx.camera.fov );

            let currentViewport = {};
            currentViewport.height = 2 * Math.tan( vFOV / 2 ) * prevMeshCamDist.mag();
            currentViewport.width = currentViewport.height * tctx.camera.aspect;   

            // if we need to resize the plane do so
            if(!previousViewport || previousViewport != currentViewport) {

                setBuffers();

                let scale = {
                    width: currentViewport.width/initSize.width,
                    height: currentViewport.height/initSize.height
                };

                mesh.current.scale.set(scale.width, scale.height, 1);
                meshBufferA.current.scale.set(scale.width, scale.height, 1);
                meshBufferB.current.scale.set(scale.width, scale.height, 1);
                meshGaussPrerender.current.scale.set(scale.width, scale.height, 1);
                meshGaussShaderpass.current.scale.set(scale.width, scale.height, 1);

            }

            // time to update the world calculations in the shader by updating eye and world center
            let currentMeshPosition = new Vector(mesh.current.position);
            let center = new Vector(Uniforms.Center.value);

            // due to rounding errors we'll need to correct wrong negations and small changes during our checks
            if(previousMeshPosition && 
                !previousMeshPosition.abs().checkEach(currentMeshPosition.abs(), 5)) 
                {

                // add the change in mesh distance
                // world to shader coords are roughly half
                Uniforms.Center.value = 
                    center.add(
                        currentMeshPosition.sub(previousMeshPosition).mult(0.5)
                    ).toArray();
            }

            // set the eye to the current position + world center
            Uniforms.Eye.value = currentPosition.add(center).toArray();

            // update the previous variables for the next frame update
            previousPosition = currentPosition;
            previousRotation = currentRotation;
            previousViewport = currentViewport;
            previousMeshPosition = currentMeshPosition;

        }

        // update the uniforms according to the listed keys which signify what will need updates
        UniformUpdateKeys.forEach(
            key =>{
                mesh.current.material.uniforms[key].value = Uniforms[key].value;
                meshBufferA.current.material.uniforms[key].value = Uniforms[key].value;
                meshBufferB.current.material.uniforms[key].value = Uniforms[key].value;
            });
        
        meshGaussPrerender.current.material.uniforms['iResolution'].value = Uniforms.Resolution.value;

        renderBuffers();

    }, 0);