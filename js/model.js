
// Camera distance
var cameraFar = 5;

var theModel;

const MODEL_PATH = "content/camisa 2.glb";
const BACKGROUND_COLOR = 0xF2F2F2;

// Init the scene
const scene = new THREE.Scene();

// Set background
scene.background = new THREE.Color(BACKGROUND_COLOR );
scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

const canvas = document.querySelector('#c');

// Init the renderer
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});

renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio); 

// Add a camera
var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = cameraFar;
camera.position.x = 0;

// OBJECT LOADER //

// Initial material
const INITIAL_MTL = new THREE.MeshPhongMaterial( { color: 0xf1f1f1, shininess: 10 } );

//--> this is for multiple part objects
const INITIAL_MAP = [
    {childID: "shirt", mtl: INITIAL_MTL},
    {childID: "buttons", mtl: INITIAL_MTL},
    {childID: "cushions", mtl: INITIAL_MTL},
    {childID: "legs", mtl: INITIAL_MTL},
    {childID: "supports", mtl: INITIAL_MTL},
];

// Init the object loader
var loader = new THREE.GLTFLoader();

loader.load(MODEL_PATH, function(gltf) {
    theModel = gltf.scene;

    theModel.traverse((o) => {
        if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
        }
    });

// Function - Add the textures to the models
function initColor(parent, type, mtl) {
    parent.traverse((o) => {
        if (o.isMesh) {
        if (o.name.includes(type)) {
                o.material = mtl;
                o.nameID = type; // Set a new property to identify this object
                }
            }
        });
    }

// Set the models initial scale   
    theModel.scale.set(2,2,2);

    theModel.rotation.y = Math.PI;

  // Offset the y position a bit
    theModel.position.y = -1;

  // Add the model to the scene
    scene.add(theModel);

}, undefined, function(error) {
    console.error(error)
});


// LIGHTS //
// Add lights
var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.61 );
    hemiLight.position.set( 0, 50, 0 );
// Add hemisphere light to scene   
scene.add( hemiLight );

var dirLight = new THREE.DirectionalLight( 0xffffff, 0.54 );
    dirLight.position.set( -8, 12, 8 );
    dirLight.castShadow = true;
    dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
// Add directional Light to scene    
    scene.add( dirLight );


// FLOOR //
// Floor
var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
var floorMaterial = new THREE.MeshPhongMaterial({
    color: 0x88837D,
    shininess: 0
});

var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -0.5 * Math.PI;
floor.receiveShadow = true;
floor.position.y = -1;
scene.add(floor);


// Add controls

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 3;
controls.enableDamping = true;
controls.enablePan = false;
controls.dampingFactor = 0.1;
controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
controls.autoRotateSpeed = 0.2; // 30

// ANIMATION //
// Animation
function animate() {
    
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
}

animate();


// SHARP RESOLUTION //
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvasPixelWidth = canvas.width / window.devicePixelRatio;
    var canvasPixelHeight = canvas.height / window.devicePixelRatio;

    const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
    if (needResize) {

    renderer.setSize(width, height, false);
    }
    return needResize;
}