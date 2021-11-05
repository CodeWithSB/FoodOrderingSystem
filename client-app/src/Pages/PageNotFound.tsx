import PageNotFoundSVG from '../assets/PageNotFoundImage.svg'

export default function PageNotFound() {
    return (
        <div className="m-auto">
            <img src={PageNotFoundSVG} alt="Login" className="p-10"/>
        </div>
    )
}
