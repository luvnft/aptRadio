import React, { useState, useEffect } from "react";
import ladyMusic from "../assets/ladyMusic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faFlag } from "@fortawesome/free-solid-svg-icons";
import TipModal from "../components/TipModal";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Song } from "../utils/types";
import { useAccountContext } from "../utils/context";
import { Provider, Network } from "aptos";
import { ReportModal } from "../components/ReportModal";
import SubscribeModal from "../components/SubscribeModal";
import {ModalComponent} from "../components/ModalComponent";

interface PlayRadioProps {
  premium: boolean;
}

const PlayRadio: React.FC<PlayRadioProps> = ({premium}) => {
  const [sub, setSub] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClode = () => setIsModalOpen(false);
  const [infoModal, setInfoModal] = useState(false);
  const navigate = useNavigate();  
  const {genre} = useParams();
  const [report, setReport] = useState(false);
  const provider = new Provider(Network.TESTNET);
  const moduleAddress = process.env.REACT_APP_MODULE_ADDR_TEST as string;
  const isUserPremium = useAccountContext()?.premium || false;
  
  const genreMap = new Map<string, string>([
    ["jerseyclub", "Jersey Club"],
    ["jerseybounce", "Jersey Club (Bounce)"],
    ["jerseybass", "Jersey Club (Bass)"],
    ["jerseyhouse", "Jersey Club (House)"],
    ["jerseytwerk", "Jersey Club (Twerk)"],
    ["baltimoreclub", "Baltimore Club"],
    ["phillyclub", "Philly Club"],
    ["jerseyremix", "Jersey Club (Remix)"],
    ["jerseyvocal", "Jersey Club (Vocal)"],
    ["jerseytrap", "Jersey Club (Trap)"],
    ["jerseyexperimental", "Jersey Club (Experimental)"],
    ["trending", "Trending Now"],
    ["newarrivals", "New Arrivals"]
  ]);

  const [authorized, setAuthorized] = useState(true);
  const [currentSong, setCurrentSong] = useState<Song>({
    song_store_ID: 0,
    artist_store_ID: 0,
    artist_wallet_address: "",
    title: "Jersey Club Beat",
    ipfs_hash: "",
    ipfs_hash_cover_img: "",
    total_tips: 0,
    premium: false,
    genre: "",
    vocalist: "DJ Twerk",
    lyricist: "",
    musician: "",
    audio_engineer: "",
    reports: 0,
    reporters: [],
  });
  const [totalTips, setTotalTips] = useState(currentSong.total_tips);

  const seed = Math.floor(Date.now() / 120000);
  const [songTableHandle, setSongTableHandle] = useState("");
  const [num_songs, setNumSongs] = useState(0);
  const [songIndex, setSongIndex] = useState(-1);
  const [key_type, setKeyType] = useState("");
  const [duration, setDuration] = useState<string>('00:00');
  const [playbakTime, setPlaybackTime] = useState('00:00');
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [songEnded, setSongEnded] = useState(true);

  const audioPlayerRef = React.createRef<HTMLAudioElement>();

  useEffect(() => {
    const setSong = async () => {
      if(currentSong.artist_wallet_address === "") return;
      const url = `https://ipfs.io/ipfs/${currentSong.ipfs_hash}`
      console.log(url);
      if (audioPlayerRef.current) audioPlayerRef.current.src = url;
    };
    setSong();
  }, [currentSong]);

  useEffect(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.addEventListener('loadedmetadata', () => {
        const totalSeconds = audioPlayerRef.current?.duration || 0;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        setDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      });

      const updateSlider = () => {
        if (audioPlayerRef.current) {
          const currentTime = audioPlayerRef.current.currentTime;
          const duration = audioPlayerRef.current.duration;
          let minutes = Math.floor(currentTime / 60);
          let seconds = Math.floor(currentTime % 60);
          const progressPercentage = (currentTime / duration) * 100;
          setPlaybackProgress(progressPercentage);
          setPlaybackTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
          setSongEnded(currentTime === duration);
        }
      };
  
      audioPlayerRef.current.addEventListener('timeupdate', updateSlider);

      audioPlayerRef.current.addEventListener('canplaythrough', () => {
        audioPlayerRef.current?.play().catch((e) => console.log(e));
      });

      return () => {
        if(audioPlayerRef.current){
          audioPlayerRef.current.removeEventListener('loadedmetadata', () => {});
          audioPlayerRef.current.removeEventListener('timeupdate', updateSlider);
          audioPlayerRef.current.removeEventListener('canplaythrough', () => {})
        };
      }
    };
  }, [audioPlayerRef]);

  const fetchSongHandle = async () => {
    if(genre === undefined) return;
    let song_lib_type;
    if(premium) {
      song_lib_type = "premium_songs";
    }
    else{
      if(genre === "newarrivals") song_lib_type = "new_arrivals";
      else if(genre === "trending") song_lib_type = "trending_songs";
      else song_lib_type = "free_songs";
    }
    let songStore;
    try{
      songStore = await provider.getAccountResource(
        moduleAddress,
        `${moduleAddress}::songStore::SongStore`,
      );
    } catch(e){
      console.log(e);
      alert("Error fetching song store");
      return;
    }

    if( song_lib_type === "free_songs" || song_lib_type === "premium_songs") {
      let songLib;
      setKeyType("u64");
      if( song_lib_type === "free_songs") {
        songLib = (songStore as any).data.free_songs;
      }
      else {
        songLib = (songStore as any).data.premium_songs;
      }
      let genreHandle = songLib.songs.handle;
      let genreItem = {
        key_type: "0x1::string::String",
        value_type: `${moduleAddress}::songStore::Genre`,
        key: genreMap.get(genre),
      }
      try{
        let songTable = await provider.getTableItem(genreHandle, genreItem);
        if((songTable as any).num_songs == 0){ alert("We currently don't have any songs of this category");}
        else  setNumSongs((songTable as any).num_songs);
        setSongTableHandle((songTable as any).songs.handle);
        console.log("Genre",songTable);
      } catch(e){
        console.log(e);
        alert("We currently don't have any songs of this category");
        return;
      }
    } else {
      setKeyType("u8");
      if(song_lib_type === "new_arrivals") {
        setNumSongs((songStore as any).data.new_arrivals.num_songs);
        console.log("Num songs: ",(songStore as any).data.new_arrivals.num_songs);
        if((songStore as any).data.new_arrivals.num_songs == 0) alert("We currently don't have any songs of this category");
        setSongTableHandle((songStore as any).data.new_arrivals.songs.handle);
      } else {
        setNumSongs((songStore as any).data.trending_songs.num_songs);
        console.log("Num songs: ",(songStore as any).data.trending_songs.num_songs);
        if((songStore as any).data.trending_songs.num_songs == 0) alert("We currently don't have any songs of this category");
        setSongTableHandle((songStore as any).data.trending_songs.songs.handle);
      }
    }
  }

  const fetchSong = async () => {
    console.log("songEnded",songEnded);
    if(songTableHandle === "" || num_songs === 0 || !songEnded) return;
    let sidx;
    if(songIndex === -1){  setSongIndex(seed % num_songs); sidx = seed % num_songs; }
    else {setSongIndex((songIndex + 1) % num_songs); sidx = (songIndex + 1) % num_songs;}

    console.log(sidx);

    try{
    let songData = await provider.getTableItem(songTableHandle, {
      key_type: key_type,
      value_type: `${moduleAddress}::songStore::Song`,
      key: key_type === "u8" ? sidx : `${sidx}`
      });
      setCurrentSong((songData as any));
      if(songData.premium && !isUserPremium) setAuthorized(false);
      else setAuthorized(true);
      console.log(songData);
    } catch(e){
      console.log(e);}
  }

  useEffect(() => {
    fetchSongHandle();
  }, []);

  useEffect(() => {
    fetchSong();
  }, [songEnded, songTableHandle]);
  

  return (
    <div className="h-screen bg-[#7CA4AE]">
      {report && <ReportModal report={report} setReport={setReport} song={currentSong} />}
      {!authorized && <SubscribeModal onClose={() => setSub(false)}/>}
      <div className="bg-[#7CA4AE] font-sans grid place-items-center py-12">
        <div className="mx-2 overflow-hidden bg-gray-800 rounded-md md:grid md:grid-cols-2 ">
          {/* Cover image */}
          <div>
            <img
              src={currentSong.ipfs_hash_cover_img==="" ? ladyMusic : `https://ipfs.io/ipfs/${currentSong.ipfs_hash_cover_img}`}
              alt="Cover"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Details */}
          <div className="text-center text-gray-200 bg-black">
            <div className="px-10 py-12">
              <h2 className="mt-3 text-2xl font-bold" >{currentSong.title}</h2>
              
              <a href="" onClick={(e) => {e.preventDefault(); navigate('/profile/'+currentSong.artist_wallet_address)}} className="text-3x font-bold text-[#7CA4AE]">
                {`by ${currentSong.vocalist}`}
              </a>

              <div className=" py-4 md:py-12 flex items-center justify-around text-[#7CA4AE] px-5">
                <button className="control-button">
                  <svg className="w-9 h-9" viewBox="0 0 36 36">
                    <rect
                      className="clr-i-solid clr-i-solid-path-1"
                      x="3.95"
                      y="4"
                      width="11"
                      height="28"
                      rx="2.07"
                      ry="2.07"
                      fill="currentColor"
                    ></rect>
                    <rect
                      className="clr-i-solid clr-i-solid-path-2"
                      x="20.95"
                      y="4"
                      width="11"
                      height="28"
                      rx="2.07"
                      ry="2.07"
                      fill="currentColor"
                    ></rect>
                  </svg>
                </button>
              </div> 

              <audio ref={audioPlayerRef} 
                autoPlay 
                muted = {!authorized}
              >
                <source src="" type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>

              <div className="flex items-center gap-5 my-4 md:mb-8">
                <div className="text-sm opacity-80">{playbakTime}</div>
                <div className="relative w-full h-2 bg-gray-800 rounded">
                  <div id="progress-slider" className="absolute top-0 left-0"></div>
                  <input type="range" className="slider" 
                  value={playbackProgress} 
                  disabled
                  />
                </div>
                <div className="text-sm opacity-80">{duration}</div>
              </div>

              <div className="pt-8 md:py-12 flex items-center justify-around text-[#7CA4AE] px-5">
                <button>
                <FontAwesomeIcon
                      icon={faCircleInfo}
                      className="text-center"
                      onClick={() => setIsModalOpen(true)}
                      size="xl"
                    />
                    <ModalComponent isOpen={isModalOpen} onClose={setIsModalOpen} song={currentSong} />
                </button>
                  <TipModal currentSong={currentSong}/>
                <button>
                  <FontAwesomeIcon
                    icon={faFlag}
                    className="text-center" 
                    onClick={() => setReport(!report)}
                    size="xl"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayRadio;