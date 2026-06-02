const dr_Name = document.getElementById('dr_name');
const drName = document.getElementById('drname');
const avator = document.getElementById('avator');
const avator2 = document.getElementById('avator2');
const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");
const revenueCtx = document.getElementById("revenueChart");

// Sidebar Toggle
if(menuBtn){

    menuBtn.addEventListener("click", ()=>{

        sidebar.classList.toggle("show");

    });

}

// Revenue Chart


if(revenueCtx){

new Chart(revenueCtx, {

    type: "line",
    data: {

        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun"
        ],

        datasets: [{

            label: "Revenue",

            data: [
                25000,
                35000,
                28000,
                45000,
                52000,
                68000
            ],

            borderColor: "#2563eb",

            backgroundColor: "rgba(37,99,235,.15)",

            fill: true,

            tension: .4,

            pointRadius: 5,

            pointHoverRadius: 7

        }]
    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                display: false
            }

        },

        scales: {

            y: {

                beginAtZero: true,

                grid: {
                    color: "#eef2f7"
                }

            },

            x: {

                grid: {
                    display: false
                }

            }

        }

    }

});

}


// Appointment Chart
const appointmentCtx =
document.getElementById("appointmentChart");

if(appointmentCtx){

new Chart(appointmentCtx, {

    type: "doughnut",

    data: {

        labels: [
            "Confirmed",
            "Pending",
            "Cancelled"
        ],

        datasets: [{

            data: [65,25,10],
            backgroundColor: [

                "#2563eb",
                "#f59e0b",
                "#ef4444"

            ],

            borderWidth: 0

        }]
    },

    options: {

        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    }

});

}


// Close Sidebar On Mobile
document.addEventListener("click", function(e){

    if(
        window.innerWidth < 992 &&
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
    ){
        sidebar.classList.remove("show");
    }

});

window.onload = async () => {
    const { data, error } = await client.auth.getSession()   
    if (error) {
        console.log(error.message);
    }else{
        console.log(data);

        let user_id = data.session.user.user_metadata.FullName
        console.log(user_id); 
        let firstLetter = user_id.charAt(0);
        console.log(firstLetter);
        
        dr_Name.innerText = `Dr. ${user_id}`
        drName.innerText = `Dr. ${user_id}`
        avator.innerText = firstLetter
        
        // const { data:fetchData, error:fetchError } = await client
        // .from('Admin_Portal_User')
        // .select('*')
        // .eq('user_id', user_id)

        // if (fetchError) {
        //     console.log(fetchError.message);
        // }else{
        //     console.log(fetchData);
        // }

    }
}