import React, { Component } from 'react';

class PlayerBar extends Component {
    render() {
        return (
            <section className="player-bar">
                <section id="currently-playing">
                    <p>Currently playing: {this.props.currentSong.title}</p>
                </section>
                <section id="buttons">
                    <button id="previous" onClick={this.props.handlePrevClick}>
                        <span><i className="material-icons md-light">skip_previous</i></span>
                    </button>
                    <button id="play-pause" onClick={this.props.handleSongClick}>
                        <span>{this.props.isPlaying ? <i className="material-icons md-36 md-light">pause_circle_filled</i> : <i className="material-icons md-36 md-light">play_circle_filled</i>}</span>
                    </button>
                    <button id="next" onClick={this.props.handleNextClick}>
                        <span><i className="material-icons md-light">skip_next</i></span>
                    </button>
                    <section id="time-control">
                        <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
                            <input
                                type="range"
                                className="seek-bar"
                                value={(this.props.currentTime / this.props.duration) || 0}
                                max="1"
                                min="0"
                                step="0.01"
                                onChange={this.props.handleTimeChange}
                            />
                        <div className="total-time">{this.props.formatTime(this.props.duration)}</div>
                    </section>
                    <section id="volume-control">
                        <div>
                            <span><i className="material-icons md-light">volume_down</i></span>
                                <input
                                    type="range"
                                    className="volume-bar"
                                    value={this.props.currentVolume}
                                    max="100"
                                    min="0"
                                    step="1"
                                    onChange={this.props.handleVolumeChange}
                                />
                            <span><i className="material-icons md-light">volume_up</i></span>
                        </div>
                    </section>
                </section>
            </section>
        )
    }
}

export default PlayerBar;
