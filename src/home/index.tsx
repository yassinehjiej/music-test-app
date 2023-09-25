import { useState, useMemo } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BiLibrary } from "react-icons/bi";
import MusicPlayer from "./musicPlayer";
import MusicLibrary from "./musicLibrary";
import "./styles.css";
import chillHop from "../data/chillHop";
import TransitionContainer from "../components/TransitionContainer";
import { ChillHopType, Song } from "../types";

export default function App() {
  const songs: ChillHopType = useMemo(() => chillHop(), []);
  const [selectedItem, setSelectedItem] = useState<Song>(songs[0]);
  const [libraryCollapsed, setLibraryCollapsed] = useState(false);

  const toggleLibrary = () => {
    setLibraryCollapsed(!libraryCollapsed);
  };

  return (
    <div className="home" data-testid="home-component">
      <button
        className={`toggle-library-button ${libraryCollapsed ? "reduced" : ""}`}
        onClick={toggleLibrary}
        data-testid="toggle-library-button"
      >
        {libraryCollapsed ? (
          <AiOutlineArrowRight size={20} color="white" />
        ) : (
          <AiOutlineArrowLeft size={20} color="black" />
        )}
      </button>
      <div
        className={`music-library ${libraryCollapsed ? "collapsed" : ""}`}
        data-testid="music-library"
      >
        {!libraryCollapsed && (
          <MusicLibrary
            songs={songs}
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
          />
        )}
        {libraryCollapsed && (
          <TransitionContainer data-testid="transition-container-component">
            <BiLibrary size={"1.5vw"} />
          </TransitionContainer>
        )}
      </div>
      <div className={`music-player ${libraryCollapsed ? "extended" : ""}`}>
        <MusicPlayer
          songs={songs}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </div>
    </div>
  );
}
