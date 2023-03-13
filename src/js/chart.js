export const controlChart = ({ forecastHour }) => {
  const ctx = document.getElementById('myChart');

  const renderColor = () => {
    let colorbar = '#C2C1C6';

    forecastHour.map(chain_of_rain => {
      if (chain_of_rain >= 50) colorbar = '#F7C500';
    });

    return colorbar;
  }

  const data = {
    labels: ['08:00', '12:00', '16:00', '20:00', '00:00'],
    datasets: [
      {
        label: 'Índice de chuva',
        data: forecastHour.map(numbers => numbers), // valores das barras
        backgroundColor: renderColor(),
        barThickness: 10, // expessura da barra
      },
    ],
  }

  const config = {
    type: 'bar',
    data: data,
    options: {
      animations: {
        tension: {
          duration: 1000,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: true
        }
      },
      elements: {
        bar: {
          borderRadius: 20,
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 100,
          grace: 5,
          ticks: {
            stepSize: 5,
            color: '#FFF'
          }
        },
        x: {
          ticks: {
            beginAtZero: true,
            color: '#FFF'
          }
        }
      },
      responsive: true,
      maintainAspectRatio: true
    },
    plugins: {
      legend: {
        labels: {
          textAlign: 'right',
          fontColor: '#FFF'
        }
      }
    }
  }

  new Chart(ctx, config);
}