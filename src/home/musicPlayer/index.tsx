import React, { useState, useEffect, useRef } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { MusicBoxProps } from "../../types";
import PlayButton from "../../components/PlayButton";
import "./styles.css";

function MusicPlayer({ songs, setSelectedItem, selectedItem }: MusicBoxProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [triggered, setTriggered] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentIndexRef = useRef<number>(0);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (!audioElement) return;

    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
    };

    if (selectedItem) {
      if (triggered) {
        audioElement.src = selectedItem.audio;
      }

      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.addEventListener("timeupdate", handleTimeUpdate);

      if (isPlaying) {
        audioElement.play();
      }
    }
  }, [selectedItem, isPlaying, triggered]);

  const togglePlay = () => {
    const audioElement = audioRef.current;
    setTriggered(false);
    if (!audioElement) return;

    if (audioElement.paused || audioElement.ended) {
      audioElement.play();
    } else {
      audioElement.pause();
    }

    if (audioElement.paused || audioElement.ended) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const newTime = (parseFloat(event.target.value) / 100) * duration;
    audioElement.currentTime = newTime;
  };

  const playNextSong = () => {
    setTriggered(true);
    currentIndexRef.current = (currentIndexRef.current + 1) % songs.length;
    setSelectedItem(songs[currentIndexRef.current]);
  };

  const playPreviousSong = () => {
    setTriggered(true);
    currentIndexRef.current =
      (currentIndexRef.current - 1 + songs.length) % songs.length;
    setSelectedItem(songs[currentIndexRef.current]);
  };

  return (
    <div
      className="music-player-home"
      style={{
        backgroundImage: `linear-gradient(0deg, ${
          selectedItem?.color[0] || "#fff"
        }, ${selectedItem?.color[1] || "#fff"})`,
      }}
    >
      <div className="custom-controls">
        <audio ref={audioRef} className="custom-audio" />
        <div className="player-header">
          <div className="song-cover-player-container">
            <img
              src={selectedItem?.cover || ""}
              alt={selectedItem?.name || ""}
              className="song-cover-player"
            />
          </div>
          <div className="song-artist-player">{selectedItem?.artist || ""}</div>
        </div>
        <div className="player-word">Player</div>
        <div className="time-line">
          <div className="time-display">
            <span className="current-time">{formatTime(currentTime)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            className="music-line"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
          />
          <div className="time-display">
            <span className="duration">{formatTime(duration)}</span>
          </div>
        </div>
        <div className="control-buttons">
          <div onClick={playPreviousSong}>
            <AiOutlineArrowLeft color="black" size={30} />
          </div>
          <PlayButton isPlaying={isPlaying} togglePlay={togglePlay} />
          <div onClick={playNextSong}>
            <AiOutlineArrowRight color="black" size={30} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
