import { render, screen, fireEvent } from "@testing-library/react";
import MusicLibrary from "../home/musicLibrary";
import { ChillHopType } from "../types";

const songs: ChillHopType = [
  {
    name: "Beaver Creek",
    cover:
      "https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg",
    artist: "Aso, Middle School, Aviino",
    audio: "https://mp3.chillhop.com/serve.php/?mp3=10075",
    color: ["#205950", "#2ab3bf"],
    id: 1122,
    active: true,
  },
  {
    name: "Daylight",
    cover:
      "https://chillhop.com/wp-content/uploads/2020/07/ef95e219a44869318b7806e9f0f794a1f9c451e4-1024x1024.jpg",
    artist: "Aiguille",
    audio: "https://mp3.chillhop.com/serve.php/?mp3=9272",
    color: ["#EF8EA9", "#ab417f"],
    id: 1133,
    active: false,
  },
];

describe("MusicLibrary component", () => {
  it("renders a list of songs", () => {
    render(
      <MusicLibrary
        songs={songs}
        setSelectedItem={() => {}}
        selectedItem={null}
      />
    );

    const songItems = screen.getAllByTestId(/^song-item-/);
    expect(songItems).toHaveLength(songs.length);
  });

  it("calls setSelectedItem when a song is clicked", () => {
    const setSelectedItem = jest.fn();
    render(
      <MusicLibrary
        songs={songs}
        setSelectedItem={setSelectedItem}
        selectedItem={null}
      />
    );

    const songItem = screen.getByTestId("song-item-1");
    fireEvent.click(songItem);

    expect(setSelectedItem).toHaveBeenCalledWith(songs[0]);
  });

  it('adds "selected" class to the selected song', () => {
    const selectedItem = songs[1];
    render(
      <MusicLibrary
        songs={songs}
        setSelectedItem={() => {}}
        selectedItem={selectedItem}
      />
    );

    const selectedSongItem = screen.getByTestId("song-item-2");
    expect(selectedSongItem).toHaveClass("selected");
  });
});
