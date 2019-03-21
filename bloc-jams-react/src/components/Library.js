
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = { albums: albumData };
    }

    render() {
        return (
            <section className='Library'>
                { this.state.albums.map( (album, index) =>
                    <Link className="Library-link" to={ `/album/${album.slug}` } key={ index }>
                   <img className="Library-album-image" src={ album.albumCover } alt={ album.albumCover } />
                  <div className="Library-album-title">{ album.title }</div>
                    <div className="Library-album-artist">{ album.artist }</div>
                    <div className="Library-album-songs">{ album.songs.length } songs</div>
                     </Link>
                  )
                }
            </section>
        )
    }
}

export default Library;
