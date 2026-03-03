import React from 'react'
import HeroSection from '../components/HeroSection'
import ContentSection from '../components/ContentSection'
import CTAsection from '../components/CTAsection'
import AnutomateSection from '../components/AnutomateSection'
import FeaturesSection from '../components/FeaturesSection'
import Footer from '../components/Footer'
import Product from '../components/Product'
import Pricing from '../components/Pricing'
import CardsAction from '../components/CardsAction'
import ScrollToTop from '../components/ScrollToTop'

import InstentConnection from '../components/InstentConnection'
import CircularGallery from '../components/CircularGallery'
import IndustrySliders from '../components/IndustrySliders'
import Header from '../components/header'

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <div className='product-wrap'>
      <Header/>
      </div>
      {/* <CTAsection/> */}
      {/* <Product /> */}
      {/* <CardsAction/> */}

      {/* <div style={{ height: '600px', position: 'relative' }}>
  <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02} scrollSpeed={1.7}/>
</div> */}
      <Pricing />
      <AnutomateSection />
      {/* <ContentSection/> */}
      {/* <InstentConnection/> */}
      <IndustrySliders />
      <Footer />
      <ScrollToTop />

    </>
  )
}

export default Home