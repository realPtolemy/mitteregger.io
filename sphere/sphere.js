var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
document.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
var mouseX;
var mouseY;
var distance = Math.min(200, window.innerWidth / 4);
var geometry = new THREE.BufferGeometry();
var vertices = [];

for (var i = 0; i < 1600; i++) {
    var theta = THREE.MathUtils.randFloatSpread(360);
    var phi = THREE.MathUtils.randFloatSpread(180);

    var x = distance * Math.sin(theta) * Math.cos(phi);
    var y = distance * Math.sin(theta) * Math.sin(phi);
    var z = distance * Math.cos(theta);

    vertices.push(x, y, z);
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

var particles = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xffffff, size: 2}));

var renderingParent = new THREE.Group();
renderingParent.add(particles);

var resizeContainer = new THREE.Group();
resizeContainer.add(renderingParent);
scene.add(resizeContainer);

camera.position.z = 400;

var animate = function() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

var myTween;
function onMouseMove(event) {

    if(myTween)
        myTween.kill();

    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = (event.clientY / window.innerHeight) * 2 + 1;
    myTween = gsap.to(particles.rotation, {duration: 0.1, x: mouseY*-1, y: mouseX});
}

animate();

var animProps = {scale: 1, xRot: 0, yRot: 0};

//  Create a tween on the 'animProps' object
gsap.to(
    animProps, {
        duration: 10,
        scale: 0.61803399,
        repeat: -1,
        yoyo: true,
        ease: "sine",
        onUpdate: function() {
            renderingParent.scale.set(animProps.scale, animProps.scale, animProps.scale);
        }
    }
)

//  Create a tween on the 'animProps' object
gsap.to(
    animProps, {
        duration: 120,
        xRot: Math.PI * 2,
        yRot: Math.PI * 4,
        repeat: -1,
        yoyo: true,
        ease: "none",
        onUpdate: function() {
            renderingParent.rotation.set(animProps.xRot, animProps.yRot, 0);

        }
    }
)
