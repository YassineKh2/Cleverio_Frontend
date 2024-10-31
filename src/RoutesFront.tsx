import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const Login = lazy(() => import("./pages/auth/login.tsx"));
const Register =lazy(()=>import("./pages/auth/register.tsx"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Error = lazy(() => import("./pages/404"));
const Home = lazy(() => import("./pages/front/Home/Home.tsx"));
const Events = lazy(() => import("./pages/front/Events/Events.tsx"));
const Courses = lazy(() => import("./pages/front/Courses/Courses.tsx"));

import Loading from "@/components/Loading.tsx";
import Layout from "./layout/Layout";
import NavbarFront from "@/components/NavbarFront";
import UserDisplay from "@/pages/app/users/displayUsers.jsx";
import UserProfile from "@/pages/app/users/displayProfile.jsx";
import UserProfileFront from "@/pages/app/users/displayProfileFront.jsx";
import FaceAuth from "@/pages/app/users/faceAuth.jsx";



function RoutesFront() {
    const location = useLocation();
    const isFrontOffice = location.pathname.startsWith("/front");

    return (
        <main className="App relative">
            {isFrontOffice && <NavbarFront />} {/* Show NavbarFront for front office paths */}
            <Routes>
                {/* Front office home page */}
                <Route
                    path="/front"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Home />
                        </Suspense>
                    }
                />
                <Route
                    path="/front/events"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Events />
                        </Suspense>
                    }
                />
                <Route
                    path="/front/courses"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Courses />
                        </Suspense>
                    }
                />
                 <Route
                    path="/front/profile"
                    element={
                        <Suspense fallback={<Loading />}>
                           <UserProfileFront/>
                        </Suspense>
                    }
                />


<Route
                    path="/faceAuth"
                    element={
                        <Suspense fallback={<Loading />}>
                           <FaceAuth/>
                        </Suspense>
                    }/>
                {/* Other routes */}
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Login />
                        </Suspense>
                    }
                />

<Route
                    path="/register"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Register />
                        </Suspense>
                    }
                />


                <Route path="/*" element={<Layout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="dashboard/users" element={<UserDisplay/>}/>
                    <Route path="dashboard/profile" element={<UserProfile/>}/>

                    <Route path="*" element={<Navigate to="/404" />} />
                </Route>
                <Route
                    path="/404"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Error />
                        </Suspense>
                    }
                />
            </Routes>
        </main>
    );
}

export default RoutesFront;
