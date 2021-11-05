
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import  Divider  from '@material-ui/core/Divider'

export default function Footer() {
    return (
        <div className="px-10 py-8 bg-darkteal text-lightgray lg:h-footer">
            <div className="p-8 flex flex-col-reverse justify-between md:flex-row md:flex-wrap">
                <ul className="mb-6 w-full md:w-1/2 lg:w-1/4">
                    <li className="font-bold underline mb-2 text-tomato">About Us</li>
                    <li>Our History</li>
                    <li>Leadership Team</li>
                    <li>Values in Action</li>
                    <li>Investor Relations</li>
                    <li>News & Notifications</li>
                </ul>
                <ul className="mb-6 w-full md:w-1/2 lg:w-1/4">
                    <li className="font-bold underline mb-2 text-tomato">Careers</li>
                    <li>Education Opportunities</li>
                    <li>Employee Perks</li>
                    <li>Staff & Management</li>
                    <li>Working with us</li>
                    <li>Apply Now</li>
                </ul>
                <ul className="mb-6 w-full md:w-1/2 lg:w-1/4">
                    <li className="font-bold underline mb-2 text-tomato">Services</li>
                    <li>Wi-Fi</li>
                    <li>Mobile orders</li>
                    <li>Trending Now</li>
                    <li>Family Fun</li>
                </ul>
                <ul className="mb-6 w-full md:w-1/2 lg:w-1/4">
                    <li className="font-bold underline mb-2 text-tomato">Contact Us</li>
                    <li>Branches</li>
                    <li>Our Timings</li>
                    <li>Feedback</li>
                    <li>FAQs</li>
                </ul>
            </div>
            <Divider/>
            <div className="py-2 px-8 grid grid-cols-1 md:grid-cols-4">
                <div className="col-span-3 space-y-1 flex flex-col sm:flex-row text-base sm:justify-center md:justify-start sm:my-auto sm:space-x-8 sm:space-y-0">
                    <a className="whitespace-nowrap text-center" href="terms_and_conditions">Terms &amp; Conditions</a>
                    <a className="whitespace-nowrap text-center" href="privacy">Privacy</a>
                    <p className="whitespace-nowrap text-center">&copy; 1999-2021, <span className="ml-4 text-md italic text-tomato"><sup>Ah!</sup></span> <span className="text-xl text-tomato not-italic font-bold"> Kitchen </span> </p>
                </div>
                <div className="my-4 flex flex-row justify-center md:justify-end">
                    <a href="facebook" className="mx-1 w-8 h-8 rounded-full border-gray flex justify-items-center align-middle hover:text-white hover:bg-facebook"><FontAwesomeIcon icon={faFacebookF} size="1x" className="m-auto" /></a>
                    <a href="youtube" className="mx-1 w-8 h-8 rounded-full border-gray flex justify-items-center align-middle hover:text-white hover:bg-youtube"><FontAwesomeIcon icon={faYoutube} size="1x" className="m-auto" /></a>
                    <a href="twitter" className="mx-1 w-8 h-8 rounded-full border-gray flex justify-items-center align-middle hover:text-white hover:bg-twitter"><FontAwesomeIcon icon={faTwitter} size="1x" className="m-auto" /></a>
                    <a href="instagram" className="mx-1 w-8 h-8 rounded-full border-gray flex justify-items-center align-middle hover:text-white hover:bg-instagram"><FontAwesomeIcon icon={faInstagram} size="1x" className="m-auto" /></a>
                </div>
            </div>
        </div>
    )
}
