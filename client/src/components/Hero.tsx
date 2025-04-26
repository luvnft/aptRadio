import ladyMusic from "../assets/ladyMusic.png";
import { useState, useEffect } from "react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useAccountContext } from "../utils/context";
import { Account } from "../utils/types";
import getUserAccount from "../utils/getUserAccount";

interface HeroProps {
  onLoginSuccess: (account:Account) => void,
}

const Hero: React.FC<HeroProps> = ({onLoginSuccess}) => {

  const [isModalOpen, setModalOpen] = useState(false);
  const { account } = useWallet();
  const login = useAccountContext() !== null;
  const navigate = useNavigate();

  const handleConnectWallet = async () => {
    try {
      setModalOpen(true);
    } catch (error) {
      console.error("Failed to connect wallet", error);
    }
  };

  useEffect(() => {
    // console.log(wallet);
    getUserAccount(account ? account.address : "").then((userAccount) => {
      if (userAccount === 0) {
        navigate('/signup');
      }
    });
  }, [account?.address]);

  return (
    <div>
      <section className="text-gray-200 body-font bg-gray-950">
        <div className="container flex flex-col-reverse items-center px-5 mx-auto md:py-24 md:flex-row">
          <div className="flex flex-col items-center mb-16 text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0">
            <h1 className="mb-4 text-3xl font-bold text-transparent title-font sm:text-4xl bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 bg-clip-text">
              Jersey Club Music Radio&nbsp;
              <br className="hidden lg:inline-block" />
            </h1>
            <p className="hidden mb-8 leading-relaxed lg:block">
              We took the music industry back to the block(-chain) where it
              all started when it was powered by the fans. Connect your wallet
              for instant artist monetization, experience real-time revenue
              sharing, and explore a world where the beats are powered by blockchain
              innovation.
            </p>
            <div className="flex justify-center">
              {
                !login &&
                <button
                  type="button"
                  className="px-6 py-2 mx-1 text-xl text-center text-white bg-indigo-500 rounded-md"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  onClick={handleConnectWallet}
                >
                  Connect Wallet
                </button>
              }
              <div className="hidden">
                <WalletSelector isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
              </div>
              <HashLink smooth to="#exploresongs" className="inline-flex px-6 py-2 ml-4 text-lg text-gray-900 bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200">
                Explore
              </HashLink>
              <Link to="/learn-more" className="inline-flex items-center ml-4 text-lg text-gray-100 focus:outline-none">
                Learn More &#8594;
              </Link>
            </div>
          </div>
          <div className="w-5/6 lg:max-w-lg lg:w-full md:w-1/2">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={ladyMusic}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export { Hero };
