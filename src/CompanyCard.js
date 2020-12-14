import React from "react";
import {useHistory} from "react-router-dom";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import "./CompanyCard.css";

const CompanyCard = ({handle, name, description, numEmployees, logoUrl}) => {
    let history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        history.push(`/companies/${handle}`);
    }
    return (
        <div className="CompanyCard" onClick={handleClick}>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">{name}</CardTitle>
                    <CardText>
                        {description}
                    </CardText>
                </CardBody>
            </Card>
        </div>
    )
};

export default CompanyCard;