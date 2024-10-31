import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const Login = lazy(() => import("./pages/auth/login.tsx"));
const Register =lazy(()=>import("./pages/auth/register.tsx"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Error = lazy(() => import("./pages/404"));
const Home = lazy(() => import("./pages/front/Home/Home.tsx"));
const Events = lazy(() => import("./pages/front/Events/Events.tsx"));
const Courses = lazy(() => import("./pages/front/Courses/Courses.tsx"));
const AddRoom = lazy(() => import("./pages/front/Rooms/AddRooms.jsx"));
const DisplayRooms = lazy(() => import("./pages/front/Rooms/DisplayRooms.jsx"));
const UpdateRoom = lazy(() => import("./pages/front/Rooms/UpdateRoom.jsx"));

const Shop = lazy(() => import("./pages/front/Shop/Shop"));
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import Loading from "@/components/Loading.tsx";
import Layout from "./layout/Layout";
import NavbarFront from "@/components/NavbarFront";
import UserDisplay from "@/pages/app/users/displayUsers.jsx";
import UserProfile from "@/pages/app/users/displayProfile.jsx";
import UserProfileFront from "@/pages/app/users/displayProfileFront.jsx";
import FaceAuth from "@/pages/app/users/faceAuth.jsx";
import GameList from "./pages/app/shop/GameList";
import QuizList from "@/pages/app/quiz/QuizList.jsx";
import AddQuiz from "@/pages/app/quiz/AddQuiz.jsx";



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
                    path="/front/shop"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Shop />
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
                    <Route path="dashboard/shop" element={<GameList />} />
                    <Route path="dashboard/quiz" element={<QuizList />} />
                    <Route path="dashboard/quiz/add" element={<AddQuiz />} />
                    <Route path="*" element={<Navigate to="/404" />} />
                </Route>
                {/* <Route
                    path="/shop"
                    element={
                        <Suspense fallback={<Loading />}>
                            <GameList />
                        </Suspense>
                    }
                /> */}
                <Route
                    path="/404"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Error />
                        </Suspense>
                    }
                />
                <Route
                    path="/front/addRoom"
                    element={
                        <Suspense fallback={<Loading />}>
                            <AddRoom />
                        </Suspense>
                    }
                />
                <Route
                    path="/front/displayrooms"
                    element={
                        <Suspense fallback={<Loading />}>
                            <DisplayRooms />
                        </Suspense>
                    }
                />
                <Route
                    path="/front/updateroom"
                    element={
                        <Suspense fallback={<Loading />}>
                            <UpdateRoom />
                        </Suspense>
                    }
                />
            </Routes>
            <ToastContainer />
        </main>
    );
}

export default RoutesFront;
