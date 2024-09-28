import React, { useEffect, useState } from 'react';
import { Popover, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CompaniesTable() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState("");
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState([]);
    const navigate = useNavigate();

    const handleClick = (event, company) => {
        setSelectedCompany(company);        
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        // Ensure companies is defined and is an array
        const filteredCompany = Array.isArray(companies) ? companies.filter(company => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        }) : []; // Default to an empty array if companies is not defined

        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className='container'>
            <div>
                <table className='table bg-success table-bordered table-hover text-center'>
                    <caption className='text-center my-2'>A list of recent registered companies.</caption>
                    <thead className='bg-info'>
                        <tr>
                            <th className='py-2'>Logo</th>
                            <th className='py-2'>Name</th>
                            <th className='py-2'>Date</th>
                            <th className='py-2'>Action</th>
                        </tr>
                    </thead>
                    {
                        filterCompany.length === 0 ? (
                            <tbody>
                                <tr>
                                    <td colSpan="4">You haven't registered any company yet.</td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                {
                                    filterCompany.map((company) => (
                                        <tr key={company._id} className='bg-info'>
                                            <td>
                                                <img src={company.logo} alt='No logo found' style={{ width: "65px", borderRadius: "50%" }} />
                                            </td>
                                            <td className='pt-4'>{company.name}</td>
                                            <td className='pt-4'>{company.createdAt.split("T")[0]}</td>
                                            <td className='pt-3'>
                                                <i className="fa fa-ellipsis-h fs-4 p-2" onClick={(e) => handleClick(e, company)} aria-hidden="true"></i>
                                                <Popover
                                                    id={id}
                                                    open={open}
                                                    anchorEl={anchorEl}
                                                    onClose={handleClosePopover}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    <Typography>
                                                        <div className='px-2 py-1'>
                                                            <button style={{ border: "none", background: "none" }} onClick={() => navigate(`/admin/companies/${selectedCompany._id}`)}>
                                                                <i className="fa-solid fa-pen-to-square p-1" style={{ fontSize: "17px" }}></i>Edit
                                                            </button>
                                                        </div>
                                                    </Typography>
                                                </Popover>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        )
                    }
                </table>
            </div>
        </div>
    );
}

export default CompaniesTable;
