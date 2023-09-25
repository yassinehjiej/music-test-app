import { BsPauseFill, BsPlayFill } from 'react-icons/bs';

function PlayButton({ isPlaying, togglePlay }:any) {
  let iconComponent;

  if (isPlaying) {
    iconComponent = <BsPauseFill color="black" size={40} data-testid="pause-icon" />;
  } else {
    iconComponent = <BsPlayFill color="black" size={40} data-testid="play-icon" />;
  }

  return (
    <div onClick={togglePlay} data-testid="play-button">
      {iconComponent}
    </div>
  );
}

export default PlayButton;
