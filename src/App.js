import './App.css';
import React, { Component } from 'react';
import logo from './imagen.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

class App extends Component {
  constructor() { //Constructor de la clase
    super();
    this.state = {
      cancion: {
        number: "",
        artist: "",
        song: "",
        genre: "",
        album: ""
      },
      lista: [],
      desactivado: false,
    };
  }

  guardarCambios = (e) => { //Función para guardar los cambios
    this.setState({
      ...this.state,
      cancion: {
        ...this.state.cancion,
        [e.target.name]: e.target.value
      }
    });
  }

  eliminar = (id) => { //Función para eliminar
    const temporal = this.state.lista.filter(a => a.number !== id)
    this.setState({
      ...this.state,
      lista: temporal
    })
  }

  modificar = (id) => { //Función para modificar
    const temporal = this.state.lista.find(a => a.number === id);
    this.setState({
      ...this.state,
      cancion: {
        number: temporal.number,
        song: temporal.song,
        artist: temporal.artist,
        genre: temporal.genre,
        album: temporal.album
      },
      desactivado: true
    })
  }

  enviar = (e) => { //Función para enviar
    e.preventDefault();

    const { number, song, artist, genre, album } = this.state.cancion;

    const vacios = number.length === 0 || song.length === 0 || artist.length === 0 || album.length === 0 || genre === "Selecciona"

    if (!vacios) { //Si no hay campos vacíos
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Canción agregada',
        showConfirmButton: false,
        timer: 1500
      })

      let temporal = this.state.lista;

      if (this.state.desactivado === true) {
        temporal = temporal.filter(a => a.number !== number)
      }

      this.setState({
        ...this.state,
        lista: [...temporal, this.state.cancion],
        cancion: {
          number: "",
          song: "",
          artist: "",
          genre: "",
          album: ""
        },
        desactivado: false
      })
    }
    else { //Si hay campos vacíos
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Llena todos los campos',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }
  }

  render() {
    return ( 
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <p> 
            Uso de state
          </p> 
      </header>
        <div className="App-body">
          <Form onSubmit={this.enviar}>
            <Form.Group className="Entrada">{/* controlId="numeroCancion"\>*/}
              <Form.Label>Número de canción</Form.Label>
              <Form.Control type="number" placeholder="Ej. 0001" onChange={this.guardarCambios} value={this.state.cancion.number} name="number" disabled={this.state.desactivado} />
            </Form.Group>

            <Form.Group className="Entrada" >{/*controlId="nombreCancion"*/}
              <Form.Label>Canción</Form.Label>
              <Form.Control type="text" placeholder="Ej. Moonlight Sonata" onChange={this.guardarCambios} value={this.state.cancion.song} name="song" />
            </Form.Group>

            <Form.Group className="Entrada"> {/*controlId="artista"*/}
              <Form.Label>Artista</Form.Label>
              <Form.Control type="text" placeholder="Ej. Beethoven" onChange={this.guardarCambios} value={this.state.cancion.artist} name="artist" />
            </Form.Group>

            <Form.Group className="Entrada"> {/*controlId="genero">*/}
              <Form.Label htmlFor="disabledSelect" >Género</Form.Label>
              <Form.Select id="genero" onChange={this.guardarCambios} value={this.state.cancion.genre} name="genre" > {/* Falta agregar otros tipos de música] */}
                <option value="Selecciona">Selecciona</option>
                <option value="Música Clasica">Música clásica</option>
                <option value="Pop">Pop</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="Entrada">{/*controlId="album">*/}
              <Form.Label>Álbum</Form.Label>
              <Form.Control type="text" placeholder="Ej. Movement 1" onChange={this.guardarCambios} value={this.state.cancion.album} name="album" />
            </Form.Group>

            <Button className="Entrada" variant="primary" type="submit">Enviar</Button>
          </Form>
          <div className="Canciones">
            {
              this.state.lista.length === 0 //Si no hay canciones
                ? <p>No hay canciones</p>
                :
                <table className='Tabla'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Canción</th>
                      <th>Artista</th>
                      <th>Género</th>
                      <th>Álbum</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.lista.map((a, index) => //Mapeo de canciones
                        <tr key={index}>
                          <td>{a.number}</td>
                          <td>{a.song}</td>
                          <td>{a.artist}</td>
                          <td>{a.genre}</td>
                          <td>{a.album}</td>
                          <td><Button onClick={() => this.eliminar(a.number)} variant="danger">Eliminar</Button></td>
                          <td><Button onClick={() => this.modificar(a.number)} variant="success">Modificar</Button></td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
            }
          </div>
        </div>
      </div>
    )
  };
}

export default App;
