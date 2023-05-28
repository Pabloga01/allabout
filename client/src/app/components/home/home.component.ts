import { Component } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'src/assets/three/OrbitControls.js';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import { AudioPreview } from '../../classes/Audio'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})

export class HomeComponent {

  public title!: string;
  public comment!: string;
  public year!: number;
  public divContent: string = 'none';
  public section: string = 'none';
  public countryCodeSelected: string = 'none';
  public countryName: string = 'none';
  public songs: { title: string, artist: string, urlPreview: string, songImage: string }[] = [];
  public playlists: { name: string, href: string, image: string, owner: string, tracksUrl: string }[] = [];
  public genres: { name: string, href: string, image: string }[] = [];
  public artists: { name: string, genres: string[], image: string, followers: string, artistPage: string }[] = [];
  public audio = new AudioPreview();
  public cities: any[] | undefined = [];
  public citiesSelected: any[] | undefined = [];
  public newsSelected: any[] | undefined = [];

  public weatherFile!: any;
  public news: { author: string, url: string, source: string, title: string, published: string, country: string }[] = []
  public videos: { channel: string, title: string, description: string, thumbnails: string }[] = [];
  public channels: { channel: string, susbcribers: string, description: string, thumbnail: string }[] = [];

  public categories: { category: string }[] = [];
  public redditPosts: { title: string, author: string, thumbnail: string, url: string, score: string }[] = [];
  public publications: { id: string, popularity: number, title: string, description: string, date: string, category: string, country: string, usertag: string }[] = [];


  loadedState: boolean = true;
  public musicPlaying = true;

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
    this.countryName = data.NAME;
    if (dataCountry === 'United States of America') {
      dataCountry = 'USA'
      this.countryName = 'United States';
    }
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

        const urlLink = 'http://localhost:3000/backend/api/countrycode/' + countryName;
        fetch(urlLink)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            this.countryCodeSelected = data;
          });


        if (this.countryCodeSelected.toUpperCase() !== data[0].alpha2Code) {
          this.countryCodeSelected = data[0].alpha2Code;
          console.log(this.countryCodeSelected);
          if (this.divContent == 'spotify') this.loadSpotifyOption();
          else if (this.divContent == 'news') this.loadNewsByCountry();
          else if (this.divContent == 'youtube') this.loadYoutubeOption();
          else if (this.divContent == 'reddit') this.fetchRedditPosts();
          else if (this.divContent == 'weather') this.loadCitiesByCountry();
          else if (this.divContent == 'publications') this.getPublications();
        }

        let capital = data[0].capital;
        if (capital == undefined) capital = '';
        countryResume!.innerHTML = capital;
        capital = this.removeAccents(capital);
        if (capital === 'Washington, D.C.') capital = 'New_york';
        else if (capital === 'Ottawa') capital = 'Toronto';
        else if (capital === 'Brasilia') capital = 'Sao_Paulo'
        else if (capital === 'Canberra') capital = 'Melbourne'
        else if (capital === 'Beijing') capital = 'Shanghai'
        else if (capital === 'Diego Garcia') capital = 'New Delhi'



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
          }).catch(error => console.error(error));
        ;
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
    this.artists = [];
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

  loadSpotifyArtistsPane(data: any) {
    data.forEach((item: any) => {
      const name = item.name;
      const artistPage = item.external_urls.spotify;
      let followers = item.followers.total;
      if (followers.toString().length > 6) {
        const millions = followers.toString().substring(0, 2);
        const decs = Math.floor(followers.toString().substring(2, 4));
        if (decs == 0)
          followers = millions + ' M';
        else
          followers = millions + '.' + decs + ' M';
      }
      followers += ' followers';
      const genres = item.genres;
      const artistImage = item.images[0].url;

      const json = { name: name, genres: genres, image: artistImage, followers: followers, artistPage: artistPage }
      this.artists.push(json);
    });
    this.loadedState = true;
    this.divContent = 'spotify';
    this.section = 'spotify_artists';
  }






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
    controls.enablePan = false;

    function instanceCamera() {
      controls.enableDamping = true; 
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


    // Create a new texture loader
    const loader2 = new THREE.TextureLoader();
    // Load the image
    const texture = loader2.load('../../../assets/img/8k_stars.jpg');
    // Set the background of the scene to the loaded texture
    scene.background = texture;


    //>22 displays hours night earth texture
    const actualDate = new Date();
    const targetTime = new Date(actualDate);
    targetTime.setHours(22, 0, 0, 0); // Set target time to 22:00:00
    let earthTexture = '../../../assets/img/day16k.jpg';
    if (actualDate.getTime() <= targetTime.getTime()) {
      earthTexture = '../../../assets/img/day16k.jpg';
    } else {
      earthTexture = '../../../assets/img/night16k.jpg';
    }

    sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 100, 100),
      new THREE.MeshBasicMaterial({
        //color: 0xffffff,
        side: THREE.DoubleSide,
        visible: true,
        map: new THREE.TextureLoader().load(earthTexture)
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
        console.log(intersects[0].object)
        scope.countryInfo(intersects[0].object.userData)
      }
    }

    var countryCode = '';

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


  loadMainMenu() {
    this.audio.stopAudio();
    this.divContent = 'none';
    this.section = 'none';
  }

  playPreview() {
    const element: any = event?.target;
    const previewUrl = element.parentNode.id;

    const play: any = element.parentElement.firstElementChild;
    const allPlayButtons = document.querySelectorAll('.play-button');
    allPlayButtons.forEach(button => {
      button.classList.add("fa-play");
    })

    if (this.musicPlaying) {
      play.classList.add("fa-play");
      play.classList.remove('fa-pause');
      this.audio.stopAudio();
      this.musicPlaying = false;
    } else {
      play.classList.add('fa-pause');
      play.classList.remove("fa-play");
      this.audio.play(previewUrl);
      this.musicPlaying = true;
    }

  }




  loadCitiesByCountry() {
    this.cities = [];
    this.citiesSelected = [];
    fetch('http://localhost:3000/backend/api/openweathermap/cities/' + this.countryName, {
      mode: 'cors'
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        data.push('Logroño');
        this.cities = data;
        this.citiesSelected = data;

      })
      .catch(function (error) {
      });
    this.divContent = 'weather';
    this.section = 'weather_grid';
  }


  loadSpecificCity() {
    this.citiesSelected = this.cities;
    const input: any = event?.target;
    const valueInput = input.value.toLowerCase();
    if (valueInput != '') {
      this.citiesSelected = this.cities?.filter(item => item.toLowerCase().includes(valueInput));
    }
  }


  weatherForCity() {
    const div: any = event?.target;
    const cityName = div.id;

    fetch('http://localhost:3000/backend/api/openweathermap/weather/' + cityName, {
      mode: 'cors'
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        this.loadWeatherFile(data, cityName);

      })
      .catch(function (error) {
      });
  }

  loadWeatherFile(data: any, cityName: String) {
    const temperature = data.main.temp;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const pressure = data.main.pressure;
    const icon = data.weather[0].icon;
    const iconRsc = "https://openweathermap.org/img/w/" + icon + ".png";

    console.log(iconRsc);

    const json = { city: cityName, temperature: temperature, windSpeed: windSpeed, humidity: humidity, description: description, pressure: pressure, iconUrl: iconRsc }
    this.weatherFile = json;

    this.divContent = 'weather';
    this.section = 'weather_file';
  }

  loadCitiesGrid() {
    this.divContent = 'weather';
    this.section = 'weather_grid';
  }

  loadNewsByCountry() {
    console.log(this.countryCodeSelected);
    this.news = [];
    this.newsSelected = [];
    const countryCode = this.countryCodeSelected;
    fetch('http://localhost:3000/backend/api/news/topnews/' + countryCode, {
      mode: 'cors'
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);

        this.loadNews(data, countryCode);

      })
      .catch(function (error) {
      });
  }

  loadNews(data: any, country: string) {
    data.forEach((item: any) => {
      let author = item.author;
      const url = item.url;
      const source = item.source.id;
      if (author.length > 13) {
        author = author.split(',')[0];
        // source = source[0];
      }
      const title = item.title;
      const publishedDate = item.publishedAt;
      const json = { author: author, url: url, source: source, title: title, published: publishedDate, country: country }
      this.news.push(json);
    });
    this.newsSelected = this.news;
    this.divContent = 'news';
    this.section = 'news_grid';
  }

  loadSpecificNew() {
    this.newsSelected = this.news;
    const input: any = event?.target;
    const valueInput = input.value.toLowerCase();
    if (valueInput != '') {
      this.newsSelected = this.news?.filter(item => item.title.toLowerCase().includes(valueInput));
    }
  }



  loadYoutubeOption() {
    const selectElement: any = document.querySelector('.youtube-select');
    let value = 'videos';
    if (selectElement != null) value = selectElement.value;

    let url = ''
    if (value === 'videos')
      url = 'http://localhost:3000/backend/api/youtube/topvideos/';
    else if (value === 'categories')
      url = 'http://localhost:3000/backend/api/youtube/topcategories/';
    else if (value === 'channels')
      url = 'http://localhost:3000/backend/api/youtube/topchannels/';

    this.loadYoutubeData(this.countryCodeSelected, url, value);
  }

  loadYoutubeData(countryCode: string, urlLink: string, type: string) {
    urlLink += countryCode;
    this.videos = [];
    this.channels = [];
    this.categories = [];
    fetch(urlLink, {
      mode: 'cors'
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if (type === 'videos') this.loadVideoData(data);
        else if (type === 'channels') this.loadChannelsData(data);
        else if (type === 'categories') this.loadCategoriesData(data);
      })
      .catch(function (error) {
      });
  }

  // loadVideosByCountry() {
  //   this.videos = [];
  //   fetch('http://localhost:3000/backend/api/youtube/topvideos/' + this.countryCodeSelected, {
  //   })
  //     .then(response => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       this.loadVideoData(data, this.countryCodeSelected);
  //     })
  //     .catch(function (error) {
  //     });
  //   this.divContent = 'youtube';
  //   this.section = 'youtube_grid';
  // }



  loadVideoData(data: any) {
    console.log(data);
    data.items.forEach((item: any) => {
      const channel = item.snippet.channelTitle;
      const title = item.snippet.title;
      const thumbnails = item.snippet.thumbnails.standard.url;
      const description = item.snippet.description;

      const json = { channel: channel, title: title, description: description, thumbnails: thumbnails }
      this.videos.push(json);
    });

    this.divContent = 'youtube';
    this.section = 'youtube_videos';
  }


  loadChannelsData(data: any) {
    console.log(data);
    data.forEach((item: any) => {
      console.log(item);
      const channel = item.items[0].snippet.title;
      const susbcribers = item.items[0].statistics.subscriberCount;
      const thumbnail = item.items[0].snippet.thumbnails.default.url;
      const description = item.items[0].snippet.description;

      const json = { channel: channel, susbcribers: susbcribers, description: description, thumbnail: thumbnail }
      this.channels.push(json);
    });

    this.divContent = 'youtube';
    this.section = 'youtube_channels';
  }


  loadCategoriesData(data: any) {
    console.log(data);
    data.items.forEach((item: any) => {
      const category = item.snippet.title;

      const json = { category: category }
      this.categories.push(json);
    });

    this.divContent = 'youtube';
    this.section = 'youtube_categories';
  }




  fetchRedditPosts() {

    const selectElement: any = document.querySelector('.reddit-select');
    let value = 'month';
    if (selectElement != null) value = selectElement.value;

    fetch('http://localhost:3000/backend/api/reddit/posts/' + this.countryCodeSelected + "/time/" + value, {
      mode: 'cors'
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        this.loadRedditPosts(data);
      })
      .catch(function (error) {
      });

  }

  loadRedditPosts(data: any) {
    this.redditPosts = [];
    data.data.children.forEach((element: any) => {
      const title = element.data.title;
      const author = element.data.author_fullname;
      const thumbnail = element.data.thumbnail;
      const url = element.data.url;
      const score = element.data.score;

      const json = { title: title, author: author, thumbnail: thumbnail, url: url, score: score };
      this.redditPosts.push(json);
    });

    this.divContent = 'reddit';
    this.section = 'reddit_grid';
  }




  getPublications() {
    this.publications = [];

    let urlFetch = '';
    const selectElement: any = document.querySelector('.publication-select');
    let value = 'relevance';
    if (selectElement != null) value = selectElement.value;
    if (value === 'relevance') {
      urlFetch = 'http://localhost:3000/backend/api/publicationsbycountry/'
    } else {
      urlFetch = 'http://localhost:3000/backend/api/publicationsbycountrydate/'
    }



    fetch(urlFetch + this.countryName, {
      mode: 'cors'
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        data.forEach((element: any) => {
          const title = element.content;
          const country = element.country;
          const description = element.description;
          const date = element.date.substring(0, 10);
          const usertag = element.usertag;
          const category = element.cat_name;
          const id = element.id_publication;
          const popularity = element.popularity;
          const json = { id: id, title: title, popularity: popularity, description: description, date: date, category: category, country: country, usertag: usertag }
          this.publications.push(json);
        })
        this.divContent = 'publications';
        this.section = 'publications_grid';
      })
      .catch(function (error) {
      });
  }


  likePublication() {
    const element: any = event?.target;
    if (sessionStorage.getItem('loginIn') != null) {
      fetch('http://localhost:3000/backend/api/publication/like/' + element.id, {
        mode: 'cors'
      }).catch(function (error) {
      });
    } else {
      window.location.href = 'http://localhost:4200/login';
    }
  }


  goPublicationList() {
    if (sessionStorage.getItem('loginIn') != null) {
      window.location.href = 'http://localhost:4200/publicationlist';
    } else {
      window.location.href = 'http://localhost:4200/login';
    }
  }

}


// countryInfo({
//   NAME: 'Spain',
//   REGION_UN: 'Europe',
// })



