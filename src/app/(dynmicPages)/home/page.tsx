import Header from "@/app/components/common/Header";
import SideBar from "@/app/components/common/SideBar";



const Home = () => {
    return (
        <div className="flex">
            <SideBar title='Home' />
            <div className="flex flex-col w-full">
                <Header />
            </div>
        </div>
    )
}

export default Home;