const AboutSection = () => {
  return (
    <div className="flex justify-center ">
      <div className="container flex flex-col items-center justify-start">
        <div className=" aboutsection w-[912px] h-[112px] space-y-6">
          <div className="text1 flex items-center justify-center text-secondary">
            {" "}
            <p className="border-t-2 border-secondary border-solid w-6 mx-2"></p>
            ABOUT US
          </div>
          <div className="text2">
            <p className="text-center text-4xl">
              <span className="text-secondary underline">
                Pioneering Female
              </span>
              -Centric Solutions <br />
              for the Modern Woman
            </p>
          </div>
        </div>

        <div className="aboutimages flex gap-6 mt-20">
          <div className="img1 w-[288px] h-[600px] space-y-5">
            <img
              src="/aboutimg/aboutimg(8).jpeg"
              alt=""
              className="h-[252px] w-full rounded-lg"
            />

            <img
              src="/aboutimg/aboutimg(4).jpeg"
              alt=""
              className="h-[326px] w-full rounded-lg"
            />
          </div>
          <div className="img2 w-[600px] h-[600px] space-y-5">
            <div className="flex gap-6">
              <img
                src="/aboutimg/aboutimg(7).jpeg"
                alt=""
                className="h-[250px] w-[286px] rounded-lg"
              />
              <img
                src="/aboutimg/aboutimg(6).jpeg"
                alt=""
                className="h-[250px] w-[286px] rounded-lg"
              />
            </div>
            <img
              src="/aboutimg/aboutimg(3).jpeg"
              alt=""
              className="h-[326px] w-full rounded-lg"
            />
          </div>

          <div className="img3 w-[288px] h-[600px] space-y-5">
            <img
              src="/aboutimg/aboutimg(5).jpeg"
              alt=""
              className="h-[186px] w-full rounded-lg"
            />
            <img
              src="/aboutimg/aboutimg(2).jpeg"
              alt=""
              className="h-[186px] w-full rounded-lg"
            />
            <img
              src="/aboutimg/aboutimg(1).jpeg"
              alt=""
              className="h-[186px] w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
