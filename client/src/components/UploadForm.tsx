import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios';
import { useWallet, AptosWalletProviderProps } from "@aptos-labs/wallet-adapter-react";
import ImageUpload from "./ImageUpload";
import AudioUpload from "./AudioUpload";
import { Provider, Network } from "aptos";

const UploadForm: React.FC = () => {
    const [pinnedFiles, setPinnedFiles] = useState([]);
    const [pinnedFiles1, setPinnedFiles1] = useState([]);
    const [file, setFile] = useState<File | null>(null);
    const [song,setSong] =useState("");
    const [vocalist,setVocalist] =useState("");
    const [lyricist,setlyricist] =useState("");
    const [musician,setMusician] =useState("");
    const [audio,setAudio] =useState("");
    const [genre,setGenre] =useState("");
    const [pre,setPre] =useState(false);
    const [ipfsimage,setIpfsimage] =useState("");
    const [ipfsaudio,setIpfsaudio] =useState(""); 
    const pinataConfig = {
        root: 'https://api.pinata.cloud',
        headers: { 
          'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY,
          'pinata_secret_api_key': process.env.REACT_APP_PINATA_API_SECRET
        }
    };
    
    const testPinataConnection = async() => {
      try {
        const url =`${pinataConfig.root}/data/testAuthentication`
        const res = await axios.get(url, {headers: pinataConfig.headers});
        console.log(res.data);
      } catch (error) {
        console.log(error)
      }
    }

    const queryPinataFiles = async () => {
        try {
          const url = `${pinataConfig.root}/data/pinList?status=pinned`;
          const response = await axios.get(url, pinataConfig);
          //console.log(response.data.rows)
          setPinnedFiles(response.data.rows);
        } catch (error) {
          console.log(error)
        }
      };

      const queryPinataFiles1 = async () => {
        try {
          const url = `${pinataConfig.root}/data/pinList?status=pinned`;
          const response = await axios.get(url, pinataConfig);
          //console.log(response.data.rows)
          setPinnedFiles1(response.data.rows);
        } catch (error) {
          console.log(error)
        }
      };

    const handleclick = async () => {
        try {
          //console.log(file);
          if (file) {
            const formData = new FormData();
            // console.log(file)
            formData.append('file', file);
            const pinataBody = {
              options: {
                cidVersion: 1,
              },
              metadata: {
                name: file.name,
              }
            }
            formData.append('pinataOptions', JSON.stringify(pinataBody.options));
            formData.append('pinataMetadata', JSON.stringify(pinataBody.metadata));
            const url = `${pinataConfig.root}/pinning/pinFileToIPFS`;
            const response = await axios({
              method: 'post',
              url: url,
              data: formData,
              headers: pinataConfig.headers
            })
            console.log(response.data);
            console.log(file.type); 
            if(file.type.startsWith("image/")){
              setIpfsimage(response.data.IpfsHash);
              console.log("image uploaded");
            }
            else if(file.type.startsWith("audio/")){
              setIpfsaudio(response.data.IpfsHash);
              console.log("audio uploaded");
            }
            queryPinataFiles();
          } else {
            alert('select file first')
          }
        } catch (error) {
          console.log(error)
        }
      }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      console.log(selectedFile);
      if (selectedFile) {
          setFile(selectedFile);
      }
    };

    useEffect(() => {
      if(file !== null)
        // handleclick();
        handleclick().then(() => {
          console.log("done");
        });
    } ,[file]);

    const {wallet} = useWallet();
    const provider = new Provider(Network.TESTNET);
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        // console.log(genre);
        // console.log(ipfsaudio);
        // console.log(ipfsimage);
        console.log(pre);
        e.preventDefault();
        if (!wallet) {alert("Please connect your wallet");  return;}
        else if (song === "") {alert("Please enter the song name");  return;}
        else if(genre === "") {alert("Please select the genre");  return;}
        else if(ipfsaudio === "") {alert("Please upload the audio");  return;}
        else if(ipfsimage === "") {alert("Please upload the image");  return;}
        else if(vocalist === "") {alert("Please enter the vocalist name");  return;}
        else if(lyricist === "") {alert("Please enter the lyricist name");  return;}
        else if(musician === "") {alert("Please enter the musician name");  return;}
        else if(audio === "") {alert("Please enter the audio engineer name");  return;}
        const moduleAddress=process.env.REACT_APP_MODULE_ADDR_TEST;
        try {
          const payload = {
            type: "entry_function_payload",
            function: `${moduleAddress}::song::upload_song`,
            arguments: [song,ipfsaudio,ipfsimage,pre,genre,vocalist,lyricist,musician,audio],
            type_arguments: [],
          };
          console.log(payload);
        // sign and submit transaction to chain
        let response = await window.aptos.signAndSubmitTransaction(payload);
        // wait for transaction
        await provider.waitForTransaction(response.hash);
        alert("Song Uploaded");
        } catch (error) {
          console.error("Failed to connect wallet", error);
        }
      };

    return (
        <div>
            <div className="grid md:grid-cols-2 sm:grid-cols-1">
                <div className="py-5 md:px-10 sm:px-5 md:col-span-2">
                    <label className="block m-2 text-left">Song name:</label>
                    <input className="block w-full h-10 p-2 text-left text-black bg-gray-100 border rounded-lg focus:bg-gray-300" type="text" placeholder="Eg: Dandelions etc." onChange={(e)=>{ setSong(e.target.value) }}></input>
                </div>
                <div className="py-5 md:px-10 sm:px-5">
                    <label className="block m-2 text-left">Vocalist</label>
                    <input className="block w-full h-10 p-2 text-left text-black bg-gray-100 border rounded-lg focus:bg-gray-300" type="text" placeholder="Eg: AUR etc." onChange={(e)=>{ setVocalist(e.target.value) }}></input>
                </div>
                <div className="py-5 md:px-10 sm:px-5">
                    <label className="block m-2 text-left">Lyricist</label>
                    <input className="block w-full h-10 p-2 text-left text-black bg-gray-100 border rounded-lg focus:bg-gray-300" type="text" placeholder="Eg: AUR etc." onChange={(e)=>{ setlyricist(e.target.value) }}></input>
                </div>
                <div className="py-5 md:px-10 sm:px-5">
                    <label className="block m-2 text-left">Musician</label>
                    <input className="block w-full h-10 p-2 text-left text-black bg-gray-100 border rounded-lg focus:bg-gray-300" type="text" placeholder="Eg: AUR etc." onChange={(e)=>{ setMusician(e.target.value) }}></input>
                </div>
                <div className="py-5 md:px-10 sm:px-5">
                    <label className="block m-2 text-left">Audio_Engineer</label>
                    <input className="block w-full h-10 p-2 text-left text-black bg-gray-100 border rounded-lg focus:bg-gray-300" type="text" placeholder="Eg: AUR etc." onChange={(e)=>{ setAudio(e.target.value) }}></input>
                </div>
            </div>
            <div className="grid md:grid-cols-2 sm:grid-cols-1">
                <div className="py-5 md:px-10 sm:px-5">
                    <label className="block m-2 text-left">Genre of the Song:</label>
                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e)=>{ setGenre(e.target.value) }}>
                        <option selected>Select the Genre</option>
                        <option value="Jersey Club">Jersey Club</option>
                        <option value="Jersey Club (Bounce)">Jersey Club (Bounce)</option>
                        <option value="Jersey Club (Bass)">Jersey Club (Bass)</option>
                        <option value="Jersey Club (House)">Jersey Club (House)</option>
                        <option value="Jersey Club (Twerk)">Jersey Club (Twerk)</option>
                        <option value="Baltimore Club">Baltimore Club</option>
                        <option value="Philly Club">Philly Club</option>
                        <option value="Jersey Club (Remix)">Jersey Club (Remix)</option>
                        <option value="Jersey Club (Vocal)">Jersey Club (Vocal)</option>
                        <option value="Jersey Club (Trap)">Jersey Club (Trap)</option>
                        <option value="Jersey Club (Experimental)">Jersey Club (Experimental)</option>
                    </select>
                </div>
                <div className="py-5 md:px-10 sm:px-5">
                <label className="block m-2 text-left">Want the song to be premium</label>
                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                    onChange={(e) => { setPre(e.target.value === "1") }} >
                        <option selected disabled>Select the option</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-10 py-5 md:gap-20 md:px-10 sm:px-5">
                <ImageUpload onFileChange={handleFileChange}/>
                <AudioUpload onFileChange={handleFileChange}/>
                <button
                    className="col-span-2 px-4 py-2 m-auto font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                    onClick={handleSubmit} 
                   disabled = {ipfsaudio === "" || ipfsimage === "" }
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export {UploadForm};