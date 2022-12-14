import React, { useCallback, useEffect, useState } from 'react';
import { BarChart, Bar, Cell } from "recharts";
import { reqAgeGroup } from "../../api";
import { error } from '../../utils/message.js'

export default function PortraitAgeChart({ show }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [ageData, setAgeData] = useState([{
        groupName: "",
        groupNumber: 0
    }, {
        groupName: "",
        groupNumber: 0
    }, {
        groupName: "",
        groupNumber: 0
    }, {
        groupName: "",
        groupNumber: 0
    }]);

    const activeItem = ageData[activeIndex];

    useEffect(() => {
        handleAgeGroups();
    }, [])

    const handleClick = useCallback(
        (entry, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    const handleAgeGroups = async () => {
        const response = await reqAgeGroup();

        if (response.code === 200) {
            const tempSec = [{
                groupName: "0-18",
                groupNumber: response.data[0]
            },
            {
                groupName: "19-35",
                groupNumber: response.data[1]
            }, 
            {
                groupName: "36-59",
                groupNumber: response.data[2]
            }, 
            {
                groupName: "60+",
                groupNumber: response.data[3]
            }];
            setAgeData(tempSec);
        }
        else {
            error("🦄 " + response.msg);
        }
    }
    return (
        <div style={{ display: show }}>
            <h3>Click each rectangle </h3>
            <BarChart
            style={{
                paddingLeft: "220px"
            }}
             width={600} height={450} data={ageData}>
                <Bar dataKey="groupNumber" onClick={handleClick}>
                    {ageData.map((entry, index) => (
                        <Cell
                            cursor="pointer"
                            fill={index === activeIndex ? "#82ca9d" : "#8884d8"}
                            key={`cell-${index}`}
                        />
                    ))}
                </Bar>
            </BarChart>
            <h2 className="content">{`Number of "${activeItem.groupName}": ${activeItem.groupNumber}`}</h2>
        </div>
    );
}