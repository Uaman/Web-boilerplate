import { isNull } from 'lodash-es';

export const switchTabStatistics = () => {
    const tableButton = document.getElementById('table-button');
    const pieChartButton = document.getElementById('pie-chart-button');
    const webdatarocksButton = document.getElementById('webdatarocks-button');
    const tableWrapper = document.querySelector('.statistics-table-wrapper');
    const pieChartWrapper = document.querySelector('.statistics-chart-wrapper');
    const webdatarocksWrapper = document.querySelector('.statistics-webdatarocks-wrapper');
    if (
        isNull(tableButton) || isNull(pieChartButton) || isNull(webdatarocksButton) ||
        isNull(tableWrapper) || isNull(pieChartWrapper) || isNull(webdatarocksWrapper)
    ) return;

    tableButton.addEventListener('click', () => {
        tableWrapper.style.display = 'block';
        pieChartWrapper.style.display = 'none';
        webdatarocksWrapper.style.display = 'none';
    });

    pieChartButton.addEventListener('click', () => {
        tableWrapper.style.display = 'none';
        pieChartWrapper.style.display = 'block';
        webdatarocksWrapper.style.display = 'none';
    });

    webdatarocksButton.addEventListener('click', () => {
        tableWrapper.style.display = 'none';
        pieChartWrapper.style.display = 'none';
        webdatarocksWrapper.style.display = 'block';
    });
};
