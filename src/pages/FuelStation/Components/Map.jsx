import React from "react";

const Map = () => {
  return (
    <div className={`overflow-hidden pb-[56.25%] relative h-0`}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29258.56729527151!2d90.15787519999999!3d23.5569152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1722707287393!5m2!1sen!2sbd"
        className={`absolute left-0 top-0 h-full w-full border-0`}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
