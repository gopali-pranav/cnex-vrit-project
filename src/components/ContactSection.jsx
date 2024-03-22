import { FaArrowRight } from "react-icons/fa6";

const ContactSection = () => {
  return (
    <div className="flex justify-center items-center mb-5">
      <div className="contactContainer flex justify-center items-center">
        <div className=" w-3/4 h-3/4 flex flex-col items-center gap-4">
          <div className=" w-2/3 h-24 text-center leading-tight space-y-3">
            <div className="text1 flex items-center justify-center text-secondary">
              {" "}
              <p className="border-t-2 border-secondary border-solid w-6 mx-2 text-xs"></p>
              Reach Out to Us
            </div>
            <div className=" text-4xl text-center">
              <span className="text-secondary underline">Connect</span> with Us
            </div>
            <div className="text-sm text-contactcolor">
              {" "}
              Fill out the form below, and we'll get back to you as soon as
              possible.
            </div>
          </div>
          <form className="w-full max-w-full mx-auto bg-white mt-11">
            <div className="flex justify-around mb-8">
              <div>
                <label htmlFor="name" className="block">
                  Name
                </label>{" "}
                <input
                  type="text"
                  className="border-b-2 border-contactcolor placeholder:text-xs focus:outline-none mt-2"
                  placeholder="jitendra"
                />
              </div>
              <div>
                <label htmlFor="email" className="block">
                  Email
                </label>
                <input
                  type="email"
                  className="border-b-2 border-contactcolor placeholder:text-xs focus:outline-none mt-2"
                  placeholder="email@samples.com"
                />
              </div>
            </div>
            <div className="flex justify-around mb-8">
              <div>
                <label htmlFor="phone" className="block">
                  Phone number
                </label>{" "}
                <input
                  type="tel"
                  className="border-b-2 border-contactcolor placeholder:text-xs focus:outline-none mt-2"
                  placeholder="+977-98********"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block">
                  Subject
                </label>
                <input
                  type="text"
                  className="border-b-2 border-contactcolor placeholder:text-xs focus:outline-none mt-2"
                  placeholder="service name"
                />
              </div>
            </div>

            <div className="relative left-32 mx-1">
              <label htmlFor="message" className="block">
                Message
              </label>{" "}
              <input
                type="text"
                className="border-b-2 w-[654px] border-contactcolor placeholder:text-xs  focus:outline-none mt-2"
                placeholder="Kindly explain your needed service you are interested in..."
              />
            </div>
            <button className="rounded-md w-28 h-10 text-white text-xs bg-primary flex items-center justify-center relative left-32 mx-1 mt-10">
              Get in touch <FaArrowRight className="mx-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
