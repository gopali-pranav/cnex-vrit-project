import React from "react";
import { LuShield } from "react-icons/lu";
import { VscBook } from "react-icons/vsc";
import { IoMdSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdOutlinePayment } from "react-icons/md";

const FeatureSection = () => {
  return (
    <div>
      <div className="bg-primary flex justify-center ">
        <div className="featureContainer flex flex-col items-center gap-20">
          <div className="feature-info-text w-3/6 h-36 text-center">
            <div className="flex items-center justify-center text-secondary leading-10 p-3">
              {" "}
              <p className="border-t-2 border-secondary border-solid w-6 mx-2"></p>
              FEATURE HIGHLIGHTS
            </div>
            <div className="text-white space-y-4">
              <h3 className="text-4xl">
                <span className="text-secondary underline">Experience</span> the
                Difference{" "}
              </h3>
              <h3 className="text-featurecolor text-xs">
                Discover a World of Female-Centric Products and Services
              </h3>
            </div>
          </div>
          <div className="feature-info2 w-full h-4/6 grid grid-cols-3 gap-5">
            <div className="rounded-lg w-6/6 h-60 flex flex-col items-center bg-reasonbackground">
              <LuShield className="text-5xl text-secondary mb-8 mt-8" />
              <div className="infoText w-full h-36 text-white text-center space-y-2">
                <h2 className="text-lg">Booking Appointments</h2>
                <p className="text-sm text-lorem">
                  Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.Pariatur ducimus itaque modi dolores consectetur
                  suscipit.
                </p>
              </div>
            </div>
            <div className="rounded-lg w-6/6 h-60 flex flex-col items-center bg-reasonbackground">
              <VscBook className="text-5xl text-secondary mb-8 mt-8" />
              <div className="infoText w-full h-36 text-white text-center space-y-2">
                <h2 className="text-lg">Ordering and Pre-ordering</h2>
                <p className="text-sm text-lorem">
                  Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.Pariatur ducimus itaque modi dolores consectetur
                  suscipit.
                </p>
              </div>
            </div>
            <div className="rounded-lg w-6/6 h-60 flex flex-col items-center bg-reasonbackground">
              <IoMdSearch className="text-5xl text-secondary mb-8 mt-8" />
              <div className="infoText w-full h-36 text-white text-center space-y-2">
                <h2 className="text-lg">Searching for Product</h2>
                <p className="text-sm text-lorem">
                  Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.Pariatur ducimus itaque modi dolores consectetur
                  suscipit.
                </p>
              </div>
            </div>
            <div className="rounded-lg w-6/6 h-60 flex flex-col items-center bg-reasonbackground">
              <CiFilter className="text-5xl text-secondary mb-8 mt-8" />
              <div className="infoText w-full h-36 text-white text-center space-y-2">
                <h2 className="text-lg">Filtering products</h2>
                <p className="text-sm text-lorem">
                  Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.Pariatur ducimus itaque modi dolores consectetur
                  suscipit.
                </p>
              </div>
            </div>
            <div className="rounded-lg w-6/6 h-60 flex flex-col items-center bg-reasonbackground">
              <CiDeliveryTruck className="text-5xl text-secondary mb-8 mt-8" />
              <div className="infoText w-full h-36 text-white text-center space-y-2">
                <h2 className="text-lg">Delivery Service</h2>
                <p className="text-sm text-lorem">
                  Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.Pariatur ducimus itaque modi dolores consectetur
                  suscipit.
                </p>
              </div>
            </div>
            <div className="rounded-lg w-6/6 h-60 flex flex-col items-center bg-reasonbackground">
              <MdOutlinePayment className="text-5xl text-secondary mb-8 mt-8" />
              <div className="infoText w-full h-36 text-white text-center space-y-2">
                <h2 className="text-lg">Payments</h2>
                <p className="text-sm text-lorem">
                  Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.Pariatur ducimus itaque modi dolores consectetur
                  suscipit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
