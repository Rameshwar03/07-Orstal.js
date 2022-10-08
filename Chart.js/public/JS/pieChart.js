let axiosTest2 = async () => {
  try {
    let res = await axios({
      method: "GET",
      url: "/getbarChart",
    });
    if (res.data.status == "success") {
      return res.data;
    }
  } catch (err) {
    console.log(err);
    showAlert("error", err.response.data.message);
  }
};

let label2 = [];
let customer2 = [];
var cust1 = 0;
axiosTest2()
  .then((data) => {
    let curr1 = data.data[0];
    var j = 0;
    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].categoryid == curr1.categoryid) {
        cust1++;
      } else {
        label2[j] = curr1.categoryid;
        customer2[j] = cust1;
        cust1 = 0;
        curr1 = data.data[i];
        j++;
      }
    }
  })
  .catch((err) => console.log(err));

let chart1 = document.getElementById("myChart").getContext("2d");
const myChart2 = new Chart(chart1, {
  type: "doughnut",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "Category has:",
        data: [12, 19, 3, 5, 2, 3],
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
          text: "Category",
        },
      },
      x: {
        title: {
          display: true,
          text: "Product",
        },
      },
    },
  },
});


setInterval(function () {
  myChart2.data.labels = label2;
  myChart2.data.datasets[0].data = customer2;
  myChart2.update();
}, 1000);