import React from "react";
import { SectionTitle } from "../components";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <SectionTitle title="About Us" path="Home | About" />
      <div className="about-content text-center max-w-2xl mx-auto mt-5">
        <h2 className="text-6xl text-center mb-10 max-sm:text-3xl text-accent-content">
          We love our customers!
        </h2>
        <p
          className="text-lg text-center max-sm:text-sm max-sm:px-2 text-accent-content"
          style={{ textAlign: "justify" }}
        >
          GIGD Clothing & Shoes is a premier online store offering a diverse
          selection of stylish apparel and footwear for men and women. Our
          curated collection features the latest trends and timeless classics,
          ensuring there's something for every taste and occasion. We pride
          ourselves on providing high-quality products from renowned brands, all
          available at competitive prices. With an easy-to-navigate website and
          exceptional customer service, GIGD Clothing & Shoes is your go-to
          destination for fashion that fits your lifestyle. Shop with us to
          experience convenience, variety, and unparalleled style.
        </p>
        <Link
          to="/contact"
          className="btn btn-wide bg-blue-600 hover:bg-blue-500 text-white mt-5"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default About;
