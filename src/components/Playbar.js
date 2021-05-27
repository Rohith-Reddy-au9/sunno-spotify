import React, { useContext, useCallback } from 'react'
import './Playbar.css'
import { StoreContext } from './index'

const formatTime = inputSeconds => {
  let seconds = Math.floor(inputSeconds % 60)
  if (seconds < 10) seconds = `0${seconds}`
  const minutes = Math.floor(inputSeconds / 60)
  return `${minutes}:${seconds}`
}

const handleProgress = (currentTime, duration) => 600 * (currentTime / duration)

const Playbar = () => {
  const { state, dispatch } = useContext(StoreContext)
  const song = state.media[state.currentSongId]

  if (!song) {
    return <div className="Playbar"/>
  }

  const playOrPause = () =>
    state.playing ? dispatch({ type: 'PAUSE' }) : dispatch({ type: 'PLAY' })

  const setVolume = useCallback(e =>
    dispatch({ type: 'SET_VOLUME', volume: e.target.value })
  )

  return (
    <div className="Playbar">
      <div className="left">
        {song && (
          <>
            <div>{song.title}</div>

            <div className="artist">{song.artist}</div>
          </>
        )}
      </div>

      <div className="middle">
        <div className="play-pause-circle" onClick={playOrPause}>
          <i
            className={`fa fa-${state.playing ? 'pause' : 'play'}`}
            style={{ transform: state.playing ? '' : 'translateX(1.5px)' }}
          />
        </div>

        <div style={{ marginTop: 2.5 }}>
          <span>{formatTime(Math.floor(state.currentTime))}</span>

          <div className="progress-container">
            <div
              className="bar"
              style={{
                width: handleProgress(state.currentTime, state.duration)
              }}
            />
          </div>

          <span>{formatTime(state.duration)}</span>
        </div>
      </div>

      <div className="right">
        <i className="fa fa-volume-up" />

        <input
          type="range"
          min="0"
          max="1"
          value={state.volume}
          step="0.01"
          style={{ marginLeft: 10 }}
          onChange={setVolume}
        />
      </div>
    </div>
  )
}


export default Playbar
