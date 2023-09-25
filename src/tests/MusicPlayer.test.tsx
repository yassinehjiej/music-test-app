import { render } from "@testing-library/react";
import MusicPlayer from "../home/musicPlayer";
import { ChillHopType } from "../types";
import { BsPlayFill } from "react-icons/bs";

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

it("renders without errors", () => {
  render(
    <MusicPlayer songs={songs} selectedItem={null} setSelectedItem={() => {}} />
  );
});

it("initially displays the play button", () => {
  const { getByTestId } = render(
    <MusicPlayer songs={songs} selectedItem={null} setSelectedItem={() => {}} />
  );
  const playButton = getByTestId("play-button");
  const playIconString = render(
    <BsPlayFill color="black" size={40} data-testid="play-icon" />
  ).container.innerHTML;
  expect(playButton).toBeInTheDocument();
  expect(playButton.innerHTML).toContain(playIconString);
});

it("displays the current song information", () => {
  const selectedItem = songs[0];
  const { getByText, getByAltText } = render(
    <MusicPlayer
      songs={songs}
      selectedItem={selectedItem}
      setSelectedItem={() => {}}
    />
  );

  const artistName = getByText(selectedItem.artist);
  const albumCover = getByAltText(selectedItem.name);

  expect(artistName).toBeInTheDocument();
  expect(albumCover).toBeInTheDocument();
});
