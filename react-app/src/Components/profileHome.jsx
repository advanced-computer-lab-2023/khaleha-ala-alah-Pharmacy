import React from "react";

class ProfileForm extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault();

    // Access the form from the event
    const form = event.target;

    // Extract the selected file from the input within the form
    const fileInput = form.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    // You can use FormData to append additional data to the request
    const formData = new FormData();
    formData.append("profileFile", file);
    formData.append("medicineId", this.props.medicineId);

    console.log(formData);

    try {
      // Use fetch to send the FormData to the server
      const response = await fetch(
        "http://localhost:4000/patients/setMedicineImage",
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Handle the response if needed
      console.log("Image uploaded successfully:", data);
    } catch (error) {
      // Handle errors
      console.error("Error uploading image:", error);
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <div>
            <label>
              Upload profile picture for Medicine {this.props.medicineId}
            </label>
            <input type="file" name="profile-file" required />
          </div>
          <div>
            <input type="submit" value="Upload" />
          </div>
        </form>

        <hr />

        {/* Add a similar form for multiple profile pictures if needed */}
      </div>
    );
  }
}

export default ProfileForm;
