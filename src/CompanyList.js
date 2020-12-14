import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./JoblyApi";
import { Container, Input, InputGroup, InputGroupAddon, Button } from "reactstrap";

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [searchField, setSearchField] = useState('');

    useEffect(() => {
        async function getCompaniesFromApi() {
            let res = await JoblyApi.getCompanies();
            setCompanies(res);
        }
        getCompaniesFromApi();
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        setSearchField(e.target.value);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        const params = {
            name: searchField
        }
        let res = await JoblyApi.getCompanies(params);
        setCompanies(res);
    }

    return (
        <div className="CompanyList">
            <Container>
            <InputGroup size="lg">
                <Input placeholder="Search companies" onChange={handleChange}/>
                <InputGroupAddon addonType="append">
                <Button color="primary" onClick={handleSearch}>Search</Button>
                </InputGroupAddon>
            </InputGroup>
                {
                    companies.map(c => {
                        return <CompanyCard 
                            key={c.handle}
                            handle={c.handle}
                            name={c.name}
                            description={c.description}
                            numEmployees={c.numEmployees}
                            logoUrl={c.logoUrl}/>
                    })
                }
            </Container>
        </div>
    )
};

export default CompanyList;