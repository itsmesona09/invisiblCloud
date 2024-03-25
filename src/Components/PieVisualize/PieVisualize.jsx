import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";
import './PieVisualize.css';
import Footer from '../Footer/Footer';

const PieVisualize = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/input.json');
                const data = await response.json();
                setStudents(data.student);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const calculateAverageSem = (semester) => {
        const semesterStudents = students.filter(student => student.semester === semester);
        const totalStudents = semesterStudents.reduce((acc, student) => acc + student.cgpa, 0);
        return totalStudents / semesterStudents.length;
    };

    const calculateAverageBatch = (batch) => {
        const batchStudents = students.filter(student => student.batch === batch);
        const totalBatch = batchStudents.reduce((acc, student) => acc + student.cgpa, 0);
        return totalBatch / batchStudents.length;
    };

    const categorizeCGPA = (cgpa) => {
        if (cgpa < 6) return 'BELOW 6';
        else if (cgpa >= 6 && cgpa < 6.5) return '6 - 6.5';
        else if (cgpa >= 6.5 && cgpa < 7) return '6.5 - 7';
        else if (cgpa >= 7 && cgpa < 7.5) return '7 - 7.5';
        else if (cgpa >= 7.5 && cgpa < 8) return '7.5 - 8';
        else if (cgpa >= 8 && cgpa < 8.5) return '8 - 8.5';
        else return 'ABOVE 8.5';
    };

    const calculateAverageCGPA = (range) => {
        const rangeStudents = students.filter(student => categorizeCGPA(student.cgpa) === range);
        const totalCGPA = rangeStudents.reduce((acc, student) => acc + student.cgpa, 0);
        return totalCGPA / rangeStudents.length;
    };

    const calculateAverageSubjects = (high_scored_subject) => {
        const scoredSubjects = students.filter(student => student.high_scored_subject === high_scored_subject);
        const totalScoredSubjects = scoredSubjects.reduce((acc, student) => acc + student.cgpa, 0);
        return totalScoredSubjects / scoredSubjects.length;
    }

    const totalsemester = [...new Set(students.map(student => student.semester))];
    const totalbatch = [...new Set(students.map(student => student.batch))];
    const totalCGPARanges = [...new Set(students.map(student => categorizeCGPA(student.cgpa)))];
    const totalSubjects = [...new Set(students.map(student => student.high_scored_subject))];

    const sem = totalsemester.map(semester => ({
        name: `Semester ${semester}`,
        sem: calculateAverageSem(semester)
    }));

    const batch = totalbatch.map(batch => ({
        name: `Batch ${batch}`,
        batch: calculateAverageBatch(batch)
    }));

    const cgpaRanges = totalCGPARanges.map(range => ({
        name: `Range ${range}`,
        averageCGPA: calculateAverageCGPA(range)
    }));

    const subjects = totalSubjects.map(high_scored_subject => ({
        name: `Subject ${high_scored_subject}`,
        highscore: calculateAverageSubjects(high_scored_subject)
    }));

    const COLORS = ['#00C49F', '#FFBB28', '#AF19FF', '#0088FE', '#FF8042', '#6f8701', '#FF6666'];

    return (
        <div className='pie-chart-container'>
            <h1>VISUALIZATIONS</h1>
            <div className='Semester-split'>
                <h1>Semester</h1>
                <PieChart width={800} height={800}>
                    <Pie
                        dataKey="sem"
                        data={sem}
                        cx={400}
                        cy={300}
                        outerRadius={200}
                        label
                    >
                        {sem.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
            <div className='Batches-split'>
                <h1>Batch</h1>
                <PieChart width={800} height={800}>
                    <Pie
                        dataKey="batch"
                        data={batch}
                        cx={450}
                        cy={300}
                        outerRadius={200}
                        label
                    >
                        {batch.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
            <div className='CGPA-split'>
                <h1>CGPA</h1>
                <Link to="/BarVisualize">
                    <PieChart width={800} height={800}>
                        <Pie
                            dataKey="averageCGPA"
                            data={cgpaRanges}
                            cx={450}
                            cy={300}
                            outerRadius={200}
                            label
                        >
                            {cgpaRanges.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </Link>
            </div>
            <div className='subjects-split'>
                <h1>Subjects</h1>
                <PieChart width={800} height={800}>
                    <Pie
                        dataKey="highscore"
                        data={subjects}
                        cx={450}
                        cy={300}
                        outerRadius={200}
                        label
                    >
                        {subjects.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
            <div className="action-icons">
                <Link to="/">
                    <FaHome className="home-icon" />
                </Link>
                <Link to="/Login">
                    <FaUser className="user-icon" />
                </Link>
                <Link to="/Dashboard">
                    <FaSignOutAlt className="logout-icon" />
                </Link>
            </div>
            <Footer />
        </div>
    );
};

export default PieVisualize;