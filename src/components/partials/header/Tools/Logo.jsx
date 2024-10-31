import React from "react";
import useDarkMode from "@/hooks/useDarkMode";
import { Link } from "react-router-dom";
import useWidth from "@/hooks/useWidth";

import MainLogo from "@/assets/images/logo/logo.png";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import MobileLogo from "@/assets/images/logo/logo.png";
import MobileLogoWhite from "@/assets/images/logo/logo.png";
const Logo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  return (
    <div>
    <Link to="/dashboard">
      {width >= breakpoints.xl ? (
        <img
          src={isDark ? LogoWhite : MainLogo}
          alt=""
          style={{ width: '50px', height: '50px' }} // Adjust size as needed
        />
      ) : (
        <img
          src={isDark ? MobileLogoWhite : MobileLogo}
          alt=""
          style={{ width: '30px', height: '30px' }} // Adjust size as needed
        />
      )}
    </Link>
  </div>
  
  );
};

export default Logo;
