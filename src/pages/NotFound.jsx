import { Link } from "react-router-dom";
import NotFoundBlock from "../components/NotFoundBlock/NotFoundBlock";

export default function NotFound(){
    return(
        <>
        <NotFoundBlock />
        <Link to="/dodo-pizza">На главную</Link>
        </>
    )
}