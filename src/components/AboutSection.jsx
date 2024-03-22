const AboutSection = () => {
  return (
    <div className="flex justify-center flex-col items-center ">
      <div className="container flex flex-col items-center justify-start">
        <div className=" aboutsection w-[912px] h-[112px] space-y-6">
          <div className="text1 flex items-center justify-center text-secondary">
            {" "}
            <p className="border-t-2 border-secondary border-solid w-6 mx-2"></p>
            ABOUT US
          </div>
          <div className="text2">
            <p className="text-center text-4xl leading-tight">
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
              className="h-[252px] w-full rounded-lg brightness-75"
            />

            <img
              src="/aboutimg/aboutimg(4).jpeg"
              alt=""
              className="h-[326px] w-full rounded-lg brightness-75"
            />
          </div>

          <div className="img2 w-[600px] h-[600px] space-y-5">
            <div className="flex gap-6">
              <img
                src="/aboutimg/aboutimg(7).jpeg"
                alt=""
                className="h-[250px] w-[286px] rounded-lg brightness-75"
              />
              <img
                src="/aboutimg/aboutimg(6).jpeg"
                alt=""
                className="h-[250px] w-[286px] rounded-lg brightness-75"
              />
            </div>

            <img
              src="/aboutimg/aboutimg(3).jpeg"
              alt=""
              className="h-[326px] w-full rounded-lg brightness-75"
            />
          </div>

          <div className="img3 w-[288px] h-[600px] space-y-5">
            <img
              src="/aboutimg/aboutimg(5).jpeg"
              alt=""
              className="h-[186px] w-full rounded-lg brightness-75"
            />
            <img
              src="/aboutimg/aboutimg(2).jpeg"
              alt=""
              className="h-[186px] w-full rounded-lg brightness-75"
            />
            <img
              src="/aboutimg/aboutimg(1).jpeg"
              alt=""
              className="h-[186px] w-full rounded-lg brightness-75"
            />
          </div>
        </div>
      </div>
      <div className="storyContainer">
        <h3 className="text-4xl leading-tight underline-offset-8 text-center">
          Our <span className="text-secondary underline">Story</span>
        </h3>
        <div className="storyContent w-full mt-16 brightness-75 flex gap-6">
          <img
            src="/aboutimg/aboutimg.jpeg"
            alt=""
            className="w-[400px] rounded-lg h-[404x]"
          />
          <div className="paragraghs text-justify">
            <p>
              At the beginning, it was just the two of them, working out of a
              small office space. They were determined to provide personalized
              service to their clients and build lasting relationships. They
              worked tirelessly, often working long hours and weekends to ensure
              that their clients' needs were met.
            </p>
            <br />
            <p>
              Their hard work paid off, and soon their business began to grow.
              They hired additional staff members and expanded their service
              offerings to include property management and real estate
              investments
            </p>
            <br />
            <p>
              Over the years, their business has continued to grow, and they
              have helped countless clients buy, sell, and manage their real
              estate investments. Today, their business is a respected name in
              the real estate industry, known for its exceptional service and
              commitment to its clients.
            </p>
            <br />
            <p>
              As they look to the future, John and Jane remain dedicated to
              their clients and to providing the best possible service in the
              real estate industry. They are excited to continue to grow and
              evolve their business, and to help even more clients achieve their
              real estate goals.
            </p>
            <button className="btn bg-primary  mt-5 h-[50px]">
              Get in touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
