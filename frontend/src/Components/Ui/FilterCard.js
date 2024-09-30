import React, { useEffect, useState } from 'react';
import { RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { useDispatch} from 'react-redux';
import { setSearchJobQuery } from '../../redux/JobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangloor", "Hyderabad", "Pune", "Chennai", "Mumbai","Vizag"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Data Science", "Graphic Designer",
            "FullStack Developer", "DevOps Developer", "AI Developer", "Mobile Development",
            "Software Engineer", "Gaming Developer", "Cloud Developer"]
    }
];

function FilterCard() {

    const [selectedFilterValue, setSelectedFilterValue] = useState('');
    const dispatch = useDispatch();

    const handleChange = (event) => {
        console.log("this from filter card....selected value",event.target.value);
        setSelectedFilterValue(event.target.value);

    };

    useEffect(() => {
        dispatch(setSearchJobQuery(selectedFilterValue));
    }, [dispatch,selectedFilterValue]);

    return (
        <div style={{ backgroundColor: "#fff" }}>
            <div>
                <h6>Filter Jobs</h6>
                <hr className='mt-3' />
            </div>
            <RadioGroup name="radio-buttons-group" value={selectedFilterValue} onChange={handleChange}>
                {
                    filterData.map((data, index) => (
                        <div key={index} className='text-start'>
                            <h6>{data.filterType}</h6>
                            {
                                data.array.map((item, itemIndex) => {
                                    const itemId = `id${index}-${itemIndex}`;
                                    return (
                                        <div key={itemIndex} className='d-flex gap-2 text-sm' style={{ fontSize: '15px' }}>
                                            <FormControlLabel
                                                control={<Radio value={item} id={itemId} />}
                                                label={item}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    );
}

export default FilterCard;
