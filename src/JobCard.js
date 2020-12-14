import React, { useState, useContext } from "react";
import { Card, CardBody, CardTitle, CardText, Button, CardSubtitle } from "reactstrap";
import currentUserContext from "./currentUserContext";
import "./JobCard.css";
import JoblyApi from "./JoblyApi";

const JobCard = ({id, title, salary, equity, companyName, companyHandle, applied}) => {
    const {currentUser} = useContext(currentUserContext);
    const [isApplied, setIsApplied] = useState(applied);
    const handleApply = async (e) => {
        e.preventDefault();
        console.log("apply clicked!")
        console.log("currentUser:", currentUser);
        const jobId = e.target.id;
        JoblyApi.token = currentUser.token;
        let res = await JoblyApi.applyToJob(currentUser.username, jobId);
        if (res.applied) {
            setIsApplied(true);
        }
    }
    return (
        <div className="JobCard">
            <Card>
                <CardBody>
                    <div className="row">
                        <div className="col-10">
                            <CardTitle tag="h5">{title}</CardTitle>
                            <CardSubtitle tag="h6">
                                <a href={`/companies/${companyHandle}`}>{companyName}</a>
                            </CardSubtitle>
                            <hr></hr>
                            <CardText>
                                Salary: {salary}<br/>
                                {equity > 0 && `Equity: ${equity}`}
                            </CardText>
                        </div>
                        <div className="col-2 align-self-center text-center">
                            <Button id={id} disabled={isApplied} onClick={handleApply}>
                                {isApplied ? "Applied" : "Apply"}
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
};

export default JobCard;