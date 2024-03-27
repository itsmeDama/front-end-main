import Navbar from "@/app/components/shared/layout/navbar/Navbar";
import Footer from "@/app/components/shared/layout/footer/Footer";

export default function Layout({children}) {
    return(
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}