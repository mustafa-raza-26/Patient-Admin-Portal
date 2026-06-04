// const drName = document.querySelectorAll('.dr_name');
// const avator = document.querySelectorAll('.avatar');
// const appoinments =document.getElementById('appoinments');
// const menuBtn = document.querySelector(".menu-btn");
// const sidebar = document.querySelector(".sidebar");
// const revenueCtx = document.getElementById("revenueChart");

// // Sidebar Toggle
// if(menuBtn){

//     menuBtn.addEventListener("click", ()=>{

//         sidebar.classList.toggle("show");

//     });

// }

// // Revenue Chart


// if(revenueCtx){

// new Chart(revenueCtx, {

//     type: "line",
//     data: {

//         labels: [
//             "Jan",
//             "Feb",
//             "Mar",
//             "Apr",
//             "May",
//             "Jun"
//         ],

//         datasets: [{

//             label: "Revenue",

//             data: [
//                 25000,
//                 35000,
//                 28000,
//                 45000,
//                 52000,
//                 68000
//             ],

//             borderColor: "#2563eb",

//             backgroundColor: "rgba(37,99,235,.15)",

//             fill: true,

//             tension: .4,

//             pointRadius: 5,

//             pointHoverRadius: 7

//         }]
//     },

//     options: {

//         responsive: true,

//         maintainAspectRatio: false,

//         plugins: {

//             legend: {
//                 display: false
//             }

//         },

//         scales: {

//             y: {

//                 beginAtZero: true,

//                 grid: {
//                     color: "#eef2f7"
//                 }

//             },

//             x: {

//                 grid: {
//                     display: false
//                 }

//             }

//         }

//     }

// });

// }


// // Appointment Chart
// const appointmentCtx =
// document.getElementById("appointmentChart");

// if(appointmentCtx){

// new Chart(appointmentCtx, {

//     type: "doughnut",

//     data: {

//         labels: [
//             "Confirmed",
//             "Pending",
//             "Cancelled"
//         ],

//         datasets: [{

//             data: [65,25,10],
//             backgroundColor: [

//                 "#2563eb",
//                 "#f59e0b",
//                 "#ef4444"

//             ],

//             borderWidth: 0

//         }]
//     },

//     options: {

//         responsive: true,
//         maintainAspectRatio: false,
//         cutout: "70%",
//         plugins: {
//             legend: {
//                 position: "bottom"
//             }
//         }
//     }

// });

// }


// // Close Sidebar On Mobile
// document.addEventListener("click", function(e){

//     if(
//         window.innerWidth < 992 &&
//         !sidebar.contains(e.target) &&
//         !menuBtn.contains(e.target)
//     ){
//         sidebar.classList.remove("show");
//     }

// });

// window.onload = async () => {
//     const { data, error } = await client.auth.getSession();
//     if (error) {
//         console.log(error.message);
//     }else{
//         console.log(data);

//         let user_id = data.session.user.user_metadata.FullName;

//         // Name display
//         drName.forEach(element => {
//             element.innerText = `Dr. ${user_id}`;
//         });

//         //Letter Display
//         const initials = user_id
//         .split(" ")
//         .map(word => word[0])
//         .join("")
//         .toUpperCase();
        
//         avator.forEach(el => el.innerText = initials);
//     }
// }

// // window.addEventListener('load', async () => {
// //     const { data, error } = await client
// //     .from('appoinmentForm')
// //     .select('name, doctor, time')
// //     // .eq()
// //     if (error) {
// //         console.log(error.message);
// //     } else{
// //         console.log(data);
        
// //         for (let i = 0; i < data.length; i++) {
// //             appoinments.innerHTML +=`
// //                 <tr>
// //                     <td>${data[i].name}</td>
// //                     <td>${data[i].doctor}</td>
// //                     <td>${data[i].time}</td>
// //                     <td><span class="badge bg-warning">Confirmed</span></td>
// //                 </tr>
// //             `
// //         }

// //     }
// // })

// window.addEventListener('load', async () => {
//     const { data, error } = await client
//         .from('appoinmentForm')
//         .select('name, doctor, time');

//     if (error) {
//         console.log(error.message);
//     } else {
//         console.log(data);

//         for (let i = 0; i < data.length; i++) {
//             const doctorName = data[i].doctor.replace(/\s*\(.*?\)\s*/g, '');

//             // Time ko 12-hour format mein convert karna
//             const time12 = new Date(`1970-01-01T${data[i].time}`)
//                 .toLocaleTimeString('en-US', {
//                     hour: 'numeric',
//                     minute: '2-digit',
//                     hour12: true
//                 });

//             appoinments.innerHTML += `
//                 <tr>
//                     <td>${data[i].name}</td>
//                     <td>${doctorName}</td>
//                     <td>${time12}</td>
//                     <td><span class="badge bg-warning">Confirmed</span></td>
//                 </tr>
//             `;
//         }
//     }
// });

// document.getElementById('logout').addEventListener('click', async () => {
//     const { error } = await client.auth.signOut({ scope: 'local' })
//     console.log(error.message);
//     window.location.href = './index.html'
    
// })

const drName = document.querySelectorAll('.dr_name');
const avator = document.querySelectorAll('.avatar');
const appoinments = document.getElementById('appoinments');
const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");
const revenueCtx = document.getElementById("revenueChart");
const appointmentCtx = document.getElementById("appointmentChart");

// Sidebar Toggle
if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("show");
    });
}

// Revenue Chart
if (revenueCtx) {
    new Chart(revenueCtx, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: "Revenue",
                data: [25000, 35000, 28000, 45000, 52000, 68000],
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
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: "#eef2f7" }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

// Appointment Chart
if (appointmentCtx) {
    new Chart(appointmentCtx, {
        type: "doughnut",
        data: {
            labels: ["Confirmed", "Pending", "Cancelled"],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: ["#2563eb", "#f59e0b", "#ef4444"],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "70%",
            plugins: {
                legend: { position: "bottom" }
            }
        }
    });
}

// Close Sidebar On Mobile Clicking Outside
document.addEventListener("click", function (e) {
    if (
        sidebar && menuBtn &&
        window.innerWidth < 992 &&
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {
        sidebar.classList.remove("show");
    }
});

// App Initialization: Auth Verification & Data Fetching
window.addEventListener('DOMContentLoaded', async () => {
    // 1. Secure Route Check
    const { data: authData, error: authError } = await client.auth.getSession();
    
    if (authError || !authData || !authData.session) {
        console.log(authError ? authError.message : "No active session. Redirecting...");
        window.location.href = './index.html';
        return; // Stop execution if unauthenticated
    }

    console.log("Authenticated session data:", authData);
    let user_id = authData.session.user.user_metadata.FullName;

    // 2. Display Profile Information
    drName.forEach(element => {
        element.innerText = `Dr. ${user_id}`;
    });

    const initials = user_id
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();
    
    avator.forEach(el => el.innerText = initials);

    // 3. Fetch & Render Table Data
    const { data: appointmentsData, error: dbError } = await client
        .from('appoinmentForm')
        .select('name, doctor, time');

    if (dbError) {
        console.log("Database error:", dbError.message);
    } else if (appointmentsData && appoinments) {
        console.log("Appointments fetched:", appointmentsData);
        
        let rowsHtml = "";
        for (let i = 0; i < appointmentsData.length; i++) {
            const doctorName = appointmentsData[i].doctor.replace(/\s*\(.*?\)\s*/g, '');

            // Convert Time to 12-hour format safely
            const time12 = new Date(`1970-01-01T${appointmentsData[i].time}`)
                .toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                });

            rowsHtml += `
                <tr>
                    <td>${appointmentsData[i].name}</td>
                    <td>${doctorName}</td>
                    <td>${time12}</td>
                    <td><span class="badge bg-warning">Confirmed</span></td>
                </tr>
            `;
        }
        appoinments.innerHTML = rowsHtml;
    }
});

// Logout Event Listener (Fixed crash issue)
const logoutBtn = document.getElementById('logout');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        const { error } = await client.auth.signOut({ scope: 'local' });
        if (error) {
            console.log("Logout error:", error.message);
        }
        window.location.href = './index.html';
    });
}