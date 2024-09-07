import './style.css'
import * as Three from 'three'

let mouseStartX=0
let mouseStartY=0
let mouseX=0
let mouseY=0
let dragX=0
let dragY=0
let newOrigin={
    x:0,
    y:0
}


let drag=false

// Options

const options={
    width: window.innerWidth,
    height: window.innerHeight
}
// Scene
const scene=new Three.Scene()
scene.background=new Three.Color(0xffffff)

// Camera 
const camera=new Three.PerspectiveCamera(80, options.width/options.height, 0.1, 1000)
camera.position.z=10
camera.position.y=0





// Objects
// Cube


const cubeGeometry=new Three.BoxGeometry(2,2,2)
const cubeMaterial=new Three.MeshStandardMaterial({color: "crimson"})
const cubeobj = new Three.Mesh(cubeGeometry, cubeMaterial)
scene.add(cubeobj)

const cubeMaterial2=new Three.MeshStandardMaterial({color: "blue"})
const cubeobj2 = new Three.Mesh(cubeGeometry, cubeMaterial2)
scene.add(cubeobj2)
cubeobj2.position.y=3



// Lights
const directionalLight=new Three.DirectionalLight(0xffffff,10)
const ambientLight=new Three.AmbientLight(0xffffff,0.2)

directionalLight.position.z=10
directionalLight.position.y=10
directionalLight.position.x=10

scene.add(directionalLight)
scene.add(ambientLight)


// Renderer
const renderer=new Three.WebGLRenderer()
renderer.setSize(options.width, options.height)
renderer.setPixelRatio(2)
document.body.appendChild(renderer.domElement)

// Loop
function animate(){
    requestAnimationFrame(animate)

    // cubeobj.rotation.x-=0.01
    // cubeobj.rotation.y-=0.01
    // cubeobj2.rotation.x+=0.01
    // cubeobj2.rotation.y+=0.01
    
    renderer.render(scene, camera)
    console.log(camera.position.x,camera.position.y)
}

window.addEventListener("mousemove",function(e){
    mouseX=e.clientX
    mouseY=e.clientY
    if(drag){
        dragX=mouseStartX-mouseX
        dragY=mouseStartY-mouseY
        cubeobj2.rotation.x=(newOrigin.y/100)-(dragY/100)
        cubeobj2.rotation.y=-(newOrigin.x/100)-(dragX/100)

    }

})

window.addEventListener("mousedown", function(){
    if(!drag){
        mouseStartX=mouseX
        mouseStartY=mouseY
    }
    drag=true
})

window.addEventListener("mouseup", function(){
    drag=false
    newOrigin.x=dragX
    newOrigin.y=dragY

})


animate()