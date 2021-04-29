import React from 'react'
import "./Home.css";
import Product from "./Product";

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img 
                className="home__image"
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                alt="" />

                <div className="home__row">
                     <Product 
                       id="1"
                       title="Unfinished: A Memoir Hardcover – 9 February 2021 by Priyanka Chopra Jonas " 
                       price={29.99} 
                       image="https://images-na.ssl-images-amazon.com/images/I/417FIfX3VTL._SX326_BO1,204,203,200_.jpg"
                       rating={5} 
                     />
                     <Product 
                         id="2"
                       title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl" 
                       price={290.99} 
                       image="https://cdn.ecommercedns.uk/files/2/225382/4/11581444/kmx7-3.jpg"
                       rating={4} 
                     />
                </div>

                <div className="home__row">
                     <Product
                        id="3"
                       title="HUG PUPPY ID116 Plus Bluetooth Fitness Smart Watch for Men Women and Kids Activity Tracker (Black)" 
                       price={350.99} 
                       image="https://m.media-amazon.com/images/I/51nALtybkcL._AC_SS450_.jpg"
                       rating={5}  />
                     <Product 
                         id="4"
                       title="All-new Echo Dot (4th Gen) | Next generation smart speaker with improved bass and Alexa (Black)" 
                       price={90.43} 
                       image="https://m.media-amazon.com/images/I/61KIy6gX-CL._AC_UY327_QL65_.jpg"
                       rating={4} 
                     />
                     <Product 
                       id="5"
                       title="New Apple iPad Pro (12.9-inch, Wi-Fi, 512GB) - Space Grey (4th Generation)" 
                       price={890.99} 
                       image="https://m.media-amazon.com/images/I/811aBwuSuIL._AC_UY327_FMwebp_QL65_.jpg"
                       rating={3} 
                     />
                </div>

                <div className="home__row">
                     <Product 
                         id="6"
                       title="Acer ED322QR 31.5-inch Curved Full HD VA Panel 144Hz LED Monitor (2XHDMI, Display Ports) Stereo Speakers" 
                       price={1094.99} 
                       image="https://m.media-amazon.com/images/I/617ye4NQDSL._AC_UY327_FMwebp_QL65_.jpg"
                       rating={4} 
                     />
                </div>
            </div>
        </div>
    )
}

export default Home
