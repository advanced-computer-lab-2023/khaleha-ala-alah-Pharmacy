import React from "react";
import { Avatar, Button, Card } from "antd";
import { FileDoneOutlined, PlusOutlined } from "@ant-design/icons/lib";

const Department = ({ medicine, className = "" }) => (
  <>
    <Card
      className={`department ${className}`}
      cover={<img alt={`${medicine.name} avatar`} src={medicine.pictureUrl} />}
    >
      <h3 className="h4 mt-0">{medicine.name}</h3>

      <div className="team d-flex align-items-center mb-4">
        <p>Price: ${medicine.price}</p>
        <p>Available Quantity: {medicine.availableQuantity}</p>
        <p>Sales: {medicine.sales}</p>
      </div>

      <p>{medicine.description}</p>

      <div className="button-box pb-2">
        <Button type="primary">
          More <FileDoneOutlined className="ml-2" />
        </Button>
      </div>
    </Card>
  </>
);

export default Department;
