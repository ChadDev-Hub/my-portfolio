import Sidebar from "./Sidebar";
import Navigation from "./Navbar";
import { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import ComputerIcon from '@mui/icons-material/Computer';
import WorkIcon from '@mui/icons-material/Work';
import Info from "./components/Information";
import axios from "axios";
import Resume from "./components/Resume";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ClassNames } from "@emotion/react";
import BadgeIcon from '@mui/icons-material/Badge';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ComputerTwoToneIcon from '@mui/icons-material/ComputerTwoTone';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
function Homepage() {
    const baseUrl = import.meta.env.VITE_BASE_URL
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [ishovered, setHovered] = useState(false)
    const [menus, setMenu] = useState([
        {
            name: "APP",
            active_icon: <ComputerTwoToneIcon/>,
            inactive_icon: <ComputerIcon />,
            isActive: false
        },
        {
            name: "RESUME",
            active_icon: <BadgeIcon/>,
            inactive_icon: <BadgeOutlinedIcon/>,
            isActive: true
        },
        {
            name: "WORK EXPERIENCE",
            active_icon: <WorkIcon />,
            inactive_icon: <WorkOutlineOutlinedIcon/>,
            isActive: false

        },
        {
            name: "INFO",
            active_icon: <InfoIcon />,
            inactive_icon: <InfoOutlinedIcon/>,
            isActive: false
        }
    ])
    const [resumeData, setResumeData] = useState([])
    useEffect(() => {
        async function fetchData() {
            try {
                const res_data = await axios.get(`${baseUrl}/profile/resume_data?user=1`);
                setResumeData(res_data.data);
            } catch (error) {
                console.error(error);
            };
        };
        fetchData();
    }, []);

    function handleHover() {
        setHovered(true)
    }

    function handleLeave() {
        setHovered(false)
    }

    function handleClick() {
        setHovered(!ishovered)
    }

    function handleMenuButtonClick(event) {
        const name = event.target.name;

        setMenu((prevValue) =>
            prevValue.map((item) =>
                item.name === name
                    ? { ...item, isActive: true }
                    : { ...item, isActive: false }
            )
        );
    }

    useEffect(() => {
        async function fetchData() {
            try {
                
                console.log(baseUrl)
                const result = await axios.get(`${baseUrl}/home_page`)
                setData(result.data)
            } catch (error) {
                console.log("Error", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [])
    console.log(resumeData)
    return (
        <>
        <Navigation click={handleClick} navdata={data} />
        <Container fluid className="d-flex  ps-0 me-2">
            <Row className= {`vh-100 flex-shrink-1`}>
                <Col>
                    <Sidebar
                        show={ishovered}
                        inside={handleHover}
                        outside={handleLeave}
                        menus={menus}
                        menubutonclick={handleMenuButtonClick}
                    />
                </Col>
            </Row>
            <Row className="vh-100 overflow-auto flex-grow-1">
                <Col  className="d-flex ms-3 pb-3 justify-content-center">
                    {menus[3].isActive && <Info infodata={data} />}
                    {menus[1].isActive && <Resume data = {resumeData}/>}
                </Col>
            </Row>
        </Container>
        </>
        
        
)}
export default Homepage