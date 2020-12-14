import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./JoblyApi";
import JobCard from "./JobCard";
import { Container, Jumbotron } from "reactstrap";
import "./CompanyDetail.css";

const CompanyDetail = () => {
    const { handle } = useParams();
    const [company, setCompany] = useState({});
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        async function getCompanyFromApi() {
            let res = await JoblyApi.getCompany(handle);
            console.log("got res from api:", res)
            setCompany(res);
            setJobs(res.jobs);
        }
        getCompanyFromApi();
    }, [handle]);
    return (
        <div className="CompanyDetail">
            <Container>
                <Jumbotron>
                    <h1>{company.name}</h1>
                    <p>{company.description}</p>
                    <p>Number of employees: {company.numEmployees}</p>
                    <hr className="my-5" />
                    <h4 className="mb-4">Job Openings</h4>
                    {
                        jobs.map(j => {
                            return <JobCard
                                key={j.id}
                                title={j.title} 
                                salary={j.salary} 
                                equity={j.equity} />
                        })
                    }
                </Jumbotron>
            </Container>
        </div>
    )
};

export default CompanyDetail;