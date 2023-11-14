import SearchBar from '@/components/searchbar/SearchBar'
import SideBar from '@/components/sidebar/SideBar'
import Content from '../content/Content'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import UploadBtn from '@/components/upload-btn/UploadBtn'

const HomePage = () => {
    return (
        <>
            <Header />
            <div className='grid grid-cols-4 gap-4'>
                <SideBar />
                <div className='col-span-3 border'>
                    <div className="flex justify-center px-4 py-4">
                        <div className="w-11/12">
                            <SearchBar />
                        </div>
                        <div>
                            <UploadBtn />
                        </div>
                    </div>
                    <Content />
                </div>
            </div>
            <Footer />
        </>

    )
}

export default HomePage
