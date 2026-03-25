import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class RequestModelComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="request-model-block">
                <div id="request-model-viewer" class="request-model-viewer"></div>
            </div>
        `;
    }

    render() {
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const container = document.getElementById("request-model-viewer");

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8f8f8);

        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 1.5, 4);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        const ambient_light = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambient_light);

        const directional_light = new THREE.DirectionalLight(0xffffff, 1.5);
        directional_light.position.set(3, 5, 3);
        scene.add(directional_light);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.target.set(0, 0.8, 0);

        const loader = new GLTFLoader();

        loader.load(
            "./models/calculator.glb",
            (gltf) => {
                const model = gltf.scene;

                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                model.position.x -= center.x;
                model.position.y -= box.min.y;
                model.position.z -= center.z;

                const max_size = Math.max(size.x, size.y, size.z);
                const scale = 2 / max_size;
                model.scale.setScalar(scale);

                scene.add(model);
            },
            undefined,
            () => {
                container.innerHTML = `
                    <div class="model-error">
                        3D модель не найдена
                    </div>
                `;
            }
        );

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener("resize", () => {
            const width = container.clientWidth;
            const height = container.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        });
    }
}