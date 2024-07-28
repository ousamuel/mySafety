import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <section className="align-middle">
          <a
            href="/"
            className="my-auto h-fit text-2xl font-bold flex relative"
          >
            <span className="z-50 ">MySafety</span>
            <Image
              src="/svgs/shield.svg"
              className="ml-1"
              width={31}
              height={31}
              alt="mysafety-logo"
            />
          </a>
        </section>

        <div>
          <a
            href="/registered-offenders"
            className="text-gray-800 hover:text-blue-500 ml-4"
          >
            Registered Offenders
          </a>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
