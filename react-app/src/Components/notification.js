import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Link } from "react-router-dom";
import { DownloadOutlined, DeleteOutlined, EyeOutlined, UploadOutlined } from "@ant-design/icons";
import { Buffer } from "buffer";
import { Spin, message, Button, Upload, Table, Space } from "antd";


export const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        

        const fetchInitialNotifications = async () => {
            try {
                setTimeout(async () => {
                const response = await fetch('http://localhost:4000/notifications', {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    },
                    method: 'GET',
                });
                if (!response.ok) {
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
                setLoading(false);
            }, 2000);
            } 
            catch (error) {
                console.error("There is a network error to fetch notifications", error);
            }
        
        };
        

        fetchInitialNotifications();

        // Initialize the socket connection
        const socket = io('http://localhost:4000'); // Adjust the URL to your server
        console.log("hahahahahaha" + socket);
        console.log(socket);
        // Listen for notifications
        socket.on('notification', (newNotification) => {
            console.log('New notification received:', newNotification);
            setNotifications(prevNotifications => [...prevNotifications, newNotification]);
        });
        console.log();

        // Clean up the socket connection when the component unmounts
        
        return () => {
            console.log('lallalalalalal');
            socket.disconnect();}
    }, []);

    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
            title: 'Text',
            dataIndex: 'text',
            key: 'text',
        },
        // {
        //   title: 'Actions',
        //   dataIndex: 'actions',
        //   key: 'actions',
        //   render: (_, record) => (
        //     <Space size="middle">
        //       <Button
        //         type="link"
        //         icon={<DeleteOutlined />}
        //         onClick={() => handleDelete(record)}
        //       />
        //     </Space>
        //   ),
        // },
      ];

    return (
        // <div>
        //     <h2>Notifications</h2>
        //     <ul>
        //         {notifications.map((notification, index) => (
        //             <li key={index}>{notification.title + ':-' +notification.text }</li> // Adjust depending on your notification structure
        //         ))}
        //     </ul>
        // </div>
         <div className="container">
         <h1>Notifications</h1>
         <br></br>
         <Spin spinning={loading}>
            <Table dataSource={notifications} columns={columns} />
        </Spin>
       </div>
    );
};

//export default Notification;