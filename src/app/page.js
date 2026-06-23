import Banner from "@/Components/Banner";
import ArtCategories from "@/Components/home/ArtCategoryGrid";
import FeaturedSection from "@/Components/home/FeaturedSection";
import HowItWorks from "@/Components/home/HowItWorks";
import MostExpensiveArt from "@/Components/home/MostExpensiveArt";
import OurServices from "@/Components/home/OurServices";
import Review from "@/Components/home/Review";
import TopArtists from "@/Components/home/TopArtist";
import TrustBanner from "@/Components/home/TrustBanner";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Banner></Banner>
      <FeaturedSection></FeaturedSection>
      <TopArtists></TopArtists>
      <MostExpensiveArt></MostExpensiveArt>
      <ArtCategories></ArtCategories>
      <HowItWorks></HowItWorks>
      <TrustBanner></TrustBanner>
      <OurServices></OurServices>
      <Review></Review>
    
    </div>
  );
}
