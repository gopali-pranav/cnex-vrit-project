const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="herocontent bg-hero-image bg-cover bg-center h-[700px] md:h-[850px] flex items-center justify-start text-center text-white">
        <div
          className="hidden md:block absolute w-[1300px] h-[1400px] -rotate-35 
        -translate-x-10 -translate-y-4 pointer-events-none left-[1100px] -top-[235px] opacity-40  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 50"
            preserveAspectRatio="none"
            className="w-[1390px] h-[1100px] fill-primary  "
          >
            <path d="M0 50 Q 50 0, 100 50 L 100 100 L 0 100 Z" />
          </svg>
        </div>
        <div className="heromobile hidden sm:hidden md:block h-auto w-auto">
          <img
            src="/cnexMobile.png"
            alt=""
            className="absolute right-0 bottom-36"
          />
        </div>
        <div className="herotext max-w-[718px] p-4 md:px-8 lg:px-16 ">
          <div className="text1 mb-4 mt-10 text-start">
            <p className="text-4xl md:text-5xl leading-tight ">
              <span className="text-secondary underline">Experience</span> the
              Future of <br />
              Female Commerce <br /> with{" "}
              <span className="text-secondary underline">Cnex</span>
            </p>
          </div>
          <div className="text2 mb-6 text-start md:w-[820px]">
            <p className="text-sm md:text-lg text-herotext2">
              Order, Preorder, and Book - Your Ultimate Destination for Female
              Products and Services
            </p>
          </div>
          <div className="app flex flex-col md:flex-row justify-start gap-4">
            <div className="appstore w-[150px] md:w-[180px]">
              <img src="/AppStore.png" alt="App Store" />
            </div>
            <div className="playstore w-[150px] md:w-[180px]">
              <img src="/GooglePlay.png" alt="Google Play" />
            </div>
          </div>
        </div>
      </div>
      <div className="herocontent2  hidden md:flex justify-center">
        <div className="facts md:rounded-lg w-[1224px] h-[136px] bg-primary relative -top-[70px] text-white flex justify-between items-center p-8 text-center">
          <div className="content2text2 w-[143px] h-76">
            <h2 className=" font-bold">
              200 <span>+</span>
            </h2>
            <p>Clients Worldwide</p>
          </div>
          <div className="content2text2 w-[143px] h-76">
            <h2 className=" font-bold">
              100 <span>+</span>
            </h2>
            <p>Client Satisfaction</p>
          </div>
          <div className="content2text2 w-[143px] h-76">
            <h2 className=" font-bold">
              99K <span>+</span>
            </h2>
            <p>Numbers of Sales</p>
          </div>
          <div className="content2text2 w-[143px] h-76">
            <h2 className=" font-bold">24H</h2>
            <p>Team Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
