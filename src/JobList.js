import React, { useState, useEffect, useContext } from "react";
import JobCard from "./JobCard";
import JoblyApi from "./JoblyApi";
import { Container, InputGroup, Input, InputGroupAddon, Button } from "reactstrap";
import currentUserContext from "./currentUserContext";

const JobList = () => {
    const { currentUser } = useContext(currentUserContext);
    const [jobs, setJobs] = useState([]);
    const [userAppliedJobs, setUserAppliedJobs] = useState(null);
    const [searchField, setSearchField] = useState('');
    useEffect(() => {
        async function getJobsFromApi() {
            let res = await JoblyApi.getJobs();
            setJobs(res);
        }
        getJobsFromApi();
    }, []);

    useEffect(() => {
        async function getUserAppliedJobs() {
            JoblyApi.token = currentUser.token;
            let res = await JoblyApi.getUser(currentUser.username);
            setUserAppliedJobs(res.applications);
        }
        getUserAppliedJobs();
    }, [currentUser])

    const handleChange = (e) => {
        e.preventDefault();
        setSearchField(e.target.value);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        const params = {
            title: searchField
        }
        JoblyApi.token = currentUser.token;
        let res = await JoblyApi.getJobs(params);
        setJobs(res);
    }

    return (userAppliedJobs && 
        <div className="JobList">
            <Container>
            <InputGroup size="lg">
                <Input placeholder="Search jobs" value={searchField} onChange={handleChange}/>
                <InputGroupAddon addonType="append">
                <Button color="primary" onClick={handleSearch}>Search</Button>
                </InputGroupAddon>
            </InputGroup>
                {
                    jobs.map(j => {
                        return <JobCard
                            key={j.id}
                            id={j.id}
                            title={j.title} 
                            salary={j.salary} 
                            equity={j.equity} 
                            companyName={j.companyName}
                            companyHandle={j.companyHandle}
                            applied={userAppliedJobs.includes(Number(j.id))}/>
                    })
                }
            </Container>
        </div>
    )

};

export default JobList;