import { IoIosClose } from "react-icons/io";
import { HiOutlinePlusSm } from "react-icons/hi";

const FaqSection = () => {
  return (
    <div className="flex justify-center pt-5">
      <div className="faqContainer  flex items-center flex-col">
        <div className=" w-[491px] h-[130px] text-center leading-10">
          <div className="text1 flex items-center justify-center text-secondary">
            {" "}
            <p className="border-t-2 border-secondary border-solid w-6 mx-2"></p>
            FAQ
          </div>
          <div className="text2">
            <p className="text-center text-4xl leading-tight mb-2">
              <span className="text-secondary underline">Frequently</span> Asked
              Questions
            </p>
            <p className="leading-tight text-featurecolor text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.{" "}
            </p>
          </div>
        </div>
        <div className="faqimg  w-full h-4/6 mt-14 flex gap-10">
          <div className=" w-4/6 h-96 space-y-4">
            <div className="faq1  w-full h-32 rounded-lg bg-faqbackground">
              <div className="flex justify-between p-3">
                Gorem ipsum dolor sit amet, consectetur adipiscing elit.
                <IoIosClose className="text-3xl" />
              </div>
              <div className="text-xs p-3">
                Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </div>
            </div>

            <div className="faq1  w-full h-14 rounded-lg bg-faqbackground">
              <div className="flex justify-between p-3">
                Gorem ipsum dolor sit amet, consectetur adipiscing elit.
                <HiOutlinePlusSm className="text-xl" />
              </div>
            </div>

            <div className="faq1  w-full h-14 rounded-lg bg-faqbackground">
              <div className="flex justify-between p-3">
                Gorem ipsum dolor sit amet, consectetur adipiscing elit.
                <HiOutlinePlusSm className="text-xl" />
              </div>
            </div>

            <div className="faq1  w-full h-14 rounded-lg bg-faqbackground">
              <div className="flex justify-between p-3">
                Gorem ipsum dolor sit amet, consectetur adipiscing elit.
                <HiOutlinePlusSm className="text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-faq-image bg-cover h-[344px] w-[456px] rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
