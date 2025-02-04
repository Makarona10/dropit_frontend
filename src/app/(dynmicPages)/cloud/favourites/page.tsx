import Header from "@/app/components/common/Header"
import SideBar from "@/app/components/common/SideBar"
import FileComponent from "@/app/components/files_browsing/FileComponent";
import { FaStar } from "react-icons/fa";


const FavouritesPage = () => {
    return (
        <div className="flex">
            <SideBar title='Cloud' />
            <div className="flex flex-col w-full">
                <Header />
                <div className="flex items-center gap-4 pt-10 pl-10">
                    <h1 className="text-2xl font-bold">Favourites</h1>
                    <FaStar style={{ width: '21px', height: '21px', color: '#A81C1C' }} />
                </div>
                <div className="flex flex-wrap gap-5 p-8 w-full">
                    <FileComponent fName="Vini Jr."
                        image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
                    />
                    <FileComponent fName="Vini Jr."
                        image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
                    />
                    <FileComponent fName="Vini Jr."
                        image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
                    />
                    <FileComponent fName="Vini Jr."
                        image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
                    />
                    <FileComponent fName="Vini Jr."
                        image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
                    />
                    <FileComponent fName="Vini Jr."
                        image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
                    />
                    <FileComponent fName="Vini Jr."
                        image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
                    />
                    <FileComponent fName="Vini Jr."
                        image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
                    />
                    <FileComponent fName="Vini Jr."
                        image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
                    />
                    <FileComponent fName="Vini Jr."
                        image="https://apostagolos.com/wp-content/uploads/2022/05/vinicius-junior-2-scaled.jpg"
                    />
                </div>
            </div>
        </div>
    )
}

export default FavouritesPage;