
const shapeCoords = [
    [-4.3, 5],
    [-4.3, 2.3],
    [2.3, -2.3],
    [2.3, -5],
    [4.3, -5],
    [4.3, -2.3],
    [-2.3, 2.3],
    [-2.3, 5],
];


export function Accent(props) {

    const mesh = useRef();

    
    const shapeGeo = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(...shapeCoords[0]);
        for(let i = 1; i < shapeCoords.length; i++) shape.lineTo(...shapeCoords[i]);
        return shape;
    }, [shapeCoords]);

    DebugDir(props);

    const speed = {
        x: Math.random() * 1,
        y: Math.random() * 1,
        z: Math.random() * 1,
    }

    return(
        <mesh
            ref={mesh}
            position={props.position}
            scale={[1.5, 2.5, 1]}
            rotation={[0, Math.PI, 0]}
        >
            <shapeBufferGeometry
            attach="geometry" 
            args={[shapeGeo]}
            />
            {props.material || Materials.normal}
        </mesh>
    )
}
