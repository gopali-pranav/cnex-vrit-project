import { HiLightningBolt } from "react-icons/hi";
import { MdAttachMoney } from "react-icons/md";
import { GiRoundStar } from "react-icons/gi";
import { FaArrowUpRightDots } from "react-icons/fa6";

const ReasonSection = () => {
  return (
    <div className="bg-primary flex justify-center p-24">
      <div className="reasonContainer space-y-10">
        <h3 className="text-4xl leading-tight text-center">
          Why <span className="text-secondary underline">Cnex ?</span>{" "}
        </h3>
        <div className="info w-full h-[285px] flex justify-between">
          <div className="info1 w-60 h-60 rounded-lg flex flex-col items-center p-3 bg-reasonbackground">
            <HiLightningBolt className="text-5xl text-secondary mb-3" />
            <div className="infoText w-full h-36 text-white text-center space-y-2">
              <h2 className="text-lg">Fast</h2>
              <p className="text-sm text-lorem">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.Pariatur
                ducimus itaque modi dolores consectetur suscipit.
              </p>
            </div>
          </div>
          <div className="info1 w-60 h-60 rounded-lg flex flex-col items-center p-3 bg-reasonbackground">
            <FaArrowUpRightDots className="text-5xl text-secondary mb-3" />
            <div className="infoText w-full h-36 text-white text-center space-y-2">
              <h2 className="text-lg">Easy</h2>
              <p className="text-sm text-lorem">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.Pariatur
                ducimus itaque modi dolores consectetur suscipit.
              </p>
            </div>
          </div>
          <div className="info1 w-60 h-60 rounded-lg flex flex-col items-center p-3 bg-reasonbackground">
            <MdAttachMoney className="text-5xl text-secondary mb-3" />
            <div className="infoText w-full h-36 text-white text-center space-y-2">
              <h2 className="text-lg">Affordable</h2>
              <p className="text-sm text-lorem">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.Pariatur
                ducimus itaque modi dolores consectetur suscipit.
              </p>
            </div>
          </div>
          <div className="info1 w-60 h-60 rounded-lg flex flex-col items-center p-3 bg-reasonbackground">
            <GiRoundStar className="text-5xl text-secondary mb-3" />
            <div className="infoText w-full h-36 text-white text-center space-y-2">
              <h2 className="text-lg">Legal Support</h2>
              <p className="text-sm text-lorem">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.Pariatur
                ducimus itaque modi dolores consectetur suscipit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasonSection;
