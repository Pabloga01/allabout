import { Component } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'src/assets/three/OrbitControls.js';
import * as d3 from 'd3';
import * as topojson from 'topojson';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  public title!: string;
  public comment!: string;
  public year!: number;


  constructor() {
    this.title = 'Titulo de la pantalla home';
    this.comment = 'Subtitulo de la pantalla home';
    this.year = 2023;
    console.log('component working')
  }
}





// const { json, select, selectAll, geoOrthographic, geoPath, geoGraticule, timer, range, pairs, rotation = { x: 0, y: 0 } } = d3;
const pairs: any = 0;



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 0, 0);
camera.lookAt(scene.position);
camera.updateMatrix();
window.addEventListener('resize', onWindowResize);


const rendered = new THREE.WebGLRenderer({ antialias: true });
rendered.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(rendered.domElement);


rendered.setSize(innerWidth, innerHeight);
document.body.appendChild(rendered.domElement);





var controls = new OrbitControls(camera, rendered.domElement);
// controls.maxDistance = 10;
// controls.minDistance = 7;
// controls.dampingFactor = 0.1;
// controls.rotateSpeed = 0.1;


function instanceCamera() {
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 12;
  controls.maxDistance = 17;
  controls.maxPolarAngle = Math.PI * 2;

}


instanceCamera();



function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  rendered.setSize(window.innerWidth, window.innerHeight);

}






const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();


var width = 960,
  height = 960,
  radius = 5,
  mesh,
  graticule,
  sphere: any,
  countries: any[] = [];
// scene = new THREE.Scene,
// renderer = new THREE.WebGLRenderer({ alpha: true });

// json('https://assets.codepen.io/911796/custom.geo.json')
//     .then(data => init(data))
var loader = new THREE.FileLoader();

// loader.load('https://www.unpkg.com/three-conic-polygon-geometry@1.2.1/example/geojson/ne_110m_admin_0_countries.geojson')
//     .then(data => init(data))


// json("https://unpkg.com/world-atlas@1/world/50m.json")
//     .then(data => init(data))

// scene.add(sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 100, 100),
//     new THREE.MeshBasicMaterial({
//         //color: 0xffffff,
//         side: THREE.DoubleSide,
//         visible: true,
//         map: new THREE.TextureLoader().load('./img/day16k.jpg')
//     })
// ));
sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 100, 100),
  new THREE.MeshBasicMaterial({
    //color: 0xffffff,
    side: THREE.DoubleSide,
    visible: true,
    map: new THREE.TextureLoader().load('../../../assets/img/day16k.jpg')
  }));

sphere.rotation.y = 4.602;
sphere.rotation.x = 6.439;

var radius = 10;
var radius2 = 9.9;
var segments = 50;
var rings = 50;
var geometry = new THREE.SphereGeometry(radius, segments, rings);
var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
var globe = new THREE.Mesh(geometry, material);


loader.load('https://www.unpkg.com/three-conic-polygon-geometry@1.2.1/example/geojson/ne_110m_admin_0_countries.geojson', (data: any) => {
  data = JSON.parse(data);
  console.log('a');
  var features = data.features;
  // Crear caras para cada país
  for (var i = 0; i < features.length; i++) {
    const countryName = features[i].properties.NAME;
    if (countryName === 'Argentina') {
      console.log('ar');
    }
    console.log(countryName);
    var geometry = new THREE.Geometry() as any;
    for (let v = 0; v < features[i].geometry.coordinates.length; v++) {
      var coordinates = features[i].geometry.coordinates[v];

      // Agregar vértices
      for (var j = 0; j < coordinates.length; j++) {
        if (coordinates.length < 2) {
          for (let i2 = 0; i2 < coordinates[0].length; i2++) {
            let lon = coordinates[0][i2][0];
            let lat = coordinates[0][i2][1];
            let phi = (90 - lat) * Math.PI / 180;
            let theta = (180 - lon) * Math.PI / 180;
            let x = radius2 * Math.sin(phi) * Math.cos(theta);
            let y = radius2 * Math.cos(phi);
            let z = radius2 * Math.sin(phi) * Math.sin(theta);
            geometry.vertices.push(new THREE.Vector3(x, y, z));
          }
        } else {
          var lon = coordinates[j][0];
          var lat = coordinates[j][1];
          var phi = (90 - lat) * Math.PI / 180;
          var theta = (180 - lon) * Math.PI / 180;
          var x = radius2 * Math.sin(phi) * Math.cos(theta);
          var y = radius2 * Math.cos(phi);
          var z = radius2 * Math.sin(phi) * Math.sin(theta);
          geometry.vertices.push(new THREE.Vector3(x, y, z));
        }
      }
      // console.log(geometry.vertices);
      // Agregar caras
      for (var j = 0; j < coordinates.length; j++) {
        if (coordinates.length < 2) {
          for (let i2 = 0; i2 < coordinates[0].length - 2; i2++) {
            var face = new THREE.Face3(0, i2 + 1, i2 + 2);
            geometry.faces.push(face);
          }
        } else {
          if (j < coordinates.length - 2) {
            var face = new THREE.Face3(0, j + 1, j + 2);
            geometry.faces.push(face);
          }
        }
      }

    }
    // Crear malla para la cara del país
    var material = new THREE.MeshBasicMaterial({ color: 0xffff, side: THREE.DoubleSide });
    // if (geometry.vertices.length >1) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = 3.14;
    // mesh.rotation.z = 220;
    mesh.userData = features[i].properties;
    countries.push(mesh);



    sphere.add(mesh);

  }
});




loader.load("https://unpkg.com/world-atlas@1/world/50m.json", (topology: any) => {
  topology = JSON.parse(topology);

  console.log(topology);
  scene.add(mesh = wireframe(topojson.mesh(topology, topology.objects.countries), new THREE.MeshBasicMaterial({ color: 0xffffff })));

  mesh.rotation.x = 1450;
  mesh.rotation.z = 1500;
})


camera.position.set(0, 12.5, 25)
camera.lookAt(0, 0, 0)

// Converts a point [longitude, latitude] in degrees to a THREE.Vector3.
function vertex(point: number[]) {
  var lambda = point[0] * Math.PI / 180,
    phi = point[1] * Math.PI / 180,
    cosPhi = Math.cos(phi);
  return new THREE.Vector3(
    radius * cosPhi * Math.cos(lambda),
    radius * cosPhi * Math.sin(lambda),
    radius * Math.sin(phi)
  );
}
// Converts a GeoJSON MultiLineString in spherical coordinates to a THREE.LineSegments.
function wireframe(multilinestring: any, material: any) {
  var geometry = new THREE.Geometry;
  multilinestring.coordinates.forEach(function (line: any) {
    var localGeometry = new THREE.Geometry;

    d3.pairs(line.map(vertex), function (a: any, b: any) {
      geometry.vertices.push(a, b);
      localGeometry.vertices.push(a, b);
    });
    var materialS = new THREE.MeshBasicMaterial({ color: 0xfffff, side: THREE.DoubleSide });
    const localLineSegments = new THREE.LineSegments(localGeometry, materialS);

  });
  var materialS = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const lineSegments = new THREE.LineSegments(geometry, materialS);
  return lineSegments;
}

// // See https://github.com/d3/d3-geo/issues/95
// function graticule10() {
//   var epsilon = 1e-6,
//     x1 = 180, x0 = -x1, y1 = 80, y0 = -y1, dx = 10, dy = 10,
//     X1 = 180, X0 = -X1, Y1 = 90, Y0 = -Y1, DX = 90, DY = 360,
//     x = graticuleX(y0, y1, 2.5), y = graticuleY(x0, x1, 2.5),
//     X = graticuleX(Y0, Y1, 2.5), Y = graticuleY(X0, X1, 2.5);

//   function graticuleX(y0, y1, dy) {
//     var y = range(y0, y1 - epsilon, dy).concat(y1);
//     return function (x) { return y.map(function (y) { return [x, y]; }); };
//   }

//   function graticuleY(x0, x1, dx) {
//     var x = range(x0, x1 - epsilon, dx).concat(x1);
//     return function (y) { return x.map(function (x) { return [x, y]; }); };
//   }

//   return {
//     type: "MultiLineString",
//     coordinates: range(Math.ceil(X0 / DX) * DX, X1, DX).map(X)
//       .concat(range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y))
//       .concat(range(Math.ceil(x0 / dx) * dx, x1, dx).filter(function (x) { return Math.abs(x % DX) > epsilon; }).map(x))
//       .concat(range(Math.ceil(y0 / dy) * dy, y1 + epsilon, dy).filter(function (y) { return Math.abs(y % DY) > epsilon; }).map(y))
//   };
// }



sphere.material.element = document.createElement('div');

sphere.material.element.classList.add('sphere');

scene.add(sphere);

camera.position.set(0, 12.5, 25);
camera.lookAt(0, 0, 0);


window.addEventListener('click', checkIntersect);


function checkIntersect(event: any) {
  // Convierte la posición del mouse de la ventana a coordenadas en el rango [-1, 1]
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Actualiza el raycaster
  raycaster.setFromCamera(mouse, camera);

  // Detecta intersecciones entre el rayo y los objetos del mundo
  const intersects = raycaster.intersectObjects(countries);

  // Si hay intersecciones, el mouse está sobre un objeto
  if (intersects.length > 0) {
    // intersects[0].object.material.color.set(0xff0000);
    // countryFocus(intersects[0].object);
    console.log(intersects[0].object)

  } else {
    // Si no hay intersecciones, el mouse no está sobre ningún objeto
    // Restablece el color de los objetos a su estado original
    // countries.forEach(country => {
    //     country.material.color.set(0xff0000);
    // });
  }
}


// function countryFocus(mesh) {
//   // mesh.position.x += 0.25;
//   // mesh.position.y += 0.25;

// }

// function countryFocusOut(mesh) {
//   mesh.position.y -= 10;
//   mesh.position.z += 5;
// }

function animate() {
  requestAnimationFrame(animate);
  rendered.render(scene, camera);
  controls.update();
}
animate();