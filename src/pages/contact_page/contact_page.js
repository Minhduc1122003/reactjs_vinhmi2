import React, { useState } from "react";

const ContactUs = () => {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="container mt-5">
      <h2>Liên hệ với chúng tôi</h2>

      <div className="row">
        {/* Left side: Contact details and map */}
        <div className="col-md-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.660777042963!2d106.68284977417292!3d10.762622892364153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ef4d4a9e419%3A0x39fffe123ca7f827!2sCGV%20Vietnam%20Co.%2C%20Ltd!5e0!3m2!1sen!2s!4v1607423441626!5m2!1sen!2s"
            title="Contact Page Map"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>

          <div className="mt-4">
            <h5>ĐỊA CHỈ</h5>
            <p>Phước Dân, Ninh Phước, Ninh Thuận</p>

            <h5>LIÊN HỆ</h5>
            <p>
              Hotline: <b style={{ color: "red" }}>0908.416.472</b>
              <br />
              Thời gian làm việc: 08:00 - 17:00 thứ 2 đến thứ 7
              <br />
              Email liên hệ:{" "}
              <b style={{ color: "red" }}>minhduc1122003@gmail.com</b>
            </p>
          </div>
        </div>

        {/* Right side: Contact form */}
      </div>
    </div>
  );
};

export default ContactUs;
