    const width = window.innerWidth;
    const height = window.innerHeight;
    let size = 1;
    let coll = 0;
    massSizeX = [];
    massSizeY = [];
    const canvas = document.getElementById('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    const renderer = new THREE.WebGLRenderer({canvas : canvas});
    renderer.setClearColor(0xFFFFFF);

    const  scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 7000);
    camera.position.set(0, 0, 5000);
    const  light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

window.onload = function () {
    Col();
    PiramideSize();
    CreatePodium();
};


    controls = new THREE.TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    function animate(){
        renderer.render(scene, camera);
       controls.update();
        ChangeSizeMin(size);
        CreatePodium();
        requestAnimationFrame(function () {
            animate();
        })
    }
    animate();
    console.log(scene.children);
    function ChangeSizeMin(size) {
        for (let i = 0; i < scene.children.length; i++ ){
            scene.children[i].scale.x = size;
            scene.children[i].scale.y = size;
            scene.children[i].scale.z = size;
            scene.children[i].position.x =  massSizeX[i] * size  - 25* coll*size;
            scene.children[i].position.y = massSizeY[i]  * size - 990;
        }
    }

    function createCube(x, y, pos) {
    let geometry = new THREE.CubeGeometry(30*size, 30*size, 30*size);
    let material = new THREE.MeshBasicMaterial({color : 0xffffff, vertexColors : THREE.FaceColors});

    for (let  i = 0; i < geometry.faces.length; i++){
        geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
    }
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.x =  50*x + pos;
    mesh.position.y = 30*y;
    return mesh;
}



function Col(){
    let col =   document.getElementById('start').value;
    document.getElementById('col').innerHTML ='<h4>Количество снизу:  '+ col +'</h4>';
    scene.remove.apply(scene, scene.children);
    coll = col;
    createPiramide(col);
    massSizeX = [];
    massSizeY = [];
    for (let i = 0; i < scene.children.length; i++){
        massSizeX.push(scene.children[i].position.x);
        massSizeY.push(scene.children[i].position.y);
    }

}


function PiramideSize() {
    let getsize =   document.getElementById('cowbell').value;
    document.getElementById('size').innerHTML = '<h4> Размер : ' + getsize+ '</h4>';
    getsize = getsize/100;
    size = getsize;
    ChangeSizeMin(getsize);
}

    function createPiramide(col){
        let num = col;
        let pos = 0;

        for (let i = 0; i < num; i++){
            for (let j = 0; j < col; j++){
                scene.add(createCube(i, j, pos));
                pos += 25;
            }
            pos = 0;
            col--;
        }
    }

function CreatePodium() {
    let geometry = new THREE.PlaneGeometry(600, 600, 12, 12);
    let material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -1000;
    mesh.position.x = width/height;
    mesh.rotation.x = -300;
    scene.add(mesh);
}

