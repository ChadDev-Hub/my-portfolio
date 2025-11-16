import Sidebar from "./Sidebar";
import Navigation from "./Navbar";
import { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import ComputerIcon from '@mui/icons-material/Computer';
import WorkIcon from '@mui/icons-material/Work';
import Info from "./components/Information/Information";
import axios from "axios";
import Resume from "./components/Resume/Resume";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ClassNames } from "@emotion/react";
import BadgeIcon from '@mui/icons-material/Badge';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ComputerTwoToneIcon from '@mui/icons-material/ComputerTwoTone';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import AppandProjects from "./components/App_projects/AppsProjects";
import ClickSound from "../../assets/click-sound.mp3"
import MenuItem from "@mui/material/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import MiniDrawer from "./Drawer";
import Box from '@mui/material/Box';
import { styled} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


function Homepage() {
    const navigate = useNavigate()
    const location = useLocation()
    const isSmallScreen = useMediaQuery('(min-width:600px)')
    const baseUrl = import.meta.env.VITE_BASE_URL
    const SoundEffect = new Audio(ClickSound)
    const [data, setData] = useState(null)
    const [menus, setMenu] = useState([
        {
            name: "ABOUT ME",
            active_icon: <InfoIcon />,
            inactive_icon: <InfoOutlinedIcon />,
            isActive: true,
            ref: '/profile/aboutme'
        },
        {
            name: "RESUME",
            active_icon: <BadgeIcon />,
            inactive_icon: <BadgeOutlinedIcon />,
            isActive: false,
            ref: '/profile/resume'
        },
        {
            name: "APP & PROJECTS",
            active_icon: <ComputerTwoToneIcon />,
            inactive_icon: <ComputerIcon />,
            isActive: false,
            ref: '/profile/project'
        },

        {
            name: "CERTIFICATES",
            active_icon: <DescriptionIcon />,
            inactive_icon: <DescriptionOutlinedIcon />,
            isActive: false

        }

    ])
    const [resumeData, setResumeData] = useState([])
    useEffect(() => {
        async function fetchData() {
            try {
                const res_data = await axios.get(`${baseUrl}/profile/home_page_data?user=1`);
                setResumeData(res_data.data);
            } catch (error) {
                console.error(error);
            };
        };
        fetchData();
    }, [baseUrl]);

    // function handleHover() {
    //     setHovered(true)
    // }

    // function handleLeave() {
    //     setHovered(false)
    // }

    // function handleClick() {
    //     setHovered(!ishovered)
    // }

    function handleMenuButtonClick(event) {
        const name = event.currentTarget.dataset.name;
        const menuItem = menus.find(m => m.name === name);
        console.log(name)
        setMenu((prevValue) =>
            prevValue.map((item) =>
                item.name === name
                    ? { ...item, isActive: true }
                    : { ...item, isActive: false }
            )
        );
        if (menuItem.ref) navigate(menuItem.ref)
        SoundEffect.currentTime = 0
        SoundEffect.play()
    }

    useEffect(() => {
        async function fetchData() {
            try {

                console.log(baseUrl)
                const result = await axios.get(`${baseUrl}/home_page`)
                setData(result.data)
            } catch (error) {
                console.log("Error", error)
            }
        }
        fetchData();
    }, [baseUrl])


    return (
        <Box>
            {isSmallScreen ? <MiniDrawer
                menus={menus}
                menubutonclick={handleMenuButtonClick}/> : ""}
            <Box paddingLeft={3} paddingRight={3}>
                <DrawerHeader />
                {location.pathname === "/profile/aboutme" && <Info infodata={data} resumedata={resumeData} />}
                {location.pathname === "/profile/resume" && <Resume data={resumeData} />}
                {location.pathname === "/profile/project" && <AppandProjects projects_data={resumeData} />}
            </Box>
        </Box>


        // <>
        // <Navigation show={ishovered} click={handleClick} navdata={data} />
        // <Container fluid className="d-flex  ps-0 me-2">
        //     <Row className= {`vh-100 flex-shrink-1`}>
        //         <Col>
        //             <Sidebar
        //                 show={ishovered}
        //                 inside={handleHover}
        //                 outside={handleLeave}
        //                 menus={menus}
        //                 menubutonclick={handleMenuButtonClick}
        //             />
        //         </Col>
        //     </Row>
        //     <Row className="vh-100 overflow-auto flex-grow-1">
        //         <Col  className="d-flex ms-3 pb-3 justify-content-center">
        //             {location.pathname === "/profile/aboutme" && <Info infodata={data} resumedata={resumeData} />}
        //             {location.pathname === "/profile/resume" && <Resume data = {resumeData}/>}
        //             {location.pathname === "/profile/project" && <AppandProjects projects_data ={resumeData}/>}
        //         </Col>
        //     </Row>
        // </Container>
        // </>


    )
}
export default Homepage