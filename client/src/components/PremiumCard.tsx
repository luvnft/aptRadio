import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import {
  faHeart,
  faWallet,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as outlineHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useAccountContext } from "../utils/context";
import JerseyClub from '../assets/JerseyClub.jpeg';
import JerseyBounce from '../assets/JerseyBounce.png';
import JerseyBass from '../assets/JerseyBass.jpeg';
import JerseyHouse from '../assets/JerseyHouse.jpeg';
import JerseyTwerk from '../assets/JerseyTwerk.png';
import BaltimoreClub from '../assets/BaltimoreClub.png';
import PhillyClub from '../assets/PhillyClub.png';
import JerseyRemix from '../assets/JerseyRemix.png';
import JerseyVocal from '../assets/JerseyVocal.png';
import JerseyTrap from '../assets/JerseyTrap.png';
import JerseyExperimental from '../assets/JerseyExperimental.jpeg';

interface PremiumCardProps {
  genre: string
}

const categoryMap = new Map([
  ['Jersey Club', 'jerseyclub'],
  ['Jersey Club (Bounce)', 'jerseybounce'],
  ['Jersey Club (Bass)', 'jerseybass'],
  ['Jersey Club (House)', 'jerseyhouse'],
  ['Jersey Club (Twerk)', 'jerseytwerk'],
  ['Baltimore Club', 'baltimoreclub'],
  ['Philly Club', 'phillyclub'],
  ['Jersey Club (Remix)', 'jerseyremix'],
  ['Jersey Club (Vocal)', 'jerseyvocal'],
  ['Jersey Club (Trap)', 'jerseytrap'],
  ['Jersey Club (Experimental)', 'jerseyexperimental']
])

const PremiumCard: React.FC<PremiumCardProps> = ({ genre }) => {
  const [like, setLike] = useState(false);
  const [pause, setPause] = useState(false);
  const navigate = useNavigate();
  let login = useAccountContext() !== null;
  let subscribe = useAccountContext()?.premium;

  const handlePlay = () => {
    !login ? navigate("/signup") : !subscribe ? navigate("/subscribe") : navigate("/premiumsongs/" + categoryMap.get(genre));
  }

  const getGenreImage = () => {
    switch(genre) {
      case 'Jersey Club': return JerseyClub;
      case 'Jersey Club (Bounce)': return JerseyBounce;
      case 'Jersey Club (Bass)': return JerseyBass;
      case 'Jersey Club (House)': return JerseyHouse;
      case 'Jersey Club (Twerk)': return JerseyTwerk;
      case 'Baltimore Club': return BaltimoreClub;
      case 'Philly Club': return PhillyClub;
      case 'Jersey Club (Remix)': return JerseyRemix;
      case 'Jersey Club (Vocal)': return JerseyVocal;
      case 'Jersey Club (Trap)': return JerseyTrap;
      case 'Jersey Club (Experimental)': return JerseyExperimental;
      default: return JerseyClub;
    }
  }

  const [image, setImage] = useState(getGenreImage());

  return (
    <>
      {/* <!-- CARD 1 --> */}
      <div className="bg-[#ebc247] shadow-lg rounded p-3">
        <div className="relative group">
          <img
            className="block w-full h-64 rounded md:w-72"
            src={image}
            alt={genre}
          />
          <div className="absolute top-0 flex items-center w-full h-full transition bg-black bg-opacity-0 rounded group-hover:bg-opacity-60 group-hover:opacity-100 justify-evenly">
            <button onClick={handlePlay} className="text-white transition transform translate-y-3 opacity-0 hover:scale-110 group-hover:translate-y-0 group-hover:opacity-100">
              {pause ? (
                <FontAwesomeIcon
                  icon={faPause}
                  size="2xl"
                  onClick={() => setPause(!pause)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPlay}
                  size="2xl"
                  onClick={() => setPause(!pause)}
                />
              )}
            </button>
          </div>
        </div>
        <div className="p-5">
          <div className="flex justify-between grid-cols-2 md:grid-cols-1 lg-grid-cols-2">
            <h3 className="text-lg text-black">{genre}</h3>
            <Chip
              label="Premium"
              color="primary"
              className="cursor-pointer hover:bg-blue-500"
            />
          </div>
        </div>
      </div>
      {/* <!-- END OF CARD 1 --> */}
    </>
  );
};

export default PremiumCard;