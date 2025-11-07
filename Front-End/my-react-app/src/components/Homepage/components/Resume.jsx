import React, { useEffect, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import {TextLoading, ResumeDataLoading} from "../../Loading";
import axios from "axios";

function Resume() {
    const [contact, setContact] = useState([])
    const [education, setEducation] = useState([])
    const [works, setWorks] = useState([])
    const [skill, setSkills] = useState([])
    const baseUrl = import.meta.env.VITE_BASE_URL
    useEffect(() => {
        async function fetchData() {
            try {
                const res_data = await axios.get(`${baseUrl}/profile/resume_data?user=1`);
                setContact(res_data.data.contact_data);
                setEducation(res_data.data.education_data);
                setWorks(res_data.data.works_data);
                setSkills(res_data.data.skills_data);
            } catch (error) {
                console.error(error);
            };
        };
        fetchData();
    }, []);
    return (
        <div className="border border-light mt-5 w-100 ps-4 pe-4 ps-md-5 pe-md-5 bg-light shadow-lg rounded" style={{ maxWidth: "1140px" }}>
            <div className="d-flex justify-content-center pt-4">
                <h3>RICHARD F. ROJO JR.</h3>
            </div>
            <hr />
            <div>
                {contact.map((cont, index)=>
                <ul key={index} className="d-md-flex justify-content-evenly">
                    <li>{contact === "" ? <TextLoading/> : cont.barangay}</li>
                    <li>{contact === "" ? <TextLoading/> : cont.city}</li>
                    <li>{contact === "" ? <TextLoading/> : cont.email}</li>
                    <li>{contact === "" ? <TextLoading/> : cont.contact}</li>
                </ul>)}
            </div>
            <div className="pt-3">
                <h4 className="mb-0">Education</h4>
                <hr className="mt-0" />
                {education.length === 0? (<ResumeDataLoading/>) : (education.map((ed, index)=>(
                    <React.Fragment key={index}>
                    <div className="d-md-flex justify-content-md-between">
                        <h5>{ed.school}</h5>
                        <p>{ed.address}</p>
                    </div>
                    <div className="d-md-flex justify-content-md-between pb-3">
                        <h6>{ed.course}</h6>
                        <p>{`${ed.date_started} - ${ed.date_graduated}`}</p>
                    </div>
                    </React.Fragment>
                )))}
            </div>

            <div className="pt-3">
                <h4 className="mb-0">Work Experience</h4>
                <hr className="mt-0" />
                {works.length ===0? <ResumeDataLoading/> : works.map((work)=>(
                    <React.Fragment key={work.works_id}>
                        <div className="d-md-flex mt-4 justify-content-md-between">
                            <h5>{work.company_name}</h5>
                            <p>{work.company_address}</p>
                        </div>
                        <div className="d-md-flex  justify-content-md-between">
                            <h6>{work.position}</h6>
                            <p>{work.date_hired === work.date_ended? `${work.date_hired} - Current` : `${work.date_hired} - ${work.date_ended}`}</p>
                        </div>
                        <div className="overflow-visible w-75">
                            <ul>
                                {work.duties.map((duty, index)=>
                                <li key={index}>{duty}</li>
                                )}
                            </ul>
                        </div>
                    </React.Fragment>
                ))}
            </div>

            <div className="pt-3">
                <h4 className="mb-0">Skills & Interests</h4>
                <hr className="mt-0" />
            </div>
            <div>
                <h5>
                    Technical:
                </h5>
                {skill.length === 0?<ResumeDataLoading/> : skill.map((sk, index)=>
                <React.Fragment key={index}>
                    <div className="ps-3">
                        <h6>{sk.category}</h6>
                        <ul>
                            {sk.skills.map((name, index)=>
                            <div key={index} className="d-flex justify-content-between">
                                <li>{name.name}</li>
                                <p>{"⭐".repeat(name.prof)}</p>
                            </div>)}
                            
                        </ul>
                    </div>
                </React.Fragment>)}
                <h6>
                    Language:
                </h6>
                <ul>
                    <li>Filipino</li>
                    <li>English</li>
                </ul>
                <h6>Interests:</h6>
                <ul>
                    <li>Business</li>

                </ul>
            </div>
        </div>

    )
}

export default Resume;