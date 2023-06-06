import { Container } from "react-bootstrap";
import CategorySlider from "../Components/HomePage/CategorySlider";
import FoodArea from "../Components/HomePage/FoodArea";
import HeroSlider from "../Components/HomePage/HeroSlider";
import SemiBanners from "../Components/HomePage/SemiBanners";
import { mainBanners, semiBanners } from "../Context/apis";
import { useContext, useEffect, useState } from "react";
import FooterTop from '../Components/ExtraComponents/FooterTop'
import SettingContext from '../Context/SiteSetting/SettingContext'

function Home() {

  const [mainBanner, setMainBanner] = useState(null)
  const [semiBanner, setSemiBanner] = useState(null)

  // setting context
  const { setting } = useContext(SettingContext)
  
  const setBannerApi = async() => {
    const banner = await mainBanners()
    const sBanner = await semiBanners()

    // main Banner
    if (!banner.message) {
      setMainBanner(banner)
    } else {
      console.log(banner.message);
    }

    //semi banner
    if (!sBanner.message) {
      setSemiBanner(sBanner)
    } else {
      console.log(sBanner.message);
    }
  }

  useEffect(()=>{
    setBannerApi()
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  },[])

  useEffect(()=>{
    document.title = `Home - ${setting?.siteName ?? 'Loading'}`;
  },[setting])

  return (
    <>
      <Container>
        <HeroSlider banner={mainBanner}/>
        <SemiBanners banner={semiBanner}/>
        <FoodArea/>
        <CategorySlider/>
        <FooterTop/>
      </Container>
    </>
  )

}

export default Home;
