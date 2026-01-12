import { isNull } from 'lodash-es';
import Chart from 'chart.js/auto';
import { courses } from '../../../data/util/helper/get-random-course.util.js';
import { countPerCourse } from '../../util/count-per-course.util.js';

export const renderPieChart = (users) => {
    const chartCanvas = document.getElementById('pie-chart');
    if (isNull(chartCanvas)) return;
    const existing = Chart.getChart(chartCanvas);
    if (existing) existing.destroy();

    const data = {
        labels: courses,
        datasets: [{
            label: 'Teachers per course',
            data: countPerCourse(users, courses),
            borderWidth: 1
        }]
    };

    const config = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Pie Chart'
                }
            }
        },
    };
    new Chart(chartCanvas, config);
};
