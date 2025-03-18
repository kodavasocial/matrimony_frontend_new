import React from 'react';
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Payment from '../Pages/Payment';

// import TestLike from '../components/LikeDislikeCard/TestLike';

const Profile = lazy(() => import("../Pages/Profile"))
const Feed = lazy(() => import("../Container/HomeContainer"))
const SignUp = lazy(() => import("../Pages/AuthPages/SignUp"))
const Login = lazy(() => import("../Pages/AuthPages/Login"))
const ForgotPassword = lazy(() => import("../Pages/AuthPages/ForgotPassword"))
const MemberShip = lazy(() => import("../Pages/MemberShipPlans/MemberShip"))
const ConfirmPassword = lazy(() => import("../Pages/AuthPages/ConfirmPassword"))
const AboutUs = lazy(() => import('../Pages/About/AboutUs'))
const PrivacyPolicy = lazy(() => import('../Pages/PrivacyPolicy/PrivacyPolicy'))
const Contactus = lazy(() => import('../Pages/ContactUs'))
const ProfileUserDetail = lazy(() => import('../Pages/Profile/ProfileUserDetail'))
const UserProfile = lazy(() => import("../Pages/Profile/UserProfile"))
const LikeDislikeCard = lazy(() => import('../components/LikeDislikeCard'))
const Chat = lazy(() => import('../Pages/chat'))
const Notification = lazy(() => import('../Pages/Notification'))
const Test = lazy(() => import('../Pages/chat/Test'))


const AppRoutes = ({ auth }) => {
    return (
        <Routes>
            {/* private routes start here*/}
            <Route path="/profile"
                Component={(props) => auth ? (<Suspense fallback={<Loading />}><Profile {...props} /> </Suspense>) : (
                    <Navigate to="/login" replace />)} />
            <Route path="/profile-info"
                Component={(props) => auth ? (
                    <Suspense fallback={<Loading />}><ProfileUserDetail {...props} /> </Suspense>) : (
                    <Navigate to="/login" replace />)} />
            <Route path="/searchprofiles"
                Component={(props) => auth ? (
                    <Suspense fallback={<Loading />}><LikeDislikeCard {...props} /> </Suspense>) : (
                    <Navigate to="/login" replace />)} />
            <Route path="/chat"
                Component={(props) => auth ? (
                    <Suspense fallback={<Loading />}><Chat {...props} /> </Suspense>) : (
                    <Navigate to="/login" replace />)} />
            <Route path="/all-notification"
                Component={(props) => auth ? (
                    <Suspense fallback={<Loading />}><Notification {...props} /> </Suspense>) : (
                    <Navigate to="/login" replace />)} />
            {/* private routes end here*/}

            {/* unauthorized routes start here */}
            <Route path="/login"
                Component={(props) => !auth ? (
                    <Suspense fallback={<Loading />}><Login  {...props} /></Suspense>) : (
                    <Navigate to="/" replace />)}
            />
            <Route path="/forgot-password"
                Component={(props) => !auth ? (
                    <Suspense fallback={<Loading />}><ForgotPassword  {...props} /></Suspense>) : (
                    <Navigate to="/" replace />)}
            />

            <Route path="/reset-password"
                Component={(props) => !auth ? (
                    <Suspense fallback={<Loading />}><ConfirmPassword  {...props} /></Suspense>) : (
                    <Navigate to="/" replace />)}
            />
            <Route path="/signup"
                Component={(props) => !auth ? (<Suspense fallback={<Loading />}><SignUp  {...props} /></Suspense>) : (
                    <Navigate to="/" replace />)}
            />
            {/* unauthorized routes start here */}

            {/* public  routes start here*/}
            <Route path="/contact-us" element={<Suspense fallback={<Loading />}><Contactus /></Suspense>} />
            {/* <Route path="/connection" element={<Suspense fallback={<Loading />}><TestLike /></Suspense>} /> */}
            <Route path="/connection" element={<Suspense fallback={<Loading />}><LikeDislikeCard /></Suspense>} />
            <Route path="/" element={<Suspense fallback={<Loading />}><Feed /></Suspense>} />
            <Route path="/membership" element={!auth ? <Suspense fallback={<Loading />}><MemberShip /></Suspense> : <Navigate to="/login" replace />} />
            <Route path="/payment/:id" element={<Suspense fallback={<Loading />}><Payment /></Suspense>} />
            {/* <Route path="/payment/:id" Component={(props) => { <Suspense fallback={<Loading />}><Payment {...props} /></Suspense> }} /> */}
            <Route path="/about" element={<Suspense fallback={<Loading />}><AboutUs /></Suspense>} />
            <Route path="/privacy-policy" element={<Suspense fallback={<Loading />}><PrivacyPolicy /></Suspense>} />
            <Route path="/user-profile" element={<Suspense fallback={<Loading />}><UserProfile /></Suspense>} />
            <Route path="*" element={<Navigate to="/" replace />} />
            {/* public  routes end here*/}

        </Routes>
    )
}

export default AppRoutes