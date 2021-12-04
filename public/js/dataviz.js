var myBarChart = document.getElementById("myBarChart");

new Chart(myBarChart, {

    type: 'bar',
    data: {

        labels: ["male", "female"],
        datasets: [{
            label: "Gender Graph",
            data: [myBarChart.dataset.male_num, myBarChart.dataset.female_num,],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',

            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',

            ],
            borderWidth: 1
        }],

    }
});

var doughnutChart = document.getElementById('doughnutChart');

new Chart(doughnutChart, {

    type: 'doughnut',
    data: {
        labels: ["Read", "Unread"],
        datasets: [{

            data: [doughnutChart.dataset.is_read, doughnutChart.dataset.is_unread,],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',

            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',

            ],
            borderWidth: 1

        }]
    }
});

var pieChart = document.getElementById('pieChart');

new Chart(pieChart, {

    type: 'pie',
    data: {
        labels: ["Paid & Shipped", "Paid & Unshipped"],
        datasets: [{

            data: [pieChart.dataset.paid_shipped, pieChart.dataset.paid_unshipped,],
            backgroundColor: [

                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [

                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    }
});

var lineChart = document.getElementById('lineChart');

new Chart(lineChart, {

    type: 'line',
    data: {
        labels: ['jan', 'feb', 'mar', 'avr', 'may', 'jun', 'jui',],
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }
}
);

