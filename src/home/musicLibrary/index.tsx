import TransitionContainer from "../../components/TransitionContainer";
import { MusicBoxProps, Song } from "../../types";
import "./styles.css";

export default function MusicLibrary({
  songs,
  setSelectedItem,
  selectedItem,
}: MusicBoxProps) {
  return (
    <TransitionContainer>
      <div className="musicLibraryHome">
        <div className="library-header">Library</div>
        <div className="song-list" >
          {songs.map((song: Song, index:number) => (
            <div
              key={song?.id}
              data-testid={`song-item-${index + 1}`}
              className={`song-item ${selectedItem === song ? "selected" : ""}`}
              onClick={() => {
                setSelectedItem(song);
              }}
            >
              <img src={song.cover} alt={song?.name} className="song-cover" />
              <div className="song-details">
                <div className="song-title">{song?.name}</div>
                <div className="song-artist">{song?.artist}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TransitionContainer>
  );
}
