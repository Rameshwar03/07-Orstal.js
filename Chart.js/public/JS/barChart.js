// fetching chart data
let axiosTest = async () => {
  try {
    let res = await axios({
      method: "GET",
      url: "/getPieChart",
    });
    if (res.data.status == "success") {
      return res.data;
    }
  } catch (err) {
    console.log(err);
    showAlert("error", err.response.data.message);
  }
};

let label = [];
let customer = [];
var cust = 0;
axiosTest()
  .then((data) => {
    let curr = data.data[0];
    var j = 0;
    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].empid == curr.empid) {
        cust++;
      } else {
        label[j] = curr.empid;
        customer[j] = cust;
        cust = 0;
        curr = data.data[i];
        j++;
      }
    }
  })
  .catch((err) => console.log(err));

let chart2 = document.getElementById("myChart2").getContext("2d");

const myChart = new Chart(chart2, {
  type: "bar",
  data: {
    //labels: label,
    datasets: [
      {
        label: "Employee has customer",
        //data: customer,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1.02)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "CUSTOMER",
        },
      },
      x: {
        title: {
          display: true,
          text: "EMPLOYEES ID",
        },
      },
    },
  },
});

setInterval(function () {
  myChart.data.labels = label;
  myChart.data.datasets[0].data = customer;
  myChart.update();
}, 1000);
