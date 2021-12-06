import React from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    approved: number | undefined,
    declined: number | undefined,
    pending: number | undefined,
}

export function Chart({declined, pending, approved}: Props) {
    const generateData = () => {

        return {
            labels: ['Declined', 'Pending', 'Approved'],
            datasets: [
                {
                    label: '# all transaction',
                    data: [declined, pending, approved],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        }
    }
    return (<div style={{maxWidth: '400px', margin: '35px auto'}}><Pie data={generateData()}/></div>);
}
