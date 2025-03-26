import LogoIcon from "../../assets/icons/LogoIcon";
const SearchPageBanner = () => {
  return (
    <div className="bg-[#F0F0F0]">
      <div className="mx-auto flex w-4/5 text-xs items-center gap-2 py-2 text-[#5B5B5B]">
          <LogoIcon />
          <h1>
            An Official Website of the {" "}
            <span className="font-semibold">Singapore Government</span>
          </h1>
      </div>
    </div>
  );
};

export default SearchPageBanner;
