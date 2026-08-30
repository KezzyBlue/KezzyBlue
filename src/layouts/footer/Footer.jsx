import './Footer.css';
import '../../styles/theme.css';
function Footer()
{
    return (
        <footer>
            <p>
                &copy; {new Date().getFullYear()} KezzyBlue_VN <b> • </b> Built with React and ❤️
            </p>
        </footer>
    );
}
export default Footer;