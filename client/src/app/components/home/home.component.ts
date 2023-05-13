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
  public divContent: string = 'none';
  public section: string = 'none';
  public countryCodeSelected: string = 'none';
  public songs: { title: string, artist: string, urlPreview: string, songImage: string }[] = [];
  public playlists: { name: string, href: string, image: string, owner: string, tracksUrl: string }[] = [];
  public genres: { name: string, href: string, image: string }[] = [];


  loadedState: boolean = true;


  constructor() {
    this.title = 'Titulo de la pantalla home';
    this.comment = 'Subtitulo de la pantalla home';
    this.year = 2023;
  }


  ngOnInit(): void {
    this.loadInteractiveEarth(this);
    this.upperMenu();
  }



  countryInfo(data: any) {
    const countryName = document.querySelector('#countryName');
    let dataCountry = data.NAME;
    if (dataCountry === 'United States of America') dataCountry = 'USA'
    countryName!.innerHTML = dataCountry;
    let continent = data.REGION_UN;
    if (continent === 'Americas') continent = 'America';
    this.getCountryDetails(data.NAME, continent);
    // countryHour!.innerHTML = data.NAME;
  }

  getCountryDetails(countryName: string, continent: string) {
    const countryHour = document.querySelector('#countryHour');
    const countryResume = document.querySelector('#countryResume');
    const options = {
      method: 'GET',
    };
    const url = 'https://restcountries.com/v2/name/' + countryName;

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.loadFlag(data[0].flags.png);
        console.log(data[0].capital);

        if (this.countryCodeSelected.toUpperCase() !== data[0].alpha2Code) {
          this.countryCodeSelected = data[0].alpha2Code;
          const url = 'http://localhost:3000/backend/api/spotify/topsongs/'
          // this.loadSpotifyData(data[0].alpha2Code, url, 'songs');
          this.loadSpotifyOption();
        }

        let capital = data[0].capital;
        countryResume!.innerHTML = capital;
        capital = this.removeAccents(capital);
        if (capital === 'Washington, D.C.') capital = 'New_york';
        else if (capital === 'Ottawa') capital = 'Toronto';
        else if (capital === 'Brasilia') capital = 'Sao_Paulo'
        else if (capital === 'Canberra') capital = 'Melbourne'
        else if (capital === 'Beijing') capital = 'Shanghai'
        capital = capital.replaceAll("'", '').replaceAll(" ", '_');

        if (continent === 'Oceania') continent = 'Australia';
        const url2 = 'http://worldtimeapi.org/api/timezone/' + continent + "/" + capital;
        fetch(url2, options)
          .then(response => response.json())
          .then(data => {
            console.log(data.datetime);
            if (typeof data.datetime !== 'undefined') {
              const hour = data.datetime;
              countryHour!.innerHTML = hour.substring(11, 16);
            }
          });
      })
      .catch(error => console.error(error));
  }

  loadFlag(urlFlag: string) {
    let imageFlag = document.querySelector('#countryFlag');

    imageFlag!.setAttribute('src', urlFlag)
    console.log(imageFlag);
  }

  removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  //   const btnSpotify = document.querySelector('.btnSpotify');
  // btnSpotify?.addEventListener('click', () => {
  //   loadSpotifyData(hc.countryCodeSelected)
  //   createCells();
  // })


  loadSpotifyOption() {
    const selectElement: any = document.querySelector('.spotify-select');
    let value = 'songs';
    if (selectElement != null) value = selectElement.value;

    let url = ''
    if (value === 'songs')
      url = 'http://localhost:3000/backend/api/spotify/topsongs/';
    else if (value === 'playlists')
      url = 'http://localhost:3000/backend/api/spotify/topplaylists/';
    else if (value === 'genres')
      url = 'http://localhost:3000/backend/api/spotify/topgenres/';
    else
      url = 'http://localhost:3000/backend/api/spotify/topartists/';

    this.loadSpotifyData(this.countryCodeSelected, url, value);
  }

  loadSpotifyData(countryCode: string, urlLink: string, type: string) {
    urlLink += countryCode;
    //const url = 'http://localhost:3000/backend/api/spotify/topsongs/' + countryCode;
    this.songs = [];
    this.genres = [];
    this.playlists = [];

    fetch(urlLink, {
      mode: 'cors'
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if (type === 'songs') this.loadSpotifySongsPane(data);
        else if (type === 'playlists') this.loadSpotifyPlaylistsPane(data);
        else if (type === 'artists') this.loadSpotifyArtistsPane(data);
        else this.loadSpotifyGenresPane(data);


      })
      .catch(function (error) {
      });
  }




  loadSpotifySongsPane(data: any) {
    console.log(data);
    data.tracks.items.forEach((item: any) => {
      const songName = item.track.name;
      const songArtist = item.track.artists[0].name;
      const songPreview = item.track.preview_url;
      const songImage = item.track.album.images[1].url;
      const json = { title: songName, artist: songArtist, urlPreview: songPreview, songImage: songImage }
      this.songs.push(json);
    });
    this.loadedState = true;
    this.divContent = 'spotify';
    this.section = 'spotify_songs';
    console.log(this.songs);
    console.log(this.loadedState);
  }

  loadSpotifyPlaylistsPane(data: any) {
    console.log(data);
    data.playlists.items.forEach((item: any) => {
      const playlistHref = item.href;
      const playlistImage = item.images[0].url;
      const playlistName = item.name;
      const owner = item.owner.display_name;
      const tracks = item.external_urls.spotify;

      const json = { name: playlistName, href: playlistHref, image: playlistImage, owner: owner, tracksUrl: tracks }
      this.playlists.push(json);
    });
    this.loadedState = true;
    this.divContent = 'spotify';
    this.section = 'spotify_playlists';
    console.log(this.playlists);
    console.log(this.loadedState);
  }

  loadSpotifyGenresPane(data: any) {
    console.log(data);
    data.categories.items.forEach((item: any) => {
      const playlistHref = item.href;
      const playlistImage = item.icons[0].url;
      const playlistName = item.name;
      const json = { name: playlistName, href: playlistHref, image: playlistImage }
      this.genres.push(json);
    });
    this.loadedState = true;
    this.divContent = 'spotify';
    this.section = 'spotify_genres';
    console.log(this.genres);
    console.log(this.loadedState);
  }

  loadSpotifyArtistsPane(data: any) { }






  public loadInteractiveEarth(scope: any) {



    // const { json, select, selectAll, geoOrthographic, geoPath, geoGraticule, timer, range, pairs, rotation = { x: 0, y: 0 } } = d3;
    const pairs: any = 0;



    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 0);
    camera.lookAt(scene.position);
    camera.updateMatrix();
    window.addEventListener('resize', onWindowResize);

    const canvas = document.querySelector('#globe') as HTMLCanvasElement;

    const rendered = new THREE.WebGLRenderer({ canvas, antialias: true });
    rendered.setPixelRatio(window.devicePixelRatio);
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

    var loader = new THREE.FileLoader();


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
      var features = data.features;
      // Crear caras para cada país
      for (var i = 0; i < features.length; i++) {
        const countryName = features[i].properties.NAME;
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




    sphere.material.element = document.createElement('div');
    sphere.material.element.classList.add('sphere');
    scene.add(sphere);
    camera.position.set(0, 12.5, 25);
    camera.lookAt(0, 0, 0);


    window.addEventListener('click', checkIntersect);

    function checkIntersect(event: any) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(countries);


      if (intersects.length > 0) {
        // intersects[0].object.material.color.set(0xff0000);
        // countryFocus(intersects[0].object);
        console.log(intersects[0].object)
        scope.countryInfo(intersects[0].object.userData)

      }
      // else {
      //   // countries.forEach(country => {
      //   //     country.material.color.set(0xff0000);
      //   // });
      // }
    }

    var countryCode = '';

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
  }

  upperMenu() {
    const menuDiv = document.querySelector('#menu');
    menuDiv!.addEventListener('click', function (event) {
      event.stopPropagation();
    });
  }

  adjustTextToDiv() {
    const songstitles = document.querySelectorAll('.title_song');
    songstitles.forEach(function (title) {
      const titleLength = title.innerHTML.length;
      if (titleLength > 20) title.classList.add('title-movable');
    });
  }
  onLastItem() {
    console.log('Se ha terminado de iterar el bucle ngFor');
    this.adjustTextToDiv();
  }

}



// countryInfo({
//   NAME: 'Spain',
//   REGION_UN: 'Europe',
// })



