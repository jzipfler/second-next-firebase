import React, {useMemo, useRef} from 'react';
import * as THREE from 'three';
import {Canvas, useFrame} from 'react-three-fiber';
import {Box, HTML, OrbitControls, PerspectiveCamera} from 'drei';

function Cube() {
    const cam = useRef()
    const [scene, target] = useMemo(() => {
        const scene = new THREE.Scene()
        scene.background = new THREE.Color("orange")
        const target = new THREE.WebGLRenderTarget(1024, 1024)
        return [scene, target]
    }, [])

    useFrame(state => {
        // @ts-ignore
        cam.current.position.z =
            5 + Math.sin(state.clock.getElapsedTime() * 1.5) * 2
        state.gl.setRenderTarget(target)
        state.gl.render(scene, cam.current)
        state.gl.setRenderTarget(null)
    })


    return (
        <PerspectiveCamera ref={cam} makeDefault={true} position={[0, 0, 3]} >
            <Box args={[1, 1, 1]}>
                <HTML scaleFactor={10}>
                    <div className="content">HTML Content in Cube</div>
                </HTML>
                <meshStandardMaterial attach="material" map={target.texture}/>
            </Box>
        </PerspectiveCamera>
    )
}

const Test = () => {
    return (
        <Canvas colorManagement style={{
            position: 'absolute',
            width: '400px',
            height: 'calc(100% - 100px)',
            top: '100px',
            right: 0
        }}>
            <ambientLight/>
            <spotLight position={[10, 10, 10]}/>
            <pointLight position={[-10, -10, -10]} color="red"/>
            <Cube/>
            <OrbitControls enableZoom={false}/>
        </Canvas>
    );
}

export default Test;