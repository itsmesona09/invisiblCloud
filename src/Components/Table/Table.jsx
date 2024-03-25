import React, { useState, useEffect } from 'react';
import './Table.css'
import Footer from '../Footer/Footer';

const Table = () => {
    const [students, setStudents] = useState([]);
    const [filters, setFilters] = useState({
        course: '',
        batch: '',
        grade: '',
        semester: ''
    });
    const [filteredData, setFilteredData] = useState([]);

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

    useEffect(() => {
        const filterData = () => {
            let filteredResult = students;
            if (filters.course) {
                filteredResult = filteredResult.filter(student => student.course === filters.course);
            }
            if (filters.batch) {
                filteredResult = filteredResult.filter(student => student.batch === filters.batch);
            }
            if (filters.grade) {
                filteredResult = filteredResult.filter(student => student.grade === filters.grade);
            }
            if (filters.semester) {
                filteredResult = filteredResult.filter(student => student.semester === filters.semester);
            }

            console.log("Filtered Result:", filteredResult);
            setFilteredData(filteredResult);
        };

        console.log("Students:", students);
        if (students.length > 0) {
            filterData();
        }
    }, [filters, students]);

    const handleFilterChange = (filterType, value) => {
        setFilters({ ...filters, [filterType]: value });
    };
    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px',
    };

    return (
        <div className="Table-container">
            <h1>Student Data</h1>
            <div className='select-Container'>
                <div className='group'>
                    <label>Course</label>
                    <select value={filters.course} onChange={e => handleFilterChange('course', e.target.value)} className='dropdownMenu'>
                        <option value="">-</option>
                        <option value="CS">CS</option>
                        <option value="IT">IT</option>
                    </select>
                </div>

                <div className='group'>
                    <label>Batch</label>
                    <select value={filters.batch} onChange={e => handleFilterChange('batch', e.target.value)} className='dropdownMenu'>
                        <option value="">-</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                    </select>
                </div>

                <div className='group'>
                    <label>Grade</label>
                    <select value={filters.grade} onChange={e => handleFilterChange('grade', e.target.value)} className='dropdownMenu'>
                        <option value="">-</option>
                        <option value="O">O</option>
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>

                <div className='group'>
                    <label>Semester</label>
                    <select value={filters.semester} onChange={e => handleFilterChange('semester', e.target.value)} className='dropdownMenu'>
                        <option value="">-</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
            </div>

            <table style={{ ...tableStyle, marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>Register Number</th>
                        <th>Semester</th>
                        <th>CGPA</th>
                        <th>High Scored Subject</th>
                        <th>Grade</th>
                        <th>Batch</th>
                        <th>Course</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(student => (
                        <tr key={student.register_number}>
                            <td>{student.register_number}</td>
                            <td>{student.semester}</td>
                            <td>{student.cgpa}</td>
                            <td>{student.high_scored_subject}</td>
                            <td>{student.grade}</td>
                            <td>{student.batch}</td>
                            <td>{student.course}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer />
        </div>
    );
};

export default Table;