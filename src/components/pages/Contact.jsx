import React from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import Banner from "../organisms/Banner";
import InfoContact from "../organisms/InfoContact";
import ContactForm from "../organisms/ContactForm";
import Map from "../organisms/Map";
import QnA from "../organisms/QnA";

export default function Contact() {
  return (
    <>
      <Header />         
        <Banner />
        <div className="contacto-container">
            <InfoContact/>
            <ContactForm/>
        </div>
        <Map/>
        <QnA/>
      <Footer />           
    </>
  );
}
