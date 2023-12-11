import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Link } from "react-router-dom";


export const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        const fetchInitialNotifications = async () => {
            try {
                const response = await fetch('http://localhost:4002/notifications', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                    
                });
                if (!response.ok) {
                    console.log("hahahahhaa fefefefe");
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const result = await response.json();
                console.log("Fetched data:", result); // Log to see the structure
        
                // Check if result.data is an array before setting state
                if (Array.isArray(result.data)) {
                    setNotifications(result.data);
                } else {
                    console.error("Fetched data is not an array:", result.data);
                    // Set to an empty array or handle the error as needed
                    setNotifications([]);
                }
            } catch (error) {
                console.error("There is a network error to fetch notifications", error);
            }
        };
        

        fetchInitialNotifications();

        // Initialize the socket connection
        // //const socket = io('http://localhost:4002'); // Adjust the URL to your server
        // console.log("hahahahahaha" + socket);
        // console.log(socket);
        // // Listen for notifications
        // socket.on('notification', (newNotification) => {
        //     console.log('New notification received:', newNotification);
        //     setNotifications(prevNotifications => [...prevNotifications, newNotification]);
        // });
        //console.log();

        // Clean up the socket connection when the component unmounts
        
        return () => {
            console.log('lallalalalalal');
            //socket.disconnect();
        }
    }, []);

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification.title + ':-' +notification.text }</li> // Adjust depending on your notification structure
                ))}
            </ul>
        </div>
    );
};

//export default Notification;