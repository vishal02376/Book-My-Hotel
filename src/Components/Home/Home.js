import Footer from "../HomeComponents/Footer/Footer"
import MyHotel from "../HomeComponents/MyHotel/MyHotel"
import Nave from "../HomeComponents/Nave/Nave"
import Search from "../HomeComponents/Search/Search"

function Home(){
    return(
        <>
  <Nave/>
  <Search/>
  <MyHotel/>
  <Footer/>
        </>
    )
}
export default Home