import type { NextPage} from "next";
import styles from './Mark.module.scss';
import MarkCard from "@/app/components/studentMarkCard/StudentMarkCard";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {getAllExams} from "@/app/api/teacherMark";
import {getStudentMarks} from "@/app/api/studentMarks";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from 'react-chartjs-2';
import React, {useEffect, useState} from "react";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)


const Mark: NextPage = () => {

    const [exams, setExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState({
        examName: '',
        uuid: ''
    });
    const [markObj, setMarkObj] = useState([]);

    const data = {
        labels: ['Maths', 'Science', 'English', 'Buddhism', 'History', 'I', 'II', 'III' ],
        datasets: [
            {
                label: 'Marks',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'aqua',
                borderColor: 'black',
                borderWidth: 1,
            }
        ]

    }
    data.labels = markObj.map((item) => item.subjectName);
    data.datasets[0].data = markObj.map((item) => item.markValue);


    const options = {
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllExams();
                setExams(response.exams);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])


    useEffect(() => {
        if(selectedExam.uuid !== '') {
            const fetchMarks = async () => {
                try {
                    const response = await getStudentMarks(selectedExam.uuid);
                    setMarkObj(response.marks);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchMarks();
        }

    }, [selectedExam]);

    const handleExamSelect = (exam) => {
        setSelectedExam(exam);
    };

    return (
        <div className={styles.container}>
            <DropdownButton id="dropdown-basic-button" title={selectedExam.examName ? selectedExam.examName : 'Select Exam'}>
                {exams.map((exams) => (
                    <Dropdown.Item
                        key={exams.uuid}
                        onClick={() => handleExamSelect(exams)}
                    >
                        {exams.examname}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
            <div className={styles.form}>
                <div className={styles.markSection}>
                    {markObj.map((marks, index) => {
                        return  <MarkCard key={index} marks={marks} />
                    })}
                </div>
                <div className={styles.graphSection}>
                    Graph
                    <Bar
                        data={data}
                        options={options}
                    >
                    </Bar>
                </div>
            </div>
        </div>
    )
}

export default Mark;