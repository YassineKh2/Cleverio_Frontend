import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axiosInstance from "./axiosConfig"; // Import axios instance configured for your API

const FaceAuth = () => {
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Capture the photo
    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
            setCapturedImage(imageSrc);
            setErrorMessage("");
            setSuccessMessage("Image captured successfully.");
            console.log("Image captured:", imageSrc);
        } else {
            setErrorMessage("Could not capture photo. Please try again.");
            setSuccessMessage("");
        }
    };

    // Send the photo to the server for authentication
    const authenticate = async () => {
        if (!capturedImage) {
            setErrorMessage("No image captured. Please capture an image first.");
            setSuccessMessage("");
            return;
        }

        try {
            const blob = await fetch(capturedImage).then(res => res.blob());
            const formData = new FormData();
            formData.append("photo", blob, "photo.jpg");

            console.log("Sending image as file for authentication...");

            // Use axiosInstance for the POST request
            const response = await axiosInstance.post(
                "/face-auth",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            if (response.data.success) {
                const token = response.data.token;
                localStorage.setItem("token", token);
                setSuccessMessage("Authentication successful. Token saved.");
            } else {
                setErrorMessage(response.data.message || "No match found.");
            }
        } catch (error) {
            setErrorMessage("An error occurred while authenticating. Please try again.");
            console.error("Authentication error:", error);
            if (error.response && error.response.status === 401) {
                console.error("Unauthorized access - check your server-side configurations.");
            }
        }
    };

    return (
        <div className="face-auth">
            <h2>Face Authentication</h2>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={320}
                height={240}
            />
            <button onClick={capture}>Capture Photo</button>
            <button onClick={authenticate} disabled={!capturedImage}>Authenticate</button>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

            {capturedImage && (
                <div>
                    <h4>Captured Image Preview:</h4>
                    <img src={capturedImage} alt="Captured" width={160} height={120} />
                </div>
            )}
        </div>
    );
};

export default FaceAuth;
