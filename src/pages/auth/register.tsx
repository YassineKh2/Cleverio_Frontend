import React from "react";
import { Link } from "react-router-dom";
import RegForm from "./common/reg-from";
import Social from "./common/social";
import useDarkMode from "@/hooks/useDarkMode";
import { ToastContainer } from "react-toastify";

// image import
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Logo from "@/assets/images/logo/logo.png";
import Illustration from "@/assets/images/auth/ils1.svg";


const Register = () => {
    const [isDark] = useDarkMode();
    return (
        <>
            <ToastContainer />
            <div className="loginwrapper">
                <div className="lg-inner-column">
                    <div className="left-column relative z-[1]">
                        <div className="max-w-[200px] pt-20 ltr:pl-20 rtl:pr-20">
                            <Link to="/">
                                <img src={isDark ? LogoWhite : Logo} alt="" className="mb-10" />
                            </Link>
                            
                        </div>
                        <div className="absolute left-0 2xl:bottom-[-160px] bottom-[-130px] h-full w-full z-[-1]">
                            <img
                                src={Illustration}
                                alt=""
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>
                    <div className="right-column relative">
                        <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
                            <div className="auth-box h-full flex flex-col justify-center">
                                <div className="mobile-logo text-center mb-6 lg:hidden block">
                                    <Link to="/">
                                        <img
                                            src={isDark ? LogoWhite : Logo}
                                            alt=""
                                            className="mx-auto"
                                        />
                                    </Link>
                                </div>
                                <div className="text-center 2xl:mb-10 mb-4">
                                    <h4 className="font-medium">S'inscrire</h4>
                                    <div className="text-slate-500 text-base">
                                    Créez votre compte                                    </div>
                                </div>
                                <RegForm />
                                
                                <div className="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase text-sm">
                                Vous avez déjà un compte?{" "}
                                    <Link
                                        to="/"
                                        className="text-slate-900 dark:text-white font-medium hover:underline"
                                    >
                                          Connectez-vous
                                    </Link>
                                </div>
                            </div>
                            <div className="auth-footer text-center">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;