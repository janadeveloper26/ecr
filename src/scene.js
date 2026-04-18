import * as THREE from 'three';

export function initScene() {
    const canvas = document.querySelector('#canvas-3d');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff6a00, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const blueLight = new THREE.PointLight(0x0088ff, 1);
    blueLight.position.set(-5, -2, 2);
    scene.add(blueLight);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xffffff,
        transparent: true,
        opacity: 0.5
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Hero Object (Floating Gear Representation)
    const textureLoader = new THREE.TextureLoader();
    const cameraTexture = textureLoader.load('/src/assets/hero_camera.png');
    
    const geometry = new THREE.PlaneGeometry(4, 4);
    const material = new THREE.MeshStandardMaterial({
        map: cameraTexture,
        transparent: true,
        side: THREE.DoubleSide
    });
    const heroPlane = new THREE.Mesh(geometry, material);
    heroPlane.position.x = 2;
    if (window.innerWidth < 768) heroPlane.position.x = 0;
    scene.add(heroPlane);

    camera.position.z = 5;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5);
        mouseY = (e.clientY / window.innerHeight - 0.5);
    });

    // Animation
    const timer = new THREE.Timer();

    function animate() {
        timer.update();
        const elapsedTime = timer.getElapsed();

        heroPlane.rotation.y = Math.sin(elapsedTime * 0.5) * 0.1;
        heroPlane.position.y = Math.sin(elapsedTime) * 0.1;
        
        particles.rotation.y = elapsedTime * 0.05;

        // Smooth follow mouse
        camera.position.x += (mouseX * 1 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 1 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
}
