import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

 class Album extends Component {
   constructor(props) {
     super(props);

     const album = albumData.find( album => {
       return album.slug === this.props.match.params.slug
     });

     this.state = {
       album: album,
       currentSong: album.songs[0],
       currentTime: 0,
       duration: album.songs[0].duration,
       currentVolume: "50",
       isPlaying: false
     };

     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;
     this.audioElement.volume = this.state.currentVolume / 100;
   }

    formatTime(seconds) {
      const newMinutes = Math.floor(seconds / 60);
      const newSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
      return ( seconds > 0 ? `${newMinutes}:${newSeconds}` : "-:--" );
    }

    componentDidMount() {
      this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ currentVolume: this.audioElement.currentVolume});
      }
      };
      this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
      this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
    }

    componentWillUnmount() {
      this.audioElement.src = null;
      this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
      this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
    }

   play() {
     this.audioElement.play();
     this.setState({ isPlaying: true });
   }

   pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
   }

   setSong(song) {
     this.audioElement.src = song.audioSrc;
     this.setState({ currentSong: song });
   }

   handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if(this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
   }

   handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
   }

   handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(currentIndex + 1, this.state.album.songs.length - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
   }

   handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
   }

   handleVolumeChange(e) {
     const newVolume = e.target.value;
     this.audioElement.volume = newVolume / 100;
     this.setState({ currentVolume: newVolume});
   }


   render() {
     return (
       <section className="album">
        <section id="album-info">
         <img id="album-cover-art" src={ this.state.album.albumCover } alt={ this.state.album.albumCover } />
          <div className="album-details">
            <h3 id="album-title">{ this.state.album.title }</h3>
            <h4 id="album-artist">{ this.state.album.artist }</h4>
            <div id="release-info">{ this.state.album.releaseInfo }</div>
          </div>
        </section>
        <section id="song-info">
          <section className="player-container">
            <table id="song-list" cellSpacing="0" cellPadding="0">
              <colgroup>
                <col id="song-number-column" />
                <col id="song-title-column" />
                <col id="song-duration-column" />
              </colgroup>
              <tbody>
                { this.state.album.songs.map( (song, index) =>
                    <tr className="song" key={ index } onClick={() => this.handleSongClick(song)} >
                      <td className="song-actions">
                        <button id="list-button">
                          <span><i className="material-icons md-light">play_circle_filled</i></span>
                          <span><i className="material-icons md-light">pause_circle_filled</i></span>
                        </button>
                      </td>
                      <td id="song-number">{ index + 1 }.</td>
                      <td id="song-title">{ song.title }</td>
                      <td id="song-duration">{ this.formatTime(song.duration) }</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
            <PlayerBar
              isPlaying={this.state.iWsPlaying}
              currentSong={this.state.currentSong}
              currentTime={this.audioElement.currentTime}
              duration={this.audioElement.duration}
              currentVolume={this.audioElement.currentVolume}
              handleSongClick={() => this.handleSongClick(this.state.currentSong)}
              handlePrevClick={() => this.handlePrevClick()}
              handleNextClick={() => this.handleNextClick()}
              handleTimeChange={(e) => this.handleTimeChange(e)}
              handleVolumeChange={(e) => this.handleVolumeChange(e)}
              formatTime={(s) => this.formatTime(s)}
            />
          </section>
        </section>
       </section>
     );
   }
 }

 export default Album;
