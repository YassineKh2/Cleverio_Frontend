import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FaceAuth.css'; // Import CSS for additional styling

// Helper function to parse JWT token
const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        console.error("Error decoding token:", e);
        return null;
    }
};

const FaceAuth = () => {
    const webcamRef = useRef(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Define the options for the captured image
    const videoConstraints = {
        width: 640,
        height: 480,
        facingMode: "user"
    };

    // Capture the image and send it to the backend
    const captureAndAuthenticate = useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        
        if (!imageSrc) {
            setMessage("Failed to capture image.");
            return;
        }

        // Convert the base64 image to a Blob to send as FormData
        const blob = await fetch(imageSrc).then(res => res.blob());
        const formData = new FormData();
        formData.append('photo', blob, 'capture.jpg'); // Assign a name to the file

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/face-auth', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: false,
            });

            if (response.data.success) {
                // Store token in localStorage
                const token = response.data.token;
                localStorage.setItem('token', token);

                // Decode the token to get the role
                const decodedToken = parseJwt(token);
                const role = decodedToken?.role;

                // Redirect based on role
                if (role === 'student') {
                    navigate('/front');
                } else if (role === 'admin') {
                    navigate('/dashboard');
                } else {
                    setMessage("Unknown role.");
                }

                setMessage(`Authentication successful! Welcome, ${response.data.username}`);
            } else {
                setMessage('Authentication failed: No match found.');
            }
        } catch (error) {
            setMessage('Error during authentication.');
            console.error("Authentication error:", error);
        }
    }, [webcamRef, navigate]);

    return (
        <div className="face-auth-container">
            <h2 className="face-auth-title">Facial Authentication</h2>
            <div className="webcam-container">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={videoConstraints.width}
                    height={videoConstraints.height}
                    videoConstraints={videoConstraints}
                    className="webcam-view"
                />
            </div>
            <button className="auth-button" onClick={captureAndAuthenticate}>Capture & Authenticate</button>
            {message && <p className="auth-message">{message}</p>}
        </div>
    );
};

export default FaceAuth;
