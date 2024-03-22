const CtaSection = () => {
  return (
    <div className="flex justify-center mb-5">
      <div className="ctaContainer bg-cta-image bg-cover w-full h-96 text-white flex flex-col justify-center items-center">
        <div className="w-[468px] h-[248px] flex flex-col justify-center items-center gap-5 ">
          <p className="text-4xl text-center">
            Join the{" "}
            <span className="text-secondary underline">CNEX Community</span>{" "}
            <br />
            Today!
          </p>
          <p className="text-xs text-lorem text-center">
            Download CNEX now to explore a world of female-centric products and
            services, and empower yourself with every purchase and booking
          </p>
          <div className="app flex flex-col md:flex-row justify-center gap-4">
            <div className="appstore w-[100px] md:w-[130px]">
              <img src="/AppStore.png" alt="App Store" />
            </div>
            <div className="playstore w-[100px] md:w-[130px]">
              <img src="/GooglePlay.png" alt="Google Play" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
