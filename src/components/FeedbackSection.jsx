import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";

const FeedbackSection = () => {
  return (
    <div className="flex justify-center pt-24">
      <div className="featureContainer2 ">
        <div className="text-sm flex items-center text-secondary">
          <p className="border-t-2 border-secondary border-solid w-6"></p>{" "}
          TESTIMONIAL
        </div>
        <div className="mt-2 flex justify-between">
          <div>
            <p className="text-4xl leading-tight">
              What our{" "}
              <span className="underline text-secondary ">Customers say</span>
            </p>
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-10 rounded-full flex items-center justify-center shadow-lg">
              <IoIosArrowRoundBack className="text-3xl" />
            </div>
            <div className="h-10 w-10 rounded-full flex items-center justify-center shadow-lg">
              <IoIosArrowRoundForward className="text-3xl" />
            </div>
          </div>
        </div>
        <hr className="mt-8 mb-8 opacity-20" />
        <div className="fedbackimages  w-full h-4/6 flex items-center space-x-36 gap-2 ">
          <div className="fedimg1  w-2/5 h-5/6 relative bg-fed-img1 bg-cover">
            <div className="insideimg1  w-4/6 h-4/6 absolute top-12 left-64 flex items-center justify-center bg-white shadow-xl">
              <div className="text1  w-80 h-40 flex gap-4 p-4">
                <img
                  src="/fedimg/userfedimg.png"
                  alt=""
                  className="w-14 h-14 bg-secondary rounded-full pt-1"
                />
                <div className="w-4/5">
                  <h2>“They did an amazing work for our home”</h2>
                  <p className="text-xs text-feedbackcolor">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum efficitur justo vitae sapien
                  </p>
                  <div className="text-sm flex items-center text-secondary mt-3">
                    <p className="border-t-2 border-secondary border-solid w-6"></p>{" "}
                    JOHN CARTER, NEW YORK
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fedimg1  w-2/5 h-5/6 relative bg-fed-img2 bg-cover">
            <div className="insideimg1  w-4/6 h-4/6 absolute top-12 left-64 bg-white shadow-xl flex items-center justify-center">
              <div className="text1  w-80 h-40 flex gap-4 p-4 ">
                <img
                  src="/fedimg/userfedimg.png"
                  alt=""
                  className="w-14 h-14 bg-secondary rounded-full pt-1"
                />
                <div className="w-4/5">
                  <h2>“They did an amazing work for our home”</h2>
                  <p className="text-xs text-feedbackcolor">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum efficitur justo vitae sapien
                  </p>
                  <div className="text-sm flex items-center text-secondary mt-3">
                    <p className="border-t-2 border-secondary border-solid w-6"></p>{" "}
                    JOHN CARTER, NEW YORK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;
