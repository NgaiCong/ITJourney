import { FC, Suspense, useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree, invalidate } from '@react-three/fiber';
import { OrbitControls, useGLTF, useFBX, useProgress, Html, Environment, ContactShadows } from '@react-three/drei';
import { OBJLoader } from 'three-stdlib';
import * as THREE from 'three';
import { Camera } from 'lucide-react';

export interface ViewerProps {
    url: string;
    width?: number | string;
    height?: number | string;
    modelXOffset?: number;
    modelYOffset?: number;
    defaultRotationX?: number;
    defaultRotationY?: number;
    defaultZoom?: number;
    minZoomDistance?: number;
    maxZoomDistance?: number;
    enableMouseParallax?: boolean;
    enableManualRotation?: boolean;
    enableHoverRotation?: boolean;
    enableManualZoom?: boolean;
    ambientIntensity?: number;
    keyLightIntensity?: number;
    fillLightIntensity?: number;
    rimLightIntensity?: number;
    environmentPreset?: 'city' | 'sunset' | 'night' | 'dawn' | 'studio' | 'apartment' | 'forest' | 'park' | 'none';
    autoFrame?: boolean;
    placeholderSrc?: string;
    showScreenshotButton?: boolean;
    fadeIn?: boolean;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    onModelLoaded?: () => void;
}

const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
const deg2rad = (d: number) => (d * Math.PI) / 180;
const DECIDE = 8;
const ROTATE_SPEED = 0.005;
const INERTIA = 0.925;
const PARALLAX_MAG = 0.05;
const PARALLAX_EASE = 0.12;
const HOVER_MAG = deg2rad(6);
const HOVER_EASE = 0.15;

const Loader: FC<{ placeholderSrc?: string }> = ({ placeholderSrc }) => {
    const { progress, active } = useProgress();
    if (!active && placeholderSrc) return null;
    return (
        <Html center>
            {placeholderSrc ? (
                <img src={placeholderSrc} width={128} height={128} className="blur-lg rounded-lg" alt="Loading" />
            ) : (
                <div className="flex flex-col items-center justify-center bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10">
                    <div className="text-white font-mono text-sm">Loading Model</div>
                    <div className="text-emerald-400 font-bold mt-1">{Math.round(progress)}%</div>
                </div>
            )}
        </Html>
    );
};

const DesktopControls: FC<{
    pivot: THREE.Vector3;
    min: number;
    max: number;
    zoomEnabled: boolean;
}> = ({ pivot, min, max, zoomEnabled }) => {
    const ref = useRef<any>(null);
    useFrame(() => ref.current?.target.copy(pivot));
    return (
        <OrbitControls
            ref={ref}
            makeDefault
            enablePan={false}
            enableRotate={false}
            enableZoom={zoomEnabled}
            minDistance={min}
            maxDistance={max}
        />
    );
};

interface ModelInnerProps {
    url: string;
    xOff: number;
    yOff: number;
    pivot: THREE.Vector3;
    initYaw: number;
    initPitch: number;
    minZoom: number;
    maxZoom: number;
    enableMouseParallax: boolean;
    enableManualRotation: boolean;
    enableHoverRotation: boolean;
    enableManualZoom: boolean;
    autoFrame: boolean;
    fadeIn: boolean;
    autoRotate: boolean;
    autoRotateSpeed: number;
    onLoaded?: () => void;
}

const ProceduralLaptop = () => {
    return (
        <group position={[0, -0.5, 0]}>

            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.6, 0.08, 1.1]} />
                <meshStandardMaterial color="#A0A0A0" roughness={0.3} metalness={0.9} />
            </mesh>


            <mesh position={[0, 0.041, -0.1]}>
                <planeGeometry args={[1.4, 0.5]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
            </mesh>


            <mesh position={[0, 0.041, 0.35]}>
                <planeGeometry args={[0.5, 0.35]} />
                <meshStandardMaterial color="#909090" roughness={0.3} metalness={0.5} />
            </mesh>

            <group position={[0, 0.05, -0.55]} rotation={[THREE.MathUtils.degToRad(-15), 0, 0]}>

                <mesh position={[0, 0.55, 0]}>
                    <boxGeometry args={[1.6, 1.1, 0.05]} />
                    <meshStandardMaterial color="#A0A0A0" roughness={0.3} metalness={0.9} />
                </mesh>

                <mesh position={[0, 0.55, 0.026]}>
                    <planeGeometry args={[1.5, 1]} />
                    <meshStandardMaterial
                        color="#000000"
                        emissive="#2a2a40"
                        emissiveIntensity={0.6}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </mesh>

                <mesh position={[0, 0.98, 0.027]}>
                    <circleGeometry args={[0.007, 16]} />
                    <meshStandardMaterial color="#111" />
                </mesh>

                <mesh position={[0, 0.55, -0.026]} rotation={[0, Math.PI, 0]}>
                    <circleGeometry args={[0.08, 32]} />
                    <meshStandardMaterial color="#E0E0E0" emissive="#FFFFFF" emissiveIntensity={0.2} roughness={0.4} metalness={0.8} />
                </mesh>
            </group>
        </group>
    );
};

const ModelInner: FC<ModelInnerProps> = ({
    url,
    xOff,
    yOff,
    pivot,
    initYaw,
    initPitch,
    minZoom,
    maxZoom,
    enableMouseParallax,
    enableManualRotation,
    enableHoverRotation,
    enableManualZoom,
    autoFrame,
    fadeIn,
    autoRotate,
    autoRotateSpeed,
    onLoaded
}) => {
    const outer = useRef<THREE.Group>(null!);
    const inner = useRef<THREE.Group>(null!);
    const { camera, gl } = useThree();

    const vel = useRef({ x: 0, y: 0 });
    const tPar = useRef({ x: 0, y: 0 });
    const cPar = useRef({ x: 0, y: 0 });
    const tHov = useRef({ x: 0, y: 0 });
    const cHov = useRef({ x: 0, y: 0 });

    const ext = useMemo(() => url.split('.').pop()!.toLowerCase(), [url]);
    const isBuiltin = url === 'builtin:macbook';

    const content = useMemo<THREE.Object3D | null>(() => {
        if (isBuiltin) return null;

        try {
            if (ext === 'glb' || ext === 'gltf') return useGLTF(url).scene.clone();
            if (ext === 'fbx') return useFBX(url).clone();
            if (ext === 'obj') return useLoader(OBJLoader, url).clone();
        } catch (e) {
            console.error('Error loading model:', e);
            return null;
        }
        console.error('Unsupported format:', ext);
        return null;
    }, [url, ext, isBuiltin]);

    const pivotW = useRef(new THREE.Vector3());
    useLayoutEffect(() => {
        if (isBuiltin) {
            if (onLoaded) onLoaded();
            return;
        }

        if (!content) return;
        const g = inner.current;


        if (!g) return;

        g.updateWorldMatrix(true, true);

        const sphere = new THREE.Box3().setFromObject(g).getBoundingSphere(new THREE.Sphere());
        const s = 1 / (sphere.radius * 2 || 1);
        g.position.set(-sphere.center.x, -sphere.center.y, -sphere.center.z);
        g.scale.setScalar(s);

        g.traverse((o: any) => {
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
                if (fadeIn) {
                    o.material.transparent = true;
                    o.material.opacity = 0;
                }
            }
        });

        g.getWorldPosition(pivotW.current);
        pivot.copy(pivotW.current);
        outer.current.rotation.set(initPitch, initYaw, 0);

        if (autoFrame && (camera as THREE.PerspectiveCamera).isPerspectiveCamera) {
            const persp = camera as THREE.PerspectiveCamera;
            const fitR = sphere.radius * s;
            const d = (fitR * 1.2) / Math.sin((persp.fov * Math.PI) / 180 / 2);
            persp.position.set(pivotW.current.x, pivotW.current.y, pivotW.current.z + d);
            persp.near = d / 10;
            persp.far = d * 10;
            persp.updateProjectionMatrix();
        }


        if (fadeIn) {
            let t = 0;
            const id = setInterval(() => {
                t += 0.05;
                const v = Math.min(t, 1);
                g.traverse((o: any) => {
                    if (o.isMesh) o.material.opacity = v;
                });
                invalidate();
                if (v === 1) {
                    clearInterval(id);
                    onLoaded?.();
                }
            }, 16);
            return () => clearInterval(id);
        } else onLoaded?.();
    }, [content, autoFrame, camera, fadeIn, initPitch, initYaw, onLoaded, pivot, isBuiltin]);

    useEffect(() => {
        if (!enableManualRotation || isTouch) return;
        const el = gl.domElement;
        let drag = false;
        let lx = 0,
            ly = 0;
        const down = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
            drag = true;
            lx = e.clientX;
            ly = e.clientY;
            window.addEventListener('pointerup', up);
        };
        const move = (e: PointerEvent) => {
            if (!drag) return;
            if (!outer.current) return;
            const dx = e.clientX - lx;
            const dy = e.clientY - ly;
            lx = e.clientX;
            ly = e.clientY;
            outer.current.rotation.y += dx * ROTATE_SPEED;
            outer.current.rotation.x += dy * ROTATE_SPEED;
            vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };
            invalidate();
        };
        const up = () => (drag = false);
        el.addEventListener('pointerdown', down);
        el.addEventListener('pointermove', move);
        return () => {
            el.removeEventListener('pointerdown', down);
            el.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
        };
    }, [gl, enableManualRotation]);

    useEffect(() => {
        if (!isTouch) return;
        const el = gl.domElement;
        const pts = new Map<number, { x: number; y: number }>();
        type Mode = 'idle' | 'decide' | 'rotate' | 'pinch';
        let mode: Mode = 'idle';
        let sx = 0,
            sy = 0,
            lx = 0,
            ly = 0,
            startDist = 0,
            startZ = 0;

        const down = (e: PointerEvent) => {
            if (e.pointerType !== 'touch') return;
            pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
            if (pts.size === 1) {
                mode = 'decide';
                sx = lx = e.clientX;
                sy = ly = e.clientY;
            } else if (pts.size === 2 && enableManualZoom) {
                mode = 'pinch';
                const [p1, p2] = [...pts.values()];
                startDist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                startZ = camera.position.z;
                e.preventDefault();
            }
            invalidate();
        };

        const move = (e: PointerEvent) => {
            const p = pts.get(e.pointerId);
            if (!p) return;
            p.x = e.clientX;
            p.y = e.clientY;

            if (mode === 'decide') {
                const dx = e.clientX - sx;
                const dy = e.clientY - sy;
                if (Math.abs(dx) > DECIDE || Math.abs(dy) > DECIDE) {
                    if (enableManualRotation && Math.abs(dx) > Math.abs(dy)) {
                        mode = 'rotate';
                        el.setPointerCapture(e.pointerId);
                    } else {
                        mode = 'idle';
                        pts.clear();
                    }
                }
            }

            if (mode === 'rotate') {
                e.preventDefault();
                if (!outer.current) return;
                const dx = e.clientX - lx;
                const dy = e.clientY - ly;
                lx = e.clientX;
                ly = e.clientY;
                outer.current.rotation.y += dx * ROTATE_SPEED;
                outer.current.rotation.x += dy * ROTATE_SPEED;
                vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };
                invalidate();
            } else if (mode === 'pinch' && pts.size === 2) {
                e.preventDefault();
                const [p1, p2] = [...pts.values()];
                const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                const ratio = startDist / d;
                camera.position.z = THREE.MathUtils.clamp(startZ * ratio, minZoom, maxZoom);
                invalidate();
            }
        };

        const up = (e: PointerEvent) => {
            pts.delete(e.pointerId);
            if (mode === 'rotate' && pts.size === 0) mode = 'idle';
            if (mode === 'pinch' && pts.size < 2) mode = 'idle';
        };

        el.addEventListener('pointerdown', down, { passive: true });
        window.addEventListener('pointermove', move, { passive: false });
        window.addEventListener('pointerup', up, { passive: true });
        window.addEventListener('pointercancel', up, { passive: true });
        return () => {
            el.removeEventListener('pointerdown', down);
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
            window.removeEventListener('pointercancel', up);
        };
    }, [gl, enableManualRotation, enableManualZoom, minZoom, maxZoom, camera]);

    useEffect(() => {
        if (isTouch) return;
        const mm = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return;
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            const ny = (e.clientY / window.innerHeight) * 2 - 1;
            if (enableMouseParallax) tPar.current = { x: -nx * PARALLAX_MAG, y: -ny * PARALLAX_MAG };
            if (enableHoverRotation) tHov.current = { x: ny * HOVER_MAG, y: nx * HOVER_MAG };
            invalidate();
        };
        window.addEventListener('pointermove', mm);
        return () => window.removeEventListener('pointermove', mm);
    }, [enableMouseParallax, enableHoverRotation]);

    useFrame((_, dt) => {
        if (!outer.current) return;
        let need = false;
        cPar.current.x += (tPar.current.x - cPar.current.x) * PARALLAX_EASE;
        cPar.current.y += (tPar.current.y - cPar.current.y) * PARALLAX_EASE;
        const phx = cHov.current.x,
            phy = cHov.current.y;
        cHov.current.x += (tHov.current.x - cHov.current.x) * HOVER_EASE;
        cHov.current.y += (tHov.current.y - cHov.current.y) * HOVER_EASE;

        const ndc = pivotW.current.clone().project(camera);
        ndc.x += xOff + cPar.current.x;
        ndc.y += yOff + cPar.current.y;
        outer.current.position.copy(ndc.unproject(camera));

        outer.current.rotation.x += cHov.current.x - phx;
        outer.current.rotation.y += cHov.current.y - phy;

        if (autoRotate) {
            outer.current.rotation.y += autoRotateSpeed * dt;
            need = true;
        }

        outer.current.rotation.y += vel.current.x;
        outer.current.rotation.x += vel.current.y;
        vel.current.x *= INERTIA;
        vel.current.y *= INERTIA;
        if (Math.abs(vel.current.x) > 1e-4 || Math.abs(vel.current.y) > 1e-4) need = true;

        if (
            Math.abs(cPar.current.x - tPar.current.x) > 1e-4 ||
            Math.abs(cPar.current.y - tPar.current.y) > 1e-4 ||
            Math.abs(cHov.current.x - tHov.current.x) > 1e-4 ||
            Math.abs(cHov.current.y - tHov.current.y) > 1e-4
        )
            need = true;

        if (need) invalidate();
    });

    if (!content && !isBuiltin) return null;

    return (
        <group ref={outer}>
            <group ref={inner}>
                {isBuiltin && <ProceduralLaptop />}
                {!isBuiltin && content && <primitive object={content} />}
            </group>
        </group>
    );
};

const ModelViewer: FC<ViewerProps> = ({
    url,
    width = '100%',
    height = '100%',
    modelXOffset = 0,
    modelYOffset = 0,
    defaultRotationX = 0,
    defaultRotationY = 0,
    defaultZoom = 1,
    minZoomDistance = 0.5,
    maxZoomDistance = 10,
    enableMouseParallax = true,
    enableManualRotation = true,
    enableHoverRotation = true,
    enableManualZoom = true,
    ambientIntensity = 0.5,
    keyLightIntensity = 1.5,
    fillLightIntensity = 0.5,
    rimLightIntensity = 1,
    environmentPreset = 'city',
    autoFrame = true,
    placeholderSrc,
    showScreenshotButton = true,
    fadeIn = true,
    autoRotate = false,
    autoRotateSpeed = 0.5,
    onModelLoaded
}) => {
    useEffect(() => void useGLTF.preload(url), [url]);
    const pivot = useRef(new THREE.Vector3()).current;
    const contactRef = useRef<THREE.Mesh>(null);
    const rendererRef = useRef<THREE.WebGLRenderer>(null);
    const sceneRef = useRef<THREE.Scene>(null);
    const cameraRef = useRef<THREE.Camera>(null);

    const initYaw = deg2rad(defaultRotationX);
    const initPitch = deg2rad(defaultRotationY);
    const camZ = Math.min(Math.max(defaultZoom, minZoomDistance), maxZoomDistance);

    const capture = () => {
        const g = rendererRef.current,
            s = sceneRef.current,
            c = cameraRef.current;
        if (!g || !s || !c) return;
        g.shadowMap.enabled = false;
        const tmp: { l: THREE.Light; cast: boolean }[] = [];
        s.traverse((o: any) => {
            if (o.isLight && 'castShadow' in o) {
                tmp.push({ l: o, cast: o.castShadow });
                o.castShadow = false;
            }
        });
        if (contactRef.current) contactRef.current.visible = false;
        g.render(s, c);
        const urlPNG = g.domElement.toDataURL('image/png');
        const a = document.createElement('a');
        a.download = 'model.png';
        a.href = urlPNG;
        a.click();
        g.shadowMap.enabled = true;
        tmp.forEach(({ l, cast }) => (l.castShadow = cast));
        if (contactRef.current) contactRef.current.visible = true;
        invalidate();
    };

    return (
        <div
            style={{
                width,
                height,
                touchAction: 'pan-y pinch-zoom'
            }}
            className="relative flex items-center justify-center bg-transparent"
        >
            {showScreenshotButton && (
                <button
                    onClick={capture}
                    className="absolute top-4 right-4 z-10 cursor-pointer flex items-center gap-2 px-3 py-1.5 border border-white/20 rounded-full bg-black/40 text-xs font-mono text-white/70 hover:bg-white hover:text-black transition-all backdrop-blur-md"
                >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Chụp mô hình</span>
                </button>
            )}

            <Canvas
                shadows
                frameloop="demand"
                gl={{ preserveDrawingBuffer: true, alpha: true }}
                onCreated={({ gl, scene, camera }) => {
                    rendererRef.current = gl;
                    sceneRef.current = scene;
                    cameraRef.current = camera;
                    gl.toneMapping = THREE.ACESFilmicToneMapping;
                    gl.outputColorSpace = THREE.SRGBColorSpace;
                }}
                camera={{ fov: 45, position: [0, 0, camZ], near: 0.01, far: 100 }}
                style={{ touchAction: 'pan-y pinch-zoom', pointerEvents: 'auto' }}
                className="cursor-move"
            >
                {environmentPreset !== 'none' && <Environment preset={environmentPreset as any} background={false} />}

                <ambientLight intensity={ambientIntensity} />
                <directionalLight position={[5, 10, 5]} intensity={keyLightIntensity} castShadow />
                <directionalLight position={[-5, 5, 5]} intensity={fillLightIntensity} />
                <directionalLight position={[0, 0, -5]} intensity={rimLightIntensity} color="#4f46e5" />

                <ContactShadows ref={contactRef as any} position={[0, -0.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />

                <Suspense fallback={<Loader placeholderSrc={placeholderSrc} />}>
                    <ModelInner
                        url={url}
                        xOff={modelXOffset}
                        yOff={modelYOffset}
                        pivot={pivot}
                        initYaw={initYaw}
                        initPitch={initPitch}
                        minZoom={minZoomDistance}
                        maxZoom={maxZoomDistance}
                        enableMouseParallax={enableMouseParallax}
                        enableManualRotation={enableManualRotation}
                        enableHoverRotation={enableHoverRotation}
                        enableManualZoom={enableManualZoom}
                        autoFrame={autoFrame}
                        fadeIn={fadeIn}
                        autoRotate={autoRotate}
                        autoRotateSpeed={autoRotateSpeed}
                        onLoaded={onModelLoaded}
                    />
                </Suspense>

                {!isTouch && (
                    <DesktopControls pivot={pivot} min={minZoomDistance} max={maxZoomDistance} zoomEnabled={enableManualZoom} />
                )}
            </Canvas>
        </div>
    );
};

export default ModelViewer;
