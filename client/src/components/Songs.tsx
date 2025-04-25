import React from "react";
import FreeCard from "./FreeCard";
import PremiumCard from "./PremiumCard";
import { useAccountContext } from "../utils/context";
import { Provider, Network } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useState, useEffect } from "react";

interface SongsProps {
}

const Songs: React.FC<SongsProps> = ({ }) => {
  let login = useAccountContext() !== null;
  const provider = new Provider(Network.TESTNET);
  const { account } = useWallet();
  const [free, setFree] = useState([]);
  const [pre, setPre] = useState([]);

  const fetchList = async () => {
    const moduleAddress = process.env.REACT_APP_MODULE_ADDR_TEST;
    try {
      const SongResource = await provider.getAccountResource(
        moduleAddress ?? '',
        `${moduleAddress}::songStore::SongStore`
      );
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      {/*--------------------- <!-- TOP CHARTS SECTION >-------------------------- */}
      <main className="grid place-items-center bg-gradient-to-b from-gray-950 to-[#56757d] p-5">
        <div>
          <h1 className="mb-5 text-4xl font-bold text-gray-200 sm:text-5xl md:text-6xl">
            Top Charts 
          </h1>
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <FreeCard genre="Trending Now" />
            <FreeCard genre="New Arrivals" />
            <FreeCard genre="Jersey Club" />
            <FreeCard genre="Baltimore Club" />
            <FreeCard genre="Philly Club" />
          </section>
        </div>
      </main>
      
      {!login && (
        <main className="grid place-items-center bg-[#56757d] p-5">
          <div>
            <h1 className="mb-5 text-4xl font-bold text-gray-200 sm:text-5xl md:text-6xl">
              Free Stations
            </h1>
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              <FreeCard genre="Jersey Club (Bounce)" />
              <FreeCard genre="Jersey Club (Bass)" />
              <FreeCard genre="Jersey Club (House)" />
              <FreeCard genre="Jersey Club (Twerk)" />
              <FreeCard genre="Jersey Club (Remix)" />
            </section>
          </div>
        </main>
      )}

      {login && (
        <div>
          <main className="grid place-items-center bg-gradient-to-b from-[#56757d] to-[#56757d] p-5">
            <div>
              <h1 className="mb-5 text-4xl font-bold text-gray-200 sm:text-5xl md:text-6xl">
                Free Stations
              </h1>
              <section className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                <FreeCard genre="Jersey Club (Vocal)" />
                <FreeCard genre="Jersey Club (Trap)" />
                <FreeCard genre="Jersey Club (Experimental)" />
                <FreeCard genre="Baltimore Club" />
                <FreeCard genre="Philly Club" />
              </section>
            </div>
          </main>

          {/*--------------------- <!-- PREMIUM SECTION >----------------------- */}
          <main className="grid place-items-center bg-gradient-to-t from-gray-950 to-[#56757d] p-5">
            <div>
              <h1 className="mb-5 text-4xl font-bold text-gray-200 sm:text-5xl md:text-6xl">
                Premium Stations
              </h1>
              <section className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                <PremiumCard genre="Jersey Club" />
                <PremiumCard genre="Jersey Club (Bounce)" />
                <PremiumCard genre="Jersey Club (Bass)" />
                <PremiumCard genre="Jersey Club (House)" />
                <PremiumCard genre="Jersey Club (Twerk)" />
                <PremiumCard genre="Jersey Club (Remix)" />
                <PremiumCard genre="Jersey Club (Vocal)" />
                <PremiumCard genre="Jersey Club (Trap)" />
                <PremiumCard genre="Jersey Club (Experimental)" />
                <PremiumCard genre="Baltimore Club" />
                <PremiumCard genre="Philly Club" />
              </section>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export { Songs };